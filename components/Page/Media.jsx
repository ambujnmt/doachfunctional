import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";

export default function Media() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: Fetch sports media items (replace with your API later)
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Dummy sports-related media data
        const data = [
          {
            id: 1,
            title: "National Football Championship Highlights",
            type: "Article",
            link: "#",
            date: "2025-08-20",
          },
          {
            id: 2,
            title: "Interview with Star Cricketer",
            type: "Video",
            link: "#",
            date: "2025-08-10",
          },
          {
            id: 3,
            title: "Basketball Finals Photo Gallery",
            type: "Image",
            link: "#",
            date: "2025-07-28",
          },
          {
            id: 4,
            title: "Upcoming Marathon Press Release",
            type: "Article",
            link: "#",
            date: "2025-07-15",
          },
        ];
        setMediaList(data);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="custom-gradient">
      {/* Hamburger Menu */}
      <HamburgerMenu />
      {/* // Hamburger Menu */}

      <section id="media" className="py-24">
        <Container>
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white">Sports Media</h3>
            <p className="text-white opacity-80">
              Latest news, videos, and coverage from the sports world 🏆
            </p>
          </div>

          {loading ? (
            <p className="text-white text-center">Loading media...</p>
          ) : mediaList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaList.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-white shadow-lg text-black"
                >
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 mb-2">{item.type}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    Published on {item.date}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View More
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-center">No sports media available.</p>
          )}
        </Container>
      </section>

      <HomeFooter />
    </div>
  );
}
