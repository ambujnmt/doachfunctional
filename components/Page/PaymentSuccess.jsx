"use client";
import React from "react";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";
import { useRouter } from "next/navigation";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="custom-gradient min-h-screen flex flex-col">
      <HamburgerMenu />

      <section
        id="payment-success"
        className="flex-1 flex items-center justify-center py-20 px-6"
      >
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
          {/* ✅ Success Icon */}
          {/* <CheckCircleIcon
            sx={{ fontSize: 80 }}
            className="mx-auto text-green-500 mb-6"
          /> */}

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Successful 🎉
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for your payment. Your subscription is now active. You can
            start enjoying premium features right away!
          </p>

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
