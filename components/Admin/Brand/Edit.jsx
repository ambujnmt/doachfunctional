"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getBrandById, updateBrand } from "../../../utils/fetchAdminApi"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditBrand() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("id"); // ✅ from query string
  const router = useRouter();

  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch brand data
  useEffect(() => {
    if (brandId) {
      getBrandById(brandId)
        .then((res) => {
          if (res.status) {
            setBrandName(res.data.brand_name || "");
            setDescription(res.data.description || "");
            setPreview(res.data.brand_image || null); // API image url
          } else {
            toast.error("Brand not found");
          }
        })
        .catch(() => toast.error("Failed to fetch brand"));
    }
  }, [brandId]);

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

    if (!brandName || !description) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("brand_name", brandName);
    formData.append("description", description);
    if (image) formData.append("image", image); // only if new image selected

    try {
      setLoading(true);
      await updateBrand(formData, brandId);
      toast.success("Brand updated successfully!");
      setTimeout(() => {
        router.push("/administor/brand/listing");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update brand.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Brand</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Brand Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Brand Name</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
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
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Brand Image</label>
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
            onClick={() => router.push("/administor/brand/listing")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Brand"}
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
