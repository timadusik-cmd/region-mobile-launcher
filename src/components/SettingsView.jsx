import React, { useState } from 'react';
import { Settings, ShieldCheck, HardDrive, Monitor, Cpu, Volume2, Zap } from 'lucide-react';

export default function SettingsView({ onBackToMain }) {
  const [fps, setFps] = useState(60);
  const [graphics, setGraphics] = useState('HIGH');
  const [cacheType, setCacheType] = useState('FULL');
  const [voiceChat, setVoiceChat] = useState(true);
  const [fastConnect, setFastConnect] = useState(true);
  const [ram, setRam] = useState(4);

  return (
    <div className="workspace-view-container settings-view-clean">
      {/* Top Header Title */}
      <div className="settings-header">
        <div className="settings-header-left">
          <div className="settings-header-icon">
            <Settings size={18} />
          </div>
          <div>
            <h1 className="settings-header-title">Настройки Клиента REGION MOBILE</h1>
            <span className="settings-header-sub">Параметры графики, лимит FPS, голосовой чат и память</span>
          </div>
        </div>
      </div>

      {/* Grid of Setting Cards (2 columns x 3 rows) */}
      <div className="settings-grid">
        {/* Card 1: FPS Limit */}
        <div className="setting-card">
          <div className="setting-card-header">
            <div className="setting-card-title">
              <Monitor size={15} color="var(--color-brand)" />
              Лимит FPS
            </div>
            <span className="setting-card-val">{fps} FPS</span>
          </div>
          <div className="segmented-control">
            {[30, 60, 90, 120].map((val) => (
              <button
                key={val}
                className={`segmented-btn ${fps === val ? 'active' : ''}`}
                onClick={() => setFps(val)}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Card 2: Graphics */}
        <div className="setting-card">
          <div className="setting-card-header">
            <div className="setting-card-title">
              <Cpu size={15} color="var(--color-brand)" />
              Графика и текстуры
            </div>
            <span className="setting-card-val">
              {graphics === 'LOW' ? 'Низкие' : graphics === 'MED' ? 'Средние' : graphics === 'HIGH' ? 'Высокие' : 'Ультра'}
            </span>
          </div>
          <div className="segmented-control">
            {[
              { key: 'LOW', label: 'Низкие' },
              { key: 'MED', label: 'Ср.' },
              { key: 'HIGH', label: 'Высокие' },
              { key: 'ULTRA', label: 'Ультра' }
            ].map((g) => (
              <button
                key={g.key}
                className={`segmented-btn ${graphics === g.key ? 'active' : ''}`}
                onClick={() => setGraphics(g.key)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card 3: Cache Version */}
        <div className="setting-card">
          <div className="setting-card-header">
            <div className="setting-card-title">
              <HardDrive size={15} color="var(--color-brand)" />
              Версия кэша игры
            </div>
            <span className="setting-card-val">{cacheType === 'LIGHT' ? '2.1 GB' : '3.8 GB'}</span>
          </div>
          <div className="segmented-control">
            <button
              className={`segmented-btn ${cacheType === 'LIGHT' ? 'active' : ''}`}
              onClick={() => setCacheType('LIGHT')}
            >
              Лайт (2.1 GB)
            </button>
            <button
              className={`segmented-btn ${cacheType === 'FULL' ? 'active' : ''}`}
              onClick={() => setCacheType('FULL')}
            >
              Полный (3.8 GB)
            </button>
          </div>
        </div>

        {/* Card 4: RAM Allocation */}
        <div className="setting-card">
          <div className="setting-card-header">
            <div className="setting-card-title">
              <Cpu size={15} color="var(--color-brand)" />
              Память ОЗУ (RAM)
            </div>
            <span className="setting-card-val">{ram} GB</span>
          </div>
          <div className="ram-slider-wrap">
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={ram}
              onChange={(e) => setRam(Number(e.target.value))}
              className="custom-ram-slider"
            />
            <div className="ram-marks">
              <span>2GB</span>
              <span>4GB</span>
              <span>6GB</span>
              <span>8GB</span>
            </div>
          </div>
        </div>

        {/* Card 5: Voice Chat Toggle */}
        <div className="setting-card setting-card-row">
          <div className="setting-card-info">
            <div className="setting-card-title">
              <Volume2 size={15} color="var(--color-brand)" />
              Голосовой чат
            </div>
            <span className="setting-card-desc">Микрофоны игроков поблизости</span>
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

        {/* Card 6: Fast Connect Toggle */}
        <div className="setting-card setting-card-row">
          <div className="setting-card-info">
            <div className="setting-card-title">
              <Zap size={15} color="var(--color-brand)" />
              FastConnect
            </div>
            <span className="setting-card-desc">Быстрое подключение к серверу</span>
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
      </div>

      {/* Bottom Actions Row */}
      <div className="settings-actions">
        <button className="settings-action-btn primary">
          <ShieldCheck size={16} color="var(--color-brand)" />
          Проверить целостность файлов
        </button>
        <button className="settings-action-btn danger">
          <HardDrive size={16} />
          Переустановить игровой кэш
        </button>
      </div>
    </div>
  );
}
