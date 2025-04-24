import Link from "next/link"
import { ElectronicIcons } from "@/components/icons/electronic-icons"

const categories = [
  {
    name: "Transistors (BJT)",
    description: "Bipolar Junction Transistors for amplification and switching",
    icon: ElectronicIcons.transistor,
    href: "/category/bjt",
    count: 100000,
  },
  {
    name: "MOSFETs",
    description: "Metal-Oxide-Semiconductor Field-Effect Transistors",
    icon: ElectronicIcons.mosfet,
    href: "/category/mosfet",
    count: 40000,
  },
  {
    name: "IGBTs",
    description: "Insulated-Gate Bipolar Transistors for power applications",
    icon: ElectronicIcons.igbt,
    href: "/category/igbt",
    count: 15000,
  },
  {
    name: "SCRs",
    description: "Silicon Controlled Rectifiers for power control",
    icon: ElectronicIcons.scr,
    href: "/category/scr",
    count: 5000,
  },
  {
    name: "ICs",
    description: "Integrated Circuits for various applications",
    icon: ElectronicIcons.ic,
    href: "/category/ic",
    count: 20000,
  },
]

export function ComponentCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-100 rounded-lg text-gray-700 flex-shrink-0">
              <category.icon className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              <p className="text-xs text-gray-400 mt-2">{category.count.toLocaleString()} components</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
