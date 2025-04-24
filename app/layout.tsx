import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { ErrorBoundary } from "@/components/error-boundary"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Electronic Components Database | Transistors, MOSFETs, ICs | ElectronicsParts",
  description:
    "Find datasheets, specifications and equivalents for over 100,000 electronic components including transistors, MOSFETs, ICs, SCRs, and IGBTs.",
  keywords:
    "electronic components, transistors, MOSFETs, ICs, datasheets, component equivalents, BJT, SCR, IGBT, semiconductor database",
  authors: [{ name: "ElectronicsParts" }],
  creator: "ElectronicsParts",
  publisher: "ElectronicsParts",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://electronicparts.online",
    title: "Electronic Components Database | Transistors, MOSFETs, ICs | ElectronicsParts",
    description:
      "Find datasheets, specifications and equivalents for over 100,000 electronic components including transistors, MOSFETs, ICs, SCRs, and IGBTs.",
    siteName: "ElectronicsParts",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ElectronicsParts - Electronic Components Database",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Electronic Components Database | Transistors, MOSFETs, ICs | ElectronicsParts",
    description:
      "Find datasheets, specifications and equivalents for over 100,000 electronic components including transistors, MOSFETs, ICs, SCRs, and IGBTs.",
    images: ["/twitter-image.jpg"],
    creator: "@electronicparts",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://electronicparts.online",
  },
  verification: {
    google: "google-site-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
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
                      Contact Us
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
              <p>© {new Date().getFullYear()} ElectronicsParts. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}


import './globals.css'
