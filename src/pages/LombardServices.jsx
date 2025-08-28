import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import './LombardServices.css'
import ContactForm from '../components/ContactForm'

const LombardServices = () => {
  const { currentLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
    <div className="about-page lombard-services-page">
      {/* Заголовок и хлебные крошки */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="page-title">{t('lombardServices', currentLanguage)}</h1>
          <div className="breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>{t('lombard', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>{t('lombardServices', currentLanguage)}</span>
          </div>
        </div>
      </div>

      <div className="about-container">
        <div className="about-content two-columns">

          {/* Левая колонка — текст */}
          <div className="about-text">
            {/* Ссылка на онлайн калькулятор золота выше текста */}
            <div className="gold-calculator-link">
              <a
                href="#/calculator"
                className="calculator-link"
              >
                {t('goldCalculatorLink', currentLanguage)}
              </a>
            </div>

            <h2>{t('jewelryLoanTitle', currentLanguage)}</h2>
            <p>
              {t('jewelryLoanIntro', currentLanguage)}
            </p>
            <ul>
              <li>{t('jewelryRequirements1', currentLanguage)}</li>
              <li>{t('jewelryRequirements2', currentLanguage)}</li>
            </ul>
            <p>
              {t('jewelryLoanDescription', currentLanguage)}
            </p>

            <h3>{t('jewelryAssessmentTitle', currentLanguage)}</h3>
            <p>
              {t('jewelryAssessmentDesc1', currentLanguage)}
            </p>
            <p>
              {t('jewelryAssessmentDesc2', currentLanguage)}
            </p>

            <h2>{t('electronicsLoanTitle', currentLanguage)}</h2>
            <p>
              {t('electronicsLoanIntro', currentLanguage)}
            </p>
            <ul>
              <li>{t('electronicsRequirements1', currentLanguage)}</li>
              <li>{t('electronicsRequirements2', currentLanguage)}</li>
            </ul>
            <p>
              {t('electronicsLoanDescription', currentLanguage)}
            </p>
          </div>

          {/* Правая колонка — форма */}
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

export default LombardServices
