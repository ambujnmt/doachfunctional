"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "../../../utils/fetchAdminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName || !description || !eventDate || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("event_name", eventName);
    formData.append("event_date", eventDate);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);
      await createEvent(formData); // ✅ helper use kiya
      toast.success("Event Created successful!");
      setTimeout(() => {
        router.push("/administor/event/listing");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Event Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            placeholder="Enter event date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-48 h-32 object-cover rounded-lg shadow"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.push("/administor/event")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
      {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
