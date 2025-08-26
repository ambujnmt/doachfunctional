import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 70 },
  { name: "Fri", value: 50 },
  { name: "Sat", value: 90 },
  { name: "Sun", value: 60 },
];

export default function DashboardBox() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
      {/* Users Box */}
      <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-700">Customers</h3>
        <p className="text-2xl font-bold mt-1">1,245</p>
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Box */}
      <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-700">Events</h3>
        <p className="text-2xl font-bold mt-1">320</p>
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Box */}
      <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-700">Brands</h3>
        <p className="text-2xl font-bold mt-1">37</p>
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Box */}
      <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-700">Community</h3>
        <p className="text-2xl font-bold mt-1">678</p>
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#ef4444" fill="url(#colorGrowth)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
