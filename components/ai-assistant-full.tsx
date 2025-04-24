"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Bot, Send, X, Download, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { getComponentIcon } from "@/components/icons/electronic-icons"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Message = {
  role: "user" | "assistant" | "system" | "error"
  content: string
  components?: any[]
  timestamp?: number
}

// Client-side cache for messages
const MESSAGE_CACHE_KEY = "electronichub_assistant_messages"
const MAX_CACHED_CONVERSATIONS = 10

export function AiAssistantFull() {
  // Use local storage to persist messages
  const [messages, setMessages] = useLocalStorage<Message[]>(MESSAGE_CACHE_KEY, [
    {
      role: "assistant",
      content: "Hello! I'm your AI component assistant. How can I help you find the right electronic components today?",
      timestamp: Date.now(),
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requestCount, setRequestCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Ensure scrolling works properly
    if (messagesEndRef.current) {
      const messagesContainer = document.getElementById("messages-container")
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }
    }
  }, [messages])

  // Simple similarity check to avoid duplicate questions
  const isSimilarToRecentQuestion = (newQuestion: string): boolean => {
    const recentUserMessages = messages.filter((m) => m.role === "user").slice(-3) // Check last 3 user messages

    for (const msg of recentUserMessages) {
      // Check if messages are very similar (simple check)
      if (msg.content.toLowerCase().trim() === newQuestion.toLowerCase().trim()) {
        return true
      }
    }
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setError(null)

    // Check for similar recent questions
    const isSimilar = isSimilarToRecentQuestion(input)
    if (isSimilar) {
      setError(
        "You've asked a very similar question recently. Please try a different question to avoid unnecessary API calls.",
      )
      return
    }

    // Check for rate limiting on client side
    if (requestCount >= 20) {
      // 20 requests per session
      setError("You've reached the maximum number of requests for this session. Please try again later.")
      return
    }

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call our secure API endpoint
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to get response from AI assistant")
      }

      const data = await response.json()

      // Extract the assistant's response
      const assistantResponse =
        data.choices?.[0]?.message?.content ||
        "I'm sorry, I couldn't process your request at the moment. Please try again later."

      // Add assistant message
      const assistantMessage: Message = {
        role: "assistant",
        content: assistantResponse,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setRequestCount((prev) => prev + 1)
    } catch (error) {
      console.error("Error:", error)
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          content:
            error instanceof Error ? error.message : "I'm sorry, I encountered an error. Please try again later.",
          timestamp: Date.now(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm your AI component assistant. How can I help you find the right electronic components today?",
        timestamp: Date.now(),
      },
    ])
    setRequestCount(0)
    setError(null)
  }

  const exportChat = () => {
    const chatText = messages
      .map(
        (msg) =>
          `${msg.role === "user" ? "You" : msg.role === "error" ? "Error" : "Assistant"} (${new Date(msg.timestamp || Date.now()).toLocaleString()}): ${msg.content}`,
      )
      .join("\n\n")

    const blob = new Blob([chatText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "electronichub-chat-export.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex flex-col h-[600px]">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="font-medium">Component Assistant</h2>
            </div>
            <div className="text-xs text-gray-500">{requestCount > 0 && `${requestCount} requests made`}</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" id="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : message.role === "error"
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.role === "error" && (
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="font-medium">Error</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.timestamp && (
                  <p className="text-xs opacity-70 mt-2 text-right">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                )}

                {message.components && (
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {message.components.map((component) => (
                      <div key={component.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 relative flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                            {getComponentIcon(component.type, { className: "w-8 h-8 text-gray-700" })}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{component.name}</h4>
                            <p className="text-sm text-gray-500">{component.description}</p>
                            <Link
                              href={component.href}
                              className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                            >
                              View details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4 text-gray-800 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Error message */}
        {error && (
          <div className="px-4 py-2 bg-red-50 border-t border-red-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about component equivalents or specifications..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isLoading || !input.trim() || requestCount >= 20}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-2 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <button
                onClick={exportChat}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <Download className="h-3 w-3" />
                Export
              </button>
              <button onClick={clearChat} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <X className="h-3 w-3" />
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
