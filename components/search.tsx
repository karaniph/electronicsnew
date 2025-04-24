"use client"

import type React from "react"

import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export function Search() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for components (e.g., 2N2222, BC547, TIP42C...)"
          className="w-full py-4 px-6 pr-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}
