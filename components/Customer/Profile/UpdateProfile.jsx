"use client";
import React, { useEffect, useState } from "react";
import { getUserData, updateUserData } from "../../../utils/fetchUserApi"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProfile() {
  const [profileData, setProfileData] = useState({});
  const [onboardingData, setOnboardingData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await getUserData(userId);
        if (response.data) setProfileData((prev) => ({ ...prev, ...response.data }));
        if (response.onboarding) setOnboardingData((prev) => ({ ...prev, ...response.onboarding }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleOnboardingChange = (e) => {
    const { name, value } = e.target;
    setOnboardingData({ ...onboardingData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserData(onboardingData.id, { ...onboardingData, ...profileData });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const formatArrayField = (field) => {
  if (!field) return "";
  if (Array.isArray(field)) return field.join(", ");
  try {
    const parsed = JSON.parse(field);
    if (Array.isArray(parsed)) return parsed.join(", ");
    return String(parsed);
  } catch {
    return String(field);
  }
};

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Fields */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name || ""}
                onChange={handleProfileChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email || ""}
                onChange={handleProfileChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="font-semibold">Phone</label>
              <input
                type="text"
                name="phone_number"
                value={profileData.phone_number || ""}
                onChange={handleProfileChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={profileData.address || ""}
                onChange={handleProfileChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Onboarding Fields */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Onboarding Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Handle</label>
              <input
                type="text"
                name="handle"
                value={onboardingData.handle || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Age</label>
              <input
                type="text"
                name="age"
                value={onboardingData.age || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Height</label>
              <input
                type="text"
                name="height"
                value={onboardingData.height || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Weight</label>
              <input
                type="text"
                name="weight"
                value={onboardingData.weight || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Position</label>
              <input
                type="text"
                name="position"
                value={onboardingData.position || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Level</label>
              <input
                type="text"
                name="level"
                value={onboardingData.level || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Goal</label>
              <input
                type="text"
                name="goal"
                value={onboardingData.goal || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Primary Sport</label>
              <input
                type="text"
                name="primary_sport"
                value={onboardingData.primary_sport || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Skill Level</label>
              <input
                type="text"
                name="skill_level"
                value={onboardingData.skill_level || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Mode</label>
              <input
                type="text"
                name="mode"
                value={onboardingData.mode || ""}
                onChange={handleOnboardingChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Arrays */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold mb-2">Training Goals (comma separated)</label>
              <input
                type="text"
                name="training_goals"
                value={formatArrayField(onboardingData.training_goals)}
                onChange={(e) =>
                  handleOnboardingChange({
                    target: {
                      name: "training_goals",
                      value: JSON.stringify(e.target.value.split(",").map((v) => v.trim())),
                    },
                  })
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="font-semibold mb-2">Skills (comma separated)</label>
              <input
                  type="text"
                  name="skills"
                  value={formatArrayField(onboardingData.skills)}
                  onChange={(e) =>
                    handleOnboardingChange({
                      target: {
                        name: "skills",
                        value: JSON.stringify(e.target.value.split(",").map((v) => v.trim())),
                      },
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
