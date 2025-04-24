"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Logo } from "@/components/logo"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState } from "react"
import { MobileMenu } from "@/components/mobile-menu"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Logo variant="white" size="medium" />
                <nav className="hidden md:block ml-10" aria-label="Main Navigation">
                  <ul className="flex space-x-8">
                    <li>
                      <Link href="/category/bjt" className="hover:text-gray-300">
                        Transistors
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/mosfet" className="hover:text-gray-300">
                        MOSFETs
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/igbt" className="hover:text-gray-300">
                        IGBTs
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/scr" className="hover:text-gray-300">
                        SCRs
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/ic" className="hover:text-gray-300">
                        ICs
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/search" className="hover:text-gray-300" aria-label="Search Components">
                  <Search className="h-5 w-5" />
                </Link>
                <Link
                  href="/ai-assistant"
                  className="hidden md:block bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  AI Assistant
                </Link>
                <button className="md:hidden" aria-label="Open Menu" onClick={() => setIsMobileMenuOpen(true)}>
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <ErrorBoundary>{children}</ErrorBoundary>
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Logo variant="white" size="medium" />
                <p className="text-gray-400 text-sm mt-4">
                  The comprehensive database for electronic components with over 100,000 transistors, MOSFETs, IGBTs,
                  SCRs, and ICs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <Link href="/category/bjt" className="hover:text-white">
                      Transistors (BJT)
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/mosfet" className="hover:text-white">
                      MOSFETs
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/igbt" className="hover:text-white">
                      IGBTs
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/scr" className="hover:text-white">
                      SCRs
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/ic" className="hover:text-white">
                      ICs
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Tools</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <Link href="/search" className="hover:text-white">
                      Component Search
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-assistant" className="hover:text-white">
                      AI Assistant
                    </Link>
                  </li>
                  <li>
                    <Link href="/datasheets" className="hover:text-white">
                      Datasheet Library
                    </Link>
                  </li>
                  <li>
                    <Link href="/equivalents" className="hover:text-white">
                      Equivalent Finder
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} ElectronicHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
