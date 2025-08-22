import React from "react";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
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
      <div className="text-2xl font-bold mb-2 sticky top-0 bg-gray-800 z-10 py-3">
        Dashboard
      </div>

      <nav className="flex flex-col space-y-4">
        <Link href="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white">
          <FaHome /> <span>Home</span>
        </Link>
        <Link href="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white">
          <FaUser /> <span>Profile</span>
        </Link>
        <Link href="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white">
          <FaCog /> <span>Community</span>
        </Link>
        <Link href="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white">
          <FaCog /> <span>Play List</span>
        </Link>
        <Link href="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white">
          <FaCog /> <span>Contact</span>
        </Link>
        <Link href="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white">
          <FaCog /> <span>Support</span>
        </Link>
        <Link href="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white">
          <FaCog /> <span>Reviews</span>
        </Link>
        <Link href="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded no-underline text-white">
          <FaSignOutAlt /> <span>Logout</span>
        </Link>
      </nav>
    </aside>
  );
}
