import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
}
