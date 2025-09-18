"use client";
import React, { useState, useEffect } from "react";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";
import Container from "@mui/material/Container";
import Link from 'next/link';
import { getCommunityCategories } from "../../utils/fetchApi";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCommunityCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="custom-gradient">
        {/* Hamburger Menu */}
        <HamburgerMenu />

        <div className="custom-gradient">
          <section id="nftc" className="py-24">
            <Container maxWidth="lg">
              <h3 className="text-3xl text-center font-bold text-white mb-8">
                Community
              </h3>

              {/* Grid */}
              <div className="grid grid-cols-12 gap-4">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12"
                    >
                     <Link
                            href={`/community/${cat.slug}`}
                            className="block bg-[#FFC32B] rounded-3xl cursor-pointer no-underline"
                      >
                      <div className="relative rounded-lg overflow-hidden shadow-lg">
                        {/* Background Image */}
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-[280px] object-cover"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-40"></div>

                        {/* Text */}
                        <div className="absolute top-5 left-3 text-white font-semibold text-[28px] leading-tight">
                          {cat.name}
                        </div>
                      </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 col-span-12">
                    No categories found.
                  </p>
                )}
              </div>

              {/* Button */}
              <div className="flex justify-center mt-5">
                <button
                  type="button"
                  className="bg-black text-white px-5 py-2 rounded-lg hover:!bg-[#FFC32B] duration-300 hover:!text-black border border-black"
                >
                  Next
                </button>
              </div>
            </Container>
          </section>

          <HomeFooter />
        </div>
      </div>
    </>
  );
}
