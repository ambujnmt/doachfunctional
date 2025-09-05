"use client";
import React, { useEffect, useState } from "react";
import { getSubscribedDetailById } from "../../../utils/fetchUserApi";

export default function SubscribedDetail() {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("No logged-in user ID found");
        setLoading(false);
        return;
      }

      try {
        const res = await getSubscribedDetailById(userId);
        if (res.status) {
          setCustomerData(res.data);
        } else {
          setCustomerData(null);
        }
      } catch (error) {
        console.error(error);
        setCustomerData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const display = (value) => (value ? value : "N/A");

  // Show loading or not found messages before rendering
  if (loading) return <p className="p-6">Loading...</p>;
  if (!customerData) return <p className="p-6">Customer not found.</p>;

  const user = customerData.user;
  const subscription = customerData.subscription;

  return (
    <div className="py-6 bg-black min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Subscribed Billing Detail</h1>
        <p className="text-gray-400 mt-1">View subscription and user details</p>
      </div>

      {/* User Billing Info */}
      <div className="bg-black rounded-xl shadow-md p-6 mb-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">
          User Billing Information
        </h2>
        <div className="space-y-1 text-gray-300">
          <p className="text-lg font-semibold text-white">{display(customerData?.name)}</p>
          <p>Email: {display(customerData?.email)}</p>
          <p>Phone: {display(customerData?.phone)}</p>
          <p>Status: 
            <span className={`ml-2 px-2 py-1 rounded text-sm ${
              customerData.status === "active"
                ? "bg-green-600 text-white"
                : customerData.status === "pending"
                ? "bg-yellow-600 text-black"
                : "bg-red-600 text-white"
            }`}>
              {customerData.status}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-gray-400">
          <p><span className="font-semibold text-white">Created At:</span> {customerData?.created_at ? new Date(customerData.created_at).toLocaleString() : "N/A"}</p>
          <p><span className="font-semibold text-white">Updated At:</span> {customerData?.updated_at ? new Date(customerData.updated_at).toLocaleString() : "N/A"}</p>
          <p><span className="font-semibold text-white">Address:</span> {display(customerData?.address)}</p>
          <p><span className="font-semibold text-white">City:</span> {display(customerData?.city)}</p>
          <p><span className="font-semibold text-white">Country:</span> {display(customerData?.country)}</p>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="bg-black rounded-xl shadow-md p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">Subscription Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <p><span className="font-semibold text-white">Plan Name:</span> {display(subscription?.subscription_name)}</p>
          <p><span className="font-semibold text-white">Plan Type:</span> {display(subscription?.plan_type)}</p>
          <p><span className="font-semibold text-white">Price:</span> ${display(customerData.price)}</p>
          <p><span className="font-semibold text-white">Payment Intent:</span> {display(customerData.payment_intent)}</p>
          <p><span className="font-semibold text-white">Start Date:</span> {display(customerData.start_date)}</p>
          <p><span className="font-semibold text-white">End Date:</span> {display(customerData.end_date)}</p>
          <p><span className="font-semibold text-white">Created At:</span> {customerData.created_at ? new Date(customerData.created_at).toLocaleString() : "N/A"}</p>
          <p><span className="font-semibold text-white">Updated At:</span> {customerData.updated_at ? new Date(customerData.updated_at).toLocaleString() : "N/A"}</p>
          <p><span className="font-semibold text-white">Session ID:</span> {display(customerData.session_id)}</p>
        </div>

        {subscription?.features?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-yellow-400 mb-2">Subscription Features:</h3>
            <ul className="list-disc list-inside text-gray-300">
              {subscription.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>

  );
}
