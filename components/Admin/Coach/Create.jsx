"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createCoach } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

// Dynamic import for React Quill (client-side only)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreateCoach() {
  const [name, setCoachName] = useState("");
  const [email, setCoachEmail] = useState("");
  const [phone, setCoachPhone] = useState("");
  const [specialization, setCoachSpecialization] = useState("");
  const [experience, setCoachExperience] = useState("");
  const [bioData, setBioData] = useState("");
  const [contentType, setContentType] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
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
    } else setPreview(null);
  };

  // Video preview
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoPreview(reader.result);
      reader.readAsDataURL(file);
    } else setVideoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !specialization || !experience || !bioData || !contentType || !image) {
      toast.error("Please fill all required fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("specialization", specialization);
    formData.append("experience_years", experience);
    formData.append("bio_data", bioData);
    formData.append("content_type", contentType);
    formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      setLoading(true);
      await createCoach(formData);
      toast.success("Coach created successfully!");
      setTimeout(() => router.push("/administor/coach/listing"), 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create coach.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#000] py-6 min-h-screen">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-[#FFF] mb-4">Create Coach</h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-[#FFFFFF]">

          {/* Name */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setCoachName(e.target.value)}
              placeholder="Enter coach name"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] placeholder-[#CCCCCC] focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setCoachEmail(e.target.value)}
              placeholder="Enter coach email"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] placeholder-[#CCCCCC] focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Phone *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setCoachPhone(e.target.value)}
              placeholder="Enter coach phone"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] placeholder-[#CCCCCC] focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Specialization *</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setCoachSpecialization(e.target.value)}
              placeholder="Enter specialization"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] placeholder-[#CCCCCC] focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Experience (years) *</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setCoachExperience(e.target.value)}
              placeholder="Enter experience years"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] placeholder-[#CCCCCC] focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Content Type *</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-[#FFEA70]"
              required
            >
              <option value="">Select Content Type</option>
              <option value="Video">Video</option>
              <option value="Article">Article</option>
              <option value="News">News</option>
            </select>
          </div>

          {/* Bio Data (Rich Text) */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Bio Data *</label>
            <div className="border border-[#FFD700] rounded-lg">
              <ReactQuill
                value={bioData}
                onChange={setBioData}
                placeholder="Enter coach bio data"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "video"],
                    ["clean"]
                  ]
                }}
                className="bg-[#222222] text-white rounded-lg"
              />
            </div>
          </div>

          {/* Image + Video */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Coach Image *</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {preview && (
                <div className="mt-3 p-2 border border-white rounded-lg bg-[#1F1F1F] w-full h-36 flex items-center justify-center">
                  <img src={preview} alt="Preview" className="object-cover w-full h-full rounded-md" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-yellow-500 font-medium mb-1">Coach Video (Optional)</label>
              <input type="file" accept="video/*" onChange={handleVideoChange} />
              {videoPreview && (
                <div className="mt-3 p-2 border border-white rounded-lg bg-[#1F1F1F] w-full h-36 flex items-center justify-center">
                  <video src={videoPreview} controls className="object-cover w-full h-full rounded-md" />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/coach/listing")}
              className="px-4 py-2 bg-[#444] text-[#FFFFFF] rounded-lg hover:bg-[#555] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFD700] text-[#000000] rounded-lg hover:bg-[#FFEA70] transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Coach"}
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
