import React, { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import HomeAdminManager from './HomeAdminManager'
import './HomeAdminPanel.css'

const HomeAdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const authStatus = localStorage.getItem('homeAdminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (status) => {
    setIsAuthenticated(status)
    if (status) {
      localStorage.setItem('homeAdminAuthenticated', 'true')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('homeAdminAuthenticated')
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="home-admin-panel">
      <div className="admin-panel-header">
        <h1>Админ-панель главной страницы</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Выйти
        </button>
      </div>
      <HomeAdminManager />
    </div>
  )
}

export default HomeAdminPanel




