"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getCommunityCategoryById,
  updateCommunityCategory,
} from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryEdit() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");
  const router = useRouter();

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null); // ✅ preview old image
  const [loading, setLoading] = useState(false);

  // Fetch category data
  useEffect(() => {
    if (categoryId) {
      getCommunityCategoryById(categoryId)
        .then((res) => {
          if (res.status) {
            setCategoryName(res.data.name || "");
            setDescription(res.data.description || "");
            setOldImage(res.data.image || null); // ✅ set old image
          } else {
            toast.error("Category not found");
          }
        })
        .catch(() => toast.error("Failed to fetch category"));
    }
  }, [categoryId]);

  // Handle new image select
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !description) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", description);
    if (image) {
      formData.append("image", image); // ✅ send new image if selected
    }

    try {
      setLoading(true);
      await updateCommunityCategory(categoryId, formData); // ✅ order fixed (id first, formData second)
      toast.success("Category updated successfully!");
      setTimeout(() => {
        router.push("/administor/community/category");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000] min-h-screen py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Edit Category</h2>
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
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
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
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white focus:ring focus:ring-[#FFEA70]"
            />

            {/* Preview old or new image */}
            <div className="mt-3">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="New Preview"
                  className="w-40 h-28 object-cover rounded border border-yellow-500"
                />
              ) : oldImage ? (
                <img
                  src={oldImage}
                  alt="Old Preview"
                  className="w-40 h-28 object-cover rounded border border-yellow-500"
                />
              ) : (
                <p className="text-gray-400 italic">No image uploaded</p>
              )}
            </div>
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
              {loading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
