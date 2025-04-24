"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Save, AlertCircle, Check, X } from "lucide-react"

export default function ImportComponentsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ type: string; text: string }>({ type: "", text: "" })
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setMessage({ type: "", text: "" })
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)
    setProgress(0)
    setMessage({ type: "", text: "" })

    try {
      // Create form data
      const formData = new FormData()
      formData.append("file", file)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          return newProgress > 90 ? 90 : newProgress
        })
      }, 500)

      // Upload file
      const response = await fetch("/api/admin/import-components", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to upload file")
      }

      setProgress(100)
      setMessage({ type: "success", text: "Components imported successfully!" })
    } catch (error) {
      console.error("Error uploading file:", error)
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to upload file",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-full">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold">Import Components</h1>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Upload Components JSON File</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800">
                  Upload a JSON file containing your component data. The file should have a structure like:
                </p>
                <pre className="mt-2 text-xs bg-blue-100 p-2 rounded overflow-x-auto">
                  {`{
  "components": [
    {
      "id": "2N2222",
      "name": "2N2222",
      "type": "NPN Transistor",
      "description": "...",
      "manufacturer": "...",
      ...
    },
    ...
  ]
}`}
                </pre>
                <p className="mt-2 text-xs text-blue-700">
                  Large files will be automatically split into smaller chunks for better performance.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">JSON files only, max 100MB</p>
                </div>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".json"
                  className="sr-only"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            </div>

            {file && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-blue-500">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-gray-500"
                  disabled={isUploading}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {isUploading && (
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">{Math.round(progress)}%</p>
              </div>
            )}

            {message.text && (
              <div
                className={`p-3 rounded-md mb-4 ${
                  message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading || !file}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  Uploading...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Import Components
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Alternative Import Methods</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium mb-2">Database Import</h3>
              <p className="text-sm text-gray-600">
                For very large datasets, consider importing directly to a database:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                <li>MongoDB: Use the mongoimport tool</li>
                <li>PostgreSQL: Use the COPY command or pgAdmin</li>
                <li>DynamoDB: Use AWS Data Pipeline or DynamoDB Streams</li>
                <li>Supabase: Use the REST API or direct PostgreSQL access</li>
              </ul>
            </div>

            <div>
              <h3 className="text-md font-medium mb-2">API-Based Import</h3>
              <p className="text-sm text-gray-600">Create a script to import components in batches via API:</p>
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                {`// Example batch import script
const components = require('./components.json');
const batchSize = 100;

async function importBatch(batch) {
  const response = await fetch('/api/admin/import-batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ components: batch })
  });
  return response.json();
}

async function importAll() {
  for (let i = 0; i < components.length; i += batchSize) {
    const batch = components.slice(i, i + batchSize);
    await importBatch(batch);
    console.log(\`Imported \${i + batch.length} of \${components.length}\`);
  }
}

importAll();`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
