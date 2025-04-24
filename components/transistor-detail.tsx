"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TransistorComponent, DetailedTransistorComponent } from "@/types/transistor"
import { enhanceTransistorWithUnits, getTransistorApplications } from "@/lib/transistor-utils"

interface TransistorDetailProps {
  transistor: TransistorComponent
}

export function TransistorDetail({ transistor }: TransistorDetailProps) {
  const enhancedTransistor = enhanceTransistorWithUnits(transistor as TransistorComponent)
  const applications = getTransistorApplications(transistor)
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{transistor.name}</CardTitle>
            <CardDescription className="mt-2">{transistor.description}</CardDescription>
          </div>
          <Badge variant={transistor.polarity === "NPN" ? "default" : "secondary"} className="text-md px-3 py-1">
            {transistor.polarity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="datasheets">Datasheets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specs" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Basic Information</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Type</TableCell>
                      <TableCell>{transistor.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Polarity</TableCell>
                      <TableCell>{transistor.polarity}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Material</TableCell>
                      <TableCell>{transistor.material}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Package</TableCell>
                      <TableCell>{transistor.package}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Manufacturer</TableCell>
                      <TableCell>{transistor.manufacturer}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Electrical Characteristics</h3>
                <Table>
                  <TableBody>
                    {enhancedTransistor.maxCollectorCurrentWithUnit && (
                      <TableRow>
                        <TableCell className="font-medium">Max Collector Current</TableCell>
                        <TableCell>
                          {enhancedTransistor.maxCollectorCurrentWithUnit.value} {enhancedTransistor.maxCollectorCurrentWithUnit.unit}
                        </TableCell>
                      </TableRow>
                    )}
                    {enhancedTransistor.maxCollectorEmitterVoltageWithUnit && (
                      <TableRow>
                        <TableCell className="font-medium">Max Collector-Emitter Voltage</TableCell>
                        <TableCell>
                          {enhancedTransistor.maxCollectorEmitterVoltageWithUnit.value} {enhancedTransistor.maxCollectorEmitterVoltageWithUnit.unit}
                        </TableCell>
                      </TableRow>
                    )}
                    {enhancedTransistor.maxCollectorBaseVoltageWithUnit && (
                      <TableRow>
                        <TableCell className="font-medium">Max Collector-Base Voltage</TableCell>
                        <TableCell>
                          {enhancedTransistor.maxCollectorBaseVoltageWithUnit.value} {enhancedTransistor.maxCollectorBaseVoltageWithUnit.unit}
                        </TableCell>
                      </TableRow>
                    )}
                    {enhancedTransistor.maxEmitterBaseVoltageWithUnit && (
                      <TableRow>
                        <TableCell className="font-medium">Max Emitter-Base Voltage</TableCell>
                        <TableCell>
                          {enhancedTransistor.maxEmitterBaseVoltageWithUnit.value} {enhancedTransistor.maxEmitterBaseVoltageWithUnit.unit}
                        </TableCell>
                      </TableRow>
                    )}
                    {transistor.hFE && (
                      <TableRow>
                        <TableCell className="font-medium">Current Gain (hFE)</TableCell>
                        <TableCell>{transistor.hFE}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Thermal Characteristics</h3>
                <Table>
                  <TableBody>
                    {enhancedTransistor.maxPowerDissipationWithUnit && (
                      <TableRow>
                        <TableCell className="font-medium">Max Power Dissipation</TableCell>
                        <TableCell>
                          {enhancedTransistor.maxPowerDissipationWithUnit.value} {enhancedTransistor.maxPowerDissipationWithUnit.unit}
                        </TableCell>
                      </TableRow>
                    )}
                    {enhancedTransistor.maxJunctionTemperatureWithUnit && (
                      <TableRow>
                        <TableCell className="font-medium">Max Junction Temperature</TableCell>
                        <TableCell>
                          {enhancedTransistor.maxJunctionTemperatureWithUnit.value} {enhancedTransistor.maxJunctionTemperatureWithUnit.unit}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Frequency Characteristics</h3>
                <Table>
                  <TableBody>
                    {enhancedTransistor.transitionFrequencyWithUnit && (
                      <TableRow>
                        <TableCell className="font-medium">Transition Frequency</TableCell>
                        <TableCell>
                          {enhancedTransistor.transitionFrequencyWithUnit.value} {enhancedTransistor.transitionFrequencyWithUnit.unit}
                        </TableCell>
                      </TableRow>
                    )}
                    {enhancedTransistor.collectorCapacitanceWithUnit && (
                      <TableRow>
                        <TableCell className="font-medium">Collector Capacitance</TableCell>
                        <TableCell>
                          {enhancedTransistor.collectorCapacitanceWithUnit.value} {enhancedTransistor.collectorCapacitanceWithUnit.unit}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="applications" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Recommended Applications</h3>
                <p className="text-muted-foreground">{applications}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Application Notes</h3>
                {transistor.polarity === "NPN" ? (
                  <div className="space-y-2">
                    <p>This NPN transistor is designed to operate with a positive collector voltage relative to the emitter. The base must be positive relative to the emitter to turn on the transistor.</p>
                    <p>Key considerations when using this transistor:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Ensure the collector current stays below the maximum rating</li>
                      <li>Keep junction temperature within safe limits during operation</li>
                      <li>Use appropriate heat sinking for power applications</li>
                      <li>Consider frequency limitations for high-speed applications</li>
                    </ul>
                  </div>
                ) : transistor.polarity === "PNP" ? (
                  <div className="space-y-2">
                    <p>This PNP transistor is designed to operate with a negative collector voltage relative to the emitter. The base must be negative relative to the emitter to turn on the transistor.</p>
                    <p>Key considerations when using this transistor:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Ensure the collector current stays below the maximum rating</li>
                      <li>Keep junction temperature within safe limits during operation</li>
                      <li>Use appropriate heat sinking for power applications</li>
                      <li>Consider frequency limitations for high-speed applications</li>
                    </ul>
                  </div>
                ) : (
                  <p>Application notes for this transistor type are not available.</p>
                )}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Circuit Examples</h3>
                {transistor.polarity === "NPN" ? (
                  <div className="space-y-2">
                    <p>Common NPN transistor circuits include:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Common emitter amplifier</li>
                      <li>Common collector (emitter follower)</li>
                      <li>Common base configuration</li>
                      <li>Darlington pair for high current gain</li>
                      <li>Switching circuits</li>
                    </ul>
                  </div>
                ) : transistor.polarity === "PNP" ? (
                  <div className="space-y-2">
                    <p>Common PNP transistor circuits include:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Common emitter amplifier (with inverted power supply)</li>
                      <li>Common collector (emitter follower)</li>
                      <li>Common base configuration</li>
                      <li>Darlington pair for high current gain</li>
                      <li>High-side switching applications</li>
                    </ul>
                  </div>
                ) : (
                  <p>Circuit examples for this transistor type are not available.</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="datasheets" className="mt-4">
            {transistor.datasheets && transistor.datasheets.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-2">Available Datasheets</h3>
                <ul className="space-y-2">
                  {transistor.datasheets.map((datasheet, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <a
                        href={datasheet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {datasheet.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No datasheets available for this transistor.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Manufacturer: {transistor.manufacturer}
        </div>
        <div className="text-sm text-muted-foreground">
          Package: {transistor.package}
        </div>
      </CardFooter>
    </Card>
  )
}
