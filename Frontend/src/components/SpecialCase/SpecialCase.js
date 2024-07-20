import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";

const SpecialCase = () => {
  return (
    <div className="fixed top-22 right-2 z-20 hidden md:flex flex-col gap-4">
      <Link to="/profile" className="group">
        <div className="bg-white w-16 h-19 rounded-lg flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden cursor-pointer">
          <div className="relative w-full h-full flex justify-center items-center">
            <MdSwitchAccount className="text-2xl transform transition-transform duration-300 ease-in-out group-hover:-translate-x-2" />
            <MdSwitchAccount className="text-2xl absolute transform transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
          </div>
          <p className="text-xs font-semibold font-titleFont mt-1 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
            Profile
          </p>
         
        </div>
      </Link>
      <div className="mb-2"></div>

      <Link to="/panier" className="group">
        <div className="bg-white w-16 h-19 rounded-lg flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden relative cursor-pointer">
          <div className="relative w-full h-full flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl transform transition-transform duration-300 ease-in-out group-hover:-translate-x-2" />
            <RiShoppingCart2Fill className="text-2xl absolute transform transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
          </div>
          <p className="text-xs font-semibold font-titleFont mt-1 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
            Panier
          </p>
          
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
