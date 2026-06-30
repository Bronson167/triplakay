import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const Title = ({ title, desc }) => {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState("down");

  useEffect(() => {
    let lastY = scrollY.get();

    return scrollY.on("change", (current) => {
      setDirection(current > lastY ? "down" : "up");
      lastY = current;
    });
  }, [scrollY]);

  return (
    <div className="flex flex-col items-center text-center mb-14 px-2">

      {/* SMALL BADGE */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 px-4 py-1 rounded-full text-xs sm:text-sm font-medium
        bg-[#FF6B00]/10 text-[#FF6B00] tracking-wide"
      >
        ✦ Triplakay • Explore Cap-Haïtien
      </motion.div>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: direction === "down" ? 40 : -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
      >
        <span className="bg-gradient-to-r from-[#FF6B00] to-orange-500 bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>

      {/* DESCRIPTION */}
      <motion.p
        initial={{ opacity: 0, y: direction === "down" ? 30 : -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: false, amount: 0.3 }}
        className="mt-5 max-w-2xl text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
      >
        {desc}
      </motion.p>

      {/* DECORATIVE LINE */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 120, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-[3px] mt-6 rounded-full bg-gradient-to-r from-[#FF6B00] via-orange-400 to-transparent"
      />

    </div>
  );
};

export default Title;