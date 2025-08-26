"use client";
import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";

// Static pages
const pages = [
  { id: 1, title: "Policy", slug: "policy" },
  { id: 2, title: "Terms & Conditions", slug: "terms" },
  { id: 3, title: "Company Media", slug: "company-media" },
  { id: 4, title: "Accessibility", slug: "accessibility" },
  { id: 5, title: "Fraud Warning", slug: "fraud-warning" },
  { id: 6, title: "Do Not Sell/Share My Personal Information", slug: "do-not-sell" },
];

export default function PageList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pagesPerPage = 5;

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * pagesPerPage;
  const indexOfFirst = indexOfLast - pagesPerPage;
  const currentPages = filteredPages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPages.length / pagesPerPage);

  return (
    <div className="py-4">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pages List</h1>
            <p className="text-gray-600 mt-1">Manage and view static pages here.</p>
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
              href="#"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition inline-block"
            >
              + Create
            </Link>
          </div>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
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
                  <tr key={page.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">{indexOfFirst + index + 1}</td>
                    <td className="p-3 font-medium text-gray-800">{page.title}</td>
                    <td className="p-3">{page.slug}</td>
                    <td className="p-3 text-center">
                      <Link
                        href={`/dynamic?page=${page.slug}`}
                        className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500 italic">
                    No pages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="p-4 flex justify-between items-center border-t">
              <span className="text-gray-600 text-sm">
                Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredPages.length)} of{" "}
                {filteredPages.length} entries
              </span>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
