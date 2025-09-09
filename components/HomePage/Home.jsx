"use client";
import React, { useEffect, useState, useRef } from "react";
import Container from "@mui/material/Container";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import HomeFooter from "./HomeFooter"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import PartnersSlider from "./PartnersSlider";
import RotatingText from "./RotatingText";
import { eventHomePage, storiesHomePage, coachesHomePage  } from "../../utils/fetchApi";

// Event Card
const EventCard = ({ event }) => (
  <Link href={`/event/${event.slug}`} className="block no-underline">
    <div className="bg-[#FFC32B] rounded-3xl cursor-pointer hover:shadow-lg transition">
      <img
        src={event.event_image || "/placeholder.jpg"}
        alt={event.event_name}
        className="w-full h-[250px] object-cover rounded-t-3xl"
      />
      <div className="p-3">
        <h5 className="text-black text-[18px] font-semibold mb-1 no-underline">{event.event_name}</h5>
        <p className="text-[14px] font-medium text-black mb-1 no-underline">{event.date || event.created_at?.split("T")[0]}</p>
        <p className="text-[14px] font-medium text-black mb-2 no-underline" style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {event.description?.replace(/<[^>]+>/g, "") || ""}
        </p>
        <p className="flex justify-end text-[14px] font-medium text-black no-underline">Read More</p>
      </div>
    </div>
  </Link>
);

// Story Card
const StoryCard = ({ story }) => (
  <Link href={`/story/${story.slug}`} className="block no-underline">
    <div className="bg-[#FFC32B] rounded-3xl cursor-pointer hover:shadow-lg transition">
      <img
        src={story.story_image || "/placeholder.jpg"}
        alt={story.story_title}
        className="w-full h-[250px] object-cover rounded-t-3xl"
      />
      <div className="p-3">
        <h5 className="text-black text-[18px] font-semibold mb-1 no-underline">{story.story_title}</h5>
        <p className="text-[14px] font-medium text-black mb-1 no-underline">{story.date || story.created_at?.split("T")[0]}</p>
        <p className="text-[14px] font-medium text-black mb-2 no-underline" style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {story.description?.replace(/<[^>]+>/g, "") || ""}
        </p>
        <p className="flex justify-end text-[14px] font-medium text-black no-underline">Read More</p>
      </div>
    </div>
  </Link>
);
// Coach Card
const CoachCard = ({ coach }) => (
  <Link href={`/coach/${coach.slug}`} className="block no-underline">
    <div className="bg-[#FFC32B] rounded-3xl cursor-pointer hover:shadow-lg transition">
      <img
        src={coach.coach_image || "/placeholder.jpg"}
        alt={coach.specialization}
        className="w-full h-[250px] object-cover rounded-t-3xl"
      />
      <div className="p-3">
        <h5 className="text-black text-[18px] font-semibold mb-1 no-underline">{coach.specialization}</h5>
        <p className="text-[14px] font-medium text-black mb-1 no-underline">{coach.date || coach.created_at?.split("T")[0]}</p>
        <p className="text-[14px] font-medium text-black mb-2 no-underline" style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {coach.bio_data?.replace(/<[^>]+>/g, "") || ""}
        </p>
        <p className="flex justify-end text-[14px] font-medium text-black no-underline">Read More</p>
      </div>
    </div>
  </Link>
);


export default function Home() {
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [age, setAge] = useState("");
  const [showParent, setShowParent] = useState(false);
  const signupFormRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setEvents(await eventHomePage());
      setStories(await storiesHomePage());
      setCoaches(await coachesHomePage());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const a = parseInt(age, 10);
    setShowParent(!isNaN(a) && a < 18);
  }, [age]);

  const openSignupModal = () => setModalOpen(true);
  const closeSignupModal = () => setModalOpen(false);
  const submitSignup = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log("Form data:", data);
    alert("Thank you for signing up!");
    e.target.reset();
    setModalOpen(false);
  };

  return (
    <>
      <section className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center" 
        style={{backgroundImage: "url('https://nmtdevserver.com/doach/hero-img5.jpg')"}}>
        <HamburgerMenu />
        <div className="relative z-20 px-6 max-w-3xl hero-content">
          <Link href="/"><img src="https://nmtdevserver.com/doach/logo.png" alt="logo" className="w-[500px] mx-auto" /></Link>
          <RotatingText />
        </div>
      </section>

      <div className="custom-gradient">
        <section id="nftc" className="py-24">
          <Container maxWidth="lg">
            <div className="text-center">
              <div className="flex flex-col xl:flex-row items-center justify-center mb-5 gap-3">
                <img src="https://nmtdevserver.com/doach/logo.png" alt="DOACH" className="w-[300px]" />
                <AiOutlinePlus className="text-white text-[50px]" />
                <img src="https://nmtdevserver.com/doach/cavs-logo.png" alt="CAVS" className="w-[170px]" />
                <h4 className="text-white text-[22px] font-thin mt-5 xl:mt-0" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  National free throw challenge <br /> OCT 17 • 23 2025
                </h4>
              </div>
              <CountdownTimer />
              <div className="mt-12">
                <button onClick={openSignupModal} className="px-8 py-3 bg-[#FFC32B] text-black rounded-full font-semibold">
                  Sign Up for Challenge
                </button>
              </div>
              <PartnersSlider />
            </div>
          </Container>
        </section>

        {/* Events */}
        <section className="event-sec">
          <Container>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white text-[22px] font-bold">Events</h4>
              <Link href="/event/listing" className="px-4 py-2 bg-[#FFC32B] text-black rounded-md no-underline">View All</Link>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {events.slice(0,3).map(e => <div key={e.id} className="col-span-12 xl:col-span-4"><EventCard event={e} /></div>)}
            </div>
          </Container>
        </section>

        {/* Stories */}
        <section className="event-sec mt-5">
          <Container>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white text-[22px] font-bold">Stories</h4>
              <Link href="/story/listing" className="px-4 py-2 bg-[#FFC32B] text-black rounded-md no-underline">View All</Link>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {stories.slice(0,3).map(s => <div key={s.id} className="col-span-12 xl:col-span-4"><StoryCard story={s} /></div>)}
            </div>
          </Container>
        </section>

        {/* Coaches */}
        <section className="event-sec mt-5">
          <Container>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white text-[22px] font-bold">Coaches</h4>
              <Link href="/coach/listing" className="px-4 py-2 bg-[#FFC32B] text-black rounded-md no-underline">View All</Link>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {coaches.slice(0,3).map(c => <div key={c.id} className="col-span-12 xl:col-span-4"><CoachCard coach={c} /></div>)}
            </div>
          </Container>
        </section>

        <div className="mt-12 flex justify-center">
          <button onClick={openSignupModal} className="px-8 py-3 bg-[#FFC32B] text-black rounded-full font-semibold">View Challenge</button>
        </div>

        <HomeFooter />
      </div>

      {/* Signup Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md relative">
            <button onClick={closeSignupModal} className="absolute top-4 right-4 text-2xl text-[#FFC32B]">&times;</button>
            <h3 className="text-xl font-bold text-[#FFC32B] mb-4">Sign Up for Challenge</h3>
            <form ref={signupFormRef} onSubmit={submitSignup} className="space-y-4">
              <input name="name" type="text" placeholder="Full Name" className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white" required />
              <input name="age" type="number" placeholder="Age" min="1" max="120" onChange={(e) => setAge(e.target.value)} className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white" required />
              {showParent && <input name="parentEmail" type="email" placeholder="Parent Email" className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white" required />}
              <select name="skillLevel" required className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white">
                <option value="">Select skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
              <input name="phone" type="tel" placeholder="Phone Number" className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white" required />
              <button type="submit" className="w-full py-2 bg-[#FFC32B] text-black rounded-md font-semibold">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
