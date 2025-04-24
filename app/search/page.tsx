import { ComponentCard } from "@/components/component-card"
import { Search } from "@/components/search"
import { Pagination } from "@/components/pagination"
import { searchComponents } from "@/lib/component-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Electronic Components | Find Transistors, MOSFETs & ICs | ElectronicHub",
  description:
    "Search our database of over 100,000 electronic components. Find datasheets, specifications, and equivalent components for transistors, MOSFETs, ICs, and more.",
  keywords:
    "search electronic components, find transistors, find MOSFETs, find ICs, component search, electronic parts search",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string }
}) {
  const query = searchParams.q || ""
  const page = Number.parseInt(searchParams.page || "1", 10)
  const pageSize = 12

  // Use our utility function to search components
  const results = query
    ? await searchComponents(query, page, pageSize)
    : { data: [], total: 0, page, pageSize, totalPages: 0 }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Search Electronic Components</h1>
          <Search />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">{query ? `Search results for "${query}"` : "All Components"}</h2>
          <p className="text-gray-500">
            {results.total} {results.total === 1 ? "component" : "components"} found
          </p>
        </div>

        {results.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.data.map((component) => (
                <ComponentCard key={component.id} component={component} />
              ))}
            </div>

            <Pagination currentPage={results.page} totalPages={results.totalPages} baseUrl="/search" />
          </>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">
              {query ? "No components found matching your search criteria." : "Enter a search term to find components."}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
