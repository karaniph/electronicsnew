import Link from "next/link"
import { getComponentIcon } from "@/components/icons/electronic-icons"
import { AffiliateBuyButtons } from "@/components/affiliate-buy-buttons"

type Component = {
  id: string
  name: string
  type: string
  image?: string
  description: string
  manufacturer: string
  href: string
}

interface ComponentCardProps {
  component: Component
  showBuyButtons?: boolean
}

export function ComponentCard({ component, showBuyButtons = false }: ComponentCardProps) {
  return (
    <article className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md h-full flex flex-col">
      <Link href={component.href} className="flex flex-col h-full">
        <header className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700">
            {getComponentIcon(component.type, { className: "w-10 h-10" })}
          </div>
          <div>
            <h3 className="text-xl font-medium">{component.name}</h3>
            <p className="text-sm text-gray-500">{component.type}</p>
          </div>
        </header>
        <div className="flex-grow">
          <p className="text-sm text-gray-700 mb-4">{component.description}</p>
        </div>
        <footer className="mt-auto">
          <p className="text-xs text-gray-500">Manufacturer: {component.manufacturer}</p>
        </footer>
      </Link>

      {showBuyButtons && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <AffiliateBuyButtons productName={component.name} productType={component.type} />
        </div>
      )}
    </article>
  )
}
