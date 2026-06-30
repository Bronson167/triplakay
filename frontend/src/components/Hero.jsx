import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-white dark:bg-black overflow-hidden">

      {/* 🌊 BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0">
        <img
          src={assets.hero_travel || assets.cap_haitien_banner}
          alt="Cap-Haïtien"
          className="w-full h-full object-cover opacity-20 dark:opacity-10"
        />
      </div>

      {/* 🌅 ORANGE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80" />

      <div className="relative px-6 sm:px-12 lg:px-24 xl:px-40 py-24 flex flex-col lg:flex-row items-center gap-12">

        {/* LEFT CONTENT */}
        <div className="flex-1">

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-medium"
          >
            ✈️ Explore Cap-Haïtien autrement
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-bold mt-6 text-black dark:text-white leading-tight"
          >
            Découvrez les plus beaux lieux du
            <span className="text-[#FF6B00]"> Cap-Haïtien</span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-300 mt-6 max-w-xl"
          >
           Explorez le Cap-Haïtien comme vous ne l’avez jamais vu auparavant. Entre ses sites historiques emblématiques, ses plages aux eaux turquoise, sa richesse culturelle unique et sa gastronomie locale authentique, chaque coin de la ville raconte une histoire. Avec Triplakay, laissez-vous guider vers les meilleurs endroits, découvrez des trésors cachés et vivez des expériences inoubliables à chaque sortie. Que vous soyez habitant ou visiteur, l’application vous accompagne pour transformer chaque déplacement en véritable aventure et redécouvrir la beauté exceptionnelle du Cap-Haïtien en toute simplicité
          </motion.p>

          {/* SEARCH BAR STYLE */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 max-w-xl"
          >
            <input
              type="text"
              placeholder="Rechercher un lieu (Citadelle, plage...)"
              className="flex-1 px-4 py-2 outline-none bg-transparent text-black dark:text-white"
            />

            <button className="bg-[#FF6B00] hover:bg-[#e85f00] text-white px-6 py-2 rounded-xl transition">
              Explorer
            </button>
          </motion.div> */}

          {/* CTA */}
          <div className="flex gap-4 mt-8">
            <a
                href="https://drive.google.com/file/d/1C-oJhi-r2EtLDYLBpCwDzpqJbrcgCA3C/view?usp=drive_link"
              download
              className="
                px-4 py-3.5
                rounded-2xl
                bg-[#FF6B00]
                hover:bg-[#e85f00]
                text-white
                font-semibold
                shadow-xl
                transition
                text-sm
                hover:scale-105
              "
            >
              Télécharger l'app
            </a>
            

         <button
  onClick={() => {
    const link = document.createElement("a");
    link.href = "/doc/documentation.pdf";
    link.download = "triplakay.pdf"; // Nom du fichier téléchargé
    link.click();
  }}
  className="border border-gray-300 dark:border-gray-700 px-4 py-3 rounded-xl text-black dark:text-white hover:bg-gray-100  text-sm dark:hover:bg-gray-900 transition"
>
  Télécharger la documentation
</button>
          </div>
        </div>

        {/* RIGHT IMAGE STACK */}
        <div className="flex-1 relative">

          {/* MAIN IMAGE */}
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={assets.hero_travel || assets.cap_haitien_image}
            alt="Travel"
            className="rounded-3xl shadow-2xl w-full max-w-md mx-auto"
          />

          {/* FLOATING CARD 1 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute top-10 dark:text-white -left-6 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
          >
            📍 Citadelle Laferrière
          </motion.div>

          {/* FLOATING CARD 2 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute dark:text-white bottom-10 -right-6 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
          >
            🏖️ Plages & détente
          </motion.div>

          {/* GLOW */}
          <div className="absolute inset-0 bg-[#FF6B00]/10 blur-3xl rounded-full -z-10" />
        </div>
      </div>
    </div>
  );
};

export default Hero;