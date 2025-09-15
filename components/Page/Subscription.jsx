"use client";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";
import { getSubscriptionsList } from "../../utils/fetchApi";
import { useRouter } from "next/navigation";

export default function Subscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      const subs = await getSubscriptionsList();
      setSubscriptions(subs);
      setLoading(false);
    };
    fetchSubscriptions();
  }, []);

  // 🔐 Encrypt ID before sending in URL
  const encryptId = (id) => btoa(id.toString());

  const handlePay = (sub) => {
    const encryptedId = encryptId(sub.id);
    router.push(`/subscriptionCheckout?id=${encryptedId}`);
  };

  return (
    <div className="custom-gradient min-h-screen">
      <HamburgerMenu />

      <section id="subscriptions" className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-4xl font-extrabold mb-3 drop-shadow-lg" style={{ color: "#e9c055" }}>
              🚀 Choose Your Subscription Plan
            </h3>
            <p className="text-gray-300 text-lg">
              Unlock premium features and grow faster
            </p>
          </div>

          {loading ? (
            <p className="text-center text-white">Loading subscriptions...</p>
          ) : subscriptions.length === 0 ? (
            <p className="text-center text-white">No subscriptions available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {subscriptions.map((sub) => {
                const isActive = sub.status === "1";
                return (
                  <div
                    key={sub.id}
                    className={`relative rounded-2xl shadow-xl overflow-hidden group transform transition-all duration-300 hover:scale-105 ${
                      !isActive && "opacity-60"
                    }`}
                    style={{ backgroundColor: "#fff" }}
                  >
                    {/* Top accent border */}
                    <div
                      className="absolute top-0 left-0 w-full h-2"
                      style={{ backgroundColor: "#e9c055" }}
                    ></div>

                    <div className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-2xl font-bold text-gray-800">
                          {sub.subscription_name}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <p className="text-gray-700 text-lg font-semibold mb-2">
                        Price: ${sub.price}
                      </p>
                      <p className="text-gray-500 font-medium mb-4">
                        Plan: {sub.plan_type}
                      </p>

                      {sub.features && sub.features.length > 0 && (
                        <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-1">
                          {sub.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      )}

                      <button
                        onClick={() => handlePay(sub)}
                        disabled={!isActive} // ⬅ disables click when inactive
                        className={`mt-auto py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300 ${
                          isActive
                            ? "hover:opacity-90"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        style={{
                          backgroundColor: isActive ? "#e9c055" : "#9ca3af",
                          color: isActive ? "#182530" : "#fff",
                        }}
                      >
                        Pay ${sub.price}
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <HomeFooter />
    </div>
  );
}
