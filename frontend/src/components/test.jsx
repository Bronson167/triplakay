import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../context/CourseContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import assets from "../assets/assets";
import { registerFCM } from "../fcm";
import { motion } from "framer-motion";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(CourseContext);

  const [name, setName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentState, setCurrentState] = useState("Login");

  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [splashMessage, setSplashMessage] = useState("");
  const [splashSuccess, setSplashSuccess] = useState(null);

  const location = useLocation();

  /* 🔔 Message si redirection */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("from") === "mete-anons") {
      toast.info("Veuillez vous connecter avant de publier une annonce.", {
        autoClose: 3000,
      });
    }
  }, [location]);

  /* 🔁 Mode login / signup */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCurrentState(params.get("mode") === "signup" ? "Sign Up" : "Login");
  }, [location]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) setPhone(value);
    else toast.error("Le numéro de téléphone ne doit pas dépasser 8 chiffres.");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (currentState === "Sign Up" && phone.length !== 8) {
      toast.error("Veuillez entrer un numéro de téléphone valide (8 chiffres).");
      return;
    }

    setLoading(true);
    setShowSplash(true);
    setSplashMessage("Traitement en cours...");
    setSplashSuccess(null);

    try {
      const response =
        currentState === "Sign Up"
          ? await axios.post(`${backendUrl}/api/user/register`, {
              name,
              phone,
              pseudo,
              email,
              password,
            })
          : await axios.post(`${backendUrl}/api/user/login`, {
              email,
              password,
            });

      if (response.data.success) {
        /* 🔐 Token */
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userPseudo", response.data.user?.pseudo || "");

        /* 🔔 FCM (NE BLOQUE JAMAIS LE LOGIN) */
        try {
          await registerFCM(response.data.userId);
        } catch (fcmError) {
          console.warn("FCM non disponible :", fcmError.message);
        }

        /* ✅ Succès */
        setSplashMessage(
          currentState === "Sign Up"
            ? "Compte créé avec succès 🎉"
            : "Connexion réussie ✅"
        );
        setSplashSuccess(true);

        setTimeout(() => {
          setShowSplash(false);
          navigate("/formation");
        }, 2000);
      } else {
        setSplashMessage(response.data.message || "Une erreur est survenue.");
        setSplashSuccess(false);
        setTimeout(() => setShowSplash(false), 2000);
      }
    } catch (err) {
      setSplashMessage(
        err.response?.data?.message ||
          "Une erreur est survenue. Veuillez réessayer."
      );
      setSplashSuccess(false);
      setTimeout(() => setShowSplash(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/formation");
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
      dark:from-gray-900 dark:via-gray-900 dark:to-black relative"
    >
      <Helmet>
        <title>TiBaza – Connexion / Inscription</title>
      </Helmet>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={onSubmitHandler}
        className="relative w-full max-w-md p-8 rounded-2xl
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
        border border-gray-200 dark:border-gray-700
        shadow-2xl"
      >
        <div className="absolute -top-32 -right-32 w-72 h-72
          bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
          opacity-30 blur-3xl rounded-full"
        />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-4">
            {currentState === "Login" ? "Connexion" : "Créer un compte"}
          </h2>

          {currentState === "Sign Up" && (
            <>
              <Input value={name} setValue={setName} placeholder="Nom complet" />
              <Input value={pseudo} setValue={setPseudo} placeholder="Pseudonyme" />
              <Input
                value={phone}
                setValue={setPhone}
                onChange={handlePhoneChange}
                placeholder="Numéro WhatsApp (8 chiffres)"
              />
            </>
          )}

          <Input value={email} setValue={setEmail} type="email" placeholder="Adresse e-mail" />
          <Input value={password} setValue={setPassword} type="password" placeholder="Mot de passe" />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-2.5 rounded-full text-white
            bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
            disabled:opacity-50"
          >
            {loading ? "Veuillez patienter..." : currentState === "Login" ? "Se connecter" : "Créer le compte"}
          </button>
        </div>
      </motion.form>

      {showSplash && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
          <div className="animate-spin w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mb-6"></div>
          <img src={assets.logo} alt="Logo TiBaza" className="w-60 mb-4" />
          <p className={`text-lg font-medium ${
            splashSuccess === true ? "text-green-600" :
            splashSuccess === false ? "text-red-500" :
            "text-gray-700"
          }`}>
            {splashMessage}
          </p>
        </div>
      )}
    </div>
  );
};

const Input = ({ value, setValue, type = "text", placeholder, onChange }) => (
  <input
    type={type}
    value={value}
    onChange={onChange || ((e) => setValue(e.target.value))}
    placeholder={placeholder}
    required
    className="w-full mb-3 px-4 py-2 rounded-md border
    focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

export default Login;
