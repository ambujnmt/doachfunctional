import React, { useState } from "react";
import Container from "@mui/material/Container";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";
import { saveSupportMessage } from "../../utils/fetchApi"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  // handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      const res = await saveSupportMessage(formData);
      toast.success("Support message send  successfully!");
      setFormData({ name: "", email: "", phone: "", address: "", message: "" }); // reset form
    } catch (error) {
      setResponseMessage({ type: "error", text: error.message || "Failed to send message" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-gradient min-h-screen flex flex-col">
      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Contact Section */}
      <section id="nftc" className="py-24 flex-grow">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white">Get in touch</h3>
            <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
              Have questions or feedback? Fill out the form below and we’ll
              get back to you as soon as possible.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                ></textarea>
              </div>

              {/* Feedback */}
              {responseMessage && (
                <p
                  className={`text-center font-medium ${
                    responseMessage.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {responseMessage.text}
                </p>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FFC32B] hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition-colors disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </Container>
      </section>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
}
