import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import ContactForm from '../components/ContactForm'
import Loader from '../components/Loader'
import './ServicePage.css'

const ServicePage = () => {
  const { serviceName } = useParams()
  const { currentLanguage } = useLanguage()
  const [serviceInfo, setServiceInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Функция для извлечения ссылки из HTML-гиперссылки
  const extractLinkFromHtml = (htmlString) => {
    if (!htmlString) return null
    const match = htmlString.match(/href="([^"]+)"/)
    return match ? match[1] : null
  }

  useEffect(() => {
    // Имитация загрузки контента страницы
    const timer = setTimeout(() => {
      // Загружаем информацию о сервисе из localStorage
      const savedNews = localStorage.getItem('homeCompanyNews')
      if (savedNews) {
        const news = JSON.parse(savedNews)
        // Ищем сервис по ссылке
        const foundService = news.find(item => 
          item.link === `/services/${serviceName}`
        )
        if (foundService) {
          setServiceInfo(foundService)
        }
      }
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [serviceName])

  if (isLoading) {
    return (
      <div className="service-page">
        <div className="page-loader">
          <Loader size="large" className="center" />
        </div>
      </div>
    )
  }

  if (!serviceInfo) {
    return (
      <div className="service-page">
        <div className="container">
          <div className="service-not-found">
            <h1>Сервис не найден</h1>
            <p>К сожалению, информация о сервисе "{serviceName}" не найдена.</p>
            <a href="/" className="back-home">Вернуться на главную</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="service-page">
      
      {/* Заголовок и хлебные крошки */}
      <div className="header-section">
        <div className="header-container">
          <h1 className="page-title">{serviceInfo.title}</h1>
          <div className="breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>{serviceInfo.title}</span>
          </div>
        </div>
      </div>

             <div className="service-container">
         <div className="service-content">
                       {/* Левая колонка - Баннер сервиса */}
            <div className="service-banner-section">
              {/* Гиперссылка */}
              {serviceInfo.hyperlink && (
                <div className="service-website-links">
                  <div 
                    className="service-link"
                    dangerouslySetInnerHTML={{ __html: serviceInfo.hyperlink }}
                  />
                </div>
              )}
              
              <div className="service-banner">
                {serviceInfo.image && (
                  <div className="banner-image">
                    {serviceInfo.hyperlink ? (
                      <a 
                        href={extractLinkFromHtml(serviceInfo.hyperlink)} 
                        className="image-link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <img 
                          src={serviceInfo.image} 
                          alt={serviceInfo.alt || serviceInfo.title}
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </a>
                    ) : (
                      <img 
                        src={serviceInfo.image} 
                        alt={serviceInfo.alt || serviceInfo.title}
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

           {/* Правая колонка - Контактная форма */}
           <div className="service-contact-form-section">
             <ContactForm 
               title={t('writeToUs', currentLanguage)}
               description={t('formDescription', currentLanguage)}
               className="service-contact-form"
             />
           </div>
         </div>
       </div>
    </div>
  )
}

export default ServicePage
