import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Bienvenido a Cyber Play</h1>
      <p>Descubre todos los servicios y experiencias que tenemos para ofrecerte.</p>
      <Link to="/admin/dashboard">
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#494949",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Ir al Panel de Administración
        </button>
      </Link>
    </div>
  );
}

export default Home;