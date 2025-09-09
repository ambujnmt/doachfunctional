import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HamburgerMenu from '../../HomePage/HamburgerMenu';
import HomeFooter from '../../HomePage/HomeFooter';
import Container from "@mui/material/Container";
import { storiesHomePage } from "../../../utils/fetchApi";

export default function StoriesSection() {
  const [stories, setStories] = useState([]);

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

  return (
    <div className="custom-gradient">
      <section id="stories" className="py-24">
        <Container maxWidth="lg">
          <h3 className="text-3xl text-center font-bold text-white mb-8">
            All Stories
          </h3>

          <HamburgerMenu />

          <section className="story-sec">
            <div className="grid grid-cols-12 gap-4">
              {stories.length > 0 ? (
                stories.slice(0, 3).map((story) => (
                  <div
                    key={story.id}
                    className="col-span-12 xl:col-span-4 md:col-span-6 lg:col-span-4"
                  >
                    <Link
                      href={`/story/${story.slug}`}
                      className="block bg-[#FFC32B] rounded-3xl no-underline"
                    >
                      <img
                        src={story.story_image || "https://via.placeholder.com/400x250"}
                        alt={story.story_title}
                        className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl"
                      />
                      <div className="p-3">
                        <h5 className="text-black text-[18px] font-semibold mb-1 no-underline">
                          {story.story_title}
                        </h5>
                        <p className="text-gray-800 mb-2 no-underline">
                          {story.date || story.created_at?.split("T")[0]}
                        </p>
                        <div className="no-underline overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
                          {story.description
                            ? story.description.replace(/<[^>]+>/g, "").substring(0, 50) + "..."
                            : ""}
                        </div>
                        <span className="flex justify-end text-[14px] font-medium text-black no-underline">
                          {story.readTime || "Read More"}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="col-span-12 text-center text-white">
                  No stories found.
                </p>
              )}
            </div>
          </section>

          <HomeFooter />
        </Container>
      </section>
    </div>
  );
}
