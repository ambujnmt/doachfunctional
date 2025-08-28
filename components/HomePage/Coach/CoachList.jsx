import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../../HomePage/HamburgerMenu';
import HomeFooter from '../../HomePage/HomeFooter';
import Container from "@mui/material/Container";
import { coachesHomePage } from "../../../utils/fetchApi";

export default function CoachList() {
    const [coaches, setCoaches] = useState([]);
    const [selectedCoach, setSelectedCoach] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = (coach) => {
        setSelectedCoach(coach);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCoach(null);
        setIsModalOpen(false);
    };

    return (
        <div className="custom-gradient"> 
            <section id="nftc" className="py-24">
                <Container maxWidth="lg">
                    <h3 className="text-3xl text-center font-bold text-white mb-8">Coaches</h3>

                    <HamburgerMenu />

                    <section className="event-sec">
                        <div className="grid grid-cols-12 gap-4">
                            {coaches.length > 0 ? (
                                coaches.map((coach) => (
                                    <div 
                                        key={coach.id} 
                                        className="col-span-12 xl:col-span-4 md:col-span-6 lg:col-span-4 cursor-pointer"
                                        onClick={() => openModal(coach)} // Open modal on click
                                    >
                                        <div className="bg-[#FFC32B] rounded-3xl">
                                            <img 
                                                src={coach.coach_image || 'https://via.placeholder.com/400x250'} 
                                                alt={coach.name} 
                                                className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl" 
                                            />
                                            <div className="p-3">
                                                <h5 className="text-black text-[18px] font-semibold mb-1">{coach.name}</h5>
                                                <p className="text-[14px] font-medium text-black mb-1">{coach.speciality}</p>
                                                <p className="text-gray-800 mb-2">{coach.date || coach.created_at?.split("T")[0]}</p>
                                                <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
                                                    {coach.bio_data}
                                                </p>
                                                <span className="flex justify-end text-[14px] font-medium text-black">
                                                    View Profile
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-12 text-center text-white">No coaches found.</p>
                            )}
                        </div>
                    </section>

                    {/* Modal */}
                    {isModalOpen && selectedCoach && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 relative">
                                <button 
                                    className="absolute top-4 right-4 text-5xl font-bold text-white bg-black/50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
                                    onClick={closeModal}
                                >
                                    &times;
                                </button>
                                <h2 className="text-2xl font-bold mb-4">{selectedCoach.name}</h2>
                                <img 
                                    src={selectedCoach.coach_image || 'https://via.placeholder.com/400x250'} 
                                    alt={selectedCoach.name} 
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                />
                                <p className="text-gray-800 mb-2">{selectedCoach.speciality}</p>
                                <p className="text-gray-800 mb-2">{selectedCoach.date || selectedCoach.created_at?.split("T")[0]}</p>
                                <p className="text-gray-700">{selectedCoach.bio_data}</p>
                                {selectedCoach.profileLink && (
                                    <a 
                                        href={selectedCoach.profileLink} 
                                        className="mt-4 inline-block text-blue-600 font-medium"
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        View Full Profile
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    <HomeFooter />
                </Container>
            </section>
        </div>
    )
}
