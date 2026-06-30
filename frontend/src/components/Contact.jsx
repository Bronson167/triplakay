import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("access_key", "9040bdcf-0d15-4835-a574-08fc6cb1c8fe");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message envoyé avec succès !");
        event.target.reset();
      } else {
        toast.error("Une erreur est survenue !");
      }
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue !");
    }
  };

  return (
    <section id="contact-us" className="relative py-24 px-6 sm:px-12 lg:px-24 xl:px-40 overflow-hidden bg-white dark:bg-black">

      {/* 🌄 BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={assets.hero_travel}
          alt="Cap-Haïtien background"
          className="w-full h-full object-cover opacity-10 dark:opacity-5"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white dark:from-black dark:via-black/90 dark:to-black" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center">

        {/* TITLE */}
        <Title
          title="Contact & Assistance Triplakay"
          desc="Une question, une suggestion ou une collaboration ? L’équipe Triplakay est à votre écoute pour améliorer votre expérience de découverte du Cap-Haïtien."
        />

        {/* FORM CARD */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={onSubmit}
          className="mt-10 w-full max-w-3xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl
          border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8"
        >

          <div className="grid sm:grid-cols-2 gap-5">

            {/* NAME */}
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Votre nom
              </p>
              <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2">
                <FaUser className="text-[#FF6B00]" />
                <input
                  type="text"
                  name="name"
                  placeholder="Entrer votre nom"
                  className="w-full outline-none bg-transparent text-sm text-black dark:text-white"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Email
              </p>
              <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2">
                <FaEnvelope className="text-[#FF6B00]" />
                <input
                  type="email"
                  name="email"
                  placeholder="Entrer votre email"
                  className="w-full outline-none bg-transparent text-sm text-black dark:text-white"
                  required
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div className="sm:col-span-2">
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Message
              </p>

              <div className="flex items-start gap-3 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-3">
                <FaCommentDots className="text-[#FF6B00] mt-1" />
                <textarea
                  rows={6}
                  name="message"
                  placeholder="Écrivez votre message..."
                  className="w-full outline-none bg-transparent text-sm text-black dark:text-white resize-none"
                  required
                />
              </div>
            </div>

          </div>

          {/* BUTTON */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#e85f00]
              text-white px-8 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition"
            >
              Envoyer <FaPaperPlane />
            </button>
          </div>
        </motion.form>

        {/* INFO CARDS */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">

          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-5 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
            🏷️ Cap-Haïtien
            <p className="text-sm text-gray-500 mt-2">Localisation principale</p>
          </div>

          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-5 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
            ⚡ Réponse rapide
            <p className="text-sm text-gray-500 mt-2">Support réactif</p>
          </div>

          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-5 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
            🌍 Triplakay App
            <p className="text-sm text-gray-500 mt-2">Guide touristique intelligent</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactUs;