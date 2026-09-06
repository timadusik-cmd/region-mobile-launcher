import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  Gift, 
  CreditCard, 
  Crown, 
  Coins, 
  ArrowLeft,
  Flame,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function ShopView() {
  const [tab, setTab] = useState('CASES'); // 'CASES' | 'COINS' | 'VIP'
  const [userBc, setUserBc] = useState(1250);
  const [rubles, setRubles] = useState(500);

  // Subview State inside Shop: 'LIST' | 'CASE_DETAIL' | 'VIP_DETAIL'
  const [subView, setSubView] = useState('LIST');
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedVip, setSelectedVip] = useState(null);

  // Roulette Spin State
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinReel, setSpinReel] = useState([]);
  const [spinTranslateX, setSpinTranslateX] = useState(0);
  const [wonItem, setWonItem] = useState(null);

  // Notification Toast
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const cases = [
    {
      id: 1,
      title: "Автомобильный Кейс",
      price: 250,
      tag: "ТОП АВТО",
      color: "#22e414",
      imageAsset: "/cases/car.png",
      description: "Bugatti Chiron, BMW M8, Mercedes G63, Porsche.",
      drops: [
        { name: "Bugatti Chiron", rarity: "LEGENDARY", chance: "0.5%", icon: "🏎️", valueBc: 2500 },
        { name: "BMW M8 Competition", rarity: "EPIC", chance: "2.0%", icon: "🚗", valueBc: 1200 },
        { name: "Mercedes G63 Mansory", rarity: "EPIC", chance: "5.0%", icon: "🚙", valueBc: 900 },
        { name: "Porsche 911 GT3 RS", rarity: "RARE", chance: "12.0%", icon: "🏎️", valueBc: 500 },
        { name: "Audi RS7 Sportback", rarity: "RARE", chance: "20.0%", icon: "🚘", valueBc: 350 },
        { name: "500.000 ₽ Игровых", rarity: "COMMON", chance: "60.5%", icon: "💵", valueBc: 150 }
      ]
    },
    {
      id: 2,
      title: "Летний Премиум",
      price: 400,
      tag: "X2 ШАНС",
      color: "#ff9500",
      imageAsset: "/cases/summer.png",
      description: "Неоновые винилы, виллы на Рублевке и рубли.",
      drops: [
        { name: "Винил 'Neon Cyber'", rarity: "LEGENDARY", chance: "1.0%", icon: "🎨", valueBc: 3000 },
        { name: "Вилла на Рублевке", rarity: "LEGENDARY", chance: "2.5%", icon: "🏰", valueBc: 2000 },
        { name: "Скин 'Летний Олигарх'", rarity: "EPIC", chance: "6.0%", icon: "🤵", valueBc: 1000 },
        { name: "5.000.000 ₽ Игровых", rarity: "RARE", chance: "15.0%", icon: "💰", valueBc: 600 },
        { name: "Катер 'Sea Ray'", rarity: "RARE", chance: "25.5%", icon: "🛥️", valueBc: 450 },
        { name: "1.000.000 ₽ Игровых", rarity: "COMMON", chance: "50.0%", icon: "💵", valueBc: 200 }
      ]
    },
    {
      id: 3,
      title: "Кейс «Олигарх»",
      price: 990,
      tag: "ЭКСКЛЮЗИВ",
      color: "#af52de",
      imageAsset: "/cases/oligarch.png",
      description: "АЗС бизнес, особняк на Рублевке и Rolls-Royce.",
      drops: [
        { name: "АЗС 'Region Oil'", rarity: "LEGENDARY", chance: "0.2%", icon: "⛽", valueBc: 10000 },
        { name: "Особняк на Рублевке", rarity: "LEGENDARY", chance: "0.8%", icon: "🏰", valueBc: 5000 },
        { name: "Rolls-Royce Phantom", rarity: "EPIC", chance: "4.0%", icon: "🚘", valueBc: 2500 },
        { name: "Bugatti Chiron Super", rarity: "EPIC", chance: "10.0%", icon: "🏎️", valueBc: 1800 },
        { name: "Скин 'Президент'", rarity: "RARE", chance: "20.0%", icon: "👑", valueBc: 900 },
        { name: "15.000.000 ₽ Наличными", rarity: "COMMON", chance: "65.0%", icon: "💵", valueBc: 500 }
      ]
    },
    {
      id: 4,
      title: "Кейс Аксессуаров",
      price: 180,
      tag: "НОВИНКА",
      color: "#007aff",
      imageAsset: "/cases/accessories.png",
      description: "Светящиеся крылья, сумки GUCCI и маски.",
      drops: [
        { name: "Светящиеся Крылья", rarity: "LEGENDARY", chance: "1.5%", icon: "🪽", valueBc: 1500 },
        { name: "Сумка GUCCI Dragon", rarity: "EPIC", chance: "5.5%", icon: "🎒", valueBc: 800 },
        { name: "Маска Анонимуса Neon", rarity: "RARE", chance: "15.0%", icon: "🎭", valueBc: 350 },
        { name: "Очки Ray-Ban Gold", rarity: "COMMON", chance: "30.0%", icon: "🕶️", valueBc: 120 },
        { name: "Рюкзак Supreme", rarity: "COMMON", chance: "48.0%", icon: "🎒", valueBc: 90 }
      ]
    },
    {
      id: 5,
      title: "Скины ОПГ & Фракции",
      price: 320,
      tag: "ХИТ",
      color: "#ff453a",
      imageAsset: "/cases/opg.png",
      description: "Арабский шейх, форма СОБР, Бригада.",
      drops: [
        { name: "Скин 'Арабский Шейх'", rarity: "LEGENDARY", chance: "1.2%", icon: "👳‍♂️", valueBc: 2200 },
        { name: "Форма Спецназа СОБР", rarity: "EPIC", chance: "6.8%", icon: "👮‍♂️", valueBc: 950 },
        { name: "Кожанка 'Бригада'", rarity: "RARE", chance: "17.0%", icon: "🧥", valueBc: 450 },
        { name: "Костюм Бизнесмена", rarity: "COMMON", chance: "35.0%", icon: "👔", valueBc: 180 },
        { name: "Скин 'Гангстер'", rarity: "COMMON", chance: "40.0%", icon: "🕶️", valueBc: 140 }
      ]
    },
    {
      id: 6,
      title: "Тюнинг & Нитро",
      price: 210,
      tag: "АВТОПАК",
      color: "#30d158",
      imageAsset: "/cases/tuning.png",
      description: "Пневмоподвеска RGB, стробоскопы, нитро X10.",
      drops: [
        { name: "Пневмоподвеска RGB", rarity: "LEGENDARY", chance: "2.0%", icon: "🛞", valueBc: 1600 },
        { name: "Стробоскопы & Неон", rarity: "EPIC", chance: "8.0%", icon: "🚨", valueBc: 750 },
        { name: "Нитро X10 Впрыск", rarity: "RARE", chance: "20.0%", icon: "⚡", valueBc: 300 },
        { name: "Чип-Тюнинг Stage 3", rarity: "RARE", chance: "30.0%", icon: "⚙️", valueBc: 220 },
        { name: "Комплект Тюнинга", rarity: "COMMON", chance: "40.0%", icon: "🔧", valueBc: 110 }
      ]
    }
  ];

  const donatePacks = [
    { rubles: 500, coins: 1000, bonus: "X2 БОНУС", tag: "СТАРТ", popular: false },
    { rubles: 1500, coins: 3000, bonus: "+300 BC БОНУС", tag: "ПОПУЛЯРНЫЙ", popular: true },
    { rubles: 3000, coins: 6000, bonus: "+1000 BC + GOLD VIP", tag: "ВЫГОДНО", popular: false },
    { rubles: 5000, coins: 10000, bonus: "+2500 BC + PLATINUM", tag: "МАКСИМУМ", popular: false },
  ];

  const vipPacks = [
    { 
      id: 'silver',
      title: "SILVER VIP", 
      priceBc: 250, 
      period: "30 дней",
      color: "#8E8E93", 
      perks: [
        "+50% к зарплатам на всех работах", 
        "+2 дополнительных слота под авто", 
        "Ускоренное лечение в больнице x2",
        "Скидка 10% на штрафы ГИБДД"
      ] 
    },
    { 
      id: 'gold',
      title: "GOLD VIP", 
      priceBc: 600, 
      period: "30 дней",
      color: "#FFD60A", 
      perks: [
        "+100% к зарплатам & X2 EXP на серверах", 
        "+5 слотов под автомобили & гаражи", 
        "Бесплатный вызов эвакуатора", 
        "Доступ к VIP чату (/v)",
        "Скидка 15% в автосалонах"
      ] 
    },
    { 
      id: 'platinum',
      title: "PLATINUM VIP", 
      priceBc: 1200, 
      period: "30 дней",
      color: "#30D158", 
      perks: [
        "+200% к зарплатам & X3 EXP", 
        "+10 слотов под авто & премиум виллы", 
        "Зеленый светящийся цвет никнейма", 
        "Персональный менеджер 24/7",
        "Бесплатная заправка канистрой",
        "Полная защита от потери инвентаря"
      ] 
    }
  ];

  // Rarity Config Helper
  const getRarityBadge = (rarity) => {
    switch (rarity) {
      case 'LEGENDARY':
        return { label: 'ЛЕГЕНДАРНЫЙ', color: '#ffcc00', bg: 'rgba(255, 204, 0, 0.15)', border: 'rgba(255, 204, 0, 0.4)' };
      case 'EPIC':
        return { label: 'ЭПИЧЕСКИЙ', color: '#af52de', bg: 'rgba(175, 82, 222, 0.15)', border: 'rgba(175, 82, 222, 0.4)' };
      case 'RARE':
        return { label: 'РЕДКИЙ', color: '#007aff', bg: 'rgba(0, 122, 255, 0.15)', border: 'rgba(0, 122, 255, 0.4)' };
      default:
        return { label: 'ОБЫЧНЫЙ', color: '#22e414', bg: 'rgba(34, 228, 20, 0.15)', border: 'rgba(34, 228, 20, 0.3)' };
    }
  };

  // Open Full-Page Case View
  const handleSelectCase = (c) => {
    setSelectedCase(c);
    setSubView('CASE_DETAIL');
    setIsSpinning(false);
    setWonItem(null);
    setSpinTranslateX(0);
  };

  // Open Full-Page VIP View
  const handleSelectVip = (v) => {
    setSelectedVip(v);
    setSubView('VIP_DETAIL');
  };

  // Back to Main Shop List
  const handleBackToList = () => {
    if (isSpinning) return;
    setSubView('LIST');
    setSelectedCase(null);
    setSelectedVip(null);
    setWonItem(null);
    setSpinTranslateX(0);
  };

  // Trigger Case Opening Roulette
  const handleSpinCase = () => {
    if (!selectedCase) return;
    if (userBc < selectedCase.price) {
      showToast("❌ Недостаточно BC! Пополните баланс во вкладке 'Пополнение'");
      return;
    }

    setUserBc((prev) => prev - selectedCase.price);
    setIsSpinning(true);
    setWonItem(null);
    setSpinTranslateX(0);

    const drops = selectedCase.drops;
    const winningDrop = drops[Math.floor(Math.random() * drops.length)];
    
    let strip = [];
    for (let i = 0; i < 40; i++) {
      if (i === 32) {
        strip.push(winningDrop);
      } else {
        strip.push(drops[Math.floor(Math.random() * drops.length)]);
      }
    }
    setSpinReel(strip);

    // Card width 115px + gap 10px = 125px step. Target card center = 32 * 125 + 57.5 = 4057.5px
    const targetX = 32 * 125 + 57.5;

    setTimeout(() => {
      setSpinTranslateX(targetX);
    }, 50);

    setTimeout(() => {
      setWonItem(winningDrop);
      setIsSpinning(false);
    }, 4400);
  };

  // Buy BC Coins
  const handleBuyBc = (amountCoins, priceRubles) => {
    setUserBc((prev) => prev + amountCoins);
    showToast(`✅ Успешно! Зачислено +${amountCoins.toLocaleString()} BC за ${priceRubles} ₽`);
  };

  // Buy VIP
  const handleBuyVip = (vip) => {
    if (userBc < vip.priceBc) {
      showToast("❌ Недостаточно BC для покупки VIP!");
      return;
    }
    setUserBc((prev) => prev - vip.priceBc);
    handleBackToList();
    showToast(`🎉 Поздравляем! Подписка ${vip.title} успешно активирована!`);
  };

  return (
    <div className="workspace-view-container" style={{ padding: '8px 12px', overflowX: 'hidden', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(17, 21, 32, 0.95)',
          border: '1px solid var(--color-border-brand)',
          color: '#fff',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.78rem',
          fontWeight: 800,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {toastMsg}
        </div>
      )}

      {/* ======================================================================== */}
      {/* VIEW 1: MAIN SHOP GALLERY LIST */}
      {/* ======================================================================== */}
      {subView === 'LIST' && (
        <>
          {/* Header Navigation Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                background: 'rgba(34, 228, 20, 0.12)',
                border: '1px solid var(--color-border-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-brand)'
              }}>
                <ShoppingBag size={15} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', color: '#fff', lineHeight: 1 }}>
                Магазин & Донат
              </span>
            </div>

            {/* Tab Selector Pills */}
            <div className="segmented-control" style={{ width: 'auto' }}>
              <button 
                className={`segmented-btn ${tab === 'CASES' ? 'active' : ''}`}
                onClick={() => setTab('CASES')}
                style={{ padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Gift size={13} />
                Кейсы ({cases.length})
              </button>

              <button 
                className={`segmented-btn ${tab === 'COINS' ? 'active' : ''}`}
                onClick={() => setTab('COINS')}
                style={{ padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <CreditCard size={13} />
                Пополнение (X2)
              </button>

              <button 
                className={`segmented-btn ${tab === 'VIP' ? 'active' : ''}`}
                onClick={() => setTab('VIP')}
                style={{ padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Crown size={13} />
                VIP Статусы
              </button>
            </div>
          </div>

          {/* TAB 1: 3-COLUMN CASES GALLERY */}
          {tab === 'CASES' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
              {cases.map((c) => (
                <div 
                  key={c.id} 
                  onClick={() => handleSelectCase(c)}
                  className="shop-case-card"
                  style={{
                    background: `radial-gradient(circle at top center, ${c.color}25 0%, var(--color-bg-card) 75%)`,
                    border: `1px solid ${c.color}50`,
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '4px',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                  }}
                >
                  {/* Card Top Row: Tag & Price */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{
                      fontSize: '0.58rem',
                      fontWeight: 900,
                      color: c.color,
                      background: `${c.color}22`,
                      border: `1px solid ${c.color}60`,
                      padding: '2px 6px',
                      borderRadius: '6px',
                      letterSpacing: '0.5px'
                    }}>
                      {c.tag}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Coins size={11} color="var(--color-brand)" />
                      <span style={{ fontWeight: 900, color: 'var(--color-brand)', fontSize: '0.78rem' }}>
                        {c.price} BC
                      </span>
                    </div>
                  </div>

                  {/* Card Middle: Glowing 3D Emblem Stage */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '52px',
                    position: 'relative',
                    margin: '2px 0'
                  }}>
                    <div style={{
                      position: 'absolute',
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: c.color,
                      opacity: 0.22,
                      filter: 'blur(10px)'
                    }} />
                    <img 
                      src={c.imageAsset} 
                      alt={c.title} 
                      style={{ 
                        height: '100%', 
                        maxHeight: '52px',
                        objectFit: 'contain',
                        position: 'relative',
                        filter: `drop-shadow(0 0 10px ${c.color})`
                      }} 
                    />
                  </div>

                  {/* Card Title & Description Centered */}
                  <div style={{ textAlign: 'center', width: '100%', overflow: 'hidden' }}>
                    <div style={{ fontWeight: 900, fontSize: '0.85rem', color: '#fff', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.title}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.description}
                    </div>
                  </div>

                  {/* Card Bottom CTA Button */}
                  <button style={{
                    width: '100%',
                    padding: '5px 0',
                    borderRadius: 'var(--radius-sm)',
                    background: 'linear-gradient(135deg, #2bfd1b 0%, #15a80a 100%)',
                    border: 'none',
                    color: '#040d03',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px var(--color-brand-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    ОТКРЫТЬ КЕЙС
                    <ChevronRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: COINS TOP UP */}
          {tab === 'COINS' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Converter Banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(34, 228, 20, 0.12) 0%, rgba(12, 16, 26, 0.95) 100%)',
                border: '1px solid var(--color-border-brand)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.62rem', fontWeight: 900, color: 'var(--color-brand)', textTransform: 'uppercase' }}>
                    <Flame size={13} />
                    АКЦИЯ X2 К ПОПОЛНЕНИЮ БАЛАНСА
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '0.98rem', color: '#fff', marginTop: '2px' }}>
                    Курс: 1 Рубль (₽) = 2 Region Coins (BC)
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-bg-input)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <input 
                    type="number"
                    value={rubles}
                    onChange={(e) => setRubles(Math.max(1, Number(e.target.value)))}
                    style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontWeight: 900, fontSize: '1rem', width: '65px', textAlign: 'right' }}
                  />
                  <span style={{ fontWeight: 800, color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>₽</span>
                  <span style={{ color: 'var(--color-brand)', fontWeight: 900 }}>=</span>
                  <span style={{ fontWeight: 900, color: 'var(--color-brand)', fontSize: '1.05rem' }}>
                    {(rubles * 2).toLocaleString()} BC
                  </span>

                  <button 
                    onClick={() => handleBuyBc(rubles * 2, rubles)}
                    style={{
                      marginLeft: '6px',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-brand)',
                      border: 'none',
                      color: '#000',
                      fontWeight: 900,
                      fontSize: '0.72rem',
                      cursor: 'pointer'
                    }}
                  >
                    ОПЛАТИТЬ
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {donatePacks.map((p, i) => (
                  <div key={i} className="shop-coin-card" style={{
                    background: p.popular ? 'rgba(34,228,20,0.06)' : 'var(--color-bg-card)',
                    border: `1px solid ${p.popular ? 'var(--color-brand)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>{p.tag}</span>
                        {p.popular && <Zap size={13} color="var(--color-brand)" />}
                      </div>
                      <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#fff', marginTop: '3px' }}>
                        {p.coins.toLocaleString()} BC
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--color-brand)', fontWeight: 800, marginTop: '2px' }}>
                        {p.bonus}
                      </div>
                    </div>

                    <button 
                      onClick={() => handleBuyBc(p.coins, p.rubles)}
                      style={{
                        width: '100%',
                        padding: '7px',
                        borderRadius: 'var(--radius-sm)',
                        background: p.popular ? 'var(--color-brand)' : 'rgba(255,255,255,0.08)',
                        border: 'none',
                        color: p.popular ? '#000' : '#fff',
                        fontWeight: 900,
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      КУПИТЬ ЗА {p.rubles} ₽
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VIP SUBSCRIPTIONS */}
          {tab === 'VIP' && (
            <div className="vip-grid">
              {vipPacks.map((v, idx) => (
                <div key={idx} className={`vip-card vip-card-${v.id}`}>
                  {/* Top Tier Tag Badge */}
                  <div className="vip-card-top-tag">
                    {v.id === 'gold' && <span className="vip-badge badge-gold"><Flame size={11} /> ХИТ • POPULAR</span>}
                    {v.id === 'platinum' && <span className="vip-badge badge-platinum"><Crown size={11} /> ЛЕГЕНДАРНЫЙ</span>}
                    {v.id === 'silver' && <span className="vip-badge badge-silver">СТАРТОВЫЙ</span>}
                  </div>

                  {/* Header Stage */}
                  <div className="vip-card-header">
                    <div className="vip-icon-glow" style={{ background: `${v.color}20`, borderColor: `${v.color}50` }}>
                      <Crown size={20} color={v.color} />
                    </div>
                    <div>
                      <h3 className="vip-card-title" style={{ color: v.color }}>{v.title}</h3>
                      <span className="vip-card-period">{v.period} подписки</span>
                    </div>
                  </div>

                  {/* Price Banner */}
                  <div className="vip-card-price-wrap">
                    <Coins size={13} color="var(--color-brand)" />
                    <span className="vip-price-val">{v.priceBc.toLocaleString()} BC</span>
                  </div>

                  {/* Perks List */}
                  <div className="vip-perks-list">
                    {v.perks.map((perk, pi) => (
                      <div key={pi} className="vip-perk-item">
                        <span className="vip-check" style={{ color: v.color }}>✓</span>
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Action Button */}
                  <button 
                    onClick={() => handleSelectVip(v)}
                    className={`vip-buy-btn btn-${v.id}`}
                  >
                    <span>ПРИОБРЕСТИ ЗА {v.priceBc} BC</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ======================================================================== */}
      {/* VIEW 2: FULL-PAGE DEDICATED CASE OPENING PAGE WITH HUGE ROULETTE */}
      {/* ======================================================================== */}
      {subView === 'CASE_DETAIL' && selectedCase && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
          {/* Top Bar Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button 
              disabled={isSpinning}
              onClick={handleBackToList}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                color: '#fff',
                padding: '5px 12px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: isSpinning ? 'not-allowed' : 'pointer'
              }}
            >
              <ArrowLeft size={15} />
              Назад в Магазин
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 900, fontSize: '1rem', color: selectedCase.color }}>
                {selectedCase.title}
              </span>
              <div style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-brand)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Coins size={14} color="var(--color-brand)" />
                <span style={{ fontWeight: 900, color: 'var(--color-brand)', fontSize: '0.85rem' }}>
                  {userBc.toLocaleString()} BC
                </span>
              </div>
            </div>
          </div>

          {/* Compact Header Stage */}
          <div style={{
            background: `radial-gradient(ellipse at left center, ${selectedCase.color}25 0%, var(--color-bg-card) 75%)`,
            border: `1px solid ${selectedCase.color}45`,
            borderRadius: 'var(--radius-md)',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={selectedCase.imageAsset} 
                alt={selectedCase.title} 
                style={{ width: '46px', height: '46px', objectFit: 'contain', filter: `drop-shadow(0 0 10px ${selectedCase.color})` }} 
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#fff' }}>
                    {selectedCase.title}
                  </span>
                  <span style={{ fontSize: '0.58rem', fontWeight: 900, color: selectedCase.color, background: `${selectedCase.color}25`, padding: '1px 6px', borderRadius: '6px' }}>
                    {selectedCase.tag}
                  </span>
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '1px' }}>
                  {selectedCase.description}
                </div>
              </div>
            </div>

            {/* Spin CTA Button */}
            <button 
              disabled={isSpinning}
              onClick={handleSpinCase}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-md)',
                background: isSpinning ? 'var(--color-bg-input)' : 'linear-gradient(135deg, #2bfd1b 0%, #15a80a 100%)',
                border: 'none',
                color: isSpinning ? 'var(--color-text-muted)' : '#000',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '0.85rem',
                cursor: isSpinning ? 'not-allowed' : 'pointer',
                boxShadow: isSpinning ? 'none' : '0 4px 15px var(--color-brand-glow)',
                whiteSpace: 'nowrap'
              }}
            >
              {isSpinning ? "ВРАЩЕНИЕ..." : `ОТКРЫТЬ (${selectedCase.price} BC)`}
            </button>
          </div>

          {/* PROMINENT TALL ROULETTE REEL */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '125px',
            background: '#06090f',
            border: '1px solid var(--color-border-brand)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'inset 0 0 25px rgba(0,0,0,0.8)'
          }}>
            {/* Center Pointer Arrow Line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'var(--color-brand)',
              boxShadow: '0 0 16px var(--color-brand)',
              zIndex: 10,
              transform: 'translateX(-50%)'
            }} />

            {/* Horizontal Strip Tape */}
            <div style={{
              display: 'flex',
              gap: '10px',
              paddingLeft: '50%',
              transform: `translateX(-${spinTranslateX}px)`,
              transition: isSpinning ? 'transform 4.1s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
            }}>
              {(spinReel.length > 0 ? spinReel : selectedCase.drops).map((item, idx) => {
                const badge = getRarityBadge(item.rarity);
                return (
                  <div key={idx} style={{
                    width: '115px',
                    height: '102px',
                    flexShrink: 0,
                    background: badge.bg,
                    border: `1px solid ${badge.border}`,
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                    gap: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}>
                    <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fff', textAlign: 'center', width: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </span>
                    <span style={{ fontSize: '0.6rem', fontWeight: 900, color: badge.color }}>
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DROPS LIST GRID */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>
                СОДЕРЖИМОЕ КЕЙСА И ШАНСЫ ВЫПАДЕНИЯ:
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-brand)', fontWeight: 800 }}>
                6 Предметов в кейсе
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {selectedCase.drops.map((drop, idx) => {
                const badge = getRarityBadge(drop.rarity);
                return (
                  <div key={idx} style={{
                    background: 'var(--color-bg-card)',
                    border: `1px solid ${badge.border}`,
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '1.4rem' }}>{drop.icon}</span>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {drop.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '1px' }}>
                        <span style={{ fontSize: '0.58rem', fontWeight: 900, color: badge.color, background: badge.bg, padding: '1px 5px', borderRadius: '4px' }}>
                          {badge.label}
                        </span>
                        <span style={{ fontSize: '0.62rem', color: 'var(--color-text-dim)', fontWeight: 700 }}>
                          {drop.chance}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* AUTHENTIC CRMP / RADMIR / HASSLE ONLINE 3D VICTORY PODIUM STAGE */}
      {/* ======================================================================== */}
      {wonItem && (
        <div className="modal-overlay" style={{ background: 'rgba(4, 6, 10, 0.92)', backdropFilter: 'blur(18px)', zIndex: 2000, padding: '16px' }}>
          <div 
            style={{
              width: '100%',
              maxWidth: '450px',
              background: `radial-gradient(ellipse at top center, ${getRarityBadge(wonItem.rarity).color}35 0%, #0a0e17 70%, #06080e 100%)`,
              border: `1.5px solid ${getRarityBadge(wonItem.rarity).color}`,
              borderRadius: '24px',
              padding: '22px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              boxShadow: `0 0 60px ${getRarityBadge(wonItem.rarity).color}45`,
              animation: 'popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            {/* Top Victory Header Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.68rem',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '5px 16px',
              borderRadius: '20px',
              marginBottom: '6px'
            }}>
              ПОЗДРАВЛЯЕМ С ПОБЕДОЙ!
            </div>

            {/* Rarity Pill Badge */}
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 900,
              color: getRarityBadge(wonItem.rarity).color,
              background: getRarityBadge(wonItem.rarity).bg,
              border: `1px solid ${getRarityBadge(wonItem.rarity).border}`,
              padding: '3px 12px',
              borderRadius: '12px',
              letterSpacing: '1px',
              boxShadow: `0 0 12px ${getRarityBadge(wonItem.rarity).color}30`
            }}>
              {getRarityBadge(wonItem.rarity).label} ПРИЗ
            </div>

            {/* 3D GAMING PODIUM STAGE WITH ROTATING GLOW & PERSPECTIVE RING */}
            <div style={{
              position: 'relative',
              width: '180px',
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px 0 6px 0'
            }}>
              {/* Ambient Pulsing Aura Glow */}
              <div style={{
                position: 'absolute',
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                background: getRarityBadge(wonItem.rarity).color,
                opacity: 0.35,
                filter: 'blur(28px)'
              }} />

              {/* 3D Hexagonal Pedestal Base Ring */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                width: '135px',
                height: '40px',
                borderRadius: '50%',
                background: `radial-gradient(ellipse at center, ${getRarityBadge(wonItem.rarity).color}60 0%, transparent 80%)`,
                border: `1.5px solid ${getRarityBadge(wonItem.rarity).color}80`,
                boxShadow: `0 0 20px ${getRarityBadge(wonItem.rarity).color}`,
                transform: 'perspective(200px) rotateX(60deg)'
              }} />

              {/* Big 3D Floating Prize Emblem */}
              <div style={{
                fontSize: '4.2rem',
                position: 'relative',
                zIndex: 2,
                filter: `drop-shadow(0 10px 20px ${getRarityBadge(wonItem.rarity).color}90)`
              }}>
                {wonItem.icon}
              </div>
            </div>

            {/* Item Title & Case Origin Subtitle */}
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.45rem',
                color: '#fff',
                lineHeight: 1.1,
                letterSpacing: '0.5px',
                textShadow: '0 2px 14px rgba(0,0,0,0.9)'
              }}>
                {wonItem.name}
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                Выпало из кейса «{selectedCase?.title}»
              </span>
            </div>

            {/* Radmir & Hassle Style Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <button
                onClick={() => {
                  showToast(`🎁 '${wonItem.name}' успешно добавлен в ваш инвентарь!`);
                  setWonItem(null);
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #2bfd1b 0%, #15a80a 100%)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#040d03',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '0.82rem',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px var(--color-brand-glow-heavy)',
                  transition: 'transform 0.2s ease'
                }}
              >
                ЗАБРАТЬ ПРИЗ
              </button>

              <button
                onClick={() => {
                  setUserBc((prev) => prev + wonItem.valueBc);
                  showToast(`💰 Продано за +${wonItem.valueBc} BC!`);
                  setWonItem(null);
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(20, 26, 38, 0.9)',
                  border: '1px solid var(--color-border)',
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Coins size={15} color="var(--color-brand)" />
                ПРОДАТЬ ({wonItem.valueBc} BC)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* VIEW 3: FULL-PAGE DEDICATED VIP CONFIRMATION PAGE */}
      {/* ======================================================================== */}
      {subView === 'VIP_DETAIL' && selectedVip && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button 
              onClick={handleBackToList}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              Назад в Магазин
            </button>

            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: selectedVip.color }}>
              Покупка подписки {selectedVip.title}
            </div>
          </div>

          <div style={{
            background: 'var(--color-bg-card)',
            border: `1px solid ${selectedVip.color}60`,
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: selectedVip.color, fontWeight: 900, fontSize: '1.15rem' }}>
                <Crown size={24} />
                {selectedVip.title}
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Стоимость:</span>
                <div style={{ fontWeight: 900, color: 'var(--color-brand)', fontSize: '1.1rem' }}>
                  {selectedVip.priceBc} BC / {selectedVip.period}
                </div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', marginBottom: '6px', display: 'block' }}>
                Все привилегии данного статуса:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {selectedVip.perks.map((p, i) => (
                  <div key={i} style={{ background: 'var(--color-bg-input)', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.75rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: selectedVip.color, fontWeight: 900 }}>✓</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => handleBuyVip(selectedVip)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                background: selectedVip.color,
                border: 'none',
                color: '#000',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: `0 4px 20px ${selectedVip.color}40`
              }}
            >
              ПОДТВЕРДИТЬ ПОКУПКУ ЗА {selectedVip.priceBc} BC
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
