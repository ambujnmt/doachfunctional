"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { brandList } from "../../../utils/fetchAdminApi";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { confirmDelete } from "../../../utils/confirmDelete";

export default function Listing() {
  const [brands, setbrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const brandsPerPage = 10;

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const data = await brandList();
      setbrands(data || []);
    } catch (error) {
      console.error("Failed to fetch brands:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Delete brand
  const handleDelete = async (id) => {
    await confirmDelete(`/delete/dynamicFormSubmission/${id}`, fetchBrands);
  };

  // Search filter
  const filteredbrands = brands.filter(
    (brand) =>
      brand.brand_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (brand.brand_date &&
        new Date(brand.brand_date).toLocaleDateString().includes(searchTerm))
  );

  // Pagination
  const indexOfLast = currentPage * brandsPerPage;
  const indexOfFirst = indexOfLast - brandsPerPage;
  const currentbrands = filteredbrands.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredbrands.length / brandsPerPage);

  return (
    <div className="py-6 bg-black">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Brand List</h1>
            <p className="text-gray-400 mt-1">
              Manage and view brand details here.
            </p>
          </div>
          <div className="flex space-x-2">
            {/* Search */}
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
            {/* Create Button */}
            <Link
              href="/administor/brand/create"
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
              <p className="mt-2 text-gray-400">Loading brands...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse text-white">
                <thead className="bg-[#222] text-yellow-500">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Brand Name</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentbrands.length > 0 ? (
                    currentbrands.map((brand, index) => (
                      <tr
                        key={brand.id}
                        className="border-b border-gray-700 hover:bg-[#222] transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-white">
                          {brand.brand_name}
                        </td>
                        <td className="p-3 text-gray-300">
                          {brand.description}
                        </td>
                        <td className="p-3">
                          {brand.brand_image ? (
                            <img
                              src={brand.brand_image}
                              alt={brand.brand_name}
                              className="w-20 h-12 object-cover rounded border border-gray-700"
                            />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              brand.status === 1
                                ? "bg-green-600 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {brand.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            {/* <button className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition">
                              <FaEye className="text-black text-lg" />
                            </button> */}
                            <Link
                              href={`/administor/brand/edit?id=${brand.id}`}
                              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                            >
                              <FaEdit className="text-white text-lg" />
                            </Link>
                            <button
                              onClick={() => handleDelete(brand.id)}
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
                        No brands found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 flex justify-between items-center border-t border-gray-700">
                <span className="text-gray-400 text-sm">
                  Showing {indexOfFirst + 1} to{" "}
                  {Math.min(indexOfLast, filteredbrands.length)} of{" "}
                  {filteredbrands.length} entries
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
