import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaCompass } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="footer fixed-bottom">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-md-6 col-lg-5 col-xl-5">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
