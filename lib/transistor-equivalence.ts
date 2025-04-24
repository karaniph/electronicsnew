import type { Component } from "@/types/component"

// Define transistor-specific parameters
export interface TransistorParams {
  type: "NPN" | "PNP" | "N-Channel" | "P-Channel" | string
  package: string
  maxCollectorCurrent?: number // Ic
  maxCollectorEmitterVoltage?: number // Uce
  maxCollectorBaseVoltage?: number // Ucb
  hFE?: number // Current transfer coefficient
  maxPowerDissipation?: number // Pc
  maxJunctionTemp?: number // Tj
  boundaryFrequency?: number // ft
  collectorCapacitance?: number // Cc
  application?: "switching" | "amplification" | "general" | string
}

// Extract transistor parameters from component specs
export function extractTransistorParams(component: Component): TransistorParams {
  const specs = component.specs || {}
  const type = component.polarity || extractPolarityFromType(component.type) || "Unknown"

  return {
    type,
    package: component.package || "Unknown",
    maxCollectorCurrent: extractNumericValue(specs["Collector Current"] || specs["Max Collector Current"]),
    maxCollectorEmitterVoltage: extractNumericValue(specs["Collector-Emitter Voltage"] || specs["Vce"]),
    maxCollectorBaseVoltage: extractNumericValue(specs["Collector-Base Voltage"] || specs["Vcb"]),
    hFE: extractNumericValue(specs["hFE"] || specs["Current Gain"] || specs["DC Current Gain"]),
    maxPowerDissipation: extractNumericValue(specs["Power Dissipation"] || specs["Max Power"]),
    maxJunctionTemp: extractNumericValue(specs["Junction Temperature"] || specs["Max Temperature"]),
    boundaryFrequency: extractNumericValue(specs["Transition Frequency"] || specs["ft"]),
    collectorCapacitance: extractNumericValue(specs["Collector Capacitance"] || specs["Cc"]),
    application: determineApplication(component.description, specs),
  }
}

// Helper to extract polarity from component type
function extractPolarityFromType(type: string): string | null {
  const lowerType = type.toLowerCase()
  if (lowerType.includes("npn")) return "NPN"
  if (lowerType.includes("pnp")) return "PNP"
  if (lowerType.includes("n-channel")) return "N-Channel"
  if (lowerType.includes("p-channel")) return "P-Channel"
  return null
}

// Helper to extract numeric values from spec strings
function extractNumericValue(value: string | undefined): number | undefined {
  if (!value) return undefined

  // Extract the first number from the string
  const match = value.match(/(\d+(\.\d+)?)/)
  if (match) {
    return Number.parseFloat(match[1])
  }
  return undefined
}

// Determine the likely application of the transistor
function determineApplication(description: string, specs: Record<string, string>): string {
  const desc = description.toLowerCase()

  if (desc.includes("switch") || desc.includes("digital")) {
    return "switching"
  }
  if (desc.includes("amplif") || desc.includes("audio") || desc.includes("linear")) {
    return "amplification"
  }

  // Check if high frequency
  const ft = extractNumericValue(specs["Transition Frequency"] || specs["ft"])
  if (ft && ft > 100e6) {
    // > 100 MHz
    return "high-frequency"
  }

  // Check if power transistor
  const power = extractNumericValue(specs["Power Dissipation"] || specs["Max Power"])
  if (power && power > 5) {
    // > 5W
    return "power"
  }

  return "general"
}

// Calculate compatibility score between original and potential replacement
export function calculateCompatibilityScore(original: TransistorParams, replacement: TransistorParams): number {
  let score = 0
  const maxScore = 100

  // Critical parameters - must match
  if (original.type !== replacement.type) {
    return 0 // Incompatible polarity
  }

  // Package compatibility (not critical but important)
  if (original.package === replacement.package) {
    score += 15
  } else {
    // Some packages are compatible
    const compatiblePackages = getCompatiblePackages(original.package)
    if (compatiblePackages.includes(replacement.package)) {
      score += 10
    }
  }

  // Voltage and current ratings (must be >= original)
  if (original.maxCollectorCurrent && replacement.maxCollectorCurrent) {
    if (replacement.maxCollectorCurrent >= original.maxCollectorCurrent) {
      score += 15
      // Bonus if it's not too oversized
      if (replacement.maxCollectorCurrent <= original.maxCollectorCurrent * 2) {
        score += 5
      }
    } else {
      return 0 // Insufficient current rating
    }
  }

  if (original.maxCollectorEmitterVoltage && replacement.maxCollectorEmitterVoltage) {
    if (replacement.maxCollectorEmitterVoltage >= original.maxCollectorEmitterVoltage) {
      score += 15
      // Bonus if it's not too oversized
      if (replacement.maxCollectorEmitterVoltage <= original.maxCollectorEmitterVoltage * 2) {
        score += 5
      }
    } else {
      return 0 // Insufficient voltage rating
    }
  }

  // hFE (current gain) - depends on application
  if (original.hFE && replacement.hFE) {
    if (original.application === "switching") {
      // For switching, replacement hFE should be >= original
      if (replacement.hFE >= original.hFE) {
        score += 15
      } else {
        score += 5 // Still usable but not ideal
      }
    } else {
      // For amplification, hFE should be similar
      const ratio = replacement.hFE / original.hFE
      if (ratio >= 0.8 && ratio <= 1.2) {
        score += 15 // Within 20%
      } else if (ratio >= 0.5 && ratio <= 1.5) {
        score += 10 // Within 50%
      } else {
        score += 5 // Outside range but still usable
      }
    }
  }

  // Power dissipation
  if (original.maxPowerDissipation && replacement.maxPowerDissipation) {
    if (replacement.maxPowerDissipation >= original.maxPowerDissipation) {
      score += 10
    } else if (replacement.maxPowerDissipation >= original.maxPowerDissipation * 0.8) {
      score += 5 // Slightly lower but may be acceptable
    }
  }

  // Frequency characteristics
  if (original.boundaryFrequency && replacement.boundaryFrequency) {
    if (replacement.boundaryFrequency >= original.boundaryFrequency) {
      score += 10
    } else if (replacement.boundaryFrequency >= original.boundaryFrequency * 0.8) {
      score += 5 // Slightly lower but may be acceptable
    }
  }

  // Capacitance (lower is better for high-frequency applications)
  if (original.collectorCapacitance && replacement.collectorCapacitance) {
    if (replacement.collectorCapacitance <= original.collectorCapacitance) {
      score += 5
    }
  }

  // Normalize score to 100
  return Math.min(score, maxScore)
}

// Get list of physically compatible packages
function getCompatiblePackages(packageType: string): string[] {
  const packageMap: Record<string, string[]> = {
    "TO-92": ["TO-92", "TO-226"],
    "TO-220": ["TO-220", "TO-220F", "TO-220AB"],
    "TO-3": ["TO-3", "TO-204AA"],
    "TO-126": ["TO-126", "TO-225", "SOT-32"],
    "SOT-23": ["SOT-23", "SOT-323"],
    "SOT-223": ["SOT-223"],
    DPAK: ["DPAK", "TO-252"],
    D2PAK: ["D2PAK", "TO-263"],
  }

  // Normalize package name
  const normalizedPackage = packageType.toUpperCase().trim()

  // Return compatible packages or empty array if not found
  return packageMap[normalizedPackage] || []
}

// Find equivalent transistors from a list
export function findEquivalentTransistors(
  original: Component,
  candidates: Component[],
  minScore = 70,
): { component: Component; score: number }[] {
  const originalParams = extractTransistorParams(original)

  const results = candidates
    .filter((c) => c.id !== original.id) // Exclude the original component
    .map((candidate) => {
      const candidateParams = extractTransistorParams(candidate)
      const score = calculateCompatibilityScore(originalParams, candidateParams)
      return { component: candidate, score }
    })
    .filter((result) => result.score >= minScore)
    .sort((a, b) => b.score - a.score)

  return results
}
