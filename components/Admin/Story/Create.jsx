"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createStory, getFormList } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Create() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [formId, setFormId] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formList, setFormList] = useState([]);

  const router = useRouter();

  // Fetch dynamic forms
  useEffect(() => {
    const fetchForms = async () => {
      const data = await getFormList();
      setFormList(data);
    };
    fetchForms();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else setPreview(null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoPreview(reader.result);
      reader.readAsDataURL(file);
    } else setVideoPreview(null);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !category || !image) {
      toast.error("Please fill all required fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("story_title", title);
    formData.append("story_date", date);
    formData.append("description", description);
    formData.append("content_type", category);
    formData.append("image", image);
    if (video) formData.append("video", video);
    if (formId) formData.append("form_id", formId);

    try {
      setLoading(true);
      await createStory(formData);
      toast.success("Story created successfully!");
      setTimeout(() => router.push("/administor/stories/listing"), 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000] py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
           Create Story
          </h2>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-[#FFFFFF]">

          {/* Story Title */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Story Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter story title"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] placeholder-[#CCCCCC] focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Story Date */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Story Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Two-column dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Content Type */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Content Type *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-[#FFEA70]"
                required
              >
                <option value="">Select Content Type</option>
                <option value="Video">Video Content</option>
                <option value="Articles">Articles</option>
                <option value="News">News</option>
              </select>
            </div>

            {/* Dynamic Form */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Select Form (Optional)</label>
              <select
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-[#FFEA70]"
              >
                <option value="">Select Form</option>
                {formList.map((form) => (
                  <option key={form.id} value={form.id}>{form.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Description *</label>
            <div className="border border-[#FFD700] rounded-lg">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Enter description"
                modules={quillModules}
                className="bg-[#222222] text-white rounded-lg"
              />
            </div>
          </div>

          {/* Image & Video */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Story Image *</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {preview && (
                <div className="mt-3 p-2 border border-white rounded-lg bg-[#1F1F1F] w-full h-36 flex items-center justify-center">
                  <img src={preview} alt="Preview" className="object-cover w-full h-full rounded-md" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-yellow-500 font-medium mb-1">Story Video (Optional)</label>
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
              onClick={() => router.push("/administor/stories/listing")}
              className="px-4 py-2 bg-[#444] text-[#FFFFFF] rounded-lg hover:bg-[#555] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFD700] text-[#000000] rounded-lg hover:bg-[#FFEA70] transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Story"}
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
