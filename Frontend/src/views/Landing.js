import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SpecialCase from "components/SpecialCase/SpecialCase";
import { getAllProduits } from "../Services/ApiProduit";

export default function Landing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProduits();
        setProducts(response.data); // Adjust according to your API response structure
        setFilteredProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [searchTerm, colorFilter, priceFilter, sortBy, products]);

  const filterAndSortProducts = () => {
    let updatedProducts = products;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.nomProd.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (colorFilter) {
      updatedProducts = updatedProducts.filter(product => product.couleur === colorFilter);
    }

    if (priceFilter) {
      updatedProducts = updatedProducts.filter(product => product.prix <= priceFilter);
    }

    if (sortBy === "name") {
      updatedProducts.sort((a, b) => a.nomProd.localeCompare(b.nomProd));
    }

    setFilteredProducts(updatedProducts);
  };

  const slides = [
    {
      title: "Boostez Votre Moto avec Nos Pièces",
      imageUrl: require("assets/img/art1.jpg").default,
      buttonText: "Achetez Maintenant",
      buttonLink: "/shop",
    },
    {
      title: "Qualité et Performance",
      imageUrl: require("assets/img/art2.jpg").default,
      buttonText: "Achetez Maintenant",
      buttonLink: "/shop",
    },
    {
      title: "Pièces de Moto Haut de Gamme",
      imageUrl: require("assets/img/art3.jpg").default,
      buttonText: "Achetez Maintenant",
      buttonLink: "/shop",
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
                <h2 className="text-5xl font-bold mb-4 text-black bg-white bg-opacity-50 p-2 rounded">{slide.title}</h2>
                <div className="mt-12">
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

      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Produits</h2>
          
          <div className="mb-8 flex flex-wrap justify-center">
            <input
              type="text"
              placeholder="Rechercher..."
              className="border px-4 py-2 mr-4 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border px-4 py-2 mr-4 rounded"
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
            >
              <option value="">Couleur</option>
              <option value="rouge">Rouge</option>
              <option value="bleu">Bleu</option>
              <option value="noir">Noir</option>
            </select>
            <input
              type="number"
              placeholder="Prix max"
              className="border px-4 py-2 mr-4 rounded"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
            <select
              className="border px-4 py-2 rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Trier par</option>
              <option value="name">Nom</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error.message}</p>
          ) : (
            <div className="flex flex-wrap -mx-4">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 px-4 mb-8"
                >
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src={product.image ? `http://localhost:5000/${product.image}` : 'http://localhost:5000/uploads/produit.png'}
                      alt={product.nomProd}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-6 flex flex-col items-center">
                      <h3 className="text-xl font-semibold mb-2 text-center">{product.nomProd}</h3>
                      <p className="text-gray-900 font-bold text-lg mb-2 text-center">{product.prix} TND</p>
                      <p className="text-gray-600 mb-4 text-center">{product.quantite} en stock</p>
                      <a
                        href={`/product/${product._id}`}
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
