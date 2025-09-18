"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { getCommunitiesByCategorySlug } from "../../utils/fetchApi";
import HomeFooter from "../../components/HomePage/HomeFooter";
import HamburgerMenu from "../../components/HomePage/HamburgerMenu";
import Container from "@mui/material/Container";

export default function CommunityListing() {
  const router = useRouter();
  const { slug } = router.query;

  const [category, setCategory] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        setLoading(true);
        const data = await getCommunitiesByCategorySlug(slug);
        setCategory(data.category);
        setCommunities(data.communities);
        setLoading(false);
      };
      fetchData();
    }
  }, [slug]);

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!category) return <p className="text-center mt-10 text-red-500">Category not found!</p>;

  return (
    <div className="custom-gradient">
      <HamburgerMenu />

      <section id="community-listing" className="py-24">
        <Container maxWidth="lg">
          <h3 className="text-3xl text-center font-bold text-white mb-8">
            {category.name} Communities
          </h3>

          <div className="grid grid-cols-12 gap-4">
            {communities.length > 0 ? (
              communities.map((community) => (
                <div
                  key={community.id}
                  className="col-span-12 xl:col-span-4 md:col-span-6 lg:col-span-4"
                >
                  <Link
                    href={`/community/detail/${community.slug || community.id}`}
                    className="block bg-[#FFC32B] rounded-3xl cursor-pointer no-underline"
                  >
                    <img
                      src={community.image || 'https://via.placeholder.com/400x250'}
                      alt={community.title}
                      className="w-full h-[250px] object-cover rounded-tl-3xl rounded-tr-3xl"
                    />
                    <div className="p-3">
                      <h5 className="text-black text-[18px] font-semibold mb-1 no-underline">{community.title}</h5>
                      {/* <p className="text-[14px] font-medium text-black mb-1 no-underline">{community.content_type}</p> */}
                      <p className="text-gray-800 mb-2 no-underline">{community.date}</p>
                      <div className="no-underline overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] text-[14px] font-medium mb-2 text-black">
                        {community.description
                          ? community.description.replace(/<[^>]+>/g, "").substring(0, 80) + "..."
                          : ""}
                      </div>
                      <span className="flex justify-end text-[14px] font-medium text-black no-underline">
                        View Community
                      </span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="col-span-12 text-center text-white">No communities found in this category.</p>
            )}
          </div>
        </Container>
      </section>

      <HomeFooter />
    </div>
  );
}