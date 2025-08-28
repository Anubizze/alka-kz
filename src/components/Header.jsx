import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import Loader from './Loader'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const { currentLanguage } = useLanguage()
  const location = useLocation()

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
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
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
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  if (!imagesLoaded) {
    return (
      <header className="header">
        <div className="header-loader">
          <Loader size="medium" />
        </div>
      </header>
    )
  }

  return (
    <header className="header">
      {/* Header Bar - Верхняя полоса как на alkha.kz */}
      <div className="header-bar">
        <div className="container">
          <div className="branding">
            <div className="brand-logo">
              <Link to="/">
                <img src="/LogoLomabrd.png" alt="АЛКА" />
              </Link>
            </div>
          </div>
          
          <div className="contact-info">
            <img src="/ContactsLombard.png" alt={t('contactInfo', currentLanguage)} className="contact-image" />
          </div>
        </div>
      </div>

      {/* Navigation Bar - как на alkha.kz */}
      <nav className="navigation">
        <div className="container">
          <ul className="nav-list">
            <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              <Link to="/">{t('main', currentLanguage)}</Link>
            </li>
            <li className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
              <Link to="/about">{t('about', currentLanguage)}</Link>
            </li>
            <li className={`nav-item dropdown ${isActive('/organizations') ? 'active' : ''}`}>
              <span>{t('organizations', currentLanguage)}</span>
              <ul className="dropdown-menu">
                <li><Link to="/organizations/jewelry">{t('jewelry', currentLanguage)}</Link></li>
                <li><Link to="/lombard">{t('lombard', currentLanguage)}</Link></li>
              </ul>
            </li>
            <li className={`nav-item ${isActive('/contacts') ? 'active' : ''}`}>
              <Link to="/contacts">{t('contacts', currentLanguage)}</Link>
            </li>
          </ul>
          
          <div className="language-switcher">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="mobile-header-bar">
        <div className="container">
          <div className="mobile-branding">
            <Link to="/" onClick={closeMenu}>
              <img src="/logo-alka-mob.png" alt={t('alkha', currentLanguage)} />
            </Link>
          </div>
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">
            <img src="/logo-alka-mob.png" alt="АЛКА" />
          </div>
          <button className="mobile-menu-close" onClick={closeMenu}>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div className="mobile-menu-content">
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              <li className={isActive('/') ? 'active' : ''}>
                <Link to="/" onClick={closeMenu}>
                  <span className="nav-icon">🏠</span>
                  {t('main', currentLanguage)}
                </Link>
              </li>
              <li className={isActive('/about') ? 'active' : ''}>
                <Link to="/about" onClick={closeMenu}>
                  <span className="nav-icon">ℹ️</span>
                  {t('about', currentLanguage)}
                </Link>
              </li>
              <li className={`mobile-dropdown ${isDropdownOpen ? 'active' : ''}`}>
                <div className="mobile-dropdown-header" onClick={toggleDropdown}>
                  <span className="nav-icon">🏢</span>
                  <span>{t('organizations', currentLanguage)}</span>
                  <span className="mobile-dropdown-arrow">▼</span>
                </div>
                <ul className="mobile-dropdown-menu">
                  <li>
                    <Link to="/organizations/jewelry" onClick={closeMenu}>
                      <span className="nav-icon">💎</span>
                      {t('jewelry', currentLanguage)}
                    </Link>
                  </li>
                  <li>
                    <Link to="/lombard" onClick={closeMenu}>
                      <span className="nav-icon">🏦</span>
                      {t('lombard', currentLanguage)}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={isActive('/contacts') ? 'active' : ''}>
                <Link to="/contacts" onClick={closeMenu}>
                  <span className="nav-icon">📞</span>
                  {t('contacts', currentLanguage)}
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="mobile-menu-footer">
            <div className="mobile-language-switcher">
              <LanguageSwitcher />
            </div>
            <div className="mobile-contact-info">
              <p>📞 +7 (701) 081-36-76</p>
              <p>🕒 {t('workingHours', currentLanguage)}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
