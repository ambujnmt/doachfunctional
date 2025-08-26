"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ useSearchParams
import { getStoryById, updateStory } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditStory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id"); // ✅ from query string

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load existing story
  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      try {
        const res = await getStoryById(storyId);

        console.log("Fetched story:", res);

        if (res.status) {
          setTitle(res.data.story_title || "");
          setDate(res.data.story_date || "");
          setDescription(res.data.description || "");
          setPreview(res.data.story_image || null);
        } else {
          toast.error("Story not found");
        }
      } catch (error) {
        console.error("Error fetching story:", error);
        toast.error("Failed to load story details.");
      }
    };

    fetchStory();
  }, [storyId]);

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !date) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("story_title", title);
    formData.append("story_date", date);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await updateStory(storyId, formData); // ✅ pass query param id
      toast.success("Story updated successfully!");
      setTimeout(() => {
        router.push("/administor/stories/listing");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Story</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Story Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter story title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Story Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter story description"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Story Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
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
            onClick={() => router.push("/administor/stories/listing")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Story"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
