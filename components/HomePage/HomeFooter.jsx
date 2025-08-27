import React from 'react';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaXTwitter, } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";  
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";


export default function HomeFooter() {
    return (
        <>
            <footer className="pt-10 pb-3 mt-[100px]">
                <Container maxWidth="lg">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 xl:col-span-3 md:col-span-6 lg:col-span-3">
                            <div className="text-left">
                                <div className="text-2xl font-extrabold text-yellow-400">
                                    <Link href="/">
                                    <img src="https://nmtdevserver.com/doach/black-logo.png" alt="image" className='w-[50%] h-auto mb-4' />
                                    </Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                    <Link href="/shop">Shop</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                    <Link href="/company">Company</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                    <Link href="/media">Media</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                    <Link href="/careers">Careers</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                    <Link href="/contactUs">Contact Us</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 xl:col-span-5 md:col-span-6 lg:col-span-5">
                            <div className="text-left">
                                <div className="xl:mt-12 mt-0"></div>
                                <div className="text-black text-[15px] font-bold">
                                     <Link href={`/dynamicPage?id=private-policy`}>Private Policy</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                     <Link href={`/dynamicPage?id=terms-and-conditions`}>Terms</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                     <Link href={`/dynamicPage?id=private-policy`}>Cookie Settings</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                     <Link href={`/dynamicPage?id=accessibility`}>Accessibility</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                     <Link href={`/dynamicPage?id=fraud-warning`}>Fraud Warning</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                     <Link href={`/dynamicPage?id=do-not-sell-or-share`}>Do Not Sell/Share My Personal Infomation</Link>
                                </div>
                                <div className="text-black text-[15px] font-bold">
                                     <Link href={`/dynamicPage?id=doach-circle-rules`}>DOACH Circle Rules</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-4">
                            <div className="block">
                                <div className="flex xl:justify-end gap-3 mb-2">
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="Instagram">
                                        <FaFacebook className='text-black text-[28px]' />
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="Instagram">
                                        <FaInstagram className='text-black text-[28px]' />
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="Instagram">
                                        <FaLinkedin className='text-black text-[28px]' /> 
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="TikTok">
                                        <FaTiktok className='text-black text-[28px]' />
                                    </a>
                                </div>
                                <div className="flex xl:justify-end gap-3">
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="YouTube">
                                        <FaYoutube className='text-black text-[28px]' />
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="Instagram">
                                        <FaRegCommentAlt className='text-black text-[28px]' /> 
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="X">
                                        <FaXTwitter className='text-black text-[28px]' />
                                    </a>
                                    <a className="w-10 h-10 rounded-full flex items-center justify-center hover:!bg-yellow-400 transition duration-300" href="#" aria-label="X">
                                        <IoLogoWhatsapp className='text-black text-[28px]' />
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
                        <p className='text-center text-black text-[13px] mb-0 font-bold pb-3'>@ DOACH, Inc. I website by Digital Flavers</p>
                    </div>
                </Container>
            </footer>
        </>
    )
}
