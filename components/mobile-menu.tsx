"use client"
import Link from "next/link"
import { X } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="bg-white h-full w-4/5 max-w-sm py-6 px-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-6">
            <li>
              <Link href="/" className="text-lg font-medium" onClick={onClose}>
                Home
              </Link>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
              <ul className="space-y-3 pl-2">
                <li>
                  <Link href="/category/bjt" className="block" onClick={onClose}>
                    Transistors (BJT)
                  </Link>
                </li>
                <li>
                  <Link href="/category/mosfet" className="block" onClick={onClose}>
                    MOSFETs
                  </Link>
                </li>
                <li>
                  <Link href="/category/igbt" className="block" onClick={onClose}>
                    IGBTs
                  </Link>
                </li>
                <li>
                  <Link href="/category/scr" className="block" onClick={onClose}>
                    SCRs
                  </Link>
                </li>
                <li>
                  <Link href="/category/ic" className="block" onClick={onClose}>
                    ICs
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tools</h3>
              <ul className="space-y-3 pl-2">
                <li>
                  <Link href="/search" className="block" onClick={onClose}>
                    Component Search
                  </Link>
                </li>
                <li>
                  <Link href="/ai-assistant" className="block" onClick={onClose}>
                    AI Assistant
                  </Link>
                </li>
                <li>
                  <Link href="/datasheets" className="block" onClick={onClose}>
                    Datasheet Library
                  </Link>
                </li>
                <li>
                  <Link href="/equivalents" className="block" onClick={onClose}>
                    Equivalent Finder
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">About</h3>
              <ul className="space-y-3 pl-2">
                <li>
                  <Link href="/about" className="block" onClick={onClose}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="block" onClick={onClose}>
                    Contact
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
