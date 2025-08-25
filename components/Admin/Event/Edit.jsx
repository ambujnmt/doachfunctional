"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getEvent, updateEvent } from "../../../utils/fetchAdminApi"; // helper functions
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id"); // get event id from query
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

    // Fetch event data
    useEffect(() => {
    if (eventId) {
        getEvent(eventId)
        .then((res) => {
            if (res.status) {
            setEventName(res.data.event_name || "");
            setEventDate(res.data.event_date ? res.data.event_date.split(' ')[0] : "");
            setDescription(res.data.description || "");
            setPreview(res.data.event_image || null); // full URL
            } else {
            toast.error("Event not found");
            }
        })
        .catch(() => toast.error("Failed to fetch event"));
    }
    }, [eventId]);

    // Image preview on file select
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    }
};

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName || !description || !eventDate) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("event_name", eventName);
    formData.append("event_date", eventDate);
    formData.append("description", description);
    if (image) formData.append("image", image); // only append if new image selected

    try {
      setLoading(true);
      await updateEvent(formData, eventId); // helper function
      toast.success("Event updated successfully!");
      setTimeout(() => {
        router.push("/administor/event/listing");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Event</h1>

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

        {/* Event Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
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

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Event Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
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
            onClick={() => router.push("/administrator/event/listing")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
