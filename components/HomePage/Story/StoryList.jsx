import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../../HomePage/HamburgerMenu';
import HomeFooter from '../../HomePage/HomeFooter';
import Container from "@mui/material/Container";
import { storiesHomePage } from "../../../utils/fetchApi";

export default function StoriesSection() {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchStories() {
            try {
                const data = await storiesHomePage();
                setStories(data);
            } catch (error) {
                console.error("Error fetching stories:", error);
            }
        }
        fetchStories();
    }, []);

    const openModal = (story) => {
        setSelectedStory(story);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedStory(null);
        setIsModalOpen(false);
    };

    return (
        <div className="custom-gradient"> 
            <section id="nftc" className="py-24">
                <Container maxWidth="lg">
                    <h3 className="text-3xl text-center font-bold text-white mb-8">All Stories</h3>

                    <HamburgerMenu />

                    <section className="event-sec">
                        <div className="grid grid-cols-12 gap-4">
                            {stories.length > 0 ? (
                                stories.slice(0, 3).map((story) => (
                                    <div 
                                        key={story.id} 
                                        className="col-span-12 xl:col-span-4 md:col-span-6 lg:col-span-4 cursor-pointer"
                                        onClick={() => openModal(story)}
                                    >
                                        <div className="bg-[#FFC32B] rounded-3xl">
                                            <img 
                                                src={story.story_image || 'https://via.placeholder.com/400x250'} 
                                                alt={story.story_title} 
                                                className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl" 
                                            />
                                            <div className="p-3">
                                                <h5 className="text-black text-[18px] font-semibold mb-1">{story.story_title}</h5>
                                                <p className="text-gray-800 mb-2">{story.date || story.created_at?.split("T")[0]}</p>
                                                <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
                                                    {story.description}
                                                </p>
                                                <span className="flex justify-end text-[14px] font-medium text-black">
                                                    {story.readTime || "2 min. read"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-12 text-center text-white">No stories found.</p>
                            )}
                        </div>
                    </section>

                    {/* Modal */}
                    {isModalOpen && selectedStory && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 relative">
                                <button 
                                    className="absolute top-4 right-4 text-5xl font-bold text-white bg-black/50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
                                    onClick={closeModal}
                                >
                                    &times;
                                </button>
                                <h2 className="text-2xl font-bold mb-4">{selectedStory.story_title}</h2>
                                <img 
                                    src={selectedStory.story_image || 'https://via.placeholder.com/400x250'} 
                                    alt={selectedStory.story_title} 
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                />
                                <p className="text-gray-800 mb-2">{selectedStory.date || selectedStory.created_at?.split("T")[0]}</p>
                                <p className="text-gray-700">{selectedStory.description}</p>
                                {selectedStory.link && (
                                    <a 
                                        href={selectedStory.link} 
                                        className="mt-4 inline-block text-blue-600 font-medium"
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Read Full Story
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
