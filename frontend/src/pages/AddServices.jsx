import axios from "axios";
import React, { useState } from "react";
import { BASEURL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleAddService = async () => {
    setError("");
    setSuccess(false);

    if (!title || !description || !price) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post(
        BASEURL + "/addService",
        { title, description, price },
        { withCredentials: true }
      );
      setSuccess(true);
      setTitle("");
      setDescription("");
      setPrice("");
      setTimeout(() => navigate("/"), 2000); // Redirect after 2s
    } catch (err) {
      setError(err?.response?.data || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-100 flex items-center justify-center p-4">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8"
        style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-violet-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
            </svg>
          </div>
          <h2 className="text-violet-900 text-lg font-bold text-center flex-1">
            Add a New Service
          </h2>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg bg-violet-50 p-4 text-base placeholder:text-violet-400 text-violet-900 focus:outline-none border border-violet-200 focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg bg-violet-50 p-4 min-h-[144px] text-base placeholder:text-violet-400 text-violet-900 focus:outline-none border border-violet-200 focus:ring-2 focus:ring-violet-500"
          ></textarea>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg bg-violet-50 p-4 text-base placeholder:text-violet-400 text-violet-900 focus:outline-none border border-violet-200 focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Feedback Messages */}
        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded-md mt-4 text-sm text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 bg-green-100 p-2 rounded-md mt-4 text-sm text-center">
            Service added successfully!
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleAddService}
            className="w-full h-12 px-5 bg-violet-600 text-white rounded-lg font-bold text-base hover:bg-violet-700 transition"
          >
            Add Service
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full h-12 px-5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddService;
