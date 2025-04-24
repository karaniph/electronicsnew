"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              ElectronicHub
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/category/transistors" className="hover:text-gray-300">
                  Transistors
                </Link>
              </li>
              <li>
                <Link href="/category/mosfets" className="hover:text-gray-300">
                  MOSFETs
                </Link>
              </li>
              <li>
                <Link href="/category/ics" className="hover:text-gray-300">
                  ICs
                </Link>
              </li>
              <li>
                <Link href="/category/scrs" className="hover:text-gray-300">
                  SCRs
                </Link>
              </li>
              <li>
                <Link href="/category/igbts" className="hover:text-gray-300">
                  IGBTs
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="hover:text-gray-300">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search components..."
                className="py-2 px-4 pr-10 rounded-full bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 w-48"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <div className="px-4 py-2">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search components..."
                className="w-full py-2 px-4 pr-10 rounded-full bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <ul className="space-y-4 pb-4">
              <li>
                <Link href="/category/transistors" className="block hover:text-gray-300">
                  Transistors
                </Link>
              </li>
              <li>
                <Link href="/category/mosfets" className="block hover:text-gray-300">
                  MOSFETs
                </Link>
              </li>
              <li>
                <Link href="/category/ics" className="block hover:text-gray-300">
                  ICs
                </Link>
              </li>
              <li>
                <Link href="/category/scrs" className="block hover:text-gray-300">
                  SCRs
                </Link>
              </li>
              <li>
                <Link href="/category/igbts" className="block hover:text-gray-300">
                  IGBTs
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="block hover:text-gray-300">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
