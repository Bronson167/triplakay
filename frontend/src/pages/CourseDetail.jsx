import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CourseContext } from "../context/CourseContext";
import { ImSpinner2 } from "react-icons/im";
import { FaStar, FaPlayCircle } from "react-icons/fa";
import assets from "../assets/assets";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const { id } = useParams();
  const {
    getCourseWithReviews,
    addCourseReview,
    token,
    isUserEnrolled,
  } = useContext(CourseContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // ⭐ Formulaire review
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  const navigate = useNavigate();

  // 🔹 Fetch course + reviews + enrollment status
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const data = await getCourseWithReviews(id);
      if (data) {
        setCourse(data);

        if (token) {
          const enrolled = await isUserEnrolled(id);
          setIsEnrolled(enrolled);
        }
      }
      setLoading(false);
    };
    fetchCourse();
  }, [id, token, getCourseWithReviews, isUserEnrolled]);

  // 🔹 Submit review
  const handleSubmitReview = async () => {
    if (userRating === 0 || userComment.trim() === "") {
      toast.error("Veuillez mettre une note et un commentaire");
      return;
    }

    const success = await addCourseReview(id, userRating, userComment);
    if (success) {
      toast.success("Merci pour votre avis !");
      setUserRating(0);
      setUserComment("");
      // Re-fetch course pour mettre à jour reviews
      const updatedCourse = await getCourseWithReviews(id);
      setCourse(updatedCourse);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-80 gap-4">
        <ImSpinner2 className="animate-spin text-5xl text-[#C586A5]" />
        <p className="text-lg text-gray-600 dark:text-gray-300">Chargement du cours...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 text-gray-600 dark:text-gray-300">
        Cours introuvable
      </div>
    );
  }

  return (
    <motion.div
      className="bg-[#ffebf5] dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Helmet>
        <title>{course.title} | Handlers</title>
        <meta name="description" content={course.subtitle} />
      </Helmet>

      {/* ================= HERO ================= */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">{course.subtitle}</p>

            <div className="flex items-center gap-3 mb-3 text-sm">
              <span className="text-yellow-500 font-bold">{course.rating?.average || 0}</span>
              <FaStar className="text-yellow-400" />
              <span>({course.rating?.count || 0} avis)</span>
              <span>• {course.studentsCount} étudiants</span>
            </div>

            <p className="text-sm">
              Créé par{" "}
              <span className="text-[#C586A5] font-semibold">{course.instructor?.name}</span>
            </p>

            <p className="text-xs mt-2 text-gray-500">
              Dernière mise à jour : {new Date(course.updatedAt).toLocaleDateString()} • {course.language}
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg">
            {course.previewVideo ? (
              <video src={course.previewVideo} controls className="w-full rounded-xl" />
            ) : (
              <img src={course.thumbnail} alt={course.title} className="w-full rounded-xl" />
            )}
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">
          {/* OBJECTIFS */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Ce que vous apprendrez</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {course.objectives?.map((obj, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <FaPlayCircle className="text-[#C586A5] mt-1" />
                  <p className="text-sm">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="whitespace-pre-line text-sm">{course.description}</p>
          </div>

          {/* FORMATEUR */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Formateur</h2>
            <h3 className="text-lg font-semibold text-[#C586A5]">{course.instructor?.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{course.instructor?.experience}</p>
            <p className="text-sm">{course.instructor?.bio}</p>
          </div>

          {/* ================= REVIEWS ================= */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Avis des étudiants</h2>

            {/* ⭐ Moyenne */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">{course.rating?.average || 0}</span>
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <FaStar
                    key={star}
                    className={star <= Math.round(course.rating?.average || 0)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({course.rating?.count || 0} avis)</span>
            </div>

            {/* 🔹 Formulaire review */}
            {token && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Laisser un avis</h3>
                <div className="flex items-center gap-2 mb-2">
                  {[1,2,3,4,5].map(star => (
                    <FaStar
                      key={star}
                      className={star <= userRating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
                      onClick={() => setUserRating(star)}
                    />
                  ))}
                </div>
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
                  placeholder="Votre commentaire..."
                />
                <button
                  onClick={handleSubmitReview}
                  className="mt-2 px-4 py-2 bg-[#C586A5] text-white rounded hover:bg-[#b06a8c]"
                >
                  Envoyer l'avis
                </button>
              </div>
            )}

            {/* 🔹 Liste des reviews */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {course.reviews.length > 0 ? (
                course.reviews.map(r => (
                  <div key={r.userId + r.createdAt} className="border-b dark:border-gray-700 pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{r.fullname || "Utilisateur"}</span>
                      <div className="flex">
                        {[1,2,3,4,5].map(star => (
                          <FaStar
                            key={star}
                            className={star <= r.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Aucun avis pour le moment</p>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow h-fit sticky top-6">
          <p className="text-3xl font-bold mb-4">
            {course.isFree ? "Gratuit" : `${course.price} ${course.currency}`}
          </p>

          <button
            onClick={() => navigate(isEnrolled ? `/courses/${id}/learn` : `/courses/${id}/enroll`)}
            className="w-full bg-[#C586A5] hover:bg-[#b06a8c] text-white font-semibold py-3 rounded-xl transition mb-4"
          >
            {isEnrolled ? "Participer / Suivre" : "S’inscrire maintenant"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetail;
