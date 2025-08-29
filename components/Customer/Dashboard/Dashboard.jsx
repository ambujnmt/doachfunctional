import React from "react";
import DashboardBox from "./DashboardBox";

// Scoreboard Component
function Scoreboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
      {/* Scoreboard Card */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            Scoreboard
          </h2>
          <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
            Rookie Tier
          </span>
        </div>

        <div className="mt-4">
          <p className="text-4xl sm:text-5xl font-bold text-gray-900">1,560</p>
          <p className="text-sm text-gray-500 mt-1">Total Points</p>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-yellow-500 h-3 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            340 points to reach <b>Pro Tier</b>
          </p>
        </div>

        <div className="mt-4 text-sm text-green-600 font-medium">
          🚀 Keep pushing! You're on fire!
        </div>
      </div>

      {/* Player Stats Card */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full">
        <h2 className="text-lg font-semibold mb-4">Player Stats</h2>

        <div className="space-y-2">
          {/* SESSION */}
          <div className="bg-gray-100 text-gray-900 rounded-lg shadow-sm p-3 w-full">
            <p className="text-xs text-gray-500 uppercase font-medium">Sessions</p>
            <p className="text-sm sm:text-base font-semibold mt-1">
              24
            </p>
          </div>

          {/* DRILL */}
          <div className="bg-gray-100 text-gray-900 rounded-lg shadow-sm p-3 w-full">
            <p className="text-xs text-gray-500 uppercase font-medium">Total Shots</p>
            <p className="text-sm sm:text-base font-semibold mt-1">
              1,450
            </p>
          </div>

          {/* TRAINING */}
          <div className="bg-gray-100 text-gray-900 rounded-lg shadow-sm p-3 w-full">
            <p className="text-xs text-gray-500 uppercase font-medium">Status</p>
            <p className="text-sm sm:text-base font-semibold mt-1">
              Beginner
            </p>
          </div>
        </div>
      </div>

      {/* My Training Card */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full">
        <h2 className="text-lg font-semibold mb-4">My Training</h2>

        <div className="space-y-2">
          {/* SESSION */}
          <div className="bg-gray-100 text-gray-900 rounded-lg shadow-sm p-3 w-full">
            <p className="text-xs text-gray-500 uppercase font-medium">Session</p>
            <p className="text-sm sm:text-base font-semibold mt-1">
              Footwork Fundamentals
            </p>
          </div>

          {/* DRILL */}
          <div className="bg-gray-100 text-gray-900 rounded-lg shadow-sm p-3 w-full">
            <p className="text-xs text-gray-500 uppercase font-medium">Drill</p>
            <p className="text-sm sm:text-base font-semibold mt-1">
              Crossover Drill
            </p>
          </div>

          {/* TRAINING */}
          <div className="bg-gray-100 text-gray-900 rounded-lg shadow-sm p-3 w-full">
            <p className="text-xs text-gray-500 uppercase font-medium">Training</p>
            <p className="text-sm sm:text-base font-semibold mt-1">
              Agility & Speed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
// Quick Stats Component
function QuickStats() {
  const stats = [
    { label: "Sessions this week", icon: "⏱️" },
    { label: "Shots made", icon: "🎯" },
    { label: "Total Training Time", icon: "👟" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4"
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// DOACH Recommends Component
function DoachRecommends() {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">DOACH Recommends</h2>
      <p className="text-gray-600 mb-4">
        Your last session showed you need to work on quick releases. Try the <b>‘Catch & Shoot’</b> drill today.
      </p>
      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg w-full sm:w-auto">
        Start Drill
      </button>
    </div>
  );
}

// Recent Sessions Component
function RecentSessions() {
  const sessions = [
    { id: 1, title: "Shooting Drill", date: "2025-08-20", duration: "45 mins", status: "Completed" },
    { id: 2, title: "Ball Handling Practice", date: "2025-08-22", duration: "30 mins", status: "Missed" },
    { id: 3, title: "Strength Training", date: "2025-08-25", duration: "60 mins", status: "Completed" },
    { id: 4, title: "Defense Drill", date: "2025-08-26", duration: "40 mins", status: "Completed" },
    { id: 5, title: "Conditioning Run", date: "2025-08-27", duration: "30 mins", status: "Missed" },
    { id: 6, title: "Agility Training", date: "2025-08-28", duration: "50 mins", status: "Completed" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Sessions</h2>

      {/* Scrollable container */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center border hover:shadow-md transition gap-2 sm:gap-0"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{session.title}</h3>
              <p className="text-sm text-gray-600">
                {session.date} • {session.duration}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                session.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {session.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


// Highlights Component
function DashboardHighlights({ highlights }) {
  const items = highlights?.length
    ? highlights
    : [
        { id: 1, title: "Shooting Drill", date: "10/26/2024", stats: "Shots: 30/50", rating: "4.5/5", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf0GHI5u5jtMlGR0nbk0QnhtDpq8PJXJMKbA&s" },
        { id: 2, title: "Dribbling Session", date: "10/25/2024", stats: null, rating: "4.8/5", image: "https://www.shutterstock.com/image-photo/children-red-soccer-uniforms-practicing-600nw-2619372895.jpg" },
        { id: 3, title: "Conditioning Workout", date: "10/24/2024", stats: null, rating: "4.2/5", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8BUMaFgoMspipLgCY51kZkynqFRSGF7kisw&s" },
        { id: 4, title: "Conditioning Workout", date: "10/24/2024", stats: null, rating: "4.2/5", image: "https://educatefitness.co.uk/wp-content/uploads/2023/05/Proper-Conditioning-in-Sports-Principles-and-Strategies.jpg" },
      ];

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Session Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-gray-900 text-white rounded-xl shadow-md overflow-hidden">
            <div className="w-full h-36 bg-gray-700 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{item.title}</h3>
              <p className="text-sm text-gray-300">📅 {item.date}</p>
              {item.stats && <p className="text-sm text-orange-400">{item.stats}</p>}
              <p className="text-sm text-orange-400">⭐ {item.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  return (
    <div className="py-6 bg-gray-100 min-h-screen px-2 sm:px-6 lg:px-12">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Hi, Player Handle!</h1>
      </div>

      {/* Sections */}
      <Scoreboard />
      <DashboardBox />
      <QuickStats />
      <DoachRecommends />
      <RecentSessions />
      <DashboardHighlights />
    </div>
  );
}
