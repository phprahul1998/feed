import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaCompass } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="bottom-nav">
      <ul>
        <li className="first">
          <CiSearch />
          <p>Search</p>
        </li>
        <li className="second">
          <FaCompass />
          <p>Discover</p>
        </li>
        <li className="third">
          <BiFoodMenu />
          <p>Library</p>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
