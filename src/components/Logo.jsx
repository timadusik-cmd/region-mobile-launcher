import React from 'react';

export default function Logo({ size = 36, showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img 
        src="/logo_3d.png" 
        alt="RM Logo" 
        style={{ 
          width: size, 
          height: size, 
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 10px rgba(34, 228, 20, 0.5))' 
        }} 
      />

      {showText && (
        <div className="header-brand-title">
          <span className="brand-main-text">
            REGION <span>MOBILE</span>
          </span>
          <span className="brand-sub-text">CRMP ONLINE</span>
        </div>
      )}
    </div>
  );
}
