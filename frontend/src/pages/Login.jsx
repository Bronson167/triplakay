import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../context/CourseContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import assets from "../assets/assets";
import { registerFCM } from "../fcm";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { token, setToken, backendUrl } = useContext(CourseContext);
 
const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentState, setCurrentState] = useState("Login");

  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [splashMessage, setSplashMessage] = useState("");
  const [splashSuccess, setSplashSuccess] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("from") === "mete-anons") {
      toast.info("Veuillez vous connecter avant de publier une annonce.", {
        autoClose: 3000,
      });
    }
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCurrentState(params.get("mode") === "signup" ? "Sign Up" : "Login");
  }, [location]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 20) setPhone(value);
    else toast.error("Le numéro de téléphone ne doit pas dépasser 20 chiffres.");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    // if (currentState === "Sign Up" ) {
    //   toast.error("Veuillez entrer un numéro de téléphone valide (20 chiffres).");
    //   return;
    // }

    setLoading(true);
    setShowSplash(true);
    setSplashMessage("Traitement en cours...");
    setSplashSuccess(null); // ← neutre pendant le traitement

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





  setToken(response.data.token);



  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.userId);
  localStorage.setItem("userPseudo", response.data.user?.pseudo || "");



  // TEST 2 — on COMENTE FCM COMPLÈTEMENT
  // await registerFCM(response.data.userId);



  setSplashMessage("Succès de la connexion.");
  setSplashSuccess(true);



  setTimeout(() => {
    setShowSplash(false);
    navigate("/formation");
    // navigate("/"); 
  }, 2000);

} catch (err) {

  setSplashMessage("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
  setSplashSuccess(false);
  setTimeout(() => setShowSplash(false), 2000);
}
 finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/formation");
    
  }, [token, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
      dark:from-gray-900 dark:via-gray-900 dark:to-black relative"
    >
       
    
      <Helmet>
        <title>Connexion | Handlers</title>
        <meta
          name="description"
          content="Connectez-vous à votre compte Handlers pour accéder à vos formations et contenus exclusifs."
        />

        {/* Open Graph pour le partage sur les réseaux sociaux */}
        <meta property="og:title" content="Connexion | Handlers" />
        <meta
          property="og:description"
          content="Connectez-vous à votre compte Handlers pour accéder à vos formations et contenus exclusifs."
        />
        {/* <meta
          property="og:image"
          content="https://handlerscreationagency.com/og-login.jpg"
        /> */}
        <meta property="og:type" content="website" />

        {/* Robots pour le SEO */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={onSubmitHandler}
        className="
          relative w-full max-w-md p-8 rounded-2xl
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-xl
          border border-gray-200 dark:border-gray-700
          shadow-2xl shadow-gray-200 dark:shadow-black/40
        "
      >
        {/* Effet lumineux */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-72 h-72
          bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
          opacity-30 blur-3xl rounded-full"
        />

        <div className="relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {currentState === "Login" ? "Connexion" : "Créer un compte"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {currentState === "Login"
                ? "Veuillez entrer vos identifiants pour vous connecter"
                : "Remplissez le formulaire pour créer votre compte"}
            </p>
          </div>

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

          <Input
            value={email}
            setValue={setEmail}
            type="email"
            placeholder="Adresse e-mail"
          />
          <Input
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Mot de passe"
          />

          <div className="flex justify-between text-sm text-indigo-600 dark:text-indigo-400 mt-2">
            {currentState === "Login" && (
              <span
                onClick={() => navigate("/forgot-password")}
                className="cursor-pointer hover:underline"
              >
                Mot de passe oublié ?
              </span>
            )}
            <span
              onClick={() =>
                setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
              }
              className="cursor-pointer hover:underline"
            >
              {currentState === "Login"
                ? "Créer un compte"
                : "Se connecter"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full mt-6 py-2.5 rounded-full text-white font-medium
              bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
              hover:opacity-90 transition disabled:opacity-50
            "
          >
            {loading
              ? "Veuillez patienter..."
              : currentState === "Login"
              ? "Se connecter"
              : "Créer le compte"}
          </button>
        </div>
      </motion.form>

      {/* 👇 Splash screen */}
      {showSplash && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
          {/* Cercle qui tourne */}
          <div className="animate-spin w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mb-6"></div>
          {/* Logo */}
          <img src={assets.logo} alt="Logo TiBaza" className="w-60 h-30 mb-4" />
          {/* Message */}
          <p
            className={`text-lg font-medium ${
              splashSuccess === true
                ? "text-green-600"
                : splashSuccess === false
                ? "text-red-500"
                : "text-gray-800 dark:text-gray-200" // ← couleur neutre pendant traitement
            }`}
          >
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
    className="
      w-full mb-3 px-4 py-2 rounded-md
      bg-white dark:bg-gray-800
      border border-gray-300 dark:border-gray-700
      text-gray-800 dark:text-white
      focus:outline-none focus:ring-2 focus:ring-indigo-500
    "
  />
);

export default Login;
