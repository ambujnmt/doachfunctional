 
import React from 'react';
import HamburgerMenu from '../HomePage/HamburgerMenu';
import HomeFooter from '../HomePage/HomeFooter';
import Container from "@mui/material/Container";
import { MdOutlineDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";


export default function Event() {
    return (
        <>
            <div className="custom-gradient">  

                {/* Hamburger Menu */}
                <HamburgerMenu />
                {/* // Hamburger Menu */}

                <div className="custom-gradient">
                    <section id="nftc" className="py-24">
                        <Container maxWidth="lg">
                            <h3 className="text-3xl text-center font-bold text-white mb-8">Events / Contests / Awards</h3>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        <img
                                            src="https://media.npr.org/assets/img/2023/12/17/gettyimages-1763761493-bb1ba6cc72bfc36364efed42eae5f704f253576c.jpg?s=1100&c=50&f=jpeg"
                                            alt="Basketball Drill"
                                            className="w-full h-[280px] object-cover"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-[#000] bg-opacity-60"></div>

                                        {/* Text */}
                                        <div className="absolute top-[20%] left-3">
                                            <h4 className='text-white font-semibold text-[28px] mb-2 leading-tight'>FIFA World Cup</h4>
                                            <p className='text-white text-[16px] leading-tight mb-2 flex items-center'><MdOutlineDateRange />&nbsp; 14 Aug 2025 </p>
                                            <p className='text-white text-[16px] leading-tight capitalize mb-2 flex items-center'><MdAccessTime />&nbsp; 11:30AM </p>
                                            <p className='text-white text-[16px] leading-tight capitalize mb-3 flex items-center'><IoLocationOutline />&nbsp; indira gandhi stadium delhi </p>
                                            <button type='button' className='bg-[#FFC32B] text-black p-2 px-3 rounded-lg font-semibold hover:bg-[#000] hover:!text-white duration-300 capitalize'>register</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        <img
                                            src="https://idsb.tmgrup.com.tr/ly/uploads/images/2020/04/14/30563.jpeg"
                                            className="w-full h-[280px] object-cover"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-[#000] bg-opacity-60"></div>

                                        {/* Text */}
                                        <div className="absolute top-[20%] left-3">
                                            <h4 className='text-white font-semibold text-[28px] mb-2 leading-tight'>FIFA World Cup</h4>
                                            <p className='text-white text-[16px] leading-tight mb-2 flex items-center'><MdOutlineDateRange />&nbsp; 14 Aug 2025 </p>
                                            <p className='text-white text-[16px] leading-tight capitalize mb-2 flex items-center'><MdAccessTime />&nbsp; 11:30AM </p>
                                            <p className='text-white text-[16px] leading-tight capitalize mb-3 flex items-center'><IoLocationOutline />&nbsp; indira gandhi stadium delhi </p>
                                            <button type='button' className='bg-[#FFC32B] text-black p-2 px-3 rounded-lg font-semibold hover:bg-[#000] hover:!text-white duration-300 capitalize'>register</button>
                                        </div>
                                    </div>
                                </div> 
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        <img
                                            src="https://t3.ftcdn.net/jpg/01/39/49/18/360_F_139491823_kY7QNZHEdsI0zYHB4nfq0WV2HNRGDhYo.jpg"
                                            alt="Basketball Drill"
                                            className="w-full h-[280px] object-cover"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-[#000] bg-opacity-60"></div>

                                        {/* Text */}
                                        <div className="absolute top-[20%] left-3">
                                            <h4 className='text-white font-semibold text-[28px] mb-2 leading-tight'>FIFA World Cup</h4>
                                            <p className='text-white text-[16px] leading-tight mb-2 flex items-center'><MdOutlineDateRange />&nbsp; 14 Aug 2025 </p>
                                            <p className='text-white text-[16px] leading-tight capitalize mb-2 flex items-center'><MdAccessTime />&nbsp; 11:30AM </p>
                                            <p className='text-white text-[16px] leading-tight capitalize mb-3 flex items-center'><IoLocationOutline />&nbsp; indira gandhi stadium delhi </p>
                                            <button type='button' className='bg-[#FFC32B] text-black p-2 px-3 rounded-lg font-semibold hover:bg-[#000] hover:!text-white duration-300 capitalize'>register</button>
                                        </div>
                                    </div>
                                </div> 
                            </div>   
                        </Container>
                    </section>


                    <HomeFooter />
                </div>
            </div>
        </>
    )
}
