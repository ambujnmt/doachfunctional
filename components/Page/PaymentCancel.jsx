"use client";
import React from "react";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";
import { useRouter } from "next/navigation";
// import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <div className="custom-gradient min-h-screen flex flex-col">
      <HamburgerMenu />

      <section id="payment-cancel" className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
          {/* ❌ Cancel Icon */}
          {/* <XCircle className="mx-auto text-red-500 w-20 h-20 mb-6" /> */}

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Cancelled
          </h2>
          <p className="text-gray-600 mb-8">
            Your payment was not completed. Don’t worry, you can try again or
            choose another subscription plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/subscription")}
              className="bg-[#e9c055] text-[#182530] font-semibold py-3 px-6 rounded-xl hover:bg-yellow-500 transition"
            >
              🔄 Try Again
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
