"use client";

import React, { useEffect, useState } from "react";
import { getOrderList } from "../../../utils/fetchUserApi";

export default function Listing() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Browser check for localStorage
    const storedUserId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    if (!storedUserId) {
      setLoading(false);
      return;
    }

    setUserId(storedUserId);

    const fetchOrders = async () => {
      setLoading(true);
      const res = await getOrderList(storedUserId);
      if (res.status) {
        setOrders(res.orders);
      } else {
        console.error(res.message);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-white text-center mt-10">No orders found.</p>;
  }

  return (
    <div className="py-6 bg-black min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">My Orders</h1>
        <p className="text-gray-400 mt-1">Explore your order history</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#1A1A1A] p-4 rounded-lg shadow-md border border-[#333]"
          >
            <div className="mb-2 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-white">
                Order #{order.id} - ${order.total}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
                    : "bg-green-500/20 text-green-400 border border-green-500"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-[#222] p-2 rounded-lg border border-[#333]"
                >
                  <img
                    src={
                      item.product.images.find(
                        (img) => img.type === "thumbnail"
                      )?.image_url ||
                      "http://localhost:8000/admin_assets/images/default.png"
                    }
                    alt={item.product.product_name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">
                      {item.product.product_name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Qty: {item.quantity} • Price: ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
