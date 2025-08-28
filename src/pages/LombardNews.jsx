import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Image from '../components/Image'
import './LombardNews.css'
import ContactForm from '../components/ContactForm'

const LombardNews = () => {
  const { currentLanguage } = useLanguage()
  const navigate = useNavigate()
  const [newsItems, setNewsItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNews, setSelectedNews] = useState(null)

  // Загружаем новости из localStorage админ панели
  useEffect(() => {
    console.log('Загружаем новости ломбарда...')
    const savedNews = localStorage.getItem('lombardNews')
    if (savedNews) {
      console.log('Найдены сохраненные новости:', savedNews)
      setNewsItems(JSON.parse(savedNews))
    } else {
      console.log('Загружаем дефолтные новости...')
      // Загружаем дефолтные новости если нет сохраненных
      const defaultNews = [
        {
          id: 1,
          title: 'Договор присоединения на предоставление микрокредита',
          image: '/dengi.jpg',
          alt: 'Стопка монет',
          description: 'Договор присоединения до 50 МРП • Договор присоединения свыше 50 МРП • Приложение (Скачать PDF) • Правила ломбарда ЛОМБАРД АЛКА • Уведомление Заемщику о невыполнение обязательств • Правила ЛОМБАРД АЛКА от 01.09.2021г',
          fullContent: 'Здесь будет полное содержание новости о договоре присоединения на предоставление микрокредита. Это важный документ, который регулирует отношения между ломбардом и клиентами при предоставлении микрокредитов.',
          pdfDocuments: [
            {
              name: 'Договор присоединения до 50 МРП',
              file: '/PDF/Dogovor-prisoedineniya-do-50-MRP-01.10.2021-.pdf'
            },
            {
              name: 'Договор присоединения свыше 50 МРП',
              file: '/PDF/Dogovor-prisoedineniya-svyshe-50-MRP-s-01.10.2021g.-.pdf'
            },
            {
              name: 'Приложение к ЗБ (новый)',
              file: '/PDF/Prilozheniya-k-ZB-novyj.pdf'
            },
            {
              name: 'Правила ломбарда ЛОМБАРД АЛКА',
              file: '/PDF/Pravila-lombarda-LOMBARD-ALKA.pdf'
            },
            {
              name: 'Уведомление Заемщику о невыполнение обязательств',
              file: '/PDF/Uvedomlenie-Zaemshhiku-o-nevypolnenie-obyazatelstv.pdf'
            },
            {
              name: 'Правила ЛОМБАРД АЛКА от 01.09.2021г',
              file: '/PDF/Pravila-LOMBARD-ALKA-ot-01.09.2021g.pdf'
            }
          ]
        },
        {
          id: 2,
          title: 'Финансовая отчетность',
          image: '/istockphoto-1487894858-612x612-1.jpg',
          alt: 'Финансовые документы',
          description: 'Отчет за 2024',
          fullContent: 'Финансовая отчетность за 2024 год. Подробная информация о финансовом состоянии компании, доходах, расходах и результатах деятельности за отчетный период.',
          pdfDocuments: [{ name: 'Отчет за 2024 год', file: '/PDF/otchet-za-2024.pdf' }]
        },
        {
          id: 3,
          title: 'Финансовая отчетность',
          image: '/photo.webp',
          alt: 'Финансовые документы',
          description: 'Отчет за 2023',
          fullContent: 'Финансовая отчетность за 2023 год. Анализ финансовых показателей, сравнение с предыдущими периодами и прогнозы на будущее.',
          pdfDocuments: [{ name: 'Отчет за 2023 год', file: '/PDF/Otchet-2023.pdf' }]
        },
        {
          id: 4,
          title: 'Финансовая отчетность',
          image: '/report.jpg',
          alt: 'Финансовые документы',
          description: 'Отчет за 2022',
          fullContent: 'Финансовая отчетность за 2022 год. Детальный анализ финансового состояния компании и результаты хозяйственной деятельности.',
          pdfDocuments: [{ name: 'Отчет за 2022 год', file: '/PDF/Otchet-za-2022g.pdf' }]
        },
        {
          id: 5,
          title: 'Финансовая отчетность',
          image: '/otchet.png',
          alt: 'Финансовые документы',
          description: 'Отчет за 2021',
          fullContent: 'Финансовая отчетность за 2021 год. Обзор финансовых результатов и анализ эффективности бизнес-процессов.',
          pdfDocuments: [{ name: 'Отчет за 2021 год', file: '/PDF/Otchet-za-2021g.pdf' }]
        },
        {
          id: 6,
          title: 'Приказ о мерах поддержки физических и юридических лиц',
          image: '/4.jpg',
          alt: 'Документ',
          description: 'Приказ о мерах поддержки физических и юридических лиц, пострадавших в результате введения чрезвычайного положения',
          fullContent: 'Приказ о мерах поддержки физических и юридических лиц, пострадавших в результате введения чрезвычайного положения. Документ содержит информацию о порядке предоставления отсрочки платежей по займам.',
          pdfDocuments: [{ name: 'Приказ о мерах поддержки', file: '/PDF/Poryadok-predostavleniya-otsrochki-platezhej-po-zajmam-fizicheskih-i-yuridicheskih-lits-postradavshih-v-rezultate-vvedeniya-chrezvychajnogo-polozheniya.pdf' }]
        }
      ]
      setNewsItems(defaultNews)
    }
    setIsLoading(false)
  }, [])

  const handleNewsClick = (news) => {
    setSelectedNews(news)
  }

  const handleBackToList = () => {
    setSelectedNews(null)
  }

  // Если выбрана конкретная новость, показываем её детально
  if (selectedNews) {
    return (
      <div className="lombard-news-page">
        {/* Заголовок и хлебные крошки */}
        <div className="lombard-news-header-section">
          <div className="lombard-news-header-container">
            <h1 className="lombard-news-page-title">{selectedNews.title}</h1>
            <div className="lombard-news-breadcrumbs">
              <span>{t('main', currentLanguage)}</span>
              <span className="separator">/</span>
              <span>Новости компании</span>
              <span className="separator">/</span>
              <span>{selectedNews.title}</span>
            </div>
          </div>
        </div>

        <div className="lombard-news-container">
          <div className="lombard-news-content">
            {/* Левая колонка - Детали новости */}
            <div className="lombard-news-section">
              <div className="lombard-news-detail">
                {/* Изображение новости */}
                <div className="lombard-news-detail-image">
                  {selectedNews.image ? (
                    <Image 
                      src={selectedNews.image} 
                      alt={selectedNews.alt} 
                      onError={(e) => {
                        e.target.src = '/dengi.jpg'
                      }}
                    />
                  ) : (
                    <Image 
                      src="/dengi.jpg" 
                      alt="Изображение по умолчанию" 
                    />
                  )}
                </div>

                {/* Описание новости */}
                <div className="lombard-news-detail-description">
                  <p>{selectedNews.description}</p>
                </div>

                {/* Полное содержание */}
                <div className="lombard-news-detail-content">
                  <p>{selectedNews.fullContent}</p>
                </div>

                {/* PDF документы */}
                {selectedNews.pdfDocuments && selectedNews.pdfDocuments.length > 0 && (
                  <div className="lombard-news-detail-pdf">
                    <h3>Документы для скачивания:</h3>
                    <div className="lombard-news-pdf-list">
                      {selectedNews.pdfDocuments.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lombard-news-pdf-item"
                        >
                          <span className="pdf-icon">📄</span>
                          <span className="pdf-name">{doc.name}</span>
                          <span className="pdf-download">Скачать</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Кнопка возврата */}
                <div className="lombard-news-detail-back">
                  <button 
                    onClick={handleBackToList}
                    className="lombard-news-back-btn"
                  >
                    ← Вернуться к новостям
                  </button>
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
  
  if (isLoading) {
    return (
      <div className="lombard-news-page">
        <div className="lombard-news-container">
          <div className="lombard-news-loading">
            <div className="loading-spinner"></div>
            <p>Загрузка новостей...</p>
          </div>
        </div>
      </div>
    )
  }

  // Если выбрана конкретная новость, показываем её детально
  if (selectedNews) {
    return (
      <div className="lombard-news-page">
        {/* Заголовок и хлебные крошки */}
        <div className="lombard-news-header-section">
          <div className="lombard-news-header-container">
            <h1 className="lombard-news-page-title">{selectedNews.title}</h1>
            <div className="lombard-news-breadcrumbs">
              <span>{t('main', currentLanguage)}</span>
              <span className="separator">/</span>
              <span>Новости компании</span>
              <span className="separator">/</span>
              <span>{selectedNews.title}</span>
            </div>
          </div>
        </div>

        <div className="lombard-news-container">
          <div className="lombard-news-content">
            {/* Левая колонка - Детали новости */}
            <div className="lombard-news-section">
              <div className="lombard-news-detail">
                {/* Изображение новости */}
                <div className="lombard-news-detail-image">
                  {selectedNews.image ? (
                    <Image 
                      src={selectedNews.image} 
                      alt={selectedNews.alt} 
                      onError={(e) => {
                        e.target.src = '/dengi.jpg'
                      }}
                    />
                  ) : (
                    <Image 
                      src="/dengi.jpg" 
                      alt="Изображение по умолчанию" 
                    />
                  )}
                </div>

                {/* Описание новости */}
                <div className="lombard-news-detail-description">
                  <p>{selectedNews.description}</p>
                </div>

                {/* Полное содержание */}
                <div className="lombard-news-detail-content">
                  <p>{selectedNews.fullContent}</p>
                </div>

                {/* PDF документы */}
                {selectedNews.pdfDocuments && selectedNews.pdfDocuments.length > 0 && (
                  <div className="lombard-news-detail-pdf">
                    <h3>Документы для скачивания:</h3>
                    <div className="lombard-news-pdf-list">
                      {selectedNews.pdfDocuments.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lombard-news-pdf-item"
                        >
                          <span className="pdf-icon">📄</span>
                          <span className="pdf-name">{doc.name}</span>
                          <span className="pdf-download">Скачать</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Кнопка возврата */}
                <div className="lombard-news-detail-back">
                  <button 
                    onClick={handleBackToList}
                    className="lombard-news-back-btn"
                  >
                    ← Вернуться к новостям
                  </button>
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

  // Основной список новостей
  return (
    <div className="lombard-news-page">
      {/* Заголовок и хлебные крошки */}
      <div className="lombard-news-header-section">
        <div className="lombard-news-header-container">
          <h1 className="lombard-news-page-title">Новости компании</h1>
          <div className="lombard-news-breadcrumbs">
            <span>{t('main', currentLanguage)}</span>
            <span className="separator">/</span>
            <span>Новости компании</span>
          </div>
        </div>
      </div>

      <div className="lombard-news-container">
        <div className="lombard-news-content">
          {/* Левая колонка - Новости */}
          <div className="lombard-news-section">
            {newsItems.length === 0 ? (
              <div className="lombard-news-empty">
                <p>Новости не найдены</p>
              </div>
            ) : (
              <div className="lombard-news-grid">
                {newsItems.map((news) => (
                  <div 
                    key={news.id} 
                    className="lombard-news-item"
                    onClick={() => handleNewsClick(news)}
                  >
                    <div className="lombard-news-image">
                      <Image 
                        src={news.image} 
                        alt={news.alt || news.title}
                        onError={(e) => {
                          e.target.src = '/dengi.jpg'
                        }}
                      />
                    </div>
                    <div className="lombard-news-text-content">
                      <h3 className="lombard-news-title">{news.title}</h3>
                      <p className="lombard-news-description">{news.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

export default LombardNews
