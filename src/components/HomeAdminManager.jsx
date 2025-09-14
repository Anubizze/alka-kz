
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
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [imageError, setImageError] = useState(false)
  const [imageFileInputRef] = useState(React.createRef())
  const [selectedImageFile, setSelectedImageFile] = useState(null)

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
    setImageUrl(url)
    setFormData(prev => ({ ...prev, image: url }))
    setImagePreview(url)
    setImageError(false)
  }

  // Обработка выбора файла изображения
  const handleImageFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Проверяем, что это изображение
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения (JPG, PNG, GIF, WebP)')
        return
      }
      
      // Проверяем размер файла (максимум 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        alert('Файл слишком большой! Максимальный размер: 5MB')
        return
      }
      
      // Создаем FileReader для конвертации в base64
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const base64String = e.target.result
        
        setSelectedImageFile({
          file: file,
          fileName: file.name,
          base64: base64String,
          previewUrl: base64String
        })
        
        // Устанавливаем base64 изображение в форму
        setFormData(prev => ({ ...prev, image: base64String }))
        
        setImagePreview(base64String)
        setImageError(false)
        
        // Показываем уведомление об успешной загрузке
        alert(`✅ Изображение "${file.name}" успешно загружено!\n\n📊 Размер: ${(file.size / 1024).toFixed(1)} KB\n🖼️ Формат: ${file.type}\n\n💾 Изображение сохранено в данных новости!`)
      }
      
      reader.onerror = () => {
        alert('Ошибка при чтении файла. Попробуйте другой файл.')
      }
      
      // Читаем файл как base64
      reader.readAsDataURL(file)
    }
  }

  // Открытие диалога выбора изображения
  const openImageFileDialog = () => {
    imageFileInputRef.current.click()
  }

  // Обработка добавления изображения по URL
  const handleAddImageUrl = () => {
    if (imageUrl.trim()) {
      // Проверяем, что это валидный URL
      try {
        new URL(imageUrl)
        setFormData(prev => ({ ...prev, image: imageUrl }))
        setImagePreview(imageUrl)
        setImageError(false)
        setImageUrl('')
      } catch {
        alert('Пожалуйста, введите корректный URL изображения')
      }
    }
  }

  // Удаление изображения
  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }))
    setImagePreview('')
    setImageError(false)
    setSelectedImageFile(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log('Отправка формы:', { editingNews, formData }) // Отладочная информация
    
    if (editingNews) {
      // Редактируем существующую новость
      const updatedNews = news.map(item => 
        item.id === editingNews.id ? { ...formData, id: editingNews.id } : item
      )
      console.log('Обновленные новости:', updatedNews) // Отладочная информация
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
    
    // Сбрасываем форму
    setFormData({
      title: '',
      image: '',
      alt: '',
      link: '',
      hyperlink: ''
    })
    setImageUrl('')
    setImagePreview('')
    setShowForm(false)
  }

  const handleEdit = (newsItem) => {
    console.log('Редактируем новость:', newsItem) // Отладочная информация
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
    setImageUrl(newsItem.image || '')
    setImagePreview(newsItem.image || '')
    setShowForm(true)
    
    console.log('Данные для редактирования:', editData) // Отладочная информация
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
    setFormData({
      title: '',
      image: '',
      alt: '',
      link: '',
      hyperlink: ''
    })
    setImageUrl('')
    setImagePreview('')
    setSelectedImageFile(null)
    setImageError(false)
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

              {imagePreview && (
                <div className="image-preview">
                  {imageError ? (
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
                      {selectedImageFile ? (
                        <div className="image-preview-uploaded">
                          <img 
                            src={selectedImageFile.previewUrl} 
                            alt="Загруженное изображение" 
                            className="preview-image"
                          />
                          <div className="image-preview-info">
                            <div className="image-success">
                              <span className="success-icon">✅</span>
                              <span className="success-text">Изображение загружено и сохранено!</span>
                            </div>
                            <div className="image-file-info">
                              <span className="file-name">{selectedImageFile.fileName}</span>
                              <span className="file-size">({(selectedImageFile.file.size / 1024).toFixed(1)} KB)</span>
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
                            src={imagePreview} 
                            alt="Предварительный просмотр" 
                            className="preview-image"
                            onError={() => setImageError(true)}
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
