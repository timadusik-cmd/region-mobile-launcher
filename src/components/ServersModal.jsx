import React, { useState } from 'react';
import { X, Server, Search, Star, Wifi, Play, Check } from 'lucide-react';

export default function ServersModal({ isOpen, onClose, activeServer, onSelectServer }) {
  const [search, setSearch] = useState('');
  const [favs, setFavs] = useState([1, 3]);

  const servers = [
    { id: 1, name: "REGION 01 | MOSCOW", online: 984, maxOnline: 1000, ping: 22, bonus: "X2 EXP" },
    { id: 2, name: "REGION 02 | RED", online: 850, maxOnline: 1000, ping: 35, bonus: "X3 COINS" },
    { id: 3, name: "REGION 03 | GREEN", online: 640, maxOnline: 1000, ping: 28, bonus: "BONUS" },
    { id: 4, name: "REGION 04 | KRASNODAR", online: 1000, maxOnline: 1000, ping: 19, bonus: "FULL" },
    { id: 5, name: "REGION 05 | ARZAMAS", online: 420, maxOnline: 1000, ping: 42, bonus: "NEW" },
  ];

  if (!isOpen) return null;

  const toggleFav = (e, id) => {
    e.stopPropagation();
    if (favs.includes(id)) {
      setFavs(favs.filter(favId => favId !== id));
    } else {
      setFavs([...favs, id]);
    }
  };

  const filteredServers = servers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content servers-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title" style={{ gap: '10px', display: 'flex', alignItems: 'center' }}>
            <div className="servers-icon-glow" style={{ width: '36px', height: '36px' }}>
              <Server size={18} color="var(--color-brand)" />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>Выбор Игрового Региона</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                Выберите сервер REGION MOBILE для подключения
              </div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ gap: '12px' }}>
          {/* Search Input */}
          <div className="servers-search-box modal-search-box">
            <Search size={16} color="var(--color-text-muted)" />
            <input 
              type="text"
              placeholder="Поиск региона..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Servers List */}
          <div className="servers-grid-list modal-servers-list">
            {filteredServers.map((s) => {
              const isSelected = activeServer.id === s.id;
              const fillPct = (s.online / s.maxOnline) * 100;
              const isFav = favs.includes(s.id);
              const isFull = s.online >= s.maxOnline;

              return (
                <div 
                  key={s.id}
                  onClick={() => {
                    onSelectServer(s);
                    onClose();
                  }}
                  className={`server-list-item ${isSelected ? 'selected' : ''}`}
                >
                  <div className="server-item-left">
                    <div className={`server-id-badge ${isSelected ? 'active-badge' : ''}`}>
                      0{s.id}
                    </div>

                    <div className="server-item-details">
                      <div className="server-item-title-row">
                        <span className="server-item-name">{s.name}</span>
                        {s.bonus && (
                          <span className={`server-bonus-tag ${s.bonus === 'FULL' ? 'tag-full' : 'tag-bonus'}`}>
                            {s.bonus}
                          </span>
                        )}
                      </div>
                      
                      <div className="server-item-progress-row">
                        <div className="server-item-progress-track">
                          <div 
                            className={`server-item-progress-fill ${isFull ? 'full-fill' : ''}`} 
                            style={{ width: `${fillPct}%` }} 
                          />
                        </div>
                        <div className="server-item-online-text">
                          <span className="online-current">{s.online}</span>
                          <span className="online-sep">/</span>
                          <span className="online-max">{s.maxOnline}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="server-item-right">
                    <div className="server-item-ping">
                      <span className={`ping-status-dot ${s.ping < 30 ? 'good' : 'medium'}`} />
                      <Wifi size={13} />
                      <span>{s.ping} ms</span>
                    </div>

                    <button 
                      className={`server-fav-btn ${isFav ? 'fav-active' : ''}`}
                      onClick={(e) => toggleFav(e, s.id)}
                    >
                      <Star size={15} fill={isFav ? "#ffd700" : "none"} color={isFav ? "#ffd700" : "rgba(255,255,255,0.4)"} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
