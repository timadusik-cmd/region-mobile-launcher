import React, { useState } from 'react';
import {
  Play,
  Download,
  Server,
  ChevronRight,
  Zap,
  Gift,
  MessageSquare,
  HelpCircle,
  Flame,
  Radio,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export default function MainScreen({
  activeServer,
  onOpenServerSelect,
  gameState,
  onStartGame,
  downloadProgress,
  onOpenShop,
  onOpenSocials
}) {
  const [activeBanner, setActiveBanner] = useState(0);

  const banners = [
    {
      tag: "АНОНС ПРОЕКТА",
      title: "Разработка сервера официально стартовала!",
      desc: "Мы начали активное создание проекта одновременно для Android и iOS. Впереди реализация ключевых систем и единого игрового мира — следите за новостями!",
      color: "#22e414",
      image: "/4d79d282-1df1-42c5-af80-44ab96711db4.jpg"
    },
    {
      tag: "ОБНОВЛЕНИЕ v2.4",
      title: "НОВЫЙ АВТОПАРК И ВИНИЛЫ",
      desc: "Добавлено 15 новых автомобилей, тюнинг-ателье в Арзамасе и обновленный автосалон.",
      color: "#ff9500",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
    },
    {
      tag: "BATTLE PASS",
      title: "СЕЗОН «КРИМИНАЛЬНАЯ РОССИЯ»",
      desc: "Выполняй ежедневные квесты и забирай эксклюзивный BMW M8 и 5.000.000 рублей!",
      color: "#007aff",
      image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="main-body">
      {/* Left Section: Image News Banner & Server Selector */}
      <div className="left-section">
        {/* Rich News Promo Banner with Artwork */}
        <div className="promo-banner">
          {/* Dynamic Image Layer */}
          <div
            className="promo-bg-img"
            style={{ backgroundImage: `url('${banners[activeBanner].image}')` }}
          />
          <div className="promo-bg-overlay" />

          {/* Banner Content */}
          <div className="promo-content">
            <div
              className="promo-tag"
              style={{ color: banners[activeBanner].color, borderColor: banners[activeBanner].color + '40' }}
            >
              <Flame size={12} />
              {banners[activeBanner].tag}
            </div>
            <h2 className="promo-title">{banners[activeBanner].title}</h2>
            <p className="promo-desc">{banners[activeBanner].desc}</p>
          </div>

          {/* Action Row & Dots */}
          <div className="promo-action-row">
            <div style={{ display: 'flex', gap: '6px' }}>
              {banners.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveBanner(idx)}
                  style={{
                    width: activeBanner === idx ? '26px' : '8px',
                    height: '6px',
                    borderRadius: '3px',
                    background: activeBanner === idx ? 'var(--color-brand)' : 'rgba(255,255,255,0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button className="promo-btn-more" onClick={onOpenSocials}>
              <span>ПОДРОБНЕЕ</span>
              <ExternalLink size={12} />
            </button>
          </div>
        </div>

        {/* Server Selector Card */}
        <div className="server-card" onClick={onOpenServerSelect}>
          <div className="server-card-ambient" />
          
          <div className="server-card-left">
            <div className="server-icon-badge">
              <span className="server-id-num">0{activeServer.id || 1}</span>
            </div>
            
            <div className="server-card-info">
              <div className="server-title">{activeServer.name}</div>
              <div className="server-status-bar-wrap">
                <div className="server-progress-bg">
                  <div
                    className="server-progress-fill"
                    style={{ width: `${(activeServer.online / activeServer.maxOnline) * 100}%` }}
                  />
                </div>
                <div className="server-online-count">
                  <span className="online-val">{activeServer.online}</span>
                  <span className="online-max">/{activeServer.maxOnline}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="server-card-right">
            <span className="server-live-tag">
              <span className="server-pulse-dot" />
              ONLINE
            </span>
            
            <div className="server-ping-badge">
              <span className="ping-dot" />
              <span>{activeServer.ping} ms</span>
            </div>

            <div className="server-arrow-wrap">
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Large Play Button & Quick Nav Cards */}
      <div className="right-section">
        {/* Main Action Play Button */}
        {gameState === 'READY' && (
          <button className="play-btn-large" onClick={onStartGame}>
            <div className="play-btn-shine" />
            <div className="play-btn-icon-wrap">
              <Play size={22} fill="#040d03" color="#040d03" style={{ marginLeft: '2px' }} />
            </div>
            <span>ИГРАТЬ</span>
          </button>
        )}

        {gameState === 'UPDATE_REQUIRED' && (
          <button className="play-btn-large downloading" onClick={onStartGame}>
            <Download size={24} color="var(--color-brand)" />
            <span>ОБНОВИТЬ (1.4 GB)</span>
          </button>
        )}

        {gameState === 'DOWNLOADING' && (
          <button className="play-btn-large downloading" onClick={onStartGame}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--color-brand)' }}>
                ЗАГРУЗКА... {downloadProgress}%
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                18.4 MB/s • ped.ifp
              </span>
            </div>
          </button>
        )}

        {gameState === 'PLAYING' && (
          <button className="play-btn-large" style={{ background: 'linear-gradient(135deg, #1c2436, #0c0f17)', color: '#22e414' }}>
            <Radio size={24} className="spin" />
            <span>В ИГРЕ...</span>
          </button>
        )}

        {/* Quick Nav Cards Grid */}
        <div className="quick-nav-grid">
          <div className="nav-card nav-card-shop" onClick={onOpenShop}>
            <div className="nav-card-glow" />
            <div className="nav-card-header">
              <div className="nav-card-icon">
                <Gift size={18} />
              </div>
              <span className="nav-card-badge">ХИТ</span>
            </div>
            <div className="nav-card-body">
              <div className="nav-card-title">Магазин</div>
              <div className="nav-card-bottom-row">
                <span className="nav-card-subtitle">Кейсы, VIP & BC</span>
                <ArrowRight size={13} className="nav-card-arrow" />
              </div>
            </div>
          </div>

          <div className="nav-card nav-card-social" onClick={onOpenSocials}>
            <div className="nav-card-glow" />
            <div className="nav-card-header">
              <div className="nav-card-icon">
                <MessageSquare size={18} />
              </div>
              <span className="nav-card-badge">VK • TG</span>
            </div>
            <div className="nav-card-body">
              <div className="nav-card-title">Сообщество</div>
              <div className="nav-card-bottom-row">
                <span className="nav-card-subtitle">Новости & Бонусы</span>
                <ArrowRight size={13} className="nav-card-arrow" />
              </div>
            </div>
          </div>

          <div className="nav-card nav-card-servers" onClick={onOpenServerSelect}>
            <div className="nav-card-glow" />
            <div className="nav-card-header">
              <div className="nav-card-icon">
                <Zap size={18} />
              </div>
              <span className="nav-card-badge">3.8K ON</span>
            </div>
            <div className="nav-card-body">
              <div className="nav-card-title">Серверы</div>
              <div className="nav-card-bottom-row">
                <span className="nav-card-subtitle">Выбор региона</span>
                <ArrowRight size={13} className="nav-card-arrow" />
              </div>
            </div>
          </div>

          <div className="nav-card nav-card-help" onClick={onOpenSocials}>
            <div className="nav-card-glow" />
            <div className="nav-card-header">
              <div className="nav-card-icon">
                <HelpCircle size={18} />
              </div>
              <span className="nav-card-badge">WIKI</span>
            </div>
            <div className="nav-card-body">
              <div className="nav-card-title">Помощь</div>
              <div className="nav-card-bottom-row">
                <span className="nav-card-subtitle">База знаний</span>
                <ArrowRight size={13} className="nav-card-arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
