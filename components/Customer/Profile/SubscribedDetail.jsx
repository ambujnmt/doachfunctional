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

  const { user, subscription } = customerData;

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Subscribed Billing Detail</h1>
        <p className="text-gray-600 mt-1">View subscription and user details</p>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">User Billing Information</h2>
        <div className="space-y-1">
          <p className="text-lg font-semibold">{display(user?.name)}</p>
          <p className="text-gray-600">Email: {display(user?.email)}</p>
          <p className="text-gray-600">Phone: {display(user?.phone_number)}</p>
          <p className="text-gray-600">Status: {display(user?.status)}</p>
          <p className="text-gray-600">Onboarding Complete: {display(user?.onboarding_complete)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <p><span className="font-semibold">Created At:</span> {user?.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}</p>
          <p><span className="font-semibold">Updated At:</span> {user?.updated_at ? new Date(user.updated_at).toLocaleString() : "N/A"}</p>
          <p><span className="font-semibold">Address:</span> {display(customerData.address)}</p>
          <p><span className="font-semibold">City:</span> {display(customerData.city)}</p>
          <p><span className="font-semibold">Country:</span> {display(customerData.country)}</p>
          <p><span className="font-semibold">Phone:</span> {display(customerData.phone)}</p>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Subscription Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-semibold">Plan Name:</span> {display(subscription?.subscription_name)}</p>
          <p><span className="font-semibold">Plan Type:</span> {display(subscription?.plan_type)}</p>
          <p><span className="font-semibold">Price:</span> ${display(customerData.price)}</p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
              customerData.status === "active"
                ? "bg-green-100 text-green-700"
                : customerData.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}>
              {customerData.status}
            </span>
          </p>
          <p><span className="font-semibold">Payment Intent:</span> {display(customerData.payment_intent)}</p>
          <p><span className="font-semibold">Start Date:</span> {display(customerData.start_date)}</p>
          <p><span className="font-semibold">End Date:</span> {display(customerData.end_date)}</p>
          <p><span className="font-semibold">Created At:</span> {customerData.created_at ? new Date(customerData.created_at).toLocaleString() : "N/A"}</p>
          <p><span className="font-semibold">Session ID:</span> {display(customerData.session_id)}</p>
        </div>

        {subscription?.features?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Subscription Features:</h3>
            <ul className="list-disc list-inside text-gray-700">
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
