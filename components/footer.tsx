import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ElectronicHub</h3>
            <p className="text-gray-400 text-sm">
              The ultimate resource for electronic component equivalents and datasheets.
            </p>
          </div>

          <div>
            <h4 className="text-md font-medium mb-4">Components</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/category/transistors" className="hover:text-white">
                  Transistors
                </Link>
              </li>
              <li>
                <Link href="/category/mosfets" className="hover:text-white">
                  MOSFETs
                </Link>
              </li>
              <li>
                <Link href="/category/ics" className="hover:text-white">
                  ICs
                </Link>
              </li>
              <li>
                <Link href="/category/scrs" className="hover:text-white">
                  SCRs
                </Link>
              </li>
              <li>
                <Link href="/category/igbts" className="hover:text-white">
                  IGBTs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-medium mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/ai-assistant" className="hover:text-white">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/datasheet-search" className="hover:text-white">
                  Datasheet Search
                </Link>
              </li>
              <li>
                <Link href="/component-comparison" className="hover:text-white">
                  Component Comparison
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-medium mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-400">
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

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} ElectronicHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
