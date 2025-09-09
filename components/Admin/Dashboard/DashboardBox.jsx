"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { customerList, eventList, brandList } from "../../../utils/fetchAdminApi";

export default function DashboardBox() {
  const [counts, setCounts] = useState({
    customers: 0,
    events: 0,
    brands: 0,
    community: 0,
  });

  const [chartData, setChartData] = useState([
    { name: "Mon", value: 40 },
    { name: "Tue", value: 55 },
    { name: "Wed", value: 30 },
    { name: "Thu", value: 70 },
    { name: "Fri", value: 50 },
    { name: "Sat", value: 90 },
    { name: "Sun", value: 60 },
  ]);

  // Fetch counts
  useEffect(() => {
    async function fetchCounts() {
      try {
        const customers = await customerList();
        const events = await eventList();
        const brands = await brandList();

        setCounts({
          customers: customers.length || 0,
          events: events.length || 0,
          brands: brands.length || 0,
          community: 678, // 👉 Replace with API when available
        });
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
      {/* Customers */}
      <div className="bg-[#1A1A1A] border border-yellow-400 rounded-2xl shadow-md p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-yellow-400">Customers</h3>
        <p className="text-2xl font-bold text-white mt-1">{counts.customers}</p>
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Tooltip contentStyle={{ background: "#000", border: "none" }} />
              <Line type="monotone" dataKey="value" stroke="#facc15" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Events */}
      <div className="bg-[#1A1A1A] border border-yellow-400 rounded-2xl shadow-md p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-yellow-400">Events</h3>
        <p className="text-2xl font-bold text-white mt-1">{counts.events}</p>
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip contentStyle={{ background: "#000", border: "none" }} />
              <Area type="monotone" dataKey="value" stroke="#facc15" fill="url(#colorEvents)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Brands */}
      <div className="bg-[#1A1A1A] border border-yellow-400 rounded-2xl shadow-md p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-yellow-400">Brands</h3>
        <p className="text-2xl font-bold text-white mt-1">{counts.brands}</p>
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Tooltip contentStyle={{ background: "#000", border: "none" }} />
              <Line type="monotone" dataKey="value" stroke="#facc15" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Community */}
      <div className="bg-[#1A1A1A] border border-yellow-400 rounded-2xl shadow-md p-5 flex flex-col">
        <h3 className="text-lg font-semibold text-yellow-400">Community</h3>
        <p className="text-2xl font-bold text-white mt-1">{counts.community}</p>
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCommunity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip contentStyle={{ background: "#000", border: "none" }} />
              <Area type="monotone" dataKey="value" stroke="#facc15" fill="url(#colorCommunity)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
