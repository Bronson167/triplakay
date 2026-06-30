import React, { useRef, useState } from "react";
import { motion } from "motion/react";

function ServiceCard({ service, index }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative overflow-hidden max-w-lg m-2 sm:m-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={divRef}
      onMouseMove={handleMouseMove}
    >
      {/* 🌿 Glow vert (cohérent avec ton app) */}
      <div
        className={`pointer-events-none blur-3xl rounded-full bg-[#28A745] w-[250px] h-[250px] absolute z-0 transition-opacity duration-500 ${
          visible ? "opacity-40" : "opacity-0"
        }`}
        style={{ top: position.y - 125, left: position.x - 125 }}
      />

      <div className="flex items-center gap-6 p-6 sm:p-8 bg-white dark:bg-black z-10 relative rounded-2xl transition-all duration-300">
        
        {/* Icône */}
        <div className="bg-[#28A745]/10 dark:bg-[#28A745]/20 rounded-full p-4 flex items-center justify-center">
          {service.icon}
        </div>

        {/* Contenu */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-black dark:text-white">
            {service.title}
          </h3>

          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ServiceCard;