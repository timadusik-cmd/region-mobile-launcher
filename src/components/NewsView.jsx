import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowLeft, ChevronRight } from 'lucide-react';

export default function NewsView({ onBackToMain }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      tag: "АНОНС ПРОЕКТА",
      tagColor: "#22e414",
      title: "Разработка сервера официально стартовала!",
      date: "06 Сентября 2026",
      image: "/4d79d282-1df1-42c5-af80-44ab96711db4.jpg",
      desc: "Мы начали активное создание проекта одновременно для Android и iOS. Впереди реализация ключевых систем и единого игрового мира — следите за новостями!",
      fullText: "Уважаемые игроки REGION MOBILE! С радостью сообщаем вам, что разработка нашего проекта официально стартовала на обеих мобильных платформах (Android и iOS). Наша команда работает над новым графическим движком, синхронизацией транспорта, физикой повреждений и глубокой криминальной симуляцией. Следите за нашими социальными сетями, чтобы не пропустить закрытое бета-тестирование!"
    },
    {
      id: 2,
      tag: "ОБНОВЛЕНИЕ v2.4",
      tagColor: "#ff9500",
      title: "Новый автопарк, винилы и тюнинг в Арзамасе",
      date: "02 Сентября 2026",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
      desc: "Добавлено 15 эксклюзивных моделей автомобилей, новое тюнинг-ателье в Арзамасе, системы винилов и пневмоподвески.",
      fullText: "Встречайте глобальное обновление v2.4! Мы добавили 15 авто премиум-класса (включая Mercedes-AMG GT, BMW M5 F90, Porsche Taycan), полностью переработали звучание двигателей и запустили новое тюнинг-ателье в Арзамасе. Теперь каждый игрок может создавать уникальные винилы и регулировать клиренс подвески!"
    },
    {
      id: 3,
      tag: "BATTLE PASS",
      tagColor: "#007aff",
      title: "Сезон Battle Pass «Криминальная Россия»",
      date: "28 Августа 2026",
      image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1000&auto=format&fit=crop",
      desc: "50 уровней с уникальными наградами: эксклюзивный BMW M8, скины ОПГ, аксессуары и 5.000.000 рублей.",
      fullText: "Запущен главный сезон пропускных испытаний! Проходите ежедневные и еженедельные задания, поднимайте уровень Battle Pass и забирайте редчайшие автомобили, уникальные скины авторитетов ОПГ, бронежилеты, винилы и миллионы игровой валюты!"
    }
  ];

  if (selectedArticle) {
    return (
      <div className="workspace-view-container">
        <button 
          className="promo-btn-more" 
          onClick={() => setSelectedArticle(null)}
          style={{ alignSelf: 'flex-start', marginBottom: '14px', gap: '8px' }}
        >
          <ArrowLeft size={16} />
          <span>Назад к списку новостей</span>
        </button>

        <div className="news-detail-card">
          <div 
            className="news-detail-banner"
            style={{ backgroundImage: `url('${selectedArticle.image}')` }}
          >
            <div className="news-detail-overlay" />
            <div className="news-detail-header-text">
              <span 
                className="news-detail-tag-pill"
                style={{ background: selectedArticle.tagColor + '20', borderColor: selectedArticle.tagColor + '50', color: selectedArticle.tagColor }}
              >
                {selectedArticle.tag}
              </span>
              <h1 className="news-detail-title">{selectedArticle.title}</h1>
              <div className="news-detail-date">
                <Calendar size={13} />
                <span>{selectedArticle.date}</span>
              </div>
            </div>
          </div>

          <div className="news-detail-body">
            <p className="news-detail-p">{selectedArticle.fullText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-view-container">
      {/* News Header Card */}
      <div className="news-header-card">
        <div className="news-header-left">
          <div className="news-icon-glow">
            <Newspaper size={20} color="var(--color-brand)" />
          </div>
          <div>
            <h1 className="news-header-title">Новости проекта REGION MOBILE</h1>
            <p className="news-header-desc">
              Официальные анонсы, обновления клиентов и события игрового мира
            </p>
          </div>
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="news-grid-container">
        {articles.map((art) => (
          <div 
            key={art.id} 
            onClick={() => setSelectedArticle(art)}
            className="news-card"
          >
            {/* Top Image Stage */}
            <div 
              className="news-card-img"
              style={{ backgroundImage: `url('${art.image}')` }}
            >
              <div className="news-card-overlay" />
              <span 
                className="news-tag-pill"
                style={{ background: art.tagColor + '25', borderColor: art.tagColor + '50', color: art.tagColor }}
              >
                {art.tag}
              </span>
            </div>

            {/* Bottom Content Stage */}
            <div className="news-card-body">
              <div className="news-card-main-info">
                <h3 className="news-card-title">{art.title}</h3>
                <p className="news-card-desc">{art.desc}</p>
              </div>

              <div className="news-card-footer">
                <div className="news-card-date">
                  <Calendar size={12} />
                  <span>{art.date}</span>
                </div>
                <div className="news-card-read-btn">
                  <span>ПОДРОБНЕЕ</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
