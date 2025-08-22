import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Header({ menuOpen, setMenuOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("authToken");
        Swal.fire({
          title: "Logged Out!",
          text: "Your session has been ended.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <header className="bg-[#FFC32B] text-white flex items-center justify-between px-6 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <Link href="/">
      <div className="flex items-center space-x-2">
        <img
          src="https://site2demo.in/doach/public/static_assets/images/logo/logo.png"
          alt="Logo"
          className="w-20 h-10 object-contain rounded-full"
        />
      </div>
      </Link>

      {/* Center Menu */}
      <nav className="hidden md:flex flex-1 justify-center space-x-6">
        <Link href="/" className="hover:text-gray-200 no-underline text-white">Home</Link>
        <Link href="/" className="hover:text-gray-200 no-underline text-white">Community</Link>
        <Link href="/" className="hover:text-gray-200 no-underline text-white">Play List</Link>
        <Link href="/" className="hover:text-gray-200 no-underline text-white">Contact Us</Link>
        <Link href="/" className="hover:text-gray-200 no-underline text-white">Profile</Link>
        <Link href="/" className="hover:text-gray-200 no-underline text-white">Member Ship</Link>
      </nav>

      {/* Right Profile + Notification */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

        {/* Notification Icon */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative focus:outline-none"
          >
            <FaBell className="text-2xl cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
              <h3 className="px-4 py-2 font-semibold border-b">Notifications</h3>
              <ul className="max-h-64 overflow-y-auto">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New user registered</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New order received</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Server alert</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Weekly report ready</li>
              </ul>
              <div className="px-4 py-2 text-center text-sm text-gray-500 border-t hover:bg-gray-100 cursor-pointer">
                View All
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/024/624/549/small_2x/3d-rendering-person-icon-3d-render-blue-user-sign-icon-png.png"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
              <Link href="/" className="block px-4 py-2 hover:bg-gray-100 no-underline text-dark">Dashboard</Link>
              <Link href="/" className="block px-4 py-2 hover:bg-gray-100 no-underline text-dark">Profile</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
