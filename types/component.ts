export type Component = {
  id: string
  name: string
  type: string
  description: string
  manufacturer: string
  polarity?: string
  material?: string
  package?: string
  specs?: Record<string, string>
  datasheets?: Array<{ name: string; url: string }>
  equivalents?: Array<{
    id: string
    name: string
    type: string
    description: string
    manufacturer: string
    href: string
    compatibilityScore?: number // Added for transistor equivalence
  }>
  href: string
}

export interface TransistorComponent extends Component {
  polarity: "NPN" | "PNP" | "N-Channel" | "P-Channel" | string
  maxCollectorCurrent?: number
  maxCollectorEmitterVoltage?: number
  hFE?: number
  maxPowerDissipation?: number
}
