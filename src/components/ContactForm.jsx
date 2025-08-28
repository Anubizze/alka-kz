import React, { useState, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import { sendEmail } from '../hooks/UseSendMail'
import ReCAPTCHA from 'react-google-recaptcha'
import './ContactForm.css'

const ContactForm = ({ 
  title, 
  description, 
  className = '', 
  showSuccessMessage = true,
  onSuccess,
  onError 
}) => {
  const { currentLanguage } = useLanguage()
  const recaptchaRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [captchaValue, setCaptchaValue] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value)
    if (submitStatus === 'captcha_error') {
      setSubmitStatus(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Проверяем CAPTCHA
    if (!captchaValue) {
      setSubmitStatus('captcha_error')
      return
    }
    
    console.log('🚀 Начинаем отправку формы...', formData)
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      console.log('📧 Вызываем sendEmail...')
      const result = await sendEmail(
        formData.name,
        formData.phone,
        formData.email,
        formData.message
      )

      console.log('📬 Результат отправки:', result)

      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', phone: '', email: '', message: '' })
        setCaptchaValue(null)
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
        if (onSuccess) onSuccess(result)
        console.log('✅ Письмо успешно отправлено!')
      } else {
        setSubmitStatus('error')
        if (onError) onError(result.error)
        console.log('❌ Ошибка отправки:', result.error)
      }
    } catch (error) {
      console.log('💥 Исключение при отправке:', error)
      setSubmitStatus('error')
      if (onError) onError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const defaultTitle = currentLanguage === 'RU' ? 'Напишите нам' : 'Бізге жазыңыз'
  const defaultDescription = currentLanguage === 'RU' 
    ? 'Оставьте заявку и мы свяжемся с вами в ближайшее время'
    : 'Өтініш қалдырыңыз, біз сізбен жақын арада байланысамыз'

  return (
    <div className={`contact-form-container ${className}`}>
      <h2 className="contact-form-title">
        {title || defaultTitle}
      </h2>
      <p className="contact-form-description">
        {description || defaultDescription}
      </p>

      {showSuccessMessage && submitStatus === 'success' && (
        <div className="form-success">
          {currentLanguage === 'RU' 
            ? 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.'
            : 'Рахмет! Сіздің хабарламаңыз жіберілді. Біз сізбен жақын арада байланысамыз.'
          }
        </div>
      )}

      {submitStatus === 'captcha_error' && (
        <div className="form-error">
          <div>
            {currentLanguage === 'RU' 
              ? 'Пожалуйста, подтвердите, что вы не робот.'
              : 'Өтінеміз, сіз робот емес екеніңізді растаңыз.'
            }
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="form-error">
          <div>
            {currentLanguage === 'RU' 
              ? 'Произошла ошибка при отправке. Попробуйте еще раз или свяжитесь с нами по телефону.'
              : 'Жіберу кезінде қате орын алды. Қайталап көріңіз немесе бізбен телефон арқылы байланысыңыз.'
            }
          </div>
          <div style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
            {currentLanguage === 'RU' 
              ? 'Проверьте консоль браузера (F12) для деталей ошибки.'
              : 'Қате туралы толық ақпаратты көру үшін браузер консолін (F12) тексеріңіз.'
            }
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={currentLanguage === 'RU' ? 'Ваше имя' : 'Сіздің атыңыз'}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={currentLanguage === 'RU' ? 'Номер телефона' : 'Телефон нөмірі'}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={currentLanguage === 'RU' ? 'Email адрес' : 'Email мекенжайы'}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={currentLanguage === 'RU' ? 'Ваше сообщение' : 'Сіздің хабарламаңыз'}
            className="form-textarea"
            rows="5"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <div className="captcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              onChange={handleCaptchaChange}
              theme="light"
              size="normal"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="form-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? (currentLanguage === 'RU' ? 'Отправка...' : 'Жіберілуде...')
            : (currentLanguage === 'RU' ? 'Отправить' : 'Жіберу')
          }
        </button>
      </form>
    </div>
  )
}

export default ContactForm
