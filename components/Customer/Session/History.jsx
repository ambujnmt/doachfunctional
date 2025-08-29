import React from "react";

export default function History() {
  const sessions = [
    {
      id: 1,
      date: "2025-08-20",
      title: "Shooting Drill",
      duration: "45 mins",
      status: "Runing",
    },
    {
      id: 2,
      date: "2025-08-22",
      title: "Ball Handling Practice",
      duration: "30 mins",
      status: "Runing",
    },
    {
      id: 3,
      date: "2025-08-25",
      title: "Strength Training",
      duration: "60 mins",
      status: "Runing",
    },
    {
      id: 4,
      date: "2025-08-25",
      title: "Strength Training",
      duration: "60 mins",
      status: "Runing",
    },
    {
      id: 5,
      date: "2025-08-25",
      title: "Strength Training",
      duration: "60 mins",
      status: "Runing",
    },
  ];

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sessions</h1>
        <p className="text-gray-600 mt-1">Explore Session History</p>
      </div>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{session.title}</h3>
              <p className="text-sm text-gray-600">
                {session.date} • {session.duration}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                session.status === "Runing"
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
