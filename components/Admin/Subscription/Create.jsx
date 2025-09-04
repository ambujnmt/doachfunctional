"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSubscription } from "../../../utils/fetchAdminApi";

export default function CreateSubscription() {
  const router = useRouter();
  const [subscriptionName, setSubscriptionName] = useState("");
  const [price, setPrice] = useState("");
  const [planType, setPlanType] = useState("Monthly");
  const [features, setFeatures] = useState([""]); // Array of feature strings
  const [status, setStatus] = useState("1");
  const [loading, setLoading] = useState(false);

  // Add new feature input
  const addFeature = () => setFeatures([...features, ""]);

  // Remove a feature
  const removeFeature = (index) =>
    setFeatures(features.filter((_, i) => i !== index));

  // Update feature value
  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subscriptionName || !price || !planType) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = {
      subscription_name: subscriptionName,
      price,
      plan_type: planType,
      features: features.filter((f) => f.trim() !== ""), // Remove empty
      status,
    };

    try {
      setLoading(true);
      await createSubscription(formData);
      toast.success("Subscription created successfully!");
      setTimeout(() => router.push("/administor/subscription/listing"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create subscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Create Subscription
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Subscription Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Subscription Name
          </label>
          <input
            type="text"
            value={subscriptionName}
            onChange={(e) => setSubscriptionName(e.target.value)}
            placeholder="Enter subscription name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Plan Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Plan Type</label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
          >
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        {/* Features */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Features</label>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2 gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Feature
          </button>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.push("/administor/subscription/listing")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Subscription"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
