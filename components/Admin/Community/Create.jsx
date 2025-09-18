"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createcommunityList,
  categoryCommunityList,
  getFormList, // ✅ import form list api
} from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

// Dynamically import React Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function CreateCommunity() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [contentType, setContentType] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ new state for forms
  const [formId, setFormId] = useState("");
  const [forms, setForms] = useState([]);

  const router = useRouter();

  // Fetch categories & forms
  useEffect(() => {
    const fetchData = async () => {
      const cats = await categoryCommunityList();
      setCategories(cats);

      const formList = await getFormList();
      setForms(formList);
    };
    fetchData();
  }, []);

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

  // Video preview
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setVideoPreview(null);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !contentType || !category || !description || !image || !date || !formId) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("content_type", contentType);
    formData.append("category", category);
    formData.append("form_id", formId); // ✅ added
    formData.append("description", description);
    formData.append("image", image);
    if (video) {
      formData.append("video", video);
    }

    try {
      setLoading(true);
      await createcommunityList(formData);
      toast.success("Community content created successfully!");
      setTimeout(() => router.push("/administor/community/listing"), 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000] min-h-screen py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Create Community Content
          </h2>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-white">
          {/* Title */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Row: Date + Form dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white focus:ring focus:ring-[#FFEA70]"
                required
              />
            </div>

            {/* Form Dropdown */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">
                Form
              </label>
              <select
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white focus:ring focus:ring-[#FFEA70]"
                required
              >
                <option value="">Select form</option>
                {forms.map((form) => (
                  <option key={form.id} value={form.id}>
                    {form.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row: Content Type + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Content Type */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white focus:ring focus:ring-[#FFEA70]"
                required
              >
                <option value="">Select content type</option>
                <option value="Video Content">Video Content</option>
                <option value="Articles">Articles</option>
                <option value="News">News</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white focus:ring focus:ring-[#FFEA70]"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">
              Description
            </label>
            <div className="border border-[#FFD700] rounded-lg p-2 bg-[#222222]">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Enter description or article content"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="border border-[#FFD700] rounded-lg p-3 mt-3 bg-[#222222]">
            <label className="block text-yellow-500 font-medium mb-1">
              Thumbnail / Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-[#FFD700] rounded-lg p-2 bg-[#1F1F1F] text-white"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-48 h-32 object-cover rounded-lg shadow"
              />
            )}
          </div>

          {/* Video Upload */}
          <div className="border border-[#FFD700] rounded-lg p-3 mt-3 bg-[#222222]">
            <label className="block text-yellow-500 font-medium mb-1">
              Video (Optional)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full border border-[#FFD700] rounded-lg p-2 bg-[#1F1F1F] text-white"
            />
            {videoPreview && (
              <video
                src={videoPreview}
                controls
                className="mt-3 w-64 h-36 rounded-lg shadow"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/community/listing")}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFEA70] transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Content"}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
