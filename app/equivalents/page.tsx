"use client";
import { useState } from "react";
import combinedComponents from "./combined_components.json";
import { fuzzySearch } from "./fuzzy-search";
import ComponentImage from "./ComponentImage";
import EquivalencyGuide from "./EquivalencyGuide";
import DarkModeToggle from "./DarkModeToggle";
import dynamic from "next/dynamic";

const ComparisonDrawer = dynamic(() => import("./ComparisonDrawer"), { ssr: false });

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

const allSpecs = Array.from(new Set(combinedComponents.flatMap(comp => Object.keys(comp.keySpecs || {}))));

export default function EquivalentsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [filters, setFilters] = useState({});

  // Fuzzy search and filtering
  let filtered = query
    ? fuzzySearch(combinedComponents, query, ["name", "partNumber"])
    : combinedComponents;
  // Apply filters
  filtered = filtered.filter(comp => {
    for (const key in filters) {
      if (filters[key] && comp.keySpecs?.[key] !== filters[key]) return false;
    }
    return true;
  });
  // Sorting
  if (sort) {
    filtered = [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "partNumber") return a.partNumber.localeCompare(b.partNumber);
      return 0;
    });
  }
  const grouped = groupByCategory(filtered);

  // For suggestions if no results
  const suggestions = query && filtered.length === 0
    ? fuzzySearch(combinedComponents, query, ["name", "partNumber"]).slice(0, 5)
    : [];

  // Comparison logic
  const toggleSelect = (comp) => {
    setSelected(sel => sel.some(c => c.id === comp.id) ? sel.filter(c => c.id !== comp.id) : [...sel, comp]);
  };
  const clearCompare = () => setSelected([]);

  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <DarkModeToggle />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Equivalent Component Finder</h1>
        <EquivalencyGuide />
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700"
              placeholder="Enter part name or number..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <select
              className="border rounded px-2 py-2 dark:bg-gray-900 dark:border-gray-700"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name">Name (A-Z)</option>
              <option value="partNumber">Part Number (A-Z)</option>
            </select>
            {/* Example filter: Package Type */}
            <select
              className="border rounded px-2 py-2 dark:bg-gray-900 dark:border-gray-700"
              value={filters["Package"] || ""}
              onChange={e => setFilters(f => ({ ...f, Package: e.target.value }))}
            >
              <option value="">All Packages</option>
              {[...new Set(combinedComponents.map(c => c.keySpecs?.Package).filter(Boolean))].map(pkg => (
                <option key={pkg} value={pkg}>{pkg}</option>
              ))}
            </select>
          </div>
          {categories.map(cat => (
            grouped[cat.key]?.length > 0 && (
              <div key={cat.key} className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-blue-700 dark:text-blue-300">{cat.name}</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-xs bg-white dark:bg-gray-800 rounded shadow">
                    <thead>
                      <tr className="bg-blue-50 dark:bg-gray-700">
                        <th className="border px-2 py-1">Compare</th>
                        <th className="border px-2 py-1">Image</th>
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Part Number</th>
                        <th className="border px-2 py-1">Description</th>
                        <th className="border px-2 py-1">Specs</th>
                        <th className="border px-2 py-1">Equivalents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grouped[cat.key].map((comp) => (
                        <tr key={comp.id} className="even:bg-gray-50 dark:even:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
                          <td className="border px-2 py-1 text-center">
                            <input
                              type="checkbox"
                              checked={selected.some(c => c.id === comp.id)}
                              onChange={() => toggleSelect(comp)}
                              aria-label={`Select ${comp.name} for comparison`}
                            />
                          </td>
                          <td className="border px-2 py-1"><ComponentImage alt={comp.name} /></td>
                          <td className="border px-2 py-1 font-medium text-blue-900 dark:text-blue-200">{comp.name}</td>
                          <td className="border px-2 py-1">{comp.partNumber}</td>
                          <td className="border px-2 py-1 max-w-xs whitespace-pre-wrap">{comp.description}</td>
                          <td className="border px-2 py-1 whitespace-pre-wrap max-w-xs">
                            {Object.entries(comp.keySpecs || {}).map(([k, v]) => (
                              <div key={k}><span className="font-semibold text-gray-700 dark:text-gray-200">{k}:</span> <span className="text-gray-800 dark:text-gray-100">{v}</span></div>
                            ))}
                          </td>
                          <td className="border px-2 py-1 whitespace-pre-wrap max-w-xs">
                            {(comp.equivalents || []).length ? (
                              <ul className="list-disc ml-4">
                                {comp.equivalents.map((eq, idx) => (
                                  <li key={idx} className="mb-1"><span className="font-semibold text-blue-700 dark:text-blue-400">{eq.partNumber}</span> {eq.manufacturer && (<span className="text-gray-600 dark:text-gray-300">({eq.manufacturer})</span>)} {eq.notes && (<span className="text-gray-500 dark:text-gray-400">- {eq.notes}</span>)}</li>
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
            <div className="text-center text-gray-400 mt-10">
              No results found.<br />
              {suggestions.length > 0 && (
                <div className="mt-4">
                  <span className="font-semibold">Did you mean:</span>
                  <ul className="inline-block ml-2">
                    {suggestions.map((s, i) => (
                      <li key={i} className="inline-block mr-3 text-blue-600 dark:text-blue-300">{s.name} ({s.partNumber})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        {selected.length > 1 && (
          <button
            className="fixed bottom-8 right-8 z-40 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
            onClick={() => setShowCompare(true)}
          >
            Compare ({selected.length})
          </button>
        )}
        {showCompare && (
          <ComparisonDrawer selected={selected} onClose={() => { setShowCompare(false); clearCompare(); }} />
        )}
      </div>
    </main>
  );
}
