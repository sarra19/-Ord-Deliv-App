import React, { useEffect, useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { getCartItems, removeItem } from "../Services/ApiCart";

export default function Panier() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("66a8be477400aae62217e2dc");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems(userId);
        setCartItems(response.data.cartItems);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.produit._id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItem(userId, itemId);
      setCartItems(cartItems.filter(item => item.produit._id !== itemId));
    } catch (err) {
      setError(err);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.produit.prix * item.quantity), 0);
  };



  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">Error: {error.message}</div>;
  }

  return (
    <>
      <IndexNavbar fixed />
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src='http://localhost:5000/uploads/hand.jpg'
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <section className="relative py-16 bg-gray-100 min-h-screen mt-16 bg-opacity-90">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">Votre Panier</h2>
            {cartItems.length === 0 ? (
              <div className="text-center">
                <p className="text-lg">Votre panier est vide.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="flex flex-col">
                  {cartItems.map((item) => (
                    <div
                      key={item.produit._id}
                      className="bg-white shadow-md rounded-lg flex items-center w-full max-w-xl border border-gray-300 mb-4"
                    >
                      <img
                        src={item.produit.image ? `http://localhost:5000/${item.produit.image}` : 'http://localhost:5000/uploads/default.png'}
                        alt={item.produit.nomProd}
                        className="w-12 h-12 object-cover rounded-l-lg"
                      />
                      <div className="p-4 flex-1">
                        <h5 className="text-lg font-semibold mb-2">{item.produit.nomProd}</h5>
                        <p className="text-gray-700 mb-2">Prix Unitaire: {item.produit.prix} TND</p>
                        <div className="flex items-center mb-3">
                          <span className="mr-2">Quantité:</span>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            className="form-input w-24 border-gray-300 rounded"
                            onChange={(e) => handleQuantityChange(item.produit._id, e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="p-4 bg-gray-100 ">
                        <button
                          className="bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          onClick={() => handleRemoveItem(item.produit._id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {cartItems.length > 0 && (
              <div className="mt-6 text-right">
                <h4 className="text-lg font-semibold">Total: {calculateTotalPrice()} TND</h4>
                <button
                  className={`bg-green-500 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 ${cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  href="/adresse"

                >
                  Passer la Commande
                </button>
              </div>
            )}
          
          </div>
        </section>
       
      </div>
      <Footer />
    </>
  );
}
