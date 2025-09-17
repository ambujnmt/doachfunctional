"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { eventList } from "../../../utils/fetchAdminApi";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { confirmDelete } from "../../../utils/confirmDelete";

export default function Listing() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const eventsPerPage = 10;

  // Fetch events
  const fetchEvents = async () => {
    try {
      const data = await eventList();
      setEvents(data || []);
    } catch (error) {
      console.error("Failed to fetch events:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    await confirmDelete(`/delete/event/${id}`, fetchEvents);
  };

  // Search filter
  const filteredEvents = events.filter(
    (event) =>
      event.event_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.event_date &&
        new Date(event.event_date).toLocaleDateString().includes(searchTerm))
  );

  // Pagination
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="py-6 bg-black">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Event List</h1>
            <p className="text-gray-400 mt-1">
              Manage and view event details here.
            </p>
          </div>
          <div className="flex space-x-2">
            {/* Search Box */}
            <input
              type="text"
              placeholder="🔍 Search by name, description, or date..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-yellow-500 bg-black text-white rounded-lg px-4 py-2 w-72 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            {/* Create Event Button */}
            <Link
              href="/administor/event/create"
              className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition inline-block"
            >
              + Create
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
              <p className="mt-2 text-gray-400">Loading events...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse text-white">
                <thead className="bg-[#222] text-yellow-500">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Event Name</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Video</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEvents.length > 0 ? (
                    currentEvents.map((event, index) => (
                      <tr
                        key={event.id}
                        className="border-b border-gray-700 hover:bg-[#222] transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-white">
                          {event.event_name}
                        </td>
                        <td className="p-3 font-medium text-white">
                          {event.content_type}
                        </td>
                        <td className="p-3 text-gray-300">
                          {event.event_date
                            ? new Date(event.event_date).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-3">
                          {event.event_image ? (
                            <img
                              src={event.event_image}
                              alt={event.event_name}
                              className="w-20 h-12 object-cover rounded border border-gray-700"
                            />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                        </td>
                         <td className="p-3">
                          {event.event_video ? (
                            <video
                              src={event.event_video} // public URL/path of video
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
                              event.status === 1
                                ? "bg-green-600 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {event.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            {/* <button className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition">
                              <FaEye className="text-black text-lg" />
                            </button> */}
                            <Link
                              href={`/administor/event/edit?id=${event.id}`}
                              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                            >
                              <FaEdit className="text-white text-lg" />
                            </Link>
                            <button
                              onClick={() => handleDelete(event.id)}
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
                        colSpan="7"
                        className="p-4 text-center text-gray-400 italic"
                      >
                        No events found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 flex justify-between items-center border-t border-gray-700">
                <span className="text-gray-400 text-sm">
                  Showing {indexOfFirst + 1} to{" "}
                  {Math.min(indexOfLast, filteredEvents.length)} of{" "}
                  {filteredEvents.length} entries
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
