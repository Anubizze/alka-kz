import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import Image from '../components/Image'
import './NewsDetail.css'

const NewsDetail = () => {
  const { id } = useParams()
  const { currentLanguage } = useLanguage()
  const [news, setNews] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // Загружаем новости из localStorage (сначала пробуем ломбард, потом общие)
    const savedLombardNews = localStorage.getItem('lombardNews')
    const savedHomeNews = localStorage.getItem('homeNews')
    
    let allNews = []
    if (savedLombardNews) {
      allNews = JSON.parse(savedLombardNews)
    } else if (savedHomeNews) {
      allNews = JSON.parse(savedHomeNews)
    }
    
    if (allNews.length > 0) {
      const foundNews = allNews.find(item => item.id === parseInt(id))
      
      if (foundNews) {
        setNews(foundNews)
      } else {
        setNotFound(true)
      }
    } else {
      setNotFound(true)
    }
    
    setIsLoading(false)
  }, [id])

  if (isLoading) {
    return (
      <div className="page-loader">
        <Loader size="large" className="center" />
      </div>
    )
  }

  if (notFound || !news) {
    return (
      <div className="news-not-found">
        <div className="container">
          <h1>Новость не найдена</h1>
          <p>Запрашиваемая новость не существует или была удалена.</p>
          <Link to="/" className="back-home-btn">
            Вернуться на главную
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="news-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/lombard">Главная</Link>
          <span className="separator">/</span>
          <Link to="/lombard/news">Новости компании</Link>
          <span className="separator">/</span>
          <span className="current">{news.title}</span>
        </nav>

        {/* News Header */}
        <header className="news-header">
          <h1>{news.title}</h1>
          {news.date && (
            <time className="news-date">
              {new Date(news.date).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
        </header>

        {/* News Image */}
        <div className="news-image-container">
          <Image 
            src={news.image || '/dengi.jpg'} 
            alt={news.alt || news.title}
            className="news-image"
            onError={(e) => {
              e.target.src = '/dengi.jpg' // fallback изображение
            }}
          />
        </div>

        {/* News Content */}
        <div className="news-content">
          <div className="news-description">
            <p className="lead">{news.description}</p>
          </div>
          
          <div className="news-full-content">
            <p>{news.fullContent}</p>
          </div>
        </div>

        {/* PDF Documents */}
        {news.pdfDocuments && news.pdfDocuments.length > 0 && (
          <section className="pdf-documents-section">
            <h2>Документы для скачивания</h2>
            <div className="pdf-grid">
              {news.pdfDocuments.map((doc, index) => (
                <a 
                  key={index} 
                  href={doc.file} 
                  download={doc.name}
                  className="pdf-card"
                >
                  <div className="pdf-icon">📄</div>
                  <div className="pdf-info">
                    <h3>{doc.name}</h3>
                    <span className="pdf-type">PDF документ</span>
                  </div>
                  <div className="download-icon">⬇️</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Website Links */}
        {news.websiteLinks && news.websiteLinks.length > 0 && (
          <section className="website-links-section">
            <h2>Полезные ссылки</h2>
            <div className="links-grid">
              {news.websiteLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="link-icon">🔗</div>
                  <div className="link-info">
                    <h3>{link.name}</h3>
                    <span className="link-url">{link.url}</span>
                  </div>
                  <div className="external-icon">↗️</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Back to Home */}
        <div className="back-to-home">
          <Link to="/lombard/news" className="back-home-btn">
            ← Вернуться к новостям
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsDetail
