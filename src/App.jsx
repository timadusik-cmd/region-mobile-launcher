import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import SidebarNav from './components/SidebarNav';
import Navbar from './components/Navbar';
import MainScreen from './components/MainScreen';
import NewsView from './components/NewsView';
import ServersView from './components/ServersView';
import ShopView from './components/ShopView';
import SettingsView from './components/SettingsView';
import DownloadModal from './components/DownloadModal';
import DeviceFrameToggler from './components/DeviceFrameToggler';
import SplashLoader from './components/SplashLoader';
import './styles/theme.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('MAIN'); // 'MAIN' | 'SERVERS' | 'NEWS' | 'SHOP' | 'SETTINGS'
  const [nickname, setNickname] = useState('Kenzo_Player');
  const [gameState, setGameState] = useState('READY'); // 'READY' | 'UPDATE_REQUIRED' | 'DOWNLOADING' | 'PLAYING'
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Initial Splash Screen State
  const [isSplashLoading, setIsSplashLoading] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);

  // Preview Mode
  const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'tablet' | 'full'

  // Active Selected Server
  const [activeServer, setActiveServer] = useState({
    id: 1,
    name: "REGION 01 | MOSCOW",
    online: 984,
    maxOnline: 1000,
    ping: 22,
    bonus: "X2 EXP"
  });

  // Handle Tab Navigation from Sidebar
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Initial Splash Loading Animation Interval
  useEffect(() => {
    let timer = setInterval(() => {
      setSplashProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsSplashLoading(false), 300);
          return 100;
        }
        return prev + 4;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Simulated Cache Download Interval
  useEffect(() => {
    let timer;
    if (isDownloading && downloadProgress < 100) {
      timer = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 98) {
            clearInterval(timer);
            setIsDownloading(false);
            setGameState('READY');
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isDownloading, downloadProgress]);

  const handleStartGame = () => {
    if (gameState === 'UPDATE_REQUIRED' || (downloadProgress < 100 && gameState !== 'READY')) {
      setIsDownloading(true);
      setGameState('DOWNLOADING');
      setIsDownloadModalOpen(true);
    } else if (gameState === 'READY') {
      setGameState('PLAYING');
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
      setTimeout(() => {
        alert(`Подключение к серверу ${activeServer.name} под ником ${nickname}...`);
        setGameState('READY');
      }, 2500);
    }
  };

  const handleCheckFiles = () => {
    setDownloadProgress(0);
    setGameState('DOWNLOADING');
    setIsDownloading(true);
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="launcher-root">
      {/* Device Viewport Frame Wrapper */}
      <div className={`viewport-container ${viewMode === 'phone' ? 'device-phone' : viewMode === 'tablet' ? 'device-tablet' : ''}`}>
        {/* Smartphone Notch */}
        {viewMode === 'phone' && (
          <div className="mobile-notch">
            <div className="mobile-notch-camera" />
            <div className="mobile-notch-speaker" />
          </div>
        )}

        <div className="app-viewport">
          {/* Initial Launcher Splash Loading Screen */}
          {isSplashLoading && (
            <SplashLoader progress={splashProgress} />
          )}

          {/* Background Ambient Wallpaper */}
          <div 
            className="app-bg-art"
            style={{
              backgroundImage: `url('/bd9c9431-65b7-4717-9bb6-8b1863dd0ffb.jpg')`
            }}
          />
          <div className="app-bg-overlay" />

          {/* Main App Layout: Left Sidebar + Right Main Workspace */}
          <div className="app-content">
            {/* Majestic RP Style Left Navigation Sidebar */}
            <SidebarNav 
              activeTab={activeTab}
              onChangeTab={handleTabChange}
              nickname={nickname}
              setNickname={setNickname}
            />

            {/* Main Workspace Area */}
            <div className="main-workspace">
              <Navbar 
                onOpenSettings={() => setActiveTab('SETTINGS')}
                onOpenShop={() => setActiveTab('SHOP')}
                onCheckFiles={handleCheckFiles}
              />

              {/* INLINE PAGE VIEW SWITCHER (NO MODAL OVERLAYS) */}
              {activeTab === 'MAIN' && (
                <MainScreen 
                  activeServer={activeServer}
                  onOpenServerSelect={() => setActiveTab('SERVERS')}
                  gameState={gameState}
                  onStartGame={handleStartGame}
                  downloadProgress={downloadProgress}
                  onOpenShop={() => setActiveTab('SHOP')}
                  onOpenSocials={() => setActiveTab('NEWS')}
                />
              )}

              {activeTab === 'NEWS' && (
                <NewsView onBackToMain={() => setActiveTab('MAIN')} />
              )}

              {activeTab === 'SERVERS' && (
                <ServersView 
                  activeServer={activeServer}
                  onSelectServer={(srv) => {
                    setActiveServer(srv);
                    setActiveTab('MAIN');
                  }}
                  onStartGame={handleStartGame}
                />
              )}

              {activeTab === 'SHOP' && (
                <ShopView onBackToMain={() => setActiveTab('MAIN')} />
              )}

              {activeTab === 'SETTINGS' && (
                <SettingsView onBackToMain={() => setActiveTab('MAIN')} />
              )}
            </div>
          </div>

          {/* Download Progress Modal */}
          <DownloadModal 
            isOpen={isDownloadModalOpen}
            onClose={() => setIsDownloadModalOpen(false)}
            progress={downloadProgress}
            isDownloading={isDownloading}
            onTogglePause={() => setIsDownloading(!isDownloading)}
            onCancelDownload={() => {
              setIsDownloading(false);
              setGameState('READY');
              setIsDownloadModalOpen(false);
            }}
          />
        </div>
      </div>

      {/* Floating Viewport Device Switcher */}
      <DeviceFrameToggler 
        currentMode={viewMode}
        onChangeMode={setViewMode}
      />
    </div>
  );
}
