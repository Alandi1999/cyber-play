import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import { supabase } from "../../services/supabaseClient";
import "../../styles/responsive.css";

function Dashboard() {
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    totalClientes: 0,
    promedioPuntaje: 0,
    clientesActivos: 0,
    puntajeTotal: 0
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    fetchStats();
    
    // Detectar cambios en el tamaño de la pantalla
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchStats = async () => {
    try {
      const { data: clientes, error } = await supabase
        .from('clientes')
        .select('*');

      if (error) throw error;

      const totalClientes = clientes.length;
      const puntajeTotal = clientes.reduce((sum, cliente) => sum + (cliente.puntaje || 0), 0);
      const promedioPuntaje = totalClientes > 0 ? puntajeTotal / totalClientes : 0;
      const clientesActivos = clientes.filter(cliente => cliente.estado === 'activo').length;

      setStats({
        totalClientes,
        promedioPuntaje: promedioPuntaje.toFixed(1),
        clientesActivos,
        puntajeTotal
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("Sesión cerrada correctamente.");
    } catch (error) {
      alert("Error al cerrar sesión: " + error.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div 
      className="dashboard-container"
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f0a1f",
        color: "#fff",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Efecto de fondo con gradiente */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
        opacity: 0.7,
      }} />
      
      {/* Botón de menú móvil */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          style={{
            position: "fixed",
            top: "15px",
            left: "15px",
            zIndex: 100,
            background: "rgba(30, 24, 54, 0.8)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            padding: "10px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      )}
      
      {/* Sidebar para pantallas grandes o menú móvil abierto */}
      {(!isMobile || isMobileMenuOpen) && (
        <AnimatePresence>
          <motion.div
            initial={{ x: isMobile ? -300 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? -300 : 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: isMobile ? "fixed" : "relative",
              top: 0,
              left: 0,
              height: "100vh",
              zIndex: 99,
            }}
          >
            <Sidebar onLogout={handleLogout} />
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Overlay para cerrar el menú móvil al hacer clic fuera */}
      {isMobile && isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 98,
          }}
        />
      )}
      
      <motion.div
        className="content-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
          marginLeft: isMobile ? 0 : "auto",
          width: isMobile ? "100%" : "auto",
        }}
      >
        <motion.div
          className="stats-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}
        >
          <StatCard
            title="Total Clientes"
            value={stats.totalClientes}
            icon="👥"
            color="#a855f7"
          />
          <StatCard
            title="Promedio Puntaje"
            value={stats.promedioPuntaje}
            icon="⭐"
            color="#6366f1"
          />
          <StatCard
            title="Clientes Activos"
            value={stats.clientesActivos}
            icon="✅"
            color="#8b5cf6"
          />
          <StatCard
            title="Puntaje Total"
            value={stats.puntajeTotal}
            icon="🏆"
            color="#a855f7"
          />
        </motion.div>

        <motion.div
          className="outlet-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "rgba(30, 24, 54, 0.7)",
            borderRadius: "15px",
            padding: "20px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            minHeight: "calc(100vh - 250px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.4s ease"
          }}
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Dashboard;