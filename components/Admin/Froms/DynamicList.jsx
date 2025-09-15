"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { getFormList } from "../../../utils/fetchAdminApi";
import { confirmDelete } from "../../../utils/confirmDelete";

export default function FormListing() {
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const formsPerPage = 10;

  const fetchForms = async () => {
    setLoading(true);
    try {
      const data = await getFormList();
      setForms(data || []);
    } catch (err) {
      console.error("Failed to fetch forms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    await confirmDelete(`/delete/form/${id}`, fetchForms);
  };

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * formsPerPage;
  const indexOfFirst = indexOfLast - formsPerPage;
  const currentForms = filteredForms.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredForms.length / formsPerPage);

  return (
    <div className="py-6 bg-black">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Forms List</h1>
            <p className="text-gray-400 mt-1">Manage and view form details here.</p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="🔍 Search by form name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-yellow-500 bg-black text-white rounded-lg px-4 py-2 w-72 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <Link
              href="/administor/form/dynamic"
              className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition inline-block"
            >
              + Create
            </Link>
          </div>
        </div>

        <div className="bg-black border border-yellow-500 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">
              <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." className="mx-auto w-12 h-12" />
              <p className="mt-2 text-gray-400">Loading forms...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse text-white">
                <thead className="bg-[#222] text-yellow-500">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Form Name</th>
                    <th className="p-3 text-left">Created At</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentForms.length > 0 ? (
                    currentForms.map((form, index) => (
                      <tr key={form.id} className="border-b border-gray-700 hover:bg-[#222] transition">
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-white">{form.name}</td>
                        <td className="p-3 text-gray-300">{new Date(form.created_at).toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <Link
                              href={`/administor/form/edit?id=${form.id}`}
                              replace
                              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                            >
                              <FaEdit className="text-white text-lg" />
                            </Link>
                            <button
                              onClick={() => handleDelete(form.id)}
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
                      <td colSpan="4" className="p-4 text-center text-gray-400 italic">
                        No forms found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="p-4 flex justify-between items-center border-t border-gray-700">
                <span className="text-gray-400 text-sm">
                  Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredForms.length)} of {filteredForms.length} entries
                </span>
                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    sx={{ "& .MuiPaginationItem-root": { color: "white" }, "& .Mui-selected": { backgroundColor: "#FFD700 !important", color: "black" } }}
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
