"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaEnvelope, FaPhone, FaHome } from "react-icons/fa";
import { customerDetails } from "../../../utils/fetchAdminApi";

export default function View() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const customerId = searchParams.get("id");

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customerId) return;

    const fetchData = async () => {
      try {
        const res = await customerDetails(customerId);
        setCustomer(res.data); // API should return customer object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  return (
    <div className="bg-black py-6">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        {/* Header Row with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Customer Details</h1>
            <p className="text-gray-400 mt-1">
              Manage and view customer details here.
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 transition"
          >
            ← Back
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Customer Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border border-yellow-500">
            <img
              src={
                customer?.image ||
                "https://static.vecteezy.com/system/resources/thumbnails/024/624/549/small_2x/3d-rendering-person-icon-3d-render-blue-user-sign-icon-png.png"
              }
              alt="Customer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-bold text-white">
              {customer?.name || "N/A"}
            </h2>
            <div className="flex items-center gap-3 text-gray-300">
              <FaEnvelope className="text-green-500" />
              <span>{customer?.email || "N/A"}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <FaPhone className="text-purple-500" />
              <span>{customer?.phone_number || "N/A"}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <FaHome className="text-orange-500" />
              <span>{customer?.address || "Not Provided"}</span>
            </div>

            <div className="pt-3 mt-3 text-gray-400 border-t border-yellow-500">
              <p>
                <span className="font-semibold text-white">Registered On:</span>{" "}
                {customer?.created_at
                  ? new Date(customer.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
