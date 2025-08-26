"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createCoach } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create() {
  // States
  const [name, setCoachName] = useState("");
  const [email, setCoachEmail] = useState("");
  const [phone, setCoachPhone] = useState("");
  const [specialization, setCoachSpecialization] = useState("");
  const [experience, setCoachExperience] = useState("");
  const [bioData, setBioData] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !specialization || !experience || !bioData || !image) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("specialization", specialization);
    formData.append("experience_years", experience);
    formData.append("bio_data", bioData);
    formData.append("image", image);

    try {
      setLoading(true);
      await createCoach(formData);
      toast.success("Coach created successfully!");
      setTimeout(() => {
        router.push("/administor/coach/listing"); // ✅ redirect to coach listing
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create coach.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Coach</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setCoachName(e.target.value)}
            placeholder="Enter coach name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setCoachEmail(e.target.value)}
            placeholder="Enter coach email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setCoachPhone(e.target.value)}
            placeholder="Enter coach phone"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Specialization</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setCoachSpecialization(e.target.value)}
            placeholder="Enter specialization"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Experience (years)</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setCoachExperience(e.target.value)}
            placeholder="Enter experience years"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Bio Data */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Bio Data</label>
          <textarea
            value={bioData}
            onChange={(e) => setBioData(e.target.value)}
            placeholder="Enter coach bio data"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Coach Image</label>
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
            onClick={() => router.push("/administor/coach/listing")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Coach"}
          </button>
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
