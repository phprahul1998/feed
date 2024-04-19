import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./components/footer";
import Newscard from "./components/newscard";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <div className="main-container">
              <div className="title ">
                <h4>Discover</h4>
              </div>
              <Newscard />
              <div className="container-fluid d-flex justify-content-center footer-section">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8"></div>
    </div>
  );
}
