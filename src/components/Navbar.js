import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav style={{
      background: scrolled 
        ? "rgba(15, 10, 31, 0.95)" 
        : "rgba(15, 10, 31, 0.7)",
      color: "white",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      borderBottom: scrolled 
        ? "1px solid rgba(139, 92, 246, 0.5)" 
        : "1px solid transparent",
      boxShadow: scrolled 
        ? "0 5px 20px rgba(139, 92, 246, 0.2)" 
        : "none",
      backdropFilter: "blur(10px)",
      transition: "all 0.4s ease",
    }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 style={{
          fontSize: "28px",
          margin: 0,
          background: "linear-gradient(to right, #a855f7, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textTransform: "uppercase",
          letterSpacing: "4px",
          transition: "all 0.4s ease",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
        }}>
          Cyber Play
          <span style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #a855f7, transparent)",
            transform: "translateX(-100%)",
            animation: "slideIn 3s infinite",
          }}></span>
        </h1>
      </Link>
      
      <div style={{
        display: "flex",
        gap: "30px",
      }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{
            color: location.pathname === "/" ? "#a855f7" : "#ffffff",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            padding: "8px 15px",
            borderRadius: "4px",
            transition: "all 0.3s ease",
            position: "relative",
            fontWeight: location.pathname === "/" ? "bold" : "normal",
          }}
          onMouseOver={(e) => {
            e.target.style.color = "#a855f7";
          }}
          onMouseOut={(e) => {
            e.target.style.color = location.pathname === "/" ? "#a855f7" : "#ffffff";
          }}>
            Inicio
            {location.pathname === "/" && (
              <span style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "1px",
                background: "#a855f7",
              }}></span>
            )}
          </span>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <span style={{
            color: location.pathname === "/login" ? "#a855f7" : "#ffffff",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            padding: "8px 15px",
            borderRadius: "4px",
            transition: "all 0.3s ease",
            position: "relative",
            fontWeight: location.pathname === "/login" ? "bold" : "normal",
          }}
          onMouseOver={(e) => {
            e.target.style.color = "#a855f7";
          }}
          onMouseOut={(e) => {
            e.target.style.color = location.pathname === "/login" ? "#a855f7" : "#ffffff";
          }}>
            Iniciar Sesión
            {location.pathname === "/login" && (
              <span style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "1px",
                background: "#a855f7",
              }}></span>
            )}
          </span>
        </Link>
      </div>

      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;