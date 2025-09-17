"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getProductById,
  updateProduct,
  categoryList,
  deleteGalleryImage,
  getFormList,
} from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Edit() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const router = useRouter();

  const [form, setForm] = useState({
    product_name: "",
    description: "",
    short_description: "",
    price: "",
    discount_price: "",
    stock: "",
    status: "1",
    category_id: "",
    thumbnail: null,
    gallery: [],
    removed_images: [],
    form_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [formList, setFormList] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]); // {id?, url, file?}
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const list = await categoryList();
      setCategories(list);
    };
    fetchCategories();
  }, []);

  // Fetch forms
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const forms = await getFormList();
        setFormList(forms);
      } catch (err) {
        console.error(err);
      }
    };
    fetchForms();
  }, []);

  // Fetch product details
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setFetching(true);
      try {
        const res = await getProductById(id);
        if (res?.status) {
          const product = res.data;
          setForm((prev) => ({
            ...prev,
            product_name: product.product_name || "",
            description: product.description || "",
            short_description: product.short_description || "",
            price: product.price || "",
            discount_price: product.discount_price || "",
            stock: product.stock || "",
            status: String(product.status || "1"),
            category_id: product.category_id || "",
            form_id: product.form_id || "",
          }));

          const thumbnail = product.images.find((img) => img.type === "thumbnail");
          const gallery = product.images.filter((img) => img.type === "gallery");

          setThumbnailPreview(thumbnail ? thumbnail.image_url : null);

          // Existing gallery with {id, url}
          const existing = gallery.map((img) => ({ id: img.id, url: img.image_url }));
          setGalleryPreview(existing);
        }
      } catch (error) {
        toast.error("Failed to fetch product.");
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail") {
      setForm({ ...form, thumbnail: files[0] });
      setThumbnailPreview(URL.createObjectURL(files[0]));
    } else if (name === "gallery") {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => ({ file, url: URL.createObjectURL(file) }));
      setForm({ ...form, gallery: [...form.gallery, ...newFiles] });
      setGalleryPreview((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove existing gallery image
  const handleRemoveExistingGallery = async (idToRemove) => {
    const success = await deleteGalleryImage(idToRemove);
    if (success) {
      setGalleryPreview((prev) => prev.filter((img) => img.id !== idToRemove));
      setForm((prev) => ({ ...prev, removed_images: [...prev.removed_images, idToRemove] }));
      toast.success("Image removed successfully");
    } else {
      toast.error("Failed to remove image");
    }
  };

  // Remove new gallery image before upload
  const handleRemoveNewGallery = (index) => {
    const newGallery = [...form.gallery];
    newGallery.splice(index, 1);
    setForm({ ...form, gallery: newGallery });

    setGalleryPreview((prev) => {
      const updated = [...prev];
      updated.splice(prev.findIndex((p) => p.file && prev.indexOf(p) === index), 1);
      return updated;
    });
  };

  // ReactQuill change
  const handleQuillChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.product_name || !form.price || !form.stock || !form.category_id) {
      toast.error("Please fill required fields.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "gallery") {
        form.gallery.forEach((file) => formDataToSend.append("gallery[]", file));
      } else if (key === "removed_images") {
        form.removed_images.forEach((id) => formDataToSend.append("removed_images[]", id));
      } else if (form[key] !== null) {
        formDataToSend.append(key, form[key]);
      }
    });

    try {
      setLoading(true);
      await updateProduct(formDataToSend, id);
      toast.success("Product updated successfully!");
      setTimeout(() => {
        router.push("/administor/product/listing");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      galleryPreview.forEach((item) => item.file && URL.revokeObjectURL(item.url));
      if (thumbnailPreview && form.thumbnail) URL.revokeObjectURL(thumbnailPreview);
    };
  }, [galleryPreview, thumbnailPreview, form.thumbnail]);

  if (!id || fetching) {
    return <p className="text-white text-center mt-10">Loading product...</p>;
  }

  return (
    <div className="bg-[#000] py-6 min-h-screen">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Edit Product</h2>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
          >
            ← Back
          </button>
        </div>
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
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white"
              required
            />
          </div>

          {/* Category + Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-yellow-500 font-medium mb-1">Select Form (Optional)</label>
              <select
                name="form_id"
                value={form.form_id}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white focus:ring focus:ring-[#FFEA70]"
              >
                <option value="">Select Form</option>
                {formList.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
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
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white"
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
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white"
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
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white"
                required
              />
            </div>
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-white"
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

            <div className="flex flex-wrap mt-2 gap-2">
              {galleryPreview.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.url}
                    alt="Gallery"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      img.file ? handleRemoveNewGallery(index) : handleRemoveExistingGallery(img.id)
                    }
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Short Description</label>
            <ReactQuill
              value={form.short_description}
              onChange={(value) => handleQuillChange("short_description", value)}
              placeholder="Enter short description"
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
              className="bg-[#222222] text-white rounded-lg"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/product/listing")}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFEA70] disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
