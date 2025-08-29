import React from "react";

export default function MySteak() {
  const steaks = [
    {
      id: 1,
      name: "Classic Ribeye Steak",
      description: "Juicy ribeye cooked to perfection with garlic butter.",
      price: "$25",
    },
    {
      id: 2,
      name: "T-Bone Steak",
      description: "Grilled T-bone served with mashed potatoes and veggies.",
      price: "$30",
    },
    {
      id: 3,
      name: "Filet Mignon",
      description: "Tender filet with peppercorn sauce.",
      price: "$35",
    },
  ];

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Steaks</h1>
        <p className="text-gray-600 mt-1">Explore My Steaks</p>
      </div>
      <div className="space-y-4">
        {steaks.map((steak) => (
          <div
            key={steak.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{steak.name}</h3>
            <p className="text-gray-600">{steak.description}</p>
            <span className="block mt-2 font-bold text-green-600">
              {steak.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
