import React from 'react'
import Image from './Image'
import './Loader.css'

const Loader = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`loader-container ${className}`}>
      <Image 
        src="/ajax-loader.gif" 
        alt="Загрузка..." 
        className={`loader ${size}`}
      />
    </div>
  )
}

export default Loader
