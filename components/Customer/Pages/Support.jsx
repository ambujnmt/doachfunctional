import React, { useState } from "react";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support Request Sent:", formData);
    alert("✅ Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-black py-10 text-gray-200">
      <div className="bg-gray-800 rounded-xl shadow-md p-8 ">
        {/* Title + Subtitle */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-yellow-500">Support</h1>
          <p className="text-gray-400 text-sm mt-1">
            Have a question or need help? Fill out the form below and our team
            will get back to you shortly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-yellow-400">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 p-3 border border-gray-700 rounded-lg 
                         bg-black text-gray-200 placeholder-gray-500 
                         focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-yellow-400">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-700 rounded-lg 
                         bg-black text-gray-200 placeholder-gray-500 
                         focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-yellow-400">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full mt-1 p-3 border border-gray-700 rounded-lg 
                         bg-black text-gray-200 placeholder-gray-500 
                         focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-yellow-400">
              Message
            </label>
            <textarea
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full mt-1 p-3 border border-gray-700 rounded-lg 
                         bg-black text-gray-200 placeholder-gray-500 
                         focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-3 rounded-lg 
                       font-semibold hover:bg-yellow-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
