import { Download } from "lucide-react"

type Datasheet = {
  name: string
  url: string
}

export function DatasheetViewer({ datasheets }: { datasheets: Datasheet[] }) {
  if (!datasheets || datasheets.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 h-48 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No datasheets available for this component.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {datasheets.map((datasheet, index) => (
        <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex justify-between items-center">
          <div>
            <p className="font-medium">{datasheet.name} Datasheet</p>
            <p className="text-sm text-gray-500">PDF Document</p>
          </div>
          <a
            href={datasheet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        </div>
      ))}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 h-48 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Datasheet preview not available.</p>
          <a
            href={datasheets[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Open datasheet in new tab
          </a>
        </div>
      </div>
    </div>
  )
}
