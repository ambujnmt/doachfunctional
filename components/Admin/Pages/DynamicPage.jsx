"use client";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { dynamicPageList } from "../../../utils/fetchAdminApi";

export default function PageList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pagesPerPage = 5;

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      const data = await dynamicPageList();
      setPages(data || []);
      setLoading(false);
    };
    fetchPages();
  }, []);

  const filteredPages = pages.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * pagesPerPage;
  const indexOfFirst = indexOfLast - pagesPerPage;
  const currentPages = filteredPages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPages.length / pagesPerPage);

  return (
    <div className="py-6 bg-black">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Pages List</h1>
            <p className="text-gray-400 mt-1">Manage and view static pages here.</p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="🔍 Search by title or slug..."
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
              <p className="mt-2 text-gray-400">Loading pages...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse text-white">
                <thead className="bg-[#222] text-yellow-500">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Slug</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPages.length > 0 ? (
                    currentPages.map((page, index) => (
                      <tr
                        key={page.id}
                        className="border-b border-gray-700 hover:bg-[#222] transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-white">{page.title}</td>
                        <td className="p-3 text-gray-300">{page.slug}</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <Link
                              href={`/administor/pages/dynamicUpdate?page=${page.slug}`}
                              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                            >
                              <FaEdit className="text-white text-lg" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-4 text-center text-gray-400 italic"
                      >
                        No pages found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 flex justify-between items-center border-t border-gray-700">
                  <span className="text-gray-400 text-sm">
                    Showing {indexOfFirst + 1} to{" "}
                    {Math.min(indexOfLast, filteredPages.length)} of{" "}
                    {filteredPages.length} entries
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
