import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import './LombardCompany.css'
import ContactForm from '../components/ContactForm'

const LombardCompany = () => {
  const { currentLanguage } = useLanguage()

  return (
    <div className="lombard-company">
      {/* Заголовок и хлебные крошки */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="page-title">Компания</h1>
          <div className="breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>Компания</span>
          </div>
        </div>
      </div>

      <div className="container">

        
        <div className="company-content">
          {/* Левая колонка - Форма */}
          <div className="lombard-news-form-section">
            <div className="lombard-news-contact-form-panel">
              <ContactForm 
                title={t('writeToUs', currentLanguage)}
                description={t('formDescription', currentLanguage)}
                className="lombard-news-contact-form"
              />
            </div>
          </div>
          
          {/* Правая колонка - Описание компании */}
          <div className="company-description-section">
            <div className="company-text">
              <p>{t('companyDescription', currentLanguage)}</p>
              
              <ul className="benefits-list">
                <li>{t('companyBenefits1', currentLanguage)}</li>
                <li>{t('companyBenefits2', currentLanguage)}</li>
                <li>{t('companyBenefits3', currentLanguage)}</li>
                <li>{t('companyBenefits4', currentLanguage)}</li>
                <li>{t('companyBenefits5', currentLanguage)}</li>
                <li>{t('companyBenefits6', currentLanguage)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LombardCompany
