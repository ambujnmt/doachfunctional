"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createCommunityCategory } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryCreate() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !description || !image) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", description);
    formData.append("image", image); // ✅ attach image

    try {
      setLoading(true);
      await createCommunityCategory(formData);
      toast.success("Category created successfully!");
      setTimeout(() => {
        router.push("/administor/community/category");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000] min-h-screen py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Create Category</h2>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-white">
          {/* Category Name */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              rows="4"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222] text-white focus:ring focus:ring-[#FFEA70]"
              required
            />

            {/* Image Preview */}
            {preview && (
              <div className="mt-3">
                <p className="text-gray-400 text-sm mb-1">Preview:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-28 object-cover rounded-lg border border-[#FFD700]"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/community/category")}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFEA70] transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
