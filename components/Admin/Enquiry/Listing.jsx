"use client";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { getFormSubmissions } from "../../../utils/fetchAdminApi";
import Link from "next/link";
import {FaEye, FaTrash } from "react-icons/fa";
import { confirmDelete } from "../../../utils/confirmDelete";


export default function DynamicFormListing({ section = "", sectionId = "" }) {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const submissionsPerPage = 10;

  // Fetch submissions
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // if using auth
      const res = await getFormSubmissions(section, sectionId, "", token);
      if (res.status) setSubmissions(res.data);
    } catch (error) {
      console.error("Failed to fetch submissions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [section, sectionId]);

  // Delete brand
    const handleDelete = async (id) => {
        await confirmDelete(`/delete/dynamicFormSubmission/${id}`, fetchSubmissions);
    };

  // Filter search
  const filteredSubmissions = submissions.filter((sub) =>
    Object.values(sub.form_data || {})
      .some((val) => val?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const indexOfLast = currentPage * submissionsPerPage;
  const indexOfFirst = indexOfLast - submissionsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSubmissions.length / submissionsPerPage);

  return (
    <div className="py-6 bg-black">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Dynamic Form Submissions</h1>
            <p className="text-gray-400 mt-1">Manage and view submitted form data.</p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="🔍 Search by form values..."
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
              <p className="mt-2 text-gray-400">Loading submissions...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse text-white">
                <thead className="bg-[#222] text-yellow-500">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">User Name</th>
                    <th className="p-3 text-left">Section</th>
                    {/* <th className="p-3 text-left">Form Data</th> */}
                    <th className="p-3 text-left">Submitted At</th>
                    <th className="p-3 text-left"> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubmissions.length > 0 ? (
                    currentSubmissions.map((sub, index) => (
                      <tr
                        key={sub.id}
                        className="border-b border-gray-700 hover:bg-[#222] transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3">
                        {sub.user ? (
                            <>
                            <p className="font-semibold">{sub.user.name}</p>
                            <p className="text-gray-400 text-sm">{sub.user.email}</p>
                            </>
                        ) : (
                            <span className="italic text-gray-400">Guest User</span>
                        )}
                        </td>
                        <td className="p-3">{sub.section.charAt(0).toUpperCase() + sub.section.slice(1)}</td>
                        {/* <td className="p-3">
                          {sub.form_data
                            ? Object.entries(sub.form_data).map(([key, value]) => (
                                <p key={key}>
                                  <strong>{key}:</strong> {value || "-"}
                                </p>
                              ))
                            : "-"}
                        </td> */}
                        <td className="p-3">
                          {new Date(sub.created_at).toLocaleString()}
                        </td>
                        <td className="p-3 text-center">
                            <div className="flex justify-center space-x-2">
                                
                            <Link
                              href={`/administor/enquiry/detail?id=${sub.id}`} className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition">
                                <FaEye className="text-black text-lg" />
                            </Link>
                            <button
                                onClick={() => handleDelete(sub.id)}
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
                        No submissions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 flex justify-between items-center border-t border-gray-700">
                <span className="text-gray-400 text-sm">
                  Showing {indexOfFirst + 1} to{" "}
                  {Math.min(indexOfLast, filteredSubmissions.length)} of{" "}
                  {filteredSubmissions.length} entries
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
