import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/constant";

function Home() {
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(BASEURL + "/allServices");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const addToCart = (service) => {
    setCart((prev) => [...prev, service]);
  };

  const proceedToCheckout = () => {
    const serviceIds = cart.map((s) => s._id);
    navigate("/checkout", { state: { serviceIds, cart } });
  };

  const toggleCartView = () => setShowCart(!showCart);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700 tracking-tight">
        Explore Our Premium Services
      </h1>

      {/* Centered Button */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <Link to="/add-service">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition">
            ➕ Add New Service
          </button>
        </Link>

        <button
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 transition"
          onClick={toggleCartView}
        >
          🛒 View Cart ({cart.length})
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-lg font-bold text-emerald-600 mb-4">
              ₹{service.price}
            </p>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
              onClick={() => addToCart(service)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-2xl z-50 border-l border-gray-300 p-6 overflow-y-auto transition-all duration-300">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
            🛒 Your Cart
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b pb-2">
                  <span className="text-gray-800 font-medium">{item.title}</span>
                  <span className="text-green-600 font-bold">₹{item.price}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Checkout Button */}
          {cart.length > 0 && (
            <div className="mt-8">
              <button
                className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition"
                onClick={proceedToCheckout}
              >
                ✅ Proceed to Checkout
              </button>
            </div>
          )}

          {/* Close Cart */}
          <button
            className="mt-6 text-sm text-gray-500 underline hover:text-gray-700 block mx-auto"
            onClick={toggleCartView}
          >
            Close Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
