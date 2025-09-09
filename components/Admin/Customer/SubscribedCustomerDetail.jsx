"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSubscribedCustomerDetailById } from "../../../utils/fetchAdminApi";

export default function SubscribedCustomerDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCustomerDetail(id);
    }
  }, [id]);

  const fetchCustomerDetail = async (id) => {
    setLoading(true);
    const res = await getSubscribedCustomerDetailById(id);
    if (res.status) setCustomer(res.data);
    else setCustomer(null);
    setLoading(false);
  };

  return (
    <div className="bg-black py-6">
      <div className="bg-[#111] border border-yellow-500 shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Customer Details
        </h1>

        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : !customer ? (
          <div className="text-center text-red-500 font-medium">
            Customer not found.
          </div>
        ) : (
          <>
            {/* User Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-yellow-500 mb-2">
                User Information
              </h2>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <p><span className="font-medium text-white">Name:</span> {customer.user?.name}</p>
                <p><span className="font-medium text-white">Email:</span> {customer.user?.email}</p>
                <p><span className="font-medium text-white">Phone:</span> {customer.user?.phone_number}</p>
                <p><span className="font-medium text-white">City:</span> {customer.city}</p>
                <p><span className="font-medium text-white">Country:</span> {customer.country}</p>
                <p><span className="font-medium text-white">Address:</span> {customer.address}</p>
              </div>
            </div>

            {/* Billing Detail */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-yellow-500 mb-2">
                Billing Detail
              </h2>
              <div className="p-4 bg-[#222] border border-yellow-500 rounded-lg text-gray-300">
                <p><span className="font-medium text-white">Name:</span> {customer.name}</p>
                <p><span className="font-medium text-white">Email:</span> {customer.email}</p>
                <p><span className="font-medium text-white">Phone:</span> {customer.phone}</p>
                <p><span className="font-medium text-white">Address:</span> {customer.address}</p>
                <p><span className="font-medium text-white">City:</span> {customer.city}</p>
                <p><span className="font-medium text-white">Country:</span> {customer.country}</p>
                <p><span className="font-medium text-white">Price:</span> ${customer.price}</p>
                <p>
                  <span className="font-medium text-white">Status:</span>{" "}
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-700"
                        : customer.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                </p>
                <p><span className="font-medium text-white">Created At:</span> {new Date(customer.created_at).toLocaleString()}</p>
              </div>
            </div>

            {/* Current Plan */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-yellow-500 mb-2">
                Current Plan
              </h2>
              <div className="p-4 bg-[#222] border border-yellow-500 rounded-lg text-gray-300">
                <p><span className="font-medium text-white">Plan Name:</span> {customer.subscription?.subscription_name}</p>
                <p><span className="font-medium text-white">Price:</span> ${customer.price}</p>
                <p><span className="font-medium text-white">Plan Type:</span> {customer.subscription?.plan_type}</p>
                <p>
                  <span className="font-medium text-white">Status:</span>{" "}
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-700"
                        : customer.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                </p>

                {customer.subscription?.features?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-white mb-1">Features:</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {customer.subscription.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Subscription Detail */}
            <div>
              <h2 className="text-lg font-semibold text-yellow-500 mb-2">
                Subscription Detail
              </h2>
              <div className="p-4 bg-[#222] border border-yellow-500 rounded-lg text-gray-300">
                <p><span className="font-medium text-white">Session ID:</span> {customer.session_id}</p>
                <p><span className="font-medium text-white">Payment Intent:</span> {customer.payment_intent || "N/A"}</p>
                <p><span className="font-medium text-white">Start Date:</span> {customer.start_date || "Not Started"}</p>
                <p><span className="font-medium text-white">End Date:</span> {customer.end_date || "Not Ended"}</p>
                <p><span className="font-medium text-white">Created At:</span> {new Date(customer.created_at).toLocaleString()}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
