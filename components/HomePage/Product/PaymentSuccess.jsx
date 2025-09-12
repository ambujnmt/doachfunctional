"use client";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "../../HomePage/HamburgerMenu";
import HomeFooter from "../../HomePage/HomeFooter";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();
  const [date, setDate] = useState("");

  // ✅ Dummy paymentInfo (stripe se aap real data bhejoge)
  const paymentInfo = {
    amount: 49.99,
    method: "Stripe (Visa **** 4242)",
    transactionId: "txn_123456789",
  };

  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  return (
    <div className="custom-gradient min-h-screen flex flex-col">
      <HamburgerMenu />

      <section
        id="payment-success"
        className="flex-1 flex items-center justify-center py-20 px-6"
      >
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Successful 🎉
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for your payment. Your subscription is now active!
          </p>

          {/* ✅ Payment Details */}
          <div className="text-left bg-gray-100 p-4 rounded mb-6">
            <h3 className="font-bold mb-2">Payment Details:</h3>
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Amount:</strong> ${paymentInfo.amount}
            </p>
            <p>
              <strong>Payment Method:</strong> {paymentInfo.method}
            </p>
            <p>
              <strong>Transaction ID:</strong> {paymentInfo.transactionId}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/customer/dashboard")}
              className="bg-[#e9c055] text-[#182530] font-semibold py-3 px-6 rounded-xl hover:bg-yellow-500 transition"
            >
              🚀 Go to Dashboard
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
