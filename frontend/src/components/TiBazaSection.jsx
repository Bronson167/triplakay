import React, { useEffect, useRef, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from './ProductCard';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
// import { ImSpinner2 } from 'react-icons/im';

const TiBazaSection = () => {
  const scrollRef = useRef();
  const { fetchFeaturedProducts } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadTiBazaProducts = async () => {
      const allProducts = await fetchFeaturedProducts(20); // récupérer plus pour filtrer TiBaza
      const tibazaProducts = allProducts.filter(p => p.userAccountType === "TiBaza");
      setProducts(tibazaProducts);
     
      setLoading(false);
    };
    loadTiBazaProducts();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  // Ne rien afficher si aucun produit
  if (!loading && products.length === 0) return null;

  return (
    <motion.div
      className="px-4 py-6 relative pt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Anons TiBaza</h2>
        <a href="/tibaza" className="text-blue-600 text-sm hover:underline">
          Gade tout anons →
        </a>
      </div>

      {/* Bouton scroll gauche */}
      <button
        onClick={() => scroll('left')}
        className="hidden sm:flex absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100"
      >
        <img src={assets.left_arrow} alt="gauche" className="w-6 h-6 object-contain" />
      </button>

      {/* Conteneur scroll horizontal */}
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pr-4">
        {loading ? (
          <div className="flex justify-center items-center w-full py-16 text-gray-600 text-lg gap-3">
            {/* <ImSpinner2 className="animate-spin text-3xl text-green-600" /> */}
            Nap chaje anons TiBaza yo...
          </div>
        ) : (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex-shrink-0 relative"
              viewport={{ once: true }}
            >
              {/* Nouveau badge TiBaza en cercle zigzag */}
             <div className="absolute top-2 right-2 w-16 h-16 flex items-center justify-center z-10">
  <div
    className="w-full h-full rounded-full bg-blue-600 relative flex items-center justify-center"
    style={{
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    }}
  >
    <img src={assets.logoWhite} alt="Badge TiBaza" className="w-6 h-6"/>
  </div>
</div>


              <ProductCard product={product} />
            </motion.div>
          ))
        )}

        {/* CTA Card "Voir plus" */}
        {!loading && products.length > 0 && (
          <motion.a
            href="/tibaza"
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
        )}
      </div>

      {/* Bouton scroll droite */}
      <button
        onClick={() => scroll('right')}
        className="hidden sm:flex absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100"
      >
        <img src={assets.right_arrow} alt="droite" className="w-6 h-6 object-contain" />
      </button>
    </motion.div>
  );
};

export default TiBazaSection;
