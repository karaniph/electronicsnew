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

// Circuit template data - this would normally come from your database
const getCircuitData = (id) => {
  // Basic circuits
  if (id === "led-simple") {
    return {
      id: "led-simple",
      name: "Simple LED Circuit",
      description: "Basic LED circuit with current limiting resistor",
      difficulty: "Beginner",
      components: [
        { name: "LED", quantity: 1, notes: "Any color, standard 5mm" },
        { name: "Resistor", quantity: 1, value: "220Ω", notes: "1/4 watt" },
        { name: "Battery/Power Source", quantity: 1, value: "3-12V", notes: "Battery, power supply, or Arduino pin" }
      ],
      instructions: `
        <h3>Circuit Description</h3>
        <p>This is the most basic electronic circuit. It demonstrates how to properly connect an LED to a power source using a current-limiting resistor to protect the LED from excessive current.</p>
        
        <h3>How It Works</h3>
        <p>LEDs are diodes that emit light when current flows through them. However, they have very low internal resistance, so they need an external resistor to limit the current. Without this resistor, the LED would draw too much current and burn out quickly.</p>
        
        <h3>Assembly Instructions</h3>
        <ol>
          <li>Identify the positive (anode) and negative (cathode) legs of the LED. The longer leg is usually the anode, and the cathode may have a flat spot on the LED's plastic housing.</li>
          <li>Connect the resistor to the anode (positive/longer leg) of the LED.</li>
          <li>Connect the other end of the resistor to the positive terminal of your power source.</li>
          <li>Connect the cathode (negative/shorter leg) of the LED to the negative terminal of your power source.</li>
        </ol>
        
        <h3>Calculations</h3>
        <p>The resistor value is calculated using Ohm's Law: R = (V<sub>source</sub> - V<sub>LED</sub>) / I<sub>LED</sub></p>
        <p>For a typical red LED:</p>
        <ul>
          <li>V<sub>LED</sub> ≈ 1.8V (forward voltage drop)</li>
          <li>I<sub>LED</sub> ≈ 20mA (0.02A) for good brightness</li>
          <li>For a 9V source: R = (9V - 1.8V) / 0.02A = 360Ω (use 330Ω or 470Ω standard value)</li>
          <li>For a 5V source: R = (5V - 1.8V) / 0.02A = 160Ω (use 150Ω or 220Ω standard value)</li>
        </ul>
        
        <h3>Troubleshooting</h3>
        <ul>
          <li>LED doesn't light up: Check polarity of LED and power source. Ensure all connections are secure.</li>
          <li>LED is too dim: Reduce resistor value (but not below the calculated minimum).</li>
          <li>LED burns out quickly: Increase resistor value or check power source voltage.</li>
        </ul>
        
        <h3>Variations</h3>
        <ul>
          <li>Use different color LEDs (note that different colors have different forward voltage drops).</li>
          <li>Add a switch in series to turn the LED on and off.</li>
          <li>Use a potentiometer instead of a fixed resistor to create a dimmer.</li>
        </ul>
      `,
      imageUrl: "/images/circuits/led-simple.svg",
      schematicUrl: "/images/schematics/led-simple-schematic.svg",
      isPremium: false
    };
  }
  
  if (id === "common-emitter") {
    return {
      id: "common-emitter",
      name: "Common Emitter Amplifier",
      description: "Basic single-stage amplifier with voltage gain",
      difficulty: "Beginner",
      components: [
        { name: "NPN Transistor", quantity: 1, value: "2N3904", notes: "General purpose NPN transistor" },
        { name: "Resistors", quantity: 4, value: "10kΩ, 2.2kΩ, 1kΩ, 100Ω", notes: "1/4 watt" },
        { name: "Capacitors", quantity: 2, value: "10µF, 100µF", notes: "Electrolytic, 16V or higher" },
        { name: "Battery/Power Source", quantity: 1, value: "9-12V", notes: "DC power supply or battery" }
      ],
      instructions: `
        <h3>Circuit Description</h3>
        <p>The common emitter amplifier is one of the most fundamental transistor amplifier configurations. It provides voltage gain and current gain, making it useful for amplifying small signals.</p>
        
        <h3>How It Works</h3>
        <p>In this circuit, the transistor's base is biased through a voltage divider (R1 and R2). The input signal is coupled through C1 to the base. As the base voltage varies with the input signal, it controls a larger current flow from collector to emitter, creating an amplified but inverted output signal at the collector. The emitter resistor (R4) provides stability and reduces distortion.</p>
        
        <h3>Assembly Instructions</h3>
        <ol>
          <li>Connect R1 (10kΩ) from the positive supply to the base of the transistor.</li>
          <li>Connect R2 (2.2kΩ) from the base of the transistor to ground.</li>
          <li>Connect R3 (1kΩ) from the positive supply to the collector of the transistor.</li>
          <li>Connect R4 (100Ω) from the emitter of the transistor to ground.</li>
          <li>Connect C1 (10µF) to the input signal source, with the positive terminal toward the input.</li>
          <li>Connect the other end of C1 to the base of the transistor.</li>
          <li>Connect C2 (100µF) with its positive terminal to the collector of the transistor.</li>
          <li>The other end of C2 is your amplified output.</li>
        </ol>
        
        <h3>Calculations</h3>
        <p>For a 9V supply:</p>
        <ul>
          <li>Base voltage: V<sub>B</sub> ≈ 9V × 2.2kΩ/(10kΩ + 2.2kΩ) ≈ 1.8V</li>
          <li>Base-emitter voltage: V<sub>BE</sub> ≈ 0.7V (silicon transistor)</li>
          <li>Emitter voltage: V<sub>E</sub> = V<sub>B</sub> - V<sub>BE</sub> ≈ 1.1V</li>
          <li>Emitter current: I<sub>E</sub> = V<sub>E</sub>/R<sub>4</sub> ≈ 1.1V/100Ω ≈ 11mA</li>
          <li>Collector current: I<sub>C</sub> ≈ I<sub>E</sub> ≈ 11mA</li>
          <li>Collector voltage: V<sub>C</sub> = 9V - I<sub>C</sub> × R<sub>3</sub> ≈ 9V - 11mA × 1kΩ ≈ 9V - 11V ≈ 4.9V</li>
          <li>Voltage gain: A<sub>v</sub> ≈ -R<sub>3</sub>/R<sub>4</sub> ≈ -1kΩ/100Ω ≈ -10 (negative sign indicates phase inversion)</li>
        </ul>
        
        <h3>Troubleshooting</h3>
        <ul>
          <li>No amplification: Check transistor orientation, verify biasing resistors are correct.</li>
          <li>Distorted output: Input signal may be too large, reduce input amplitude.</li>
          <li>DC offset at output: Check biasing resistors and ensure capacitors are properly connected.</li>
        </ul>
        
        <h3>Variations</h3>
        <ul>
          <li>Increase R3 to increase voltage gain (at the expense of reduced output swing).</li>
          <li>Add a bypass capacitor across R4 to increase gain at higher frequencies.</li>
          <li>Replace R1 and R2 with a potentiometer to make the bias adjustable.</li>
        </ul>
      `,
      imageUrl: "/images/circuits/common-emitter.svg",
      schematicUrl: "/images/schematics/common-emitter-schematic.svg",
      isPremium: false
    };
  }
  
  // Premium circuit example
  if (id === "class-a-amplifier") {
    return {
      id: "class-a-amplifier",
      name: "Class A Amplifier",
      description: "High fidelity audio amplifier with single-ended output",
      difficulty: "Intermediate",
      components: [
        { name: "NPN Transistor", quantity: 1, value: "2N3904", notes: "General purpose NPN transistor" },
        { name: "Resistors", quantity: 5, value: "100kΩ, 10kΩ, 4.7kΩ, 1kΩ, 470Ω", notes: "1/4 watt" },
        { name: "Capacitors", quantity: 3, value: "10µF, 47µF, 100µF", notes: "Electrolytic, 16V or higher" },
        { name: "Battery/Power Source", quantity: 1, value: "12V", notes: "DC power supply or battery" }
      ],
      instructions: `
        <h3>Circuit Description</h3>
        <p>The Class A amplifier is known for its high fidelity and low distortion. It operates with the transistor conducting for the entire input cycle, which provides excellent linearity but lower efficiency.</p>
        
        <h3>How It Works</h3>
        <p>The transistor is biased to operate in the middle of its linear region, allowing it to amplify both the positive and negative portions of the input signal without crossover distortion. The transistor conducts continuously, even with no input signal, which results in higher power consumption but better audio quality.</p>
        
        <h3>Assembly Instructions</h3>
        <ol>
          <li>Connect the 100kΩ and 10kΩ resistors as a voltage divider from the positive supply to ground.</li>
          <li>Connect the junction of these resistors to the base of the transistor through the 10µF capacitor.</li>
          <li>Connect the 4.7kΩ resistor from the positive supply to the base of the transistor.</li>
          <li>Connect the 1kΩ resistor from the positive supply to the collector of the transistor.</li>
          <li>Connect the 470Ω resistor from the emitter of the transistor to ground.</li>
          <li>Connect the 47µF capacitor from the emitter to ground (bypass capacitor).</li>
          <li>Connect the 100µF capacitor from the collector to the output.</li>
        </ol>
        
        <h3>Calculations</h3>
        <p>For a 12V supply:</p>
        <ul>
          <li>Base current: I<sub>B</sub> ≈ (12V - 0.7V) / (4.7kΩ + β × 470Ω) ≈ 0.24mA (assuming β = 100)</li>
          <li>Collector current: I<sub>C</sub> = β × I<sub>B</sub> ≈ 100 × 0.24mA ≈ 24mA</li>
          <li>Collector voltage: V<sub>C</sub> = 12V - I<sub>C</sub> × 1kΩ ≈ 12V - 24mA × 1kΩ ≈ 6V</li>
          <li>Emitter voltage: V<sub>E</sub> = I<sub>C</sub> × 470Ω ≈ 24mA × 470Ω ≈ 11.3V</li>
          <li>Voltage gain: A<sub>v</sub> ≈ 1kΩ / 470Ω ≈ 2.1</li>
        </ul>
        
        <h3>Troubleshooting</h3>
        <ul>
          <li>Distorted output: Check biasing resistors, ensure collector voltage is approximately half the supply voltage.</li>
          <li>Low gain: Verify all component values, especially the collector and emitter resistors.</li>
          <li>Excessive heat: The transistor may need a heat sink, or the bias current may be too high.</li>
        </ul>
        
        <h3>Variations</h3>
        <ul>
          <li>Use a higher power transistor (e.g., 2N2222 or BD139) for more output power.</li>
          <li>Add a volume control potentiometer at the input.</li>
          <li>Implement a tone control network between stages for bass and treble adjustment.</li>
          <li>Cascade multiple stages for higher gain.</li>
        </ul>
        
        <h3>Performance Characteristics</h3>
        <ul>
          <li>Frequency response: Approximately 20Hz to 20kHz (audio range)</li>
          <li>Total harmonic distortion: Less than 1% at typical listening levels</li>
          <li>Power output: Approximately 50-100mW with the specified components</li>
          <li>Efficiency: 25-30% (typical for Class A operation)</li>
        </ul>
      `,
      imageUrl: "/images/circuits/class-a-amplifier.svg",
      schematicUrl: "/images/schematics/class-a-amplifier-schematic.svg",
      isPremium: true
    };
  }
  
  // Default circuit data if ID not found
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
