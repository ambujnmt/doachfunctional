"use client";
import React, { useState, useEffect } from "react";
import { getSubscriptionsList, checkoutSubscription } from "../../utils/fetchApi";
import { useRouter, useSearchParams } from "next/navigation";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";

const decryptId = (encrypted) => {
  try {
    return atob(encrypted);
  } catch (e) {
    return null;
  }
};

export default function SubscriptionCheckout() {
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("id");
  const router = useRouter();

  const [subscription, setSubscription] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [userId, setUserId] = useState(null); // ✅ keep userId in state
  const [billing, setBilling] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    plan_id: "",
  });

  useEffect(() => {
    // ✅ Load userId only in browser
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const fetchSubscription = async () => {
      const realId = decryptId(encryptedId);
      if (!realId) {
        router.push("/subscription");
        return;
      }

      setPlanId(realId);
      setBilling((prev) => ({ ...prev, plan_id: realId }));

      const subs = await getSubscriptionsList();
      const found = subs.find((s) => s.id.toString() === realId);
      if (found) setSubscription(found);
    };

    if (encryptedId) {
      fetchSubscription();
    }
  }, [encryptedId, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    try {
      if (!userId) {
        alert("User not logged in!");
        return;
      }

      const payload = {
        user_id: userId,
        price: subscription.price,
        subscription_name: subscription.subscription_name,
        ...billing,
      };

      const data = await checkoutSubscription(payload);

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        alert(data.error || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error processing payment");
    }
  };

  if (!subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#182530]">
        <p className="text-white text-lg">Loading subscription...</p>
      </div>
    );
  }

  return (
    <div className="custom-gradient min-h-screen">
      <HamburgerMenu />

      <section id="checkout" className="py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-6">
          {/* Left: Plan Summary */}
          <div className="relative rounded-2xl shadow-xl overflow-hidden group bg-white">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#e9c055]"></div>
            <div className="p-6 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {subscription.subscription_name}
              </h2>
              <p className="text-gray-700 text-lg font-semibold mb-2">
                Price: ${subscription.price}
              </p>
              <p className="text-gray-500 font-medium mb-4">
                Plan: {subscription.plan_type}
              </p>
              {subscription.features?.length > 0 && (
                <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-1">
                  {subscription.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Plan ID:</span> {planId}
              </p>
            </div>
          </div>

          {/* Right: Billing Form */}
          <div className="relative rounded-2xl shadow-xl overflow-hidden bg-white">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#e9c055]"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#182530] mb-4">Billing Details</h3>

              <div className="space-y-4">
                <input type="text" name="name" value={billing.name} onChange={handleInputChange} placeholder="Full Name" className="w-full border rounded-lg px-4 py-2" />
                <input type="email" name="email" value={billing.email} onChange={handleInputChange} placeholder="Email Address" className="w-full border rounded-lg px-4 py-2" />
                <input type="text" name="phone" value={billing.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full border rounded-lg px-4 py-2" />
                <input type="text" name="address" value={billing.address} onChange={handleInputChange} placeholder="Street Address" className="w-full border rounded-lg px-4 py-2" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="city" value={billing.city} onChange={handleInputChange} placeholder="City" className="w-full border rounded-lg px-4 py-2" />
                  <input type="text" name="country" value={billing.country} onChange={handleInputChange} placeholder="Country" className="w-full border rounded-lg px-4 py-2" />
                </div>
              </div>

              <button onClick={handlePayment} className="mt-6 w-full bg-[#e9c055] text-[#182530] font-bold py-3 px-6 rounded-xl hover:bg-yellow-500 transition">
                Pay ${subscription.price}
              </button>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
