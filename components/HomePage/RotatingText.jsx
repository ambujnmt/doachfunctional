"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDynamicPageList } from "../../utils/fetchApi";

export default function RotatingText() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const pages = await getDynamicPageList();
        const homeSlides = pages.filter((p) => p.type === "home_slider");
        setSlides(homeSlides);
      } catch (err) {
        console.error("Failed to fetch slides:", err.message);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return <p className="text-center text-gray-400 mt-10">Loading slides...</p>;
  }

  return (
    <div className="text-center">
      <Link href={`${slides[index].url}`} className="no-underline">
        <p className="cursor-pointer mt-[50px] text-[13px] xl:text-lg md:text-xl text-black max-w-md mx-auto p-2 bg-[#FFC32B] rounded-full transition-all duration-500 hover:scale-105">
          {slides[index].title}
        </p>
      </Link>
    </div>
  );
}
