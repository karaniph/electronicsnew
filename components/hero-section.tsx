import { Search } from "@/components/search"
import { CircuitBackground } from "@/components/circuit-background"
import { ElectronicIcons } from "@/components/icons/electronic-icons"

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 text-white py-24 px-4 flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
      <CircuitBackground className="text-white" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center mb-6">
          <ElectronicIcons.circuitBoard className="w-16 h-16 text-blue-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight">Find the perfect component.</h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto text-gray-300 mt-6">
          Discover equivalents for transistors, MOSFETs, ICs, SCRs, and IGBTs with precision and ease.
        </p>
        <div className="w-full max-w-2xl mt-8">
          <Search />
        </div>
      </div>
    </section>
  )
}
