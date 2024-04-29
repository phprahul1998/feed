import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./components/footer";
import Newscard from "./components/newscard";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Newscard />
      <Footer />
    </>
  );
}
