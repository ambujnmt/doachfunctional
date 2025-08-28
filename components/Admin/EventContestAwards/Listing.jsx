"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { eventContestAwardsList } from "../../../utils/fetchAdminApi";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { confirmDelete } from "../../../utils/confirmDelete";

export default function Listing() {
  const [contests, setContests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const contestsPerPage = 10;

  // Fetch contests
  const fetchContests = async () => {
    try {
      const data = await eventContestAwardsList();
      setContests(data || []);
    } catch (error) {
      console.error("Failed to fetch contests:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  // Delete contest
  const handleDelete = async (id) => {
    await confirmDelete(`/delete/eventContestAward/${id}`, fetchContests);
  };

  // Search filter
  const filteredContests = contests.filter(
    (contest) =>
      contest.contest_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contest.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contest.date &&
        new Date(contest.date).toLocaleDateString().includes(searchTerm))
  );

  // Pagination
  const indexOfLast = currentPage * contestsPerPage;
  const indexOfFirst = indexOfLast - contestsPerPage;
  const currentContests = filteredContests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredContests.length / contestsPerPage);

  return (
    <div className="py-6">
      <div className="bg-white shadow-xl rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🏆 Event Contest Awards</h1>
            <p className="text-gray-500 mt-1">Manage and view all contest details here.</p>
          </div>
          <div className="flex space-x-2">
            {/* Search Box */}
            <input
              type="text"
              placeholder="🔍 Search by name, location, or date..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:ring focus:ring-blue-200"
            />

            {/* Create Contest Button */}
            <Link
              href="/administor/eventContests/create"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              + Create Contest
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">
              <img
                src="https://i.gifer.com/ZZ5H.gif"
                alt="Loading..."
                className="mx-auto w-12 h-12"
              />
              <p className="mt-2 text-gray-500">Loading contests...</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Contest</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentContests.length > 0 ? (
                  currentContests.map((contest, index) => (
                    <tr
                      key={contest.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{indexOfFirst + index + 1}</td>
                      <td className="p-3 font-semibold text-gray-800">
                        {contest.contest_name}
                      </td>
                      <td className="p-3">
                        {contest.date
                          ? new Date(contest.date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-3">{contest.time || "N/A"}</td>
                      <td className="p-3 text-gray-600">
                        {contest.location || "—"}
                      </td>
                      <td className="p-3">
                        {contest.contest_image ? (
                          <img
                            src={contest.contest_image}
                            alt={contest.contest_name}
                            className="w-20 h-12 object-cover rounded shadow"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No Image</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            contest.status === "1"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {contest.status === "1" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                            title="View"
                          >
                            <FaEye className="text-blue-600 text-lg" />
                          </button>
                          <Link
                            href={`/administor/eventContests/edit?id=${contest.id}`}
                            className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                            title="Edit"
                          >
                            <FaEdit className="text-green-600 text-lg" />
                          </Link>
                          <button
                            onClick={() => handleDelete(contest.id)}
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                            title="Delete"
                          >
                            <FaTrash className="text-red-600 text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="p-6 text-center text-gray-500 italic"
                    >
                      No contests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center border-t mt-4">
          <span className="text-gray-600 text-sm">
            Showing {indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filteredContests.length)} of{" "}
            {filteredContests.length} entries
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
    </div>
  );
}
