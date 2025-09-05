import React from "react";

export default function Listing() {
  const sessions = [
    {
      id: 1,
      date: "2025-08-20",
      title: "Shooting Drill",
      duration: "45 mins",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-08-22",
      title: "Ball Handling Practice",
      duration: "30 mins",
      status: "Missed",
    },
    {
      id: 3,
      date: "2025-08-25",
      title: "Strength Training",
      duration: "60 mins",
      status: "Completed",
    },
  ];

  return (
    <div className="py-6 bg-black min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">My Session</h1>
        <p className="text-gray-400 mt-1">Explore Session History</p>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-[#1A1A1A] p-4 rounded-lg shadow-md flex justify-between items-center border border-[#333]"
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
                  ? "bg-gray-500/20 text-white"
                  : "bg-gray-500/20 text-yellow-400"
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
