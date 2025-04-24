import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1)
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push("...")
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push("...")
    }

    // Always show last page if more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-1 mt-8">
      {/* Previous page button */}
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : (
        <button disabled className="p-2 rounded-md text-gray-300 cursor-not-allowed" aria-label="Previous page">
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <Link
            key={`page-${page}`}
            href={`${baseUrl}?page=${page}`}
            className={`px-3 py-1 rounded-md ${
              currentPage === page ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {page}
          </Link>
        ),
      )}

      {/* Next page button */}
      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <button disabled className="p-2 rounded-md text-gray-300 cursor-not-allowed" aria-label="Next page">
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
