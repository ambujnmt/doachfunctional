import React, { useEffect, useState, useRef } from "react";
import Container from "@mui/material/Container";
import { Link } from "@heroui/react";
import HamburgerMenu from "./HamburgerMenu";
import HomeFooter from "./HomeFooter"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import PartnersSlider from "./PartnersSlider";
import RotatingText from "./RotatingText";
import { eventHomePage, storiesHomePage, coachesHomePage  } from "../../utils/fetchApi";


// Event Card Component
const EventCard = ({ event, onClick }) => (
  <div className="bg-[#FFC32B] rounded-3xl" onClick={() => onClick(event)} >
    <img
      src={event.image || event.event_image} // adjust depending on API
      alt={event.event_name}
      className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl"
    />
    <div className="p-3">
      <h5 className="text-black text-[18px] font-semibold mb-1">{event.event_name}</h5>
      <p className="text-[14px] font-medium text-black mb-1">{event.date || event.created_at?.split("T")[0]}</p>
      <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
        {event.description || "No description available"}
      </p>
      <Link href="#" className="flex justify-end text-[14px] font-medium text-black">
        2 min. read
      </Link>
    </div>
  </div>
);

// Story Card Component
const StoryCard = ({ story, onClick }) => (
  <div className="bg-[#FFC32B] rounded-3xl" onClick={() => onClick(story)}>
    <img
      src={story.story_image || story.image} // adjust depending on API
      alt={story.title || story.story_name}
      className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl"
    />
    <div className="p-3">
      <h5 className="text-black text-[18px] font-semibold mb-1">{story.title || story.story_title}</h5>
      <p className="text-[14px] font-medium text-black mb-1">{story.date || story.created_at?.split("T")[0]}</p>
      <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
        {story.description || story.story_description || "No description available"}
      </p>
      <Link href="#" className="flex justify-end text-[14px] font-medium text-black">
        2 min. read
      </Link>
    </div>
  </div>
);

// Coach Card Component
const CoachCard = ({ coach, onClick }) => (
  <div className="bg-[#FFC32B] rounded-3xl" onClick={() => onClick(coach)}>
    <img
      src={coach.coach_image || coach.image} // adjust based on API
      alt={coach.specialization}
      className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl"
    />
    <div className="p-3">
      <h5 className="text-black text-[18px] font-semibold mb-1">{coach.specialization}</h5>
      <p className="text-[14px] font-medium text-black mb-1">{coach.date || coach.created_at?.split("T")[0]}</p>
      <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
        {coach.bio_data || "No description available"}
      </p>
      <Link href="#" className="flex justify-end text-[14px] font-medium text-black">
        2 min. read
      </Link>
    </div>
  </div>
);


export default function Home() {
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [age, setAge] = useState("");
  const [showParent, setShowParent] = useState(false);
  const signupFormRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [coaches, setCoaches] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const eventData = await eventHomePage();
      const storyData = await storiesHomePage();
      const coachData = await coachesHomePage();
      setEvents(eventData);
      setStories(storyData);
      setCoaches(coachData);
    };
    fetchData();
  }, []);

  // Close voice menu on click outside
  useEffect(() => {
    function handleClick(e) {
      const menu = document.getElementById("voiceMenu");
      const dot = document.getElementById("voiceDot");
      if (!menu || !dot) return;
      if (!menu.contains(e.target) && !dot.contains(e.target)) {
        setVoiceOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    // age -> parent consent
    const a = parseInt(age, 10);
    if (!isNaN(a) && a < 18) {
      setShowParent(true);
    } else {
      setShowParent(false);
    }
  }, [age]);

  // Intersection observer for simple reveal animations
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-item");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => {
      el.classList.add("opacity-0", "translate-y-6", "transition-all", "duration-600");
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  function toggleVoiceMenu() {
    setVoiceOpen((v) => !v);
  }

  function openSignupModal() {
    setModalOpen(true);
    setVoiceOpen(false);
    setTimeout(() => {
      // focus first input if exists
      const el = signupFormRef.current?.querySelector("input, select");
      el && el.focus();
    }, 100);
  }

  function closeSignupModal() {
    setModalOpen(false);
  }

  function downloadApp() {
    // replace with real redirect
    window.alert("Redirecting to app download...");
  }

  function aboutDoach() {
    window.alert(
      "DOACH is an AI-powered coaching platform that personalizes your training experience through advanced analytics and real-time feedback."
    );
  }

  function aboutNFTC() {
    window.alert(
      "The National Free Throw Challenge (NFTC) is a nationwide competition featuring AI-powered coaching and performance analytics."
    );
  }

  function submitSignup(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    // TODO: integrate Mailchimp/Twilio here
    window.alert("Thank you for signing up! You will receive an SMS with the app link shortly.");
    form.reset();
    setModalOpen(false);
  }

  function scrollToNext() {
    const el = document.getElementById("nftc");
    el && el.scrollIntoView({ behavior: "smooth" });
  }

  const states = [
    { key: "california", name: "California", count: 12 },
    { key: "texas", name: "Texas", count: 8 },
    { key: "florida", name: "Florida", count: 10 },
    { key: "newyork", name: "New York", count: 6 },
    { key: "illinois", name: "Illinois", count: 4 },
    { key: "georgia", name: "Georgia", count: 5 },
  ];
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const openEventModal = (event) => setSelectedEvent(event);
  const closeEventModal = () => setSelectedEvent(null);

  // Story
  const openStoryModal = (story) => setSelectedStory(story);
  const closeStoryModal = () => setSelectedStory(null);

  // Coach
  const openCoachModal = (coach) => setSelectedCoach(coach);
  const closeCoachModal = () => setSelectedCoach(null);

    return (
        <>
            {/* Hero section */}
            <section
                className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
                aria-label="Hero"
                style={{
                    fontFamily: "'Manrope', sans-serif",
                    backgroundImage: "url('https://nmtdevserver.com/doach/hero-img5.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >

                {/* Overlay */}
                {/* <div div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

                {/* Hamburger Menu */}
                <HamburgerMenu />
                {/* // Hamburger Menu */}

                {/* Hero content */}
                <div className="relative z-20 px-6 max-w-3xl hero-content"> 
                  <Link href="/">
                    <img src="https://nmtdevserver.com/doach/logo.png" alt="image" className="w-[500px] h-auto block m-auto" />
                  </Link>
                  
                  {/* RotatingText here */}
                  <RotatingText />
                  {/* // RotatingText here */}
                </div>


                {/* Android / ios image section */}
                <Container maxWidth="lg" className="mt-5">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <img src="https://nmtdevserver.com/doach/app-store-img.png" alt="image" className="xl:w-[35%] md:w-[60%] h-auto float-right" />
                    </div>
                    <div className="col-span-6">
                      <img src="https://nmtdevserver.com/doach/google-play-img.png" alt="image" className="xl:w-[35%] md:w-[60%] h-auto" />
                    </div>
                  </div>
                </Container>
                {/* // Android / ios image section */}


                {/* Scroll arrow */}
                {/* <div className="">
                    <button
                        onClick={scrollToNext}
                        aria-label="Scroll to event"
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#FFC32B] text-3xl animate-bounce z-20 xl:border !border-yellow-500 xl:w-[80px] xl:h-[80px] rounded-full"
                        >
                        ↓
                    </button>
                </div> */}
            </section>
            {/* // Hero section */}


            <div className="custom-gradient">
                {/* DOACH × CAVS Section */}
                <section id="nftc" className="py-24">
                    <Container maxWidth="lg">
                      <div className="text-center px-4">
                        <div className="grid text-center xl:flex lg:flex md:flex items-center justify-center mb-5">
                          <img src="https://nmtdevserver.com/doach/logo.png" alt="image" className="w-[300px]   h-auto doach-logo1" />
                          <AiOutlinePlus className="text-white text-[50px] font-bold mx-3 plus-icon" /> 
                          <img src="https://nmtdevserver.com/doach/cavs-logo.png" alt="image" className="w-[170px] h-auto cavs-logo" />
                          <h4 className="text-white text-[22px] xl:!text-left lg:!text-left md:!text-left text-center ml-5 capitalize font-thin leading-[20px] mt-5 md:!mt-0" style={{ fontFamily: "Bebas Neue, sans-serif;" }}> National <br /> free throw <br /> challenge  <br /> OCT 17 • 23 2025 </h4>
                        </div>


                        {/* Counter section here */}
                        <CountdownTimer />
                        {/* // Counter section here */}

                        <div className="mt-12">
                          <button
                              onClick={openSignupModal}
                              className="px-8 py-[12px] bg-[#FFC32B] text-black rounded-full font-semibold shadow-md hover:bg-yellow-300 transition"
                          >
                              Sign Up for Challenge
                          </button>
                        </div>



                        {/* Android / ios image section */}
                        <Container maxWidth="lg" className="mt-5">
                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6">
                              <img src="https://nmtdevserver.com/doach/app-store-img.png" alt="image" className="w-[35%] h-auto float-right" />
                            </div>
                            <div className="col-span-6">
                              <img src="https://nmtdevserver.com/doach/google-play-img.png" alt="image" className="w-[35%] h-auto" />
                            </div>
                          </div>
                        </Container>
                        {/* // Android / ios image section */}



                        {/* Partners section */} 
                        <PartnersSlider /> 
                        {/* // Partners section */} 
 
                      </div>
                    </Container>
                </section>
                {/* // DOACH × CAVS Section */}


                {/* Events section */}
                <section className="event-sec">
                    <Container>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-white text-[22px] font-bold">Events</h4>
                        <Link
                          href="/event/listing" // replace with your actual events page route
                          className="px-4 py-2 bg-[#FFC32B] text-black font-semibold rounded-md hover:bg-yellow-300 transition"
                        >
                          View All
                        </Link>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        {events.length > 0 ? (
                          events.slice(0, 3).map((event) => (
                            <div key={event.id} className="col-span-12 xl:col-span-4 md:col-span-6 lg:col-span-4">
                             <EventCard event={event} onClick={openEventModal} />
                            </div>
                          ))
                        ) : (
                          <p className="col-span-12 text-white">No events available.</p>
                        )}
                      </div>
                    </Container>
                </section>
                {/* // Event section */}


                {/* Stories section */}
                <section className="event-sec mt-5">
                  <Container>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-white text-[22px] font-bold">Stories</h4>
                        <Link
                          href="/story/listing" // replace with your actual events page route
                          className="px-4 py-2 bg-[#FFC32B] text-black font-semibold rounded-md hover:bg-yellow-300 transition"
                        >
                          View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                      {stories.length > 0 ? (
                        stories.slice(0, 3).map((story) => (
                          <div key={story.id} className="col-span-12 xl:col-span-4 md:col-span-6 lg:col-span-4">
                            <StoryCard story={story} onClick={openStoryModal} />
                          </div>
                        ))
                      ) : (
                        <p className="col-span-12 text-white">No stories available.</p>
                      )}
                    </div>
                  </Container>
                </section>
                {/* // Stories section */}


                {/* Coaches Section */}
                  <section className="event-sec mt-5">
                    <Container>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-white text-[22px] font-bold">Coaches</h4>
                        <Link
                          href="/coach/listing" // replace with your actual events page route
                          className="px-4 py-2 bg-[#FFC32B] text-black font-semibold rounded-md hover:bg-yellow-300 transition"
                        >
                          View All
                        </Link>
                      </div>
                      <div className="grid grid-cols-12 gap-4">
                        {coaches.length > 0 ? (
                          coaches.slice(0, 3).map((coach) => (
                            <div key={coach.id} className="col-span-12 xl:col-span-4 md:col-span-6 lg:col-span-4">
                              <CoachCard coach={coach} onClick={openCoachModal} />
                            </div>
                          ))
                        ) : (
                          <p className="col-span-12 text-white">No coaches available.</p>
                        )}
                      </div>
                    </Container>
                  </section>
                {/* // Coaches section */}


                <div className="mt-12 flex justify-center">
                  <button
                    onClick={openSignupModal}
                    className="px-8 py-[12px] bg-[#FFC32B] text-black rounded-full font-semibold shadow-md hover:bg-yellow-300 transition"
                  >
                    View Challenge
                  </button>
                </div>

                {/* Footer */}
                <HomeFooter />
                {/* // Footer */}
            </div>



            {/* Sign Up for Challenge Modal */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity ${
                modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!modalOpen}
            >
                <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md relative">
                    <button
                        aria-label="Close signup"
                        onClick={closeSignupModal}
                        className="absolute top-4 right-4 text-2xl text-[#FFC32B]"
                    >
                        &times;
                    </button>

                    <h3 className="text-xl font-bold text-[#FFC32B] mb-4">Sign Up for Challenge</h3> 
                    <form ref={signupFormRef} id="signupForm" onSubmit={submitSignup} className="space-y-4">
                        <div>
                        <label className="block text-sm font-medium mb-1 text-white">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:border-[#FFC32B] outline-none text-white"
                        />
                        </div>

                        <div>
                        <label className="block text-sm font-medium mb-1 text-white">Age</label>
                        <input
                            name="age"
                            id="ageInput"
                            type="number"
                            min="1"
                            max="120"
                            required
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:border-[#FFC32B] outline-none text-white"
                        />
                        </div>

                        {showParent && (
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Parent/Guardian Email</label>
                            <input
                            name="parentEmail"
                            type="email"
                            required={showParent}
                            className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:border-[#FFC32B] outline-none text-white"
                            />
                        </div>
                        )}

                        <div>
                        <label className="block text-sm font-medium mb-1 text-white">Skill Level</label>
                        <select name="skillLevel" required className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white">
                            <option className="text-black" value="">Select skill level</option>
                            <option className="text-black" value="beginner">Beginner</option>
                            <option className="text-black" value="intermediate">Intermediate</option>
                            <option className="text-black" value="advanced">Advanced</option>
                            <option className="text-black" value="professional">Professional</option>
                        </select>
                        </div>

                        <div>
                        <label className="block text-sm font-medium mb-1 text-white">Phone Number</label>
                        <input
                            name="phone"
                            type="tel"
                            required
                            className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:border-[#FFC32B] outline-none text-white"
                        />
                        </div>

                        <button type="submit" className="w-full py-2 bg-[#FFC32B] text-black rounded-md font-semibold hover:bg-yellow-300">
                        Sign Up
                        </button>
                    </form>
                </div>
            </div>


            {/* Event Modal */}

            {selectedEvent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="bg-white rounded-2xl p-6 relative">
                  {/* Close Button */}
                  <button
                    onClick={closeEventModal}
                    className="absolute top-4 right-4 text-5xl font-bold text-white bg-black/50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
                  >
                    &times;
                  </button>

                  {/* Event Content */}
                  <img
                    src={selectedEvent.image || selectedEvent.event_image}
                    alt={selectedEvent.event_name}
                    className="w-full h-[250px] object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2 text-black">
                    {selectedEvent.event_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedEvent.date || selectedEvent.created_at?.split("T")[0]}
                  </p>
                  <p className="text-gray-800">
                    {selectedEvent.description || "No description available"}
                  </p>
                </div>
              </div>
              )}

            {/*  story Modal */}
            {selectedStory && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="bg-white rounded-2xl p-6 relative">
                  {/* Close Button */}
                  <button
                    onClick={closeStoryModal}
                    className="absolute top-4 right-4 text-5xl font-bold text-white bg-black/50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
                  >
                    &times;
                  </button>

                  {/* Story Content */}
                  <img
                    src={selectedStory.story_image || selectedStory.image}
                    alt={selectedStory.title || selectedStory.story_name}
                    className="w-full h-[250px] object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2 text-black">
                    {selectedStory.title || selectedStory.story_title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedStory.date || selectedStory.created_at?.split("T")[0]}
                  </p>
                  <p className="text-gray-800">
                    {selectedStory.description || selectedStory.story_description || "No description available"}
                  </p>
                </div>
              </div>
            )}

           {/*  coach Modal */}
            {selectedCoach && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                <div className="bg-white rounded-2xl p-6 relative">
                  {/* Close Button */}
                  <button
                    onClick={closeCoachModal}
                    className="absolute top-4 right-4 text-5xl font-bold text-white bg-black/50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
                  >
                    &times;
                  </button>

                  {/* Coach Content */}
                  <img
                    src={selectedCoach.coach_image || selectedCoach.image}
                    alt={selectedCoach.specialization}
                    className="w-full h-[250px] object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2 text-black">
                    {selectedCoach.specialization}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedCoach.date || selectedCoach.created_at?.split("T")[0]}
                  </p>
                  <p className="text-gray-800">
                    {selectedCoach.bio_data || "No description available"}
                  </p>
                </div>
              </div>
            )}

            {/* end modal */}

            {/* Sign Up for Challenge Modal */}

            {/* Simple additional CSS for marquee animation (Tailwind doesn't include keyframes here) */}
            <style>{`
                @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                display: flex;
                gap: 2.5rem;
                align-items: center;
                animation: marquee 20s linear infinite;
                }
            `}</style>
        </>
    );
}
