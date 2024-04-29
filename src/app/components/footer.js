import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaCompass } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="footer fixed-bottom">
      <div className="bottom-nav">
        <ul>
          <li className="first text-mute">
            <CiSearch />
            <p>Search</p>
          </li>
          <li className="second">
            <FaCompass />
            <p>Discover</p>
          </li>
          <li className="third text-mute">
            <BiFoodMenu />
            <p>Library</p>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
