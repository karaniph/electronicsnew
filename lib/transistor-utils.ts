import { extractTransistorParams, calculateCompatibilityScore, findEquivalentTransistors } from "@/lib/transistor-equivalence"
import type { Component } from "@/types/component"
import type { TransistorComponent, DetailedTransistorComponent, ParameterWithUnit } from "@/types/transistor"

// Function to convert a transistor component to a detailed transistor component with units
export function enhanceTransistorWithUnits(transistor: TransistorComponent): DetailedTransistorComponent {
  const enhanced: DetailedTransistorComponent = { ...transistor }
  
  // Add units to numeric parameters
  if (transistor.maxCollectorCurrent !== undefined) {
    enhanced.maxCollectorCurrentWithUnit = {
      value: transistor.maxCollectorCurrent,
      unit: 'A'
    }
  }
  
  if (transistor.maxCollectorEmitterVoltage !== undefined) {
    enhanced.maxCollectorEmitterVoltageWithUnit = {
      value: transistor.maxCollectorEmitterVoltage,
      unit: 'V'
    }
  }
  
  if (transistor.maxCollectorBaseVoltage !== undefined) {
    enhanced.maxCollectorBaseVoltageWithUnit = {
      value: transistor.maxCollectorBaseVoltage,
      unit: 'V'
    }
  }
  
  if (transistor.maxEmitterBaseVoltage !== undefined) {
    enhanced.maxEmitterBaseVoltageWithUnit = {
      value: transistor.maxEmitterBaseVoltage,
      unit: 'V'
    }
  }
  
  if (transistor.maxPowerDissipation !== undefined) {
    enhanced.maxPowerDissipationWithUnit = {
      value: transistor.maxPowerDissipation,
      unit: 'W'
    }
  }
  
  if (transistor.maxJunctionTemperature !== undefined) {
    enhanced.maxJunctionTemperatureWithUnit = {
      value: transistor.maxJunctionTemperature,
      unit: '°C'
    }
  }
  
  if (transistor.transitionFrequency !== undefined) {
    enhanced.transitionFrequencyWithUnit = {
      value: transistor.transitionFrequency,
      unit: 'MHz'
    }
  }
  
  if (transistor.collectorCapacitance !== undefined) {
    enhanced.collectorCapacitanceWithUnit = {
      value: transistor.collectorCapacitance,
      unit: 'pF'
    }
  }
  
  return enhanced
}

// Function to parse a string value with unit into a ParameterWithUnit object
export function parseValueWithUnit(valueString: string): ParameterWithUnit | undefined {
  if (!valueString) return undefined
  
  // Extract numeric value and unit
  const match = valueString.match(/^([\d.]+)\s*([A-Za-z°Ω]+)$/)
  if (!match) return undefined
  
  return {
    value: parseFloat(match[1]),
    unit: match[2]
  }
}

// Function to extract transistor parameters from scraped data
export function extractTransistorFromScrapedData(data: any): TransistorComponent | null {
  try {
    // Check if the data contains transistor information
    if (!data.text || !data.text.includes('Type Designator:')) {
      return null
    }
    
    const text = data.text
    const lines = text.split('\n')
    
    // Extract basic information
    const typeDesignator = extractValue(lines, 'Type Designator:')
    const material = extractValue(lines, 'Material of Transistor:')
    const polarity = extractValue(lines, 'Polarity:')
    const packageType = extractValue(lines, 'Package:')
    
    // Extract specifications
    const maxPowerDissipation = extractNumericValue(extractValue(lines, 'Maximum Collector Power Dissipation (Pc):'))
    const maxCollectorBaseVoltage = extractNumericValue(extractValue(lines, 'Maximum Collector-Base Voltage |Vcb|:'))
    const maxCollectorEmitterVoltage = extractNumericValue(extractValue(lines, 'Maximum Collector-Emitter Voltage |Vce|:'))
    const maxEmitterBaseVoltage = extractNumericValue(extractValue(lines, 'Maximum Emitter-Base Voltage |Veb|:'))
    const maxCollectorCurrent = extractNumericValue(extractValue(lines, 'Maximum Collector Current |Ic max|:'))
    const hFE = extractNumericValue(extractValue(lines, 'Forward Current Transfer Ratio (hFE), MIN:'))
    const maxJunctionTemperature = extractNumericValue(extractValue(lines, 'Max. Operating Junction Temperature (Tj):'))
    const transitionFrequency = extractNumericValue(extractValue(lines, 'Transition Frequency (ft):'))
    const collectorCapacitance = extractNumericValue(extractValue(lines, 'Collector Capacitance (Cc):'))
    
    // Extract description and manufacturer
    let description = ""
    let manufacturer = "Various"
    
    // Look for description in the text
    const descriptionMatch = text.match(/DESCRIPTION\s+(.*?)(?=\n\n|\n[A-Z])/is)
    if (descriptionMatch) {
      description = descriptionMatch[1].trim()
    } else {
      // Try to extract from the first paragraph after the specifications
      const specEndIndex = text.indexOf('Package:')
      if (specEndIndex > 0) {
        const afterSpecs = text.substring(specEndIndex + 10)
        const firstParagraph = afterSpecs.split('\n\n')[0]
        if (firstParagraph && firstParagraph.length > 20) {
          description = firstParagraph.trim()
        }
      }
    }
    
    // Look for manufacturer
    const manufacturerMatch = text.match(/(?:manufacturer|produced by|from)\s+([A-Za-z0-9\s]+)/i)
    if (manufacturerMatch) {
      manufacturer = manufacturerMatch[1].trim()
    }
    
    // If we couldn't extract a good description, create one
    if (!description || description.length < 20) {
      description = `${polarity} ${material} transistor with ${maxCollectorEmitterVoltage}V collector-emitter voltage and ${maxCollectorCurrent}A collector current capability.`
    }
    
    // Extract datasheets
    const datasheets: Array<{ name: string; url: string }> = []
    const datasheetSection = text.indexOf('Datasheet (PDF)')
    if (datasheetSection > 0) {
      const datasheetText = text.substring(datasheetSection)
      const datasheetMatches = datasheetText.matchAll(/Size:(\d+K)\s+([^\n]+)\s+([^\s]+\.pdf)/g)
      for (const match of datasheetMatches) {
        datasheets.push({
          name: `${match[2].trim()} (${match[1]})`,
          url: `https://alltransistors.com/adv/pdfview.php?doc=${match[3]}&dire=_${match[2].trim().toLowerCase().replace(/\s+/g, '_')}`
        })
      }
    }
    
    // Extract equivalents
    const equivalents: Array<{
      id: string;
      name: string;
      type: string;
      description: string;
      manufacturer: string;
      href: string;
    }> = []
    
    // Look for "Datasheet:" section which often contains related transistors
    const relatedSection = text.indexOf('Datasheet:')
    if (relatedSection > 0) {
      const relatedText = text.substring(relatedSection, text.indexOf('\n', relatedSection))
      const relatedMatches = relatedText.match(/[A-Z0-9]{2,}[A-Z][0-9]{1,5}[A-Z]*/g)
      if (relatedMatches) {
        for (const match of relatedMatches) {
          if (match !== typeDesignator) {
            equivalents.push({
              id: match,
              name: match,
              type: polarity === 'NPN' || polarity === 'PNP' ? `${polarity} Transistor` : 'Transistor',
              description: `Potential equivalent for ${typeDesignator}`,
              manufacturer: 'Various',
              href: `/component/${match}`
            })
          }
        }
      }
    }
    
    // Create the transistor component
    const transistor: TransistorComponent = {
      id: typeDesignator,
      name: typeDesignator,
      type: polarity === 'NPN' || polarity === 'PNP' ? `${polarity} Transistor` : 'Transistor',
      description: description,
      manufacturer: manufacturer,
      polarity: polarity,
      material: material,
      package: packageType,
      maxCollectorCurrent: maxCollectorCurrent,
      maxCollectorEmitterVoltage: maxCollectorEmitterVoltage,
      maxCollectorBaseVoltage: maxCollectorBaseVoltage,
      maxEmitterBaseVoltage: maxEmitterBaseVoltage,
      maxPowerDissipation: maxPowerDissipation,
      maxJunctionTemperature: maxJunctionTemperature,
      transitionFrequency: transitionFrequency,
      collectorCapacitance: collectorCapacitance,
      hFE: hFE,
      specs: {
        'Polarity': polarity,
        'Material': material,
        'Package': packageType,
        'Collector Power Dissipation': maxPowerDissipation ? `${maxPowerDissipation}W` : 'N/A',
        'Collector-Base Voltage': maxCollectorBaseVoltage ? `${maxCollectorBaseVoltage}V` : 'N/A',
        'Collector-Emitter Voltage': maxCollectorEmitterVoltage ? `${maxCollectorEmitterVoltage}V` : 'N/A',
        'Emitter-Base Voltage': maxEmitterBaseVoltage ? `${maxEmitterBaseVoltage}V` : 'N/A',
        'Collector Current': maxCollectorCurrent ? `${maxCollectorCurrent}A` : 'N/A',
        'Current Gain (hFE)': hFE ? `${hFE}` : 'N/A',
        'Junction Temperature': maxJunctionTemperature ? `${maxJunctionTemperature}°C` : 'N/A',
        'Transition Frequency': transitionFrequency ? `${transitionFrequency}MHz` : 'N/A',
        'Collector Capacitance': collectorCapacitance ? `${collectorCapacitance}pF` : 'N/A'
      },
      datasheets: datasheets,
      equivalents: equivalents,
      href: `/component/${typeDesignator}`
    }
    
    return transistor
  } catch (error) {
    console.error('Error extracting transistor data:', error)
    return null
  }
}

// Helper function to extract a value from lines of text
function extractValue(lines: string[], prefix: string): string {
  const line = lines.find(l => l.trim().startsWith(prefix))
  if (!line) return ''
  return line.substring(prefix.length).trim()
}

// Helper function to extract numeric value from a string
function extractNumericValue(value: string): number | undefined {
  if (!value) return undefined
  
  // Extract the first number from the string
  const match = value.match(/(\d+(\.\d+)?)/)
  if (match) {
    return Number.parseFloat(match[1])
  }
  return undefined
}

// Function to determine the application category of a transistor
export function determineTransistorApplication(transistor: TransistorComponent): string[] {
  const applications: string[] = []
  
  // Check if it's a power transistor
  if (transistor.maxPowerDissipation && transistor.maxPowerDissipation > 5) {
    applications.push('power')
  }
  
  // Check if it's a high-frequency transistor
  if (transistor.transitionFrequency && transistor.transitionFrequency > 100) {
    applications.push('high-frequency')
    
    if (transistor.transitionFrequency > 1000) {
      applications.push('rf')
    }
  }
  
  // Check if it's a high-voltage transistor
  if (transistor.maxCollectorEmitterVoltage && transistor.maxCollectorEmitterVoltage > 100) {
    applications.push('high-voltage')
  }
  
  // Check if it's a high-current transistor
  if (transistor.maxCollectorCurrent && transistor.maxCollectorCurrent > 5) {
    applications.push('high-current')
  }
  
  // Check if it's suitable for audio applications
  if (transistor.hFE && transistor.hFE > 100 && 
      transistor.maxCollectorEmitterVoltage && transistor.maxCollectorEmitterVoltage > 20 &&
      transistor.maxCollectorCurrent && transistor.maxCollectorCurrent > 0.1) {
    applications.push('audio')
  }
  
  // Check if it's a low-noise transistor
  if (transistor.collectorCapacitance && transistor.collectorCapacitance < 10 &&
      transistor.hFE && transistor.hFE > 100) {
    applications.push('low-noise')
  }
  
  // If no specific applications were determined, it's a general-purpose transistor
  if (applications.length === 0) {
    applications.push('general')
  }
  
  return applications
}

// Function to get recommended applications for a transistor
export function getTransistorApplications(transistor: TransistorComponent): string {
  const applications = determineTransistorApplication(transistor)
  
  if (applications.includes('power') && applications.includes('audio')) {
    return 'Audio power amplifiers, power supplies, motor control'
  } else if (applications.includes('power')) {
    return 'Power supplies, motor drivers, switching regulators'
  } else if (applications.includes('high-frequency') && applications.includes('low-noise')) {
    return 'RF amplifiers, oscillators, mixers, low-noise front-ends'
  } else if (applications.includes('high-frequency')) {
    return 'RF circuits, oscillators, high-speed switching'
  } else if (applications.includes('audio')) {
    return 'Audio preamplifiers, audio drivers, audio output stages'
  } else if (applications.includes('high-voltage')) {
    return 'High-voltage drivers, CRT circuits, switching power supplies'
  } else if (applications.includes('high-current')) {
    return 'Power supplies, motor drivers, high-current switching'
  } else if (applications.includes('low-noise')) {
    return 'Low-noise amplifiers, sensitive instrumentation, audio preamplifiers'
  } else {
    return 'General-purpose amplification and switching applications'
  }
}
