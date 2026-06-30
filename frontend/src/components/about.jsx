import React from "react";
import { motion } from "framer-motion";
import assets from "../assets/assets";
import { FaMapMarkedAlt, FaUmbrellaBeach, FaLandmark, FaUtensils } from "react-icons/fa";

const About = () => {
  const features = [
    {
      title: "Explorer les lieux emblématiques",
      desc: "Découvrez la Citadelle Laferrière, Sans-Souci et les sites historiques incontournables du Cap-Haïtien.",
      icon: <FaLandmark />,
    },
    {
      title: "Plages et détente",
      desc: "Accédez aux plus belles plages et spots naturels pour vivre une expérience unique au bord de la mer.",
      icon: <FaUmbrellaBeach />,
    },
    {
      title: "Cuisine locale",
      desc: "Trouvez les meilleurs restaurants et savourez la richesse de la gastronomie haïtienne.",
      icon: <FaUtensils />,
    },
    {
      title: "Navigation intelligente",
      desc: "Un guide moderne qui vous aide à explorer la ville facilement et efficacement.",
      icon: <FaMapMarkedAlt />,
    },
  ];

  return (
    <section className="relative px-6 sm:px-12 lg:px-24 xl:px-40 py-24 bg-white dark:bg-black overflow-hidden">

      {/* 🌄 BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={assets.hero_travel}
          alt="Cap-Haïtien"
          className="w-full h-full object-cover opacity-10 dark:opacity-5"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white dark:from-black dark:via-black/90 dark:to-black" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        {/* 🧠 TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium mb-4">
            ✦ Triplakay Guide Officiel
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-black dark:text-white leading-tight">
            Découvrez le Cap-Haïtien autrement
          </h2>

          <p className="mt-6 text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
            Triplakay vous permet d’explorer les trésors du Cap-Haïtien à travers une expérience
            moderne et intuitive. Entre histoire, culture et paysages naturels, chaque coin de la
            ville devient une aventure unique à découvrir depuis votre téléphone.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-5">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex gap-3 items-start"
              >
                <div className="text-[#FF6B00] text-lg mt-1">
                  {item.icon}
                </div>

                <div>
                  <h4 className="text-black dark:text-white font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
         <motion.a
  href="https://drive.google.com/file/d/1C-oJhi-r2EtLDYLBpCwDzpqJbrcgCA3C/view?usp=drive_link"
  target="_blank"
  rel="noopener noreferrer"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
  className="inline-block mt-10 px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-medium shadow-lg transition"
>
  Explorer maintenant
</motion.a>
        </motion.div>

        {/* 🖥️ VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >

          <div className="relative w-full max-w-md">

            {/* CARD */}
            <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-800">

              {/* HEADER IMAGE */}
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <img
                  src={assets.hero_travel}
                  alt="Cap-Haïtien"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-3 left-3 text-white text-sm font-semibold">
                  Cap-Haïtien • Trésors cachés
                </div>
              </div>

              {/* LIST */}
              <div className="space-y-3 text-sm">

                <div className="p-3 rounded-lg bg-gray-100 dark:bg-black border border-gray-200 dark:border-gray-800">
                  📍 Sites historiques majeurs
                </div>

                <div className="p-3 rounded-lg bg-gray-100 dark:bg-black border border-gray-200 dark:border-gray-800">
                  🏖️ Plages paradisiaques
                </div>

                <div className="p-3 rounded-lg bg-gray-100 dark:bg-black border border-gray-200 dark:border-gray-800">
                  🍽️ Cuisine locale authentique
                </div>

              </div>
            </div>

            {/* GLOW */}
            <div className="absolute inset-0 bg-[#FF6B00]/10 blur-3xl rounded-3xl -z-10" />

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;