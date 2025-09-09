"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { eventContestAwardCreate } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create() {
  const [contestName, setContestName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [contestImage, setContestImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setContestImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contestName || !date || !time || !location || !contestImage) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("contest_name", contestName);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("contest_image", contestImage);

    try {
      setLoading(true);
      await eventContestAwardCreate(formData);
      toast.success("Contest created successfully!");
      setTimeout(() => {
        router.push("/administor/eventContests/listing");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create contest.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0F0F0F] py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">
          🏆 Create Event Contest Award
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Contest Name */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">
              Contest Name
            </label>
            <input
              type="text"
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
              placeholder="Enter contest name"
              className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
              required
            />
          </div>

          {/* Contest Date */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">
              Contest Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
              required
            />
          </div>

          {/* Contest Time */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">
              Contest Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
              required
            />
          </div>

          {/* Contest Location */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">
              Contest Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter contest location"
              className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
              required
            />
          </div>

          {/* Contest Image */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">
              Contest Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-white"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-48 h-32 object-cover rounded-lg shadow-md border border-[#444]"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/event")}
              className="px-4 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFC32B] text-black font-semibold rounded-lg hover:bg-[#e6ad24] transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Contest"}
            </button>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
