import { ComponentCard } from "@/components/component-card"

// Data from the JSON file
const featuredComponents = [
  {
    id: "2SA1943",
    name: "2SA1943",
    type: "PNP Silicon Transistor",
    description: "Power Amplifier Applications, 150W, 230V, 17A",
    manufacturer: "Toshiba",
    href: "/component/2SA1943",
  },
  {
    id: "2SD718",
    name: "2SD718",
    type: "NPN Silicon Transistor",
    description: "High Power Amplifier Application, 80W, 120V, 8A",
    manufacturer: "UTC",
    href: "/component/2SD718",
  },
  {
    id: "TIP42C",
    name: "TIP42C",
    type: "PNP Silicon Transistor",
    description: "Complementary power transistors, 65W, 100V, 6A",
    manufacturer: "ST Microelectronics",
    href: "/component/TIP42C",
  },
  {
    id: "BC337",
    name: "BC337",
    type: "NPN Silicon Transistor",
    description: "General purpose transistor, 0.36W, 45V, 0.8A",
    manufacturer: "Motorola",
    href: "/component/BC337",
  },
  {
    id: "2N3906",
    name: "2N3906",
    type: "PNP Silicon Transistor",
    description: "General Purpose Transistor, 0.31W, 40V, 0.2A",
    manufacturer: "Motorola",
    href: "/component/2N3906",
  },
  {
    id: "S8050",
    name: "S8050",
    type: "NPN Silicon Transistor",
    description: "Low Voltage High Current Small Signal NPN Transistor",
    manufacturer: "UTC",
    href: "/component/S8050",
  },
]

export function FeaturedComponents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredComponents.map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  )
}
