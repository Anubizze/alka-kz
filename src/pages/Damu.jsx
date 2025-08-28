import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import ContactForm from '../components/ContactForm'
import Loader from '../components/Loader'
import Image from '../components/Image'
import './Damu.css'

const Damu = () => {
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
    <div className="damu-page">
      {/* Заголовок и хлебные крошки */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="page-title">{t('damu', currentLanguage)}</h1>
          <div className="breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>{t('damu', currentLanguage)}</span>
          </div>
        </div>
      </div>

      <div className="damu-container">
        <div className="damu-content">
          {/* Левая колонка - Баннер Даму */}
          <div className="damu-banner-section">
            {/* Ссылки на сайт Даму */}
            <div className="damu-website-links">
              <a 
                href="https://damu.kz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="damu-link-first"
              >
                Кредиты/Гарантии ДАМУ для предпринимателей
              </a>
              <a 
                href="https://damu.kz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="damu-link-second"
              >
                Как получить кредит по программе
              </a>
              <a 
                href="https://damu.kz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="damu-link-third"
              >
                ДАМУ Регионы
              </a>
            </div>
            
            <div className="damu-banner">
              <div className="banner-image">
                <Image src="/Damu.jpeg" alt="Даму" />
              </div>
            </div>
          </div>

          {/* Правая колонка - Контактная форма */}
          <div className="damu-contact-form-section">
            <ContactForm 
              title={t('writeToUs', currentLanguage)}
              description={t('formDescription', currentLanguage)}
              className="damu-contact-form"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Damu
