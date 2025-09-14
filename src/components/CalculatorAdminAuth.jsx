import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CalculatorAdminAuth.css'

const CalculatorAdminAuth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Данные для входа (в реальном приложении это должно быть на сервере)
  const adminCredentials = {
    username: 'admin',
    password: 'alka2024'
  }

  // Счетчик неудачных попыток
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTime, setBlockTime] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Проверяем, не заблокирован ли пользователь
    if (isBlocked) {
      const remainingTime = Math.ceil((blockTime - Date.now()) / 1000)
      setError(`Аккаунт заблокирован на ${remainingTime} секунд`)
      return
    }

    setIsLoading(true)
    setError('')

    // Имитация задержки для реалистичности
    setTimeout(() => {
      if (username === adminCredentials.username && password === adminCredentials.password) {
        // Сбрасываем счетчик неудачных попыток при успешном входе
        setFailedAttempts(0)
        // Сохраняем статус авторизации в localStorage с временной меткой
        localStorage.setItem('calculatorAdminAuth', JSON.stringify({
          authenticated: true,
          timestamp: Date.now()
        }))
        navigate('/calculator/admin')
      } else {
        const newFailedAttempts = failedAttempts + 1
        setFailedAttempts(newFailedAttempts)
        
        if (newFailedAttempts >= 3) {
          // Блокируем на 5 минут после 3 неудачных попыток
          setIsBlocked(true)
          setBlockTime(Date.now() + 5 * 60 * 1000) // 5 минут
          setError('Слишком много неудачных попыток. Аккаунт заблокирован на 5 минут.')
          
          // Автоматически разблокируем через 5 минут
          setTimeout(() => {
            setIsBlocked(false)
            setFailedAttempts(0)
            setBlockTime(0)
          }, 5 * 60 * 1000)
        } else {
          setError(`Неверный логин или пароль. Осталось попыток: ${3 - newFailedAttempts}`)
        }
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="calculator-admin-auth">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon">⚙️</div>
            <h1>Админ-панель калькулятора</h1>
          </div>
          <p>Войдите в систему для управления ценами золота</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isBlocked && (
            <>
              <div className="form-group">
                <label htmlFor="username">Логин:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите логин"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {isBlocked && (
            <div className="blocked-message">
              <div className="blocked-icon">🚫</div>
              <h3>Доступ заблокирован</h3>
              <p>Слишком много неудачных попыток входа</p>
              <p>Попробуйте снова через несколько минут</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <span>❌ {error}</span>
            </div>
          )}

          {!isBlocked && (
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </button>
          )}
        </form>

        <div className="auth-info">
          <h3>Информация о безопасности:</h3>
          <div className="info-item">
            <span>🔒 Доступ только для авторизованных администраторов</span>
          </div>
          <div className="info-item">
            <span>🛡️ Все действия логируются и отслеживаются</span>
          </div>
          <div className="info-item">
            <span>⚠️ Не передавайте данные для входа третьим лицам</span>
          </div>
        </div>

        <div className="auth-footer">
          <p>🔒 Доступ только для администраторов</p>
        </div>
      </div>
    </div>
  )
}

export default CalculatorAdminAuth
