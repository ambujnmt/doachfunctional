import React from "react";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaPhoneAlt,
  FaHeadset,
  FaStar,
  FaSignOutAlt,
  FaVideo,   
  FaHistory,
  FaFire,
  FaUserTie ,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";

export default function Sidebar({ menuOpen }) {
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
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaHome /> <span>Dashboard</span>
        </Link>

        <Link
          href="/customer/community"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaUsers /> <span>Community</span>
        </Link>

        <Link
          href="/customer/profile/info"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaVideo /> <span>Demo Video List</span>
        </Link>

        <Link
          href="/customer/profile/info"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaHistory /> <span>Session History</span>
        </Link>

        <Link
          href="/customer/profile/info"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaFire /> <span>My Steak</span>
        </Link>

        <Link
          href="/customer/profile/info"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaUser /> <span>Profile</span>
        </Link>

        <Link
          href="/customer/page/support"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaPhoneAlt /> <span>Contact</span>
        </Link>

        <Link
          href="/customer/page/support"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaHeadset /> <span>Support</span>
        </Link>

        <Link
          href="/customer/dashboard"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaCog  /> <span>Setting</span>
        </Link>

        <Link
          href="/customer/dashboard"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white"
        >
          <FaUserTie  /> <span>My Doach</span>
        </Link>

        <Link
          href="/customer/dashboard"
          className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded no-underline text-white"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </Link>
      </nav>
    </aside>
  );
}

