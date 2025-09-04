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
      const success = await deleteSubscription(id);
      if (success) fetchSubscriptions();
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
    <div className="py-4">
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Subscription Plans
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and view subscription details here.
            </p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by name, plan, or price..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72"
            />
            <Link
              href="/administor/subscription/create"
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
              <p className="text-gray-500">Loading subscriptions...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700">
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
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-gray-800">
                          {sub.subscription_name}
                        </td>
                        <td className="p-3">${sub.price}</td>
                        <td className="p-3">{sub.plan_type}</td>
                        <td className="p-3">{sub.features || "-"}</td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              sub.status === "1"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {sub.status === "1" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <Link
                              href={`/administor/subscription/edit?id=${sub.id}`}
                              className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                            >
                              <FaEdit className="text-green-600 text-lg" />
                            </Link>
                            <button
                              onClick={() => handleDelete(sub.id)}
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
                        No subscriptions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 flex justify-between items-center border-t">
                <span className="text-gray-600 text-sm">
                  Showing {indexOfFirst + 1} to{" "}
                  {Math.min(indexOfLast, filteredSubscriptions.length)} of{" "}
                  {filteredSubscriptions.length} entries
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
