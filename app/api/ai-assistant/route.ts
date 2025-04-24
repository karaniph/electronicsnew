import { NextResponse } from "next/server"
import { getCachedValue, setCachedValue, generateCacheKey } from "@/lib/cache"
import { headers } from "next/headers"

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10

// In-memory rate limiting
const rateLimitStore: Record<string, { count: number; resetAt: number }> = {}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"

    // Check rate limit
    const now = Date.now()
    const rateLimit = rateLimitStore[ip] || { count: 0, resetAt: now + RATE_LIMIT_WINDOW }

    // Reset counter if window expired
    if (rateLimit.resetAt < now) {
      rateLimit.count = 0
      rateLimit.resetAt = now + RATE_LIMIT_WINDOW
    }

    // Enforce rate limit
    if (rateLimit.count >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    // Update rate limit counter
    rateLimit.count++
    rateLimitStore[ip] = rateLimit

    // Parse request
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid request. Message is required." }, { status: 400 })
    }

    // Generate cache key from message
    const cacheKey = generateCacheKey(message)

    // Try to get from cache first
    const cachedResponse = await getCachedValue(cacheKey)
    if (cachedResponse) {
      console.log("Cache hit for query:", message.substring(0, 50) + "...")
      return NextResponse.json(cachedResponse)
    }

    console.log("Cache miss, calling DeepSeek API for:", message.substring(0, 50) + "...")

    // Get API key from environment variable (secure, not exposed to frontend)
    const apiKey = process.env.DEEPSEEK_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "DeepSeek API key is not configured" }, { status: 500 })
    }

    // Enhanced system prompt with transistor equivalence knowledge
    const systemPrompt = `
You are an electronic components expert assistant. Help users find the right components, suggest alternatives, and provide technical specifications. Keep responses concise and focused on electronic components.

When suggesting transistor equivalents, consider these key parameters:
1. Transistor type (bipolar/field-effect, p-n-p/n-p-n)
2. Package type and pinout
3. Maximum current and voltage (must be >= original)
4. hFE current transfer coefficient
5. Power capacity (Pc)
6. Maximum collector-base voltage (Ucb)
7. Maximum collector-emitter voltage (Uce)
8. Maximum DC collector current (Ic)
9. Maximum junction temperature (Tj)
10. Boundary frequency (ft)
11. Collector junction capacity (Cc)

For transistor replacements, the most critical parameters are:
- The replacement must be the same type (NPN or PNP for bipolar)
- Maximum current and voltage ratings must be equal or higher
- Package type should be compatible
- For switching applications, hFE should be equal or higher
- For analog amplifiers, hFE should be similar to the original
`

    // DeepSeek API endpoint
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt.trim(),
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 800, // Reduced from 1000 to save costs
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("DeepSeek API error:", errorData)

      return NextResponse.json(
        {
          error: "Failed to get response from AI assistant",
          details: errorData,
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Cache the successful response (24 hour cache)
    await setCachedValue(cacheKey, data, 24 * 60 * 60)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in AI assistant:", error)
    return NextResponse.json(
      { error: "Failed to process request", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
