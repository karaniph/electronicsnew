// Simple in-memory cache implementation
const memoryCache: Record<string, { value: any; expiry: number }> = {}

/**
 * Get a value from cache
 */
export async function getCachedValue<T>(key: string): Promise<T | null> {
  try {
    // Check memory cache
    const item = memoryCache[key]
    if (item && item.expiry > Date.now()) {
      return item.value as T
    }

    // Clean up expired items
    if (item) {
      delete memoryCache[key]
    }

    return null
  } catch (error) {
    console.error("Cache get error:", error)
    return null
  }
}

/**
 * Set a value in cache with expiration
 */
export async function setCachedValue(key: string, value: any, expirySeconds = 3600): Promise<void> {
  try {
    // Store in memory cache
    memoryCache[key] = {
      value,
      expiry: Date.now() + expirySeconds * 1000,
    }

    // Cleanup old cache entries if cache gets too large (prevent memory leaks)
    const maxCacheSize = 1000
    const cacheKeys = Object.keys(memoryCache)
    if (cacheKeys.length > maxCacheSize) {
      // Remove oldest 20% of entries
      const entriesToRemove = Math.floor(maxCacheSize * 0.2)
      const sortedKeys = cacheKeys.sort((a, b) => memoryCache[a].expiry - memoryCache[b].expiry)

      for (let i = 0; i < entriesToRemove; i++) {
        delete memoryCache[sortedKeys[i]]
      }
    }
  } catch (error) {
    console.error("Cache set error:", error)
  }
}

/**
 * Generate a deterministic cache key from a message
 */
export function generateCacheKey(message: string): string {
  // Normalize the message to create consistent keys
  const normalized = message.trim().toLowerCase()

  // Simple hash function for strings
  let hash = 0
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  return `ai_response_${hash}`
}
