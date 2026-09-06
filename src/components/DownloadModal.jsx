import React from 'react';
import { X, Download, Pause, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function DownloadModal({ 
  isOpen, 
  onClose, 
  progress, 
  isDownloading, 
  onTogglePause,
  onCancelDownload 
}) {
  if (!isOpen) return null;

  const currentFile = progress < 30 ? "gta_sa/models/gta3.img (текстуры автомобильного пака)"
    : progress < 60 ? "gta_sa/audio/SFX/FEET (озвучка и звуки движков)"
    : progress < 90 ? "gta_sa/anim/ped.ifp (анимации движения персонажа)"
    : "crmp/custom_skins.txd (проверка файлов мода)";

  const downloadedMB = (3750 * (progress / 100)).toFixed(0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Download size={22} color="var(--color-brand)" />
            Загрузка игровых ресурсов CRMP
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', padding: '30px 24px' }}>
          {/* Circular Progress Badge */}
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle 
                cx="60" cy="60" r="50" 
                fill="none" 
                stroke="rgba(255,255,255,0.08)" 
                strokeWidth="8" 
              />
              <circle 
                cx="60" cy="60" r="50" 
                fill="none" 
                stroke="var(--color-brand)" 
                strokeWidth="8" 
                strokeDasharray="314" 
                strokeDashoffset={314 - (314 * progress) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.3s linear', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontWeight: 900,
              fontSize: '1.4rem',
              color: '#fff',
              fontFamily: 'var(--font-display)'
            }}>
              {progress}%
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
              {progress === 100 ? "Загрузка завершена!" : "Скачивание игрового кэша..."}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px', height: '36px' }}>
              {currentFile}
            </div>
          </div>

          {/* Download Detailed Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginTop: '8px'
          }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>ОБЪЕМ</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>{downloadedMB} / 3750 МБ</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>СКОРОСТЬ</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brand)' }}>18.4 МБ/с</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>ОСТАЛОСЬ</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>01 мин 14 сек</div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button 
              onClick={onTogglePause}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isDownloading ? <Pause size={18} /> : <Play size={18} />}
              {isDownloading ? "Пауза" : "Продолжить"}
            </button>

            <button 
              onClick={onCancelDownload}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,69,58,0.1)',
                border: '1px solid rgba(255,69,58,0.3)',
                color: '#ff453a',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ShieldAlert size={18} />
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
