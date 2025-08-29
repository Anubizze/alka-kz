import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import './LombardServices.css'
import ContactForm from '../components/ContactForm'
import { getPdfPath } from '../utils/pdfPaths'

const LombardServices = () => {
  const { currentLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  // PDF документы для услуг ломбарда
  const pdfDocuments = [
    {
      name: 'Правила ломбарда ЛОМБАРД АЛКА',
      file: getPdfPath('Pravila-lombarda-LOMBARD-ALKA.pdf'),
      description: 'Основные правила работы ломбарда'
    },
    {
      name: 'Правила ЛОМБАРД АЛКА от 01.09.2021г',
      file: getPdfPath('Pravila-LOMBARD-ALKA-ot-01.09.2021g.pdf'),
      description: 'Обновленные правила ломбарда'
    },
    {
      name: 'Договор присоединения до 50 МРП',
      file: getPdfPath('Dogovor-prisoedineniya-do-50-MRP-01.10.2021-.pdf'),
      description: 'Договор для займов до 50 МРП'
    },
    {
      name: 'Договор присоединения свыше 50 МРП',
      file: getPdfPath('Dogovor-prisoedineniya-svyshe-50-MRP-s-01.10.2021g.-.pdf'),
      description: 'Договор для займов свыше 50 МРП'
    },
    {
      name: 'Приложение к ЗБ (новый)',
      file: getPdfPath('Prilozheniya-k-ZB-novyj.pdf'),
      description: 'Приложение к залоговому билету'
    },
    {
      name: 'Порядок реструктуризации займа',
      file: getPdfPath('Poryadok-i-kontaktnye-telefony-po-restrukturizatsii-zajma.pdf'),
      description: 'Условия реструктуризации займов'
    },
    {
      name: 'Порядок предоставления отсрочки платежей',
      file: getPdfPath('Poryadok-predostavleniya-otsrochki-platezhej-po-zajmam-fizicheskih-i-yuridicheskih-lits-postradavshih-v-rezultate-vvedeniya-chrezvychajnogo-polozheniya.pdf'),
      description: 'Условия отсрочки платежей'
    }
  ]

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
              <Link
                to="/calculator"
                className="calculator-link"
              >
                {t('goldCalculatorLink', currentLanguage)}
              </Link>
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

            {/* PDF документы для скачивания */}
            <div className="lombard-services-pdf-section">
              <h3>Документы для скачивания</h3>
              <p>Скачайте необходимые документы для ознакомления с условиями услуг ломбарда:</p>
              
              <div className="lombard-services-pdf-grid">
                {pdfDocuments.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={doc.name}
                    className="lombard-services-pdf-item"
                  >
                    <div className="pdf-item-header">
                      <span className="pdf-icon">📄</span>
                      <span className="pdf-name">{doc.name}</span>
                    </div>
                    <div className="pdf-item-description">
                      {doc.description}
                    </div>
                    <div className="pdf-item-download">
                      <span className="download-text">Скачать</span>
                      <span className="download-icon">⬇️</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
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
