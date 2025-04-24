import type { Component } from "./component"

export interface TransistorComponent extends Component {
  polarity: "NPN" | "PNP" | "N-Channel" | "P-Channel" | string
  material: string
  package: string
  maxCollectorCurrent?: number
  maxCollectorEmitterVoltage?: number
  maxCollectorBaseVoltage?: number
  maxEmitterBaseVoltage?: number
  maxPowerDissipation?: number
  maxJunctionTemperature?: number
  transitionFrequency?: number
  collectorCapacitance?: number
  hFE?: number
  noiseLevel?: number
  applications?: string[]
}

// Define units for transistor parameters
export interface ParameterWithUnit {
  value: number
  unit: string
}

// Define a more detailed transistor type with units
export interface DetailedTransistorComponent extends TransistorComponent {
  maxCollectorCurrentWithUnit?: ParameterWithUnit
  maxCollectorEmitterVoltageWithUnit?: ParameterWithUnit
  maxCollectorBaseVoltageWithUnit?: ParameterWithUnit
  maxEmitterBaseVoltageWithUnit?: ParameterWithUnit
  maxPowerDissipationWithUnit?: ParameterWithUnit
  maxJunctionTemperatureWithUnit?: ParameterWithUnit
  transitionFrequencyWithUnit?: ParameterWithUnit
  collectorCapacitanceWithUnit?: ParameterWithUnit
}

// Define transistor application categories
export type TransistorApplication = 
  | "general"
  | "switching"
  | "amplification"
  | "high-frequency"
  | "power"
  | "audio"
  | "rf"
  | "low-noise"
  | "high-voltage"
  | "high-current"
