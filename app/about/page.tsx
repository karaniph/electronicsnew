import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | ElectronicHub",
  description:
    "Learn about ElectronicHub, the comprehensive database for electronic components with over 100,000 transistors, MOSFETs, IGBTs, SCRs, and ICs.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About ElectronicHub</h1>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            ElectronicHub is dedicated to providing engineers, hobbyists, and electronics enthusiasts with a
            comprehensive database of electronic components. Our mission is to make it easy to find the right component
            for your project, with detailed specifications, datasheets, and equivalent components all in one place.
          </p>
          <p className="text-gray-700">
            With over 100,000 components in our database, including transistors, MOSFETs, IGBTs, SCRs, and ICs, we're
            committed to being the most comprehensive resource for electronic component information on the web.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-700 mb-4">
            ElectronicHub was founded by a team of electronics engineers and software developers who were frustrated
            with the lack of a comprehensive, user-friendly database of electronic components.
          </p>
          <p className="text-gray-700">
            Our team is passionate about electronics and committed to creating the best possible resource for the
            electronics community. We're constantly updating our database with new components and improving our tools to
            make your experience better.
          </p>
        </div>
      </div>
    </main>
  )
}
