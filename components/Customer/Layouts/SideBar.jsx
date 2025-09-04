"use client"; // needed in App Router
import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import {
  FaHome,
  FaUsers,
  FaPhoneAlt,
  FaHeadset,
  FaSignOutAlt,
  FaVideo,
  FaHistory,
  FaFire,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ menuOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  // helper for active link
  const isActive = (path) =>
    pathname === path ? "bg-gray-700 text-yellow-400" : "text-white";
  
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
    <aside
      className={`
        bg-gray-800 text-white w-64 py-7 px-4
        fixed top-16 left-0 h-[calc(100vh-4rem)] transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
        overflow-y-auto
      `}
    >
      {/* Sticky Dashboard Title */}
      <div className="text-2xl font-bold mb-4 sticky top-0 bg-gray-800 z-10 py-3">
        Dashboard
      </div>

      <nav className="flex flex-col space-y-3">
        <Link
          href="/customer/dashboard"
          className={`flex items-center space-x-2 p-2 rounded no-underline hover:bg-gray-700 ${isActive(
            "/customer/dashboard"
          )}`}
        >
          <FaHome /> <span>Dashboard</span>
        </Link>

        <Link
          href="/customer/community"
          className={`flex items-center space-x-2 p-2 rounded no-underline hover:bg-gray-700 ${isActive(
            "/customer/community"
          )}`}
        >
          <FaUsers /> <span>Community</span>
        </Link>

        {/* <Link
          href="/customer/video/demoVideo"
          className={`flex items-center space-x-2 p-2 rounded no-underline hover:bg-gray-700 ${isActive(
            "/customer/video/demoVideo"
          )}`}
        >
          <FaVideo /> <span>Demo Video List</span>
        </Link> */}

        <Link
          href="/customer/session/listing"
          className={`flex items-center space-x-2 p-2 rounded no-underline hover:bg-gray-700 ${isActive(
            "/customer/session/history"
          )}`}
        >
          <FaHistory /> <span>Session</span>
        </Link>

        <Link
          href="/customer/profile/subscribedDetail"
          className={`flex items-center space-x-2 p-2 rounded no-underline hover:bg-gray-700 ${isActive(
            "/customer/mySteak/steaks"
          )}`}
        >
          <FaFire /> <span>Your Plan</span>
        </Link>

        <Link
          href="/customer/profile/info"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaUser /> <span>Profile</span>
        </Link>

        <Link
          href="/customer/page/contact"
          className={`flex items-center space-x-2 p-2 rounded no-underline hover:bg-gray-700 ${isActive(
            "/customer/page/contact"
          )}`}
        >
          <FaPhoneAlt /> <span>Contact</span>
        </Link>

        <Link
          href="/customer/page/support"
          className={`flex items-center space-x-2 p-2 rounded no-underline hover:bg-gray-700 ${isActive(
            "/customer/page/support"
          )}`}
        >
          <FaHeadset /> <span>Support</span>
        </Link>

        {/* <Link
          href="/customer/dashboard/setting"
          className={`flex items-center space-x-2 p-2 rounded no-underline hover:bg-gray-700 ${isActive(
            "/customer/dashboard/setting"
          )}`}
        >
          <FaCog /> <span>Setting</span>
        </Link> */}

        <Link
          href="/customer/mySession/listing"
          className={`flex items-center space-x-2 p-2 rounded no-underline hover:bg-gray-700 ${isActive(
            "/customer/myDoach/doach"
          )}`}
        >
          <FaUserTie /> <span>My Session</span>
        </Link>
        <button
                onClick={handleLogout}
                className="flex items-center space-x-2 p-2 rounded no-underline hover:bg-red-600 text-white"
              >
                 <FaSignOutAlt /> <span>Logout</span>
              </button>
      </nav>
    </aside>
  );
}
