"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiShare2 } from "react-icons/ci";
import { relative } from "path";
const Newscard = () => {
  const [newsData, setNewsData] = useState([]);
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    vertical: true,

    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };
  useEffect(() => {
    getNewsFeeds();
  }, []);
  function getNewsFeeds() {
    setNewsData([]);
    axios
      .post("/api/feed")
      .then((response) => {
        const news = response.data.data;
        setNewsData(news);
      })
      .catch((error) => {});
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

  return (
    <>
      {/* {newsData.map((item, index) => (
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
      ))} */}
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Newscard;
