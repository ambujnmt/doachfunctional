import React, { useState, useEffect } from "react";
import DashboardBox from "./DashboardBox";
import { getUserData } from "../../../utils/fetchUserApi"; // adjust path

// Scoreboard Component
function Scoreboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
      {/* Scoreboard Card */}
      <div className="bg-[#1A1A1A] rounded-xl shadow-md p-6 w-full border border-[#333]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            Scoreboard
          </h2>
          <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">
            Rookie Tier
          </span>
        </div>

        <div className="mt-4">
          <p className="text-4xl sm:text-5xl font-bold text-white">1,560</p>
          <p className="text-sm text-gray-400 mt-1">Total Points</p>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-yellow-400 h-3 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            340 points to reach <b className="text-white">Pro Tier</b>
          </p>
        </div>

        <div className="mt-4 text-sm text-green-400 font-medium">
          🚀 Keep pushing! You're on fire!
        </div>
      </div>

      {/* Player Stats Card */}
      <div className="bg-[#1A1A1A] rounded-xl shadow-md p-6 w-full border border-[#333]">
        <h2 className="text-lg font-semibold mb-4 text-white">Player Stats</h2>
        <div className="space-y-2">
          <div className="bg-[#2A2A2A] text-white rounded-lg p-3 w-full">
            <p className="text-xs text-gray-400 uppercase font-medium">
              Sessions
            </p>
            <p className="text-base font-semibold mt-1">24</p>
          </div>
          <div className="bg-[#2A2A2A] text-white rounded-lg p-3 w-full">
            <p className="text-xs text-gray-400 uppercase font-medium">
              Total Shots
            </p>
            <p className="text-base font-semibold mt-1">1,450</p>
          </div>
          <div className="bg-[#2A2A2A] text-white rounded-lg p-3 w-full">
            <p className="text-xs text-gray-400 uppercase font-medium">
              Status
            </p>
            <p className="text-base font-semibold mt-1">Beginner</p>
          </div>
        </div>
      </div>

      {/* My Training Card */}
      <div className="bg-[#1A1A1A] rounded-xl shadow-md p-6 w-full border border-[#333]">
        <h2 className="text-lg font-semibold mb-4 text-white">My Training</h2>
        <div className="space-y-2">
          <div className="bg-[#2A2A2A] text-white rounded-lg p-3 w-full">
            <p className="text-xs text-gray-400 uppercase font-medium">
              Session
            </p>
            <p className="text-base font-semibold mt-1">
              Footwork Fundamentals
            </p>
          </div>
          <div className="bg-[#2A2A2A] text-white rounded-lg p-3 w-full">
            <p className="text-xs text-gray-400 uppercase font-medium">
              Drill
            </p>
            <p className="text-base font-semibold mt-1">Crossover Drill</p>
          </div>
          <div className="bg-[#2A2A2A] text-white rounded-lg p-3 w-full">
            <p className="text-xs text-gray-400 uppercase font-medium">
              Training
            </p>
            <p className="text-base font-semibold mt-1">Agility & Speed</p>
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
    <div className="bg-[#1A1A1A] rounded-xl shadow p-6 mb-6 border border-[#333]">
      <h2 className="text-lg font-semibold text-white mb-4">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-[#2A2A2A] rounded-lg p-4"
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="mt-2 text-sm font-medium text-gray-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// DOACH Recommends Component
function DoachRecommends() {
  return (
    <div className="bg-[#1A1A1A] rounded-xl shadow p-6 mb-6 border border-[#333]">
      <h2 className="text-lg font-semibold text-white mb-3">
        DOACH Recommends
      </h2>
      <p className="text-gray-300 mb-4">
        Your last session showed you need to work on quick releases. Try the{" "}
        <b className="text-yellow-400">‘Catch & Shoot’</b> drill today.
      </p>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg w-full sm:w-auto">
        Start Drill
      </button>
    </div>
  );
}

// Recent Sessions Component
function RecentSessions() {
  const sessions = [
    {
      id: 1,
      title: "Shooting Drill",
      date: "2025-08-20",
      duration: "45 mins",
      status: "Completed",
    },
    {
      id: 2,
      title: "Ball Handling Practice",
      date: "2025-08-22",
      duration: "30 mins",
      status: "Missed",
    },
    {
      id: 3,
      title: "Strength Training",
      date: "2025-08-25",
      duration: "60 mins",
      status: "Completed",
    },
    {
      id: 4,
      title: "Defense Drill",
      date: "2025-08-26",
      duration: "40 mins",
      status: "Completed",
    },
    {
      id: 5,
      title: "Conditioning Run",
      date: "2025-08-27",
      duration: "30 mins",
      status: "Missed",
    },
    {
      id: 6,
      title: "Agility Training",
      date: "2025-08-28",
      duration: "50 mins",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-[#1A1A1A] rounded-xl shadow p-6 mb-6 border border-[#333]">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Sessions</h2>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border border-[#333] hover:shadow-md transition gap-2 sm:gap-0 bg-[#2A2A2A]"
          >
            <div>
              <h3 className="font-semibold text-lg text-white">
                {session.title}
              </h3>
              <p className="text-sm text-gray-400">
                {session.date} • {session.duration}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                session.status === "Completed"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
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
        {
          id: 1,
          title: "Shooting Drill",
          date: "10/26/2024",
          stats: "Shots: 30/50",
          rating: "4.5/5",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf0GHI5u5jtMlGR0nbk0QnhtDpq8PJXJMKbA&s",
        },
        {
          id: 2,
          title: "Dribbling Session",
          date: "10/25/2024",
          stats: null,
          rating: "4.8/5",
          image:
            "https://www.shutterstock.com/image-photo/children-red-soccer-uniforms-practicing-600nw-2619372895.jpg",
        },
        {
          id: 3,
          title: "Conditioning Workout",
          date: "10/24/2024",
          stats: null,
          rating: "4.2/5",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8BUMaFgoMspipLgCY51kZkynqFRSGF7kisw&s",
        },
        {
          id: 4,
          title: "Conditioning Workout",
          date: "10/24/2024",
          stats: null,
          rating: "4.2/5",
          image:
            "https://educatefitness.co.uk/wp-content/uploads/2023/05/Proper-Conditioning-in-Sports-Principles-and-Strategies.jpg",
        },
      ];

  return (
    <div className="bg-[#1A1A1A] rounded-xl shadow p-6 mb-6 border border-[#333]">
      <h2 className="text-xl font-bold text-white mb-4">Session Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#2A2A2A] text-white rounded-xl shadow-md overflow-hidden border border-[#333]"
          >
            <div className="w-full h-36 bg-gray-700 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{item.title}</h3>
              <p className="text-sm text-gray-400">📅 {item.date}</p>
              {item.stats && (
                <p className="text-sm text-yellow-400">{item.stats}</p>
              )}
              <p className="text-sm text-yellow-400">⭐ {item.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  const [userName, setUserName] = useState("Player");

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId"); // 👈 get logged-in userId
      if (!userId) return;

      try {
        const { data } = await getUserData(userId); // 👈 call helper API
        if (data && data.name) {
          setUserName(data.name); // 👈 set user name
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="py-6 bg-black min-h-screen px-2 sm:px-6 lg:px-12">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Hi, {userName}!
        </h1>
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
