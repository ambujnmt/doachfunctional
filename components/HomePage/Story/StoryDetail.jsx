"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import HomeFooter from "../../HomePage/HomeFooter";
import HamburgerMenu from "../../HomePage/HamburgerMenu";
import {
  storiesHomePage,
  fetchStoryFeedback,
  reactToStory,
  addCommentToStory,
  submitDynamicForm,
} from "../../../utils/fetchApi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StoryDetail({ slug, token }) {
  const [currentStory, setCurrentStory] = useState(null);
  const [relatedStories, setRelatedStories] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // -------------------- Load Story & Feedback --------------------
  useEffect(() => {
    const loadStoryAndFeedback = async () => {
      const stories = await storiesHomePage();
      const story = stories.find((s) => s.slug === slug);
      if (!story) return;

      setCurrentStory(story);
      setRelatedStories(stories.filter((s) => s.slug !== slug).slice(0, 4));

      const feedback = await fetchStoryFeedback(story.id, token);
      setLikes(feedback.likes || 0);
      setDislikes(feedback.dislikes || 0);
      setComments(feedback.comments || []);

      // Initialize dynamic form data
      if (story.form?.fields) {
        const initialData = {};
        story.form.fields.forEach((field) => {
          initialData[field.id] = field.type === "checkbox" ? [] : "";
        });
        setFormData(initialData);
      }
    };

    loadStoryAndFeedback();
  }, [slug, token]);

  // -------------------- Handlers --------------------
  const handleReact = async (type) => {
    if (!userId) return toast.error("You must be logged in to react!");
    const res = await reactToStory(currentStory.id, type, userId, token);
    setLikes(res.likes);
    setDislikes(res.dislikes);
  };

  const handleAddComment = async () => {
    if (!userId) return toast.error("You must be logged in to comment!");
    if (!commentText.trim()) return;

    const newComment = await addCommentToStory(currentStory.id, commentText, userId, token);
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
    if (!userId) return toast.error("You must be logged in to submit the form!");
    setSubmitting(true);

    const payload = {
      section: "story",
      section_id: currentStory.id,
      user_id: userId,
      form_data: formData,
    };

    const result = await submitDynamicForm(payload, token);

    if (result.success) {
      toast.success(result.message || "Form submitted successfully!");
      const clearedData = {};
      currentStory.form.fields.forEach((f) => {
        clearedData[f.id] = f.type === "checkbox" ? [] : "";
      });
      setFormData(clearedData);
    } else {
      toast.error(result.message || "Failed to submit form!");
    }

    setSubmitting(false);
  };

  if (!currentStory) return <p className="text-center mt-10 text-white">Loading story...</p>;

  // -------------------- JSX --------------------
  return (
    <div className="custom-gradient min-h-screen">
      <Container maxWidth="lg" className="py-10">
        <HamburgerMenu />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Story Content */}
          <div className="flex-3 lg:flex-[3]">
            {currentStory.story_video ? (
              <video src={currentStory.story_video} autoPlay loop controls className="w-full rounded-xl mb-4" />
            ) : (
              <img
                src={currentStory.story_image || "https://via.placeholder.com/800x400"}
                alt={currentStory.story_title}
                className="w-full rounded-xl mb-4"
              />
            )}

            <h2 className="text-2xl font-bold mb-2 text-white">{currentStory.story_title}</h2>
            <p className="text-gray-300 mb-3">{currentStory.story_date || currentStory.created_at?.split("T")[0]}</p>

            {/* Reactions */}
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
                  if (navigator.share) navigator.share({ title: currentStory.story_title, url });
                  else {
                    navigator.clipboard.writeText(url);
                    alert("Link copied!");
                  }
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                🔗 Share
              </button>
              <a href={currentStory.story_video || currentStory.story_image} download className="bg-green-600 text-white px-3 py-1 rounded no-underline">
                ⬇ Download
              </a>
            </div>

            <p className="text-gray-200 mb-6">{currentStory.description?.replace(/<[^>]+>/g, "")}</p>

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

          {/* Right: Related Stories & Dynamic Form */}
          <div className="lg:w-1/3 pr-2">
            <h3 className="text-white font-semibold mb-3">Related Stories</h3>
            <ul className="space-y-3 px-0">
              {relatedStories.slice(0, 6).map((story) => (
                <li key={story.id} className="flex gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg">
                  <Link href={`/story/${story.slug}`} className="flex gap-3 w-full no-underline">
                    <img
                      src={story.story_image || "https://via.placeholder.com/200x120"}
                      alt={story.story_title}
                      className="w-36 h-20 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <h5 className="text-white font-medium line-clamp-2 no-underline">{story.story_title}</h5>
                      <p className="text-gray-400 text-xs no-underline">{story.story_date || story.created_at?.split("T")[0]}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Dynamic Form for current story */}
            {currentStory.form && (
              <div className="mt-8 bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-4">{currentStory.form.name} Form</h3>
                <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
                  {currentStory.form.fields.map((field) => (
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
                      {/* Add radio/select/textarea similarly if needed */}
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
