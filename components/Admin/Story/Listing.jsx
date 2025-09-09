"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { storyList } from "../../../utils/fetchAdminApi";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { confirmDelete } from "../../../utils/confirmDelete";

export default function Listing() {
  const [storys, setstorys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const storysPerPage = 10;

  // Fetch storys
  const fetchStories = async () => {
    try {
      const data = await storyList();
      setstorys(data || []);
    } catch (error) {
      console.error("Failed to fetch storys:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Delete story
  const handleDelete = async (id) => {
    await confirmDelete(`/delete/story/${id}`, fetchStories);
  };

  // Search filter
  const filteredstorys = storys.filter(
    (story) =>
      story.story_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (story.story_date &&
        new Date(story.story_date)
          .toLocaleDateString()
          .includes(searchTerm))
  );

  // Pagination
  const indexOfLast = currentPage * storysPerPage;
  const indexOfFirst = indexOfLast - storysPerPage;
  const currentstorys = filteredstorys.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredstorys.length / storysPerPage);

  return (
    <div className="py-4">
      <div className="bg-[#111] border border-gray-700 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Story List</h1>
            <p className="text-gray-400 mt-1">
              Manage and view story details here.
            </p>
          </div>

          {/* Search & Create */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by name, description, or date..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-600 bg-[#1E1E1E] text-white rounded-lg px-4 py-2 w-72 placeholder-gray-500"
            />

            <Link
              href="/administor/stories/create"
              className="px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 transition inline-block font-semibold"
            >
              + Create
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#000] border border-gray-700 rounded-lg overflow-hidden">
          {loading ? (
            <p className="text-gray-400 text-center p-6">Loading...</p>
          ) : currentstorys.length > 0 ? (
            <table className="w-full border-collapse">
              <thead className="bg-[#222222] text-yellow-400">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Story Title</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Video </th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentstorys.map((story, index) => (
                  <tr
                    key={story.id}
                    className="border-b border-gray-700 hover:bg-[#2A2A2A] transition"
                  >
                    <td className="p-3 text-gray-300">
                      {indexOfFirst + index + 1}
                    </td>
                    <td className="p-3 font-medium text-white">
                      {story.story_title}
                    </td>
                    <td className="p-3 text-gray-400">
                      {story.story_date
                        ? new Date(story.story_date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      {story.story_image ? (
                        <img
                          src={story.story_image}
                          alt={story.story_title}
                          className="w-20 h-12 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </td>
                     <td className="p-3">
                        {story.story_video ? (
                          <video
                            src={story.story_video} // public URL/path of video
                            controls
                            className="w-20 h-12 object-cover rounded border border-gray-700"
                          />
                        ) : (
                          <span className="text-gray-500">No Video</span>
                        )}
                      </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          story.status === 1
                            ? "bg-green-500 text-white"
                            : "bg-gray-600 text-gray-200"
                        }`}
                      >
                        {story.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
                          <FaEye className="text-white text-lg" />
                        </button>
                        <Link
                          href={`/administor/stories/edit?id=${story.id}`}
                          className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                        >
                          <FaEdit className="text-white text-lg" />
                        </Link>
                        <button
                          onClick={() => handleDelete(story.id)}
                          className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                        >
                          <FaTrash className="text-white text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-center p-6">No stories found.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white",
                  borderColor: "#666",
                },
                "& .Mui-selected": {
                  backgroundColor: "#facc15 !important",
                  color: "#000",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
