import React from "react";

export default function Listing() {
  const sessions = [
    {
      id: 1,
      date: "2025-08-20",
      title: "Shooting Drill",
      duration: "45 mins",
      status: "Running",
    },
    {
      id: 2,
      date: "2025-08-22",
      title: "Ball Handling Practice",
      duration: "30 mins",
      status: "Running",
    },
    {
      id: 3,
      date: "2025-08-25",
      title: "Strength Training",
      duration: "60 mins",
      status: "Running",
    },
    {
      id: 4,
      date: "2025-08-25",
      title: "Strength Training",
      duration: "60 mins",
      status: "Running",
    },
    {
      id: 5,
      date: "2025-08-25",
      title: "Strength Training",
      duration: "60 mins",
      status: "Running",
    },
  ];

  return (
    <div className="py-6 bg-black">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Sessions</h1>
        <p className="text-gray-400 mt-1">Explore Session History</p>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-[#1A1A1A] p-4 rounded-lg shadow-md flex justify-between items-center border border-[#333] hover:border-yellow-500 transition"
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
                session.status === "Running"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
                  : "bg-red-500/20 text-red-400 border border-red-500"
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
