import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { getDynamicPageBySlug } from "../../utils/fetchApi";
import HamburgerMenu from "../HomePage/HamburgerMenu";
import HomeFooter from "../HomePage/HomeFooter";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PrivacyPolicy() {
  const router = useRouter();
  const { id: slug } = router.query;
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    if (slug) {
      getDynamicPageBySlug(slug).then((res) => {
        if (res?.status) {
          setPageData(res.data);
        }
      });
    }
  }, [slug]);

  return (
    <div className="custom-gradient">
      {/* Hamburger Menu */}
      <HamburgerMenu />
      {/* // Hamburger Menu */}

      {/* Breadcrumb Section with Background */}
      <section
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage: "url('https://www.mishcon.com/assets/managed/images/cache/ACXTCAAACQCSMAQAAAAAAFAFEYBP777774AABMQA7IG6UBIAAI.jpg')", // 👈 replace with your image
        }}
      >
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center text-white">
            {/* Left Side Title */}
            <h2 className="text-3xl font-bold">
              {pageData?.title || "Page Title"}
            </h2>

            {/* Right Side Breadcrumb */}
            <div className="text-sm mt-3 md:mt-0">
              <Link href="/" className="hover:underline text-gray-200">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="font-semibold capitalize">
                {pageData?.title || slug || "Page"}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Page Content */}
      <section id="nftc" className="py-24">
        <Container>
          {pageData ? (
            <div
              className="mx-auto text-white mb-3 text-left"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </Container>
      </section>

      <HomeFooter />
    </div>
  );
}
