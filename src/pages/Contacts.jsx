import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import Image from '../components/Image'
import ContactForm from '../components/ContactForm'
import './Contacts.css'

const Contacts = () => {
  const { currentLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Имитация загрузки контента страницы
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

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
          <h1 className="page-title">{t('contacts', currentLanguage)}</h1>
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
            {currentLanguage === 'RU' ? 'ЦЕНТРАЛЬНЫЙ ОФИС' : 'Орталық кеңсе'}
          </h2>
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-info">
                <h3>Адрес</h3>
                <p>г. Семей, ул. Примерная, 123</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-info">
                <h3>Телефон</h3>
                <p>+7 (701) 081-36-76</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">🕒</div>
              <div className="contact-info">
                <h3>Время работы</h3>
                <p>Пн-Пт: 9:00 - 18:00<br/>Сб: 9:00 - 15:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.5!2d80.259632!3d50.418458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI1JzA2LjQiTiA4MMKwMTUnMzQuNyJF!5e0!3m2!1sru!2skz!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта центрального офиса"
          ></iframe>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <h3 className="form-title">
              {currentLanguage === 'RU' ? 'Отправьте нам сообщение' : 'Бізге хабарлама жіберіңіз'}
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contacts
