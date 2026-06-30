import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets.js";

const AdBanner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-blue-50 border-l-4 border-blue-600 p-6 my-10 rounded-lg shadow-md text-center mx-4 sm:mx-20 flex flex-col items-center"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700">
        📢 Fè konnen biznis ou sou TiBaza!
      </h2>
      <p className="text-blue-600 mt-2 text-sm sm:text-base max-w-2xl">
        Mete yon anons fasil pou vann pwodwi, ofri sèvis oswa poste travay. Jwenn plis kliyan sou platfòm #1 pou anons gratis an Ayiti.
      </p>

      <button
        onClick={() => navigate("/mete-anons")}
        className="mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-blue-700 w-full max-w- cursor-pointer "
      >
        {/* <img src={assets.add_icon} alt="post" className="w-4 h-4" /> */}
        Mete yon anons
      </button>
    </motion.div>
  );
};

export default AdBanner;
