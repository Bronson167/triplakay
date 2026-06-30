import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { CourseContext } from "../context/CourseContext";
import assets from "../assets/assets";
import Title from "./Title";

const CourseEnroll = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const { getCourseById, enrollToCourse } = useContext(CourseContext);

  const [course, setCourse] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [processStatus, setProcessStatus] = useState(""); // "loading", "success", "error"

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  // const [telephone, setTelephone] = useState("");
  // const [cin, setCIN] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);

  const userId = localStorage.getItem("userId") || "";


  // Récupérer infos du cours
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error("Erreur fetch course:", err);
        toast.error("Impossible de récupérer les informations du cours.");
      }
    };
    fetchCourse();
  }, [courseId]);

  // Conversion USD -> HTG si nécessaire
  const convertPrice = () => {
    if (!course) return "";
    if (course.currency === "USD") {
      const gourdes = course.price * 135;
      return `${course.price} USD (~${gourdes} HTG)`;
    }
    return `${course.price} ${course.currency}`;
  };

  const handleTelephoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    setTelephone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!fullname || !email || !paymentProof) {
      return toast.error("Veuillez remplir tous les champs.");
    }

    const formData = new FormData();
    console.log("user Id for enrollment:", userId);
    formData.append("courseId", courseId);
     formData.append("userId", userId); 
    formData.append("fullname", fullname);
    formData.append("email", email);
    // formData.append("telephone", telephone);
    // formData.append("cin", cin);
    formData.append("paymentProof", paymentProof);

    setLoading(true);
    setProcessStatus("loading");

    try {
      const success = await enrollToCourse(formData, token);

      if (success) {
        setProcessStatus("success");
        setTimeout(() => navigate("/formation"), 2000); // redirige vers page formation
      } else {
        setProcessStatus("error");
        setTimeout(() => setProcessStatus(""), 2000); // reste sur la page pour resoumettre
      }
    } catch (err) {
      console.error(err);
      setProcessStatus("error");
      setTimeout(() => setProcessStatus(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-20 text-gray-700 dark:text-white">
      
      <Title
        title={`Inscription au cours: ${course?.title || ""}`}
        desc={`Veuillez remplir le formulaire ci-dessous pour vous inscrire au cours. Prix: ${convertPrice()}`}
      />

      {/* Pop-up avertissement */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md text-center border-2 border-purple-500">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Important</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-left">
              Pour vous inscrire, vous devez payer <strong>{` ${convertPrice()}`}</strong> via :
              <br />
              <strong>MonCash :</strong> 509 4882-1489
              <br />
              <strong>NatCash :</strong> 509 3377-7338
              <br />
              Prenez un screenshot du paiement et joignez-le comme preuve ci-dessous.
            </p>
            <button
              onClick={() => setShowWarningModal(false)}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
            >
              J’ai compris
            </button>
          </div>
        </div>
      )}

      {/* Formulaire */}
      {!showWarningModal && !processStatus && (
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full border-2 border-purple-500 p-6 rounded-2xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="mb-2 text-sm font-medium">Nom complet</p>
            <input
              type="text"
              placeholder="Entrer votre nom"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Email</p>
            <input
              type="email"
              placeholder="Entrer votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* <div>
            <p className="mb-2 text-sm font-medium">Téléphone</p>
            <input
              type="text"
              placeholder="12345678"
              value={telephone}
              onChange={handleTelephoneChange}
              className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white"
              required
            />
          </div> */}

          {/* <div>
            <p className="mb-2 text-sm font-medium">CIN / NIF</p>
            <input
              type="text"
              placeholder="1234567890"
              value={cin}
              onChange={(e) => setCIN(e.target.value)}
              className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white"
              required
            />
          </div> */}

          <div className="sm:col-span-2">
            <p className="mb-2 text-sm font-medium">Preuve de paiement (JPEG/PNG)</p>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => setPaymentProof(e.target.files[0])}
              className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:border-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-max flex gap-2 bg-purple-600 text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-103 transition-all"
          >
            {loading ? "Traitement..." : "S’inscrire maintenant"}
            <img src={assets.arrow_icon} alt="" />
          </button>
        </motion.form>
      )}

      {/* Overlay loading / succès / erreur */}
      {processStatus && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
          {/* Logo qui tourne */}
          <div className="relative w-24 h-24 mb-6">
            <img
              src={assets.logo}
              alt="logo TiBaza"
              className={`w-24 h-24 object-contain animate-spin`}
            />
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium text-center mb-4">
            {processStatus === "loading" && "Processus en cours, veuillez patienter..."}
            {processStatus === "success" && "La demande d'inscription a été envoyée avec succès ! Redirection vers la section formation..."}
            {processStatus === "error" && "Erreur lors de l'envoi de la demande d'inscription. Veuillez réessayer."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseEnroll;
