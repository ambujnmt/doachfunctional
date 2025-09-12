"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getEvent, updateEvent } from "../../../utils/fetchAdminApi"; // helper functions
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Edit() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch event data
  useEffect(() => {
    if (eventId) {
      getEvent(eventId)
        .then((res) => {
          if (res.status) {
            setEventName(res.data.event_name || "");
            setEventDate(res.data.event_date ? res.data.event_date.split(" ")[0] : "");
            setDescription(res.data.description || "");
            setCategory(res.data.content_type || "");
            setPreview(res.data.event_image || null);
            setVideoPreview(res.data.event_video || null);
          } else {
            toast.error("Event not found");
          }
        })
        .catch(() => toast.error("Failed to fetch event"));
    }
  }, [eventId]);

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Video preview
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Quill modules
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !description || !eventDate || !category) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("event_name", eventName);
    formData.append("event_date", eventDate);
    formData.append("description", description);
    formData.append("content_type", category);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      setLoading(true);
      await updateEvent(formData, eventId);
      toast.success("Event updated successfully!");
      setTimeout(() => router.push("/administor/event/listing"), 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000] py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-[#FFF] mb-4">Edit Event</h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-[#FFFFFF]">

          {/* Event Name */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Event Name *</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] placeholder-[#CCCCCC] focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Event Date *</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-[#FFEA70]"
              required
            />
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Content Type *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-[#FFD700] rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-[#FFEA70]"
              required
            >
              <option value="">Select Content Type</option>
              <option value="Video">Video Content</option>
              <option value="Articles">Articles</option>
              <option value="News">News</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-yellow-500 font-medium mb-1">Description *</label>
            <div className="border border-[#FFD700] rounded-lg">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Enter description or article content"
                modules={quillModules}
                className="bg-[#222222] text-white rounded-lg"
                style={{ color: "#FFFFFF" }}
              />
            </div>
          </div>

          {/* Image + Video */}
          <div className="grid grid-cols-2 gap-4">
            {/* Image */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Event Image *</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {preview && (
                <div className="mt-3 p-2 border border-white rounded-lg bg-[#1F1F1F] w-full h-36 flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Video */}
            <div>
              <label className="block text-yellow-500 font-medium mb-1">Event Video (Optional)</label>
              <input type="file" accept="video/*" onChange={handleVideoChange} />
              {videoPreview && (
                <div className="mt-3 p-2 border border-white rounded-lg bg-[#1F1F1F] w-full h-36 flex items-center justify-center">
                  <video
                    src={videoPreview}
                    controls
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/administor/event/listing")}
              className="px-4 py-2 bg-[#444] text-[#FFFFFF] rounded-lg hover:bg-[#555] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFD700] text-[#000000] rounded-lg hover:bg-[#FFEA70] transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Event"}
            </button>
          </div>

        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
