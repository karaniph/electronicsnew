import fs from 'fs';
import path from 'path';
import { extractTransistorFromScrapedData } from '@/lib/transistor-utils';
import type { Component } from '@/types/component';
import type { TransistorComponent } from '@/types/transistor';

// Script to process the scraped JSON data and convert it to component format
// Usage: npx tsx scripts/process-transistor-data.ts

// Path to the scraped data file
const SCRAPED_DATA_PATH = process.argv[2] || '../upload/dataset_website-content-crawler_2025-04-09_15-29-51-056.json';

// Path to save the processed components
const OUTPUT_DIR = path.join(process.cwd(), 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'transistors.json');

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function processTransistorData() {
  try {
    console.log(`Reading scraped data from ${SCRAPED_DATA_PATH}...`);
    
    // Read the scraped data file
    const rawData = fs.readFileSync(SCRAPED_DATA_PATH, 'utf8');
    const scrapedData = JSON.parse(rawData);
    
    console.log(`Found ${scrapedData.length} entries in the scraped data.`);
    
    // Process each entry to extract transistor data
    const transistors: TransistorComponent[] = [];
    
    for (const entry of scrapedData) {
      const transistor = extractTransistorFromScrapedData(entry);
      if (transistor) {
        transistors.push(transistor);
        console.log(`Processed transistor: ${transistor.id}`);
      }
    }
    
    console.log(`Successfully extracted ${transistors.length} transistors.`);
    
    // Save the processed transistors
    const outputData = {
      components: transistors
    };
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2));
    console.log(`Saved transistor data to ${OUTPUT_FILE}`);
    
    // Create chunks for the website's data loading mechanism
    const CHUNK_SIZE = 20;
    const chunks = [];
    
    for (let i = 0; i < transistors.length; i += CHUNK_SIZE) {
      const chunk = transistors.slice(i, i + CHUNK_SIZE);
      chunks.push(chunk);
    }
    
    // Save each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunkFile = path.join(OUTPUT_DIR, `components-chunk-${i + 1}.json`);
      fs.writeFileSync(chunkFile, JSON.stringify({ components: chunks[i] }, null, 2));
      console.log(`Saved chunk ${i + 1} with ${chunks[i].length} transistors to ${chunkFile}`);
    }
    
    console.log('Data processing complete!');
  } catch (error) {
    console.error('Error processing transistor data:', error);
  }
}

// Run the processing function
processTransistorData();
