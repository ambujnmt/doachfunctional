import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../../HomePage/HamburgerMenu';
import HomeFooter from '../../HomePage/HomeFooter';
import Container from "@mui/material/Container";
import { eventHomePage } from "../../../utils/fetchApi";

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // Store clicked event
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };

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
                                        <div 
                                            className="bg-[#FFC32B] rounded-3xl cursor-pointer"
                                            onClick={() => openModal(event)} // Open modal on click
                                        >
                                            <img 
                                                src={event.event_image || 'https://via.placeholder.com/400x250'} 
                                                alt={event.title} 
                                                className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl" 
                                            />
                                            <div className="p-3">
                                                <h5 className="text-black text-[18px] font-semibold mb-1">{event.event_name}</h5>
                                                <p className="text-gray-800 mb-2">{event.date || event.created_at?.split("T")[0]}</p>
                                                <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
                                                    {event.description}
                                                </p>
                                                <span className="flex justify-end text-[14px] font-medium text-black">
                                                    {event.readTime || "2 min. read"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-12 text-center text-white">No events found.</p>
                            )}
                        </div>
                    </section>

                    {/* Modal */}
                    {isModalOpen && selectedEvent && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 relative">
                                <button 
                                    className="absolute top-4 right-4 text-5xl font-bold text-white bg-black/50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
                                    onClick={closeModal}
                                >
                                    &times;
                                </button>
                                <h2 className="text-2xl font-bold mb-4">{selectedEvent.event_name}</h2>
                                <img 
                                    src={selectedEvent.event_image || 'https://via.placeholder.com/400x250'} 
                                    alt={selectedEvent.title} 
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                />
                                <p className="text-gray-800 mb-2">{selectedEvent.date || selectedEvent.created_at?.split("T")[0]}</p>
                                <p className="text-gray-700">{selectedEvent.description}</p>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <HomeFooter />
                </Container>
            </section>
        </div>
    )
}
