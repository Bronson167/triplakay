import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);

  const enrollToCourse = async (formData, token) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/enrollments`,
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

  return (
    <EnrollmentContext.Provider value={{ enrollToCourse, loading }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => useContext(EnrollmentContext);
