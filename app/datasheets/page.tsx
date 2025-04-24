import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Datasheet Library | Electronic Components Database | ElectronicHub",
  description:
    "Browse our comprehensive library of electronic component datasheets. Find technical specifications, pinouts, and application notes for transistors, MOSFETs, ICs, and more.",
}

export default function DatasheetsPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Datasheet Library</h1>
        <p className="text-gray-500 mb-8">
          Browse our comprehensive collection of electronic component datasheets. Find technical specifications,
          pinouts, and application notes for thousands of components.
        </p>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            We're currently building our datasheet library. Check back soon for a comprehensive collection of datasheets
            for all electronic components.
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
