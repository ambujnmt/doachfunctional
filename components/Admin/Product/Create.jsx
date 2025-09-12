"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProduct, categoryList } from "../../../utils/fetchAdminApi"; // ✅ categoryList added
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Create() {
  const [form, setForm] = useState({
    product_name: "",
    description: "",
    short_description: "",
    price: "",
    discount_price: "",
    stock: "",
    status: "1",
    category_id: "", // ✅ added category field
    thumbnail: null,
    gallery: [],
  });

  const [categories, setCategories] = useState([]); // ✅ category list
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Fetch category list
  useEffect(() => {
    const fetchCategories = async () => {
      const list = await categoryList();
      setCategories(list);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail") {
      setForm({ ...form, thumbnail: files[0] });
      setThumbnailPreview(URL.createObjectURL(files[0]));
    } else if (name === "gallery") {
      const newFiles = Array.from(files);
      setForm({ ...form, gallery: [...form.gallery, ...newFiles] });
      setGalleryPreview((prev) => [
        ...prev,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveGallery = (index) => {
    const newGallery = [...form.gallery];
    const newPreview = [...galleryPreview];
    newGallery.splice(index, 1);
    newPreview.splice(index, 1);
    setForm({ ...form, gallery: newGallery });
    setGalleryPreview(newPreview);
  };

  const handleQuillChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.product_name || !form.price || !form.stock || !form.category_id) {
      toast.error("Please fill required fields.");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "gallery") {
        form.gallery.forEach((file) => formData.append("gallery[]", file));
      } else {
        formData.append(key, form[key]);
      }
    });

    try {
      setLoading(true);
      await createProduct(formData);
      toast.success("Product created successfully!");
      setTimeout(() => {
        router.push("/administor/product/listing");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000] py-6 min-h-screen">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Create Product</h1>
        <form onSubmit={handleSubmit} className="space-y-5 text-white">

          {/* Product Name */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* ✅ Category Dropdown */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Category</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white focus:ring focus:ring-[#FFEA70]"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
                required
              />
            </div>
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Discount Price</label>
              <input
                type="number"
                name="discount_price"
                value={form.discount_price}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
              />
            </div>
          </div>

          {/* Stock and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white placeholder-gray-400 focus:ring focus:ring-[#FFEA70]"
                required
              />
            </div>
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white focus:ring focus:ring-[#FFEA70]"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-white"
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Gallery */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Gallery Images</label>
            <input
              type="file"
              name="gallery"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full text-white"
            />
            {galleryPreview.length > 0 && (
              <div className="flex flex-wrap mt-2 gap-2">
                {galleryPreview.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Gallery ${index}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGallery(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Short Description</label>
            <ReactQuill
              value={form.short_description}
              onChange={(value) => handleQuillChange("short_description", value)}
              placeholder="Enter short description"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              className="bg-[#222222] text-white rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Description</label>
            <ReactQuill
              value={form.description}
              onChange={(value) => handleQuillChange("description", value)}
              placeholder="Enter product description"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              className="bg-[#222222] text-white rounded-lg"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/product/listing")}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFEA70] transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
