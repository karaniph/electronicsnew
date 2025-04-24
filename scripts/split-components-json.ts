/**
 * This script splits a large JSON file of components into smaller chunks
 * Run with: npx tsx scripts/split-components-json.ts
 */

import fs from "fs"
import path from "path"

// Configuration
const INPUT_FILE = "data/all-components.json"
const OUTPUT_DIR = "data"
const CHUNK_SIZE = 1000 // Number of components per chunk

async function splitComponentsJson() {
  console.log("Starting to split components JSON file...")

  try {
    // Read the input file
    const rawData = fs.readFileSync(path.join(process.cwd(), INPUT_FILE), "utf8")
    const allComponents = JSON.parse(rawData)

    if (!Array.isArray(allComponents.components)) {
      throw new Error('Input file does not contain a "components" array')
    }

    const components = allComponents.components
    const totalComponents = components.length
    const totalChunks = Math.ceil(totalComponents / CHUNK_SIZE)

    console.log(`Found ${totalComponents} components. Splitting into ${totalChunks} chunks...`)

    // Create output directory if it doesn't exist
    const outputDirPath = path.join(process.cwd(), OUTPUT_DIR)
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true })
    }

    // Split into chunks and write to files
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE
      const end = Math.min(start + CHUNK_SIZE, totalComponents)
      const chunk = components.slice(start, end)

      const outputFile = path.join(outputDirPath, `components-chunk-${i + 1}.json`)
      fs.writeFileSync(outputFile, JSON.stringify({ components: chunk }, null, 2))

      console.log(`Wrote chunk ${i + 1}/${totalChunks} with ${chunk.length} components`)
    }

    console.log("Successfully split components JSON file!")
  } catch (error) {
    console.error("Error splitting components JSON:", error)
    process.exit(1)
  }
}

// Run the script
splitComponentsJson()
