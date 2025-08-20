import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import Container from "@mui/material/Container";

export default function PartnersSlider() {
    return (
        <Container maxWidth="lg">

            <div className="pt-20">
                <h3 class="xl:text-4xl lg:text-4xl text-2xl text-center font-medium text-white mb-8">Founding Brand Partners</h3>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                loop={true}
                spaceBetween={20}
                slidesPerView={3}
                autoplay={{
                delay: 3000, // 3 seconds
                disableOnInteraction: false,  
                }}
                breakpoints={{
                0: {
                    slidesPerView: 3,
                },
                640: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 6,
                },
                }}
            >
                
                <div className="flex items-center"> 
                    <SwiperSlide>
                        <div className="text-center">
                            <img
                            src="https://www.pngplay.com/wp-content/uploads/12/Windows-Logo-PNG-HD-Photos.png"
                            alt="image"
                            className="w-[40%] h-auto object-cover"
                            /> 
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center">
                            <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1724px-Apple_logo_white.svg.png"
                            alt="image"
                            className="w-[40%] h-auto object-cover"
                            /> 
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center">
                            <img
                            src="https://nmtdevserver.com/doach/youtube-logo.png"
                            alt="image"
                            className="w-[40%] h-auto object-cover"
                            /> 
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center">
                            <img
                            src="https://nmtdevserver.com/doach/cavs-logo.png"
                            alt="image"
                            className="w-[50%] h-auto object-cover"
                            /> 
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center">
                            <img
                            src="https://www.pngplay.com/wp-content/uploads/12/Windows-Logo-PNG-HD-Photos.png"
                            alt="image"
                            className="w-[40%] h-auto object-cover"
                            /> 
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center">
                            <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1724px-Apple_logo_white.svg.png"
                            alt="image"
                            className="w-[40%] h-auto object-cover"
                            /> 
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center">
                            <img
                            src="https://nmtdevserver.com/doach/youtube-logo.png"
                            alt="image"
                            className="w-[40%] h-auto object-cover"
                            /> 
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center">
                            <img
                            src="https://nmtdevserver.com/doach/cavs-logo.png"
                            alt="image"
                            className="w-[50%] h-auto object-cover"
                            /> 
                        </div>
                    </SwiperSlide>
                </div>
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
