import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../../HomePage/HamburgerMenu';
import HomeFooter from '../../HomePage/HomeFooter';
import Container from "@mui/material/Container";
import { Link } from "@heroui/react";
import { eventHomePage } from "../../../utils/fetchApi";

export default function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await eventHomePage();
                setEvents(data); // Set API data
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }
        fetchEvents();
    }, []);

    return (
        <div className="custom-gradient"> 
            <section id="nftc" className="py-24">
                <Container maxWidth="lg">
                    <h3 className="text-3xl text-center font-bold text-white mb-8">All Events</h3>

                    {/* Hamburger Menu */}
                    <HamburgerMenu />

                    {/* Events section */}
                    <section className="event-sec">
                        <div className="grid grid-cols-12 gap-4">
                            {events.length > 0 ? (
                                events.slice(0, 200).map((event) => (
                                    <div key={event.id} className="col-span-12 xl:col-span-4 md:col-span-6 lg:col-span-4">
                                        <div className="bg-[#FFC32B] rounded-3xl">
                                            <img 
                                                src={event.event_image || 'https://via.placeholder.com/400x250'} 
                                                alt={event.title} 
                                                className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl" 
                                            />
                                            <div className="p-3">
                                                <h5 className="text-black text-[18px] font-semibold mb-1">{event.title}</h5>
                                                <p className="text-[14px] font-medium text-black mb-1">{event.date}</p>
                                                <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
                                                    {event.description}
                                                </p>
                                                <Link href="#" className="flex justify-end text-[14px] font-medium text-black">
                                                    {event.readTime || "2 min. read"}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-12 text-center text-white">No events found.</p>
                            )}
                        </div>

                        {/* View All button */}
                    </section>

                    {/* Footer */}
                    <HomeFooter />
                </Container>
            </section>
        </div>
    )
}
