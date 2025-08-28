import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { registerUser } from "../../utils/fetchApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null }); // ✅ error clear on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({}); // clear previous errors

    try {
      const res = await registerUser(
        formData.name,
        formData.email,
        formData.phone_number,
        formData.password
      );

      toast.success(res.message || "Registration successful!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => router.push("/login"), 2000);

    } catch (err) {
      if (err.details && Object.keys(err.details).length > 0) {
        // Show each server validation error as toast
        Object.values(err.details).forEach((fieldErrors) => {
          fieldErrors.forEach((msg) => {
            toast.error(msg, { position: "top-right", autoClose: 3000 });
          });
        });

        // Optional: also set inline errors
        setErrors(err.details);
      } else {
        toast.error(err.message || "Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
     <section className="loginForm">
      <ToastContainer />

      <div className="relative min-h-screen flex items-center justify-center bg-[#FFC32B] overflow-hidden">
        {/* Card */}
        <div className="bg-black shadow-xl rounded-2xl w-full max-w-md p-10 z-10">
          <h2 className="text-xl font-semibold text-white mb-2 border-l-4 border-[#fff] pl-2">
            Sign Up To DOACH
          </h2>
          <p className="mb-7 text-left text-white text-[14px]">
            Already Have An Account?{" "}
            <Link
              href="/login"
              className="underline text-gray-300 hover:text-yellow-600 duration-300 font-medium"
            >
              Sign in?
            </Link>
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label
                htmlFor="FullName"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="FullName"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none text-sm bg-transparent text-white"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@demo.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none text-sm bg-transparent text-white"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none text-sm bg-transparent text-white"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-5">
              <label
                htmlFor="PhoneNumber"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                id="PhoneNumber"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none text-sm bg-transparent text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center gap-2 font-bold w-full text-[15px] 
              my-2 text-center text-black rounded-[600px] bg-[#FFC32B] hover:bg-[#000] py-2 
              hover:border hover:!text-white disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
