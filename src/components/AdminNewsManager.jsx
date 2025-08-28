import React, { useState, useEffect } from 'react'
import Image from './Image'
import './AdminNewsManager.css'

const AdminNewsManager = () => {
  const [news, setNews] = useState([])
  const [editingNews, setEditingNews] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullContent: '',
    image: '',
    alt: '',
    pdfDocuments: [],
    date: new Date().toISOString()
  })
  const [newPdfDoc, setNewPdfDoc] = useState({ name: '', file: '' })
  const [fileInputRef] = useState(React.createRef())
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [imageError, setImageError] = useState(false)

  // Загружаем новости из localStorage при инициализации
  useEffect(() => {
    const savedNews = localStorage.getItem('lombardNews')
    if (savedNews) {
      setNews(JSON.parse(savedNews))
    } else {
      // Загружаем дефолтные новости
      const defaultNews = [
        {
          id: 1,
          title: 'Договор присоединения на предоставление микрокредита',
          image: '/dengi.jpg',
          alt: 'Стопка монет',
          description: 'Договор присоединения до 50 МРП • Договор присоединения свыше 50 МРП • Приложение (Скачать PDF) • Правила ломбарда ЛОМБАРД АЛКА • Уведомление Заемщику о невыполнение обязательств • Правила ЛОМБАРД АЛКА от 01.09.2021г',
          fullContent: 'Здесь будет полное содержание новости о договоре присоединения на предоставление микрокредита. Это важный документ, который регулирует отношения между ломбардом и клиентами при предоставлении микрокредитов.',
          pdfDocuments: [
            { name: 'Договор присоединения до 50 МРП', file: '/PDF/Dogovor-prisoedineniya-do-50-MRP-01.10.2021-.pdf' },
            { name: 'Договор присоединения свыше 50 МРП', file: '/PDF/Dogovor-prisoedineniya-svyshe-50-MRP-s-01.10.2021g.-.pdf' },
            { name: 'Приложение к ЗБ (новый)', file: '/PDF/Prilozheniya-k-ZB-novyj.pdf' },
            { name: 'Правила ломбарда ЛОМБАРД АЛКА', file: '/PDF/Pravila-lombarda-LOMBARD-ALKA.pdf' },
            { name: 'Уведомление Заемщику о невыполнение обязательств', file: '/PDF/Uvedomlenie-Zaemshhiku-o-nevypolnenie-obyazatelstv.pdf' },
            { name: 'Правила ЛОМБАРД АЛКА от 01.09.2021г', file: '/PDF/Pravila-LOMBARD-ALKA-ot-01.09.2021g.pdf' }
          ]
        },
        {
          id: 2,
          title: 'Финансовая отчетность',
          image: '/istockphoto-1487894858-612x612-1.jpg',
          alt: 'Финансовые документы',
          description: 'Отчет за 2024',
          fullContent: 'Финансовая отчетность за 2024 год. Подробная информация о финансовом состоянии компании, доходах, расходах и результатах деятельности за отчетный период.',
          pdfDocuments: [{ name: 'Отчет за 2024 год', file: '/PDF/otchet-za-2024.pdf' }]
        },
        {
          id: 3,
          title: 'Финансовая отчетность',
          image: '/photo.webp',
          alt: 'Финансовые документы',
          description: 'Отчет за 2023',
          fullContent: 'Финансовая отчетность за 2023 год. Анализ финансовых показателей, сравнение с предыдущими периодами и прогнозы на будущее.',
          pdfDocuments: [{ name: 'Отчет за 2023 год', file: '/PDF/Otchet-2023.pdf' }]
        },
        {
          id: 4,
          title: 'Финансовая отчетность',
          image: '/report.jpg',
          alt: 'Финансовые документы',
          description: 'Отчет за 2022',
          fullContent: 'Финансовая отчетность за 2022 год. Детальный анализ финансового состояния компании и результаты хозяйственной деятельности.',
          pdfDocuments: [{ name: 'Отчет за 2022 год', file: '/PDF/Otchet-za-2022g.pdf' }]
        },
        {
          id: 5,
          title: 'Финансовая отчетность',
          image: '/otchet.png',
          alt: 'Финансовые документы',
          description: 'Отчет за 2021',
          fullContent: 'Финансовая отчетность за 2021 год. Обзор финансовых результатов и анализ эффективности бизнес-процессов.',
          pdfDocuments: [{ name: 'Отчет за 2021 год', file: '/PDF/Otchet-za-2021g.pdf' }]
        },
        {
          id: 6,
          title: 'Приказ о мерах поддержки физических и юридических лиц',
          image: '/4.jpg',
          alt: 'Документы поддержки',
          description: 'Порядок предоставления отсрочки платежей по займам физических и юридических лиц, пострадавших в результате введения чрезвычайного положения • Порядок и контактные телефоны по реструктуризации займа',
          fullContent: 'Приказ о мерах поддержки физических и юридических лиц, пострадавших в результате введения чрезвычайного положения. Включает порядок предоставления отсрочки платежей по займам и контактные телефоны по реструктуризации займа.',
          pdfDocuments: [
            { name: 'Порядок предоставления отсрочки платежей', file: '/PDF/Poryadok-predostavleniya-otsrochki-platezhej-po-zajmam-fizicheskih-i-yuridicheskih-lits-postradavshih-v-rezultate-vvedeniya-chrezvychajnogo-polozheniya.pdf' },
            { name: 'Порядок и контактные телефоны по реструктуризации займа', file: '/PDF/Poryadok-i-kontaktnye-telefony-po-restrukturizatsii-zajma.pdf' }
          ]
        },
        {
          id: 7,
          title: 'Финансовая отчетность',
          image: '/photo_otchet.jpg',
          alt: 'Финансовые документы',
          description: 'Отчет за 2020',
          fullContent: 'Финансовая отчетность за 2020 год. Анализ финансового состояния компании в условиях пандемии и экономических вызовов.',
          pdfDocuments: [{ name: 'Отчет за 2020 год', file: '/PDF/Finansovaya-otchetnost-za-2020g.pdf' }]
        }
      ]
      setNews(defaultNews)
      localStorage.setItem('lombardNews', JSON.stringify(defaultNews))
    }
  }, [])

  // Сохраняем новости в localStorage
  const saveNews = (updatedNews) => {
    localStorage.setItem('lombardNews', JSON.stringify(updatedNews))
    setNews(updatedNews)
  }

  // Добавление новости
  const handleAddNews = () => {
    if (formData.title && formData.description && formData.fullContent && formData.image) {
      const newNews = {
        id: Date.now(),
        ...formData,
        date: formData.date || new Date().toISOString()
      }
      
      // Добавляем новость в начало массива (сверху)
      const updatedNews = [newNews, ...news]
      setNews(updatedNews)
      saveNews(updatedNews)
      setShowForm(false)
      resetForm()
    } else {
      alert('Пожалуйста, заполните все обязательные поля')
    }
  }

  // Редактирование новости
  const handleEditNews = (newsItem) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      description: newsItem.description,
      fullContent: newsItem.fullContent,
      image: newsItem.image,
      alt: newsItem.alt,
      pdfDocuments: [...newsItem.pdfDocuments],
      date: newsItem.date
    })
    setShowForm(true)
  }

  // Обновление новости
  const handleUpdateNews = () => {
    const updatedNews = news.map(item => 
      item.id === editingNews.id 
        ? { ...editingNews, ...formData, pdfDocuments: [...formData.pdfDocuments] }
        : item
    )
    saveNews(updatedNews)
    resetForm()
    setShowForm(false)
    setEditingNews(null)
  }

  // Удаление новости
  const handleDeleteNews = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      const updatedNews = news.filter(item => item.id !== id)
      saveNews(updatedNews)
    }
  }

  // Добавление PDF документа
  const addPdfDocument = () => {
    if (newPdfDoc.name && newPdfDoc.file) {
      setFormData({
        ...formData,
        pdfDocuments: [...formData.pdfDocuments, { ...newPdfDoc }]
      })
      setNewPdfDoc({ name: '', file: '' })
    }
  }

  // Обработка выбора файла
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Проверяем, что это PDF файл
      if (file.type !== 'application/pdf') {
        alert('Пожалуйста, выберите PDF файл')
        return
      }
      
      // Создаем путь к файлу в папке public/PDF
      const fileName = file.name
      const filePath = `/PDF/${fileName}`
      
      // Устанавливаем название документа (без расширения)
      const docName = fileName.replace(/\.[^/.]+$/, "")
      
      setNewPdfDoc({
        name: docName,
        file: filePath
      })
      
      // Показываем уведомление
      alert(`Файл "${fileName}" выбран!\n\nТеперь вы можете:\n1. Изменить название документа\n2. Нажать "Добавить PDF"\n\nФайл будет доступен по пути: ${filePath}`)
    }
  }

  // Открытие диалога выбора файла
  const openFileDialog = () => {
    fileInputRef.current.click()
  }

  // Удаление PDF документа
  const removePdfDocument = (index) => {
    const updatedPdfDocs = formData.pdfDocuments.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      pdfDocuments: updatedPdfDocs
    })
  }

  // Обработка добавления изображения по URL
  const handleAddImageUrl = () => {
    if (imageUrl.trim()) {
      // Проверяем, что это валидный URL
      try {
        new URL(imageUrl)
        setFormData({
          ...formData,
          image: imageUrl
        })
        setImagePreview(imageUrl)
        setImageError(false)
        setImageUrl('')
      } catch {
        alert('Пожалуйста, введите корректный URL изображения')
      }
    }
  }

  // Обработка ошибки загрузки изображения
  const handleImageError = () => {
    setImageError(true)
  }

  // Удаление изображения
  const removeImage = () => {
    setFormData({
      ...formData,
      image: ''
    })
    setImagePreview('')
    setImageError(false)
  }

  // Сброс формы
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      fullContent: '',
      image: '',
      alt: '',
      pdfDocuments: [],
      date: new Date().toISOString()
    })
    setNewPdfDoc({ name: '', file: '' })
  }

  // Выход из админ панели
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    window.location.reload()
  }

  // Сортировка новостей по дате (новые сверху)
  const sortedNews = [...news].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  // Перемещение новости вверх
  const moveNewsUp = (index) => {
    if (index > 0) {
      const updatedNews = [...news]
      const temp = updatedNews[index]
      updatedNews[index] = updatedNews[index - 1]
      updatedNews[index - 1] = temp
      
      // Обновляем приоритеты для сохранения порядка
      updatedNews.forEach((item, idx) => {
        item.priority = 100 - idx
      })
      
      setNews(updatedNews)
      saveNews(updatedNews)
    }
  }

  // Перемещение новости вниз
  const moveNewsDown = (index) => {
    if (index < news.length - 1) {
      const updatedNews = [...news]
      const temp = updatedNews[index]
      updatedNews[index] = updatedNews[index + 1]
      updatedNews[index + 1] = temp
      
      // Обновляем приоритеты для сохранения порядка
      updatedNews.forEach((item, idx) => {
        item.priority = 100 - idx
      })
      
      setNews(updatedNews)
      saveNews(updatedNews)
    }
  }

  return (
    <div className="admin-news-manager">
      <div className="admin-header">
        <h1>Управление новостями</h1>
        <div className="admin-actions">
          <button 
            className="add-news-btn"
            onClick={() => {
              resetForm()
              setShowForm(true)
              setEditingNews(null)
            }}
          >
            + Добавить новость
          </button>
          <button 
            className="reset-data-btn"
            onClick={() => {
              if (window.confirm('Сбросить все данные к исходным? Это действие нельзя отменить.')) {
                localStorage.removeItem('lombardNews')
                window.location.reload()
              }
            }}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            🔄 Сбросить данные
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>

      {/* Информационная панель о порядке новостей */}
      <div className="news-order-info">
        <div className="order-info-header">
          <h3>📋 Порядок новостей</h3>
          <span className="order-help">Используйте стрелочки ⬆️⬇️ для быстрого изменения порядка</span>
        </div>
        <div className="order-info-content">
          <div className="order-rule">
            <span className="order-number">1</span>
            <span>Новые новости автоматически размещаются сверху</span>
          </div>
          <div className="order-rule">
            <span className="order-number">2</span>
            <span>Используйте стрелочки для изменения порядка</span>
          </div>
          <div className="order-rule">
            <span className="order-number">3</span>
            <span>Порядок сохраняется автоматически</span>
          </div>
        </div>
      </div>

      {/* Форма добавления/редактирования */}
      {showForm && (
        <div className="news-form-overlay">
          <div className="news-form-container">
            <div className="form-header">
              <h2>{editingNews ? 'Редактировать новость' : 'Добавить новость'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false)
                  setEditingNews(null)
                  resetForm()
                }}
              >
                ×
              </button>
            </div>

            <form className="news-form" onSubmit={(e) => {
              e.preventDefault()
              editingNews ? handleUpdateNews() : handleAddNews()
            }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Заголовок:</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Введите заголовок новости"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Дата публикации:</label>
                  <input
                    type="datetime-local"
                    value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="date-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Alt для изображения:</label>
                  <input
                    type="text"
                    value={formData.alt}
                    onChange={(e) => setFormData({...formData, alt: e.target.value})}
                    placeholder="Описание картинки"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Краткое описание:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Полное содержание:</label>
                <textarea
                  value={formData.fullContent}
                  onChange={(e) => setFormData({...formData, fullContent: e.target.value})}
                  required
                  rows="5"
                />
              </div>

              {/* PDF документы */}
              <div className="pdf-documents-section">
                <h3>PDF документы</h3>
                {formData.pdfDocuments.map((doc, index) => (
                  <div key={index} className="pdf-doc-item">
                    <span>{doc.name}</span>
                    <button 
                      type="button"
                      className="remove-pdf-btn"
                      onClick={() => removePdfDocument(index)}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
                
                <div className="add-pdf-form">
                  <div className="pdf-input-group">
                    <input
                      type="text"
                      placeholder="Название документа"
                      value={newPdfDoc.name}
                      onChange={(e) => setNewPdfDoc({...newPdfDoc, name: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Путь к файлу (автоматически)"
                      value={newPdfDoc.file}
                      onChange={(e) => setNewPdfDoc({...newPdfDoc, file: e.target.value})}
                      readOnly
                      className="file-path-input"
                    />
                  </div>
                  <div className="pdf-button-group">
                    <button 
                      type="button"
                      className="select-file-btn"
                      onClick={openFileDialog}
                    >
                      📁 Выбрать PDF файл
                    </button>
                    <button 
                      type="button"
                      className="add-pdf-btn"
                      onClick={addPdfDocument}
                      disabled={!newPdfDoc.name || !newPdfDoc.file}
                    >
                      ✅ Добавить PDF
                    </button>
                  </div>
                </div>
                
                {/* Скрытый input для выбора файла */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Путь к изображению:</label>
                  <div className="image-input-group">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="/path/to/image.jpg или https://example.com/image.jpg"
                      required
                    />
                    <button 
                      type="button"
                      className="add-image-url-btn"
                      onClick={handleAddImageUrl}
                      disabled={!imageUrl.trim()}
                    >
                      🌐 Добавить по URL
                    </button>
                  </div>
                  
                  {/* Поле для ввода URL */}
                  <div className="image-url-input">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Введите URL изображения (например: https://example.com/image.jpg)"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddImageUrl()}
                    />
                  </div>
                  
                  {/* Предварительный просмотр изображения */}
                  {formData.image && (
                    <div className="image-preview">
                      {imageError ? (
                        <div className="image-error">
                          <span>❌ Ошибка загрузки изображения</span>
                          <button 
                            type="button"
                            className="remove-image-btn"
                            onClick={removeImage}
                          >
                            🗑️ Удалить
                          </button>
                        </div>
                      ) : (
                        <>
                          <Image 
                            src={formData.image} 
                            alt="Предварительный просмотр" 
                            className="preview-image"
                            onError={handleImageError}
                            onLoad={() => setImageError(false)}
                          />
                          <div className="image-preview-info">
                            <span className="image-url">{formData.image}</span>
                            <button 
                              type="button"
                              className="remove-image-btn"
                              onClick={removeImage}
                            >
                              🗑️ Удалить
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingNews ? 'Обновить' : 'Добавить'}
                </button>
                <button 
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false)
                    setEditingNews(null)
                    resetForm()
                  }}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Список новостей */}
      <div className="news-list">
        {sortedNews.map((item) => (
          <div key={item.id} className="news-item">
            <div className="news-image">
              {item.image ? (
                <Image src={item.image} alt={item.alt || 'Изображение новости'} />
              ) : (
                <div className="image-placeholder">
                  <span className="placeholder-icon">🖼️</span>
                  <span className="placeholder-text">Нет изображения</span>
                </div>
              )}
            </div>
            <div className="news-content">
              <div className="news-header">
                <h3 className="news-title">{item.title}</h3>
              </div>
              <p className="news-description">{item.description}</p>
              <div className="news-meta">
                <span className="news-date">
                  📅 {new Date(item.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                {item.pdfDocuments && item.pdfDocuments.length > 0 && (
                  <span className="news-pdfs">📄 {item.pdfDocuments.length} PDF</span>
                )}
              </div>
              <div className="news-actions">
                <div className="news-move-buttons">
                  <button 
                    className="move-up-btn" 
                    onClick={() => moveNewsUp(sortedNews.findIndex(newsItem => newsItem.id === item.id))}
                    disabled={sortedNews.findIndex(newsItem => newsItem.id === item.id) === 0}
                    title="Переместить вверх"
                  >
                    ⬆️
                  </button>
                  <button 
                    className="move-down-btn" 
                    onClick={() => moveNewsDown(sortedNews.findIndex(newsItem => newsItem.id === item.id))}
                    disabled={sortedNews.findIndex(newsItem => newsItem.id === item.id) === sortedNews.length - 1}
                    title="Переместить вниз"
                  >
                    ⬇️
                  </button>
                </div>
                <button className="edit-btn" onClick={() => handleEditNews(item)}>✏️ Редактировать</button>
                <button className="delete-btn" onClick={() => handleDeleteNews(item.id)}>🗑️ Удалить</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminNewsManager
