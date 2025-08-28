import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import ContactForm from '../components/ContactForm'
import Loader from '../components/Loader'
import './NurlyZher.css'

const NurlyZher = () => {
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
    <div className="nurly-zher-page">
      {/* Заголовок и хлебные крошки */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="page-title">{t('nurlyZher', currentLanguage)}</h1>
          <div className="breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>{t('nurlyZher', currentLanguage)}</span>
          </div>
        </div>
      </div>

      <div className="nurly-zher-container">
        <div className="nurly-zher-content">
          {/* Левая колонка - Баннер Nurly Zher */}
          <div className="nurly-zher-banner-section">
            {/* Ссылки на сайт Даму */}
            <div className="damu-website-links">
              <a 
                href="https://damu.kz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="damu-link-first"
              >
                {t('nurlyZherHousingProgram', currentLanguage)}
              </a>
              <a 
                href="https://damu.kz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="damu-link-second"
              >
                {t('nurlyZherForDevelopers', currentLanguage)}
              </a>
            </div>
            
            <div className="nurly-zher-banner">
              <div className="banner-image">
                <img src="/BringLand.jpeg" alt="Nurly Zher" />
              </div>
            </div>
          </div>

          {/* Правая колонка - Контактная форма */}
          <div className="nurly-zher-contact-form-section">
            <ContactForm 
              title={t('writeToUs', currentLanguage)}
              description={t('formDescription', currentLanguage)}
              className="nurly-zher-contact-form"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NurlyZher
