import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import ContactForm from '../components/ContactForm'
import './LombardContacts.css'

const LombardContacts = () => {
  const { currentLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleMapError = () => {
    setMapError(true)
  }

  if (isLoading) {
    return (
      <div className="page-loader">
        <Loader size="large" className="center" />
      </div>
    )
  }

  return (
    <div className="contacts">
      {/* Заголовок и хлебные крошки */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="page-title">
            {currentLanguage === 'RU' ? 'Контакты ломбарда' : 'Ломбард байланысы'}
          </h1>
          <div className="breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>{t('contacts', currentLanguage)}</span>
          </div>
        </div>
      </div>

      {/* Central Office Section */}
      <section className="central-office-section">
        <div className="container">
          <h2 className="central-office-title">
            {currentLanguage === 'RU' ? 'Ломбард АЛҚА - Семей' : 'АЛҚА Ломбарды - Семей'}
          </h2>
        </div>
      </section>

      {/* Контейнер для карты и формы рядом */}
      <section className="contacts-map-form-row">
        {/* Левая колонка: карта */}
        <div className="map-card">
          <div className="map-city-label">
            Семей
          </div>
          <div className="map-container">
            {!mapError ? (
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae3294964b2d645a93e9cc0338de16d6a995cf25b3290afae94858f02bf15398e&source=constructor"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                title="Семей карта - ЛОМБАРД АЛҚА"
                onError={handleMapError}
              />
            ) : (
              <div className="map-fallback">
                                  <div className="map-fallback-content">
                    <div className="map-fallback-icon">📍</div>
                    <h3>ЛОМБАРД АЛҚА - Семей</h3>
                    <p>Адрес: г. Семей, ул. Абая, 123</p>
                    <p>Телефон: +7 (701) 081-36-76</p>
                    <p>Email: {import.meta.env.VITE_RECIPIENT_EMAIL || 'Не настроен'}</p>
                    <p>Время работы: Ежедневно с 10:00 до 18:00</p>
                                      <a 
                      href="https://yandex.kz/maps/165/semey/?ll=80.233015,50.417717&z=11.14" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="map-fallback-link"
                    >
                      {currentLanguage === 'RU' 
                        ? 'Открыть карту в Яндекс.Картах' 
                        : 'Яндекс картасында ашу'
                      }
                    </a>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Правая колонка: форма */}
        <div className="lombard-news-form-section">
          <div className="lombard-news-contact-form-panel">
            <ContactForm 
              title={t('writeToUs', currentLanguage)}
              description={t('formDescription', currentLanguage)}
              className="lombard-news-contact-form"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default LombardContacts