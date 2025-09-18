"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import HomeFooter from "../HomePage/HomeFooter";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import {
  fetchCommunityDetail,
  reactToCommunity,
  addCommentToCommunity,
  submitDynamicForm,
  fetchCommunityFeedback, // ✅ feedback API import
} from "../../utils/fetchApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CommunityDetail({ slug, token }) {
  const [communityData, setCommunityData] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const loadCommunity = async () => {
      const data = await fetchCommunityDetail(slug);
      if (!data) {
        toast.error("Community not found!");
        return;
      }
      setCommunityData(data);

      // ✅ feedback alag API se laa rahe hain
      const feedback = await fetchCommunityFeedback(data.community.id, token);
      setLikes(feedback.likes || 0);
      setDislikes(feedback.dislikes || 0);
      setComments(feedback.comments || []);

      // Initialize dynamic form
      if (data.community.form?.fields) {
        const initialData = {};
        data.community.form.fields.forEach((field) => {
          initialData[field.id] = field.type === "checkbox" ? [] : "";
        });
        setFormData(initialData);
      }
    };
    if (slug) loadCommunity();
  }, [slug, token]);

  // ✅ React (like/dislike)
  const handleReact = async (type) => {
    if (!userId) return toast.error("Login required!");
    await reactToCommunity(communityData.community.id, type, userId, token);

    const feedback = await fetchCommunityFeedback(
      communityData.community.id,
      token
    );
    setLikes(feedback.likes);
    setDislikes(feedback.dislikes);
  };

  // ✅ Add comment
  const handleAddComment = async () => {
    if (!userId) return toast.error("Login required!");
    if (!commentText.trim()) return;

    await addCommentToCommunity(
      communityData.community.id,
      commentText,
      userId,
      token
    );

    const feedback = await fetchCommunityFeedback(
      communityData.community.id,
      token
    );
    setComments(feedback.comments);

    setCommentText("");
  };

  // ✅ Form handling
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
    if (!userId) return toast.error("Login required!");
    setSubmitting(true);

    const payload = {
      section: "community",
      section_id: communityData.community.id,
      user_id: userId,
      form_data: formData,
    };

    const result = await submitDynamicForm(payload, token);

    if (result.success) {
      toast.success(result.message || "Form submitted!");
      const clearedData = {};
      communityData.community.form.fields.forEach((f) => {
        clearedData[f.id] = f.type === "checkbox" ? [] : "";
      });
      setFormData(clearedData);
    } else {
      toast.error(result.message || "Failed to submit!");
    }

    setSubmitting(false);
  };

  if (!communityData)
    return <p className="text-center mt-10 text-white">Loading community...</p>;

  const { community, related_communities } = communityData;

  return (
    <div className="custom-gradient min-h-screen">
      <Container maxWidth="lg" className="py-10">
        <HamburgerMenu />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Video/Image & Details */}
          <div className="flex-3 lg:flex-[3]">
            {community?.video ? (
              <video
                src={community.video}
                autoPlay
                loop
                controls
                className="w-full rounded-xl mb-4"
              />
            ) : (
              <img
                src={community?.image || "https://via.placeholder.com/800x400"}
                alt={community?.title}
                className="w-full rounded-xl mb-4"
              />
            )}

            <h2 className="text-2xl font-bold mb-2 text-white">
              {community?.title}
            </h2>
            <p className="text-gray-300 mb-3">
              {community?.date || community?.created_at?.split("T")[0]}
            </p>

            <div className="mb-4 flex flex-wrap gap-3">
              <button
                onClick={() => handleReact("like")}
                className="bg-yellow-500 text-black px-3 py-1 rounded"
              >
                👍 {likes}
              </button>
              <button
                onClick={() => handleReact("dislike")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                👎 {dislikes}
              </button>
              <button
                onClick={() => {
                  const url = window.location.href;
                  if (navigator.share)
                    navigator.share({ title: community.title, url });
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
                href={community.video || community.image}
                download
                className="bg-green-600 text-white px-3 py-1 rounded no-underline"
              >
                ⬇ Download
              </a>
            </div>

            <p
              className="text-gray-200 mb-6"
              dangerouslySetInnerHTML={{ __html: community?.description }}
            />

            {/* Comments */}
            <div className="mb-10">
              <h3 className="text-white font-semibold mb-2">
                Comments ({comments.length})
              </h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 p-2 rounded"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-blue-600 text-white px-4 rounded"
                >
                  Comment
                </button>
              </div>
              <ul className="px-0">
                {comments.map((c, i) => (
                  <li
                    key={i}
                    className="border-b border-gray-700 py-2 text-gray-200"
                  >
                    <strong>{c.user?.name || "User"}:</strong> {c.comment}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Related Communities & Dynamic Form */}
          <div className="lg:w-1/3 pr-2">
            <h3 className="text-white font-semibold mb-3">
              Related Communities
            </h3>
            <ul className="space-y-3 px-0">
              {related_communities?.length > 0 ? (
                related_communities.map((rel) => (
                  <li
                    key={rel.id}
                    className="flex gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg"
                  >
                    <Link
                      href={`/community/detail/${rel.slug}`}
                      className="flex gap-3 w-full no-underline"
                    >
                      <img
                        src={rel.image || "https://via.placeholder.com/200x120"}
                        alt={rel.title}
                        className="w-36 h-20 object-cover rounded-lg"
                      />
                      <div className="flex flex-col justify-between flex-1">
                        <h5 className="text-white font-medium line-clamp-2">
                          {rel.title}
                        </h5>
                        <p className="text-gray-400 text-xs">
                          {rel.date?.split("T")[0]}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No related communities found.</p>
              )}
            </ul>

            {/* Dynamic Form */}
            {community?.form && (
              <div className="mt-8 bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-4">
                  {community.form.name} Form
                </h3>
                <form
                  onSubmit={handleSubmitForm}
                  className="flex flex-col gap-4"
                >
                  {community.form.fields.map((field) => (
                    <div key={field.id} className="flex flex-col gap-1">
                      <label className="text-gray-200">{field.label}</label>

                      {field.type === "text" && (
                        <input
                          type="text"
                          value={formData[field.id] || ""}
                          onChange={(e) =>
                            handleFormChange(field.id, e.target.value)
                          }
                          className="p-2 rounded bg-gray-800 text-white"
                          required
                        />
                      )}

                      {field.type === "textarea" && (
                        <textarea
                          value={formData[field.id] || ""}
                          onChange={(e) =>
                            handleFormChange(field.id, e.target.value)
                          }
                          className="p-2 rounded bg-gray-800 text-white"
                          required
                        />
                      )}

                      {field.type === "checkbox" && (
                        <div className="flex flex-wrap gap-2">
                          {field.options.map((opt) => (
                            <label
                              key={opt.id}
                              className="flex items-center gap-1 text-gray-200"
                            >
                              <input
                                type="checkbox"
                                checked={formData[field.id]?.includes(
                                  opt.option_value
                                )}
                                onChange={() =>
                                  handleCheckboxChange(
                                    field.id,
                                    opt.option_value
                                  )
                                }
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
                            <label
                              key={opt.id}
                              className="flex items-center gap-1 text-gray-200"
                            >
                              <input
                                type="radio"
                                name={`radio-${field.id}`}
                                checked={
                                  formData[field.id] === opt.option_value
                                }
                                onChange={() =>
                                  handleFormChange(field.id, opt.option_value)
                                }
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
                          onChange={(e) =>
                            handleFormChange(field.id, e.target.value)
                          }
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
