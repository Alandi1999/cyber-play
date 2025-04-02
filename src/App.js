import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import Clientes from "./pages/AdminDashboard/ListaClientes";
import EditarPuntajes from "./pages/AdminDashboard/EditarPuntajes";
import RegistrarClientes from "./pages/AdminDashboard/ClienteForm";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider> {/* Contexto global para autenticación */}
      <Navbar /> {/* Navbar siempre visible */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/clientes"
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/editar-puntajes"
          element={
            <PrivateRoute>
              <EditarPuntajes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/registrar-clientes"
          element={
            <PrivateRoute>
              <RegistrarClientes />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;