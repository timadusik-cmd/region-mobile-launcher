import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Gift, 
  Car, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Crown, 
  Zap, 
  ChevronRight,
  Flame,
  Coins
} from 'lucide-react';

export default function ShopModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('CASES'); // 'CASES' | 'COINS' | 'VIP'
  const [rubles, setRubles] = useState(500);

  if (!isOpen) return null;

  const cases = [
    {
      id: 1,
      title: "Автомобильный Кейс",
      price: 250,
      tag: "ТОП АВТО",
      tagColor: "#ff9500",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop",
      items: "BMW M8, Mercedes G63, Audi RS7, Porsche 911"
    },
    {
      id: 2,
      title: "Летний Премиум Кейс",
      price: 400,
      tag: "X2 ШАНС",
      tagColor: "#22e414",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
      items: "Эксклюзивные винилы, Скины, 5.000.000 ₽"
    },
    {
      id: 3,
      title: "Кейс «Олигарх»",
      price: 990,
      tag: "ЭКСКЛЮЗИВ",
      tagColor: "#af52de",
      image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=600&auto=format&fit=crop",
      items: "Бизнес АЗС, Элитная вилла, Bugatti Chiron"
    },
    {
      id: 4,
      title: "Кейс Аксессуаров",
      price: 180,
      tag: "НОВИНКА",
      tagColor: "#007aff",
      image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=600&auto=format&fit=crop",
      items: "Сумка GUCCI, Маска анонимуса, Крылья"
    }
  ];

  const donatePacks = [
    { rubles: 500, coins: 1000, bonus: "X2 БОНУС", tag: "СТАРТ" },
    { rubles: 1500, coins: 3000, bonus: "+300 BC БОНУС", tag: "ПОПУЛЯРНЫЙ", popular: true },
    { rubles: 3000, coins: 6000, bonus: "+1000 BC + GOLD VIP", tag: "ВЫГОДНО" },
    { rubles: 5000, coins: 10000, bonus: "+2500 BC + PLATINUM VIP", tag: "МАКСИМУМ" },
  ];

  const vipPacks = [
    { title: "SILVER VIP", price: "250 BC / 30 дней", color: "#8E8E93", perks: ["+50% к зарплатам", "+2 слота под авто", "Лечение в больнице x2 быстрей"] },
    { title: "GOLD VIP", price: "600 BC / 30 дней", color: "#FFD60A", perks: ["+100% к зарплатам", "+5 слотов под авто", "Бесплатная эвакуация авто", "Доступ к VIP чату"] },
    { title: "PLATINUM VIP", price: "1200 BC / 30 дней", color: "#30D158", perks: ["+200% к зарплатам и опыт X3", "+10 слотов под авто", "Уникальный цвет ника", "Персональный менеджер"] }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '740px', maxHeight: '90%' }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <ShoppingBag size={22} color="var(--color-brand)" />
            Магазин & Донат REGION MOBILE
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '20px 24px' }}>
          {/* Shop Tabs */}
          <div style={{ display: 'flex', gap: '10px', background: 'var(--color-bg-card)', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <button 
              className={`fps-btn ${tab === 'CASES' ? 'active' : ''}`}
              onClick={() => setTab('CASES')}
              style={{ flex: 1, padding: '10px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Gift size={16} />
              Игровые Кейсы
            </button>

            <button 
              className={`fps-btn ${tab === 'COINS' ? 'active' : ''}`}
              onClick={() => setTab('COINS')}
              style={{ flex: 1, padding: '10px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <CreditCard size={16} />
              Пополнение BC (X2)
            </button>

            <button 
              className={`fps-btn ${tab === 'VIP' ? 'active' : ''}`}
              onClick={() => setTab('VIP')}
              style={{ flex: 1, padding: '10px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Crown size={16} />
              VIP Статусы
            </button>
          </div>

          {/* TAB 1: CASES */}
          {tab === 'CASES' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '6px' }}>
              {cases.map((c) => (
                <div key={c.id} style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease',
                  boxShadow: 'var(--shadow-card)'
                }}>
                  {/* Case Preview Header Art */}
                  <div style={{
                    height: '110px',
                    position: 'relative',
                    backgroundImage: `url('${c.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(18,24,38,0.95) 100%)'
                    }} />

                    {/* Tag Badge */}
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      color: c.tagColor,
                      background: 'rgba(0,0,0,0.6)',
                      border: `1px solid ${c.tagColor}50`,
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}>
                      {c.tag}
                    </span>

                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '14px',
                      right: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#fff', textShadow: '0 2px 8px #000' }}>
                        {c.title}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', lineHeight: 1.3 }}>
                      <strong style={{ color: '#fff' }}>Выпадение:</strong> {c.items}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, color: 'var(--color-brand)', fontSize: '1.1rem' }}>
                        <Coins size={18} />
                        {c.price} BC
                      </div>

                      <button style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'linear-gradient(135deg, #2bfd1b 0%, #15a80a 100%)',
                        border: 'none',
                        color: '#040d03',
                        fontWeight: 900,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px var(--color-brand-glow)'
                      }}>
                        ОТКРЫТЬ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: COINS & TOP UP */}
          {tab === 'COINS' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '6px' }}>
              {/* Interactive Calculator Box */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(34, 228, 20, 0.08) 0%, rgba(12, 16, 26, 0.9) 100%)',
                border: '1px solid var(--color-border-brand)',
                borderRadius: 'var(--radius-lg)',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🔥 АКЦИЯ X2 ПОПОЛНЕНИЕ!
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#fff', marginTop: '2px' }}>
                    Калькулятор Region Coins
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    Введите сумму в рублях и получите в 2 раза больше BC на счет.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--color-bg-input)', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <input 
                    type="number"
                    value={rubles}
                    onChange={(e) => setRubles(Math.max(1, Number(e.target.value)))}
                    style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontWeight: 900, fontSize: '1.1rem', width: '80px', textAlign: 'right' }}
                  />
                  <span style={{ fontWeight: 800, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>₽</span>
                  <span style={{ color: 'var(--color-brand)', fontWeight: 900 }}>=</span>
                  <span style={{ fontWeight: 900, color: 'var(--color-brand)', fontSize: '1.1rem' }}>
                    {(rubles * 2).toLocaleString()} BC
                  </span>
                </div>
              </div>

              {/* Preset Donates Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {donatePacks.map((p, i) => (
                  <div key={i} style={{
                    background: p.popular ? 'rgba(34,228,20,0.06)' : 'var(--color-bg-card)',
                    border: `1px solid ${p.popular ? 'var(--color-brand)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    position: 'relative'
                  }}>
                    {p.popular && (
                      <span style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '12px',
                        background: 'var(--color-brand)',
                        color: '#000',
                        fontSize: '0.62rem',
                        fontWeight: 900,
                        padding: '2px 8px',
                        borderRadius: '10px'
                      }}>
                        {p.tag}
                      </span>
                    )}

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>ПАКЕТ #{i+1}</div>
                      <div style={{ fontWeight: 900, fontSize: '1.25rem', color: '#fff', marginTop: '2px' }}>
                        {p.coins.toLocaleString()} BC
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-brand)', fontWeight: 800, marginTop: '2px' }}>
                        {p.bonus}
                      </div>
                    </div>

                    <button style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      background: p.popular ? 'var(--color-brand)' : 'rgba(255,255,255,0.08)',
                      border: 'none',
                      color: p.popular ? '#000' : '#fff',
                      fontWeight: 900,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}>
                      КУПИТЬ ЗА {p.rubles} ₽
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VIP SUBSCRIPTIONS */}
          {tab === 'VIP' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginTop: '6px' }}>
              {vipPacks.map((v, idx) => (
                <div key={idx} style={{
                  background: 'var(--color-bg-card)',
                  border: `1px solid ${v.color}40`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '18px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px'
                }}>
                  <div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: v.color,
                      fontWeight: 900,
                      fontSize: '0.9rem'
                    }}>
                      <Crown size={18} />
                      {v.title}
                    </div>

                    <div style={{ fontWeight: 900, color: '#fff', fontSize: '0.85rem', marginTop: '6px' }}>
                      {v.price}
                    </div>

                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {v.perks.map((perk, pi) => (
                        <div key={pi} style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: v.color, fontWeight: 900 }}>✓</span>
                          {perk}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    background: v.color,
                    border: 'none',
                    color: '#000',
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}>
                    ПРИОБРЕСТИ
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
