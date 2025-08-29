import React from "react";

export default function DemoVideoList() {
  const videos = [
    {
      id: 1,
      title: "Basketball Shooting Drill",
      desc: "Improve your shooting consistency and range.",
      thumbnail: "https://img.youtube.com/vi/1hHG3zO8h7M/0.jpg",
      url: "https://www.youtube.com/watch?v=1hHG3zO8h7M",
    },
    {
      id: 2,
      title: "Ball Handling Basics",
      desc: "Master dribbling and control with these basics.",
      thumbnail: "https://img.youtube.com/vi/cy5hxn6wfjk/0.jpg",
      url: "https://www.youtube.com/watch?v=cy5hxn6wfjk",
    },
    {
      id: 3,
      title: "Strength & Conditioning",
      desc: "Build strength and agility with these drills.",
      thumbnail: "https://img.youtube.com/vi/VOaZbaPZdQg/0.jpg",
      url: "https://www.youtube.com/watch?v=VOaZbaPZdQg",
    },
  ];

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Demo Video List</h1>
        <p className="text-gray-600 mt-1">Explore Video</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{video.desc}</p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 inline-block bg-yellow-400 text-black rounded-full font-medium hover:bg-yellow-300"
              >
                ▶ Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
