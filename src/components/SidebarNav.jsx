import React from 'react';
import Logo from './Logo';
import { 
  Home, 
  Server, 
  Newspaper, 
  ShoppingBag, 
  Settings 
} from 'lucide-react';

export default function SidebarNav({ 
  activeTab, 
  onChangeTab, 
  nickname, 
  setNickname 
}) {
  const navItems = [
    { id: 'MAIN', label: 'Главная', icon: Home },
    { id: 'SERVERS', label: 'Серверы', icon: Server },
    { id: 'NEWS', label: 'Новости', icon: Newspaper },
    { id: 'SHOP', label: 'Магазин', icon: ShoppingBag },
    { id: 'SETTINGS', label: 'Настройки', icon: Settings },
  ];

  return (
    <aside className="sidebar-nav">
      {/* Top Logo Monogram */}
      <div className="sidebar-logo-wrap">
        <Logo size={36} showText={false} />
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button 
              key={item.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => onChangeTab(item.id)}
              title={item.label}
            >
              <div className="sidebar-item-icon">
                <Icon size={22} />
              </div>
              <span className="sidebar-item-label">{item.label}</span>
              {isActive && <div className="sidebar-active-indicator" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile Badge */}
      <div className="sidebar-bottom-group">
        <div className="sidebar-profile">
          <div className="user-avatar" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
            {nickname.charAt(0).toUpperCase()}
          </div>
          <div className="user-info" style={{ overflow: 'hidden' }}>
            <input 
              type="text" 
              className="user-name-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Никнейм"
              style={{ width: '85px', fontSize: '0.8rem' }}
            />
            <span className="user-status" style={{ fontSize: '0.6rem' }}>
              <span className="user-status-dot" />
              В сети
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
