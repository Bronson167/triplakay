import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const CourseContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const TTL = 1000 * 60 * 60; // 1h
  

const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = { value, expiry: now.getTime() + ttl };
  localStorage.setItem(key, JSON.stringify(item));
};



const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export const CourseContextProvider = ({ children }) => {
      const [slides, setSlides] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ["Toutes","Développement personnel", "Design",  "Business", 
    "Marketing Digital",
    "Publicité",
    "Réseaux Sociaux",
    "Formation",
    "Programmation",
    "SEO",
    "Email Marketing",
    "Photographie",
    "Vidéo & Motion Design",]; 
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || "");


  // 🔹 Fetch toutes les formations
  const fetchCourses = async () => {
    setLoading(true);

    const saved = getWithExpiry("allCourses");
    if (saved) {
      setCourses(saved);
      setLoading(false);
      return saved;
    }

    try {
      const res = await axios.get(`${backendUrl}/api/course/list`);
      if (res.data.success) {
        setCourses(res.data.courses);
        setWithExpiry("allCourses", res.data.courses, TTL);
      } else {
        toast.error("Erreur: impossible de récupérer les formations");
      }
    } catch (err) {
      toast.error("Erreur serveur: " + err.message);
    } finally {
      setLoading(false);
    }
  };

    const fetchSlides = async () => {
      if (slides.length > 0) return slides;
  
      const saved = getWithExpiry("slides");
      if (saved) {
        setSlides(saved);
        return saved;
      }
  
      try {
        const response = await axios.get(`${backendUrl}/api/course/slides`);
        if (response.data.success) {
          setSlides(response.data.slides);
          setWithExpiry("slides", response.data.slides, TTL.slides);
          return response.data.slides;
        } else {
          toast.error("Tanpri verifye koneksyon entènèt ou.");
          return [];
        }
      } catch (error) {
        toast.error("Erè sèvè : " + error.message);
        return [];
      }
    };

      useEffect(() => {
        if (slides.length === 0) fetchSlides();
      }, []);
    

  // 🔹 Fetch formation par ID
  const getCourseById = async (courseId) => {
    try {
      const res = await axios.get(`${backendUrl}/api/course/${courseId}`);
      if (res.data.success) return res.data.course;
      return null;
    } catch (err) {
      toast.error("Erreur serveur: " + err.message);
      return null;
    }
  };

  // 🔹 Fetch lessons d’un cours
  const getLessonsByCourse = async (courseId) => {
    try {
      const res = await axios.get(`${backendUrl}/api/course/${courseId}/lessons`);
      if (res.data.success) return res.data.lessons;
      return [];
    } catch (err) {
      toast.error("Erreur serveur: " + err.message);
      return [];
    }
  };

  // 🔹 Filtrage par catégorie côté client
  const getCoursesByCategory = (categoryName) => {
    if (categoryName === "Toutes") return courses;
    return courses.filter((c) => c.category === categoryName);
  };

  useEffect(() => {
    fetchCourses();
  }, []);



  const enrollToCourse = async (formData, token) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/course/enrollment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Inscription envoyée avec succès !");
        return true;
      } else {
        toast.error(res.data.message);
        return false;
      }
    } catch (err) {
      toast.error("Erreur lors de l’inscription.");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const [token, setToken] = useState(() => getWithExpiry("token"));

  const isAuthenticated = () => {
  const savedToken = getWithExpiry("token");
  return !!savedToken; // retourne true si token valide, sinon false
};

  const logout = () => {
  setToken(null);
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userPseudo");
  navigate("/se-connecter")
};

 const isUserEnrolled = async (courseId) => {
    if (!token) return false; // si pas connecté, pas inscrit

    try {
      const res = await axios.get(
        `${backendUrl}/api/course/enrolled/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      return res.data.enrolled; 

      
    } catch (err) {
      console.error("Erreur isUserEnrolled:", err);
      return false;
    }
  };

  const getCourseWithLessons = async (courseId) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/api/course/learn/${courseId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data.course;
  } catch (error) {
    console.error("Erreur getCourseWithLessons:", error);
    return null;
  }
};

// useEffect(() => {
//   if (token) {
//     setWithExpiry("token", token, TTL);
//   } else {
//     localStorage.removeItem("token");
//   }
// }, [token]);


  useEffect(() => {
    if (token) setWithExpiry("token", token, TTL);
  }, [token]);


const navigate = useNavigate();

// Ajouter un review
const addCourseReview = async (courseId, rating, comment) => {
  if (!token) {
    toast.error("Vous devez être connecté pour laisser un avis.");
    return false;
  }

  try {
    const res = await axios.post(
      `${backendUrl}/api/course/${courseId}/review`,
      { rating, comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      toast.success("Merci pour votre avis !");
      return true;
    } else {
      toast.error(res.data.message);
      return false;
    }
  } catch (err) {
    toast.error("Erreur lors de l'envoi de l'avis : " + err.message);
    return false;
  }
};

const getCourseWithReviews = async (courseId) => {
  try {
    const resCourse = await axios.get(`${backendUrl}/api/course/${courseId}`);
    const courseData = resCourse.data.course;

    const resReviews = await axios.get(`${backendUrl}/api/course/${courseId}/reviews`);
    courseData.reviews = resReviews.data.reviews || [];

    return courseData;
  } catch (err) {
    toast.error("Erreur serveur: " + err.message);
    return null;
  }
};


  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        categories,
        selectedCategory,
        setSelectedCategory,
        addCourseReview,
        fetchCourses,
        getCourseById,
        getLessonsByCourse,
        getCoursesByCategory,
        enrollToCourse,
        getCourseWithLessons,
        getCourseWithReviews,
        logout,
          slides,
          backendUrl,
          token,
          setToken,
          navigate,
          isUserEnrolled,
          isAuthenticated 
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
