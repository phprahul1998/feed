"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CiShare2 } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

const Newscard = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [intervalCounter, setIntervalCounter] = useState(0);
  useEffect(() => {
    getNewsFeeds(intervalCounter, 10);
  }, []);

  function getNewsFeeds(offset, limit) {
    axios
      .post("/api/feed", { offset: offset, limit: limit })
      .then((response) => {
        const news = response.data.data;
        setNewsData((prevData) => [...prevData, ...news]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  function handleShare(event, item) {
    event.preventDefault();
    try {
      if (navigator.share) {
        navigator
          .share({
            title: item.heading,
            text: item.para,
            url: item.image_url,
          })
          .then(() => console.log("Content shared successfully!"))
          .catch((error) => console.error("Error sharing content:", error));
      } else {
        console.log("Web Share API is not supported.");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  }
  function handleTransitionEnd(swiper) {
    const currentIndex = swiper.activeIndex;
    if (currentIndex > slideIndex) {
      setSlideIndex(currentIndex);
      if ((currentIndex + 1) % 10 === 0) {
        const nextPage = Math.floor((currentIndex + 1) / 10);
        getNewsFeeds(nextPage * 10, 10);
      }
    }
  }
  return (
    <Swiper
      direction={"vertical"}
      modules={[Pagination]}
      slidesPerView={"auto"}
      centeredSlides={true}
      spaceBetween={100}
      className="swiper-container"
      onTransitionEnd={handleTransitionEnd}
    >
      {newsData.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="NewsCard"
            key={index}
            style={{
              backgroundColor: item.colorCode,
              border: `4px solid ${item.colorCode}`,
            }}
          >
            <div className="newImg">
              <img src={item.image_url} alt="" />
            </div>
            <div className="newsdata">
              <h1>{item.heading}</h1>
              <p>{item.para}</p>
              <div className="social-icons">
                <a href="#" onClick={(e) => handleShare(e, item)}>
                  <CiShare2 />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Newscard;
