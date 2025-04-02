import React from "react";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Sesión cerrada correctamente.");
    } catch (error) {
      alert("Error al cerrar sesión: " + error.message);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Menú lateral */}
      <nav
        style={{
          width: "250px",
          backgroundColor: "#494949",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 style={{ fontSize: "20px", margin: 0 }}>Admin Panel</h2>
        <a
          href="admin/clientes"
          style={{
            color: "#fff",
            textDecoration: "none",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#616161",
            textAlign: "center",
          }}
        >
          Lista de Clientes
        </a>
        <a
          href="admin/editar-puntajes"
          style={{
            color: "#fff",
            textDecoration: "none",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#616161",
            textAlign: "center",
          }}
        >
          Editar Puntajes
        </a>
        <a
          href="admin/registrar-clientes"
          style={{
            color: "#fff",
            textDecoration: "none",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#616161",
            textAlign: "center",
          }}
        >
          Registrar Cliente
        </a>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "10px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#ff4d4d",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cerrar Sesión
        </button>
      </nav>

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          padding: "30px",
          backgroundColor: "#f4f4f4",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Bienvenido al Panel de Administración
        </h1>
        <p>
          Selecciona una opción en el menú para gestionar la aplicación.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;