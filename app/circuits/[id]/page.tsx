"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Premium check component
function PremiumCheck({ children, showFreeContent = true, circuitId }) {
  const isPremium = false; // session?.user?.subscriptionTier === "premium";
  // Check if this is a premium circuit
  const [isPremiumCircuit, setIsPremiumCircuit] = useState(false);

  useEffect(() => {
    // Simulate checking if the circuit is premium
    const checkCircuitStatus = () => {
      setIsPremiumCircuit(false); // Replace with actual logic if needed
    };
    checkCircuitStatus();
  }, [circuitId]);

  // Removed all next-auth/session checks
  return children;
}

// --- IMPORT CIRCUIT DATA ---
import circuitTemplates from "../page";
import premiumCircuitTemplates from "../page";

// --- UTILITY: FLATTEN ALL CIRCUIT TEMPLATES INTO A SINGLE ARRAY ---
const getAllCircuits = () => {
  // Import (or require) the actual objects if possible; otherwise, copy-paste the objects here
  // For this implementation, we assume circuitTemplates and premiumCircuitTemplates are imported
  let all = [];
  // circuitTemplates: { [category]: [circuit, ...] }
  Object.values(circuitTemplates).forEach((arr) => {
    if (Array.isArray(arr)) all = all.concat(arr);
  });
  Object.values(premiumCircuitTemplates).forEach((arr) => {
    if (Array.isArray(arr)) all = all.concat(arr);
  });
  return all;
};

// --- ENHANCED GET CIRCUIT DATA ---
const getCircuitData = (id) => {
  const allCircuits = getAllCircuits();
  const found = allCircuits.find(c => c.id === id);
  if (!found) {
    return {
      id: "unknown",
      name: "Circuit Not Found",
      description: "The requested circuit template could not be found",
      difficulty: "Unknown",
      components: [],
      instructions: "<p>Circuit details not available.</p>",
      imageUrl: "/images/circuits/placeholder.svg",
      isPremium: false
    };
  }
  // Convert string components to detailed objects if needed
  const components = (found.components || []).map(item => {
    if (typeof item === "string") {
      // Try to parse string for value/qty
      const match = item.match(/^(.*?)\s*\((.*?)\)(.*)$/);
      if (match) {
        return {
          name: match[1].trim(),
          value: match[2].trim(),
          quantity: 1,
          notes: match[3].trim() || ""
        };
      }
      return { name: item, quantity: 1, value: "", notes: "" };
    }
    return item;
  });
  // Provide default instructions if missing
  const instructions = found.instructions || `<p>No detailed instructions available for this circuit. Please refer to the schematic and component list above.</p>`;
  return { ...found, components, instructions };
};

export default function CircuitDetailPage() {
  const params = useParams();
  const circuitId = params.id;
  const circuitData = getCircuitData(circuitId);
  const isPremium = false; // Removed session logic
  
  // Handle premium upgrade
  const handleUpgrade = async () => {
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="container mx-auto py-12">
      <PremiumCheck showFreeContent={!circuitData.isPremium} circuitId={circuitId}>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="mb-6">
              <Link href="/circuits" className="text-sm text-blue-500 hover:text-blue-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                Back to Circuit Templates
              </Link>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{circuitData.name}</h1>
              <Badge variant={circuitData.difficulty === "Beginner" ? "default" : circuitData.difficulty === "Intermediate" ? "secondary" : "destructive"}>
                {circuitData.difficulty}
              </Badge>
            </div>
            
            <p className="text-muted-foreground mb-6">{circuitData.description}</p>
            
            <div className="bg-muted rounded-lg overflow-hidden mb-6">
              <img 
                src={circuitData.imageUrl} 
                alt={circuitData.name} 
                className="w-full object-contain p-4" 
              />
            </div>
            
            {circuitData.schematicUrl && (
              <div className="bg-muted rounded-lg overflow-hidden mb-6">
                <h3 className="text-lg font-medium p-4 pb-0">Circuit Schematic</h3>
                <img 
                  src={circuitData.schematicUrl} 
                  alt={`${circuitData.name} Schematic`} 
                  className="w-full object-contain p-4" 
                />
              </div>
            )}
          </div>
          
          <div className="lg:w-1/2">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Components List</h2>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Component</th>
                      <th className="text-left pb-2">Quantity</th>
                      <th className="text-left pb-2">Value/Type</th>
                      <th className="text-left pb-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {circuitData.components.map((component, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2">{component.name}</td>
                        <td className="py-2">{component.quantity}</td>
                        <td className="py-2">{component.value || "-"}</td>
                        <td className="py-2 text-sm text-muted-foreground">{component.notes || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Instructions</h2>
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: circuitData.instructions }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {circuitData.isPremium && !isPremium && (
          <div className="mt-12 p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Unlock All Premium Circuit Designs</h2>
                <p className="mb-4">
                  This is a premium circuit design. Upgrade to access this and 40+ other premium circuit designs 
                  including audio amplifiers, digital circuits, sensor interfaces, power supplies, and more.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500 mr-2">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    Detailed step-by-step instructions
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500 mr-2">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    Complete component lists with specifications
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500 mr-2">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    High-quality circuit diagrams
                  </li>
                </ul>
              </div>
              <div className="md:w-1/3 text-center">
                <div className="text-4xl font-bold mb-2">$5.99</div>
                <p className="text-muted-foreground mb-4">One-time payment</p>
                <Button onClick={handleUpgrade} size="lg" className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Upgrade to Premium
                </Button>
              </div>
            </div>
          </div>
        )}
      </PremiumCheck>
    </div>
  );
}
