"use client";

import React, { useEffect, useState } from "react";
import {
  getCartList,
  updateCartQuantity,
  removeCartItem,
  productChechout,
  getAddresses,
  saveAddress,
  deleteAddress,
} from "../../../utils/fetchApi";
import { confirmDelete } from "../../../utils/confirmDelete";
import HomeFooter from "../../HomePage/HomeFooter";
import HamburgerMenu from "../../HomePage/HamburgerMenu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Listing() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (userId) {
      fetchCart();
      fetchAddresses();
    }
  }, [userId]);

  const fetchCart = async () => {
    setLoading(true);
    const res = await getCartList(userId);
    if (res.status) setCart(res.data);
    else setCart([]);
    setLoading(false);
  };

  const fetchAddresses = async () => {
    const res = await getAddresses(token, userId);
    if (res.status) {
      setAddresses(res.data);
      if (res.data.length > 0) setSelectedAddress(res.data[0].id);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const item = cart.find((c) => c.id === itemId);
    if (!item) return;

    try {
      const res = await updateCartQuantity(itemId, newQuantity);
      if (res.status) {
        setCart((prev) =>
          prev.map((c) =>
            c.id === itemId
              ? {
                  ...c,
                  quantity: newQuantity,
                  total_price: (
                    newQuantity * Number(c.product.price)
                  ).toFixed(2),
                }
              : c
          )
        );
        toast.success("Quantity updated!");
      } else toast.error(res.message || "Failed to update quantity.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const res = await removeCartItem(itemId);
      if (res.status) {
        setCart((prev) => prev.filter((c) => c.id !== itemId));
        toast.success("Item removed from cart!");
      } else toast.error(res.message || "Failed to remove item.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  // Address Save
  const handleSaveAddress = async () => {
    if (
      !newAddress.address_line ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pincode
    ) {
      return toast.error("All fields are required!");
    }

    try {
      const res = await saveAddress(token, { ...newAddress, user_id: userId });
      if (res.status) {
        setAddresses([...addresses, res.data]);
        setNewAddress({ address_line: "", city: "", state: "", pincode: "" });
        setShowAddressForm(false);
        toast.success("Address added!");
      } else {
        toast.error(res.message || "Failed to save address");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await deleteAddress(token, id, userId);
      if (res.status) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
        toast.success("Address deleted!");
      } else {
        toast.error(res.message || "Failed to delete address");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  // Delete event
    const handleDelete = async (id) => {
      await confirmDelete(`/delete/address/${id}`, fetchAddresses);
    };

  const subtotal = cart.reduce((sum, item) => sum + Number(item.total_price), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (!userId) return toast.error("User not logged in!");
    if (cart.length === 0) return toast.error("Cart is empty!");
    if (!selectedAddress) return toast.error("Please select an address!");

    setCheckoutLoading(true);

    const selectedAddr = addresses.find((a) => a.id === selectedAddress);

    const cartData = {
      user_id: userId,
      items: cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: Number(item.product.price),
        total_price: Number(item.total_price),
        name: item.product.product_name,
      })),
      subtotal,
      tax,
      total,
      address: selectedAddr,
    };

    try {
      const result = await productChechout(cartData);
      if (result.status) {
        window.location.href = result.url;
      } else {
        toast.error(result.message || "Checkout failed!");
        setCheckoutLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during checkout!");
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <HamburgerMenu />
      <div className="container mx-auto py-16 px-4 lg:px-0">
        {/* Cart Section */}
        <div className="p-4 w-full">
          <h3 className="text-4xl font-extrabold text-yellow-400 mb-10">
            My Cart
          </h3>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg shadow-sm grid grid-cols-12 items-center gap-4 py-2 my-3"
              >
                <div className="col-span-12 sm:col-span-4 flex flex-col gap-1">
                  <h3 className="font-semibold">{item.product.product_name}</h3>
                  <p className="text-sm text-gray-100">
                    Price: ${item.product.price}
                  </p>
                  <p className="text-sm text-gray-100 font-medium">
                    Total: ${item.total_price}
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-4 flex justify-center items-center mt-2 sm:mt-0 space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    className="w-12 text-center text-black font-medium rounded"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
                <div className="col-span-12 sm:col-span-4 flex flex-col sm:flex-row sm:justify-end items-center gap-2 mt-2 sm:mt-0">
                  <img
                    src={
                      item.product.thumbnail ||
                      `https://via.placeholder.com/80?text=${item.product.product_name}`
                    }
                    alt={item.product.product_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="px-3 py-1 bg-red-600 rounded hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Address + Summary Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Address */}
          <div className="p-4 w-full lg:w-6/12">
            <div className="p-6 border rounded-lg bg-gray-800 text-white">
              <h3 className="text-xl font-bold mb-4">Select Address</h3>
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="flex items-center justify-between mb-2"
                >
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                    />
                    <span>
                      {addr.address_line}, {addr.city}, {addr.state} -{" "}
                      {addr.pincode}
                    </span>
                  </label>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="px-2 py-1 bg-red-600 rounded hover:bg-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}

              {/* Add Address Toggle */}
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="mt-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300"
              >
                {showAddressForm ? "Cancel" : "Add Address"}
              </button>

              {/* Form */}
              {showAddressForm && (
                <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                  <input
                    type="text"
                    placeholder="Address Line"
                    value={newAddress.address_line}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        address_line: e.target.value,
                      })
                    }
                    className="w-full mb-2 px-3 py-2 rounded text-black"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    className="w-full mb-2 px-3 py-2 rounded text-black"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                    className="w-full mb-2 px-3 py-2 rounded text-black"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddress.pincode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, pincode: e.target.value })
                    }
                    className="w-full mb-2 px-3 py-2 rounded text-black"
                  />

                  <button
                    onClick={handleSaveAddress}
                    className="mt-2 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-400"
                  >
                    Save Address
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 w-full lg:w-6/12">
            <div className="p-6 border rounded-lg bg-gray-800 text-white">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className={`w-full py-3 font-bold rounded transition ${
                  checkoutLoading
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                }`}
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>

        <HomeFooter />
        <ToastContainer />
      </div>
    </div>
  );
}
