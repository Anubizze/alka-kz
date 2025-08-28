import React, { useState, useEffect } from 'react'
import AdminLogin from '../components/AdminLogin'
import AdminNewsManager from '../components/AdminNewsManager'
import './AdminPanel.css'

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const authStatus = localStorage.getItem('adminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (status) => {
    setIsAuthenticated(status)
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminNewsManager />
}

export default AdminPanel


