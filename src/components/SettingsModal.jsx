import React, { useState } from 'react';
import { X, Settings, Monitor, Mic, HardDrive, ShieldCheck, Cpu } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const [fps, setFps] = useState(60);
  const [graphics, setGraphics] = useState('HIGH');
  const [cacheType, setCacheType] = useState('FULL');
  const [voiceChat, setVoiceChat] = useState(true);
  const [fastConnect, setFastConnect] = useState(true);
  const [showFpsCounter, setShowFpsCounter] = useState(true);
  const [ram, setRam] = useState(4);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Settings size={22} color="var(--color-brand)" />
            Настройки клиента REGION MOBILE
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* FPS Limits */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-title">Лимит FPS (Частота кадров)</div>
              <div className="setting-desc">Ограничение плавающего FPS для плавной игры</div>
            </div>
            <div className="fps-options">
              {[30, 60, 90, 120].map((val) => (
                <button 
                  key={val}
                  className={`fps-btn ${fps === val ? 'active' : ''}`}
                  onClick={() => setFps(val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Graphics Quality */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-title">Графика и Текстуры</div>
              <div className="setting-desc">Дальность прорисовки и качество теней</div>
            </div>
            <div className="fps-options">
              {[
                { key: 'LOW', label: 'Низкие' },
                { key: 'MED', label: 'Ср.' },
                { key: 'HIGH', label: 'Высокие' },
                { key: 'ULTRA', label: 'Ультра' }
              ].map((g) => (
                <button 
                  key={g.key}
                  className={`fps-btn ${graphics === g.key ? 'active' : ''}`}
                  onClick={() => setGraphics(g.key)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cache Type */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-title">Версия кэша игры</div>
              <div className="setting-desc">Полный кэш с HD машинками или Лайт версия</div>
            </div>
            <div className="fps-options">
              <button 
                className={`fps-btn ${cacheType === 'LIGHT' ? 'active' : ''}`}
                onClick={() => setCacheType('LIGHT')}
              >
                Лайт (2.1 GB)
              </button>
              <button 
                className={`fps-btn ${cacheType === 'FULL' ? 'active' : ''}`}
                onClick={() => setCacheType('FULL')}
              >
                Полный (3.8 GB)
              </button>
            </div>
          </div>

          {/* Voice Chat Toggle */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-title">Встроенный Голосовой Чат (Voice Chat)</div>
              <div className="setting-desc">Слышать микрофон игроков поблизости</div>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={voiceChat} 
                onChange={(e) => setVoiceChat(e.target.checked)} 
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Fast Connect Toggle */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-title">Быстрое подключение (FastConnect)</div>
              <div className="setting-desc">Ускоренное повторное подключение при полном сервере</div>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={fastConnect} 
                onChange={(e) => setFastConnect(e.target.checked)} 
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* RAM Allocation Slider */}
          <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="setting-info">
                <div className="setting-title">Выделение ОЗУ (RAM)</div>
                <div className="setting-desc">Рекомендуется 4 GB для тяжелых винилов</div>
              </div>
              <span style={{ fontWeight: 800, color: 'var(--color-brand)', fontSize: '0.9rem' }}>
                {ram} GB
              </span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="8" 
              step="1"
              value={ram}
              onChange={(e) => setRam(Number(e.target.value))}
              style={{ accentColor: 'var(--color-brand)', width: '100%', cursor: 'pointer' }}
            />
          </div>

          {/* Maintenance Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button 
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ShieldCheck size={16} color="var(--color-brand)" />
              Проверить целостность
            </button>

            <button 
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,69,58,0.1)',
                border: '1px solid rgba(255,69,58,0.3)',
                color: '#ff453a',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <HardDrive size={16} />
              Переустановить кэш
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
