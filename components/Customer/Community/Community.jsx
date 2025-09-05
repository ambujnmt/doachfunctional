import React from "react";

export default function Community() {
  const items = [
    {
      title: "Start a Drill",
      img: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
    },
    {
      title: "See What's Poppin'",
      img: "https://images.pexels.com/photos/269948/pexels-photo-269948.jpeg",
    },
  ];

  return (
    <div className="py-6 bg-black">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Community!</h1>
        <p className="text-gray-400 mt-1">
          Explore skills and connect with others
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer border border-[#333] bg-[#1A1A1A]"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition">
              <h3 className="text-yellow-400 text-2xl font-bold drop-shadow-lg">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
