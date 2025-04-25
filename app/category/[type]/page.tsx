import { ComponentCard } from "@/components/component-card"
import { Pagination } from "@/components/pagination"
import { loadComponents } from "@/lib/component-data"
import type { Metadata } from "next"
import Script from "next/script"
import { getComponentIcon } from "@/components/icons/electronic-icons"
import { notFound } from "next/navigation";

type Props = {
  params: { type: string }
  searchParams: { page?: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryInfo = getCategoryInfo(params.type)

  return {
    title: `${categoryInfo.title} | Electronic Components Database | ElectronicHub`,
    description: `Browse our collection of ${categoryInfo.title.toLowerCase()}. Find datasheets, specifications, and equivalent components for ${params.type.toUpperCase()} electronic components.`,
    keywords: `${params.type}, ${categoryInfo.title}, electronic components, datasheets, specifications, equivalents`,
  }
}

const getCategoryInfo = (type: string) => {
  const categoryInfo: Record<string, { title: string; description: string }> = {
    bjt: {
      title: "Bipolar Junction Transistors (BJT)",
      description:
        "Bipolar Junction Transistors are semiconductor devices used for amplification or switching applications. They come in two types: NPN and PNP, and are characterized by their current gain, maximum voltage, and power ratings.",
    },
    mosfet: {
      title: "MOSFETs",
      description:
        "Metal-Oxide-Semiconductor Field-Effect Transistors are voltage-controlled devices used for switching and amplification in power electronics. They offer high input impedance and low on-resistance.",
    },
    igbt: {
      title: "Insulated-Gate Bipolar Transistors (IGBT)",
      description:
        "IGBTs combine the high input impedance of MOSFETs with the low on-state conduction losses of bipolar transistors, making them ideal for high-voltage, high-current applications.",
    },
    scr: {
      title: "Silicon Controlled Rectifiers (SCR)",
      description:
        "SCRs are four-layer semiconductor devices primarily used in applications requiring control of high power, where their low forward voltage drop makes them ideal.",
    },
    ic: {
      title: "Integrated Circuits (IC)",
      description:
        "Integrated Circuits are microelectronic devices that contain numerous transistors, resistors, and capacitors fabricated on a single semiconductor substrate.",
    },
  }

  return (
    categoryInfo[type.toLowerCase()] || {
      title: type.toUpperCase(),
      description: "Electronic components in this category.",
    }
  )
}

export default async function CategoryPage({ params, searchParams }: Props) {
  // Deny-list for forbidden categories
  const denyList = ["capacitor", "capacitors", "resistor", "resistors", "diode", "diodes"];
  if (denyList.includes(params.type.toLowerCase())) {
    notFound();
  }
  const page = Number.parseInt(searchParams.page || "1", 10)
  const pageSize = 12

  // Use our utility function to load components by category
  const result = await loadComponents(page, pageSize, { type: params.type })
  const components = result.data
  const categoryInfo = getCategoryInfo(params.type)

  // JSON-LD structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryInfo.title,
    description: categoryInfo.description,
    url: `https://electronichub.com/category/${params.type}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: components.map((component, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: component.name,
          description: component.description,
          manufacturer: {
            "@type": "Organization",
            name: component.manufacturer,
          },
          url: `https://electronichub.com${component.href}`,
        },
      })),
    },
  }

  return (
    <>
      <Script
        id="category-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-center">
              {getComponentIcon(params.type, { className: "w-20 h-20 text-gray-700" })}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{categoryInfo.title}</h1>
              <p className="text-gray-600 mb-4">{categoryInfo.description}</p>
              <div className="flex items-center gap-2">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {result.total} {result.total === 1 ? "component" : "components"}
                </span>
              </div>
            </div>
          </div>

          {components.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {components.map((component) => (
                  <ComponentCard key={component.id} component={component} />
                ))}
              </div>

              <Pagination
                currentPage={result.page}
                totalPages={result.totalPages}
                baseUrl={`/category/${params.type}`}
              />
            </>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center mt-8">
              <p className="text-gray-500">No components found in this category.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
