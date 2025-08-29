import React from "react";

export default function MySession() {
  const coaches = [
    {
      name: "John Smith",
      title: "Fitness Coach",
      bio: "Helping people achieve their health and fitness goals.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Emily Johnson",
      title: "Life Coach",
      bio: "Guiding individuals to unlock their full potential.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "David Lee",
      title: "Business Coach",
      bio: "Empowering entrepreneurs to grow and scale successfully.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Meet Our Coaches</h1>
        <p className="text-gray-500 text-sm mt-1">
          Our expert coaches are here to guide, support, and inspire you on your journey.
        </p>
      </div>

      {/* Coach Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coaches.map((coach, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src={coach.image}
              alt={coach.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold">{coach.name}</h3>
            <p className="text-sm text-blue-600">{coach.title}</p>
            <p className="text-gray-600 mt-2 text-sm">{coach.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
