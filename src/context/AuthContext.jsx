import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await getCurrentUser();
          setUser(res.data.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          logout(); // Invalid token or session expired
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = (authToken) => {
    localStorage.setItem("token", authToken);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
