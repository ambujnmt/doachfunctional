"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getcommunityDetailById,
  updatecommunity,
} from "../../../utils/fetchAdminApi";
import { toast } from "react-toastify";

export default function Edit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
    description: "",
    status: 1,
    image: null,
    video: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch detail
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await getcommunityDetailById(id);
        if (res.status && res.data) {
          setFormData({
            title: res.data.title || "",
            date: res.data.date || "",
            category: res.data.category || "",
            description: res.data.description || "",
            status: res.data.status || 1,
            image: null,
            video: null,
          });

          if (res.data.image) setPreviewImage(res.data.image);
          if (res.data.video) setPreviewVideo(res.data.video);
        }
      } catch (err) {
        toast.error("Failed to load community details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));

      if (name === "image") {
        setPreviewImage(URL.createObjectURL(files[0]));
      }
      if (name === "video") {
        setPreviewVideo(URL.createObjectURL(files[0]));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sendData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          sendData.append(key, formData[key]);
        }
      });
      sendData.append("_method", "PUT"); // Laravel compatibility

      await updatecommunity(id, sendData);
      toast.success("Community updated successfully!");
      router.push("/administor/community/listing");
    } catch (err) {
      toast.error(err.message || "Failed to update");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Community</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 h-32 w-auto rounded object-cover"
            />
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Video</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
          {previewVideo && (
            <video controls className="mt-2 w-full max-h-60 rounded">
              <source src={previewVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
