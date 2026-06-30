import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const {
    id,
    title,
    thumbnail,
    instructor,
    rating,
    studentsCount,
    price,
    currency
  } = course;

  const safeRating = rating || { average: 0, count: 0 };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(safeRating.average);
    const halfStar = safeRating.average % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++)
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    if (halfStar)
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    while (stars.length < 5)
      stars.push(<FaRegStar key={stars.length} className="text-yellow-400" />);

    return stars;
  };

  return (
    <Link
      to={`/course/${id}`}
      className="min-w-[250px] max-w-[250px] bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col"
    >
      <img
        src={thumbnail || "/images/course-placeholder.png"}
        alt={title}
        className="h-40 w-full object-cover rounded-md mb-3"
      />

      <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
        {instructor?.name || "Instructeur inconnu"}
      </p>

      <div className="flex items-center text-sm mb-1">
        <div className="flex">{renderStars()}</div>
        <span className="ml-2 text-gray-700 dark:text-gray-300">
          {safeRating.average.toFixed(1)}
        </span>
        <span className="ml-1 text-gray-400">({safeRating.count})</span>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {studentsCount} étudiant{studentsCount > 1 ? "s" : ""}
      </p>

      <p className="text-gray-900 dark:text-white font-bold mt-auto">
        {price === 0 ? "Gratuit" : `${price} ${currency}`}
      </p>
    </Link>
  );
};

export default CourseCard;
