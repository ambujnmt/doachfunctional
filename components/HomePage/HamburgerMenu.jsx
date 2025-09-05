import { useState ,useEffect } from "react";
import { Link } from "@heroui/react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function YellowCircleMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [])

  const handleLogout = () => {
      Swal.fire({
        title: "Logout?",
        text: "You will be logged out of your admin account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("authToken");
          Swal.fire({
            title: "Logged Out",
            text: "Your session has ended.",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
          setTimeout(() => router.push("/login"), 1500);
        }
      });
    };

  return (
    <>
      {/* Hamburger Button */}
      {!menuOpen && (
        <button
          onClick={toggleMenu}
          aria-label="Open menu"
          className="fixed top-6 left-6 z-50 flex flex-col justify-between w-8 h-6 cursor-pointer"
        >
          <span className="block w-full h-[3px] bg-[#FFC32B] rounded"></span>
          <span className="block w-full h-[3px] bg-[#FFC32B] rounded"></span>
          <span className="block w-full h-[3px] bg-[#FFC32B] rounded"></span>
        </button>
      )}

      {/* Full-Screen Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-80 bg-black text-white z-40 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          aria-label="Close menu"
          className="absolute top-6 left-6 text-white text-2xl font-bold"
        >
          ✕
        </button>

        <div className="space-y-6 mt-16">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="block px-3 py-3 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
              >
                Login
              </Link>
              <Link
                href="/signUp"
                className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
            <Link
              href="/customer/dashboard"
              className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
            >
              Dashboard
            </Link>

            <Link
              href="/customer/dashboard"
              className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
            >
              Unleash a Session
            </Link>

            <Link
              href="/customer/profile/info"
              className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
            >
              My Account
            </Link>

            <Link
              href="/subscription"
              className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
            >
              Member Ship
            </Link>
             </>
          )}

          <Link
              href="/event/listing"
              className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
            >
              DOACH Events
            </Link>

            <Link
            href="/community"
            className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
          >
            Community
          </Link>

          <Link
            href="/contests"
            className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
          >
            Challenge/Awards
          </Link>

          <Link
            href="#"
            className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
          >
            Download App
          </Link>

          <Link
            href="#"
            className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
          >
            MyDoach
          </Link>

          {isLoggedIn && (
            <Link
              onClick={handleLogout}
              className="block px-3 py-3 mt-0 rounded-md hover:bg-[#FFC32B]/10 cursor-pointer text-sm border-b !border-gray-700 text-left text-white hover:!text-[#FFC32B] leading-[15px]"
            >
              Logout
            </Link>
          )}
          
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
