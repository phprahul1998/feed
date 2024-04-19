"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CiShare2 } from "react-icons/ci";

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

  return (
    <div>
      {newsData.map((item, index) => (
        <div
          className="NewsCard"
          key={index}
          style={{ backgroundColor: "#000" }}
        >
          <div className="newImg">
            <img src={item.image_url} alt="" />
          </div>
          <div className="newsdata">
            <h1>{item.heading}</h1>
            <p>{item.para}</p>
            <div>
              <CiShare2 />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Newscard;
