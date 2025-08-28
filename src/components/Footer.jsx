import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Loader from './Loader'
import './Footer.css'

const Footer = () => {
  const { currentLanguage } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Имитация загрузки футера
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <footer className="footer">
        <div className="footer-loader">
          <Loader size="medium" />
        </div>
      </footer>
    )
  }
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© 2024 {t('companyGroup', currentLanguage)} / {t('companyGroupKZ', currentLanguage)}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
