import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import Image from '../components/Image'
import './Organizations.css'

const Organizations = () => {
  const { currentLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Имитация загрузки контента страницы
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 700)

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
    <div className="organizations">
      {/* Заголовок и хлебные крошки */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="page-title">{t('organizations', currentLanguage)}</h1>
          <div className="breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>{t('organizations', currentLanguage)}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="organizations-hero">
        <div className="hero-background">
          <Image src="/alka-fon2.png" alt="Фон организаций" className="hero-bg-image" />
        </div>
        <div className="container">
          <div className="organizations-hero-content">
            <p>{t('mainActivities', currentLanguage)}</p>
          </div>
        </div>
      </section>

      {/* Main Organizations */}
      <section className="main-organizations">
        <div className="container">
          <div className="organizations-grid">
            <div className="organization-card jewelry">
              <div className="organization-icon">
                <Image src="/yuvelirn.png" alt="Ювелирный салон" />
              </div>
              <div className="organization-content">
                <h2>{t('jewelry', currentLanguage).toUpperCase()}</h2>
                <p>
                  {t('jewelryDescription', currentLanguage)}
                </p>
                <div className="organization-features">
                  <div className="feature">
                    <span className="feature-icon">💎</span>
                    <span>{t('goldJewelry', currentLanguage)}</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">💍</span>
                    <span>{t('weddingRings', currentLanguage)}</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">✨</span>
                    <span>{t('preciousStones', currentLanguage)}</span>
                  </div>
                </div>
                <a href="/organizations/jewelry" className="btn btn-primary">{t('readMore', currentLanguage)}</a>
              </div>
            </div>
            
            <div className="organization-card lombard">
              <div className="organization-icon">
                <Image src="/lombard.png" alt="Ломбард" />
              </div>
              <div className="organization-content">
                <h2>{t('lombard', currentLanguage).toUpperCase()}</h2>
                <p>
                  {t('lombardDescription', currentLanguage)}
                </p>
                <div className="organization-features">
                  <div className="feature">
                    <span className="feature-icon">💰</span>
                    <span>{t('quickLoans', currentLanguage)}</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📱</span>
                    <span>{t('onlineAssessment', currentLanguage)}</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">⚡</span>
                    <span>{t('instantIssuance', currentLanguage)}</span>
                  </div>
                </div>
                <a href="/lombard" className="btn btn-primary">{t('readMore', currentLanguage)}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Programs */}
      <section className="financial-programs">
        <div className="container">
          <h2>{t('financialPrograms', currentLanguage)}</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-icon">🏢</div>
              <h3>{t('damuLeasing', currentLanguage)}</h3>
              <p>
                {t('damuLeasingFullDesc', currentLanguage)}
              </p>
              <div className="program-benefits">
                <span>{t('favorableRates', currentLanguage)}</span>
                <span>{t('quickApproval', currentLanguage)}</span>
                <span>{t('flexibleTerms', currentLanguage)}</span>
              </div>
              <a href="#" className="btn btn-outline">{t('readMore', currentLanguage)}</a>
            </div>
            
            <div className="program-card">
              <div className="program-icon">🏠</div>
              <h3>{t('nurlyZher', currentLanguage)}</h3>
              <p>
                {t('nurlyZherFullDesc', currentLanguage)}
              </p>
              <div className="program-benefits">
                <span>{t('stateSupport', currentLanguage)}</span>
                <span>{t('preferentialTerms', currentLanguage)}</span>
                <span>{t('longTermFinancing', currentLanguage)}</span>
              </div>
              <a href="#" className="btn btn-outline">{t('readMore', currentLanguage)}</a>
            </div>
            
            <div className="program-card">
              <div className="program-icon">💼</div>
              <h3>{t('damu', currentLanguage)}</h3>
              <p>
                {t('damuFullDesc', currentLanguage)}
              </p>
              <div className="program-benefits">
                <span>{t('businessLoans', currentLanguage)}</span>
                <span>{t('guarantees', currentLanguage)}</span>
                <span>{t('regionalPrograms', currentLanguage)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <h2>{t('whyChooseUs', currentLanguage)}</h2>
          <div className="reasons-grid">
            <div className="reason-item">
              <div className="reason-icon">🏆</div>
              <h3>{t('experienceReliability', currentLanguage)}</h3>
              <p>{t('experienceReliabilityDesc', currentLanguage)}</p>
            </div>
            
            <div className="reason-item">
              <div className="reason-icon">⚡</div>
              <h3>{t('speed', currentLanguage)}</h3>
              <p>{t('speedDesc', currentLanguage)}</p>
            </div>
            
            <div className="reason-item">
              <div className="reason-icon">🤝</div>
              <h3>{t('individualApproach', currentLanguage)}</h3>
              <p>{t('individualApproachDesc', currentLanguage)}</p>
            </div>
            
            <div className="reason-item">
              <div className="reason-icon">💎</div>
              <h3>{t('serviceQuality', currentLanguage)}</h3>
              <p>{t('serviceQualityDesc', currentLanguage)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2>{t('readyToCooperate', currentLanguage)}</h2>
            <p>{t('contactForInfo', currentLanguage)}</p>
            <div className="cta-buttons">
              <a href="/contacts" className="btn btn-primary">{t('contactUs', currentLanguage)}</a>
              <a href="/about" className="btn btn-secondary">{t('aboutCompany', currentLanguage)}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Organizations
