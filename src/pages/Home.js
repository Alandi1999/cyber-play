import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container" style={{
      minHeight: "100vh",
      background: "#0f0a1f", // Fondo violeta oscuro
      color: "white",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
      paddingTop: "80px", // Espacio para el navbar fijo
    }}>
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

      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        padding: "100px 20px",
        position: "relative",
        marginBottom: "80px",
        transform: `translateY(${scrollPosition * 0.1}px)`,
        transition: "transform 0.3s ease-out",
      }}>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 0,
        }} />
        
        <h1 style={{
          fontSize: "4.5rem",
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "4px",
          fontWeight: "800",
          background: "linear-gradient(to right, #a855f7, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          position: "relative",
          display: "inline-block",
          zIndex: 1,
        }}>
          Cyber Play
          <span style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #a855f7, transparent)",
          }}></span>
        </h1>
        <p style={{
          fontSize: "1.4rem",
          maxWidth: "800px",
          margin: "0 auto",
          color: "#c4b5fd",
          lineHeight: 1.6,
          position: "relative",
          zIndex: 1,
        }}>
          Tu destino premium para gaming en PlayStation 4 y PlayStation 5
        </p>
        
        <div style={{
          marginTop: "40px",
          position: "relative",
          zIndex: 1,
        }}>
          <Link to="admin/dashboard">
            <button
              style={{
                padding: "15px 30px",
                fontSize: "16px",
                color: "#fff",
                background: "linear-gradient(to right, #a855f7, #6366f1)",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                transition: "all 0.4s ease",
                textTransform: "uppercase",
                letterSpacing: "2px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
                fontWeight: "600",
              }}
              onMouseOver={(e) => {
                e.target.style.boxShadow = "0 10px 25px rgba(139, 92, 246, 0.5)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.3)";
                e.target.style.transform = "scale(1)";
              }}
            >
              Ir al Panel de Administración
            </button>
          </Link>
        </div>
      </div>

      {/* Servicios Section */}
      <div style={{
        padding: "60px 20px",
        transform: `translateY(${scrollPosition * 0.05}px)`,
        transition: "transform 0.3s ease-out",
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "50px",
          fontSize: "2.5rem",
          fontWeight: "700",
          background: "linear-gradient(to right, #a855f7, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          position: "relative",
          display: "inline-block",
          width: "100%",
        }}>
          Nuestros Servicios
          <span style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #a855f7, transparent)",
          }}></span>
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          <div style={{
            background: "rgba(30, 24, 54, 0.7)",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.4s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-5px)";
            e.target.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
            e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            e.target.style.borderColor = "rgba(139, 92, 246, 0.2)";
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%)",
              opacity: 0,
              transition: "opacity 0.4s ease",
            }}
            className="card-glow"></div>
            
            <div>
              <div style={{
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              
              <h3 style={{
                color: "#a855f7",
                marginBottom: "15px",
                fontWeight: "700",
                position: "relative",
                zIndex: 1,
                fontSize: "1.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.color = "#8b5cf6";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.color = "#a855f7";
              }}>PlayStation 5</h3>
              <p style={{ 
                color: "#c4b5fd", 
                position: "relative",
                zIndex: 1,
                lineHeight: 1.6,
                marginBottom: "20px",
              }}>Experimenta la próxima generación de gaming con nuestra flota de PS5</p>
            </div>
          </div>
          
          <div style={{
            background: "rgba(30, 24, 54, 0.7)",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.4s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-5px)";
            e.target.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
            e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            e.target.style.borderColor = "rgba(139, 92, 246, 0.2)";
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%)",
              opacity: 0,
              transition: "opacity 0.4s ease",
            }}
            className="card-glow"></div>
            
            <div>
              <div style={{
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              
              <h3 style={{
                color: "#a855f7",
                marginBottom: "15px",
                fontWeight: "700",
                position: "relative",
                zIndex: 1,
                fontSize: "1.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.color = "#8b5cf6";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.color = "#a855f7";
              }}>PlayStation 4</h3>
              <p style={{ 
                color: "#c4b5fd", 
                position: "relative",
                zIndex: 1,
                lineHeight: 1.6,
                marginBottom: "20px",
              }}>Disfruta de tu biblioteca favorita de PS4 en nuestro espacio</p>
            </div>
          </div>
          
          <div style={{
            background: "rgba(30, 24, 54, 0.7)",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.4s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-5px)";
            e.target.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
            e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            e.target.style.borderColor = "rgba(139, 92, 246, 0.2)";
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%)",
              opacity: 0,
              transition: "opacity 0.4s ease",
            }}
            className="card-glow"></div>
            
            <div>
              <div style={{
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              
              <h3 style={{
                color: "#a855f7",
                marginBottom: "15px",
                fontWeight: "700",
                position: "relative",
                zIndex: 1,
                fontSize: "1.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.color = "#8b5cf6";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.color = "#a855f7";
              }}>Ambiente Premium</h3>
              <p style={{ 
                color: "#c4b5fd", 
                position: "relative",
                zIndex: 1,
                lineHeight: 1.6,
                marginBottom: "20px",
              }}>Espacios climatizados y seguros para tu máxima comodidad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: "40px 20px",
        background: "rgba(15, 10, 31, 0.8)",
        borderTop: "1px solid rgba(139, 92, 246, 0.2)",
        marginTop: "60px",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
          }}>
            <a href="#" style={{
              color: "#c4b5fd",
              fontSize: "1.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#a855f7";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#c4b5fd";
              e.target.style.transform = "translateY(0)";
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" style={{
              color: "#c4b5fd",
              fontSize: "1.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#a855f7";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#c4b5fd";
              e.target.style.transform = "translateY(0)";
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" style={{
              color: "#c4b5fd",
              fontSize: "1.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#a855f7";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#c4b5fd";
              e.target.style.transform = "translateY(0)";
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
          
          <p style={{
            color: "#c4b5fd",
            fontSize: "0.9rem",
            textAlign: "center",
          }}>
            © 2023 Cyber Play. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <style>
        {`
          .card-glow {
            opacity: 0;
          }
          
          .card-glow:hover {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}

export default Home;