"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { customerList } from "../../../utils/fetchAdminApi";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { confirmDelete } from "../../../utils/confirmDelete"; 

export default function Listing() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const customersPerPage = 10;

  const router = useRouter();

  // Fetch customers (made reusable)
  const fetchCustomers = async () => {
    // setLoading(true);
    const data = await customerList();
    setCustomers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    await confirmDelete(`/delete/user/${id}`, fetchCustomers);
  };

  // Search filter
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  return (
    <div className="py-4">
      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customer List</h1>
            <p className="text-gray-600 mt-1">
              Manage and view customer details here.
            </p>
          </div>
          <div className="flex space-x-2">
            {/* Search Box */}
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72"
            />

            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              ← Back
            </button>
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
              <p className="mt-2 text-gray-500">Loading customers...</p>
            </div>
          ) : (
            <div>
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.length > 0 ? (
                    currentCustomers.map((customer, index) => (
                      <tr
                        key={customer.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3">{indexOfFirst + index + 1}</td>
                        <td className="p-3 font-medium text-gray-800">
                          {customer.name}
                        </td>
                        <td className="p-3">{customer.email}</td>
                        <td className="p-3">{customer.phone_number}</td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              customer.status === "active"
                                ? "bg-green-100 text-green-700"
                                : customer.status === "inactive"
                                ? "bg-gray-200 text-gray-700"
                                : customer.status === "banned"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
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
                            {/* View Button */}
                            <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition">
                              <FaEye className="text-blue-600 text-lg" />
                            </button>

                            {/* Edit Button */}
                            <button className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition">
                              <FaEdit className="text-green-600 text-lg" />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(customer.id)}
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
                        colSpan="6"
                        className="p-4 text-center text-gray-500 italic"
                      >
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="p-4 flex justify-between items-center border-t">
                <span className="text-gray-600 text-sm">
                  Showing {indexOfFirst + 1} to{" "}
                  {Math.min(indexOfLast, filteredCustomers.length)} of{" "}
                  {filteredCustomers.length} entries
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
