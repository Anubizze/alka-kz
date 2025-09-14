import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CalculatorAdminManager.css'

const CalculatorAdminManager = () => {
  const navigate = useNavigate()
  const [goldPrices, setGoldPrices] = useState({})
  const [editingPurity, setEditingPurity] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPurity, setNewPurity] = useState('')
  const [newPrice, setNewPrice] = useState('')

  // Проверяем авторизацию и загружаем цены из localStorage при инициализации
  useEffect(() => {
    // Проверяем авторизацию с временной меткой
    const authData = localStorage.getItem('calculatorAdminAuth')
    if (!authData) {
      navigate('/calculator/admin/auth')
      return
    }

    try {
      const auth = JSON.parse(authData)
      const now = Date.now()
      const sessionTimeout = 2 * 60 * 60 * 1000 // 2 часа

      // Проверяем, не истекла ли сессия
      if (!auth.authenticated || (now - auth.timestamp) > sessionTimeout) {
        localStorage.removeItem('calculatorAdminAuth')
        navigate('/calculator/admin/auth')
        return
      }
    } catch (error) {
      // Если данные повреждены, перенаправляем на авторизацию
      localStorage.removeItem('calculatorAdminAuth')
      navigate('/calculator/admin/auth')
      return
    }

    const savedPrices = localStorage.getItem('goldPrices')
    if (savedPrices) {
      setGoldPrices(JSON.parse(savedPrices))
    } else {
      // Загружаем дефолтные цены
      const defaultPrices = {
        585: 32429,
        750: 41576,
        916: 50778,
        999: 64459
      }
      setGoldPrices(defaultPrices)
      localStorage.setItem('goldPrices', JSON.stringify(defaultPrices))
    }
  }, [navigate])

  const handlePriceChange = (purity, newPrice) => {
    const updatedPrices = {
      ...goldPrices,
      [purity]: parseInt(newPrice) || 0
    }
    setGoldPrices(updatedPrices)
    localStorage.setItem('goldPrices', JSON.stringify(updatedPrices))
    // Уведомляем калькулятор об обновлении данных
    window.dispatchEvent(new CustomEvent('goldPricesUpdated'))
  }

  const handleEdit = (purity) => {
    setEditingPurity(purity)
  }

  const handleSaveEdit = () => {
    setEditingPurity(null)
  }

  const handleCancelEdit = () => {
    setEditingPurity(null)
  }

  const handleDelete = (purity) => {
    if (window.confirm(`Вы уверены, что хотите удалить пробу ${purity}?`)) {
      const updatedPrices = { ...goldPrices }
      delete updatedPrices[purity]
      setGoldPrices(updatedPrices)
      localStorage.setItem('goldPrices', JSON.stringify(updatedPrices))
      // Уведомляем калькулятор об обновлении данных
      window.dispatchEvent(new CustomEvent('goldPricesUpdated'))
    }
  }

  const handleAddPurity = () => {
    if (newPurity && newPrice && !goldPrices[newPurity]) {
      const updatedPrices = {
        ...goldPrices,
        [newPurity]: parseInt(newPrice)
      }
      setGoldPrices(updatedPrices)
      localStorage.setItem('goldPrices', JSON.stringify(updatedPrices))
      // Уведомляем калькулятор об обновлении данных
      window.dispatchEvent(new CustomEvent('goldPricesUpdated'))
      setNewPurity('')
      setNewPrice('')
      setShowAddForm(false)
    }
  }

  const handleCancelAdd = () => {
    setNewPurity('')
    setNewPrice('')
    setShowAddForm(false)
  }

  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти из админ-панели?')) {
      localStorage.removeItem('calculatorAdminAuth')
      navigate('/calculator/admin/auth')
    }
  }

  return (
    <div className="calculator-admin-manager">
      <div className="admin-header">
        <h1>Управление калькулятором золота</h1>
        <div className="header-actions">
          <button 
            className="add-purity-btn"
            onClick={() => setShowAddForm(true)}
          >
            Добавить пробу
          </button>
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="add-purity-form">
          <h2>Добавить новую пробу золота</h2>
          <div className="form-group">
            <label>Проба золота:</label>
            <input
              type="number"
              value={newPurity}
              onChange={(e) => setNewPurity(e.target.value)}
              placeholder="Например: 375"
              min="1"
              max="999"
            />
          </div>
          <div className="form-group">
            <label>Цена за грамм (₸):</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Например: 25000"
              min="0"
            />
          </div>
          <div className="form-actions">
            <button 
              className="save-btn"
              onClick={handleAddPurity}
              disabled={!newPurity || !newPrice || goldPrices[newPurity]}
            >
              Добавить пробу
            </button>
            <button 
              className="cancel-btn"
              onClick={handleCancelAdd}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="purities-list">
        <h2>Управление пробами золота</h2>
        <div className="purities-grid">
          {Object.entries(goldPrices)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([purity, price]) => (
            <div key={purity} className="purity-card">
              <div className="purity-header">
                <h3>Проба {purity}</h3>
                <div className="purity-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(purity)}
                  >
                    Редактировать
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(purity)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
              
              {editingPurity === purity ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Цена за грамм (₸):</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => handlePriceChange(purity, e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="form-actions">
                    <button 
                      className="save-btn"
                      onClick={handleSaveEdit}
                    >
                      Сохранить
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={handleCancelEdit}
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <div className="purity-info">
                  <div className="price-display">
                    <span className="price-value">{price.toLocaleString()}</span>
                    <span className="price-currency">₸/г</span>
                  </div>
                  <div className="purity-description">
                    {purity === '585' && 'Стандартная проба для ювелирных изделий'}
                    {purity === '750' && 'Высококачественная проба'}
                    {purity === '916' && 'Почти чистое золото'}
                    {purity === '999' && 'Чистое золото (24 карата)'}
                    {!['585', '750', '916', '999'].includes(purity) && 'Пользовательская проба'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="admin-info">
        <h3>Информация</h3>
        <div className="info-grid">
          <div className="info-item">
            <h4>Общее количество проб:</h4>
            <p>{Object.keys(goldPrices).length}</p>
          </div>
          <div className="info-item">
            <h4>Средняя цена:</h4>
            <p>
              {Object.values(goldPrices).length > 0 
                ? Math.round(Object.values(goldPrices).reduce((a, b) => a + b, 0) / Object.values(goldPrices).length).toLocaleString()
                : 0
              } ₸/г
            </p>
          </div>
          <div className="info-item">
            <h4>Самая высокая цена:</h4>
            <p>
              {Object.values(goldPrices).length > 0 
                ? Math.max(...Object.values(goldPrices)).toLocaleString()
                : 0
              } ₸/г
            </p>
          </div>
          <div className="info-item">
            <h4>Самая низкая цена:</h4>
            <p>
              {Object.values(goldPrices).length > 0 
                ? Math.min(...Object.values(goldPrices)).toLocaleString()
                : 0
              } ₸/г
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorAdminManager
