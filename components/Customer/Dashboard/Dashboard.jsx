import React from "react";
import DashboardBox from "./DashboardBox";
import DashboardChart from "./DashboardChart";

export default function Dashboard() {
  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Customer!</h1>
        <p className="text-gray-600 mt-1">Here's a quick overview of your dashboard.</p>
      </div>

      {/* Dashboard Boxes */}
      <DashboardBox />

      {/* Dashboard Boxes */}
      <DashboardChart />

      {/* You can add more sections here, e.g., charts, tables */}
    </div>
  );
}

