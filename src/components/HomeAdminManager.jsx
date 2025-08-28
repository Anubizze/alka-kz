import React, { useState, useEffect } from 'react'
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
                <label>URL изображения:</label>
                <input
                  type="text"
                  name="image"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  placeholder="https://example.com/image.jpg или /image.jpg"
                  required
                />
              </div>

              {imagePreview && (
                <div className="image-preview">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    onError={() => setImageError(true)}
                    style={{ display: imageError ? 'none' : 'block' }}
                  />
                  {imageError && <p className="image-error">Ошибка загрузки изображения</p>}
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
              <img 
                src={newsItem.image} 
                alt={newsItem.alt}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
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
