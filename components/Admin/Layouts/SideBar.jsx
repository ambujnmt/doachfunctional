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
  FaCreditCard,
  FaUserCheck,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar({ menuOpen }) {
  const router = useRouter();
  const currentPath = router.pathname; // current route

  const menuItems = [
    { name: "Dashboard", icon: <FaHome className="text-yellow-400"/>, href: "/administor/dashboard" },
    { name: "Customers", icon: <FaUsers className="text-yellow-400" />, href: "/administor/customer/listing" },
    { name: "Event", icon: <FaStar className="text-yellow-400" />, href: "/administor/event/listing" },
    { name: "Stories", icon: <FaBookOpen className="text-yellow-400" />, href: "/administor/stories/listing" },
    { name: "Brands", icon: <FaTag className="text-yellow-400" />, href: "/administor/brand/listing" },
    { name: "Coaches", icon: <FaChalkboardTeacher className="text-yellow-400" />, href: "/administor/coach/listing" },
    { name: "Community", icon: <FaComments className="text-yellow-400" />, href: "/administor/community/listing" },
    { name: "Event Contests", icon: <FaTrophy className="text-yellow-400" />, href: "/administor/eventContests/listing" },
    { name: "Pages", icon: <FaListAlt className="text-yellow-400" />, href: "/administor/pages/dynamic" },
    { name: "Support", icon: <FaHeadset className="text-yellow-400" />, href: "/administor/pages/support" },
    { name: "Subscription", icon: <FaCreditCard className="text-yellow-400" />, href: "/administor/subscription/listing" },
    { name: "Subscribed", icon: <FaUserCheck className="text-yellow-400" />, href: "/administor/customer/subscribedCustomer" },
    { name: "Settings", icon: <FaCog className="text-yellow-400" />, href: "/administor/settings/configration" },
  ];

  return (
    <aside
      className={`bg-[#1f2937] text-gray-100 w-64 py-3 px-2
        fixed top-16 left-0 h-[calc(100vh-4rem)] transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col justify-between shadow-xl overflow-y-auto`}
    >
      <div>
        <nav className="flex flex-col space-y-1.5 mt-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 p-2 rounded-md transition no-underline ${
                currentPath === item.href
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-gray-700 text-gray-200"
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
