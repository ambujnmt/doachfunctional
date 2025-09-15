"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { FaTiktok, FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { getDynamicPageList } from "../../utils/fetchApi";

export default function HomeFooter() {
  const [footerPages, setFooterPages] = useState([]);

useEffect(() => {
  const fetchPages = async () => {
    try {
      const pages = await getDynamicPageList();
      const footerOnly = pages.filter((p) => p.type === "home_page");
      setFooterPages(footerOnly);
    } catch (err) {
      console.error("Failed to load footer pages:", err.message);
    }
  };
  fetchPages();
}, []);

    return (
        <>
            <footer className="pt-10 pb-3 mt-[100px]">
                <Container maxWidth="lg">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 xl:col-span-3 md:col-span-6 lg:col-span-3">
                            <div className="text-left">
                                <div className="text-2xl font-extrabold text-yellow-400">
                                    <Link href="/">
                                    <img src="https://nmtdevserver.com/doach/logo.png" alt="image" className='w-[50%] h-auto mb-4' />
                                    </Link>
                                </div>
                                <div className="text-black text-[15px] font-bold no-underline text-white">
                                    <Link className="no-underline text-white" href="/shop">Shop</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold no-underline text-white">
                                    <Link className="no-underline text-white" href="/company">Company</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold no-underline text-white">
                                    <Link className="no-underline text-white" href="/media">Media</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold no-underline text-white">
                                    <Link className="no-underline text-white" href="/careers">Careers</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold no-underline text-white">
                                    <Link className="no-underline text-white" href="/contactUs">Contact Us</Link>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic footer pages */}
                        <div className="col-span-12 xl:col-span-5 md:col-span-6 lg:col-span-5">
                            <div className="text-left xl:mt-12 mt-0">
                            {footerPages.length > 0 ? (
                                footerPages.map((page) => (
                                <div key={page.id}>
                                    <Link
                                    className="block text-white font-bold text-[15px] no-underline"
                                    href={`/dynamicPage?id=${page.slug}`}
                                    >
                                    {page.title}
                                    </Link>
                                </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">Loading footer links...</p>
                            )}
                            </div>
                        </div>

                        <div className="col-span-4">
                            <div className="block">
                                <div className="flex xl:justify-end gap-3 mb-2">
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="Instagram">
                                        <FaFacebook className='text-white text-[28px]' />
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="Instagram">
                                        <FaInstagram className='text-white text-[28px]' />
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="Instagram">
                                        <FaLinkedin className='text-white text-[28px]' /> 
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="TikTok">
                                        <FaTiktok className='text-white text-[28px]' />
                                    </a>
                                </div>
                                <div className="flex xl:justify-end gap-3">
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="YouTube">
                                        <FaYoutube className='text-white text-[28px]' />
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="Instagram">
                                        <FaRegCommentAlt className='text-white text-[28px]' /> 
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="X">
                                        <FaXTwitter className='text-white text-[28px]' />
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="X">
                                        <IoLogoWhatsapp className='text-white text-[28px]' />
                                    </a>
                                </div>

                                {/* Android / ios image section */} 
                                <div className="grid grid-col-1 gap-4 mt-3">
                                    <div className="flex xl:justify-end lg:block xl:flex">
                                        <img src="https://nmtdevserver.com/doach/app-store-img.png" alt="image" className="xl:w-[40%] md:w-[60%] h-auto" />&nbsp;&nbsp;

                                        <img src="https://nmtdevserver.com/doach/google-play-img.png" alt="image" className="xl:w-[40%] md:w-[60%] h-auto" />
                                    </div>
                                </div> 
                                {/* // Android / ios image section */}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 mt-[80px]">
                        <p className='text-center text-white text-[13px] mb-0 font-bold pb-3'>@ DOACH, Inc. I website by Digital Flavers</p>
                    </div>
                </Container>
            </footer>
        </>
    )
}
