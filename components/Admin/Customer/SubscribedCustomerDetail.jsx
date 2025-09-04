"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSubscribedCustomerDetailById } from "../../../utils/fetchAdminApi";

export default function SubscribedCustomerDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get "id" from URL

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
    if (res.status) {
      setCustomer(res.data);
    }
    setLoading(false);
  };


  if (!customer) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Customer not found.
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Customer Billing Details
        </h1>

        {/* User Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">User Information</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <p><span className="font-medium">Name:</span> {customer.user?.name}</p>
            <p><span className="font-medium">Email:</span> {customer.user?.email}</p>
            <p><span className="font-medium">Phone:</span> {customer.user?.phone_number}</p>
            <p><span className="font-medium">City:</span> {customer.city}</p>
            <p><span className="font-medium">Country:</span> {customer.country}</p>
            <p><span className="font-medium">Address:</span> {customer.address}</p>
          </div>
        </div>

        {/* Current Plan */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Current Plan</h2>
          <div className="p-4 bg-blue-50 border rounded-lg">
            <p><span className="font-medium">Plan Name:</span> {customer.subscription?.subscription_name}</p>
            <p><span className="font-medium">Price:</span> ${customer.price}</p>
            <p><span className="font-medium">Plan Type:</span> {customer.subscription?.plan_type}</p>
            <p>
              <span className="font-medium">Status:</span> 
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                customer.status === "active"
                  ? "bg-green-100 text-green-700"
                  : customer.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {customer.status}
              </span>
            </p>

            {/* Subscription Features */}
            {customer.subscription?.features?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-1">Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
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
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Subscription Detail</h2>
          <div className="p-4 bg-gray-50 border rounded-lg text-gray-600">
            <p><span className="font-medium">Session ID:</span> {customer.session_id}</p>
            <p><span className="font-medium">Payment Intent:</span> {customer.payment_intent || "N/A"}</p>
            <p><span className="font-medium">Start Date:</span> {customer.start_date || "Not Started"}</p>
            <p><span className="font-medium">End Date:</span> {customer.end_date || "Not Ended"}</p>
            <p><span className="font-medium">Created At:</span> {new Date(customer.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
