import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import ThemeToogleBtn from "./ThemeToogleBtn";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ theme, setTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = null;

const handleScrollTo = (id) => {
  setSidebarOpen(false);

  if (location.pathname !== "/") {
    navigate("/");

    setTimeout(() => {
      if (id === "hero") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 300);
  } else {
    if (id === "hero") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
};
  return (
    <>
      {/* NAVBAR */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-40
        backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border-b border-orange-100 dark:border-gray-800"
      >
        {/* LOGO */}
        <Link to="/" onClick={() => setSidebarOpen(false)}>
          <img
            src={theme === "dark" ? assets.logo_dark : assets.logo}
            className="w-15 sm:w-15 transition-transform hover:scale-105"
            alt="logo"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-6 ml-10 text-gray-700 dark:text-white font-medium">
          <button onClick={() => handleScrollTo("hero")} className="hover:text-[#FF6B00] transition">
            Accueil
          </button>

          <Link
            to="/about"
            onClick={() => setSidebarOpen(false)}
            className="hover:text-[#FF6B00] transition"
          >
            À propos
          </Link>

          <button onClick={() => handleScrollTo("services")} className="hover:text-[#FF6B00] transition">
            Fonctionnalités
          </button>

          {/* <button onClick={() => handleScrollTo("our-work")} className="hover:text-[#FF6B00] transition">
            Solution
          </button> */}

          <button onClick={() => handleScrollTo("contact-us")} className="hover:text-[#FF6B00] transition">
            Contact
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToogleBtn theme={theme} setTheme={setTheme} />

          {/* MOBILE MENU BUTTON */}
          <img
            src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon}
            alt="menu"
            onClick={() => setSidebarOpen(true)}
            className="w-8 sm:hidden cursor-pointer hover:scale-110 transition"
          />

          {/* CTA */}
          <a
            href="https://drive.google.com/file/d/1C-oJhi-r2EtLDYLBpCwDzpqJbrcgCA3C/view?usp=drive_link"
            download
            className="hidden sm:inline-block border-2 border-[#FF6B00] text-[#FF6B00]
            px-6 py-2 rounded-full font-medium
            hover:bg-[#FF6B00] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Télécharger l'application
          </a>
        </div>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* MENU */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white dark:bg-black z-50 p-6 flex flex-col
              border-l border-orange-100 dark:border-gray-800"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-10">
                <img
                  src={theme === "dark" ? assets.logo_dark : assets.logo}
                  className="w-28"
                  alt="logo"
                />

                <img
                  src={assets.close_icon}
                  alt="close"
                  className="w-6 cursor-pointer hover:rotate-90 transition"
                  onClick={() => setSidebarOpen(false)}
                />
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-6 text-lg font-medium text-gray-800 dark:text-white">
                <button onClick={() => handleScrollTo("hero")} className="text-left hover:text-[#FF6B00]">
                  Accueil
                </button>

                <button onClick={() => handleScrollTo("services")} className="text-left hover:text-[#FF6B00]">
                  Fonctionnalités
                </button>

                {/* <button onClick={() => handleScrollTo("our-work")} className="text-left hover:text-[#FF6B00]">
                  Solution
                </button> */}

                <button onClick={() => handleScrollTo("contact-us")} className="text-left hover:text-[#FF6B00]">
                  Contact
                </button>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <a
                  href="#download"
                  onClick={() => setSidebarOpen(false)}
                  className="block text-center bg-[#FF6B00] text-white py-3 rounded-xl font-semibold
                  shadow-lg hover:shadow-xl transition"
                >
                  Télécharger l'application
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;