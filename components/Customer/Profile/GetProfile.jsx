"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getUserData } from "../../../utils/fetchUserApi";

export default function GetProfile() {
  const [profileData, setProfileData] = useState({});
  const [onboardingData, setOnboardingData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("No user ID found in localStorage");
        return;
      }
      try {
        const response = await getUserData(userId);
        console.log("Fetched user data:", response);
        setProfileData(response.data || {});
        setOnboardingData(response.onboarding || {});
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const display = (value) => (value ? value : "N/A");

  return (
    <div className="py-6 bg-black min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">My Profile!</h1>
        <p className="text-gray-400 mt-1">
          Manage your profile and track your progress effortlessly
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-yellow-400">Profile Info</h2>
          <button className="bg-yellow-500 text-black px-4 py-2 rounded-md text-sm hover:bg-yellow-600">
            <Link className="no-underline" href="/customer/profile/update">
              Edit Profile
            </Link>
          </button>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <img
            src={
              profileData.profile_image ||
              profileData.avatar ||
              "https://static.vecteezy.com/system/resources/thumbnails/024/624/549/small_2x/3d-rendering-person-icon-3d-render-blue-user-sign-icon-png.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500 shadow-md"
          />
          <div className="space-y-1 text-gray-300">
            <p className="text-lg font-semibold text-white">
              {display(profileData.name)}
            </p>
            <p>Email: {display(profileData.email)}</p>
            <p>Phone: {display(profileData.phone_number)}</p>
            <p>Location: {display(profileData.address)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
          <p>
            <span className="font-semibold text-white">Account Status:</span>{" "}
            {display(profileData.status)}
          </p>
          <p>
            <span className="font-semibold text-white">Created At:</span>{" "}
            {profileData.created_at
              ? new Date(profileData.created_at).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold text-white">Last Updated:</span>{" "}
            {profileData.updated_at
              ? new Date(profileData.updated_at).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold text-white">
              Onboarding Complete:
            </span>{" "}
            {display(profileData.onboarding_complete)}
          </p>
        </div>
      </div>

      {/* Onboarding Section */}
      <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">
          Onboarding Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <p>
            <span className="font-semibold text-white">Handle:</span>{" "}
            {display(onboardingData.handle)}
          </p>
          <p>
            <span className="font-semibold text-white">Name:</span>{" "}
            {display(onboardingData.name)}
          </p>
          <p>
            <span className="font-semibold text-white">Email:</span>{" "}
            {display(onboardingData.email)}
          </p>
          <p>
            <span className="font-semibold text-white">Phone:</span>{" "}
            {display(onboardingData.phone)}
          </p>
          <p>
            <span className="font-semibold text-white">Notifications:</span>{" "}
            {display(onboardingData.notifications)}
          </p>
          <p>
            <span className="font-semibold text-white">Age:</span>{" "}
            {display(onboardingData.age)}
          </p>
          <p>
            <span className="font-semibold text-white">Height:</span>{" "}
            {display(onboardingData.height)}
          </p>
          <p>
            <span className="font-semibold text-white">Weight:</span>{" "}
            {display(onboardingData.weight)}
          </p>
          <p>
            <span className="font-semibold text-white">Mode:</span>{" "}
            {display(onboardingData.mode)}
          </p>
          <p>
            <span className="font-semibold text-white">Position:</span>{" "}
            {display(onboardingData.position)}
          </p>
          <p>
            <span className="font-semibold text-white">Level:</span>{" "}
            {display(onboardingData.level)}
          </p>
          <p>
            <span className="font-semibold text-white">Goal:</span>{" "}
            {display(onboardingData.goal)}
          </p>
          <p>
            <span className="font-semibold text-white">Primary Sport:</span>{" "}
            {display(onboardingData.primary_sport)}
          </p>
          <p>
            <span className="font-semibold text-white">Skill Level:</span>{" "}
            {display(onboardingData.skill_level)}
          </p>
          <p>
            <span className="font-semibold text-white">Training Goals:</span>{" "}
            {display(onboardingData.training_goals)}
          </p>
          <p>
            <span className="font-semibold text-white">Skills:</span>{" "}
            {display(onboardingData.skills)}
          </p>
        </div>
      </div>
    </div>
  );
}
