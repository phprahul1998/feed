"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CiShare2 } from "react-icons/ci";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

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

  const WheelControls = (slider) => {
    let touchTimeout;
    let position;
    let wheelActive;

    function dispatch(e, name) {
      position.x -= e.deltaX;
      position.y -= e.deltaY;
      slider.container.dispatchEvent(
        new CustomEvent(name, {
          detail: {
            x: position.x,
            y: position.y,
          },
        })
      );
    }

    function wheelStart(e) {
      position = {
        x: e.pageX,
        y: e.pageY,
      };
      dispatch(e, "ksDragStart");
    }

    function wheel(e) {
      dispatch(e, "ksDrag");
    }

    function wheelEnd(e) {
      dispatch(e, "ksDragEnd");
    }

    function eventWheel(e) {
      e.preventDefault();
      if (!wheelActive) {
        wheelStart(e);
        wheelActive = true;
      }
      wheel(e);
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        wheelActive = false;
        wheelEnd(e);
      }, 50);
    }

    slider.on("created", () => {
      slider.container.addEventListener("wheel", eventWheel, {
        passive: false,
      });
    });
  };
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged() {
        console.log("slide changed");
      },
      loop: false,
      rubberband: false,
      vertical: true,
    },
    [WheelControls]
  );

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
