import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Link } from '@heroui/react';
import HamburgerMenu from '../HomePage/HamburgerMenu';
import HomeFooter from '../HomePage/HomeFooter';
import { BsChevronRight } from "react-icons/bs";

export default function Onboarding() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div className="custom-gradient min-h-screen flex flex-col justify-between bg-black text-white">
                {/* Hamburger Menu */}
                <HamburgerMenu />

                {/* Main Content */}
                <Container maxWidth="sm" className="flex-grow flex flex-col items-center justify-center px-6 py-10 space-y-8">
                    
                    {/* Logo */}
                    <Link href='/'>
                        <img
                            src="https://nmtdevserver.com/doach/logo.png"
                            alt="DOACH Logo"
                            className="w-[40%] mx-auto"
                        />
                    </Link>

                    {!showForm && (
                        <>
                            {/* See what's poppin */}
                            <div className="w-full">
                                <Link
                                    href="#"
                                    className="flex items-center justify-between py-3 border-b border-gray-500 text-lg font-medium text-white"
                                >
                                    See what's poppin’
                                    <BsChevronRight size={20} />
                                </Link>
                            </div>

                            {/* Streak */}
                            <div className="w-full text-center space-y-2">
                                <p className="text-[22px] font-medium">Streak: 3 Days</p>
                                <hr className="border-b border-gray-500" />
                            </div>

                            {/* Customize Your Home Screen */}
                            <div className="w-full mb-5">
                                <Link
                                    href="#"
                                    className="flex items-center justify-between py-3 text-sm text-white"
                                >
                                    Customize Your Home Screen
                                    <BsChevronRight size={20} />
                                </Link>
                            </div>

                            {/* Mode Selection */}
                            <div className="w-full flex flex-col space-y-4 mt-4">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <span className="w-4 h-4 rounded-full border-2 border-yellow-400 bg-yellow-400"></span>
                                    <span className="text-base">Training Mode</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <span className="w-4 h-4 rounded-full border-2 border-white"></span>
                                    <span className="text-base">Community Mode</span>
                                </label>
                            </div>

                            {/* Start Drill Button */}
                            <button
                                onClick={() => setShowForm(true)}
                                className="w-[50%] bg-yellow-400 text-black rounded-full py-2 mt-10 text-lg font-semibold"
                            >
                                Start Drill
                            </button>
                        </>
                    )}

                    {showForm && (
                        <div className="w-full space-y-5 mt-5">
                            <p className="text-center text-lg font-medium">“Let’s build your profile”</p>

                            <input type="text" placeholder="What’s your name?" className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400" />
                            <input type="text" placeholder="How old are you?" className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400" />
                            <input type="text" placeholder="What is your position?" className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400" />
                            <input type="text" placeholder="What level you have you played at?" className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400" />
                            <input type="text" placeholder="What do you want to improve the most?" className="w-full px-4 py-2 rounded-md border border-gray-500 bg-transparent text-white placeholder-gray-400" />

                            {/* Next Button */}
                            <button className="w-[50%] bg-yellow-400 text-black rounded-full py-2 mt-5 text-lg font-semibold block mx-auto">
                                Next
                            </button>
                        </div>
                    )}
                </Container>

                {/* Footer */}
                <HomeFooter />
            </div>
        </>
    );
}
