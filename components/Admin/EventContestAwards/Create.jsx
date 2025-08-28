"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { eventContestAwardCreate } from "../../../utils/fetchAdminApi"; // ✅ your helper
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
      await eventContestAwardCreate(formData); // ✅ use helper API
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
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Create Event Contest Award
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Contest Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contest Name
          </label>
          <input
            type="text"
            value={contestName}
            onChange={(e) => setContestName(e.target.value)}
            placeholder="Enter contest name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Contest Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contest Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Contest Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contest Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Contest Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contest Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter contest location"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Contest Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contest Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-48 h-32 object-cover rounded-lg shadow"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.push("/administor/event")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Contest"}
          </button>
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
