import React from "react";

export default function DashboardBox({ data }) {
  // Example data if not passed via props
  const stats = data || [
    { title: "Total Session", count: 1500 },
    { title: "Ratings ⭐", count: 1025 },
    { title: "Doach Assessment" },
    { title: "Open Support" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-start p-6 rounded-lg shadow bg-[#2a2a2a] border border-gray-700 text-white"
        >
          {/* Title */}
          <p className="text-lg font-semibold text-yellow-400">{item.title}</p>

          {/* Count or Button */}
          {item.count !== undefined ? (
            <h2 className="text-3xl font-bold mt-2 text-gray-100">{item.count}</h2>
          ) : (
            <button className="mt-3 bg-yellow-400 text-black text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition">
              View
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
