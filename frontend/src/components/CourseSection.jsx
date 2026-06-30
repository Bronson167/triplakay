import React, { useRef } from "react";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";

const CourseSection = ({ title, courses }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
      </div>

      {/* Flèches */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 shadow-md rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 z-10"
      >
        ◀
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 shadow-md rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 z-10"
      >
        ▶
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseSection;
