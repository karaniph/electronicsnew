"use client";
import { useState } from "react";
import combinedComponents from "./combined_components.json";

const categories = [
  { key: "bjt", name: "Transistors (BJT)" },
  { key: "mosfet", name: "MOSFETs" },
  { key: "igbt", name: "IGBTs" },
  { key: "scr", name: "SCRs" },
  { key: "ic", name: "ICs" },
];

function groupByCategory(components) {
  const grouped = {};
  for (const cat of categories) grouped[cat.key] = [];
  for (const comp of components) {
    const catKey = comp.category?.toLowerCase();
    if (grouped[catKey]) grouped[catKey].push(comp);
  }
  return grouped;
}

export default function EquivalentsPage() {
  const [query, setQuery] = useState("");
  const filtered = !query ? combinedComponents : combinedComponents.filter((comp) =>
    comp.name.toLowerCase().includes(query.toLowerCase()) ||
    comp.partNumber.toLowerCase().includes(query.toLowerCase())
  );
  const grouped = groupByCategory(filtered);

  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Equivalent Component Finder</h1>
        <p className="text-gray-500 mb-8 text-center">
          Search by part name or number. Results are grouped by category with all specs and beautiful equivalents display.
        </p>
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8 shadow-md">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter part name or number..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {categories.map(cat => (
            grouped[cat.key]?.length > 0 && (
              <div key={cat.key} className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-blue-700">{cat.name}</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-xs bg-white rounded shadow">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Part Number</th>
                        <th className="border px-2 py-1">Description</th>
                        <th className="border px-2 py-1">Specs</th>
                        <th className="border px-2 py-1">Equivalents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grouped[cat.key].map((comp) => (
                        <tr key={comp.id} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                          <td className="border px-2 py-1 font-medium text-blue-900">{comp.name}</td>
                          <td className="border px-2 py-1">{comp.partNumber}</td>
                          <td className="border px-2 py-1 max-w-xs whitespace-pre-wrap">{comp.description}</td>
                          <td className="border px-2 py-1 whitespace-pre-wrap max-w-xs">
                            {Object.entries(comp.keySpecs || {}).map(([k, v]) => (
                              <div key={k}><span className="font-semibold text-gray-700">{k}:</span> <span className="text-gray-800">{v}</span></div>
                            ))}
                          </td>
                          <td className="border px-2 py-1 whitespace-pre-wrap max-w-xs">
                            {(comp.equivalents || []).length ? (
                              <ul className="list-disc ml-4">
                                {comp.equivalents.map((eq, idx) => (
                                  <li key={idx} className="mb-1"><span className="font-semibold text-blue-700">{eq.partNumber}</span> {eq.manufacturer && (<span className="text-gray-600">({eq.manufacturer})</span>)} {eq.notes && (<span className="text-gray-500">- {eq.notes}</span>)}</li>
                                ))}
                              </ul>
                            ) : <span className="text-gray-400 italic">None</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          ))}
          {Object.values(grouped).flat().length === 0 && (
            <div className="text-center text-gray-400 mt-10">No results found.</div>
          )}
        </div>
      </div>
    </main>
  );
}
