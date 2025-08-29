import React from "react";

export default function DashboardBox({ data }) {
  // Example data if not passed via props
  const stats = data || [
    { title: "Total Session", count: 1500, color: "bg-blue-500" },
    { title: "Ratings ⭐", count: 1025, color: "bg-green-500" },
    { title: "Doach Assessment", color: "bg-yellow-500" },
    { title: "Open Support", color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col justify-center items-start p-6 rounded-lg shadow ${item.color} text-white`}
        >
          {/* Title bigger now */}
          <p className="text-lg font-semibold">{item.title}</p>

          {/* Only show count if it exists */}
          {item.count !== undefined ? (
            <h2 className="text-3xl font-bold mt-2">{item.count}</h2>
          ) : (
            <button className="mt-3 bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow">
              View
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
