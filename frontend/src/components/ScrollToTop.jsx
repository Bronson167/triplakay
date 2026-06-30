import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // ou "auto" si tu préfères un changement instantané
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;