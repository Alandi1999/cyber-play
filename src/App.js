import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Importamos useLocation
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import Clientes from "./pages/AdminDashboard/ListaClientes";
import EditarPuntajes from "./pages/AdminDashboard/EditarPuntajes";
import RegistrarClientes from "./pages/AdminDashboard/ClienteForm";
import EditarCliente from "./pages/AdminDashboard/EditarClientes";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const location = useLocation(); // Detecta la ruta actual

  return (
    <AuthProvider>
      {/* Renderiza Navbar solo en Home y Login */}
      {location.pathname === "/" || location.pathname === "/login" ? <Navbar /> : null}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas: Dashboard y sus módulos */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Rutas hijas del Dashboard */}
          <Route path="clientes" element={<Clientes />} />
          <Route path="editar-puntajes" element={<EditarPuntajes />} />
          <Route path="registrar-clientes" element={<RegistrarClientes />} />
          <Route path="editar-cliente" element={<EditarCliente />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;