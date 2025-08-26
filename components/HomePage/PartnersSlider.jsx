"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import Container from "@mui/material/Container";
import { brandHomePage } from "../../utils/fetchApi"; // adjust path

export default function PartnersSlider() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await brandHomePage();
      setBrands(data);
    };
    fetchBrands();
  }, []);

  return (
    <Container maxWidth="lg">
      <div className="pt-20">
        <h3 className="xl:text-4xl lg:text-4xl text-2xl text-center font-medium text-white mb-8">
          Founding Brand Partners
        </h3>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop={brands.length > 3} // loop only if enough slides
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="text-center">
              <img
                src={brand.brand_image}
                alt={brand.brand_name}
                className="w-[40%] h-auto object-cover mx-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
          .swiper-button-prev{
              display: none;
          }
          .swiper-button-next{
              display: none;
          }
          .swiper-wrapper{
              align-items: center;
          }
        `}
      </style>
    </Container>
  );
}
