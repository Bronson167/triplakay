import React, { useRef, useEffect, useContext, useState } from 'react';
import ProductCard from './ProductCard';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';
// import { ImSpinner2 } from 'react-icons/im';

const ProductSection = ({ categoryName }) => {
  const scrollRef = useRef();
  const { categoryData, fetchProductsByCategory } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchProductsByCategory(categoryName);
      setLoading(false);
    };
    loadData();
  }, [categoryName]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const products = categoryData[categoryName]?.products || [];

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="px-4 py-6 relative pt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{categoryName}</h2>
        <a
          href={`/kategori/${encodeURIComponent(categoryName)}`}
          className="text-blue-600 text-sm hover:underline"
        >
          Gade plis anons →
        </a>
      </div>

      {/* Flèche gauche */}
      <button
        onClick={() => scroll('left')}
        className="hidden sm:flex absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100"
      >
        <img src={assets.left_arrow} alt="gauche" className="w-6 h-6 object-contain" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pr-4"
      >
        {loading ? (
          <div className="flex justify-center items-center w-full py-16 text-gray-600 text-lg gap-3">
            {/* <ImSpinner2 className="animate-spin text-3xl text-green-600" />
            Nap chaje anons yo... */}
          </div>
        ) : (
          <>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex-shrink-0"
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

            {/* CTA "Gade plis anons" */}
            <motion.a
              href={`/kategori/${encodeURIComponent(categoryName)}`}
              className="w-48 flex-shrink-0 flex items-center justify-center border rounded p-4 text-center hover:bg-gray-100 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <img src={assets.add_icon} alt="Voir plus" className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-blue-600 hover:underline">
                  Gade plis anons
                </span>
              </div>
            </motion.a>
          </>
        )}
      </div>

      {/* Flèche droite */}
      <button
        onClick={() => scroll('right')}
        className="hidden sm:flex absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100"
      >
        <img src={assets.right_arrow} alt="droite" className="w-6 h-6 object-contain" />
      </button>
    </motion.div>
  );
};

export default ProductSection;
