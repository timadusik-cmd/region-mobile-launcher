import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function SplashLoader({ progress, onComplete }) {
  const getStatusText = () => {
    if (progress < 25) return "Подключение к игровым серверам REGION MOBILE...";
    if (progress < 50) return "Проверка целостности компонентов и защиты...";
    if (progress < 75) return "Инициализация графического движка CRMP...";
    if (progress < 100) return "Синхронизация профиля игрока...";
    return "Добро пожаловать в REGION MOBILE!";
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#040609',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflow: 'hidden'
    }}>
      {/* Wallpaper Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/splash_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.92) contrast(1.05)',
        transform: 'scale(1.03)',
        zIndex: 0
      }} />

      {/* Dark Vignette & Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at center, rgba(12, 16, 25, 0.25) 0%, rgba(4, 6, 9, 0.68) 100%), linear-gradient(180deg, rgba(4, 6, 9, 0.2) 0%, rgba(4, 6, 9, 0.55) 100%)',
        zIndex: 1
      }} />

      {/* Background Radial Neon Aura */}
      <div style={{
        position: 'absolute',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        background: '#22e414',
        opacity: 0.16,
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 2
      }} />

      {/* Center 3D Logo Stage */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        marginBottom: '28px'
      }}>
        <div style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="/logo_3d.png" 
            alt="Region Mobile Logo" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 22px rgba(34, 228, 20, 0.8))',
              animation: 'pulse 2s ease-in-out infinite'
            }} 
          />
        </div>

        {/* Project Title */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '1.6rem',
            color: '#fff',
            letterSpacing: '2px',
            lineHeight: 1.1,
            textShadow: '0 4px 20px rgba(0,0,0,0.9)'
          }}>
            REGION <span style={{ color: 'var(--color-brand)', textShadow: '0 0 15px var(--color-brand-glow)' }}>MOBILE</span>
          </h1>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '3px',
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: '4px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}>
            CRMP ONLINE • МОБИЛЬНЫЙ ЛАУНЧЕР
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
        maxWidth: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center'
      }}>
        {/* Progress Bar Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          fontSize: '0.72rem',
          fontWeight: 800,
          color: 'rgba(255, 255, 255, 0.8)',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)'
        }}>
          <span>ЗАГРУЗКА ЛАУНЧЕРА</span>
          <span style={{ color: 'var(--color-brand)', fontWeight: 900 }}>{progress}%</span>
        </div>

        {/* Progress Bar Fill Track */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
          backdropFilter: 'blur(6px)'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #15a80a 0%, #2bfd1b 100%)',
            borderRadius: '10px',
            boxShadow: '0 0 12px var(--color-brand)',
            transition: 'width 0.15s linear'
          }} />
        </div>

        {/* Dynamic Status Subtitle */}
        <div style={{
          fontSize: '0.65rem',
          color: 'rgba(255, 255, 255, 0.65)',
          fontWeight: 700,
          marginTop: '4px',
          textAlign: 'center',
          height: '18px',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)'
        }}>
          {getStatusText()}
        </div>
      </div>
    </div>
  );
}
