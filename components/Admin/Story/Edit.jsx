"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStoryById, updateStory } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditStory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (!storyId) return;
    const fetchStory = async () => {
      try {
        const res = await getStoryById(storyId);
        if (res.status) {
          setTitle(res.data.story_title || "");
          setDate(res.data.story_date || "");
          setDescription(res.data.description || "");
          setCategory(res.data.content_type || "");
          setPreview(res.data.story_image || null);
          setVideoPreview(res.data.story_video || null);
        } else toast.error("Story not found");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load story");
      }
    };
    fetchStory();
  }, [storyId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !category) {
      toast.error("Please fill all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("story_title", title);
    formData.append("story_date", date);
    formData.append("description", description);
    formData.append("content_type", category);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      setLoading(true);
      await updateStory(storyId, formData);
      toast.success("Story updated successfully!");
      setTimeout(() => router.push("/administor/stories/listing"), 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0F0F0F] py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-[#FFF] mb-4">Edit Story</h1>
        <form onSubmit={handleSubmit} className="space-y-5 text-[#FFFFFF]">
          {/* Title */}
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

          {/* Date */}
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

          {/* Description */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Description *</label>
            <div className="border border-[#FFD700] rounded-lg">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={quillModules}
                className="bg-[#222222] text-white rounded-lg"
              />
            </div>
          </div>

          {/* Image + Video */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Story Image *</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {preview && (
                <div className="mt-3 p-2 border border-white rounded-lg bg-[#1F1F1F] w-full h-36 flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
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
              {loading ? "Updating..." : "Update Story"}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
