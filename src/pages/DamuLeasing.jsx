import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import ContactForm from '../components/ContactForm'
import Loader from '../components/Loader'
import Image from '../components/Image'
import './DamuLeasing.css'

const DamuLeasing = () => {
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
    <div className="damu-leasing-page">
      {/* Заголовок и хлебные крошки */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="page-title">{t('damuLeasing', currentLanguage)}</h1>
          <div className="breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>{t('damuLeasing', currentLanguage)}</span>
          </div>
        </div>
      </div>

      <div className="damu-leasing-container">
        <div className="damu-leasing-content">
          {/* Левая колонка - Баннер Даму Лизинг */}
          <div className="damu-leasing-banner-section">
            {/* Ссылка на сайт Даму */}
            <div className="damu-website-link">
              <a 
                href="https://damu.kz/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {t('damuLeasingDesc', currentLanguage)}
              </a>
            </div>
            
            <div className="damu-leasing-banner">
              <div className="banner-image">
                <Image src="/DamuLeasing.jpeg" alt="Даму Лизинг" />
              </div>
            </div>
          </div>

          {/* Правая колонка - Контактная форма */}
          <div className="damu-leasing-contact-form-section">
            <ContactForm 
              title={t('writeToUs', currentLanguage)}
              description={t('formDescription', currentLanguage)}
              className="damu-leasing-contact-form"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DamuLeasing
