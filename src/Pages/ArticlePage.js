import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./ArticlePage.scss";
import { articles } from "../Pages/ArticleData";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "swiper/swiper-bundle.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SubPage1 from "./ArticleSubPage/SubPage1";
import SubPage2 from "./ArticleSubPage/SubPage2";
import SubPage3 from "./ArticleSubPage/SubPage3";
import SubPage4 from "./ArticleSubPage/SubPage4";
import SubPage5 from "./ArticleSubPage/SubPage5";
import ProgressBar from "../Components/ProgressBar";

const ArticlePage = ({ data }) => {
  const { index } = useParams();
  const article = data[index];

  useEffect(() => {
    AOS.init();
  }, []);

  SwiperCore.use([Pagination, Navigation]);
  const [selectedSubPage, setSelectedSubPage] = useState(1);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!article) {
    return <div>Article not found</div>;
  }
  return (
    <>
      <ProgressBar  />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={`swiper-container ${darkMode ? "dark-mode" : ""} pt-5`}>
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          navigation
          loop
        >
          {articles.map((article, index) => (
            <SwiperSlide key={article.id}>
              <Link
                to={`/article/${index}`}
                className="article-link text-decoration-none link-unstyled"
                onClick={() => setSelectedSubPage(index + 1)}
              >
                <div
                  className="container-fluid text-center mt-3"
                  style={{ height: "50vh" }}
                >
                  <div className="row justify-content-center h-100">
                    <div className="col-md-6 col-12">
                      <div
                        className="rounded bg-cover bg-center h-100"
                        style={{
                          backgroundImage: `url(${article.image})`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "auto 100%",
                        }}
                      ></div>
                    </div>
                    <div className="col-md-4 col-12 d-flex flex-column justify-content-center">
                      <h2>{article.title}</h2>
                      <p>{article.shortDescription}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={`article-page ${darkMode ? "dark-mode" : ""}`}>
        {selectedSubPage === 1 && <SubPage1 />}
        {selectedSubPage === 2 && <SubPage2 />}
        {selectedSubPage === 3 && <SubPage3 />}
        {selectedSubPage === 4 && <SubPage4 />}
        {selectedSubPage === 5 && <SubPage5 />}
      </div>
      <Footer darkMode={darkMode} />
    </>
  );
};

export default ArticlePage;
