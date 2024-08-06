import React from "react";
import { Link } from "react-router-dom";

const IndexDropdown = () => {
  
  // dropdown props

  const handleLogout = () => {
		localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("_grecaptcha");

	};


 
  return (
    <>
      <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
      <Link
        to="/"
        className="text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blueGray-900 transition-colors duration-300"
      >
        Accueil
      </Link>
      <Link
        to="/landing"
        className="text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blueGray-900 transition-colors duration-300"
      >
        Boutique
      </Link>
     
    
      <Link
        to="/contact-us"
        className="text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blueGray-900 transition-colors duration-300"
      >
        Mes Commandes
      </Link>
      
      <Link
        to="/about"
        className="text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blueGray-900 transition-colors duration-300"
      >
        À propos
      </Link>
      <Link
        to="/contact-us"
        className="text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blueGray-900 transition-colors duration-300"
      >
        Contactez-nous
      </Link>
      <Link
        to="/auth"
        onClick={handleLogout}
        className="text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:text-blueGray-900 transition-colors duration-300"
      >
        Connexion
      </Link>
    </>
  );
};

export default IndexDropdown;
