import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductSection = ({ course }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="border rounded-xl overflow-hidden shadow hover:shadow-lg cursor-pointer bg-white"
      whileHover={{ scale: 1.03 }}
      onClick={() => navigate(`/formation/${course.id}`)}
    >
      <img
        src={course.thumbnail || "/placeholder.png"}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{course.title}</h2>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.subtitle}</p>
        <div className="flex justify-between items-center">
          <span className="text-purple-600 font-semibold">
            {course.isFree ? "Gratuit" : `${course.price} ${course.currency}`}
          </span>
          <span className="text-gray-400 text-sm">{course.totalDuration} min</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSection;
