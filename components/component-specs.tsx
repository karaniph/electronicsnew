export function ComponentSpecs({ specs }: { specs: Record<string, string> }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-600">{key}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
