"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { getSubscriptionsList } from "../../../utils/fetchAdminApi";
import { confirmDelete } from "../../../utils/confirmDelete";

export default function SubscriptionListing() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const subscriptionsPerPage = 10;

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    setLoading(true);
    const data = await getSubscriptionsList();
    setSubscriptions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Delete subscription
  const handleDelete = async (id) => {
    const confirmed = await confirmDelete(`/delete/subscription/${id}`);
    if (confirmed) {
      fetchSubscriptions();
    }
  };

  // Search filter
  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.subscription_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.price.toString().includes(searchTerm)
  );

  // Pagination
  const indexOfLast = currentPage * subscriptionsPerPage;
  const indexOfFirst = indexOfLast - subscriptionsPerPage;
  const currentSubscriptions = filteredSubscriptions.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredSubscriptions.length / subscriptionsPerPage);

  return (
    <div className="py-6 bg-black">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Subscription Plans
            </h1>
            <p className="text-gray-400 mt-1">
              Manage and view subscription details here.
            </p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="🔍 Search by name, plan, or price..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-yellow-500 bg-black text-white rounded-lg px-4 py-2 w-72 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <Link
              href="/administor/subscription/create"
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
              <p className="mt-2 text-gray-400">Loading subscriptions...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse text-white">
                <thead className="bg-[#222] text-yellow-500">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Plan Type</th>
                    <th className="p-3 text-left">Features</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubscriptions.length > 0 ? (
                    currentSubscriptions.map((sub, index) => (
                      <tr
                        key={sub.id}
                        className="border-b border-gray-700 hover:bg-[#222] transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-white">{sub.subscription_name}</td>
                        <td className="p-3 text-gray-300">${sub.price}</td>
                        <td className="p-3 text-gray-300">{sub.plan_type}</td>
                        <td className="p-3 text-gray-300">{sub.features || "-"}</td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              sub.status === "1"
                                ? "bg-green-600 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {sub.status === "1" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <Link
                              href={`/administor/subscription/edit?id=${sub.id}`}
                              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                            >
                              <FaEdit className="text-white text-lg" />
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
                      <td colSpan="7" className="p-4 text-center text-gray-400 italic">
                        No subscriptions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 flex justify-between items-center border-t border-gray-700">
                  <span className="text-gray-400 text-sm">
                    Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredSubscriptions.length)} of{" "}
                    {filteredSubscriptions.length} entries
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
