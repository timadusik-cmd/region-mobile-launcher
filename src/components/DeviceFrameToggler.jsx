import React from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

export default function DeviceFrameToggler({ currentMode, onChangeMode }) {
  return (
    <div className="viewport-bar">
      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
        Режим предпросмотра:
      </span>

      <button 
        className={`viewport-btn ${currentMode === 'phone' ? 'active' : ''}`}
        onClick={() => onChangeMode('phone')}
      >
        <Smartphone size={14} />
        Смартфон (920x445)
      </button>

      <button 
        className={`viewport-btn ${currentMode === 'tablet' ? 'active' : ''}`}
        onClick={() => onChangeMode('tablet')}
      >
        <Tablet size={14} />
        Планшет (1024x600)
      </button>

      <button 
        className={`viewport-btn ${currentMode === 'full' ? 'active' : ''}`}
        onClick={() => onChangeMode('full')}
      >
        <Monitor size={14} />
        На весь экран
      </button>
    </div>
  );
}
