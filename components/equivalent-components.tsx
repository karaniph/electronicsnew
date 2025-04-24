import { ComponentCard } from "@/components/component-card"
import { TransistorEquivalenceInfo } from "@/components/transistor-equivalence-info"

type EquivalentComponent = {
  id: string
  name: string
  type: string
  image?: string
  description: string
  manufacturer: string
  href: string
  compatibilityScore?: number
  specs?: Record<string, string>
}

export function EquivalentComponents({
  equivalents = [],
  originalSpecs,
}: {
  equivalents?: EquivalentComponent[]
  originalSpecs?: Record<string, string>
}) {
  if (equivalents.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">No equivalent components found for this component.</p>
      </div>
    )
  }

  // Sort by compatibility score if available
  const sortedEquivalents = [...equivalents].sort((a, b) => {
    if (a.compatibilityScore && b.compatibilityScore) {
      return b.compatibilityScore - a.compatibilityScore
    }
    return 0
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sortedEquivalents.map((component) => (
        <div key={component.id} className="space-y-3">
          <ComponentCard component={component} showBuyButtons={true} />

          {component.compatibilityScore && (
            <TransistorEquivalenceInfo
              score={component.compatibilityScore}
              originalSpecs={originalSpecs}
              replacementSpecs={component.specs}
            />
          )}
        </div>
      ))}
    </div>
  )
}
