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
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Page</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={loading ? "" : pageData.title}
            onChange={handleChange}
            placeholder={loading ? "Loading..." : "Enter title"}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
            disabled={loading}
          />
        </div>

        {/* Slug (read-only, optional) */}
        {pageData.slug ? (
          <div>
            <label className="block text-gray-700 font-medium mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              value={pageData.slug}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        ) : null}

        {/* Content - ReactQuill */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          {loading ? (
            <div className="w-full h-40 rounded-lg bg-gray-100 animate-pulse" />
          ) : (
            <ReactQuill
              theme="snow"
              value={pageData.content}
              onChange={handleContentChange}
              modules={quillModules}
              className="bg-white text-black rounded-lg"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.push("/administor/pages/listing")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving ? "Updating..." : loading ? "Loading..." : "Update Page"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
