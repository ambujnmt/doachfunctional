"use client";
import React, { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { getSubscribedCustomers } from "../../../utils/fetchAdminApi";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import Link from "next/link";
import { confirmDelete } from "../../../utils/confirmDelete";

export default function SubscribedCustomer() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const customersPerPage = 10;

  const router = useRouter();

  const fetchCustomers = async () => {
    setLoading(true);
    const data = await getSubscribedCustomers();
    setCustomers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    await confirmDelete(`/delete/subscriptionCustomer/${id}`, fetchCustomers);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.subscription?.subscription_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  return (
    <div className="py-6 bg-black">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Subscribed Customers List</h1>
            <p className="text-gray-400 mt-1">Manage and view subscribed customer details here.</p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="🔍 Search by name, email, phone or subscription..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-yellow-500 bg-black text-white rounded-lg px-4 py-2 w-72 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
            >
              ← Back
            </button>
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
              <p className="mt-2 text-gray-400">Loading customers...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse text-white">
                <thead className="bg-[#222] text-yellow-500">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Subscription</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.length > 0 ? (
                    currentCustomers.map((customer, index) => (
                      <tr
                        key={customer.id}
                        className="border-b border-gray-700 hover:bg-[#222] transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-white">{customer.name}</td>
                        <td className="p-3 text-gray-300">{customer.email}</td>
                        <td className="p-3 text-gray-300">{customer.phone}</td>
                        <td className="p-3 text-gray-300">
                          {customer.subscription?.subscription_name || "-"}
                        </td>
                        <td className="p-3 text-gray-300">
                          ${customer.subscription?.price || "0.00"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              customer.status === "active"
                                ? "bg-green-600 text-white"
                                : customer.status === "inactive"
                                ? "bg-gray-600 text-white"
                                : customer.status === "banned"
                                ? "bg-red-600 text-white"
                                : "bg-yellow-500 text-black"
                            }`}
                          >
                            {customer.status
                              ? customer.status.charAt(0).toUpperCase() +
                                customer.status.slice(1)
                              : "Unknown"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <Link
                              href={`/administor/customer/subscribedCustomerDetail?id=${customer.id}`}
                              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                            >
                              <FaEye className="text-white text-lg" />
                            </Link>
                            <button
                              onClick={() => handleDelete(customer.id)}
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
                      <td colSpan="8" className="p-4 text-center text-gray-400 italic">
                        No customers found.
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
                    {Math.min(indexOfLast, filteredCustomers.length)} of{" "}
                    {filteredCustomers.length} entries
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
