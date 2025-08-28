import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import LanguageSwitcher from './LanguageSwitcher'
import Loader from './Loader'
import './LombardNavigation.css'

const LombardNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const location = useLocation()
  const { currentLanguage } = useLanguage()

  useEffect(() => {
    // Имитация загрузки изображений
    const timer = setTimeout(() => {
      setImagesLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Блокируем скролл при открытом мобильном меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('menu-open')
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('menu-open')
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsDropdownOpen(false)
    document.body.style.overflow = 'unset'
  }

  const isActive = (path) => {
    if (path === '/lombard') {
      return location.pathname === '/lombard'
    }
    return location.pathname.startsWith(path)
  }

  if (!imagesLoaded) {
    return (
      <header className="lombard-navigation">
        <div className="lombard-navigation-loader">
          <Loader size="medium" />
        </div>
      </header>
    )
  }

  return (
    <header className="lombard-navigation">
      {/* Header Bar - Верхняя полоса с логотипом и контактами */}
      <div className="lombard-header-bar">
        <div className="container">
          <div className="lombard-branding">
            <div className="lombard-brand-logo">
              <Link to="/lombard">
                <img src="/LogoLomabrd.png" alt="Ломбард АЛКА" />
              </Link>
            </div>
          </div>
          
          <div className="lombard-contact-info">
            <img src="/ContactsLombard.png" alt={t('contactInfo', currentLanguage)} className="lombard-contact-image" />
          </div>
        </div>
      </div>

      {/* Navigation Bar - Новая навигация для ломбарда */}
      <nav className="lombard-nav">
        <div className="container">
          <ul className="lombard-nav-list">
            <li className={`lombard-nav-item ${isActive('/lombard') ? 'active' : ''}`}>
              <Link to="/lombard">{t('main', currentLanguage)}</Link>
            </li>
            <li className={`lombard-nav-item ${isActive('/lombard/company') ? 'active' : ''}`}>
              <Link to="/lombard/company">{t('company', currentLanguage)}</Link>
            </li>
            <li className={`lombard-nav-item ${isActive('/lombard/services') ? 'active' : ''}`}>
              <Link to="/lombard/services">{t('services', currentLanguage)}</Link>
            </li>
            <li className={`lombard-nav-item ${isActive('/lombard/news') ? 'active' : ''}`}>
              <Link to="/lombard/news">{t('news', currentLanguage)}</Link>
            </li>
            <li className={`lombard-nav-item ${isActive('/lombard/contacts') ? 'active' : ''}`}>
              <Link to="/lombard/contacts">{t('contacts', currentLanguage)}</Link>
            </li>
          </ul>
          
          <div className="lombard-language-switcher">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Mobile Header для ломбарда */}
      <div className="lombard-mobile-header-bar">
        <div className="container">
          <div className="lombard-mobile-branding">
            <Link to="/lombard" onClick={closeMenu}>
              <img src="/logo-alka-mob.png" alt={t('lombardAlka', currentLanguage)} />
            </Link>
          </div>
          <button 
            className={`lombard-mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="lombard-hamburger-line"></span>
            <span className="lombard-hamburger-line"></span>
            <span className="lombard-hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay для ломбарда */}
      <div className={`lombard-mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>

      {/* Mobile Menu для ломбарда */}
      <div className={`lombard-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="lombard-mobile-menu-header">
          <div className="lombard-mobile-menu-logo">
            <img src="/logo-alka-mob.png" alt="Ломбард АЛКА" />
          </div>
          <button className="lombard-mobile-menu-close" onClick={closeMenu}>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div className="lombard-mobile-menu-content">
          <nav className="lombard-mobile-nav">
            <ul className="lombard-mobile-nav-list">
              <li className={isActive('/lombard') ? 'active' : ''}>
                <Link to="/lombard" onClick={closeMenu}>
                  <span className="lombard-nav-icon">🏠</span>
                  {t('main', currentLanguage)}
                </Link>
              </li>
              <li className={isActive('/lombard/company') ? 'active' : ''}>
                <Link to="/lombard/company" onClick={closeMenu}>
                  <span className="lombard-nav-icon">🏢</span>
                  {t('company', currentLanguage)}
                </Link>
              </li>
              <li className={isActive('/lombard/services') ? 'active' : ''}>
                <Link to="/lombard/services" onClick={closeMenu}>
                  <span className="lombard-nav-icon">💎</span>
                  {t('services', currentLanguage)}
                </Link>
              </li>
              <li className={isActive('/lombard/news') ? 'active' : ''}>
                <Link to="/lombard/news" onClick={closeMenu}>
                  <span className="lombard-nav-icon">📰</span>
                  {t('news', currentLanguage)}
                </Link>
              </li>
              <li className={isActive('/lombard/contacts') ? 'active' : ''}>
                <Link to="/lombard/contacts" onClick={closeMenu}>
                  <span className="lombard-nav-icon">📞</span>
                  {t('contacts', currentLanguage)}
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="lombard-mobile-menu-footer">
            <div className="lombard-mobile-language-switcher">
              <LanguageSwitcher />
            </div>
            <div className="lombard-mobile-contact-info">
              <p>📞 +7 (701) 081-36-76</p>
              <p>🕒 {t('workingHours', currentLanguage)}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default LombardNavigation
