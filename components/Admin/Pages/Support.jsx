"use client";
import React, { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";

// Fake API fetch function (replace with your API)
const fetchSupportRequests = async () => {
  return [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Login issue",
      message: "Cannot login to my account",
      date: "2025-08-26",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Payment problem",
      message: "Payment not processed",
      date: "2025-08-25",
      status: "Resolved",
    },
  ];
};

// Confirm Delete function placeholder
const confirmDelete = async (id, callback) => {
  if (window.confirm("Are you sure you want to delete this request?")) {
    // call your API here to delete
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

  // Fetch requests
  const getRequests = async () => {
    setLoading(true);
    const data = await fetchSupportRequests();
    setRequests(data || []);
    setLoading(false);
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleDelete = async (id) => {
    await confirmDelete(id, getRequests);
  };

  // Filtered results
  const filteredRequests = requests.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="py-4">
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Support Requests
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and view support requests here.
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">
              <img
                src="https://i.gifer.com/ZZ5H.gif"
                alt="Loading..."
                className="mx-auto w-12 h-12"
              />
              <p className="mt-2 text-gray-500">Loading requests...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.length > 0 ? (
                    currentRequests.map((r, index) => (
                      <tr
                        key={r.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-gray-800">{r.name}</td>
                        <td className="p-3">{r.email}</td>
                        <td className="p-3">{r.subject}</td>
                        <td className="p-3">{r.message}</td>
                        <td className="p-3">{r.date}</td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              r.status === "Resolved"
                                ? "bg-green-100 text-green-700"
                                : r.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => alert(`Viewing request #${r.id}`)}
                              className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                            >
                              <FaEye className="text-green-600 text-lg" />
                            </button>
                            <button
                              onClick={() => handleDelete(r.id)}
                              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                            >
                              <FaTrash className="text-red-600 text-lg" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="p-4 text-center text-gray-500 italic">
                        No support requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 flex justify-between items-center border-t">
                <span className="text-gray-600 text-sm">
                  Showing {indexOfFirst + 1} to{" "}
                  {Math.min(indexOfLast, filteredRequests.length)} of{" "}
                  {filteredRequests.length} entries
                </span>
                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
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
