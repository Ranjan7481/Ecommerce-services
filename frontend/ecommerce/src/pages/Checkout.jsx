import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../utils/constant";

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { serviceIds = [], cart = [] } = state || {};

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${BASEURL}/payment/create`, {
        amount: total,
        serviceIds,
        customer: {
          name: "Ranjan Kumar",
          email: "ranjan@example.com",
        },
      });

      const { orderId, keyId, amount } = {
        orderId: response.data.payment.orderId,
        keyId: response.data.keyId,
        amount: response.data.payment.amount,
      };

      const options = {
        key: keyId,
        amount,
        currency: "INR",
        name: "Service Checkout",
        description: "Service payment for selected services",
        order_id: orderId,
        handler: function (response) {
          alert("✅ Payment Successful!");
          console.log("Payment success:", response);
          navigate("/");
        },
        prefill: {
          name: "Ranjan Kumar",
          email: "ranjan@example.com",
        },
        theme: {
          color: "#6366f1",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("❌ Payment failed:", err);
      alert("Error initiating payment");
    }
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">🛒 No items in cart!</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-violet-700 text-center">
          Checkout Summary
        </h1>

        <ul className="divide-y divide-gray-200 mb-6">
          {cart.map((item) => (
            <li key={item._id} className="py-3 flex justify-between text-gray-700">
              <span>{item.title}</span>
              <span className="font-semibold text-emerald-600">₹{item.price}</span>
            </li>
          ))}
        </ul>

        <div className="text-xl font-semibold flex justify-between mb-6">
          <span>Total:</span>
          <span className="text-green-700">₹{total}</span>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 transition"
        >
          💳 Pay Now
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Checkout;
