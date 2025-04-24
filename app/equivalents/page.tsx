import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Equivalent Component Finder | Electronic Components Database | ElectronicHub",
  description:
    "Find equivalent and replacement electronic components. Our tool helps you identify compatible alternatives for transistors, MOSFETs, ICs, and more.",
}

export default function EquivalentsPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Equivalent Component Finder</h1>
        <p className="text-gray-500 mb-8">
          Find equivalent and replacement electronic components. Our tool helps you identify compatible alternatives for
          your projects.
        </p>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            We're currently building our equivalent component finder tool. Check back soon for a comprehensive database
            of component equivalents.
          </p>
        </div>

        <Link
          href="/search"
          className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors inline-block"
        >
          Search for Components
        </Link>
      </div>
    </main>
  )
}
