"use client";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";
import Container from "@mui/material/Container";
import { MdOutlineDateRange, MdAccessTime } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { eventContestAwardsHomePage } from "../../utils/fetchApi";

export default function Event() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await eventContestAwardsHomePage();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleRegisterClick = (id) => {
    setSelectedEventId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEventId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Form Data:", Object.fromEntries(formData.entries()));
    // send formData to backend via fetch/axios
    handleCloseModal();
  };

  return (
    <>
      <div className="custom-gradient">
        <HamburgerMenu />

        <section id="nftc" className="py-24">
          <Container maxWidth="lg">
            <h3 className="text-3xl text-center font-bold text-white mb-8">
              Events / Contests / Awards
            </h3>

            <div className="grid grid-cols-12 gap-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12"
                  >
                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={event.contest_image}
                        alt={event.contest_name}
                        className="w-full h-[280px] object-cover"
                      />
                      <div className="absolute inset-0 bg-[#000] bg-opacity-60"></div>

                      <div className="absolute top-[20%] left-3">
                        <h4 className="text-white font-semibold text-[28px] mb-2 leading-tight">
                          {event.contest_name}
                        </h4>
                        <p className="text-white text-[16px] mb-2 flex items-center">
                          <MdOutlineDateRange /> &nbsp;{" "}
                          {new Date(event.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-white text-[16px] mb-2 flex items-center">
                          <MdAccessTime /> &nbsp; {event.time?.slice(0, 5)}
                        </p>
                        <p className="text-white text-[16px] mb-3 flex items-center">
                          <IoLocationOutline /> &nbsp; {event.location}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRegisterClick(event.id)}
                          className="bg-[#FFC32B] text-black p-2 px-3 rounded-lg font-semibold hover:bg-[#000] hover:!text-white duration-300 capitalize"
                        >
                          register
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-white col-span-12">
                  No events found.
                </p>
              )}
            </div>
          </Container>
        </section>

        <HomeFooter />
      </div>

      {/* Modal */}
      {/* Modal */}
        {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity">
            <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-md text-white relative">
            <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-white text-xl font-bold"
            >
                &times;
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center">Sign Up for Challenge</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="event_id" value={selectedEventId} />

                <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                    type="text"
                    name="full_name"
                    required
                    className="w-full p-2 rounded border border-gray-600 bg-[#111] text-white"
                />
                </div>

                <div>
                <label className="block mb-1 font-medium">Age</label>
                <input
                    type="number"
                    name="age"
                    required
                    className="w-full p-2 rounded border border-gray-600 bg-[#111] text-white"
                />
                </div>

                <div>
                <label className="block mb-1 font-medium">Skill Level</label>
                <select
                    name="skill_level"
                    required
                    className="w-full p-2 rounded border border-gray-600 bg-[#111] text-white"
                >
                    <option value="">Select skill level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
                </div>

                <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full p-2 rounded border border-gray-600 bg-[#111] text-white"
                />
                </div>

                <button
                type="submit"
                className="w-full bg-[#FFC32B] text-black py-2 rounded font-semibold hover:bg-[#e0ac00] transition duration-300"
                >
                Sign Up
                </button>
            </form>
            </div>
        </div>
        )}

    </>
  );
}
