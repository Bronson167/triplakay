import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // 🔹 Charger l’auth au refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userPseudo = localStorage.getItem("userPseudo");

    if (savedToken) {
      setToken(savedToken);
      setUser({
        id: userId,
        pseudo: userPseudo,
      });
    }

    setLoadingAuth(false);
  }, []);

  // 🔹 Login
  const login = ({ token, userId, userPseudo }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userPseudo", userPseudo);

    setToken(token);
    setUser({ id: userId, pseudo: userPseudo });
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userPseudo");

    setToken(null);
    setUser(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
