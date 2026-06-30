import React from 'react';
import { Link } from 'react-router-dom';
// import { FaMapMarkerAlt, FaTruck, FaCalendarAlt } from 'react-icons/fa';
// import { assets } from '../assets/assets'; // Pour le logo TiBaza
// import logo from '../assets/logo-white.png'; // Pour le badge Pro

const ProductCard = ({ product }) => {
  const formattedDate = product.date
    ? new Date(product.date).toLocaleDateString("fr-FR", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : "Dat enkoni";

  return (
    <Link
      to={`/product/${product.id}`}
      className="relative min-w-[220px] max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col"
    >
      {/* Badge Vendeur Pro */}
      {product.userAccountType === "pro" && (
        <div className="absolute top-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
          <img src={logo} alt="Pro Badge" className="w-5 h-5 object-contain" />
        </div>
      )}

      {/* Badge TiBaza */}
      {product.userAccountType === "TiBaza" && (
        <div className="absolute top-2 right-2 w-16 h-16 flex items-center justify-center z-10">
          <div
            className="w-full h-full rounded-full bg-blue-600 relative flex items-center justify-center"
            style={{
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
          >
            {/* <img src={assets.logoWhite} alt="Badge TiBaza" className="w-6 h-6" /> */}
          </div>
        </div>
      )}

      <img
        src={product.image?.[0]}
        alt={product.title}
        className="w-full h-44 object-cover rounded mb-2"
      />

      <div className="flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-gray-800 truncate">{product.title}</h3>

        <p className="text-blue-600 font-bold text-sm mt-1">{product.price} Goud</p>

        {product.delivery && (
          <div className="flex items-center text-[11px] text-green-600 mt-1">
            {/* <FaTruck className="mr-1" /> Livrezon disponib */}
          </div>
        )}

        <div className="flex items-center text-[11px] text-gray-500 mt-1">
          {/* <FaMapMarkerAlt className="mr-1" /> {product.city || "Vil enkoni"}  */}
        </div>

        {product.address && (
  <p className="text-[11px] text-gray-500 mt-1 truncate">
    🏠 {product.address}
  </p>
)}


        <div className="flex items-center text-[11px] text-gray-400 mt-1">
          {/* <FaCalendarAlt className="mr-1" /> Pibliye le : {formattedDate} */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
