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
  const slug = searchParams.get("page"); // ?page=terms
  const router = useRouter();

  const [pageData, setPageData] = useState({
    id: "",
    title: "",
    slug: "",
    content: "",
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
          : allPages?.data?.find?.((p) => p.slug === slug); // safety
        if (foundPage) {
          setPageData({
            id: foundPage.id,
            title: foundPage.title || "",
            slug: foundPage.slug || "",
            content: foundPage.content || "",
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
    if (!pageData?.id) {
      toast.error("Invalid page data");
      return;
    }
    if (!pageData.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!pageData.content?.trim()) {
      toast.error("Content is required");
      return;
    }

    try {
      setSaving(true);
      await dynamicPageUpdate(pageData.id, {
        title: pageData.title,
        content: pageData.content, // HTML from ReactQuill
      });
      toast.success("Page updated successfully!");
      setTimeout(() => {
        router.push("/administor/pages/dynamic");
      }, 1200);
    } catch (error) {
      toast.error("Failed to update page");
    } finally {
      setSaving(false);
    }
  };

  // ReactQuill toolbar config
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="bg-[#000] py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">📝 Edit Page</h1>

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

          {/* Slug (read-only) */}
          {pageData.slug ? (
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
          ) : null}

          {/* Content - ReactQuill */}
          <div>
            <label className="block text-[#FFC32B] font-medium mb-1">Content</label>
            {loading ? (
              <div className="w-full h-40 rounded-lg bg-[#333] animate-pulse" />
            ) : (
              <ReactQuill
                  value={pageData.content}
                  onChange={handleContentChange}
                  placeholder="Enter coach bio data"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image", "video"],
                      ["clean"]
                    ]
                  }}
                  className="bg-[#222222] text-white rounded-lg border"
                />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/pages/listing")}
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
