# Handling Large Component Data in ElectronicHub

This document provides guidance on how to manage and import large datasets of electronic components into the ElectronicHub application.

## Data Structure

Components should be structured in JSON format as follows:

\`\`\`json
{
  "components": [
    {
      "id": "2N2222",
      "name": "2N2222",
      "type": "NPN Transistor",
      "description": "General purpose NPN transistor",
      "manufacturer": "Various",
      "polarity": "NPN",
      "material": "Si",
      "package": "TO-92",
      "specs": {
        "Collector-Emitter Voltage": "40V",
        "Collector Current": "800mA",
        "Power Dissipation": "500mW"
      },
      "datasheets": [
        {
          "name": "Manufacturer Datasheet",
          "url": "https://example.com/datasheet.pdf"
        }
      ],
      "equivalents": [
        {
          "id": "BC547",
          "name": "BC547",
          "type": "NPN Transistor",
          "description": "General purpose NPN transistor",
          "manufacturer": "Various",
          "href": "/component/BC547"
        }
      ]
    }
  ]
}
\`\`\`

## Import Methods

### 1. Web Interface

For datasets up to 100MB, use the admin import page at `/admin/import-components`.

### 2. Chunking Large Files

For larger datasets:

1. Split your JSON file into smaller chunks (1000 components per file is recommended)
2. Use the provided script: `npx tsx scripts/split-components-json.ts`
3. Place the chunks in the `data/` directory with naming pattern: `components-chunk-1.json`, `components-chunk-2.json`, etc.

### 3. Database Import

For production use with very large datasets:

#### MongoDB

\`\`\`bash
mongoimport --db electronichub --collection components --file components.json --jsonArray
\`\`\`

#### PostgreSQL

\`\`\`sql
COPY components FROM 'components.csv' DELIMITER ',' CSV HEADER;
\`\`\`

#### DynamoDB

Use AWS CLI:

\`\`\`bash
aws dynamodb batch-write-item --request-items file://components-dynamodb-format.json
\`\`\`

#### Supabase

\`\`\`bash
psql -h db.supabase.co -p 5432 -d postgres -U postgres -c "\COPY components FROM 'components.csv' CSV HEADER"
\`\`\`

## API-Based Import

For programmatic imports, use the batch import API:

\`\`\`javascript
// Example batch import script
const components = require('./components.json');
const batchSize = 100;

async function importBatch(batch) {
  const response = await fetch('https://your-site.com/api/admin/import-batch', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({ components: batch })
  });
  return response.json();
}

async function importAll() {
  for (let i = 0; i < components.length; i += batchSize) {
    const batch = components.slice(i, i + batchSize);
    await importBatch(batch);
    console.log(`Imported ${i + batch.length} of ${components.length}`);
  }
}

importAll();
\`\`\`

## Cloud Storage Options

For very large datasets, consider using cloud storage:

1. **Amazon S3**: Store component data in S3 and use S3 Select for querying
2. **Google Cloud Storage**: Use with Cloud Functions for serverless processing
3. **Azure Blob Storage**: Combine with Azure Functions for processing

## Search Optimization

For better search performance:

1. **Elasticsearch**: Index your components for fast full-text search
2. **Algolia**: Provides hosted search with excellent performance
3. **Typesense**: Open-source search engine optimized for instant search

## Caching Strategies

Implement caching to improve performance:

1. **Redis**: Cache frequently accessed components
2. **Vercel Edge Cache**: Use edge caching for component pages
3. **SWR/React Query**: Implement client-side caching with stale-while-revalidate

## Questions?

For additional help, contact the ElectronicHub development team.
