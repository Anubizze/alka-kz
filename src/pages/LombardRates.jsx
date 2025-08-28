import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import './LombardRates.css'

const LombardRates = () => {
  const { currentLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

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
    <div className="lombard-rates-page">
      <section className="rates-hero">
        <div className="container">
          <h1>{t('lombardRates', currentLanguage)}</h1>
          <p>{t('lombardRatesDesc', currentLanguage)}</p>
        </div>
      </section>

      <section className="rates-table">
        <div className="container">
          <div className="rates-grid">
            <div className="rate-category">
              <h3>{t('jewelryRates', currentLanguage)}</h3>
              <div className="rate-items">
                <div className="rate-item">
                  <span className="item-name">{t('gold585', currentLanguage)}</span>
                  <span className="rate-value">85%</span>
                </div>
                <div className="rate-item">
                  <span className="item-name">{t('gold750', currentLanguage)}</span>
                  <span className="rate-value">90%</span>
                </div>
                <div className="rate-item">
                  <span className="item-name">{t('silver925', currentLanguage)}</span>
                  <span className="rate-value">70%</span>
                </div>
                <div className="rate-item">
                  <span className="item-name">{t('diamonds', currentLanguage)}</span>
                  <span className="rate-value">80%</span>
                </div>
              </div>
            </div>
            
            <div className="rate-category">
              <h3>{t('electronicsRates', currentLanguage)}</h3>
              <div className="rate-items">
                <div className="rate-item">
                  <span className="item-name">{t('smartphones', currentLanguage)}</span>
                  <span className="rate-value">60%</span>
                </div>
                <div className="rate-item">
                  <span className="item-name">{t('laptops', currentLanguage)}</span>
                  <span className="rate-value">65%</span>
                </div>
                <div className="rate-item">
                  <span className="item-name">{t('tablets', currentLanguage)}</span>
                  <span className="rate-value">55%</span>
                </div>
                <div className="rate-item">
                  <span className="item-name">{t('watches', currentLanguage)}</span>
                  <span className="rate-value">70%</span>
                </div>
              </div>
            </div>
            
            <div className="rate-category">
              <h3>{t('otherItems', currentLanguage)}</h3>
              <div className="rate-items">
                <div className="rate-item">
                  <span className="item-name">{t('brandClothing', currentLanguage)}</span>
                  <span className="rate-value">40%</span>
                </div>
                <div className="rate-item">
                  <span className="item-name">{t('watches', currentLanguage)}</span>
                  <span className="rate-value">75%</span>
                </div>
                <div className="rate-item">
                  <span className="item-name">{t('antiques', currentLanguage)}</span>
                  <span className="rate-value">50%</span>
                </div>
                <div className="rate-item">
                  <span className="item-name">{t('art', currentLanguage)}</span>
                  <span className="rate-value">45%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rates-note">
            <p>{t('ratesNote', currentLanguage)}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LombardRates
