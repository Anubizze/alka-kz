import React, { useState, useEffect } from 'react'
import Loader from './Loader'
import './Logo.css'

const Logo = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Имитация загрузки логотипа
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="logo">
        <Loader size="small" className="button" />
      </div>
    )
  }

  return (
    <div className="logo">
      <span className="logo-text">АЛКА</span>
    </div>
  )
}

export default Logo
