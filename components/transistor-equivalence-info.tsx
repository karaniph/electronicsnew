import { InfoIcon } from "lucide-react"

type TransistorEquivalenceInfoProps = {
  score: number
  originalSpecs?: Record<string, string>
  replacementSpecs?: Record<string, string>
}

export function TransistorEquivalenceInfo({ score, originalSpecs, replacementSpecs }: TransistorEquivalenceInfoProps) {
  // Determine compatibility level based on score
  const getCompatibilityLevel = (score: number) => {
    if (score >= 90) return { level: "Excellent", color: "text-green-600" }
    if (score >= 80) return { level: "Good", color: "text-green-500" }
    if (score >= 70) return { level: "Acceptable", color: "text-yellow-500" }
    return { level: "Poor", color: "text-red-500" }
  }

  const { level, color } = getCompatibilityLevel(score)

  // Get key differences between specs
  const getDifferences = () => {
    if (!originalSpecs || !replacementSpecs) return []

    const differences = []
    const keyParams = [
      "Collector Current",
      "Collector-Emitter Voltage",
      "hFE",
      "Power Dissipation",
      "Transition Frequency",
    ]

    for (const param of keyParams) {
      const originalValue = originalSpecs[param]
      const replacementValue = replacementSpecs[param]

      if (originalValue && replacementValue && originalValue !== replacementValue) {
        differences.push({
          param,
          original: originalValue,
          replacement: replacementValue,
          better: isReplacementBetter(param, originalValue, replacementValue),
        })
      }
    }

    return differences
  }

  // Determine if replacement parameter is better
  const isReplacementBetter = (param: string, original: string, replacement: string) => {
    // Extract numeric values
    const origNum = Number.parseFloat(original.match(/(\d+(\.\d+)?)/)![1])
    const replNum = Number.parseFloat(replacement.match(/(\d+(\.\d+)?)/)![1])

    // For most parameters, higher is better
    if (param === "Collector Capacitance") {
      return replNum < origNum // For capacitance, lower is better
    }
    return replNum > origNum
  }

  const differences = getDifferences()

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <InfoIcon className="h-5 w-5 text-blue-500" />
        <h4 className="font-medium">Compatibility Analysis</h4>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm">Compatibility Score:</span>
          <span className={`font-medium ${color}`}>
            {score}% - {level}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              score >= 90 ? "bg-green-600" : score >= 80 ? "bg-green-500" : score >= 70 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {differences.length > 0 && (
        <div>
          <h5 className="text-sm font-medium mb-2">Key Differences:</h5>
          <ul className="text-xs space-y-1">
            {differences.map((diff, index) => (
              <li key={index} className="flex justify-between">
                <span>{diff.param}:</span>
                <span>
                  {diff.original} → {diff.replacement}{" "}
                  <span className={diff.better ? "text-green-600" : "text-yellow-500"}>
                    ({diff.better ? "+" : "−"})
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
