import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/images");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="relative">
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            color: #921a40; /* Change arrow color to #921a40 */
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            color: #a82049; /* Slightly lighter shade for hover effect */
          }
        `}
      </style>

      <Swiper
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="h-[600px] w-full"
      >
        {images.length > 0 ? (
          images.map((image) => (
            <SwiperSlide key={image._id}>
              <div className="relative h-full w-full">
                <img
                  src={`data:${image.contentType};base64,${image.imageBase64}`}
                  alt={image.filename}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h2 className="text-5xl font-bold mb-4 text-center px-4 animate-fade-up">
                    {image.title || "Discover Your Destiny"}
                  </h2>
                  <p className="text-xl text-center px-4 animate-fade-up animation-delay-200">
                    {image.description ||
                      "Unlock the secrets written in the stars"}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              Loading images...
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Carousel;
