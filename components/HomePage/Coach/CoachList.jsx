import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HamburgerMenu from '../../HomePage/HamburgerMenu';
import HomeFooter from '../../HomePage/HomeFooter';
import Container from "@mui/material/Container";
import { coachesHomePage } from "../../../utils/fetchApi";

export default function CoachList() {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        async function fetchCoaches() {
            try {
                const data = await coachesHomePage();
                setCoaches(data);
            } catch (error) {
                console.error("Error fetching coaches:", error);
            }
        }
        fetchCoaches();
    }, []);

    return (
        <div className="custom-gradient"> 
            <section id="nftc" className="py-24">
                <Container maxWidth="lg">
                    <h3 className="text-3xl text-center font-bold text-white mb-8">All Coaches</h3>

                    {/* Hamburger Menu */}
                    <HamburgerMenu />

                    {/* Coaches section */}
                    <section className="event-sec">
                        <div className="grid grid-cols-12 gap-4">
                            {coaches.length > 0 ? (
                                coaches.slice(0, 200).map((coach) => (
                                    <div 
                                        key={coach.id} 
                                        className="col-span-12 xl:col-span-4 md:col-span-6 lg:col-span-4"
                                    >
                                        <Link
                                            href={`/coach/${coach.slug}`}
                                            className="block bg-[#FFC32B] rounded-3xl cursor-pointer"
                                        >
                                            <img 
                                                src={coach.coach_image || 'https://via.placeholder.com/400x250'} 
                                                alt={coach.name} 
                                                className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl" 
                                            />
                                            <div className="p-3">
                                                <h5 className="text-black text-[18px] font-semibold mb-1 no-underline">{coach.name}</h5>
                                                <p className="text-[14px] font-medium text-black mb-1 no-underline">{coach.speciality}</p>
                                                <p className="text-gray-800 mb-2 no-underline">{coach.date || coach.created_at?.split("T")[0]}</p>
                                                <div className="no-underline overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
                                                    {coach.bio_data
                                                        ? coach.bio_data.replace(/<[^>]+>/g, "").substring(0, 50) + "..."
                                                        : ""}
                                                </div>
                                                <span className="flex justify-end text-[14px] font-medium text-black no-underline">
                                                    View Profile
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-12 text-center text-white">No coaches found.</p>
                            )}
                        </div>
                    </section>

                    {/* Footer */}
                    <HomeFooter />
                </Container>
            </section>
        </div>
    )
}
