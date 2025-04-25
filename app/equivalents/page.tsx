"use client";
import { useState } from "react";
import combinedComponents from "./combined_components.json";

export default function EquivalentsPage() {
  const [query, setQuery] = useState("");
  const results = !query ? [] : combinedComponents.filter((comp: any) =>
    comp.name.toLowerCase().includes(query.toLowerCase()) ||
    comp.partNumber.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Equivalent Component Finder</h1>
        <p className="text-gray-500 mb-8">
          Find equivalent and replacement electronic components. Search by part name or number to see all specs and equivalent parts.
        </p>
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded mb-6"
            placeholder="Enter part name or number..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <div>
              <p className="text-sm text-gray-600 mb-2">{results.length} result(s) found</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Name</th>
                      <th className="border px-2 py-1">Part Number</th>
                      <th className="border px-2 py-1">Category</th>
                      <th className="border px-2 py-1">Description</th>
                      <th className="border px-2 py-1">Specs</th>
                      <th className="border px-2 py-1">Equivalents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((comp: any) => (
                      <tr key={comp.id}>
                        <td className="border px-2 py-1">{comp.name}</td>
                        <td className="border px-2 py-1">{comp.partNumber}</td>
                        <td className="border px-2 py-1">{comp.category}</td>
                        <td className="border px-2 py-1">{comp.description}</td>
                        <td className="border px-2 py-1 whitespace-pre-wrap">
                          {Object.entries(comp.keySpecs || {}).map(([k, v]) => `${k}: ${v}`).join("\n")}
                        </td>
                        <td className="border px-2 py-1 whitespace-pre-wrap">
                          {(comp.equivalents || []).map((eq: any) => eq.partNumber).join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
