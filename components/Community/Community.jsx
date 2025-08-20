import React from 'react';
import HamburgerMenu from '../HomePage/HamburgerMenu';
import HomeFooter from '../HomePage/HomeFooter';
import Container from "@mui/material/Container";



export default function Community() {
    return (
        <>
            <div className="custom-gradient">  

                {/* Hamburger Menu */}
                <HamburgerMenu />
                {/* // Hamburger Menu */}

                <div className="custom-gradient">
                    <section id="nftc" className="py-24">
                        <Container maxWidth="lg">
                            <h3 className="text-3xl text-center font-bold text-white mb-8">Community</h3>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        <img
                                            src="https://blog.playo.co/wp-content/uploads/2017/03/football-shots-you-need-to-know.jpg"
                                            alt="Basketball Drill"
                                            className="w-full h-[280px] object-cover"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-gray-800 bg-opacity-40"></div>

                                        {/* Text */}
                                        <div className="absolute top-5 left-3 text-white font-semibold text-[28px] leading-tight">
                                            Shooting
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        <img
                                            src="https://www.thefa.com/-/media/education-hub/articles/how-to-defend-like-england-transition---article-header-1.ashx"
                                            alt="Basketball Drill"
                                            className="w-full h-[280px] object-cover"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-gray-800 bg-opacity-40"></div>

                                        {/* Text */}
                                        <div className="absolute top-5 left-3 text-white font-semibold text-[28px] leading-tight">
                                            Defending
                                        </div>
                                    </div>
                                </div> 
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        <img
                                            src="https://d3rqy6w6tyyf68.cloudfront.net/AcuCustom/Sitename/DAM/128/scw106-whatispassing-p6_Thumb.png"
                                            alt="Basketball Drill"
                                            className="w-full h-[280px] object-cover"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-gray-800 bg-opacity-40"></div>

                                        {/* Text */}
                                        <div className="absolute top-5 left-3 text-white font-semibold text-[28px] leading-tight">
                                            Passing
                                        </div>
                                    </div>
                                </div> 
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        <img
                                            src="https://revolutionbasketballtraining.com/wp-content/uploads/2023/07/Mastering-Ball-Handling-Skills-for-Basketball-Players.jpg"
                                            alt="Basketball Drill"
                                            className="w-full h-[280px] object-cover"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-gray-800 bg-opacity-40"></div>

                                        {/* Text */}
                                        <div className="absolute top-5 left-3 text-white font-semibold text-[28px] leading-tight">
                                           Ballhandling
                                        </div>
                                    </div>
                                </div> 
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        <img
                                            src="https://revolutionbasketballtraining.com/wp-content/uploads/2024/03/Rebounding-Workouts_-Techniques-for-Dominating-the-Boards.jpg"
                                            alt="Basketball Drill"
                                            className="w-full h-[280px] object-cover"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-gray-800 bg-opacity-40"></div>

                                        {/* Text */}
                                        <div className="absolute top-5 left-3 text-white font-semibold text-[28px] leading-tight">
                                            Rebounding
                                        </div>
                                    </div>
                                </div> 
                                <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        {/* Background Image */}
                                        <img
                                            src="https://www.breakthroughbasketball.com/drills/graphics/shooting-ballhandling-workout.jpg"
                                            alt="Basketball Drill"
                                            className="w-full h-[280px] object-cover"
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-gray-800 bg-opacity-40"></div>

                                        {/* Text */}
                                        <div className="absolute top-5 left-3 text-white font-semibold text-[28px] leading-tight">
                                            Coaching
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                            {/* <p className='mt-5 text-[20px] font-bold text-center mb-3 text-white'> Customize Your Home Screen </p> */}
                            <div className="flex justify-center mt-5">
                                <button type='button' className='bg-black text-white px-5 py-2 rounded-lg hover:!bg-[#FFC32B] duration-300 hover:!text-black border border-black'>
                                    Next
                                </button>
                            </div>
                        </Container>
                    </section>


                    <HomeFooter />
                </div>
            </div>
        </>
    )
}
