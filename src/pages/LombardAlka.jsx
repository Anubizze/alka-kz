import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from '../components/Loader'
import Image from '../components/Image'
import './LombardAlka.css'
import ContactForm from '../components/ContactForm'

const LombardAlka = () => {
  const { currentLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Имитация загрузки контента страницы
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Автоматическое переключение слайдов каждые 5 секунд
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5)
  }

  const slides = [
    {
      left: {
        src: "/dengi.png",
        alt: "Реальные деньги полезнее, чем содержимое вашей шкатулки",
        className: "money-banner"
      },
      right: {
        src: "/den.png",
        alt: "Деньги",
        className: "den-banner"
      }
    },
    {
      left: {
        src: "/gold_check-350x226.png",
        alt: "Сундук с сокровищами",
        className: "treasure-chest"
      },
      right: {
        src: "/zol.png",
        alt: "Выгодные кредиты под залог золотых изделий",
        className: "gold-banner"
      }
    },
    {
      left: {
        src: "/tehnika.png",
        alt: "Выгодные кредиты под залог техники",
        className: "tech-banner"
      },
      right: {
        src: "/tehnik.png",
        alt: "Техника",
        className: "tech-icon"
      }
    },
    {
      left: {
        src: "/den.png",
        alt: "Деньги",
        className: "den-banner"
      },
      right: {
        src: "/dengi.png",
        alt: "Реальные деньги полезнее, чем содержимое вашей шкатулки",
        className: "money-banner"
      }
    },
    {
      left: {
        src: "/gold_check-350x226.png",
        alt: "Сундук с сокровищами",
        className: "treasure-chest"
      },
      right: {
        src: "/zol.png",
        alt: "Выгодные кредиты под залог золотых изделий",
        className: "gold-banner"
      }
    }
  ]

  const currentSlideData = slides[currentSlide]

  if (isLoading) {
    return (
      <div className="page-loader">
        <Loader size="large" className="center" />
      </div>
    )
  }

  return (
    <div className="lombard-alka">
      {/* Hero Section с фоном fon.png */}
      <section className="lombard-hero">
        <div className="hero-background">
          <Image src="/fon.png" alt="Фон" className="background-image" />
        </div>
        
        {/* Главный контент - только фотографии */}
        <div className="hero-main-content">
          <div className={currentSlideData.left.className}>
            <Image src={currentSlideData.left.src} alt={currentSlideData.left.alt} />
          </div>
          <div className={currentSlideData.right.className}>
            <Image src={currentSlideData.right.src} alt={currentSlideData.right.alt} />
          </div>
        </div>

        {/* Навигационные стрелки */}
        <button className="slider-arrow slider-arrow-left" onClick={prevSlide}>
          <span>‹</span>
        </button>
        <button className="slider-arrow slider-arrow-right" onClick={nextSlide}>
          <span>›</span>
        </button>
      </section>
      
      {/* Серый фон под hero секцией с карточками услуг */}
      <div 
        className="hero-background-overlay" 
        data-bg-override="full" 
        style={{
          background: 'rgb(241, 241, 241)'
        }}
      >
        {/* Секция с услугами */}
        <section className="services-section">
          <div className="container">
            <div className="services-grid lombard-services-grid">
              {/* Левая карточка - Ювелирные изделия */}
              <div className="service-card jewelry-card">
                <div className="service-icon">
                  <Image src="/zoloto-1.png" alt="Золотые слитки" />
                </div>
                <div className="service-content">
                  <a href="/lombard/services" className="service-link">Залог ювелирных изделий</a>
                  <p>Золотые и серебряные изделия</p>
                </div>
              </div>
              
              {/* Правая карточка - Техника */}
              <div className="service-card tech-card">
                <div className="service-icon">
                  <Image src="/sotki-1.png" alt="Техника" />
                </div>
                <div className="service-content">
                  <a href="/lombard/services" className="service-link">Залог техники</a>
                  <p>Ноутбуки, телефоны, телевизоры</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Новый блок с двумя колонками */}
      <section className="money-block">
        <div className="container">
          <div className="money-block-content">
            {/* Левая колонка - картинка и текст */}
            <div className="money-block-left">
              <h2 className="money-block-title">{t('urgentlyNeedMoney', currentLanguage)}</h2>
              <div className="money-block-content-row">
                <div className="money-block-image">
                  <Image src="/odobreno.png" alt="Одобрено" />
                </div>
                <div className="money-block-offer">
                  <span className="offer-text">{t('weGiveUpTo', currentLanguage)}</span>
                  <span className="offer-percentage">100%</span>
                  <span className="offer-details">{t('ofItemPrice', currentLanguage)}</span>
                </div>
              </div>
            </div>
            
            {/* Правая колонка - заголовок и текст */}
            <div className="money-block-right">
              <h2 className="money-block-title">{t('moneyIn15Minutes', currentLanguage)}</h2>
              <div className="money-block-text">
                <p>{t('longTermActivity', currentLanguage)}</p>
                <p>{t('missionStatement', currentLanguage)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Новый серый блок с преимуществами */}
      <section className="features-block">
        <div className="container">
          <div className="features-grid">
            {/* Карточка 1 - Гарантия сохранности */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="/ik1.png" alt="Гарантия сохранности" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{t('guaranteeTitle', currentLanguage)}</h3>
                <p className="feature-text">{t('guaranteeText', currentLanguage)}</p>
              </div>
            </div>
            
            {/* Карточка 2 - Максимальная оценка */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="/ik2.png" alt="Максимальная оценка" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{t('maxValuationTitle', currentLanguage)}</h3>
                <p className="feature-text">{t('maxValuationText', currentLanguage)}</p>
              </div>
            </div>
            
            {/* Карточка 3 - Профессиональное обслуживание */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="/ik3.png" alt="Профессиональное обслуживание" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{t('professionalServiceTitle', currentLanguage)}</h3>
                <p className="feature-text">{t('professionalServiceText', currentLanguage)}</p>
              </div>
            </div>
            
            {/* Карточка 4 - Честные ставки */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="/ik4.png" alt="Честные ставки" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{t('fairRatesTitle', currentLanguage)}</h3>
                <p className="feature-text">{t('fairRatesText', currentLanguage)}</p>
              </div>
            </div>
            
            {/* Карточка 5 - Быстрое получение (повтор ik1.png) */}
            <div className="feature-card">
              <div className="feature-icon">
                <Image src="/ik1.png" alt="Быстрое получение" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{t('quickGoldTitle', currentLanguage)}</h3>
                <p className="feature-text">{t('quickGoldText', currentLanguage)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Блок "Отправьте заявку" */}
      <section className="contact-form-block">
        <div className="container">
          <div className="contact-form-content">
            <div className="contact-form-wrapper">
              <div className="contact-form-container lombard-alka-contact-form compact">
                <ContactForm 
                  title="Отправьте заявку"
                  description="Вам нужна консультация? Оставьте Ваши данные и мы свяжемся с Вами в ближайшее время!"
                  className="lombard-alka-contact-form compact"
                  showSuccessMessage={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок с картой */}
      <section className="map-section">
        <div className="container">
          <div className="map-content">
            <h2 className="map-title">
              {currentLanguage === 'RU' ? 'Офисы и Филиалы' : 'Кеңселер мен филиалдар'}
            </h2>
            <div className="map-card">
              <div className="map-city-label">
                Семей
              </div>
              <div className="map-container">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae3294964b2d645a93e9cc0338de16d6a995cf25b3290afae94858f02bf15398e&source=constructor"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  title="Семей карта - ЛОМБАРД АЛҚА"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LombardAlka
