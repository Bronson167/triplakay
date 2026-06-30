import React from "react";
import { motion } from "framer-motion";
import assets from "../assets/assets";
import { FaMapMarkedAlt, FaUmbrellaBeach, FaLandmark, FaUtensils } from "react-icons/fa";

const About = () => {
  const features = [
    {
      title: "Sites historiques",
      icon: <FaLandmark />,
    },
    {
      title: "Plages paradisiaques",
      icon: <FaUmbrellaBeach />,
    },
    {
      title: "Cuisine locale",
      icon: <FaUtensils />,
    },
    {
      title: "Navigation intelligente",
      icon: <FaMapMarkedAlt />,
    },
  ];

  return (
    <section className="relative py-24 px-6 sm:px-12 lg:px-24 xl:px-40 bg-white dark:bg-black overflow-hidden">

      {/* subtle background glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#FF6B00]/10 blur-[140px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-[#FF6B00]/5 blur-[120px] rounded-full bottom-[-150px] right-[-150px]" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium mb-5">
            ✦ Explore Cap-Haïtien
          </div>

          {/* title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-black dark:text-white leading-tight">
            Voyagez autrement à travers le Cap-Haïtien
          </h2>

          {/* subtitle */}
          <p className="mt-5 text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
            Triplakay vous guide à travers les plus beaux endroits du Cap-Haïtien :
            plages, patrimoine historique, gastronomie et culture locale.
            Une expérience immersive pour découvrir la ville comme un local.
          </p>

          {/* features mini list */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="text-[#FF6B00] text-lg">{f.icon}</span>
                {f.title}
              </div>
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

        {/* RIGHT VISUAL GRID */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >

          {/* big card */}
          <div className="col-span-2 relative rounded-3xl overflow-hidden h-64 shadow-xl group">
            <img
              src={assets.hero_travel}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white font-semibold">
              Cap-Haïtien • Explorer
            </p>
          </div>

          {/* small cards */}
          <div className="relative rounded-2xl overflow-hidden h-40 shadow-md group">
            <img
              src={assets.work_fitness_app}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              alt=""
            />
            <div className="absolute inset-0 bg-black/40" />
            <p className="absolute bottom-2 left-2 text-white text-sm">
              Plages
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-40 shadow-md group">
            <img
              src={assets.work_mobile_app}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              alt=""
            />
            <div className="absolute inset-0 bg-black/40" />
            <p className="absolute bottom-2 left-2 text-white text-sm">
              Histoire
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default About;