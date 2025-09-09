"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrand } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create() {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandName || !description || !image) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("brand_name", brandName);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);
      await createBrand(formData);
      toast.success("Brand Created successfully!");
      setTimeout(() => {
        router.push("/administor/brand/listing");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create brand.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Create Brand</h1>
        <form onSubmit={handleSubmit} className="space-y-5 text-white">
          
          {/* Brand Name */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter brand description"
              rows="4"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Brand Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white cursor-pointer hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-[#FFEA70]"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-48 h-32 object-cover rounded-lg shadow border border-yellow-500"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/brand")}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFEA70] transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Brand"}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
