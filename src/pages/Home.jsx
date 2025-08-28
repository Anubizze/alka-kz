import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import Image from '../components/Image'
import './Home.css'

const Home = () => {
  const { currentLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState({})
  const [companyNews, setCompanyNews] = useState([])

  useEffect(() => {
    // Имитация загрузки контента страницы
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    // Загружаем новости компании из localStorage
    const savedNews = localStorage.getItem('homeCompanyNews')
    if (savedNews) {
      setCompanyNews(JSON.parse(savedNews))
    }

    return () => clearTimeout(timer)
  }, [])

  const handleImageError = (imageName) => {
    setImageError(prev => ({ ...prev, [imageName]: true }))
  }

  if (isLoading) {
    return (
      <div className="page-loader">
        <Loader size="large" className="center" />
      </div>
    )
  }
  
  return (
    <div className="home">
      {/* Main Services Section - Ювелирный салон и Ломбард */}
      <section className="main-services">
        <div className="alka-fon19-bg"></div>
        <div className="container">
          <div className="services-grid home-services-grid">
            <a href="#" className="service-card jewelry" aria-label={t('jewelry', currentLanguage)}>
              <div className="service-icon">
                <Image 
                  src="/yuvelirn.png" 
                  alt={t('jewelry', currentLanguage)}
                  onError={() => handleImageError('yuvelirn')}
                  style={{ display: imageError.yuvelirn ? 'none' : 'block' }}
                />
                {imageError.yuvelirn && (
                  <div className="image-fallback">
                    <span>{t('jewelry', currentLanguage)}</span>
                  </div>
                )}
              </div>
            </a>
            <a href="/lombard" className="service-card lombard" aria-label={t('lombard', currentLanguage)}>
              <div className="service-icon">
                <Image 
                  src="/lombard.png" 
                  alt={t('lombard', currentLanguage)}
                  onError={() => handleImageError('lombard')}
                  style={{ display: imageError.lombard ? 'none' : 'block' }}
                />
                {imageError.lombard && (
                  <div className="image-fallback">
                    <span>{t('lombard', currentLanguage)}</span>
                  </div>
                )}
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Company News Section */}
      <section className="company-news">
        <div className="container">
          <div className="news-header">
            <div className="news-icon">
              <Image src="/novosti.png" alt={t('companyNews', currentLanguage)} />
            </div>
            <h2>{t('companyNews', currentLanguage)}</h2>
          </div>
          
          <div className="news-grid">
            {companyNews.length > 0 ? (
              companyNews.map(newsItem => (
                <div key={newsItem.id} className="news-card">
                  <h3>{newsItem.title}</h3>
                  {newsItem.hyperlink && (
                    <div className="news-hyperlink preview-only">
                      <span dangerouslySetInnerHTML={{ 
                        __html: newsItem.hyperlink.replace(/<a\b[^>]*>/gi, '<span>').replace(/<\/a>/gi, '</span>')
                      }} />
                    </div>
                  )}
                  <a href={newsItem.link} className="news-link">
                    {t('readMore', currentLanguage)} ►
                  </a>
                </div>
              ))
            ) : (
              // Fallback новости если нет сохраненных
              <>
                                              <div className="news-card">
                  <h3>ДАМУ ЛИЗИНГ</h3>
                  <div className="news-hyperlink preview-only">
                    <span>Перейти на сайт Даму Лизинг</span>
                  </div>
                  <a href="/services/damu-leasing" className="news-link">
                    {t('readMore', currentLanguage)} ►
                  </a>
                </div>
                
                <div className="news-card">
                  <h3>НУРЛЫ ЖЕР</h3>
                  <div className="news-hyperlink preview-only">
                    <span>Перейти на сайт Нурлы Жер</span>
                  </div>
                  <a href="/services/nurly-zher" className="news-link">
                    {t('readMore', currentLanguage)} ►
                  </a>
                </div>
                
                <div className="news-card">
                  <h3>ДАМУ</h3>
                  <div className="news-hyperlink preview-only">
                    <span>Перейти на сайт Даму</span>
                  </div>
                  <a href="/services/damu" className="news-link">
                    {t('readMore', currentLanguage)} ►
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
