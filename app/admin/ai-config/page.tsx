"use client"

import type React from "react"

import { useState } from "react"
import { Bot, Save, AlertCircle } from "lucide-react"

export default function AiConfigPage() {
  const [apiKey, setApiKey] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const saveApiKey = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ type: "", text: "" })

    try {
      const response = await fetch("/api/admin/save-api-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      })

      if (!response.ok) {
        throw new Error("Failed to save API key")
      }

      setMessage({ type: "success", text: "API key saved successfully!" })
    } catch (error) {
      console.error("Error saving API key:", error)
      setMessage({ type: "error", text: "Failed to save API key. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-full">
            <Bot className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold">DeepSeek AI Configuration</h1>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium mb-4">API Key Configuration</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800">
                  Your DeepSeek API key is stored securely as an environment variable on the server. It is never exposed
                  to the client or frontend code.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={saveApiKey}>
            <div className="mb-4">
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                DeepSeek API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="sk-..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Get your API key from the{" "}
                <a
                  href="https://deepseek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  DeepSeek dashboard
                </a>
                .
              </p>
            </div>

            {message.text && (
              <div
                className={`p-3 rounded-md mb-4 ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving || !apiKey.trim()}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <span className="animate-spin">⟳</span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save API Key
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-medium mb-4">API Endpoint Configuration</h2>
          <p className="text-sm text-gray-600 mb-4">
            The DeepSeek AI assistant is configured to use the following endpoint:
          </p>
          <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
            https://api.deepseek.com/v1/chat/completions
          </div>
          <p className="mt-4 text-sm text-gray-600">
            If you need to modify the endpoint or other configuration settings, please update the API route file at{" "}
            <code>app/api/ai-assistant/route.ts</code>.
          </p>
        </div>
      </div>
    </main>
  )
}
