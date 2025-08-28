import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  // Получаем язык из localStorage или используем русский по умолчанию
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('alka-language')
    return savedLanguage || 'RU'
  })

  // Сохраняем язык в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('alka-language', currentLanguage)
  }, [currentLanguage])

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'RU' ? 'KZ' : 'RU')
  }

  const setLanguage = (language) => {
    if (language === 'RU' || language === 'KZ') {
      setCurrentLanguage(language)
    }
  }

  const value = {
    currentLanguage,
    toggleLanguage,
    setLanguage,
    isRussian: currentLanguage === 'RU',
    isKazakh: currentLanguage === 'KZ'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
