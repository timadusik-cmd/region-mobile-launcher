import React, { useState } from 'react';
import { Server, Search, Star, Wifi, Play, Flame, Users, Check } from 'lucide-react';

export default function ServersView({ activeServer, onSelectServer, onStartGame }) {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('ALL'); // ALL, FAV, FREE
  const [favs, setFavs] = useState([1, 3]);

  const servers = [
    { id: 1, name: "REGION 01 | MOSCOW", online: 984, maxOnline: 1000, ping: 22, bonus: "X2 EXP", isHot: true },
    { id: 2, name: "REGION 02 | RED", online: 850, maxOnline: 1000, ping: 35, bonus: "X3 COINS", isHot: false },
    { id: 3, name: "REGION 03 | GREEN", online: 640, maxOnline: 1000, ping: 28, bonus: "BONUS", isHot: false },
    { id: 4, name: "REGION 04 | KRASNODAR", online: 1000, maxOnline: 1000, ping: 19, bonus: "FULL", isHot: true },
    { id: 5, name: "REGION 05 | ARZAMAS", online: 420, maxOnline: 1000, ping: 42, bonus: "NEW", isHot: false },
    { id: 6, name: "REGION 06 | SAMARA", online: 730, maxOnline: 1000, ping: 31, bonus: "X2 EXP", isHot: false },
  ];

  const toggleFav = (e, id) => {
    e.stopPropagation();
    if (favs.includes(id)) {
      setFavs(favs.filter(favId => favId !== id));
    } else {
      setFavs([...favs, id]);
    }
  };

  const filteredServers = servers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (tab === 'FAV') return favs.includes(s.id);
    if (tab === 'FREE') return s.online < 900;
    return true;
  });

  const totalOnline = servers.reduce((acc, s) => acc + s.online, 0);

  return (
    <div className="workspace-view-container">
      {/* Header Banner */}
      <div className="servers-header-card">
        <div className="servers-header-top">
          <div className="servers-header-left">
            <div className="servers-icon-glow">
              <Server size={20} color="var(--color-brand)" />
            </div>
            <div>
              <h1 className="servers-header-title">Игровые Серверы REGION MOBILE</h1>
              <p className="servers-header-desc">
                Единый игровой мир • Игроков онлайн: <span className="total-online-val"><Users size={11} style={{ display: 'inline', marginRight: '3px' }} />{totalOnline.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="servers-search-box">
            <Search size={14} color="var(--color-text-muted)" />
            <input 
              type="text"
              placeholder="Поиск региона..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="servers-tabs">
          <button 
            className={`servers-tab-btn ${tab === 'ALL' ? 'active' : ''}`}
            onClick={() => setTab('ALL')}
          >
            Все ({servers.length})
          </button>
          <button 
            className={`servers-tab-btn ${tab === 'FAV' ? 'active' : ''}`}
            onClick={() => setTab('FAV')}
          >
            <Star size={12} fill={tab === 'FAV' ? "#ffd700" : "none"} color={tab === 'FAV' ? "#ffd700" : "rgba(255,255,255,0.4)"} />
            Избранные ({favs.length})
          </button>
          <button 
            className={`servers-tab-btn ${tab === 'FREE' ? 'active' : ''}`}
            onClick={() => setTab('FREE')}
          >
            <Flame size={12} color="#ff9500" />
            Свободные
          </button>
        </div>
      </div>

      {/* Servers List Grid */}
      <div className="servers-grid-list">
        {filteredServers.map((s) => {
          const isSelected = activeServer.id === s.id;
          const fillPct = (s.online / s.maxOnline) * 100;
          const isFav = favs.includes(s.id);
          const isFull = s.online >= s.maxOnline;

          return (
            <div 
              key={s.id}
              onClick={() => onSelectServer(s)}
              className={`server-list-item ${isSelected ? 'selected' : ''}`}
            >
              {/* Left Badge */}
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

                    {s.isHot && (
                      <span className="server-bonus-tag tag-hot">
                        <Flame size={10} fill="#ff453a" /> HOT
                      </span>
                    )}
                  </div>
                  
                  {/* Capacity Bar */}
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
                      <span className="online-pct-badge">{Math.round(fillPct)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Action Controls */}
              <div className="server-item-right">
                {/* Ping Badge */}
                <div className="server-item-ping">
                  <span className={`ping-status-dot ${s.ping < 30 ? 'good' : 'medium'}`} />
                  <Wifi size={13} />
                  <span>{s.ping} ms</span>
                </div>

                {/* Star Favorite Button */}
                <button 
                  className={`server-fav-btn ${isFav ? 'fav-active' : ''}`}
                  onClick={(e) => toggleFav(e, s.id)}
                  title="В избранное"
                >
                  <Star size={15} fill={isFav ? "#ffd700" : "none"} color={isFav ? "#ffd700" : "rgba(255,255,255,0.4)"} />
                </button>

                {/* Play / Select Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectServer(s);
                    onStartGame();
                  }}
                  className={`server-connect-btn ${isSelected ? 'selected-btn' : ''}`}
                >
                  {isSelected ? (
                    <>
                      <Check size={14} />
                      <span>ВЫБРАН</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="#fff" />
                      <span>ИГРАТЬ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
