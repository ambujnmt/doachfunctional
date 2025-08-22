import React from "react";

export default function GetProfile() {
  // Dummy Profile Data
  const profileData = {
    name: "John Doe",
    email: "customer@example.com",
    phone: "+91 9877777777",
    location: "New Delhi, India",
    profilePic:
      "https://static.vecteezy.com/system/resources/thumbnails/024/624/549/small_2x/3d-rendering-person-icon-3d-render-blue-user-sign-icon-png.png", // Dummy profile image
  };

  // Dummy Onboarding Data
  const onboardingData = {
    age: 25,
    position: "Frontend Developer",
    level: "Intermediate",
    goal: "Master React & Next.js",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Profile!</h1>
        <p className="text-gray-600 mt-1">Manage your profile and track your progress effortlessly</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Profile Info</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            Edit Profile
          </button>
        </div>

        {/* Profile Picture + Info */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={profileData.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-600 shadow-md"
          />
          <div>
            <p className="text-lg font-semibold">{profileData.name}</p>
            <p className="text-gray-600">{profileData.email}</p>
            <p className="text-gray-600">{profileData.phone}</p>
            <p className="text-gray-600">{profileData.location}</p>
          </div>
        </div>

        {/* Grid Info (optional if you want to keep below as well) */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-semibold">Name:</span> {profileData.name}</p>
          <p><span className="font-semibold">Email:</span> {profileData.email}</p>
          <p><span className="font-semibold">Phone:</span> {profileData.phone}</p>
          <p><span className="font-semibold">Location:</span> {profileData.location}</p>
        </div> */}
      </div>

      {/* Onboarding Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Onboarding Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-semibold">Age:</span> {onboardingData.age}</p>
          <p><span className="font-semibold">Position:</span> {onboardingData.position}</p>
          <p><span className="font-semibold">Level:</span> {onboardingData.level}</p>
          <p><span className="font-semibold">Goal:</span> {onboardingData.goal}</p>
        </div>
      </div>
    </div>
  );
}
