import React from "react";
import { Link, Outlet } from "react-router-dom"; // Importamos Outlet
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
    <div style={styles.container}>
      {/* Menú lateral */}
      <nav style={styles.nav}>
        <h2 style={styles.navTitle}>Admin Panel</h2>
        <Link to="clientes" style={styles.link}>
          Lista de Clientes
        </Link>
        <Link to="editar-puntajes" style={styles.link}>
          Editar Puntajes
        </Link>
        <Link to="registrar-clientes" style={styles.link}>
          Registrar Cliente
        </Link>
        <Link to="editar-cliente" style={styles.link}>
          Editar Cliente
        </Link>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </nav>

      {/* Contenido principal */}
      <div style={styles.content}>
        <Outlet /> {/* Renderiza las rutas hijas aquí */}
      </div>

      {/* Estilos globales */}
      <style>
        {`
          /* Fondo personalizado */
          .container {
            display: flex;
            height: 100vh;
            backgroundImage: "url('/cyber-play/2.webp')";
            background-size: cover;
            background-position: center;
            background-attachment: fixed; /* Fondo fijo al desplazarse */
            color: #fff; /* Texto blanco para mejor contraste */
          }

          .nav {
            width: 250px;
            background-color: rgba(0, 0, 0, 0.7); /* Fondo semitransparente */
            color: #fff;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .nav-title {
            font-size: 20px;
            margin: 0;
          }

          .nav-link {
            color: #fff;
            text-decoration: none;
            padding: 10px;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.3); /* Botones semitransparentes */
            text-align: center;
            transition: background-color 0.3s ease;
          }

          .nav-link:hover {
            background-color: rgba(255, 255, 255, 0.5); /* Brilla al pasar el mouse */
          }

          .logout-button {
            margin-top: auto;
            padding: 10px;
            font-size: 16px;
            color: #fff;
            background-color: rgba(255, 77, 77, 0.8); /* Botón semitransparente */
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .logout-button:hover {
            background-color: rgba(255, 77, 77, 1); /* Botón más sólido al pasar el mouse */
          }

          .content {
            flex-grow: 1;
            padding: 30px;
            background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente para el contenido */
            overflow-y: auto; /* Permite scroll si hay contenido largo */
          }

          /* Responsive para iPhone 14 Pro Max */
          @media (max-width: 430px) {
            .container {
              flex-direction: column;
              height: auto;
            }

            .nav {
              width: 100%;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-evenly;
              gap: 10px;
            }

            .nav-title {
              width: 100%;
              text-align: center;
              font-size: 18px;
              margin-bottom: 10px;
            }

            .nav-link, .logout-button {
              flex: 1 0 45%; /* Dos botones por fila */
              text-align: center;
              margin: 5px 0;
            }

            .content {
              padding: 15px;
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: "url('/cyber-play/2.webp')", // Actualiza la ruta de la imagen
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    color: "#fff",
  },
  nav: {
    width: "250px",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo semitransparente
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  navTitle: {
    fontSize: "20px",
    margin: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Botones semitransparentes
    textAlign: "center",
  },
  logoutButton: {
    marginTop: "auto",
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "rgba(255, 77, 77, 0.8)", // Botón semitransparente
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  content: {
    flexGrow: 1,
    padding: "30px",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente para el contenido
    overflowY: "auto",
  },
};

export default Dashboard;