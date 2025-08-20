import React from "react";

export default function DashboardBox({ data }) {
  // Example data if not passed via props
  const stats = data || [
    { title: "Community", count: 1500, color: "bg-blue-500" },
    { title: "Contact", count: 320, color: "bg-green-500" },
    { title: "Revenue", count: "$12.3k", color: "bg-yellow-500" },
    { title: "Support", count: 85, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col justify-center items-start p-6 rounded-lg shadow ${item.color} text-white`}
        >
          <p className="text-sm font-medium">{item.title}</p>
          <h2 className="text-2xl font-bold mt-2">{item.count}</h2>
        </div>
      ))}
    </div>
  );
}
