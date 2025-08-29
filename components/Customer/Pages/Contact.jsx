import React from "react";

export default function Contact() {
  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Contact Overview</h1>
          <p className="text-gray-500 text-sm mt-1">
            Have a question or need help? Fill out the form below and our team
            will get back to you shortly.
          </p>
        </div>

      {/* Contact Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Our Office</h3>
          <p className="text-gray-600">123 Main Street</p>
          <p className="text-gray-600">Sydney, Australia</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <p className="text-gray-600">support@example.com</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Phone</h3>
          <p className="text-gray-600">+61 123 456 789</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
          <p className="text-gray-600">Mon – Fri: 9 AM – 6 PM</p>
          <p className="text-gray-600">Sat – Sun: Closed</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Send us a Message</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border rounded-lg"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
