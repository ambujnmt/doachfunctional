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
  FaBookOpen,
  FaBriefcase,
  FaTag,
  FaChalkboardTeacher,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar({ menuOpen }) {
  const router = useRouter();

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
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaHome className="text-blue-500" /> <span>Dashboard</span>
          </Link>

          <Link
            href="/administor/customer/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaUsers className="text-green-500" /> <span>Customers</span>
          </Link>

          <Link
            href="/administor/event/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaStar className="text-pink-500" /> <span>Event</span>
          </Link>

          <Link
            href="/administor/stories/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaBookOpen className="text-indigo-500" /> <span>Stories</span>
          </Link>

          <Link
            href="/administor/brand/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaTag className="text-orange-500" /> <span>Brands</span>
          </Link>

          <Link
            href="/administor/coach/listing"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaChalkboardTeacher className="text-teal-500" /> <span>Coaches</span>
          </Link>

          <Link
            href="/community"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaComments className="text-purple-500" /> <span>Community</span>
          </Link>

          <Link
            href="/administor/pages/dynamic"
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition no-underline text-dark"
          >
            <FaListAlt className="text-yellow-500" /> <span>Pages</span>
          </Link>

          <Link
            href="/administor/pages/support"
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
      {/* <div className="mt-6">
        <button
          onClick={() => router.push("/logout")}
          className="flex items-center w-full space-x-3 text-left hover:bg-gray-100 p-3 rounded-lg transition"
        >
          <FaSignOutAlt className="text-gray-700" /> <span>Logout</span>
        </button>
      </div> */}
    </aside>
  );
}
