"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../page.module.css";
import Footer from "../components/footer";
import { CiShare2 } from "react-icons/ci";
import Newscard from "../components/newscard";
const slider = () => {
  return (
    <>
      <Newscard />
    </>
  );
};
export default slider;
