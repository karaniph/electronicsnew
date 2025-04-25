"use client";
import React from "react";
import ComponentImage from "./ComponentImage";

function getSpecDifferences(selected, allSpecs) {
  const diffs = {};
  for (const spec of allSpecs) {
    const values = selected.map(comp => comp.keySpecs?.[spec] || "-");
    diffs[spec] = new Set(values).size > 1;
  }
  return diffs;
}

export default function ComparisonDrawer({ selected, onClose }) {
  if (!selected.length) return null;
  // Collect all unique spec keys
  const allSpecs = Array.from(new Set(selected.flatMap(comp => Object.keys(comp.keySpecs || {}))));
  const specDiffs = getSpecDifferences(selected, allSpecs);

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-end md:items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-t-2xl md:rounded-2xl shadow-xl w-full max-w-5xl p-6 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Component Comparison</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 text-xl">&times;</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs">
            <thead className="sticky top-0 bg-white dark:bg-gray-900 z-10">
              <tr>
                <th className="border px-2 py-1">Image</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Part Number</th>
                {allSpecs.map((spec) => (
                  <th key={spec} className="border px-2 py-1">
                    {spec}
                    {specDiffs[spec] ? (
                      <span className="ml-1 text-yellow-600 dark:text-yellow-400" title="Spec differs">*</span>
                    ) : (
                      <span className="ml-1 text-green-600 dark:text-green-400" title="Spec matches">✓</span>
                    )}
                  </th>
                ))}
                <th className="border px-2 py-1">Equivalents</th>
                <th className="border px-2 py-1">Datasheet</th>
              </tr>
            </thead>
            <tbody>
              {selected.map((comp, idx) => (
                <tr key={comp.id || idx} className="even:bg-gray-50 dark:even:bg-gray-800">
                  <td className="border px-2 py-1"><ComponentImage alt={comp.name} /></td>
                  <td className="border px-2 py-1 font-medium">{comp.name}</td>
                  <td className="border px-2 py-1">{comp.partNumber}</td>
                  {allSpecs.map((spec) => (
                    <td
                      key={spec}
                      className={
                        "border px-2 py-1" +
                        (specDiffs[spec]
                          ? " bg-yellow-50 dark:bg-yellow-900"
                          : " bg-green-50 dark:bg-green-900")
                      }
                    >
                      {comp.keySpecs?.[spec] || <span className="text-gray-400">-</span>}
                    </td>
                  ))}
                  <td className="border px-2 py-1 whitespace-pre-wrap max-w-xs">
                    {(comp.equivalents || []).length ? (
                      <ul className="list-disc ml-4">
                        {comp.equivalents.map((eq, i) => (
                          <li key={i}><span className="font-semibold text-blue-700 dark:text-blue-400">{eq.partNumber}</span></li>
                        ))}
                      </ul>
                    ) : <span className="text-gray-400 italic">None</span>}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {comp.datasheet ? (
                      <a href={comp.datasheet} target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-300 underline">Datasheet</a>
                    ) : <span className="text-gray-400 italic">N/A</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="mr-2">* Highlighted columns indicate differences between compared components.</span>
          <span className="ml-2">✓ All values match in this column.</span>
        </div>
      </div>
    </div>
  );
}
