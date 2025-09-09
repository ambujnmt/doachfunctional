import React from "react";
import DashboardBox from "./DashboardBox";
import DashboardChart from "./DashboardChart";

export default function Dashboard() {
  return (
    <div className="bg-black py-6">
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Welcome Back, Admin!</h1>
        <p className="text-gray-400 mt-1">
          Here's a quick overview of your dashboard.
        </p>
      </div>

      {/* Dashboard Boxes */}
      <DashboardBox />

      {/* Dashboard Charts */}
      <div className="mt-8">
        <DashboardChart />
      </div>

      {/* Add more sections here */}
    </div>
  );
}
