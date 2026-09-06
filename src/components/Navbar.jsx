import React from 'react';
import { Settings, ShoppingBag, ShieldCheck, Users, Radio } from 'lucide-react';

export default function Navbar({ 
  onOpenSettings, 
  onOpenShop,
  onCheckFiles 
}) {
  return (
    <header className="header-bar">
      {/* Quick Project Online Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-bg-card)', padding: '6px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <Radio size={16} color="var(--color-brand)" className="pulse" />
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fff' }}>
            3,894 <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>ИГРОКОВ ОНЛАЙН</span>
          </span>
        </div>

        <div style={{ fontSize: '0.72rem', color: 'var(--color-brand)', fontWeight: 800, background: 'rgba(34, 228, 20, 0.1)', padding: '4px 10px', borderRadius: '14px', border: '1px solid var(--color-border-brand)' }}>
          🔥 X2 EXP НА ВСЕХ СЕРВЕРАХ
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="header-user-panel">
        {/* Donates Quick Badge */}
        <div 
          className="user-badge" 
          style={{ cursor: 'pointer', background: 'rgba(34, 228, 20, 0.1)', borderColor: 'var(--color-border-brand)' }}
          onClick={onOpenShop}
        >
          <ShoppingBag size={18} color="var(--color-brand)" />
          <div className="user-info">
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--color-brand)' }}>
              1,250 BC
            </span>
            <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>
              Пополнить
            </span>
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="icon-btn" 
            title="Проверить ресурсы"
            onClick={onCheckFiles}
          >
            <ShieldCheck size={20} />
          </button>
          <button 
            className="icon-btn" 
            title="Настройки лаунчера"
            onClick={onOpenSettings}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
