"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getcommunityDetailById,
  updatecommunity,
  categoryCommunityList,
  getFormList, // ✅ import API
} from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

// Dynamically import React Quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Edit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [categories, setCategories] = useState([]);
  const [forms, setForms] = useState([]); // ✅ Forms list

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    form_id: "", // ✅ new field
    content_type: "",
    category: "",
    description: "",
    status: 1,
    image: null,
    video: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories + forms
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catData, formData] = await Promise.all([
          categoryCommunityList(),
          getFormList(),
        ]);
        setCategories(catData || []);
        setForms(formData || []);
      } catch (err) {
        toast.error("Failed to load categories or forms");
      }
    };
    fetchInitialData();
  }, []);

  // Fetch community detail
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await getcommunityDetailById(id);
        if (res.status && res.data) {
          setFormData({
            title: res.data.title || "",
            date: res.data.date || "",
            form_id: res.data.form_id || "", // ✅ load form_id
            content_type: res.data.content_type || "",
            category: res.data.category || "",
            description: res.data.description || "",
            status: res.data.status ?? 1,
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

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="bg-[#000] min-h-screen py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Edit Community</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-white"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-[#FFD700] rounded px-3 py-2 bg-[#222]"
              required
            />
          </div>

          {/* Row: Date + Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded px-3 py-2 bg-[#222]"
                required
              />
            </div>

            {/* Form Dropdown */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">
                Form
              </label>
              <select
                name="form_id"
                value={formData.form_id}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded px-3 py-2 bg-[#222]"
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
                name="content_type"
                value={formData.content_type}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded px-3 py-2 bg-[#222]"
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
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded px-3 py-2 bg-[#222]"
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
            <div className="border border-[#FFD700] rounded-lg p-2 bg-[#222]">
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, description: val }))
                }
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-[#FFD700] rounded px-3 py-2 bg-[#222]"
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
            <label className="block text-yellow-500 font-medium mb-1">
              Video
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full border border-[#FFD700] rounded px-3 py-2 bg-[#222]"
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
            <label className="block text-yellow-500 font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-[#FFD700] rounded px-3 py-2 bg-[#222]"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-[#FFD700] text-black rounded hover:bg-[#FFEA70]"
            >
              Update
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
