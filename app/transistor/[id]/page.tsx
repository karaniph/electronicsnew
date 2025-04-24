"use client"

import React from "react"
import { TransistorComparison } from "@/components/transistor-comparison"
import { getComponentById } from "@/lib/component-data"
import { findEquivalentTransistors } from "@/lib/transistor-equivalence"
import type { Component } from "@/types/component"
import type { TransistorComponent } from "@/types/transistor"
import { TransistorDetail } from "@/components/transistor-detail"

export default function TransistorPage({ params }: { params: { id: string } }) {
  const [transistor, setTransistor] = React.useState<TransistorComponent | null>(null)
  const [equivalents, setEquivalents] = React.useState<Array<{component: TransistorComponent, score: number}>>([])
  const [loading, setLoading] = React.useState(true)
  
  React.useEffect(() => {
    async function loadData() {
      try {
        // Get the transistor data
        const data = await getComponentById(params.id) as TransistorComponent
        
        if (data) {
          setTransistor(data)
          
          // Get all components to find equivalents
          // In a real implementation, this would use a more efficient method
          const allComponents = []
          for (let i = 1; i <= 18; i++) {
            try {
              const chunk = await import(`@/data/components-chunk-${i}.json`)
              allComponents.push(...chunk.components)
            } catch {
              // If chunk doesn't exist, continue
              continue
            }
          }
          
          // Find equivalent transistors
          const equivalentResults = findEquivalentTransistors(
            data,
            allComponents as Component[],
            60 // Lower threshold to show more options
          )
          
          setEquivalents(equivalentResults)
        }
      } catch (error) {
        console.error("Error loading transistor data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [params.id])
  
  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <p className="text-lg">Loading transistor data...</p>
        </div>
      </div>
    )
  }
  
  if (!transistor) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Transistor Not Found</h1>
        <p>The transistor with ID {params.id} could not be found.</p>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">{transistor.name} Transistor</h1>
      
      <div className="space-y-12">
        <TransistorDetail transistor={transistor} />
        
        {equivalents.length > 0 && (
          <TransistorComparison 
            originalTransistor={transistor} 
            equivalentTransistors={equivalents} 
          />
        )}
      </div>
    </div>
  )
}
