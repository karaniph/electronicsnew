"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { searchComponents } from "@/lib/component-data"
import type { Component } from "@/types/component"
import type { TransistorComponent } from "@/types/transistor"
import { determineTransistorApplication } from "@/lib/transistor-utils"

export function TransistorFinder() {
  const [searchParams, setSearchParams] = React.useState({
    polarity: "",
    minVoltage: 0,
    maxVoltage: 300,
    minCurrent: 0,
    maxCurrent: 20,
    minPower: 0,
    maxPower: 200,
    package: "",
    application: "",
  })
  
  const [searchResults, setSearchResults] = React.useState<TransistorComponent[]>([])
  const [isSearching, setIsSearching] = React.useState(false)
  
  // Function to handle search
  const handleSearch = async () => {
    setIsSearching(true)
    
    try {
      // Build search query based on parameters
      let query = "transistor"
      
      if (searchParams.polarity) {
        query += ` ${searchParams.polarity}`
      }
      
      if (searchParams.package) {
        query += ` ${searchParams.package}`
      }
      
      if (searchParams.application) {
        query += ` ${searchParams.application}`
      }
      
      // Search for components
      const results = await searchComponents(query)
      
      // Filter results based on numeric parameters
      const filteredResults = results.data.filter((component) => {
        // Check if it's a transistor
        if (!component.type.toLowerCase().includes("transistor")) {
          return false
        }
        
        const transistor = component as TransistorComponent
        
        // Filter by voltage
        if (transistor.maxCollectorEmitterVoltage) {
          if (transistor.maxCollectorEmitterVoltage < searchParams.minVoltage || 
              transistor.maxCollectorEmitterVoltage > searchParams.maxVoltage) {
            return false
          }
        }
        
        // Filter by current
        if (transistor.maxCollectorCurrent) {
          if (transistor.maxCollectorCurrent < searchParams.minCurrent || 
              transistor.maxCollectorCurrent > searchParams.maxCurrent) {
            return false
          }
        }
        
        // Filter by power
        if (transistor.maxPowerDissipation) {
          if (transistor.maxPowerDissipation < searchParams.minPower || 
              transistor.maxPowerDissipation > searchParams.maxPower) {
            return false
          }
        }
        
        // Filter by polarity if specified
        if (searchParams.polarity && transistor.polarity) {
          if (!transistor.polarity.toLowerCase().includes(searchParams.polarity.toLowerCase())) {
            return false
          }
        }
        
        // Filter by package if specified
        if (searchParams.package && transistor.package) {
          if (!transistor.package.toLowerCase().includes(searchParams.package.toLowerCase())) {
            return false
          }
        }
        
        // Filter by application if specified
        if (searchParams.application) {
          const applications = determineTransistorApplication(transistor)
          if (!applications.includes(searchParams.application.toLowerCase())) {
            return false
          }
        }
        
        return true
      })
      
      setSearchResults(filteredResults as TransistorComponent[])
    } catch (error) {
      console.error("Error searching for transistors:", error)
    } finally {
      setIsSearching(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transistor Finder</CardTitle>
          <CardDescription>
            Find the right transistor for your application by specifying your requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Parameters</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Parameters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="polarity">Transistor Type</Label>
                  <Select
                    value={searchParams.polarity}
                    onValueChange={(value) => setSearchParams({ ...searchParams, polarity: value })}
                  >
                    <SelectTrigger id="polarity">
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any type</SelectItem>
                      <SelectItem value="NPN">NPN</SelectItem>
                      <SelectItem value="PNP">PNP</SelectItem>
                      <SelectItem value="N-Channel">N-Channel MOSFET</SelectItem>
                      <SelectItem value="P-Channel">P-Channel MOSFET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="package">Package</Label>
                  <Select
                    value={searchParams.package}
                    onValueChange={(value) => setSearchParams({ ...searchParams, package: value })}
                  >
                    <SelectTrigger id="package">
                      <SelectValue placeholder="Any package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any package</SelectItem>
                      <SelectItem value="TO-92">TO-92</SelectItem>
                      <SelectItem value="TO-220">TO-220</SelectItem>
                      <SelectItem value="TO-3">TO-3</SelectItem>
                      <SelectItem value="TO-126">TO-126</SelectItem>
                      <SelectItem value="SOT-23">SOT-23</SelectItem>
                      <SelectItem value="SOT-223">SOT-223</SelectItem>
                      <SelectItem value="DPAK">DPAK</SelectItem>
                      <SelectItem value="D2PAK">D2PAK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="application">Application</Label>
                  <Select
                    value={searchParams.application}
                    onValueChange={(value) => setSearchParams({ ...searchParams, application: value })}
                  >
                    <SelectTrigger id="application">
                      <SelectValue placeholder="Any application" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any application</SelectItem>
                      <SelectItem value="general">General Purpose</SelectItem>
                      <SelectItem value="switching">Switching</SelectItem>
                      <SelectItem value="amplification">Amplification</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="power">Power</SelectItem>
                      <SelectItem value="high-frequency">High Frequency</SelectItem>
                      <SelectItem value="rf">RF</SelectItem>
                      <SelectItem value="low-noise">Low Noise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Voltage Range (V)</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      defaultValue={[0, 300]}
                      max={300}
                      step={1}
                      value={[searchParams.minVoltage, searchParams.maxVoltage]}
                      onValueChange={([min, max]) => 
                        setSearchParams({ ...searchParams, minVoltage: min, maxVoltage: max })
                      }
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{searchParams.minVoltage}V</span>
                      <span>{searchParams.maxVoltage}V</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Current Range (A)</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      defaultValue={[0, 20]}
                      max={20}
                      step={0.1}
                      value={[searchParams.minCurrent, searchParams.maxCurrent]}
                      onValueChange={([min, max]) => 
                        setSearchParams({ ...searchParams, minCurrent: min, maxCurrent: max })
                      }
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{searchParams.minCurrent}A</span>
                      <span>{searchParams.maxCurrent}A</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Power Dissipation Range (W)</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      defaultValue={[0, 200]}
                      max={200}
                      step={1}
                      value={[searchParams.minPower, searchParams.maxPower]}
                      onValueChange={([min, max]) => 
                        setSearchParams({ ...searchParams, minPower: min, maxPower: max })
                      }
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{searchParams.minPower}W</span>
                      <span>{searchParams.maxPower}W</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? "Searching..." : "Find Transistors"}
          </Button>
        </CardFooter>
      </Card>
      
      {searchResults.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Search Results ({searchResults.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((transistor) => (
              <Card key={transistor.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{transistor.name}</CardTitle>
                    <Badge variant={transistor.polarity === "NPN" ? "default" : "secondary"}>
                      {transistor.polarity}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{transistor.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Voltage:</span>
                      <span>{transistor.maxCollectorEmitterVoltage || "N/A"} V</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Current:</span>
                      <span>{transistor.maxCollectorCurrent || "N/A"} A</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Power:</span>
                      <span>{transistor.maxPowerDissipation || "N/A"} W</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Package:</span>
                      <span>{transistor.package || "N/A"}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={`/component/${transistor.id}`}>View Details</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : isSearching ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Searching for transistors...</p>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Set your parameters and click "Find Transistors" to search.
          </p>
        </div>
      )}
    </div>
  )
}
