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
} from "../../../utils/fetchApi";

export default function StoryDetail({ slug, token }) {
  const [currentStory, setCurrentStory] = useState(null);
  const [relatedStories, setRelatedStories] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // -------------------- Helper Function --------------------
  const loadStoryAndFeedback = async () => {
    const stories = await storiesHomePage();
    const story = stories.find((s) => s.slug === slug);
    if (!story) return;

    setCurrentStory(story);
    setRelatedStories(stories.filter((s) => s.slug !== slug).slice(0, 7));

    const feedback = await fetchStoryFeedback(story.id, token);
    setLikes(feedback.likes || 0);
    setDislikes(feedback.dislikes || 0);
    setComments(feedback.comments || []);
  };

  const handleReact = async (type) => {
    if (!userId) return alert("You must be logged in to react!");
    const res = await reactToStory(currentStory.id, type, userId, token);
    setLikes(res.likes);
    setDislikes(res.dislikes);
  };

  const handleAddComment = async () => {
    if (!userId) return alert("You must be logged in to comment!");
    if (!commentText.trim()) return;

    const newComment = await addCommentToStory(currentStory.id, commentText, userId, token);
    if (newComment) setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  useEffect(() => {
    loadStoryAndFeedback();
  }, [slug, token]);

  if (!currentStory) return <p className="text-center mt-10 text-white">Loading story...</p>;

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
            <p className="text-gray-300 mb-3">{currentStory.date || currentStory.created_at?.split("T")[0]}</p>

            {/* Like/Dislike/Share/Download */}
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
                  if (navigator.share) navigator.share({ title: currentStory.story_title, text: "Check out this story!", url });
                  else {
                    navigator.clipboard.writeText(url);
                    alert("Link copied to clipboard!");
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

            {/* Description */}
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

          {/* Right: Related Stories (Sidebar like YouTube) */}
          <div className="lg:w-1/3 pr-2">
            <h4 className="text-white font-semibold mb-3">Related Stories</h4>
            <ul className="space-y-3 px-0">
              {relatedStories.slice(0, 6).map((story) => (
                <li
                  key={story.id}
                  className="flex gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg"
                >
                  <Link href={`/story/${story.slug}`} className="flex gap-3 w-full no-underline">
                    {/* Thumbnail */}
                    <img
                      src={story.story_image || "https://via.placeholder.com/200x120"}
                      alt={story.story_title}
                      className="w-36 h-20 object-cover rounded-lg"
                    />

                    {/* Details */}
                    <div className="flex flex-col justify-between flex-1">
                      <h5 className="text-white font-medium line-clamp-2 no-underline">
                        {story.story_title}
                      </h5>
                      <p className="text-gray-400 text-xs no-underline">
                        {story.date || story.created_at?.split("T")[0]}
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
