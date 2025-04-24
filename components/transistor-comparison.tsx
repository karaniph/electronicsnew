"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Component } from "@/types/component"
import type { TransistorComponent } from "@/types/transistor"
import { calculateCompatibilityScore, extractTransistorParams } from "@/lib/transistor-equivalence"
import { getTransistorApplications } from "@/lib/transistor-utils"

interface TransistorComparisonProps {
  originalTransistor: TransistorComponent
  equivalentTransistors: Array<{
    component: TransistorComponent
    score: number
  }>
}

export function TransistorComparison({ originalTransistor, equivalentTransistors }: TransistorComparisonProps) {
  const [selectedTransistor, setSelectedTransistor] = React.useState<TransistorComponent | null>(
    equivalentTransistors.length > 0 ? equivalentTransistors[0].component : null
  )
  
  const originalParams = extractTransistorParams(originalTransistor)
  const selectedParams = selectedTransistor ? extractTransistorParams(selectedTransistor) : null
  const compatibilityScore = selectedParams ? calculateCompatibilityScore(originalParams, selectedParams) : 0
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Transistor Equivalents</h2>
        <p className="text-muted-foreground">
          Find suitable replacements for {originalTransistor.name}. The compatibility score indicates how well the replacement matches the original transistor's specifications.
        </p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {equivalentTransistors.map(({ component, score }) => (
            <Button
              key={component.id}
              variant={selectedTransistor?.id === component.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTransistor(component)}
              className="flex items-center gap-2"
            >
              {component.name}
              <Badge variant={score >= 90 ? "default" : score >= 70 ? "secondary" : "outline"}>
                {score}%
              </Badge>
            </Button>
          ))}
        </div>
      </div>
      
      {selectedTransistor && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Comparison: {originalTransistor.name} vs {selectedTransistor.name}</CardTitle>
              <Badge variant={compatibilityScore >= 90 ? "default" : compatibilityScore >= 70 ? "secondary" : "outline"} className="text-md px-3 py-1">
                {compatibilityScore}% Compatible
              </Badge>
            </div>
            <CardDescription>
              {selectedTransistor.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="specs">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>{originalTransistor.name}</TableHead>
                      <TableHead>{selectedTransistor.name}</TableHead>
                      <TableHead className="text-right">Difference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Type</TableCell>
                      <TableCell>{originalTransistor.polarity}</TableCell>
                      <TableCell>{selectedTransistor.polarity}</TableCell>
                      <TableCell className="text-right">
                        {originalTransistor.polarity === selectedTransistor.polarity ? (
                          <span className="text-green-500">Match</span>
                        ) : (
                          <span className="text-red-500">Mismatch</span>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Package</TableCell>
                      <TableCell>{originalTransistor.package}</TableCell>
                      <TableCell>{selectedTransistor.package}</TableCell>
                      <TableCell className="text-right">
                        {originalTransistor.package === selectedTransistor.package ? (
                          <span className="text-green-500">Match</span>
                        ) : (
                          <span className="text-amber-500">Different</span>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Max Collector Current</TableCell>
                      <TableCell>{originalTransistor.maxCollectorCurrent} A</TableCell>
                      <TableCell>{selectedTransistor.maxCollectorCurrent} A</TableCell>
                      <TableCell className="text-right">
                        {compareValues(selectedTransistor.maxCollectorCurrent, originalTransistor.maxCollectorCurrent)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Max Collector-Emitter Voltage</TableCell>
                      <TableCell>{originalTransistor.maxCollectorEmitterVoltage} V</TableCell>
                      <TableCell>{selectedTransistor.maxCollectorEmitterVoltage} V</TableCell>
                      <TableCell className="text-right">
                        {compareValues(selectedTransistor.maxCollectorEmitterVoltage, originalTransistor.maxCollectorEmitterVoltage)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Max Power Dissipation</TableCell>
                      <TableCell>{originalTransistor.maxPowerDissipation} W</TableCell>
                      <TableCell>{selectedTransistor.maxPowerDissipation} W</TableCell>
                      <TableCell className="text-right">
                        {compareValues(selectedTransistor.maxPowerDissipation, originalTransistor.maxPowerDissipation)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Current Gain (hFE)</TableCell>
                      <TableCell>{originalTransistor.hFE}</TableCell>
                      <TableCell>{selectedTransistor.hFE}</TableCell>
                      <TableCell className="text-right">
                        {compareHFE(selectedTransistor.hFE, originalTransistor.hFE)}
                      </TableCell>
                    </TableRow>
                    {originalTransistor.transitionFrequency && selectedTransistor.transitionFrequency && (
                      <TableRow>
                        <TableCell className="font-medium">Transition Frequency</TableCell>
                        <TableCell>{originalTransistor.transitionFrequency} MHz</TableCell>
                        <TableCell>{selectedTransistor.transitionFrequency} MHz</TableCell>
                        <TableCell className="text-right">
                          {compareValues(selectedTransistor.transitionFrequency, originalTransistor.transitionFrequency)}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="applications" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{originalTransistor.name} Applications</h3>
                    <p>{getTransistorApplications(originalTransistor)}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{selectedTransistor.name} Applications</h3>
                    <p>{getTransistorApplications(selectedTransistor)}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="compatibility" className="mt-4">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Compatibility Assessment</h3>
                    <p>
                      {compatibilityScore >= 90
                        ? `${selectedTransistor.name} is an excellent replacement for ${originalTransistor.name} with ${compatibilityScore}% compatibility.`
                        : compatibilityScore >= 70
                        ? `${selectedTransistor.name} is a good replacement for ${originalTransistor.name} with ${compatibilityScore}% compatibility.`
                        : `${selectedTransistor.name} is a possible replacement for ${originalTransistor.name} with ${compatibilityScore}% compatibility, but caution is advised.`}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Replacement Considerations</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {originalTransistor.polarity !== selectedTransistor.polarity && (
                        <li className="text-red-500">
                          Warning: Different polarity! Circuit modifications required.
                        </li>
                      )}
                      {originalTransistor.package !== selectedTransistor.package && (
                        <li className="text-amber-500">
                          Different package: May require PCB modifications or adapters.
                        </li>
                      )}
                      {selectedTransistor.maxCollectorCurrent && originalTransistor.maxCollectorCurrent && 
                       selectedTransistor.maxCollectorCurrent < originalTransistor.maxCollectorCurrent && (
                        <li className="text-red-500">
                          Lower current rating: May overheat in high-current applications.
                        </li>
                      )}
                      {selectedTransistor.maxCollectorEmitterVoltage && originalTransistor.maxCollectorEmitterVoltage && 
                       selectedTransistor.maxCollectorEmitterVoltage < originalTransistor.maxCollectorEmitterVoltage && (
                        <li className="text-red-500">
                          Lower voltage rating: Risk of breakdown in high-voltage applications.
                        </li>
                      )}
                      {selectedTransistor.maxPowerDissipation && originalTransistor.maxPowerDissipation && 
                       selectedTransistor.maxPowerDissipation < originalTransistor.maxPowerDissipation * 0.8 && (
                        <li className="text-amber-500">
                          Lower power dissipation: May require additional cooling.
                        </li>
                      )}
                      {selectedTransistor.hFE && originalTransistor.hFE && 
                       (selectedTransistor.hFE < originalTransistor.hFE * 0.7 || selectedTransistor.hFE > originalTransistor.hFE * 1.3) && (
                        <li className="text-amber-500">
                          Different current gain: May affect circuit behavior in amplifier applications.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <a href={`/component/${selectedTransistor.id}`}>View Details</a>
            </Button>
            <div className="text-sm text-muted-foreground">
              Manufacturer: {selectedTransistor.manufacturer}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

// Helper function to compare numeric values
function compareValues(replacement?: number, original?: number): React.ReactNode {
  if (replacement === undefined || original === undefined) {
    return <span className="text-gray-500">Unknown</span>
  }
  
  const ratio = replacement / original
  
  if (ratio >= 1) {
    return <span className="text-green-500">+{((ratio - 1) * 100).toFixed(0)}%</span>
  } else {
    return <span className="text-red-500">{((ratio - 1) * 100).toFixed(0)}%</span>
  }
}

// Helper function to compare hFE values
function compareHFE(replacement?: number, original?: number): React.ReactNode {
  if (replacement === undefined || original === undefined) {
    return <span className="text-gray-500">Unknown</span>
  }
  
  const ratio = replacement / original
  
  if (ratio >= 0.8 && ratio <= 1.2) {
    return <span className="text-green-500">Good match</span>
  } else if (ratio > 1.2) {
    return <span className="text-amber-500">Higher gain</span>
  } else {
    return <span className="text-amber-500">Lower gain</span>
  }
}
