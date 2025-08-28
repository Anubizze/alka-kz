import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Loader from './Loader'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useLanguage()
  const [flagLoaded, setFlagLoaded] = useState(false)

  useEffect(() => {
    // Имитация загрузки изображения флага
    const timer = setTimeout(() => {
      setFlagLoaded(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [currentLanguage])

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'RU' ? 'KZ' : 'RU'
    setLanguage(newLanguage)
  }

  if (!flagLoaded) {
    return (
      <button className="language-switcher-btn" disabled>
        <Loader size="small" className="button" />
      </button>
    )
  }

  return (
    <button 
      className="language-switcher-btn" 
      onClick={handleLanguageChange}
      title={currentLanguage === 'RU' ? 'Қазақ тіліне ауысу' : 'Переключиться на русский'}
    >
      <img 
        src={currentLanguage === 'RU' ? '/ru.png' : '/kz.png'} 
        alt={currentLanguage === 'RU' ? 'Русский' : 'Қазақша'}
        className="flag-icon"
      />
    </button>
  )
}

export default LanguageSwitcher
