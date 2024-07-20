import React from "react";
import { Carousel } from "react-responsive-carousel";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SpecialCase from "components/SpecialCase/SpecialCase";

export default function Index() {
  const slides = [
    { 
      title: "Boostez Votre Moto avec Nos Pièces ", 
      imageUrl: require("assets/img/moto4.png").default, 
      buttonText: "Achetez Maintenant",
      buttonLink: "/shop", // Exemple de lien
    },
    { 
      title: "Qualité et Performance", 
      imageUrl: require("assets/img/moto5.jpg").default, 
      buttonText: "Achetez Maintenant",
      buttonLink: "/shop", // Exemple de lien
    },
    { 
      title: "Pièces de Moto Haut de Gamme", 
      imageUrl: require("assets/img/moto6.jpeg").default, 
      buttonText: "Achetez Maintenant",
      buttonLink: "/shop", // Exemple de lien
    },
  ];

  return (
    <>
      <IndexNavbar fixed />

      <section className="header relative pt-16 items-center flex h-screen max-h-800-px">
      <SpecialCase />

        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
          {slides.map((slide, index) => (
            <div key={index} className="relative pt-16 items-center flex h-screen max-h-800-px">
              <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg">{slide.description}</p>
                <div className="mt-12">
                  <a
                    href={slide.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-indigo-700 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full max-h-860px"
                />
              </div>
            </div>
          ))}
        </Carousel>
        
      </section>
      

      <section className="py-20 bg-blueGray-600 overflow-hidden">
        <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-code-branch text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Open Source
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
                Since{" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-300"
                  target="_blank"
                >
                  Tailwind CSS
                </a>{" "}
                is an open source project we wanted to continue this movement
                too. You can give this version a try to feel the design and also
                test the quality of the code!
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">
                Get it free on Github and please help us spread the news with a
                Star!
              </p>
              <a
                href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                target="_blank"
                className="github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
              >
                Github Star
              </a>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
              <i className="fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  😍
                </span>
              </p>
              <h3 className="font-semibold text-3xl">
                Do you love this Starter Kit?
              </h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                Cause if you do, it can be yours now. Hit the buttons below to
                navigate to get the Free version for your next project. Build a
                new web app or give an old project a new look!
              </p>
              <div className="sm:block flex flex-col mt-10">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index"
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                  target="_blank"
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                >
                  <i className="fab fa-github text-lg mr-1"></i>
                  <span>Help With a Star</span>
                </a>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
