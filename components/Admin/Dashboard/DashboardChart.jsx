import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function DashboardCharts() {
  const data = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
  ];

  // Yellow + dark styled colors
  const COLORS = [
    "#facc15", // yellow
    "#ef4444", // red
    "#3b82f6", // blue
    "#10b981", // green
    "#8b5cf6", // purple
    "#14b8a6", // teal
    "#f59e0b", // amber
  ];

  return (
    <div className="grid grid-cols-12 gap-6 mt-4">
      {/* 📈 Line Chart - 8 cols */}
      <div className="col-span-12 md:col-span-8 bg-[#1c1c1c] border border-yellow-400 shadow rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">
          Monthly Customers
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#facc15" />
            <YAxis stroke="#facc15" />
            <Tooltip
              contentStyle={{
                background: "#000",
                border: "1px solid #facc15",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ r: 5, fill: "#facc15" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Pie Chart - 4 cols */}
      <div className="col-span-12 md:col-span-4 bg-[#1c1c1c] border border-yellow-400 shadow rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">
          Chart Distribution
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelStyle={{ fill: "#fff" }}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#000",
                border: "1px solid #facc15",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
