/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

const PagesDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
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
      <Link
        to="/auth/login"
        className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
      >
        Connexion
      </Link>
      <Link
        to="/auth/register"
        className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
      >
        Inscription
      </Link>
    </>
  );
};

export default PagesDropdown;
