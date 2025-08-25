import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { loginAdmin } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Auto redirect if token exists
  useEffect(() => {
    const token = localStorage.getItem("adminAuthToken");
    if (token) {
      router.push("/administor/dashboard");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginAdmin(formData);

      // Save token and user info
      localStorage.setItem("adminAuthToken", res.data.access_token);
      localStorage.setItem("admin", JSON.stringify(res.data));
      localStorage.setItem("adminId", res.data.id);

      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/administor/dashboard");
      }, 1000);
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="loginForm">
      <div className="relative min-h-screen flex items-center justify-center bg-[#FFC32B] overflow-hidden">
        {/* Login Card */}
        <div className="bg-black shadow-xl rounded-2xl w-full max-w-md p-10 z-10">
          <div className="flex flex-col items-start justify-center">
            <Link
              href="/home"
              className="text-white mb-3 no-underline flex items-center hover:text-yellow-600 text-sm"
            >
              <FaArrowLeftLong /> &nbsp; Back
            </Link>

            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-[#fff] pl-2">
             Administor Login
            </h2>

            <form className="w-full" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="w-full mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-100 mb-2"
                >
                  Username or email address
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@demo.com"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-transparent text-white"
                />
              </div>

              {/* Password */}
              <div className="mb-10">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-100 mb-2"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-transparent text-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center gap-2 font-bold w-full text-[15px] my-2 text-center text-black rounded-[600px] bg-[#FFC32B] hover:bg-[#000] py-2 hover:border border-yellow-600 duration-300 hover:!text-white disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
