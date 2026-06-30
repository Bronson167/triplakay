import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CATEGORY_DATA = {
 "Alimantasyon & Pwodwi manje": ["Bwason", "Fwi & legim", "Patisri", "Pwason & vyann", "Pwodwi agrikòl", "Lòt pwodwi alimantè"],
"Aparèy & Zouti": ["Ekipman atelye", "Zouti elektrik", "Zouti jaden", "Zouti mekanik", "Zouti men", "Lòt zouti"],
"Bebe & Timoun": ["Chèz", "Jwèt", "Lèt & nouriti tibebe", "Pousèt", "Pwodui ijyèn", "Rad tibebe", "Lòt bagay pou timoun"],
"Elektronik": ["Kamera", "Odinatè biwo", "Odinatè pòtab", "Tablet", "Televizyon", "Telefòn entelijan", "Lòt gadjèt"],
"Espò & Aktivite fizik": ["Bisiklèt espò", "Boul & jwèt espò", "Ekipman fè egzèsis", "Rad espò", "Soulye espò", "Lòt aktivite fizik"],
"Fòmasyon": ["An liy", "An liy ak prezansyèl", "Prezansyèl", "Lòt fòmasyon"],
"Jaden & Agrikilti": ["Abè & angrè", "Ekipman agrikòl", "Gren", "Plant", "Zouti jaden", "Lòt bagay jaden"],
"Kay & Imobilye": ["Apatman", "Biwo / Lokal komèsyal", "Kay pou lwe", "Kay pou vann", "Tè / Teren", "Lòt imobilye"],
"Liv & Papeteri": ["Jounal & magazin", "Kado edikatif", "Liv edikatif", "Liv roman", "Papye & Kaye", "Plim & Kreyon", "Lòt papeteri"],
"Machin & Moto": ["Aksesswa moto", "Antretyen moto ak machin", "Bisiklèt", "Machin", "Moto", "Pyès machin", "Lòt materyèl"],
"Mèb & Dekorasyon": ["Chèz", "Dekorasyon pou kkay", "Etajè", "Gadwòb", "Kabann", "Miwa", "Sofa", "Tab", "Lòt mèb"],
"Mizik & Atizay": ["Atik atizay", "Enstriman mizik", "Koulè & penti", "Papye & materyèl atistik", "Pwodwi mizik", "Lòt mizik & atizay"],
"Pwodwi Bèlte & Swen Pèsonèl": ["Krèm & lwil kò", "Pwodwi cheve", "Pwodwi ijyèn pèsonèl", "Pwodwi makiyaj", "Pwodwi pou nen & bouch", "Pwodwi swen po", "Lòt bèlte"],
"Pwodwi Lakay": ["Blender / Mixè", "Fou / Kwizinè", "Frijidè", "Machin lesiv", "Pwodui netwayaj", "Ventilatè", "Lòt aparèy pou kay"],
"Pwodwi Sante": ["Ekipman medikal", "Medikaman", "Pwodwi fizik terapi", "Pwodwi ijyèn sante", "Vitamin & sipleman", "Lòt sante"],
"Pwodwi Teknik & Endistriyèl": ["Ekipman mekanik", "Materyèl konstriksyon", "Pwodwi chimik endistriyèl", "Pwodwi elektrik endistriyèl", "Zouti pwofesyonèl", "Lòt teknik & endistriyèl"],
"Pwodwi pou Animaux": ["Jwèt pou bèt", "Kabann & kay bèt", "Manje pou bèt", "Pwodwi ijyèn bèt", "Lòt pwodwi bèt"],
"Rad & Aksesswa": ["Bijou", "Mont", "Rad fi", "Rad gason", "Rad timoun", "Soulye", "Tenis", "Valiz", "Lòt Akseswa"],
"Sèvis espesyal": ["Asistans pèsonèl", "Atik pèsonalize", "konfeksyon inik", "Lòt sèvis espesyal"],
"Teknoloji & Gadgets espesyal": ["Dron", "Home automation", "Kamera sekirite", "Printer 3D", "Smartwatch", "Lòt gadgets espesyal"],
"Touris & Lwazi": ["Pwodwi lwazi & aktivite deyò", "Pwodwi pou kaning", "Pwodwi pou plaj", "Pwodwi pou randone", "Valiz & sak", "Lòt touris & lwazi"]

};

const CategoryMenuDisplay = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 py-6 text-sm text-gray-900 mt-5">
      {Object.entries(CATEGORY_DATA).map(([category, subcategories], index) => (
        <motion.div
          key={category}
          className="flex flex-col w-full text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }} // ❗ NO "once: true" so it animates every time it's visible
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
        >
          <h3 className="font-bold text-xs uppercase mb-2 text-gray-900 border-b pb-1">
            {category}
          </h3>
          <ul className="space-y-1">
            {subcategories.map((sub, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  navigate(`/soukategori/${encodeURIComponent(sub)}`)
                }
                className="text-black hover:text-white hover:bg-black px-2 py-1 rounded transition-colors cursor-pointer"
              >
                {sub}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryMenuDisplay;
