"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import HomeFooter from "../../HomePage/HomeFooter";
import HamburgerMenu from "../../HomePage/HamburgerMenu";
import {
  coachesHomePage,
  fetchCoachFeedback,
  reactToCoach,
  addCommentToCoach,
} from "../../../utils/fetchApi";

export default function CoachDetail({ slug, token }) {
  const [currentCoach, setCurrentCoach] = useState(null);
  const [relatedCoaches, setRelatedCoaches] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // localStorage se userId nikalna
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // -------------------- Load Coach + Feedback --------------------
  const loadCoachAndFeedback = async () => {
    try {
      const coaches = await coachesHomePage();
      const coach = coaches.find((c) => c.slug === slug);
      if (!coach) return;

      setCurrentCoach(coach);
      setRelatedCoaches(coaches.filter((c) => c.slug !== slug).slice(0, 7));

      const feedback = await fetchCoachFeedback(coach.id, token);
      setLikes(feedback.likes || 0);
      setDislikes(feedback.dislikes || 0);
      setComments(feedback.comments || []);
    } catch (error) {
      console.error("Error fetching coach detail:", error);
    }
  };

  // -------------------- Handle Like / Dislike --------------------
  const handleReact = async (type) => {
    if (!userId) return alert("You must be logged in to react!");
    if (!currentCoach) return;

    const res = await reactToCoach(currentCoach.id, type, userId, token);
    setLikes(res.likes || 0);
    setDislikes(res.dislikes || 0);
  };

  // -------------------- Handle Comment --------------------
  const handleAddComment = async () => {
    if (!userId) return alert("You must be logged in to comment!");
    if (!commentText.trim() || !currentCoach) return;

    const newComment = await addCommentToCoach(
      currentCoach.id,
      commentText,
      userId,
      token
    );
    if (newComment) {
      setComments((prev) => [...prev, newComment]);
      setCommentText("");
    }
  };

  useEffect(() => {
    loadCoachAndFeedback();
  }, [slug, token]);

  if (!currentCoach) {
    return <p className="text-center mt-10 text-white">Loading coach...</p>;
  }

  // -------------------- JSX --------------------
  return (
    <div className="custom-gradient min-h-screen">
      <Container maxWidth="lg" className="py-10">
        <HamburgerMenu />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Coach Detail */}
          <div className="flex-3 lg:flex-[3]">
            {currentCoach.coach_video ? (
              <video
                src={currentCoach.coach_video}
                controls
                autoPlay
                loop
                className="w-full rounded-xl mb-4"
              />
            ) : (
              <img
                src={
                  currentCoach.coach_image ||
                  "https://via.placeholder.com/800x400"
                }
                alt={currentCoach.coach_name}
                className="w-full rounded-xl mb-4"
              />
            )}

            <h2 className="text-2xl font-bold mb-2 text-white">
              {currentCoach.coach_name}
            </h2>
            <p className="text-gray-300 mb-3">
              {currentCoach.date || currentCoach.created_at?.split("T")[0]}
            </p>

            {/* Like / Dislike / Share / Download */}
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

              {/* Share */}
              <button
                onClick={() => {
                  const url = window.location.href;
                  if (navigator.share) {
                    navigator.share({
                      title: currentCoach.coach_name,
                      text: "Check out this coach!",
                      url,
                    });
                  } else {
                    navigator.clipboard.writeText(url);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                🔗 Share
              </button>

              {/* Download */}
              <a
                href={currentCoach.coach_video || currentCoach.coach_image}
                download
                className="bg-green-600 text-white px-3 py-1 rounded no-underline"
              >
                ⬇ Download
              </a>
            </div>

            {/* Bio / Description */}
            <p className="text-gray-200 mb-6">
              {currentCoach.bio_data?.replace(/<[^>]+>/g, "")}
            </p>

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
                    <strong>{c.user?.name || "User"}:</strong>{" "}
                    {c.comment || c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Related Coaches (Sidebar like YouTube) */}
          <div className="lg:w-1/3 pr-2 pr-2">
            <h3 className="text-white font-semibold mb-3">Related Coaches</h3>
            <ul className="space-y-3 px-0">
              {relatedCoaches.slice(0, 7).map((coach) => (
                <li
                  key={coach.id}
                  className="flex gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg"
                >
                  <Link href={`/coach/${coach.slug}`} className="flex gap-3 w-full">
                    {/* Thumbnail */}
                    <img
                      src={coach.coach_image || "https://via.placeholder.com/200x120"}
                      alt={coach.name}
                      className="w-36 h-20 object-cover rounded-lg"
                    />

                    {/* Details */}
                    <div className="flex flex-col justify-between flex-1">
                      <h5 className="text-white font-medium line-clamp-2 no-underline">
                        {coach.name}
                      </h5>
                      <p className="text-gray-400 text-xs no-underline">
                        {coach.date || coach.created_at?.split("T")[0]}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <HomeFooter />
      </Container>
    </div>
  );
}
