import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SpecialCase from "components/SpecialCase/SpecialCase";
import { getAllProduits } from "../Services/ApiProduit";

export default function Landing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProduits();
        setProducts(response.data); // Adjust according to your API response structure
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const slides = [
    {
      title: "Boostez Votre Moto avec Nos Pièces",
      imageUrl: require("assets/img/moto4.png").default,
      buttonText: "Achetez Maintenant",
      buttonLink: "/shop",
    },
    {
      title: "Qualité et Performance",
      imageUrl: require("assets/img/moto5.jpg").default,
      buttonText: "Achetez Maintenant",
      buttonLink: "/shop",
    },
    {
      title: "Pièces de Moto Haut de Gamme",
      imageUrl: require("assets/img/moto6.jpeg").default,
      buttonText: "Achetez Maintenant",
      buttonLink: "/shop",
    },
  ];

  return (
    <>
      <IndexNavbar fixed />

      <section className="relative pt-16 flex flex-col items-center h-screen max-h-800px">
        <SpecialCase />

        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
          {slides.map((slide, index) => (
            <div key={index} className="relative flex flex-col lg:flex-row h-screen max-h-800px">
              <div className="w-full lg:w-1/2 px-4 flex flex-col justify-center lg:justify-start">
                <h2 className="text-3xl font-bold mb-4 lg:mb-6 lg:text-4xl">{slide.title}</h2>
                <div className="mt-12 lg:mt-16">
                  <a
                    href={slide.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-800 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4 flex items-center justify-center">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full max-h-860px object-cover"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Updated section for product grid */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Produits</h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error.message}</p>
          ) : (
            <div className="flex flex-wrap -mx-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 px-4 mb-8"
                >
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                      src={product.image ? `http://localhost:5000/${product.image}` : 'http://localhost:5000/uploads/produit.png'}
                      alt={product.nomProd}
                      className="w-full h-32 object-cover" // Adjusted size for smaller images
                    />
                    <div className="p-6 flex flex-col items-center">
                      <h3 className="text-xl font-semibold mb-2 text-center">{product.nomProd}</h3>
                      <p className="text-gray-900 font-bold text-lg mb-2 text-center">{product.prix} TND</p>
                      <p className="text-gray-600 mb-4 text-center">{product.quantite} en stock</p>
                      <a
                        href={`/product/${product._id}`} // Assuming you have a route for product details
                        className={`inline-block text-white font-bold px-6 py-3 rounded ${product.enStock ? 'bg-lightBlue-800 hover:bg-lightBlue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        style={{ pointerEvents: product.enStock ? 'auto' : 'none' }}
                      >
                        {product.enStock ? 'Achetez Maintenant' : 'Rupture de Stock'}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
