import React from "react";

export default function DashboardChart() {
  // Static data
  const data = [
    { label: "Profile", value: 100 },
    { label: "Community", value: 90 },
    { label: "Play List", value: 120 },
    { label: "Contact", value: 80 },
    { label: "Reviews", value: 60 },
  ];

  // Maximum value to scale bars
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Stats</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            {/* Label */}
            <span className="w-20 text-gray-700 font-medium">{item.label}</span>

            {/* Bar */}
            <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>

            {/* Value */}
            <span className="w-12 text-gray-700 text-sm font-medium text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
