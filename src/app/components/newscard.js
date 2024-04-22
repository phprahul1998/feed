"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { CiShare2 } from "react-icons/ci";
import { relative } from "path";
const Newscard = () => {
  const [newsData, setNewsData] = useState([]);
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
      // Check if Web Share API is supported
      if (navigator.share) {
        navigator
          .share({
            title: item.heading,
            text: item.para,
            url: item.image_url,
            files: [item.image_url], // Add image file
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
      {newsData.map((item, index) => (
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
      ))}
    </>
  );
};

export default Newscard;
