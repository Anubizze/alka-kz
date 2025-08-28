import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import Image from '../components/Image'
import './About.css'
import ContactForm from '../components/ContactForm'

const About = () => {
  const { currentLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Имитация загрузки контента страницы
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

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
    <div className="about-page">
      {/* Заголовок и хлебные крошки */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="page-title">{t('aboutCompany', currentLanguage)}</h1>
          <div className="breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>{t('aboutCompany', currentLanguage)}</span>
          </div>
        </div>
      </div>

      <div className="about-container">
        <div className="about-content">
          <h2>О компании АЛКА</h2>
          <p>
            Группа компаний "АЛКА" - это динамично развивающийся финансовый холдинг, 
            предоставляющий широкий спектр финансовых услуг в Казахстане.
          </p>
          
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">🏢</div>
              <div className="feature-content">
                <h3>Многолетний опыт</h3>
                <p>Более 10 лет успешной работы на финансовом рынке</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">💎</div>
              <div className="feature-content">
                <h3>Качество услуг</h3>
                <p>Высокие стандарты обслуживания клиентов</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <div className="feature-content">
                <h3>Надежность</h3>
                <p>Стабильное финансовое положение и доверие клиентов</p>
              </div>
            </div>
          </div>
          
          {/* Форма обратной связи */}
          <div className="lombard-news-form-section">
            <div className="lombard-news-contact-form-panel">
              <ContactForm 
                title={t('writeToUs', currentLanguage)}
                description={t('formDescription', currentLanguage)}
                className="lombard-news-contact-form"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
