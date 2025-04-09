import React from 'react';
import { motion } from 'framer-motion';

function StatCard({ title, value, icon, color }) {
  const isMobile = window.innerWidth <= 768;
  
  return (
    <motion.div
      className="stat-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'rgba(30, 24, 54, 0.7)',
        borderRadius: '12px',
        padding: isMobile ? '20px' : '12px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '15px',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        height: isMobile ? '100%' : '70%',
        minHeight: isMobile ? '120px' : '65px',
        justifyContent: 'flex-start'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 15px rgba(139, 92, 246, 0.2)';
        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
      }}
    >
      {/* Efecto de brillo en la esquina */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          opacity: 0.5,
          transform: 'rotate(45deg)',
          pointerEvents: 'none'
        }}
      />
      
      <div
        style={{
          width: isMobile ? '50px' : '35px',
          height: isMobile ? '50px' : '35px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '24px' : '18px',
          background: `linear-gradient(135deg, ${color}, ${color}88)`,
          boxShadow: `0 4px 15px ${color}40`,
          flexShrink: 0,
          position: 'relative',
          zIndex: 1
        }}
      >
        {icon}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}>
        <h3
          style={{
            fontSize: isMobile ? '1.5rem' : '1.1rem',
            margin: '0',
            background: `linear-gradient(to right, ${color}, ${color}88)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1
          }}
        >
          {value}
        </h3>
        <p
          style={{
            fontSize: isMobile ? '0.9rem' : '0.75rem',
            margin: '0',
            color: '#c4b5fd',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            position: 'relative',
            zIndex: 1
          }}
        >
          {title}
        </p>
      </div>
    </motion.div>
  );
}

export default StatCard; 