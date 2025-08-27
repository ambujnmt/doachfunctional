import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: Sports job openings (replace with real API later)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Dummy sports-related jobs
        const data = [
          {
            id: 1,
            title: "Fitness Coach",
            location: "Mumbai, India",
            type: "Full-Time",
            description:
              "We are looking for an energetic fitness coach to train athletes and sports enthusiasts.",
            applyLink: "#",
          },
          {
            id: 2,
            title: "Sports Physiotherapist",
            location: "Delhi, India",
            type: "Contract",
            description:
              "Seeking an experienced physiotherapist specialized in sports injuries and recovery programs.",
            applyLink: "#",
          },
          {
            id: 3,
            title: "Assistant Football Coach",
            location: "Bangalore, India",
            type: "Full-Time",
            description:
              "Help train young football players, assist in practice drills, and support senior coaching staff.",
            applyLink: "#",
          },
          {
            id: 4,
            title: "Sports Nutritionist",
            location: "Remote / On-site",
            type: "Part-Time",
            description:
              "Provide diet plans and nutritional guidance to athletes and fitness trainees.",
            applyLink: "#",
          },
        ];
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="custom-gradient">
      {/* Hamburger Menu */}
      <HamburgerMenu />
      {/* // Hamburger Menu */}

      <section id="careers" className="py-24">
        <Container>
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white">Careers in Sports</h3>
            <p className="text-white opacity-80">
              Explore exciting opportunities to build your career in the sports industry ⚽🏀🏏
            </p>
          </div>

          {loading ? (
            <p className="text-white text-center">Loading opportunities...</p>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-5 rounded-xl bg-white shadow-lg text-black"
                >
                  <h4 className="text-xl font-semibold mb-2">{job.title}</h4>
                  <p className="text-gray-600 mb-1">{job.location}</p>
                  <p className="text-gray-500 text-sm mb-2">{job.type}</p>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-center">No current openings in sports.</p>
          )}
        </Container>
      </section>

      <HomeFooter />
    </div>
  );
}
