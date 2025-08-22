import React from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaComments,
  FaHeadset,
  FaStar,
  FaSignOutAlt,
  FaUsers,
  FaListAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function SideBar({ menuOpen }) {
  return (
    <aside
      className={`bg-white text-gray-800 w-64 py-6 px-4
        fixed top-16 left-0 h-[calc(100vh-4rem)] transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col justify-between shadow-xl`}
    >
      {/* --- Top Section --- */}
      <div>
        {/* Sidebar Title */}
        <div className="text-xl font-bold mb-6 text-gray-900 tracking-wide no-underline text-dark">
          Admin Panel
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaHome className="text-blue-500" /> <span>Dashboard</span>
          </Link>

          <Link
            href="/users"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaUsers className="text-green-500" /> <span>Users</span>
          </Link>

          <Link
            href="/community"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaComments className="text-purple-500" /> <span>Community</span>
          </Link>

          <Link
            href="/playlist"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaListAlt className="text-yellow-500" /> <span>Playlists</span>
          </Link>

          <Link
            href="/reviews"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaStar className="text-pink-500" /> <span>Reviews</span>
          </Link>

          <Link
            href="/support"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaHeadset className="text-red-500" /> <span>Support</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaCog className="text-gray-600" /> <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* --- Bottom Section --- */}
      <div className="border-t border-gray-200 pt-4">
        <Link
          href="/logout"
          className="flex items-center space-x-3 hover:bg-red-600 bg-red-500 p-3 rounded-lg text-dark transition"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
