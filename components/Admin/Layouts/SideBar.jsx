import React from "react";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaComments,
  FaTrophy,
  FaHeadset,
  FaStar,
  FaListAlt,
  FaBookOpen,
  FaTag,
  FaChalkboardTeacher,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar({ menuOpen }) {
  const router = useRouter();
  const currentPath = router.pathname; // current route

  const menuItems = [
    { name: "Dashboard", icon: <FaHome className="text-blue-500" />, href: "/administor/dashboard" },
    { name: "Customers", icon: <FaUsers className="text-green-500" />, href: "/administor/customer/listing" },
    { name: "Event", icon: <FaStar className="text-pink-500" />, href: "/administor/event/listing" },
    { name: "Stories", icon: <FaBookOpen className="text-indigo-500" />, href: "/administor/stories/listing" },
    { name: "Brands", icon: <FaTag className="text-orange-500" />, href: "/administor/brand/listing" },
    { name: "Coaches", icon: <FaChalkboardTeacher className="text-teal-500" />, href: "/administor/coach/listing" },
    { name: "Community", icon: <FaComments className="text-purple-500" />, href: "/administor/dashboard" },
    { name: "Event Contests", icon: <FaTrophy className="text-yellow-500" />, href: "/administor/eventContests/listing" },
    { name: "Pages", icon: <FaListAlt className="text-yellow-500" />, href: "/administor/pages/dynamic" },
    { name: "Support", icon: <FaHeadset className="text-red-500" />, href: "/administor/pages/support" },
    { name: "Settings", icon: <FaCog className="text-gray-600" />, href: "/administor/settings/configration" },
  ];

  return (
    <aside
      className={`bg-white text-gray-800 w-64 py-4 px-3
        fixed top-16 left-0 h-[calc(100vh-4rem)] transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col justify-between shadow-xl overflow-y-auto`}
    >
      <div>
        {/* <div className="text-xl font-bold mb-5 text-gray-900 tracking-wide">
          Admin Panel
        </div> */}

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2.5 p-2.5 rounded-lg transition no-underline ${
                currentPath === item.href
                  ? "bg-gray-200 font-semibold text-black"
                  : "hover:bg-gray-100 text-dark"
              }`}
            >
              {item.icon} <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
