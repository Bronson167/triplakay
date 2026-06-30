import React from "react";
import Title from "./Title";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaMapMarkedAlt,
  FaSearchLocation,
  FaLeaf,
  FaMobileAlt,
  FaGlobeAmericas,
} from "react-icons/fa";

const Services = () => {
  const servicesData = [
    {
      title: "Explorer les lieux du Cap-Haïtien",
      description:
        "Découvrez les sites historiques, plages et attractions culturelles les plus emblématiques de la ville.",
      icon: <FaMapMarkedAlt size={26} />,
    },
    {
      title: "Recherche de lieux",
      description:
        "Trouvez rapidement un endroit grâce à une recherche fluide par nom ou catégorie.",
      icon: <FaSearchLocation size={26} />,
    },
    {
      title: "Catégories de découverte",
      description:
        "Filtrez les lieux par plages, patrimoine, restaurants et expériences locales.",
      icon: <FaGlobeAmericas size={26} />,
    },
    {
      title: "Favoris personnalisés",
      description:
        "Enregistrez vos lieux préférés pour les retrouver facilement à tout moment.",
      icon: <FaUsers size={26} />,
    },
    {
      title: "Navigation et localisation",
      description:
        "Accédez aux coordonnées et localisez facilement chaque point d’intérêt sur la carte.",
      icon: <FaMobileAlt size={26} />,
    },
    {
      title: "Découverte culturelle locale",
      description:
        "Explorez la richesse culturelle du Cap-Haïtien et vivez des expériences authentiques.",
      icon: <FaLeaf size={26} />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      id="services"
      className="px-6 sm:px-12 lg:px-24 xl:px-40 py-20 bg-white dark:bg-black"
    >
      {/* TITLE */}
      <Title
        title="Explorez les fonctionnalités de Triplakay"
        desc="Votre guide pour découvrir le Cap-Haïtien facilement et autrement."
      />

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="group relative p-6 rounded-2xl border border-gray-200 dark:border-gray-800
            bg-gray-50 dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >

            {/* GLOW EFFECT */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#FF6B00]/10 to-transparent" />

            {/* ICON */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] mb-4">
              {service.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              {service.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}

      </div>
    </motion.section>
  );
};

export default Services;