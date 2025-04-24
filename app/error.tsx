"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-6">We apologize for the inconvenience. An unexpected error has occurred.</p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6 overflow-auto">
          <p className="text-sm font-mono text-gray-700">
            {error.message || "Unknown error"}
            {error.digest && <span className="block mt-2 text-xs text-gray-500">Error ID: {error.digest}</span>}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
