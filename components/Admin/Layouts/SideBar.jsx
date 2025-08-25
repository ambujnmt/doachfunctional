import React from "react";
import {FaHome,FaUser,FaCog,FaComments,FaHeadset,FaStar,FaSignOutAlt,FaUsers,FaListAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar({ menuOpen }) {
  const router = useRouter(); // ✅ Define router
  return (
    <aside
      className={`bg-white text-gray-800 w-64 py-6 px-4
        fixed top-16 left-0 h-[calc(100vh-4rem)] transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col justify-between shadow-xl overflow-y-auto`}
    >
      {/* --- Top Section --- */}
      <div>
        <div className="text-xl font-bold mb-6 text-gray-900 tracking-wide">
          Admin Panel
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          <Link
            href="/administor/dashboard"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaHome className="text-blue-500" /> <span>Dashboard</span>
          </Link>

          <Link
            href="/administor/customer/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaUsers className="text-green-500" /> <span>Customers</span>
          </Link>

          <Link
            href="/administor/event/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaStar className="text-pink-500" /> <span>Event</span>
          </Link>

          <Link
            href="/administor/stories/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaStar className="text-pink-500" /> <span>Stories</span>
          </Link>

          <Link
            href="/administor/brand/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaStar className="text-pink-500" /> <span>Brands</span>
          </Link>

          <Link
            href="/administor/coach/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaStar className="text-pink-500" /> <span>Coaches</span>
          </Link>

          <Link
            href="/community"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaComments className="text-purple-500" /> <span>Community</span>
          </Link>

          <Link
            href="/playlist"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaListAlt className="text-yellow-500" /> <span>Playlists</span>
          </Link>

          <Link
            href="/support"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaHeadset className="text-red-500" /> <span>Support</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <FaCog className="text-gray-600" /> <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* --- Bottom Section --- */}
    </aside>
  );
}
