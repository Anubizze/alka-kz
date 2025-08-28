import React, { useState } from 'react'
import './AdminLogin.css'

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Простая проверка логина и пароля
    if (credentials.username === 'admin' && credentials.password === 'alka2024') {
      localStorage.setItem('adminAuthenticated', 'true')
      onLogin(true)
      setError('')
    } else {
      setError('Неверный логин или пароль')
    }
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <h1>Админ Панель</h1>
          <p>Войдите для управления новостями</p>
        </div>
        
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Введите логин"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Введите пароль"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Войти
          </button>
        </form>
        
        <div className="admin-login-footer">
          <p>Ломбард АЛҚА - Система управления контентом</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin


