import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ComponentSpecs } from "@/components/component-specs"
import { EquivalentComponents } from "@/components/equivalent-components"
import { DatasheetViewer } from "@/components/datasheet-viewer"
import { AffiliateBuyButtons } from "@/components/affiliate-buy-buttons"
import { getComponentIcon } from "@/components/icons/electronic-icons"
import { getComponentById, loadComponents } from "@/lib/component-data"
import { findEquivalentTransistors } from "@/lib/transistor-equivalence"
import Script from "next/script"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const component = await getComponentById(params.id)

  if (!component) {
    return {
      title: "Component Not Found | ElectronicHub",
      description: "The requested electronic component could not be found in our database.",
    }
  }

  return {
    title: `${component.name} ${component.type} | Datasheet & Specifications | ElectronicHub`,
    description: `${component.description}. Find complete specifications, datasheets, and equivalent components for ${component.name}.`,
    keywords: `${component.name}, ${component.type}, ${component.polarity || ""}, ${component.package || ""}, electronic component, datasheet, specifications, equivalent components`,
    alternates: {
      canonical: `https://electronichub.com/component/${params.id}`,
    },
  }
}

export default async function ComponentPage({ params }: Props) {
  const component = await getComponentById(params.id)

  if (!component) {
    return (
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Component Not Found</h1>
          <p className="text-gray-500 mb-8">The requested component could not be found in our database.</p>
          <Link
            href="/search"
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Search for Components
          </Link>
        </div>
      </main>
    )
  }

  // Check if this is a transistor type component
  const isTransistor =
    component.type.toLowerCase().includes("transistor") ||
    component.type.toLowerCase().includes("bjt") ||
    component.type.toLowerCase().includes("mosfet")

  // Find equivalent components using our transistor equivalence logic if this is a transistor
  let equivalents = component.equivalents || []

  if (isTransistor) {
    try {
      // Load potential candidates (in a real app, you'd query a database)
      // Here we're just loading a sample of components as potential matches
      const { data: candidateComponents } = await loadComponents(1, 100, {
        type: component.type.split(" ")[0], // Get first word of type (e.g., "NPN" from "NPN Transistor")
      })

      // Find equivalents using our algorithm
      const calculatedEquivalents = findEquivalentTransistors(component, candidateComponents)

      // If we found calculated equivalents, use them
      if (calculatedEquivalents.length > 0) {
        equivalents = calculatedEquivalents.map((eq) => ({
          ...eq.component,
          compatibilityScore: eq.score,
        }))
      }
    } catch (error) {
      console.error("Error finding equivalent transistors:", error)
      // Fall back to predefined equivalents if there's an error
    }
  }

  // JSON-LD structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: component.name,
    description: component.description,
    brand: {
      "@type": "Brand",
      name: component.manufacturer,
    },
    manufacturer: {
      "@type": "Organization",
      name: component.manufacturer,
    },
    category: component.type,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `https://electronichub.com/component/${params.id}`,
    },
    additionalProperty: Object.entries(component.specs || {}).map(([name, value]) => ({
      "@type": "PropertyValue",
      name: name,
      value: value,
    })),
  }

  return (
    <>
      <Script
        id="component-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link href="/search" className="text-gray-500 hover:text-black flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Search
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-4">
                <div className="w-full h-64 mb-6 flex items-center justify-center bg-gray-100 rounded-xl">
                  {getComponentIcon(component.type, { className: "w-32 h-32 text-gray-700" })}
                </div>
                <h1 className="text-2xl font-bold mb-2">{component.name}</h1>
                <p className="text-gray-500 mb-4">{component.type}</p>
                <p className="text-sm text-gray-700 mb-6">{component.description}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm">
                    <span className="font-medium">Manufacturer:</span> {component.manufacturer}
                  </p>
                  {component.package && (
                    <p className="text-sm">
                      <span className="font-medium">Package:</span> {component.package}
                    </p>
                  )}
                  {component.polarity && (
                    <p className="text-sm">
                      <span className="font-medium">Polarity:</span> {component.polarity}
                    </p>
                  )}
                  {component.material && (
                    <p className="text-sm">
                      <span className="font-medium">Material:</span> {component.material}
                    </p>
                  )}
                </div>

                {/* Affiliate Buy Buttons */}
                <AffiliateBuyButtons
                  productName={component.name}
                  productType={component.type}
                  className="mt-6 pt-6 border-t border-gray-200"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <section className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold mb-6">Specifications</h2>
                <ComponentSpecs specs={component.specs || {}} />
              </section>

              <section className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold mb-6">Datasheets</h2>
                <DatasheetViewer datasheets={component.datasheets || []} />
              </section>

              <section className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold mb-6">Equivalent Components</h2>
                {isTransistor && (
                  <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800">
                      Equivalents are calculated based on key transistor parameters including polarity, voltage/current
                      ratings, package type, and hFE. Higher compatibility scores indicate better replacements.
                    </p>
                  </div>
                )}
                <EquivalentComponents equivalents={equivalents} originalSpecs={component.specs} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
