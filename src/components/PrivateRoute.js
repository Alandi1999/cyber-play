import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>; // Muestra un indicador mientras se determina la autenticación
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;