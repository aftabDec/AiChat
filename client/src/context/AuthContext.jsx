import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser } from "../hooks/form/LoginHook";
import { registerUser } from "../hooks/form/RegisterHook";
import api from "../utils/axiosSetup";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get(
            "http://localhost:5000/auth/verify-token",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data.success) {
            setAuthState({
              isAuthenticated: true,
              user: response.data.user,
              token: token,
              refreshToken: localStorage.getItem("refreshToken"),
            });
          } else {
            setAuthState({
              isAuthenticated: false,
              user: null,
              token: null,
              refreshToken: null,
            });
          }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          refreshToken: null,
        });
      }
    };

    checkAuth();
  }, []);

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      if (response.success) {
        setAuthState({
          isAuthenticated: true,
          user: response.data.user,
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      return response;
    } catch (error) {
      console.error("Registration error", error);
      return { success: false, message: error.message };
    }
  };

  const login = async (credential) => {
    try {
      const response = await loginUser(credential);
      if (response.success) {
        setAuthState({
          isAuthenticated: true,
          user: response.data.user,
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      return response;
    } catch (error) {
      console.error("Login error", error);
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ authState, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
