import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./components/footer";
import Newscard from "./components/newscard";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-xs-12 col-md-6 col-lg-5 col-xl-5">
          <div className="title ">
            <h4>Discover</h4>
          </div>
          <Newscard />
        </div>
      </div>
      <footer className="footer fixed-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-xs-12 col-md-6 col-lg-5 col-xl-5">
              <Footer />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
