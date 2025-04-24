import {
  Cpu,
  PinIcon as Chip,
  Zap,
  Radio,
  Gauge,
  Power,
  ToggleLeft,
  MicroscopeIcon as Microchip,
  CircuitBoard,
} from "lucide-react"

export const ElectronicIcons = {
  // Component type icons
  transistor: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 6h8v12H8z" />
      <path d="M16 12h4" />
      <path d="M4 12h4" />
      <path d="M4 4v16" />
      <path d="M20 4v16" />
    </svg>
  ),
  mosfet: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 5h8v14H8z" />
      <path d="M16 12h4" />
      <path d="M4 9h4" />
      <path d="M4 15h4" />
      <path d="M4 5v14" />
    </svg>
  ),
  igbt: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 5h8v14H8z" />
      <path d="M16 12h4" />
      <path d="M4 8h4" />
      <path d="M4 16h4" />
      <path d="M4 5v14" />
      <path d="M12 5v-2" />
    </svg>
  ),
  scr: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 5h8v14H8z" />
      <path d="M16 12h4" />
      <path d="M4 12h4" />
      <path d="M12 19v2" />
      <path d="M12 5v-2" />
    </svg>
  ),
  ic: (props: any) => <Chip {...props} />,

  // Other electronic components
  resistor: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12h3" />
      <path d="M17 12h3" />
      <path d="M7 12h0.01" />
      <path d="M9 12h0.01" />
      <path d="M11 12h0.01" />
      <path d="M13 12h0.01" />
      <path d="M15 12h0.01" />
      <rect x="7" y="9" width="10" height="6" rx="2" />
    </svg>
  ),
  capacitor: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12h6" />
      <path d="M14 12h6" />
      <path d="M10 6v12" />
      <path d="M14 6v12" />
    </svg>
  ),
  diode: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12h8" />
      <path d="M12 6l8 6-8 6z" />
      <path d="M20 12h-8" />
    </svg>
  ),

  // Utility icons
  power: (props: any) => <Power {...props} />,
  zap: (props: any) => <Zap {...props} />,
  cpu: (props: any) => <Cpu {...props} />,
  gauge: (props: any) => <Gauge {...props} />,
  radio: (props: any) => <Radio {...props} />,
  toggle: (props: any) => <ToggleLeft {...props} />,
  microchip: (props: any) => <Microchip {...props} />,
  circuitBoard: (props: any) => <CircuitBoard {...props} />,
}

// Helper function to get icon by component type
export function getComponentIcon(type: string, props = {}) {
  const lowerType = type.toLowerCase()

  if (lowerType.includes("transistor") || lowerType.includes("bjt")) {
    return <ElectronicIcons.transistor {...props} />
  } else if (lowerType.includes("mosfet")) {
    return <ElectronicIcons.mosfet {...props} />
  } else if (lowerType.includes("igbt")) {
    return <ElectronicIcons.igbt {...props} />
  } else if (lowerType.includes("scr")) {
    return <ElectronicIcons.scr {...props} />
  } else if (lowerType.includes("ic") || lowerType.includes("integrated")) {
    return <ElectronicIcons.ic {...props} />
  } else if (lowerType.includes("diode")) {
    return <ElectronicIcons.diode {...props} />
  } else if (lowerType.includes("capacitor")) {
    return <ElectronicIcons.capacitor {...props} />
  } else if (lowerType.includes("resistor")) {
    return <ElectronicIcons.resistor {...props} />
  } else {
    return <ElectronicIcons.circuitBoard {...props} />
  }
}
