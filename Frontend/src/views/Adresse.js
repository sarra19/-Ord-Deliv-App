import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getById } from "../Services/ApiUser";

// components
import Footer from "components/Footers/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import SpecialCase from "components/SpecialCase/SpecialCase";

export default function Adresse() {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    locality: "",
    address: "",
    cityDistrictTown: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "home",
  });

  const [userInfo, setUserInfo] = useState(null);

  const userId = "66a8be477400aae62217e2dc"; // Hardcoded userId; replace with dynamic value if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info
        const userResponse = await getById(userId);
        setUserInfo(userResponse.data);

        // Fetch address data
        const response = await fetch(`http://localhost:5000/api/address/${userId}`);
        const data = await response.json();
        
        if (response.ok) {
          setFormData({
            ...data, // Ensure data matches the field names
            addressType: data.addressType || "home",
           // addressId: data._id || null, // Set addressId if available
          });
        } else {
          console.error("Erreur lors de la récupération de l'adresse :", data.message);
        }
      } catch (error) {
        console.error("Erreur de réseau :", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = userInfo.addressId
      ? `http://localhost:5000/api/address/update/${userInfo.addressId}`
      : `http://localhost:5000/api/address/addToUser`;
    const method = userInfo.addressId ? "PUT" : "POST";

    const payload = {
      userId: userId,
      address: formData,
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert(userInfo.addressId ? "Adresse mise à jour avec succès !" : "Adresse ajoutée avec succès !");
        // Optionally, reset the form or redirect the user
        setFormData({
          name: "",
          mobileNumber: "",
          pinCode: "",
          locality: "",
          address: "",
          cityDistrictTown: "",
          state: "",
          landmark: "",
          alternatePhone: "",
          addressType: "home",
        });
      } else {
        console.error("Erreur :", data.message);
        alert("Une erreur s'est produite lors de l'ajout / mise à jour de l'adresse.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Une erreur s'est produite lors de l'ajout / mise à jour de l'adresse.");
    }
  };

  return (
    <>
      <IndexNavbar fixed />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url(" + require("assets/img/handmade.jpg").default + ")",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="mt-20">
            <SpecialCase />
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Complétez vos coordonnées.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Entrez votre adresse.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
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
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t bg-blueGray-100 mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-blueGray-700 text-xl font-bold">Ajouter Adresse</h6>
                  <Link
                    to="/"
                    className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  >
                    Retour
                  </Link>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Informations d'adresse
                  </h6>
                  <div className="flex flex-wrap">
                    {Object.keys(formData).map((key) => (
                      key !== 'addressId' && (
                        <div className="w-full lg:w-6/12 px-4" key={key}>
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor={key}>
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                              {key === 'name' || key === 'mobileNumber' || key === 'pinCode' || key === 'address' || key === 'locality' || key === 'cityDistrictTown' || key === 'state' || key === 'addressType' ? <span className="text-red-500">*</span> : null}
                            </label>
                            <input
                              type={key === 'pinCode' ? 'text' : 'text'}
                              id={key}
                              name={key}
                              value={formData[key]}
                              onChange={handleChange}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                              required={key === 'name' || key === 'mobileNumber' || key === 'pinCode' || key === 'address' || key === 'locality' || key === 'cityDistrictTown' || key === 'state' || key === 'addressType'}
                            />
                          </div>
                        </div>
                      )
                    ))}
                  </div>

                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      className="bg-lightBlue-600 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    >
                      {userInfo && userInfo.addressId ? "Mettre à jour" : "Ajouter"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
