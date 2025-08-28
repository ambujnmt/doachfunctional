"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "../../../utils/fetchAdminApi"; // API call helper

// 🔹 Your backend base URL
const baseUrl = "http://localhost:8000/"; // change as per your backend

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔹 Load admin data from localStorage on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin);
      setName(adminData.name || "");
      setEmail(adminData.email || "");
      setPhone(adminData.phone || "");
      setPreviewPic(adminData.profile_pic || null);
    } else {
      toast.error("No admin data found. Please login again.");
      router.push("/login");
    }
  }, [router]);

  // 🔹 Image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🔹 Update profile submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (password) formData.append("password", password);
    if (profilePic) formData.append("profile_pic", profilePic);

    try {
      setLoading(true);
      const res = await updateProfile(formData);

      if (res.status) {
        // ✅ Update localStorage with new admin data
        localStorage.setItem("admin", JSON.stringify(res.data));
        if (res.data.access_token) {
          localStorage.setItem("adminAuthToken", res.data.access_token);
        }
        toast.success("Profile updated successfully!");
      } else {
        toast.error(res.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Profile Image */}
        <div className="flex items-center space-x-4">
          <div className="w-28 h-28 rounded-full border-2 border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100">
            {previewPic ? (
              <img
                src={previewPic} // 👈 अब यहां कोई extra check की जरूरत नहीं
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password (optional)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
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
            {loading ? "Saving..." : "Update Profile"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
