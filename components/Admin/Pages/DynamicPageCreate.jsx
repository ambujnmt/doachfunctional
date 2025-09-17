"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dynamicPageCreate } from "../../../utils/fetchAdminApi";

// ReactQuill (SSR disabled)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function DynamicPageCreate() {
  const router = useRouter();

  const [pageData, setPageData] = useState({
    title: "",
    slug: "",
    content: "",
    url: "",
    type: "home_page", // default
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setPageData({ ...pageData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pageData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (pageData.type === "home_slider" && !pageData.url.trim()) {
      toast.error("URL is required for Home Slider");
      return;
    }

    if (pageData.type !== "home_slider" && !pageData.slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    if (pageData.type !== "home_slider" && !pageData.content.trim()) {
      toast.error("Content is required");
      return;
    }

    try {
      setSaving(true);
      await dynamicPageCreate({
        title: pageData.title,
        slug: pageData.type === "home_slider" ? null : pageData.slug,
        ...(pageData.type === "home_slider"
          ? { url: pageData.url }
          : { content: pageData.content }),
        type: pageData.type,
      });

      toast.success("Page created successfully!");
      setTimeout(() => {
        router.push("/administor/pages/dynamic");
      }, 1200);
    } catch (error) {
      toast.error("Failed to create page");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#000] py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Create New Page</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Selector */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">Page Type</label>
            <select
              name="type"
              value={pageData.type}
              onChange={handleChange}
              className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
            >
              <option value="home_page">Home Page</option>
              <option value="home_slider">Home Slider</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={pageData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
              required
            />
          </div>

          {/* Slug (only if not home_slider) */}
          {pageData.type !== "home_slider" && (
            <div>
              <label className="block text-[#FFC32B] font-medium mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={pageData.slug}
                onChange={handleChange}
                placeholder="terms-and-conditions"
                className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                required
              />
            </div>
          )}

          {/* URL (only if home_slider) */}
          {pageData.type === "home_slider" && (
            <div>
              <label className="block text-[#FFC32B] font-medium mb-1">URL</label>
              <input
                type="url"
                name="url"
                value={pageData.url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                required
              />
            </div>
          )}

          {/* Content (not for home_slider) */}
          {pageData.type !== "home_slider" && (
            <div>
              <label className="block text-[#FFC32B] font-medium mb-1">Content</label>
              <ReactQuill
                value={pageData.content}
                onChange={handleContentChange}
                placeholder="Enter page content"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                }}
                className="bg-[#222222] text-white rounded-lg border"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/pages/dynamic")}
              className="px-4 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-[#FFC32B] text-black font-semibold rounded-lg hover:bg-[#e6ad24] transition disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create Page"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
