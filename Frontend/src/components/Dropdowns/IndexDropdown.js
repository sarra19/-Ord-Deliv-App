import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

const IndexDropdown = () => {
  
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const handleLogout = () => {
		localStorage.removeItem("token");
	};

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
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
