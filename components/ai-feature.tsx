"use client"

import { useState } from "react"
import { Bot, Zap } from "lucide-react"
import { ElectronicIcons } from "@/components/icons/electronic-icons"

export function AiFeature() {
  const [query, setQuery] = useState("")

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center gap-3 mb-4">
        <Bot className="h-6 w-6 text-blue-400" />
        <h3 className="text-lg font-medium">AI Component Assistant</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4 text-sm">
          <p className="text-gray-300">I need a replacement for a 2N3055 transistor with higher current capacity.</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 text-sm">
          <p className="text-gray-400">
            Based on your requirements, I recommend the <span className="text-blue-400">MJ15003</span> or{" "}
            <span className="text-blue-400">2SC5200</span> as alternatives with higher current capacity.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-gray-700 rounded p-2 text-xs flex items-center gap-2">
              <div className="text-blue-400">
                <ElectronicIcons.transistor className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-white">MJ15003</p>
                <p className="text-gray-400">NPN, 20A, 140V</p>
              </div>
            </div>
            <div className="bg-gray-700 rounded p-2 text-xs flex items-center gap-2">
              <div className="text-blue-400">
                <ElectronicIcons.transistor className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-white">2SC5200</p>
                <p className="text-gray-400">NPN, 15A, 230V</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about component equivalents..."
            className="w-full py-3 px-4 pr-10 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300">
            <Zap className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
