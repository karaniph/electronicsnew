"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

// Premium check component
function PremiumCheck({ children }) {
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
        <p className="mb-6">Please sign in to access the component selector tool</p>
        <Button asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    );
  }
  
  if (!isPremium) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Premium Feature</h2>
        <p className="mb-6">The component selector tool is available to premium subscribers</p>
        <Button asChild>
          <Link href="/circuits/premium">Upgrade Now</Link>
        </Button>
      </div>
    );
  }
  
  return children;
}

export default function ComponentSelectorPage() {
  const [application, setApplication] = useState("");
  const [circuitType, setCircuitType] = useState("");
  const [requirements, setRequirements] = useState({
    voltage: [0, 50],
    current: [0, 1],
    frequency: [0, 10],
    gain: [0, 100],
    noiseLevel: "any",
    powerDissipation: [0, 1],
  });
  
  const [recommendations, setRecommendations] = useState(null);
  
  const handleRequirementChange = (key, value) => {
    setRequirements({
      ...requirements,
      [key]: value,
    });
  };
  
  const handleSubmit = () => {
    // In a real implementation, this would query your database
    // For now, we'll simulate some recommendations
    
    const simulatedRecommendations = {
      primary: {
        name: "2N3904",
        description: "General purpose NPN transistor",
        reasons: [
          "Matches your voltage requirements",
          "Suitable for your current needs",
          "Good gain characteristics for this application",
        ],
        alternatives: [
          { name: "2N2222", score: 95 },
          { name: "BC547", score: 92 },
          { name: "PN2222A", score: 88 },
        ],
      },
    };
    
    if (application === "audio" && requirements.noiseLevel === "low") {
      simulatedRecommendations.primary = {
        name: "BC550C",
        description: "Low noise NPN transistor for audio applications",
        reasons: [
          "Extremely low noise figure (ideal for audio)",
          "Good gain linearity for audio amplification",
          "Matches your voltage and current requirements",
        ],
        alternatives: [
          { name: "2N5087", score: 94 },
          { name: "BC560C", score: 91 },
          { name: "MPSA18", score: 87 },
        ],
      };
    } else if (application === "power" && requirements.powerDissipation[1] > 0.5) {
      simulatedRecommendations.primary = {
        name: "TIP31C",
        description: "Medium power NPN transistor",
        reasons: [
          "High power handling capability",
          "Suitable for your voltage requirements",
          "Good thermal characteristics",
        ],
        alternatives: [
          { name: "2N3055", score: 96 },
          { name: "BD139", score: 90 },
          { name: "TIP41C", score: 89 },
        ],
      };
    } else if (application === "rf" && requirements.frequency[1] > 5) {
      simulatedRecommendations.primary = {
        name: "2N3866",
        description: "RF NPN transistor for high frequency applications",
        reasons: [
          "High transition frequency (fT)",
          "Low capacitance for RF applications",
          "Good gain at your target frequencies",
        ],
        alternatives: [
          { name: "2N5109", score: 93 },
          { name: "BFR96", score: 91 },
          { name: "2SC1971", score: 88 },
        ],
      };
    }
    
    setRecommendations(simulatedRecommendations);
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
      <h1 className="text-3xl font-bold mb-2">Component Selection Tool</h1>
      <p className="text-muted-foreground mb-8">
        Find the perfect transistor for your specific application requirements
      </p>
      
      <PremiumCheck>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Requirements</CardTitle>
                <CardDescription>
                  Tell us about your circuit requirements to get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="application">Application Type</Label>
                    <Select value={application} onValueChange={setApplication}>
                      <SelectTrigger id="application">
                        <SelectValue placeholder="Select application" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Purpose</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="power">Power</SelectItem>
                        <SelectItem value="switching">Switching</SelectItem>
                        <SelectItem value="rf">RF/High Frequency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="circuit-type">Circuit Type</Label>
                    <Select value={circuitType} onValueChange={setCircuitType}>
                      <SelectTrigger id="circuit-type">
                        <SelectValue placeholder="Select circuit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amplifier">Amplifier</SelectItem>
                        <SelectItem value="switch">Switch</SelectItem>
                        <SelectItem value="oscillator">Oscillator</SelectItem>
                        <SelectItem value="regulator">Voltage Regulator</SelectItem>
                        <SelectItem value="driver">Current Driver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Voltage Range (V)</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      defaultValue={[0, 50]}
                      max={100}
                      step={1}
                      value={requirements.voltage}
                      onValueChange={(value) => handleRequirementChange("voltage", value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{requirements.voltage[0]}V</span>
                      <span>{requirements.voltage[1]}V</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Current Range (A)</Label>
                  <div className="pt-6 px-2">
                    <Slider
                      defaultValue={[0, 1]}
                      max={10}
                      step={0.1}
                      value={requirements.current}
                      onValueChange={(value) => handleRequirementChange("current", value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{requirements.current[0]}A</span>
                      <span>{requirements.current[1]}A</span>
                    </div>
                  </div>
                </div>
                
                {application === "rf" && (
                  <div className="space-y-2">
                    <Label>Frequency Range (MHz)</Label>
                    <div className="pt-6 px-2">
                      <Slider
                        defaultValue={[0, 10]}
                        max={1000}
                        step={1}
                        value={requirements.frequency}
                        onValueChange={(value) => handleRequirementChange("frequency", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{requirements.frequency[0]}MHz</span>
                        <span>{requirements.frequency[1]}MHz</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {(application === "audio" || application === "general") && (
                  <div className="space-y-2">
                    <Label>Gain (hFE)</Label>
                    <div className="pt-6 px-2">
                      <Slider
                        defaultValue={[0, 100]}
                        max={500}
                        step={10}
                        value={requirements.gain}
                        onValueChange={(value) => handleRequirementChange("gain", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{requirements.gain[0]}</span>
                        <span>{requirements.gain[1]}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {application === "audio" && (
                  <div className="space-y-2">
                    <Label>Noise Level</Label>
                    <RadioGroup
                      value={requirements.noiseLevel}
                      onValueChange={(value) => handleRequirementChange("noiseLevel", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="any" id="noise-any" />
                        <Label htmlFor="noise-any">Not important</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="noise-low" />
                        <Label htmlFor="noise-low">Low noise (for sensitive audio)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-low" id="noise-very-low" />
                        <Label htmlFor="noise-very-low">Very low noise (for preamps)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
                
                {(application === "power" || circuitType === "driver") && (
                  <div className="space-y-2">
                    <Label>Power Dissipation (W)</Label>
                    <div className="pt-6 px-2">
                      <Slider
                        defaultValue={[0, 1]}
                        max={50}
                        step={0.5}
                        value={requirements.powerDissipation}
                        onValueChange={(value) => handleRequirementChange("powerDissipation", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{requirements.powerDissipation[0]}W</span>
                        <span>{requirements.powerDissipation[1]}W</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit} className="w-full">Find Recommended Components</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            {recommendations ? (
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Component</CardTitle>
                  <CardDescription>Based on your requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="text-2xl font-bold">{recommendations.primary.name}</h3>
                    <p className="text-muted-foreground">{recommendations.primary.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Why this component?</h4>
                    <ul className="space-y-1 text-sm">
                      {recommendations.primary.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Alternative Options</h4>
                    <ul className="space-y-2">
                      {recommendations.primary.alternatives.map((alt, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <span>{alt.name}</span>
                          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                            {alt.score}% match
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/transistor/${recommendations.primary.name.toLowerCase()}`}>
                      View Full Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Component Recommendations</CardTitle>
                  <CardDescription>
                    Fill out the requirements and click "Find Recommended Components" to get personalized suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                  <p>Your recommendations will appear here</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </PremiumCheck>
    </div>
  );
}
