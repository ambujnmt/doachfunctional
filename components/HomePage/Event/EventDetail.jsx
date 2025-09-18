"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import HomeFooter from "../../HomePage/HomeFooter";
import HamburgerMenu from "../../HomePage/HamburgerMenu";
import {
  eventHomePage,
  fetchEventFeedback,
  reactToEvent,
  addCommentToEvent,
  submitDynamicForm
} from "../../../utils/fetchApi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventDetail({ slug, token }) {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // -------------------- Load Event & Feedback --------------------
  useEffect(() => {
    const loadEventAndFeedback = async () => {
      const events = await eventHomePage();
      const event = events.find((e) => e.slug === slug);
      if (!event) return;

      setCurrentEvent(event);
      setRelatedEvents(events.filter((e) => e.slug !== slug).slice(0, 7));

      const feedback = await fetchEventFeedback(event.id, token);
      setLikes(feedback.likes || 0);
      setDislikes(feedback.dislikes || 0);
      setComments(feedback.comments || []);

      // Initialize form data dynamically
      if (event.form?.fields) {
        const initialData = {};
        event.form.fields.forEach((field) => {
          initialData[field.id] = field.type === "checkbox" ? [] : "";
        });
        setFormData(initialData);
      }
    };

    loadEventAndFeedback();
  }, [slug, token]);

  // -------------------- Handlers --------------------
  const handleReact = async (type) => {
    if (!userId) return toast.error("You must be logged in to react!");
    const res = await reactToEvent(currentEvent.id, type, userId, token);
    setLikes(res.likes);
    setDislikes(res.dislikes);
  };

  const handleAddComment = async () => {
    if (!userId) return toast.error("You must be logged in to comment!");
    if (!commentText.trim()) return;

    const newComment = await addCommentToEvent(currentEvent.id, commentText, userId, token);
    if (newComment) setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  const handleFormChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleCheckboxChange = (fieldId, optionValue) => {
    setFormData((prev) => {
      const arr = prev[fieldId] || [];
      return arr.includes(optionValue)
        ? { ...prev, [fieldId]: arr.filter((v) => v !== optionValue) }
        : { ...prev, [fieldId]: [...arr, optionValue] };
    });
  };

  const handleSubmitForm = async (e) => {
  e.preventDefault();
  if (!userId) return toast.error("You must be logged in to comment!");
  setSubmitting(true);

  // Payload sirf form_data
  const payload = {
    section: "event", // section name
    section_id: currentEvent.id, // current event ID
    user_id: userId, // user_id alag bhej rahe
    form_data: formData, // sirf form fields
  };

  const result = await submitDynamicForm(payload, token);

  if (result.success) {
    toast.success(result.message || "Form Data saved successfully!");
    const clearedData = {};
    currentEvent.form.fields.forEach((f) => {
      clearedData[f.id] = f.type === "checkbox" ? [] : "";
    });
    setFormData(clearedData);
  } else {
    toast.error(result.message || "Failed to submit!");
  }

  setSubmitting(false);
};

  if (!currentEvent) return <p className="text-center mt-10 text-white">Loading event...</p>;

  // -------------------- JSX --------------------
  return (
    <div className="custom-gradient min-h-screen">
      <Container maxWidth="lg" className="py-10">
        <HamburgerMenu />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Video & Details */}
          <div className="flex-3 lg:flex-[3]">
            {currentEvent.event_video ? (
              <video
                src={currentEvent.event_video}
                autoPlay
                loop
                controls
                className="w-full rounded-xl mb-4"
              />
            ) : (
              <img
                src={currentEvent.event_image || "https://via.placeholder.com/800x400"}
                alt={currentEvent.event_name}
                className="w-full rounded-xl mb-4"
              />
            )}

            <h2 className="text-2xl font-bold mb-2 text-white">{currentEvent.event_name}</h2>
            <p className="text-gray-300 mb-3">
              {currentEvent.event_date || currentEvent.created_at?.split("T")[0]}
            </p>

            {/* Reactions & Share */}
            <div className="mb-4 flex flex-wrap gap-3">
              <button onClick={() => handleReact("like")} className="bg-yellow-500 text-black px-3 py-1 rounded">
                👍 {likes}
              </button>
              <button onClick={() => handleReact("dislike")} className="bg-red-500 text-white px-3 py-1 rounded">
                👎 {dislikes}
              </button>
              <button
                onClick={() => {
                  const url = window.location.href;
                  if (navigator.share)
                    navigator.share({ title: currentEvent.event_name, url });
                  else {
                    navigator.clipboard.writeText(url);
                    alert("Link copied!");
                  }
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                🔗 Share
              </button>
              <a
                href={currentEvent.event_video || currentEvent.event_image}
                download
                className="bg-green-600 text-white px-3 py-1 rounded no-underline"
              >
                ⬇ Download
              </a>
            </div>

            <p className="text-gray-200 mb-6">{currentEvent.description?.replace(/<[^>]+>/g, "")}</p>

            {/* Comments */}
            <div className="mb-10">
              <h3 className="text-white font-semibold mb-2">Comments ({comments.length})</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 p-2 rounded"
                />
                <button onClick={handleAddComment} className="bg-blue-600 text-white px-4 rounded">
                  Comment
                </button>
              </div>
              <ul className="px-0">
                {comments.map((c, i) => (
                  <li key={i} className="border-b border-gray-700 py-2 text-gray-200">
                    <strong>{c.user?.name || "User"}:</strong> {c.comment}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Related Events & Dynamic Form */}
          <div className="lg:w-1/3 pr-2">
            <h3 className="text-white font-semibold mb-3">Related Events</h3>
            <ul className="space-y-3 px-0">
              {relatedEvents.slice(0, 4).map((event) => (
                <li key={event.id} className="flex gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg">
                  <Link href={`/event/${event.slug}`} className="flex gap-3 w-full no-underline">
                    <img
                      src={event.event_image || "https://via.placeholder.com/200x120"}
                      alt={event.event_name}
                      className="w-36 h-20 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <h5 className="text-white font-medium line-clamp-2 no-underline">{event.event_name}</h5>
                      <p className="text-gray-400 text-xs no-underline">{event.event_date || event.created_at?.split("T")[0]}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Dynamic Form */}
            {currentEvent.form && (
              <div className="mt-8 bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-4">{currentEvent.form.name} Form</h3>
                <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
                  {currentEvent.form.fields.map((field) => (
                    <div key={field.id} className="flex flex-col gap-1">
                      <label className="text-gray-200">{field.label}</label>

                      {field.type === "text" && (
                        <input
                          type="text"
                          value={formData[field.id] || ""}
                          onChange={(e) => handleFormChange(field.id, e.target.value)}
                          className="p-2 rounded bg-gray-800 text-white"
                          required
                        />
                      )}

                      {field.type === "textarea" && (
                        <textarea
                          value={formData[field.id] || ""}
                          onChange={(e) => handleFormChange(field.id, e.target.value)}
                          className="p-2 rounded bg-gray-800 text-white"
                          required
                        />
                      )}

                      {field.type === "checkbox" && (
                        <div className="flex flex-wrap gap-2">
                          {field.options.map((opt) => (
                            <label key={opt.id} className="flex items-center gap-1 text-gray-200">
                              <input
                                type="checkbox"
                                checked={formData[field.id]?.includes(opt.option_value)}
                                onChange={() => handleCheckboxChange(field.id, opt.option_value)}
                                className="accent-yellow-500"
                                required
                              />
                              {opt.option_value}
                            </label>
                          ))}
                        </div>
                      )}

                      {field.type === "radio" && (
                        <div className="flex flex-wrap gap-2">
                          {field.options.map((opt) => (
                            <label key={opt.id} className="flex items-center gap-1 text-gray-200">
                              <input
                                type="radio"
                                name={`radio-${field.id}`}
                                checked={formData[field.id] === opt.option_value}
                                onChange={() => handleFormChange(field.id, opt.option_value)}
                                className="accent-yellow-500"
                                required
                              />
                              {opt.option_value}
                            </label>
                          ))}
                        </div>
                      )}

                      {field.type === "select" && (
                        <select
                          value={formData[field.id] || ""}
                          onChange={(e) => handleFormChange(field.id, e.target.value)}
                          className="p-2 rounded bg-gray-800 text-white"
                          required
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((opt) => (
                            <option key={opt.id} value={opt.option_value}>
                              {opt.option_value}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-yellow-500 text-black px-4 py-2 rounded mt-2 self-start"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <HomeFooter />
        <ToastContainer />
      </Container>
    </div>
  );
}
