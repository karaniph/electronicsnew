import { ComponentCategories } from "@/components/component-categories"
import { FeaturedComponents } from "@/components/featured-components"
import { AiFeature } from "@/components/ai-feature"
import { HeroSection } from "@/components/hero-section"
import Script from "next/script"

export const metadata = {
  title: "Electronic Components Database | Find Transistors, MOSFETs & ICs | ElectronicHub",
  description:
    "Search our database of over 100,000 electronic components including transistors, MOSFETs, ICs, and more. Find datasheets, specifications, and equivalent components.",
}

export default function Home() {
  // JSON-LD structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ElectronicHub",
    url: "https://electronichub.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://electronichub.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    description: "Comprehensive database of electronic components with datasheets and equivalents",
    publisher: {
      "@type": "Organization",
      name: "ElectronicHub",
      logo: {
        "@type": "ImageObject",
        url: "https://electronichub.com/logo.png",
      },
    },
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="flex min-h-screen flex-col items-center">
        <HeroSection />

        {/* Categories Section */}
        <section className="w-full py-20 px-4 bg-white" aria-labelledby="categories-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="categories-heading" className="text-3xl md:text-4xl font-semibold text-center mb-12">
              Browse by Category
            </h2>
            <ComponentCategories />
          </div>
        </section>

        {/* Featured Components */}
        <section className="w-full py-20 px-4 bg-gray-50" aria-labelledby="featured-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="featured-heading" className="text-3xl md:text-4xl font-semibold text-center mb-12">
              Popular Components
            </h2>
            <FeaturedComponents />
          </div>
        </section>

        {/* AI Feature */}
        <section className="w-full py-20 px-4 bg-black text-white" aria-labelledby="ai-heading">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 id="ai-heading" className="text-3xl md:text-4xl font-semibold mb-6">
                  AI-Powered Component Matching
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Our advanced AI analyzes specifications to find the perfect equivalent components for your projects.
                  Upload a datasheet or describe your requirements.
                </p>
                <a
                  href="/ai-assistant"
                  className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors inline-block"
                >
                  Try AI Assistant
                </a>
              </div>
              <div className="flex-1">
                <AiFeature />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
