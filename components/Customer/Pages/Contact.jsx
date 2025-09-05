import React from "react";

export default function Contact() {
  return (
    <div className="py-6 bg-black min-h-screen text-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-500">Contact Overview</h1>
        <p className="text-gray-400 text-sm mt-1">
          Have a question or need help? Fill out the form below and our team
          will get back to you shortly.
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Our Office</h3>
          <p className="text-gray-300">123 Main Street</p>
          <p className="text-gray-300">Sydney, Australia</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Email</h3>
          <p className="text-gray-300">support@example.com</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Phone</h3>
          <p className="text-gray-300">+61 123 456 789</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Business Hours</h3>
          <p className="text-gray-300">Mon – Fri: 9 AM – 6 PM</p>
          <p className="text-gray-300">Sat – Sun: Closed</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Send us a Message</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border border-gray-700 rounded-lg bg-black text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
