import React from "react";
import assets from "../assets/assets";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = ({ theme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const ICON_COLOR = "#FF6B00";

  const handleScrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    toast.success("Inscription réussie !");
  };

  return (
    <footer className="relative bg-white dark:bg-black pt-20 px-6 sm:px-12 lg:px-24 xl:px-40 overflow-hidden">

      {/* 🌄 BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-[#FF6B00]/10 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-[#FF6B00]/5 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* TOP */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <img
            src={theme === "dark" ? assets.logo_dark : assets.logo}
            className="w-36"
            alt="Triplakay"
          />

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Triplakay est votre guide intelligent pour explorer le Cap-Haïtien :
            plages, sites historiques, restaurants et expériences culturelles.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaMapMarkerAlt className="text-[#FF6B00]" />
            Cap-Haïtien, Haïti
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4 pt-2">
            <a href="#"><FaFacebookF color={ICON_COLOR} /></a>
            <a href="#"><FaInstagram color={ICON_COLOR} /></a>
            <a href="mailto:triplakay@gmail.com">
              <FaEnvelope color={ICON_COLOR} />
            </a>
          </div>
        </motion.div>

        {/* NAV LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400"
        >
          <div className="space-y-3">
            <h4 className="font-semibold text-black dark:text-white">Navigation</h4>
            <button onClick={() => handleScrollTo("hero")}>Accueil</button>
            <Link to="/about">À propos</Link>
            <button onClick={() => handleScrollTo("services")}>Fonctionnalités</button>
            <button onClick={() => handleScrollTo("our-work")}>Lieux</button>
            <button onClick={() => handleScrollTo("contact-us")}>Contact</button>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-black dark:text-white">Explorer</h4>
            <p>Plages</p>
            <p>Sites historiques</p>
            <p>Restaurants</p>
            <p>Culture locale</p>
          </div>
        </motion.div>

        {/* NEWSLETTER */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-black dark:text-white text-lg">
            Recevez les meilleurs spots
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Découvrez les nouveaux lieux à visiter au Cap-Haïtien directement dans votre boîte mail.
          </p>

          <form
            onSubmit={handleNewsletter}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-800"
          >
            <input
              type="email"
              placeholder="Votre email"
              className="w-full bg-transparent outline-none text-sm px-2 text-black dark:text-white"
            />
            <button
              type="submit"
              className="bg-[#FF6B00] hover:bg-orange-600 text-white p-3 rounded-lg"
            >
              <FaPaperPlane />
            </button>
          </form>

          {/* MINI STATS */}
          <div className="grid grid-cols-3 gap-2 pt-4 text-center">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 rounded-lg">
              <p className="text-lg font-bold text-[#FF6B00]">20+</p>
              <p className="text-xs">Lieux</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 rounded-lg">
              <p className="text-lg font-bold text-[#FF6B00]">3</p>
              <p className="text-xs">Catégories</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 rounded-lg">
              <p className="text-lg font-bold text-[#FF6B00]">100%</p>
              <p className="text-xs">Local</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM */}
      <div className="relative border-t border-gray-200 dark:border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>© 2026 Triplakay — Explore Cap-Haïtien autrement</p>

        <div className="flex gap-4">
          <a href="#"><FaFacebookF color={ICON_COLOR} /></a>
          <a href="#"><FaInstagram color={ICON_COLOR} /></a>
          <a href="mailto:triplakay@gmail.com">
            <FaEnvelope color={ICON_COLOR} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;