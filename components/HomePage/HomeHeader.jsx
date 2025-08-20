'use client';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Link } from '@heroui/react'; 
import { IoMenu } from "react-icons/io5";
import { LiaTimesCircle } from "react-icons/lia";




export default function HomeHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-black shadow">
      <Container>
        <header className="flex items-center justify-between py-3">
          {/* Left Section: Logo + Nav + Notice */} 
          <Link href="/">
            <img src="https://nmtdevserver.com/doach/logo.png" alt="image" className='w-[150px] h-auto' />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-md xl:text-md font-normal">
            <Link href="/home" className='text-white'>Home</Link>
            <Link href="/aboutUs" className='text-white'>About Us</Link>
            <Link href="javascript:void(0);" className='text-white'>Contact Us</Link>
          </nav>  

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link href="/login" className="hover:underline text-white">
              Sign in
            </Link>
            <Link href="/signUp">
              <button className="text-white border border-gray-400 px-4 py-1 rounded hover:bg-black hover:text-white duration-300 transition">
                Sign up
              </button>
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <LiaTimesCircle className="w-6 h-6" /> : <IoMenu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-4 pb-4 pt-2 text-md font-normal">
            <Link href="javascript:void(0);" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/javascript:void(0);" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/javascript:void(0);" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link> 
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              Sign in
            </Link>
            <Link href="/signUp" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="border border-gray-400 px-4 py-1 rounded hover:bg-black hover:text-white duration-300 transition w-full text-left">
                Sign up
              </button>
            </Link>
          </nav>
        </div>
      </Container>
 

    </div>
  );
}
