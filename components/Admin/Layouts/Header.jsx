import React, { useState, useEffect, useRef } from "react";

import {
  FaBars,
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaTachometerAlt,
} from "react-icons/fa";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";

export default function AdminHeader({ menuOpen, setMenuOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const adminHandleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will be logged out of your admin account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminAuthToken");
        Swal.fire({
          title: "Logged Out",
          text: "Your session has ended.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
        setTimeout(() => router.push("/administor/login"), 1500);
      }
    });
  };

  return (
    <header className="bg-[#FFC32B] text-white flex items-center justify-between px-6 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Left: Sidebar Toggle + Logo */}
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="https://site2demo.in/doach/public/static_assets/images/logo/logo.png"
            alt="Logo"
            className="w-20 h-10 object-contain rounded-full"
          />
          {/* <span className="text-lg font-bold hidden sm:block">
            Admin Dashboard
          </span> */}
        </Link>
      </div>

      {/* Center: Search (optional) */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md px-4 py-2 rounded-lg bg-[#FFF] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative focus:outline-none"
          >
            <FaBell className="text-2xl cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
              <h3 className="px-4 py-2 font-semibold border-b">Notifications</h3>
              <ul className="max-h-60 overflow-y-auto divide-y">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  🆕 New user registered
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  📦 New order received
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  ⚠️ Server warning
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  📊 Monthly report ready
                </li>
              </ul>
              <div className="px-4 py-2 text-center text-sm text-blue-600 border-t hover:bg-gray-100 cursor-pointer">
                View All
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/024/624/549/small_2x/3d-rendering-person-icon-3d-render-blue-user-sign-icon-png.png"
              alt="Admin"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="hidden md:block font-medium">Admin</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
              <Link
                href="/"
                className="flex items-center px-4 py-2 hover:bg-gray-100 space-x-2 no-underline text-dark"
              >
                <FaTachometerAlt /> <span>Dashboard</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-100 space-x-2 no-underline text-dark"
              >
                <FaUser /> <span>Profile</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center px-4 py-2 hover:bg-gray-100 space-x-2 no-underline text-dark"
              >
                <FaCog /> <span>Settings</span>
              </Link>
              <button
                onClick={adminHandleLogout}
                className="w-full flex items-center px-4 py-2 hover:bg-gray-100 space-x-2 text-left text-red-600"
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
