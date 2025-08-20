import React from "react";
import Container from "@mui/material/Container";
import { Link } from "@heroui/react";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";

export default function ContactUs() {
    return (
        <>
            <div className="custom-gradient min-h-screen flex flex-col">
                {/* Hamburger Menu */}
                <HamburgerMenu />

                {/* Contact Section */}
                <section id="nftc" className="py-24 flex-grow">
                    <Container>
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-white">Get in touch</h3>
                            <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
                                Have questions or feedback? Fill out the form below and we’ll
                                get back to you as soon as possible.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-10">
                            <form className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Your full name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        placeholder="Your address"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        placeholder="Your message"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC32B] focus:outline-none"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-[#FFC32B] hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Container>
                </section>

                {/* Footer section */}
                <HomeFooter />
            </div>
        </>
    );
}
