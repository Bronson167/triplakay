import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import { motion } from "framer-motion";
import { FaUmbrellaBeach, FaLandmark, FaUtensils, FaMapMarkedAlt } from "react-icons/fa";

function Places() {
  const placesData = [
    {
      title: "Plages paradisiaques",
      description:
        "Découvrez les plus belles plages du Cap-Haïtien et ses environs pour la détente et les loisirs.",
      image: assets.beach || assets.work_fitness_app,
      icon: <FaUmbrellaBeach />,
      tag: "Nature",
    },
    {
      title: "Sites historiques",
      description:
        "Explorez la Citadelle Laferrière, Sans-Souci et les lieux emblématiques du patrimoine haïtien.",
      image: assets.citadel || assets.work_mobile_app,
      icon: <FaLandmark />,
      tag: "Histoire",
    },
    {
      title: "Restaurants locaux",
      description:
        "Goûtez à la cuisine haïtienne authentique dans les meilleurs restaurants et spots locaux.",
      image: assets.restaurant || assets.work_dashboard_management,
      icon: <FaUtensils />,
      tag: "Gastronomie",
    },
    {
      title: "Points d’intérêt & culture",
      description:
        "Découvrez les lieux culturels, musées et espaces publics incontournables du Cap-Haïtien.",
      image: assets.band || assets.work_fitness_app,
      icon: <FaMapMarkedAlt />,
      tag: "Culture",
    },
  ];

  return (
    <section
      id="places"
      className="px-6 sm:px-12 lg:px-24 xl:px-40 py-24 bg-white dark:bg-black"
    >
      {/* TITLE */}
      <Title
        title="Découvrez le Cap-Haïtien"
        desc="Plages, sites historiques, restaurants et lieux culturels : explorez tout ce que la ville a à offrir avec Triplakay."
      />

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

        {placesData.map((place, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="group relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800"
          >

            {/* IMAGE */}
            <div className="relative h-72">
              <img
                src={place.image}
                alt={place.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* TAG */}
              <div className="absolute top-4 left-4 bg-[#FF6B00] text-white text-xs px-3 py-1 rounded-full">
                {place.tag}
              </div>

              {/* ICON BIG */}
              <div className="absolute bottom-4 right-4 w-12 h-12 flex items-center justify-center bg-white/90 text-[#FF6B00] rounded-full text-xl">
                {place.icon}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {place.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {place.description}
              </p>

              {/* CTA */}
              <div className="mt-4 text-[#FF6B00] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Explorer →
              </div>

            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}

export default Places;