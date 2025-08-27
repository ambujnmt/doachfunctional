"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Configration() {
  const [websiteName, setWebsiteName] = useState("");
  const [websiteEmail, setWebsiteEmail] = useState("");
  const [websitePhone, setWebsitePhone] = useState("");
  const [webLogo, setWebLogo] = useState(null);
  const [footerInfo, setFooterInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const [previewLogo, setPreviewLogo] = useState(null);

  const router = useRouter();

  // image preview
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setWebLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewLogo(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewLogo(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!websiteName || !websiteEmail || !websitePhone) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("website_name", websiteName);
    formData.append("website_email", websiteEmail);
    formData.append("website_phone", websitePhone);
    formData.append("footer_info", footerInfo);
    if (webLogo) formData.append("web_logo", webLogo);

    try {
      setLoading(true);
      // replace this with your API helper
      // await updateSettings(formData);
      toast.success("Settings updated successfully!");
      setTimeout(() => router.push("/administor/dashboard"), 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Website Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Website Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Website Name</label>
          <input
            type="text"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            placeholder="Enter website name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Website Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Website Email</label>
          <input
            type="email"
            value={websiteEmail}
            onChange={(e) => setWebsiteEmail(e.target.value)}
            placeholder="Enter website email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Website Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Website Phone</label>
          <input
            type="text"
            value={websitePhone}
            onChange={(e) => setWebsitePhone(e.target.value)}
            placeholder="Enter website phone"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Web Logo */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Web Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
          />
          {previewLogo && (
            <img
              src={previewLogo}
              alt="Logo Preview"
              className="mt-2 h-20 w-auto object-contain"
            />
          )}
        </div>

        {/* Footer Info */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Footer Info</label>
          <textarea
            value={footerInfo}
            onChange={(e) => setFooterInfo(e.target.value)}
            placeholder="Enter footer info"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.push("/administor/dashboard")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
