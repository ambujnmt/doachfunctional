"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { coachList } from "../../../utils/fetchAdminApi";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { confirmDelete } from "../../../utils/confirmDelete";

export default function Listing() {
  const [coachs, setcoachs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const coachsPerPage = 10;

  // Fetch coachs
  const fetchCoaches = async () => {
    try {
      const data = await coachList();
      setcoachs(data || []);
    } catch (error) {
      console.error("Failed to fetch coachs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  // Delete coach
  const handleDelete = async (id) => {
    await confirmDelete(`/delete/coach/${id}`, fetchCoaches);
  };

  // Search filter
  const filteredcoachs = coachs.filter((coach) =>
    coach.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * coachsPerPage;
  const indexOfFirst = indexOfLast - coachsPerPage;
  const currentcoachs = filteredcoachs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredcoachs.length / coachsPerPage);

  return (
    <div className="py-4">
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Coach List</h1>
            <p className="text-gray-600 mt-1">
              Manage and view coach details here.
            </p>
          </div>
          <div className="flex space-x-2">
            {/* Search Box */}
            <input
              type="text"
              placeholder="Search by name, description, or date..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72"
            />

            {/* Create coach Button */}
            <Link
              href="/administor/coach/create"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition inline-block"
            >
              + Create
            </Link>
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
              <p className="mt-2 text-gray-500">Loading coachs...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    {/* <th className="p-3 text-left">Phone</th> */}
                    <th className="p-3 text-left">specialization</th>
                    <th className="p-3 text-left">experience</th>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentcoachs.length > 0 ? (
                    currentcoachs.map((coach, index) => (
                      <tr
                        key={coach.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-gray-800">
                          {coach.name}
                        </td>
                        <td className="p-3 font-medium text-gray-800">
                          {coach.email}
                        </td>
                        {/* <td className="p-3 font-medium text-gray-800">
                          {coach.phone}
                        </td> */}
                        <td className="p-3">{coach.specialization}</td>
                        <td className="p-3">{coach.experience_years}</td>
                        <td className="p-3">
                          {coach.coach_image ? (
                            <img
                              src={coach.coach_image}
                              alt={coach.name}
                              className="w-20 h-12 object-cover rounded"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              coach.status === 1
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {coach.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition">
                              <FaEye className="text-blue-600 text-lg" />
                            </button>
                            <Link
                              href={`/administor/coach/edit?id=${coach.id}`} // Pass coach ID in the URL
                              className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                            >
                              <FaEdit className="text-green-600 text-lg" />
                            </Link>
                            <button
                              onClick={() => handleDelete(coach.id)}
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
                      <td
                        colSpan="7"
                        className="p-4 text-center text-gray-500 italic"
                      >
                        No coachs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 flex justify-between items-center border-t">
                <span className="text-gray-600 text-sm">
                  Showing {indexOfFirst + 1} to{" "}
                  {Math.min(indexOfLast, filteredcoachs.length)} of{" "}
                  {filteredcoachs.length} entries
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