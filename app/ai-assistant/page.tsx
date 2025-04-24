import { AiAssistantFull } from "@/components/ai-assistant-full"

export default function AiAssistantPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Component Assistant</h1>
        <p className="text-gray-600 mb-8">
          Ask our AI assistant to help you find equivalent components, compare specifications, or recommend components
          for your project.
        </p>

        <AiAssistantFull />
      </div>
    </main>
  )
}
