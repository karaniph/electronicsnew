"use client"

import React from "react"
import { TransistorFinder } from "@/components/transistor-finder"

export default function TransistorsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-2">Transistor Finder</h1>
      <p className="text-muted-foreground mb-8">
        Find the perfect transistor for your electronic projects with our advanced search tool.
      </p>
      
      <TransistorFinder />
    </div>
  )
}
