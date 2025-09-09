"use client";
import React, { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import { customerSupport } from "../../../utils/fetchAdminApi"; // adjust path

// Confirm Delete function placeholder
const confirmDelete = async (id, callback) => {
  if (window.confirm("Are you sure you want to delete this request?")) {
    // call delete API here
    console.log("Deleted ID:", id);
    callback();
  }
};

export default function SupportListing() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const requestsPerPage = 10;

  // Fetch requests from API
  const getRequests = async () => {
    setLoading(true);
    const data = await customerSupport();
    setRequests(data || []);
    setLoading(false);
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleDelete = async (id) => {
    await confirmDelete(id, getRequests);
  };

  // Filter results
  const filteredRequests = requests.filter(
    (r) =>
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="py-6 bg-black">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Support Requests</h1>
            <p className="text-gray-400 mt-1">Manage and view customer support requests.</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="🔍 Search by name, email, phone, or address..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-yellow-500 bg-black text-white rounded-lg px-4 py-2 w-72 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
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
              <p className="mt-2 text-gray-400">Loading requests...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse text-white">
                <thead className="bg-[#222] text-yellow-500">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.length > 0 ? (
                    currentRequests.map((r, index) => (
                      <tr
                        key={r.id}
                        className="border-b border-gray-700 hover:bg-[#222] transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-white">{r.name}</td>
                        <td className="p-3 text-gray-300">{r.email}</td>
                        <td className="p-3 text-gray-300">{r.phone}</td>
                        <td className="p-3 text-gray-300">{r.address}</td>
                        <td className="p-3 text-gray-300">{r.message}</td>
                        <td className="p-3 text-gray-300">
                          {new Date(r.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => alert(`Viewing request #${r.id}`)}
                              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                            >
                              <FaEye className="text-white text-lg" />
                            </button>
                            <button
                              onClick={() => handleDelete(r.id)}
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
                        colSpan="8"
                        className="p-4 text-center text-gray-400 italic"
                      >
                        No support requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 flex justify-between items-center border-t border-gray-700">
                  <span className="text-gray-400 text-sm">
                    Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredRequests.length)} of{" "}
                    {filteredRequests.length} entries
                  </span>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    sx={{
                      "& .MuiPaginationItem-root": { color: "white" },
                      "& .Mui-selected": { backgroundColor: "#FFD700 !important", color: "black" },
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
