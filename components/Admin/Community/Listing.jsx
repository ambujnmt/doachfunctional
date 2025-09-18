"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { getcommunityList } from "../../../utils/fetchAdminApi"; 
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { confirmDelete } from "../../../utils/confirmDelete";

export default function CommunityListing() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  const fetchItems = async () => {
    try {
      const data = await getcommunityList();
      setItems(data || []);
    } catch (error) {
      console.error("Failed to fetch community items:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    await confirmDelete(`/delete/community/${id}`, fetchItems);
  };

  // Filter
  const filteredItems = items.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.date &&
        new Date(item.date).toLocaleDateString().includes(searchTerm)) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="py-6 bg-black">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Community Content</h1>
            <p className="text-gray-400 mt-1">
              Manage videos, articles, and news.
            </p>
          </div>
          <div className="flex space-x-2">
            {/* Search */}
            <input
              type="text"
              placeholder="🔍 Search by title, category, description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-yellow-500 bg-black text-white rounded-lg px-4 py-2 w-72 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {/* Category List */}
            <Link
              href="/administor/community/category"
              className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition inline-block"
            >
              Category List
            </Link>
            {/* Add Content */}
            <Link
              href="/administor/community/create"
              className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition inline-block"
            >
              + Add Content
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-black border border-yellow-500 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">
              <img
                src="https://i.gifer.com/ZZ5H.gif"
                alt="Loading..."
                className="mx-auto w-12 h-12"
              />
              <p className="mt-2 text-gray-400">Loading community content...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse text-white">
                <thead className="bg-[#222] text-yellow-500">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Video</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-700 hover:bg-[#222] transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-white">
                          {item.title}
                        </td>
                        <td className="p-3 capitalize text-gray-300">
                          {item.category}
                        </td>
                        <td className="p-3 text-gray-400">
                          {item.date
                            ? new Date(item.date).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-3">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-20 h-12 object-cover rounded"
                            />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                        </td>
                        <td className="p-3">
                          {item.video ? (
                            <video
                              controls
                              className="w-24 h-16 rounded"
                              src={item.video}
                            />
                          ) : (
                            <span className="text-gray-500">No Video</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.status == 1
                                ? "bg-green-600 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {item.status == 1 ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <Link
                              href={`/community/playback/${item.id}`}
                              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                            >
                              <FaEye className="text-white text-lg" />
                            </Link>
                            <Link
                              href={`/administor/community/edit?id=${item.id}`}
                              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                            >
                              <FaEdit className="text-white text-lg" />
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                            >
                              <FaTrash className="text-white text-lg" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="p-4 text-center text-gray-400 italic"
                      >
                        No content found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 flex justify-between items-center border-t border-gray-700">
                <span className="text-gray-400 text-sm">
                  Showing {indexOfFirst + 1} to{" "}
                  {Math.min(indexOfLast, filteredItems.length)} of{" "}
                  {filteredItems.length} entries
                </span>
                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "white",
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#FFD700 !important",
                        color: "black",
                      },
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
