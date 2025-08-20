import React from "react";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

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
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaHome /> <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaUser /> <span>Profile</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Community</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Play List</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Contact</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Support</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Reviews</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaSignOutAlt /> <span>Logout</span>
        </a>
      </nav>
    </aside>
  );
}
