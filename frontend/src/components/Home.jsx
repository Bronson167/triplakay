import React, { useState, useEffect } from "react";
import CarouselComponent from "./Carousel";
import AdBanner from "./AdBanner";
import ProductSection from "./ProductSection";
import Electronics from "./Electronics";
import VariousAccessories from "./VariousAccessories";
import RealEstate from "./RealEstate";
import Car from "./Car";
import Tools from "./Tools";
import HomeAcce from "./HomeAcce";
import CategoryMenuDisplay from "../components/MenuDisplay";
import { Helmet } from "react-helmet-async";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import TiBazaSection from "./TiBazaSection";

const categories = [
  "Elektronik",
  "Mèb & Dekorasyon",
  "Rad & Akseswa",
  "Sèvis espesyal",
  "Fòmasyon",
  "Machin & Moto",
  "Kay & Imobilye",
  "Aparèy & Zouti",
  "Jaden & Agrikilti",
  "Bebe & Timoun",
  "Elektromenaje",
  "Alimantasyon & Pwodwi manje",
  "Liv & Papeteri",
  "Pwodwi Bèlte & Swen Pèsonèl",
  "Espò & Aktivite fizik",
  "Mizik & Atizay",
  "Pwodwi Sante",
  "Teknoloji & Gadgets espesyal",
  "Pwodwi pou bèt",
  "Touris & Lwazi",
  "Pwodwi Teknik & Endistriyèl",
];

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
   const { fetchProductsByCategory } = useContext(ShopContext);

  useEffect(() => {
    const loadCategories = async () => {
      const validCategories = [];

      for (let cat of categories) {
        // ⚡ Vérifie d’abord dans localStorage
        const saved = localStorage.getItem(`categoryData_${cat}`);

        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.products && parsed.products.length > 0) {
            validCategories.push(cat);
            
            continue; // pas besoin d'appel API
          }
        }

        // ⚡ Sinon → petit appel API avec limit=1 pour tester
        const products = await fetchProductsByCategory(cat);
        if (products.length > 0) {
          validCategories.push(cat);
        }
      }

      // Mélange + prend 6
      const shuffled = validCategories.sort(() => 0.5 - Math.random());
      setSelectedCategories(shuffled.slice(0, 4));
    };

    loadCategories();
  }, []);

  const productComponents = [
    Electronics,
    VariousAccessories,
    RealEstate,
    Car,
    Tools,
    HomeAcce,
  ];

  return (
    <div>
      <Helmet>
        <title>TiBaza - Sit Anons Gratis an Ayiti</title>
        <meta
          name="description"
          content="TiBaza se yon sit anons sou entènèt kote ou ka achte, vann, oswa lwe pwodwi ak sèvis nan Ayiti. Dekouvri kategori tankou Elektronik, Rad, Kay, Machin, ak plis ankò."
        />
        <meta
          name="keywords"
          content="TiBaza, anons, achte, vann, lwe, Ayiti, Elektronik, Machin, Kay, Rad, Mèb, Zouti"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <CarouselComponent />
      <AdBanner />
      <ProductSection />
      <TiBazaSection />
      {productComponents.map((Comp, idx) => {
        const categoryName = selectedCategories[idx];
        if (!categoryName) return null;
        return <Comp key={idx} categoryName={categoryName} />;
      })}

      <CategoryMenuDisplay />
    </div>
  );
};

export default Home;
