import React from 'react'
import './Loader.css'

const Loader = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`loader-container ${className}`}>
      <img 
        src="/ajax-loader.gif" 
        alt="Загрузка..." 
        className={`loader ${size}`}
      />
    </div>
  )
}

export default Loader
