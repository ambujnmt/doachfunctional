"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { dynamicPageList, dynamicPageUpdate } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ReactQuill (SSR disabled)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function DynamicPageUpdate() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("page");
  const router = useRouter();

  const [pageData, setPageData] = useState({
    id: "",
    title: "",
    slug: "",
    type: "",
    content: "",
    url: "",
    status: "1",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch page details
  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const allPages = await dynamicPageList();
        const foundPage = Array.isArray(allPages)
          ? allPages.find((p) => p.slug === slug)
          : allPages?.data?.find?.((p) => p.slug === slug);

        if (foundPage) {
          setPageData({
            id: foundPage.id,
            title: foundPage.title || "",
            slug: foundPage.slug || "",
            type: foundPage.type || "normal",
            content: foundPage.content || "",
            url: foundPage.url || "",
            status: foundPage.status?.toString() || "1", // fix: reflect actual status
          });
        } else {
          toast.error("Page not found");
        }
      } catch (e) {
        toast.error("Failed to fetch page");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPage();
  }, [slug]);

  const handleChange = (e) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setPageData({ ...pageData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pageData.id) return toast.error("Invalid page data");
    if (!pageData.title.trim()) return toast.error("Title is required");

    try {
      setSaving(true);

      let updateData = { title: pageData.title, status: pageData.status };

      if (pageData.type === "home_slider") {
        if (!pageData.url.trim()) return toast.error("URL is required");
        updateData.url = pageData.url;
      } else {
        if (!pageData.content.trim()) return toast.error("Content is required");
        updateData.content = pageData.content;
      }

      await dynamicPageUpdate(pageData.id, updateData);
      toast.success("Page updated successfully!");
      setTimeout(() => router.push("/administor/pages/dynamic"), 1200);
    } catch {
      toast.error("Failed to update page");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#000] py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Edit Page</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={loading ? "" : pageData.title}
              onChange={handleChange}
              placeholder={loading ? "Loading..." : "Enter title"}
              className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          {/* Slug */}
          {pageData.slug && (
            <div>
              <label className="block text-[#FFC32B] font-medium mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={pageData.slug}
                readOnly
                className="w-full bg-[#333] border border-[#444] rounded-lg px-4 py-2 text-gray-300"
              />
            </div>
          )}

          {/* URL (only for slider) */}
          {pageData.type === "home_slider" && (
            <div>
              <label className="block text-[#FFC32B] font-medium mb-1">URL</label>
              <input
                type="text"
                name="url"
                value={loading ? "" : pageData.url}
                onChange={handleChange}
                placeholder="Enter slider URL"
                className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                required
                disabled={loading}
              />
            </div>
          )}

          {/* Content */}
          {pageData.type !== "home_slider" && (
            <div>
              <label className="block text-[#FFC32B] font-medium mb-1">Content</label>
              {loading ? (
                <div className="w-full h-40 rounded-lg bg-[#333] animate-pulse" />
              ) : (
                <ReactQuill
                  value={pageData.content}
                  onChange={handleContentChange}
                  placeholder="Enter page content"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  className="bg-[#222222] text-white rounded-lg border"
                />
              )}
            </div>
          )}

          {/* Status Dropdown */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">Status</label>
            <select
              name="status"
              value={pageData.status || "1"}
              onChange={handleChange}
              className="w-full bg-[#1E1E1E] border border-[#444] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
              disabled={loading}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

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
              disabled={saving || loading}
              className="px-4 py-2 bg-[#FFC32B] text-black font-semibold rounded-lg hover:bg-[#e6ad24] transition disabled:opacity-50"
            >
              {saving ? "Updating..." : loading ? "Loading..." : "Update Page"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
