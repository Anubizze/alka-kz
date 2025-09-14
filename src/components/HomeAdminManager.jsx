
import React, { useState, useEffect } from 'react'
import Image from './Image'
import './HomeAdminManager.css'

const HomeAdminManager = () => {
  const [news, setNews] = useState([])
  const [editingNews, setEditingNews] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    alt: '',
    link: '',
    hyperlink: ''
  })
  
  // Объединяем связанные состояния изображения
  const [imageState, setImageState] = useState({
    url: '',
    preview: '',
    error: false,
    selectedFile: null
  })
  
  const [imageFileInputRef] = useState(React.createRef())

  // Загружаем новости из localStorage при инициализации
  useEffect(() => {
    const savedNews = localStorage.getItem('homeCompanyNews')
    if (savedNews) {
      setNews(JSON.parse(savedNews))
    } else {
      // Загружаем дефолтные новости
      const defaultNews = [
        {
          id: 1,
          title: 'ДАМУ ЛИЗИНГ',
          image: '/DamuLeasing.jpeg',
          alt: 'ДАМУ ЛИЗИНГ',
          link: '/services/damu-leasing',
          hyperlink: ''
        },
        {
          id: 2,
          title: 'НУРЛЫ ЖЕР',
          image: '/nurly-zher.jpg',
          alt: 'НУРЛЫ ЖЕР',
          link: '/services/nurly-zher',
          hyperlink: ''
        },
        {
          id: 3,
          title: 'ДАМУ',
          image: '/Damu.jpeg',
          alt: 'ДАМУ',
          link: '/services/damu',
          hyperlink: ''
        }
      ]
      setNews(defaultNews)
      localStorage.setItem('homeCompanyNews', JSON.stringify(defaultNews))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUrlChange = (e) => {
    const url = e.target.value
    setImageState(prev => ({ ...prev, url, preview: url, error: false }))
    setFormData(prev => ({ ...prev, image: url }))
  }

  // Валидация файла изображения
  const validateImageFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения (JPG, PNG, GIF, WebP)')
      return false
    }
    
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert('Файл слишком большой! Максимальный размер: 5MB')
      return false
    }
    
    return true
  }

  // Обработка успешной загрузки файла
  const handleFileLoadSuccess = (file, base64String) => {
    const selectedFile = {
      file: file,
      fileName: file.name,
      base64: base64String,
      previewUrl: base64String
    }
    
    setImageState(prev => ({ 
      ...prev, 
      selectedFile, 
      preview: base64String, 
      error: false 
    }))
    
    setFormData(prev => ({ ...prev, image: base64String }))
    
    alert(`✅ Изображение "${file.name}" успешно загружено!\n\n📊 Размер: ${(file.size / 1024).toFixed(1)} KB\n🖼️ Формат: ${file.type}\n\n💾 Изображение сохранено в данных новости!`)
  }

  // Обработка выбора файла изображения
  const handleImageFileSelect = (event) => {
    const file = event.target.files[0]
    if (!file || !validateImageFile(file)) return
    
    const reader = new FileReader()
    
    reader.onload = (e) => {
      handleFileLoadSuccess(file, e.target.result)
    }
    
    reader.onerror = () => {
      alert('Ошибка при чтении файла. Попробуйте другой файл.')
    }
    
    reader.readAsDataURL(file)
  }

  // Открытие диалога выбора изображения
  const openImageFileDialog = () => {
    imageFileInputRef.current.click()
  }

  // Обработка добавления изображения по URL
  const handleAddImageUrl = () => {
    if (imageState.url.trim()) {
      try {
        new URL(imageState.url)
        setFormData(prev => ({ ...prev, image: imageState.url }))
        setImageState(prev => ({ ...prev, preview: imageState.url, error: false, url: '' }))
      } catch {
        alert('Пожалуйста, введите корректный URL изображения')
      }
    }
  }

  // Удаление изображения
  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }))
    setImageState({
      url: '',
      preview: '',
      error: false,
      selectedFile: null
    })
  }

  // Функция сброса формы
  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      alt: '',
      link: '',
      hyperlink: ''
    })
    setImageState({
      url: '',
      preview: '',
      error: false,
      selectedFile: null
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingNews) {
      // Редактируем существующую новость
      const updatedNews = news.map(item => 
        item.id === editingNews.id ? { ...formData, id: editingNews.id } : item
      )
      setNews(updatedNews)
      localStorage.setItem('homeCompanyNews', JSON.stringify(updatedNews))
      setEditingNews(null)
    } else {
      // Добавляем новую новость
      const newNews = {
        ...formData,
        id: Date.now()
      }
      const updatedNews = [...news, newNews]
      setNews(updatedNews)
      localStorage.setItem('homeCompanyNews', JSON.stringify(updatedNews))
    }
    
    resetForm()
    setShowForm(false)
  }

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem)
    
    // Убеждаемся, что все поля правильно заполнены
    const editData = {
      title: newsItem.title || '',
      image: newsItem.image || '',
      alt: newsItem.alt || '',
      link: newsItem.link || '',
      hyperlink: newsItem.hyperlink || ''
    }
    
    setFormData(editData)
    setImageState({
      url: newsItem.image || '',
      preview: newsItem.image || '',
      error: false,
      selectedFile: null
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      const updatedNews = news.filter(item => item.id !== id)
      setNews(updatedNews)
      localStorage.setItem('homeCompanyNews', JSON.stringify(updatedNews))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingNews(null)
    resetForm()
  }



  return (
    <div className="home-admin-manager">
      <div className="admin-header">
        <h1>Управление новостями компании</h1>
        <button 
          className="add-news-btn"
          onClick={() => setShowForm(true)}
        >
          Добавить новость
        </button>
      </div>

      {showForm && (
        <div className="news-form-overlay">
          <div className="news-form">
            <h2>{editingNews ? 'Редактировать новость' : 'Добавить новость'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Заголовок:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>



              <div className="form-group">
                <label>Ссылка на страницу:</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="/services/..."
                  required
                />
              </div>

              <div className="form-group">
                <label>HTML-гиперссылка:</label>
                <textarea
                  name="hyperlink"
                  value={formData.hyperlink || ''}
                  onChange={handleInputChange}
                  placeholder='<a href="https://example.com" target="_blank">Текст ссылки</a> или оставьте пустым'
                  rows="3"
                />
                <small className="form-help">Можете вставить HTML-код ссылки, например: &lt;a href="https://www.google.com" target="_blank"&gt;Перейти на Google&lt;/a&gt;</small>
              </div>

              <div className="form-group">
                <label>Изображение:</label>
                
                {/* Кнопки выбора изображения */}
                <div className="image-selection-buttons">
                  <button 
                    type="button"
                    className="select-image-file-btn"
                    onClick={openImageFileDialog}
                  >
                    📷 Загрузить фотографию
                  </button>
                  <span className="image-separator">или</span>
                  <button 
                    type="button"
                    className="add-image-url-btn"
                    onClick={handleAddImageUrl}
                    disabled={!imageState.url.trim()}
                  >
                    🌐 Добавить по URL
                  </button>
                </div>
                
                {/* Поле для ввода URL */}
                <div className="image-url-input">
                  <input
                    type="text"
                    value={imageState.url}
                    onChange={(e) => setImageState(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="Введите URL изображения (например: https://example.com/image.jpg)"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddImageUrl()}
                  />
                </div>
                
                {/* Поле для отображения изображения */}
                <div className="image-path-display">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="Загрузите изображение или введите URL"
                    required
                    className="image-path-input"
                  />
                  <div className="image-path-hint">
                    💡 Изображения загружаются напрямую в данные новости (base64) или используйте URL
                  </div>
                </div>
              </div>

              {imageState.preview && (
                <div className="image-preview">
                  {imageState.error ? (
                    <div className="image-error">
                      <span>❌ Ошибка загрузки изображения</span>
                      <div className="image-error-warning">
                        <p>⚠️ Файл не найден на сервере!</p>
                        <p>Убедитесь, что файл загружен в папку "public/" или используйте корректный URL</p>
                      </div>
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
                      {imageState.selectedFile ? (
                        <div className="image-preview-uploaded">
                          <img 
                            src={imageState.selectedFile.previewUrl} 
                            alt="Загруженное изображение" 
                            className="preview-image"
                          />
                          <div className="image-preview-info">
                            <div className="image-success">
                              <span className="success-icon">✅</span>
                              <span className="success-text">Изображение загружено и сохранено!</span>
                            </div>
                            <div className="image-file-info">
                              <span className="file-name">{imageState.selectedFile.fileName}</span>
                              <span className="file-size">({(imageState.selectedFile.file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <button 
                              type="button"
                              className="remove-image-btn"
                              onClick={removeImage}
                            >
                              🗑️ Удалить
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Image 
                            src={imageState.preview} 
                            alt="Предварительный просмотр" 
                            className="preview-image"
                            onError={() => setImageState(prev => ({ ...prev, error: true }))}
                            onLoad={() => setImageState(prev => ({ ...prev, error: false }))}
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
                    </>
                  )}
                </div>
              )}

              <div className="form-group">
                <label>Alt текст для изображения:</label>
                <input
                  type="text"
                  name="alt"
                  value={formData.alt}
                  onChange={handleInputChange}
                  required
                />
              </div>



              {/* Скрытый input для выбора изображений */}
              <input
                ref={imageFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileSelect}
                style={{ display: 'none' }}
              />

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingNews ? 'Сохранить изменения' : 'Добавить новость'}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="news-list">
        {news.map(newsItem => (
          <div key={newsItem.id} className="news-item">
            <div className="news-image">
              {newsItem.image ? (
                newsItem.image.startsWith('data:') ? (
                  <img 
                    src={newsItem.image} 
                    alt={newsItem.alt}
                    className="news-image-img"
                  />
                ) : (
                  <Image 
                    src={newsItem.image} 
                    alt={newsItem.alt}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                )
              ) : (
                <div className="image-fallback">
                  <span>Изображение недоступно</span>
                </div>
              )}
              <div className="image-fallback" style={{ display: 'none' }}>
                <span>Изображение недоступно</span>
              </div>
            </div>
            
            <div className="news-content">
              <h3>{newsItem.title}</h3>
              <div className="news-meta">
                {newsItem.hyperlink && (
                  <span className="news-hyperlink">HTML-ссылка: {newsItem.hyperlink}</span>
                )}
              </div>
            </div>
            
            <div className="news-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEdit(newsItem)}
              >
                Редактировать
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(newsItem.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeAdminManager
