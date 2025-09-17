"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSubscriptionById, updateSubscription } from "../../../utils/fetchAdminApi";

export default function EditSubscription() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get("id"); // ?id=123

  const [subscriptionName, setSubscriptionName] = useState("");
  const [price, setPrice] = useState("");
  const [planType, setPlanType] = useState("Monthly");
  const [features, setFeatures] = useState([""]);
  const [status, setStatus] = useState("1");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch subscription data on mount
  useEffect(() => {
    if (!subscriptionId) return;
    const fetchData = async () => {
      try {
        const response = await getSubscriptionById(subscriptionId);
        if (response.status === false) {
          toast.error(response.message || "Failed to fetch subscription");
          return;
        }

        const data = response.data || response; // handle API structure
        setSubscriptionName(data.subscription_name || "");
        setPrice(data.price || "");
        setPlanType(data.plan_type || "Monthly");
        setFeatures(data.features?.length ? data.features : [""]);
        setStatus(data.status?.toString() || "1");
      } catch (error) {
        toast.error("Failed to load subscription data.");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [subscriptionId]);

  // Feature handlers
  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index) => setFeatures(features.filter((_, i) => i !== index));
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
      features: features.filter((f) => f.trim() !== ""),
      status,
    };

    try {
      setLoading(true);
      await updateSubscription(subscriptionId, formData);
      toast.success("Subscription updated successfully!");
      setTimeout(() => router.push("/administor/subscription/listing"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update subscription.");
    } finally {
      setLoading(false);
    }
  };

  // if (fetching) {
  //   return <div className="p-6 text-center text-yellow-300">Loading subscription data...</div>;
  // }

  return (
    <div className="bg-[#000] py-6">
      <div className="bg-[#1F1F1F] border border-[#FFD700] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-[#FFF] mb-4">Edit Subscription</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Subscription Name */}
          <div>
            <label className="block text-yellow-300 font-medium mb-1">Subscription Name</label>
            <input
              type="text"
              value={subscriptionName}
              onChange={(e) => setSubscriptionName(e.target.value)}
              placeholder="Enter subscription name"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-yellow-300 font-medium mb-1">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          {/* Plan Type */}
          <div>
            <label className="block text-yellow-300 font-medium mb-1">Plan Type</label>
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-yellow-400"
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {/* Features */}
          <div>
            <label className="block text-yellow-300 font-medium mb-1">Features</label>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2 gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1 border border-gray-700 rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-yellow-400"
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
            <label className="block text-yellow-300 font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-[#222222] text-[#FFFFFF] focus:ring focus:ring-yellow-400"
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
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Subscription"}
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
