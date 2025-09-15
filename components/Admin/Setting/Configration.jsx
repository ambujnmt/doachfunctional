"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSettings, updateSettings } from "../../../utils/fetchAdminApi";

export default function Configration() {
  const [websiteName, setWebsiteName] = useState("");
  const [websiteEmail, setWebsiteEmail] = useState("");
  const [websitePhone, setWebsitePhone] = useState("");
  const [websiteTimer, setWebsiteTimer] = useState("");
  const [websiteAddress, setWebsiteAddress] = useState("");
  const [footerInfo, setFooterInfo] = useState("");
  const [webLogo, setWebLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sections as 0/1
  const [sections, setSections] = useState({
    timer: 1,
    brand: 1,
    event: 1,
    story: 0,
    coach: 1,
    product: 1,
    subscription: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSettings();
        if (res.status && res.data) {
          setWebsiteName(res.data.website_name || "");
          setWebsiteEmail(res.data.website_email || "");
          setWebsitePhone(res.data.website_phone || "");
          setWebsiteTimer(res.data.website_timer || "");
          setWebsiteAddress(res.data.website_address || "");
          setFooterInfo(res.data.footer_info || "");
          if (res.data.web_logo) setPreviewLogo(res.data.web_logo);

          // Sections ko 0/1 me set karo
          setSections((prev) => ({
            ...prev,
            brand: res.data.timer != null ? Number(res.data.timer) : prev.timer,
            brand: res.data.brand != null ? Number(res.data.brand) : prev.brand,
            event: res.data.event != null ? Number(res.data.event) : prev.event,
            story: res.data.story != null ? Number(res.data.story) : prev.story,
            coach: res.data.coach != null ? Number(res.data.coach) : prev.coach,
            product: res.data.product != null ? Number(res.data.product) : prev.product,
            subscription:
              res.data.subscription != null ? Number(res.data.subscription) : prev.subscription,
          }));
        }
      } catch (err) {
        toast.error("Failed to fetch settings.");
      }
    };
    fetchData();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setWebLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSectionToggle = (key) => {
    setSections((prev) => ({
      ...prev,
      [key]: prev[key] === 1 ? 0 : 1,
    }));
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
    formData.append("website_timer", websiteTimer);
    formData.append("website_address", websiteAddress);
    formData.append("footer_info", footerInfo);

    // Sections 0/1 save
    Object.keys(sections).forEach((key) => {
      formData.append(key, sections[key]);
    });

    if (webLogo) formData.append("web_logo", webLogo);

    try {
      setLoading(true);
      await updateSettings(formData);
      toast.success("Settings updated successfully!");
      // setTimeout(() => router.push("/administor/dashboard"), 1500);
    } catch (error) {
      toast.error(error.message || "Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black py-6">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Website Settings</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="md:col-span-8 space-y-5">
            {/* Website Name */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Website Name</label>
              <input
                type="text"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                placeholder="Enter website name"
                className="w-full border border-yellow-500 bg-black text-white rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Website Email */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Website Email</label>
              <input
                type="email"
                value={websiteEmail}
                onChange={(e) => setWebsiteEmail(e.target.value)}
                placeholder="Enter website email"
                className="w-full border border-yellow-500 bg-black text-white rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Website Phone */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Website Phone</label>
              <input
                type="text"
                value={websitePhone}
                onChange={(e) => setWebsitePhone(e.target.value)}
                placeholder="Enter website phone"
                className="w-full border border-yellow-500 bg-black text-white rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Website Address */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Website Address</label>
              <input
                type="text"
                value={websiteAddress}
                onChange={(e) => setWebsiteAddress(e.target.value)}
                placeholder="Enter website address"
                className="w-full border border-yellow-500 bg-black text-white rounded-lg px-4 py-2"
              />
            </div>

            {/* Web Logo */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Web Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full border border-yellow-500 bg-black text-white rounded-lg px-4 py-2"
              />
              {previewLogo && (
                <img
                  src={previewLogo}
                  alt="Logo Preview"
                  className="mt-2 h-20 w-auto object-contain border border-yellow-500"
                />
              )}
            </div>

            {/* Website Tomer date */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Timer Date</label>
              <input
                type="date"
                value={websiteTimer}
                onChange={(e) => setWebsiteTimer(e.target.value)}
                placeholder="Enter website timer"
                className="w-full border border-yellow-500 bg-black text-white rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Footer Info */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Footer Info</label>
              <textarea
                value={footerInfo}
                onChange={(e) => setFooterInfo(e.target.value)}
                placeholder="Enter footer info"
                className="w-full border border-yellow-500 bg-black text-white rounded-lg px-4 py-2"
                rows={3}
              />
            </div>
          </div>

          {/* Right Side: Section Control */}
          <div className="md:col-span-4 bg-[#222] border border-yellow-500 rounded-xl p-4">
            <h2 className="text-xl text-yellow-500 font-semibold mb-4">Section Control</h2>
            <div className="space-y-3">
              {Object.keys(sections).map((key) => (
                <div
                  key={key}
                  className="flex justify-between items-center text-white border-b border-gray-700 pb-2"
                >
                  <span className="capitalize">{key.replace("_", " ")}</span>
                  <button
                    type="button"
                    onClick={() => handleSectionToggle(key)}
                    className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                      sections[key] === 1 ? "bg-yellow-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-black w-5 h-5 rounded-full shadow-md transform transition ${
                        sections[key] === 1 ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="md:col-span-12 flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={() => router.push("/administor/dashboard")}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
