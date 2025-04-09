import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/responsive.css';

const Sidebar = ({ onLogout }) => {
  const menuItems = [
    { path: 'clientes', label: 'Lista de Clientes', icon: '👥' },
    { path: 'editar-puntajes', label: 'Editar Puntajes', icon: '⭐' },
    { path: 'registrar-clientes', label: 'Registrar Cliente', icon: '➕' },
    { path: 'editar-cliente', label: 'Editar Cliente', icon: '✏️' },
  ];

  return (
    <motion.nav
      className="sidebar"
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '250px',
        background: 'rgba(30, 24, 54, 0.7)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        borderRight: '1px solid rgba(139, 92, 246, 0.2)',
        position: 'relative',
        zIndex: 2
      }}
    >
      <motion.h2
        className="sidebar-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: '24px',
          margin: '0 0 20px 0',
          background: 'linear-gradient(to right, #a855f7, #6366f1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}
      >
        Admin Panel
      </motion.h2>

      <div className="sidebar-menu" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <Link
              to={item.path}
              style={{
                textDecoration: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                padding: '12px 15px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{ marginRight: '10px', fontSize: '20px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="logout-button"
        onClick={onLogout}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: 'auto',
          padding: '12px 20px',
          background: 'linear-gradient(to right, #a855f7, #6366f1)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 12px rgba(139, 92, 246, 0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px rgba(139, 92, 246, 0.2)';
        }}
      >
        Cerrar Sesión
      </motion.button>
    </motion.nav>
  );
};

export default Sidebar; 