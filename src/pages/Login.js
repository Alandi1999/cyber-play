import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error de autenticación:", err);
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0a1f",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Efecto de fondo con gradiente */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
          opacity: 0.7,
        }}
      />

      {/* Círculos decorativos */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          background: "rgba(30, 24, 54, 0.7)",
          padding: "40px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          zIndex: 1,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2rem",
            fontWeight: "700",
            background: "linear-gradient(to right, #a855f7, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            position: "relative",
            display: "inline-block",
            width: "100%",
          }}
        >
          Iniciar Sesión
          <span
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #a855f7, transparent)",
            }}
          ></span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#c4b5fd",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                background: "rgba(15, 10, 31, 0.5)",
                color: "white",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                e.target.style.boxShadow = "0 0 0 2px rgba(139, 92, 246, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(139, 92, 246, 0.2)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#c4b5fd",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                background: "rgba(15, 10, 31, 0.5)",
                color: "white",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                e.target.style.boxShadow = "0 0 0 2px rgba(139, 92, 246, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(139, 92, 246, 0.2)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "0.9rem",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              background: isLoading 
                ? "rgba(139, 92, 246, 0.5)" 
                : "linear-gradient(to right, #a855f7, #6366f1)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 10px rgba(139, 92, 246, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.boxShadow = "0 6px 15px rgba(139, 92, 246, 0.5)";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.boxShadow = "0 4px 10px rgba(139, 92, 246, 0.3)";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            {isLoading ? (
              <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <svg 
                  style={{ 
                    animation: "spin 1s linear infinite", 
                    marginRight: "8px",
                    width: "16px",
                    height: "16px"
                  }} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando...
              </span>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Login;