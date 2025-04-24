"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Premium check component
function PremiumCheck({ children, showFreeContent = true }) {
  const { data: session, status } = useSession();
  const isPremium = session?.user?.subscriptionTier === "premium";
  
  if (status === "loading") {
    return (
      <div className="text-center py-12">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!session) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Sign in Required</h2>
        <p className="mb-6">Please sign in to access circuit templates</p>
        <Button asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    );
  }
  
  if (!isPremium && !showFreeContent) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Premium Feature</h2>
        <p className="mb-6">This content is available to premium subscribers only</p>
        <Button asChild>
          <Link href="/circuits/premium">Upgrade Now</Link>
        </Button>
      </div>
    );
  }
  
  return children;
}

// Circuit template data
const circuitTemplates = {
  basic: [
    {
      id: "led-simple",
      name: "Simple LED Circuit",
      description: "Basic LED circuit with current limiting resistor",
      difficulty: "Beginner",
      components: ["LED", "Resistor (220Ω)", "Battery/Power Source"],
      imageUrl: "/images/circuits/led-simple.svg",
      isPremium: false
    },
    {
      id: "led-series",
      name: "LEDs in Series",
      description: "Multiple LEDs connected in series with a single resistor",
      difficulty: "Beginner",
      components: ["LEDs (3)", "Resistor (470Ω)", "Battery/Power Source"],
      imageUrl: "/images/circuits/led-series.svg",
      isPremium: false
    },
    {
      id: "led-parallel",
      name: "LEDs in Parallel",
      description: "Multiple LEDs connected in parallel with individual resistors",
      difficulty: "Beginner",
      components: ["LEDs (3)", "Resistors (220Ω) (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/led-parallel.svg",
      isPremium: false
    },
    {
      id: "led-flasher",
      name: "LED Flasher Circuit",
      description: "Simple circuit to make an LED flash using a 555 timer",
      difficulty: "Intermediate",
      components: ["555 Timer IC", "LED", "Resistors (2)", "Capacitor", "Battery/Power Source"],
      imageUrl: "/images/circuits/led-flasher.svg",
      isPremium: false
    }
  ],
  amplifiers: [
    {
      id: "common-emitter",
      name: "Common Emitter Amplifier",
      description: "Basic single-stage amplifier with voltage gain",
      difficulty: "Beginner",
      components: ["NPN Transistor (2N3904)", "Resistors (4)", "Capacitors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/common-emitter.svg",
      isPremium: false
    },
    {
      id: "darlington-pair",
      name: "Darlington Pair",
      description: "High current gain amplifier using two transistors",
      difficulty: "Intermediate",
      components: ["NPN Transistors (2N3904) (2)", "Resistors (3)", "Capacitor", "Battery/Power Source"],
      imageUrl: "/images/circuits/darlington-pair.svg",
      isPremium: false
    },
    {
      id: "differential-amplifier",
      name: "Differential Amplifier",
      description: "Amplifies the difference between two input signals",
      difficulty: "Advanced",
      components: ["NPN Transistors (2N3904) (2)", "Resistors (5)", "Current Source", "Battery/Power Source"],
      imageUrl: "/images/circuits/differential-amplifier.svg",
      isPremium: true
    }
  ],
  oscillators: [
    {
      id: "astable-multivibrator",
      name: "Astable Multivibrator",
      description: "Square wave oscillator using two transistors",
      difficulty: "Intermediate",
      components: ["NPN Transistors (2N3904) (2)", "Resistors (4)", "Capacitors (2)", "LEDs (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/astable-multivibrator.svg",
      isPremium: false
    },
    {
      id: "wien-bridge",
      name: "Wien Bridge Oscillator",
      description: "Sine wave oscillator using op-amp",
      difficulty: "Advanced",
      components: ["Op-Amp (LM741)", "Resistors (4)", "Capacitors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/wien-bridge.svg",
      isPremium: true
    }
  ],
  power: [
    {
      id: "voltage-regulator",
      name: "Transistor Voltage Regulator",
      description: "Simple voltage regulator using a transistor and zener diode",
      difficulty: "Beginner",
      components: ["NPN Transistor (2N3055)", "Zener Diode", "Resistors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/voltage-regulator.svg",
      isPremium: false
    },
    {
      id: "buck-converter",
      name: "Buck Converter",
      description: "Step-down DC-DC converter",
      difficulty: "Advanced",
      components: ["MOSFET", "Diode", "Inductor", "Capacitors (2)", "Resistors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/buck-converter.svg",
      isPremium: true
    }
  ],
  sensors: [
    {
      id: "ldr-circuit",
      name: "Light Sensor Circuit",
      description: "Light-dependent resistor circuit to detect brightness",
      difficulty: "Beginner",
      components: ["LDR (Light Dependent Resistor)", "Resistor", "LED", "NPN Transistor (2N3904)", "Battery/Power Source"],
      imageUrl: "/images/circuits/ldr-circuit.svg",
      isPremium: false
    },
    {
      id: "temperature-sensor",
      name: "Temperature Sensor",
      description: "Simple temperature sensing circuit using a thermistor",
      difficulty: "Intermediate",
      components: ["Thermistor", "Resistor", "Op-Amp (LM358)", "Resistors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/temperature-sensor.svg",
      isPremium: true
    }
  ]
};

// Premium circuit templates (40 more designs)
const premiumCircuitTemplates = {
  amplifiers: [
    {
      id: "class-a-amplifier",
      name: "Class A Amplifier",
      description: "High fidelity audio amplifier with single-ended output",
      difficulty: "Intermediate",
      components: ["NPN Transistor (2N3904)", "Resistors (5)", "Capacitors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/class-a-amplifier.svg",
      isPremium: true
    },
    {
      id: "class-b-amplifier",
      name: "Class B Push-Pull Amplifier",
      description: "Efficient audio amplifier with complementary transistors",
      difficulty: "Advanced",
      components: ["NPN Transistor (2N3904)", "PNP Transistor (2N3906)", "Resistors (6)", "Capacitors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/class-b-amplifier.svg",
      isPremium: true
    },
    {
      id: "class-ab-amplifier",
      name: "Class AB Amplifier",
      description: "Improved push-pull amplifier with reduced crossover distortion",
      difficulty: "Advanced",
      components: ["NPN Transistor (2N3904)", "PNP Transistor (2N3906)", "Diodes (2)", "Resistors (7)", "Capacitors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/class-ab-amplifier.svg",
      isPremium: true
    },
    {
      id: "cascode-amplifier",
      name: "Cascode Amplifier",
      description: "High frequency amplifier with improved bandwidth",
      difficulty: "Advanced",
      components: ["NPN Transistors (2N3904) (2)", "Resistors (5)", "Capacitors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/cascode-amplifier.svg",
      isPremium: true
    },
    {
      id: "jfet-amplifier",
      name: "JFET Amplifier",
      description: "High input impedance amplifier using JFET",
      difficulty: "Intermediate",
      components: ["JFET (2N5457)", "Resistors (4)", "Capacitors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/jfet-amplifier.svg",
      isPremium: true
    },
    {
      id: "mosfet-amplifier",
      name: "MOSFET Amplifier",
      description: "Power amplifier using MOSFET",
      difficulty: "Advanced",
      components: ["MOSFET (IRF540)", "Resistors (4)", "Capacitors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/mosfet-amplifier.svg",
      isPremium: true
    },
    {
      id: "instrumentation-amplifier",
      name: "Instrumentation Amplifier",
      description: "Precision differential amplifier for sensor applications",
      difficulty: "Advanced",
      components: ["Op-Amps (LM358) (3)", "Resistors (7)", "Battery/Power Source"],
      imageUrl: "/images/circuits/instrumentation-amplifier.svg",
      isPremium: true
    },
    {
      id: "audio-preamp",
      name: "Audio Preamplifier",
      description: "Low-noise preamplifier for microphone or audio input",
      difficulty: "Intermediate",
      components: ["NPN Transistor (BC549C)", "Resistors (5)", "Capacitors (4)", "Battery/Power Source"],
      imageUrl: "/images/circuits/audio-preamp.svg",
      isPremium: true
    }
  ],
  oscillators: [
    {
      id: "colpitts-oscillator",
      name: "Colpitts Oscillator",
      description: "LC oscillator using capacitive voltage divider",
      difficulty: "Advanced",
      components: ["NPN Transistor (2N3904)", "Resistors (3)", "Capacitors (3)", "Inductor", "Battery/Power Source"],
      imageUrl: "/images/circuits/colpitts-oscillator.svg",
      isPremium: true
    },
    {
      id: "hartley-oscillator",
      name: "Hartley Oscillator",
      description: "LC oscillator using inductive voltage divider",
      difficulty: "Advanced",
      components: ["NPN Transistor (2N3904)", "Resistors (3)", "Capacitors (2)", "Inductors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/hartley-oscillator.svg",
      isPremium: true
    },
    {
      id: "crystal-oscillator",
      name: "Crystal Oscillator",
      description: "Precise frequency oscillator using quartz crystal",
      difficulty: "Intermediate",
      components: ["Inverter (74HC04)", "Crystal", "Resistor", "Capacitors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/crystal-oscillator.svg",
      isPremium: true
    },
    {
      id: "phase-shift-oscillator",
      name: "Phase Shift Oscillator",
      description: "RC oscillator using phase shifting network",
      difficulty: "Intermediate",
      components: ["Op-Amp (LM741)", "Resistors (4)", "Capacitors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/phase-shift-oscillator.svg",
      isPremium: true
    },
    {
      id: "relaxation-oscillator",
      name: "Relaxation Oscillator",
      description: "Simple oscillator using UJT",
      difficulty: "Intermediate",
      components: ["UJT (2N2646)", "Resistors (2)", "Capacitor", "Battery/Power Source"],
      imageUrl: "/images/circuits/relaxation-oscillator.svg",
      isPremium: true
    },
    {
      id: "vco-circuit",
      name: "Voltage Controlled Oscillator",
      description: "Oscillator with frequency controlled by input voltage",
      difficulty: "Advanced",
      components: ["Op-Amp (LM741)", "Resistors (5)", "Capacitors (2)", "Diodes (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/vco-circuit.svg",
      isPremium: true
    }
  ],
  power: [
    {
      id: "boost-converter",
      name: "Boost Converter",
      description: "Step-up DC-DC converter",
      difficulty: "Advanced",
      components: ["MOSFET", "Diode", "Inductor", "Capacitors (2)", "Resistors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/boost-converter.svg",
      isPremium: true
    },
    {
      id: "flyback-converter",
      name: "Flyback Converter",
      description: "Isolated DC-DC converter",
      difficulty: "Advanced",
      components: ["MOSFET", "Diode", "Transformer", "Capacitors (2)", "Resistors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/flyback-converter.svg",
      isPremium: true
    },
    {
      id: "lm317-regulator",
      name: "LM317 Adjustable Regulator",
      description: "Adjustable voltage regulator circuit",
      difficulty: "Beginner",
      components: ["LM317 Regulator", "Resistors (2)", "Capacitors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/lm317-regulator.svg",
      isPremium: true
    },
    {
      id: "current-limiter",
      name: "Current Limiter Circuit",
      description: "Protects circuits from excessive current",
      difficulty: "Intermediate",
      components: ["NPN Transistor (2N3904)", "PNP Transistor (2N3906)", "Resistors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/current-limiter.svg",
      isPremium: true
    },
    {
      id: "crowbar-circuit",
      name: "Crowbar Protection Circuit",
      description: "Overvoltage protection circuit",
      difficulty: "Intermediate",
      components: ["SCR (TYN612)", "Zener Diode", "Resistor", "Fuse", "Battery/Power Source"],
      imageUrl: "/images/circuits/crowbar-circuit.svg",
      isPremium: true
    },
    {
      id: "solar-charger",
      name: "Solar Battery Charger",
      description: "Charges batteries using solar panels",
      difficulty: "Intermediate",
      components: ["Solar Panel", "Diode", "Resistor", "Battery"],
      imageUrl: "/images/circuits/solar-charger.svg",
      isPremium: true
    }
  ],
  digital: [
    {
      id: "rs-flip-flop",
      name: "RS Flip-Flop",
      description: "Basic memory element using discrete gates",
      difficulty: "Beginner",
      components: ["NOR Gates (2) or NAND Gates (2)", "LEDs (2)", "Resistors (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/rs-flip-flop.svg",
      isPremium: true
    },
    {
      id: "jk-flip-flop",
      name: "JK Flip-Flop",
      description: "Versatile flip-flop with no invalid states",
      difficulty: "Intermediate",
      components: ["NAND Gates (4)", "LEDs (2)", "Resistors (4)", "Battery/Power Source"],
      imageUrl: "/images/circuits/jk-flip-flop.svg",
      isPremium: true
    },
    {
      id: "binary-counter",
      name: "4-Bit Binary Counter",
      description: "Counts pulses and displays in binary",
      difficulty: "Intermediate",
      components: ["JK Flip-Flops (4)", "LEDs (4)", "Resistors (4)", "Push Button", "Battery/Power Source"],
      imageUrl: "/images/circuits/binary-counter.svg",
      isPremium: true
    },
    {
      id: "decade-counter",
      name: "Decade Counter",
      description: "Counts from 0 to 9 using 7-segment display",
      difficulty: "Advanced",
      components: ["CD4017 Counter IC", "7-Segment Display", "Resistors (8)", "Capacitor", "555 Timer", "Battery/Power Source"],
      imageUrl: "/images/circuits/decade-counter.svg",
      isPremium: true
    },
    {
      id: "logic-probe",
      name: "Logic Probe",
      description: "Tests digital logic states in circuits",
      difficulty: "Beginner",
      components: ["Op-Amp (LM358)", "LEDs (2)", "Resistors (5)", "Battery/Power Source"],
      imageUrl: "/images/circuits/logic-probe.svg",
      isPremium: true
    }
  ],
  sensors: [
    {
      id: "pir-sensor",
      name: "PIR Motion Detector",
      description: "Detects motion using passive infrared sensor",
      difficulty: "Intermediate",
      components: ["PIR Sensor Module", "NPN Transistor (2N3904)", "Resistors (3)", "LED", "Battery/Power Source"],
      imageUrl: "/images/circuits/pir-sensor.svg",
      isPremium: true
    },
    {
      id: "ultrasonic-sensor",
      name: "Ultrasonic Distance Sensor",
      description: "Measures distance using ultrasonic waves",
      difficulty: "Advanced",
      components: ["HC-SR04 Ultrasonic Sensor", "Arduino Nano", "LEDs (3)", "Resistors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/ultrasonic-sensor.svg",
      isPremium: true
    },
    {
      id: "humidity-sensor",
      name: "Humidity Sensor Circuit",
      description: "Measures relative humidity",
      difficulty: "Intermediate",
      components: ["DHT11 Sensor", "Arduino Nano", "Resistor", "Battery/Power Source"],
      imageUrl: "/images/circuits/humidity-sensor.svg",
      isPremium: true
    },
    {
      id: "gas-sensor",
      name: "Gas Detector Circuit",
      description: "Detects combustible gases",
      difficulty: "Intermediate",
      components: ["MQ-2 Gas Sensor", "Op-Amp (LM358)", "Resistors (4)", "LED", "Buzzer", "Battery/Power Source"],
      imageUrl: "/images/circuits/gas-sensor.svg",
      isPremium: true
    },
    {
      id: "touch-sensor",
      name: "Touch Sensor Circuit",
      description: "Detects human touch",
      difficulty: "Beginner",
      components: ["MOSFET (BS170)", "Resistors (2)", "LED", "Battery/Power Source"],
      imageUrl: "/images/circuits/touch-sensor.svg",
      isPremium: true
    }
  ],
  audio: [
    {
      id: "audio-mixer",
      name: "Audio Mixer Circuit",
      description: "Mixes multiple audio sources",
      difficulty: "Intermediate",
      components: ["Op-Amp (LM358)", "Resistors (7)", "Capacitors (3)", "Potentiometers (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/audio-mixer.svg",
      isPremium: true
    },
    {
      id: "tone-control",
      name: "Bass and Treble Control",
      description: "Audio tone control circuit",
      difficulty: "Intermediate",
      components: ["Op-Amp (LM358)", "Resistors (6)", "Capacitors (4)", "Potentiometers (2)", "Battery/Power Source"],
      imageUrl: "/images/circuits/tone-control.svg",
      isPremium: true
    },
    {
      id: "guitar-preamp",
      name: "Guitar Preamplifier",
      description: "Preamplifier for electric guitar",
      difficulty: "Intermediate",
      components: ["JFET (2N5457)", "Resistors (5)", "Capacitors (4)", "Potentiometer", "Battery/Power Source"],
      imageUrl: "/images/circuits/guitar-preamp.svg",
      isPremium: true
    },
    {
      id: "intercom",
      name: "Two-Way Intercom",
      description: "Simple intercom system",
      difficulty: "Intermediate",
      components: ["Op-Amp (LM386) (2)", "Speakers (2)", "Microphones (2)", "Resistors (6)", "Capacitors (6)", "DPDT Switch", "Battery/Power Source"],
      imageUrl: "/images/circuits/intercom.svg",
      isPremium: true
    },
    {
      id: "white-noise",
      name: "White Noise Generator",
      description: "Generates random noise for audio effects",
      difficulty: "Intermediate",
      components: ["NPN Transistor (2N3904)", "Zener Diode", "Resistors (4)", "Capacitors (3)", "Battery/Power Source"],
      imageUrl: "/images/circuits/white-noise.svg",
      isPremium: true
    }
  ]
};

export default function CircuitTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("basic");
  const { data: session } = useSession();
  const isPremium = session?.user?.subscriptionTier === "premium";
  
  // Combine free and premium templates based on user subscription
  const getTemplates = (category) => {
    const freeTemplates = circuitTemplates[category] || [];
    const premiumTemplatesForCategory = premiumCircuitTemplates[category] || [];
    
    // If user is premium, show all templates
    if (isPremium) {
      return [...freeTemplates, ...premiumTemplatesForCategory];
    }
    
    // If user is not premium, show only free templates and premium templates with a lock
    return [...freeTemplates, ...premiumTemplatesForCategory.map(template => ({
      ...template,
      locked: true
    }))];
  };
  
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
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Circuit Design Templates</h1>
          <p className="text-muted-foreground">
            Ready-to-use circuit designs with component lists and instructions
          </p>
        </div>
        
        {!isPremium && (
          <div className="mt-4 md:mt-0">
            <Button onClick={handleUpgrade} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Upgrade to Premium - $5.99
            </Button>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              Unlock 40+ premium circuit designs
            </p>
          </div>
        )}
      </div>
      
      <PremiumCheck showFreeContent={true}>
        <Tabs defaultValue="basic" onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="amplifiers">Amplifiers</TabsTrigger>
            <TabsTrigger value="oscillators">Oscillators</TabsTrigger>
            <TabsTrigger value="power">Power</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="digital">Digital</TabsTrigger>
          </TabsList>
          
          {Object.keys({...circuitTemplates, ...premiumCircuitTemplates}).map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTemplates(category).map((template) => (
                  <Card key={template.id} className={`overflow-hidden ${template.locked ? 'opacity-70' : ''}`}>
                    <div className="aspect-video bg-muted flex items-center justify-center relative">
                      <img 
                        src={template.imageUrl} 
                        alt={template.name} 
                        className="h-full w-full object-contain p-4" 
                      />
                      {(template.isPremium && !isPremium) && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="bg-primary text-primary-foreground rounded-full p-2 inline-block mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                              </svg>
                            </div>
                            <p className="font-medium text-white">Premium Design</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{template.name}</CardTitle>
                        <Badge variant={template.difficulty === "Beginner" ? "default" : template.difficulty === "Intermediate" ? "secondary" : "destructive"} className="text-xs">
                          {template.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-medium mb-2">Components:</h4>
                      <ul className="text-sm text-muted-foreground">
                        {template.components.map((component, i) => (
                          <li key={i}>{component}</li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {(template.isPremium && !isPremium) ? (
                        <Button onClick={handleUpgrade} className="w-full">
                          Unlock Premium Design
                        </Button>
                      ) : (
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/circuits/${template.id}`}>
                            View Full Design
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </PremiumCheck>
      
      {!isPremium && (
        <div className="mt-12 p-6 border rounded-lg bg-muted/50">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">Unlock 40+ Premium Circuit Designs</h2>
              <p className="mb-4">
                Get access to advanced circuit designs including audio amplifiers, digital circuits, 
                sensor interfaces, power supplies, and more. Each design includes detailed instructions, 
                component lists, and circuit diagrams.
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
                  <svg xmlns="http://www.w3.org/2000/24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500 mr-2">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  High-quality circuit diagrams
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500 mr-2">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Troubleshooting tips and variations
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
    </div>
  );
}
