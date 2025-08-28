import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import LombardNavigation from '../components/LombardNavigation'
import './calculator.css'

function Calculator() {
  const { currentLanguage } = useLanguage()
  
  const goldPrices = {
    585: 32429,
    750: 41576,
    916: 50778,
    999: 64459
  }

  // Залоговый калькулятор
  const [weight, setWeight] = useState('')
  const [purity, setPurity] = useState(585)
  const [loanPercentage, setLoanPercentage] = useState(70)
  const [showSlider, setShowSlider] = useState(false)
  const [result, setResult] = useState(null)

  // Кредитный калькулятор
  const [showCredit, setShowCredit] = useState(false)
  const [creditMonths, setCreditMonths] = useState(6)
  const [monthlyRate, setMonthlyRate] = useState(3) // %
  const [creditResult, setCreditResult] = useState(null)

  useEffect(() => {
    if (!showSlider) {
      setLoanPercentage(null)
    } else if (loanPercentage == null) {
      setLoanPercentage(70)
    }
  }, [showSlider])

  useEffect(() => {
    if (!weight || weight <= 0 || (showSlider && (loanPercentage === null || loanPercentage < 0))) {
      setResult(null)
      return
    }
    const pricePerGram = goldPrices[purity]
    let totalValue = weight * pricePerGram
    let loanAmount = showSlider ? totalValue * (loanPercentage / 100) : null

    setResult({
      totalValue: totalValue.toFixed(0),
      loanAmount: loanAmount ? loanAmount.toFixed(0) : null,
      pricePerGram: pricePerGram
    })
  }, [weight, purity, loanPercentage, showSlider])

  // Credit calculator logic
  useEffect(() => {
    if (!showCredit || !weight || weight <= 0) {
      setCreditResult(null)
      return
    }
    const pricePerGram = goldPrices[purity]
    let totalValue = weight * pricePerGram

    // Сумма кредита равна полной стоимости золота
    let principal = totalValue

    // Месячный платеж по формуле аннуитета
    // P = principal, r = rate/100/12, n = months
    let r = monthlyRate / 100
    let n = creditMonths
    let monthlyPayment = (principal * r) / (1 - Math.pow(1 + r, -n))

    setCreditResult({
      principal: principal.toFixed(0),
      monthlyPayment: monthlyPayment.toFixed(0),
      months: n,
      rate: monthlyRate
    })
  }, [showCredit, weight, purity, creditMonths, monthlyRate])

  return (
    <div className="calculator-page">
      {/* Header ломбарда */}
      <LombardNavigation />
      
      <div className="calculator-container">
        <div className="calculator-wrapper">
          {/* Header */}


          <div className="calculator-grid">
            {/* Input Section */}
            <div className="calculator-card">
              <h2 className="calculator-card-title">
                <div className="calculator-card-icon">
                  <img src="/icons/nastr.png" alt="Параметры" />
                </div>
                {t('calculatorParameters', currentLanguage)}
              </h2>
              <p style={{ 
                color: '#666', 
                fontSize: '14px', 
                marginBottom: '20px', 
                lineHeight: '1.5',
                textAlign: 'center'
              }}>
                {t('calculatorParametersDesc', currentLanguage)}
              </p>

              {/* Weight Input */}
              <div className="calculator-form-group">
                <label className="calculator-label">
                  {t('weightLabel', currentLanguage)}
                </label>
                <div className="calculator-input-wrapper">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={t('weightPlaceholder', currentLanguage)}
                    className="calculator-input"
                    step="0.01"
                    min="0"
                  />
                  <div className="calculator-input-suffix">
                    г
                  </div>
                </div>
              </div>

              {/* Purity Selection */}
              <div className="calculator-form-group">
                <label className="calculator-label">
                  {t('purityLabel', currentLanguage)}
                </label>
                <div className="calculator-purity-grid">
                  {Object.keys(goldPrices).map((purityKey) => (
                    <button
                      key={purityKey}
                      onClick={() => setPurity(parseInt(purityKey))}
                      className={`calculator-purity-button ${purity === parseInt(purityKey) ? 'active' : ''}`}
                    >
                      <div className="calculator-purity-value">{purityKey}</div>
                      <div className="calculator-purity-price">
                        {goldPrices[purityKey].toLocaleString()} ₸/г
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Percentage Toggle */}
              <div className="calculator-checkbox">
                <input
                  type="checkbox"
                  checked={showSlider}
                  onChange={() => setShowSlider((v) => !v)}
                  id="loanPercentageToggle"
                />
                <label htmlFor="loanPercentageToggle">
                  {t('calculateLoanToggle', currentLanguage)}
                </label>
              </div>

              {showSlider && (
                <div className="calculator-form-group">
                  <label className="calculator-label">
                    {t('loanPercentageLabel', currentLanguage)} <span className="calculator-range-labels current">{loanPercentage}%</span>
                  </label>
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={loanPercentage}
                      onChange={(e) => setLoanPercentage(parseInt(e.target.value))}
                      className="calculator-range"
                      style={{
                        background: `linear-gradient(to right, #404040 0%, #404040 ${loanPercentage}%, #e5e7eb ${loanPercentage}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="calculator-range-labels">
                      <span className="min">0%</span>
                      <span className="current">{loanPercentage}%</span>
                      <span className="max">100%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Credit Calculator Toggle */}
              <div className="calculator-checkbox">
                <input
                  type="checkbox"
                  checked={showCredit}
                  onChange={() => setShowCredit((v) => !v)}
                  id="creditToggle"
                />
                <label htmlFor="creditToggle">
                  {t('calculateCreditToggle', currentLanguage)}
                </label>
              </div>

              {/* Credit Calculator Inputs */}
              {showCredit && (
                <div className="calculator-form-group">
                  <label className="calculator-label">
                    {t('creditMonthsLabel', currentLanguage)} <span className="calculator-range-labels current">{creditMonths}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={creditMonths}
                    onChange={e => setCreditMonths(parseInt(e.target.value))}
                    className="calculator-range"
                    style={{
                      background: `linear-gradient(to right, #404040 0%, #404040 ${(creditMonths / 24) * 100}%, #e5e7eb ${(creditMonths / 24) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="calculator-range-labels">
                    <span className="min">1</span>
                    <span className="current">{creditMonths}</span>
                    <span className="max">24</span>
                  </div>
                  <label className="calculator-label">
                    {t('monthlyRateLabel', currentLanguage)} <span className="calculator-range-labels current">{monthlyRate}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={monthlyRate}
                    onChange={e => setMonthlyRate(parseInt(e.target.value))}
                    className="calculator-range"
                    style={{
                      background: `linear-gradient(to right, #404040 0%, #404040 ${((monthlyRate - 1) / 4) * 100}%, #e5e7eb ${((monthlyRate - 1) / 4) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="calculator-range-labels">
                    <span className="min">1%</span>
                    <span className="current">{monthlyRate}%</span>
                    <span className="max">5%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="calculator-card">
              <h2 className="calculator-card-title">
                <div className="calculator-card-icon">
                  <img src="/icons/money.png" alt={t('resultTitle', currentLanguage)} />
                </div>
                {t('resultTitle', currentLanguage)}
              </h2>
              <p style={{ 
                color: '#666', 
                fontSize: '14px', 
                marginBottom: '20px', 
                lineHeight: '1.5',
                textAlign: 'center'
              }}>
                {t('calculatorNote', currentLanguage)}
              </p>
              {/* Залоговый результат */}
              {!showCredit && result ? (
                <div>
                  <div className="calculator-result-item">
                    <div className="calculator-result-label">{currentLanguage === 'RU' ? 'Цена за грамм' : 'Граммға баға'}</div>
                    <div className="calculator-result-value">
                      {result.pricePerGram.toLocaleString()} ₸
                    </div>
                  </div>
                  <div className="calculator-result-item highlight">
                    <div className="calculator-result-label">{currentLanguage === 'RU' ? 'Общая стоимость' : 'Жалпы құн'}</div>
                    <div className="calculator-result-value">
                      {parseInt(result.totalValue).toLocaleString()} ₸
                    </div>
                  </div>
                  {showSlider && (
                    <div className="calculator-result-item primary">
                      <div className="calculator-result-label">{currentLanguage === 'RU' ? 'Сумма займа' : 'Несие сомасы'}</div>
                      <div className="calculator-result-value large">
                        {parseInt(result.loanAmount).toLocaleString()} ₸
                      </div>
                    </div>
                  )}
                  {showSlider && (
                    <div className="calculator-result-item">
                      <img src="/icons/vazninfa.png" alt={currentLanguage === 'RU' ? 'Эмблема' : 'Эмблема'} className="mr-2 w-4 h-4" />
                      {currentLanguage === 'RU' ? 'Сумма займа составляет' : 'Несие сомасы'} <span className="font-bold">{loanPercentage}%</span> {currentLanguage === 'RU' ? 'от рыночной стоимости' : 'нарықтық құннан'}
                    </div>
                  )}
                </div>
              ) : null}
              {/* Кредитный результат */}
              {showCredit && creditResult ? (
                <div>
                  <div className="calculator-result-item">
                    <div className="calculator-result-label">{currentLanguage === 'RU' ? 'Сумма кредита' : 'Несие сомасы'}</div>
                    <div className="calculator-result-value">
                      {parseInt(creditResult.principal).toLocaleString()} ₸
                    </div>
                  </div>
                  <div className="calculator-result-item highlight">
                    <div className="calculator-result-label">{currentLanguage === 'RU' ? 'Ежемесячный платеж' : 'Айлық төлем'}</div>
                    <div className="calculator-result-value">
                      {parseInt(creditResult.monthlyPayment).toLocaleString()} ₸
                    </div>
                  </div>
                  <div className="calculator-result-item primary">
                    <div className="calculator-result-label">{currentLanguage === 'RU' ? 'Срок кредита' : 'Несие мерзімі'}</div>
                    <div className="calculator-result-value large">
                      {creditResult.months} {currentLanguage === 'RU' ? 'месяцев' : 'ай'}
                    </div>
                  </div>
                  <div className="calculator-result-item">
                    <img src="/icons/vazninfa.png" alt={currentLanguage === 'RU' ? 'Эмблема' : 'Эмблема'} className="mr-2 w-4 h-4" />
                    {currentLanguage === 'RU' ? 'Месячная ставка' : 'Айлық мөлшерлеме'} <span className="font-bold">{creditResult.rate}%</span>
                  </div>
                </div>
              ) : null}
              {/* Пустой результат */}
              {!result && !creditResult && (
                <div className="calculator-empty">
                                    <img
                    src="/icons/rashet.png"
                    alt={currentLanguage === 'RU' ? 'Эмблема расчёта' : 'Есептеу эмблемасы'}
                    className="calculator-empty-icon"
                  />
                <p className="calculator-empty-text">
                  {currentLanguage === 'RU' 
                    ? 'Введите параметры для расчета стоимости золота и залогового кредита' 
                    : 'Алтының құнын және залог несие сомасын есептеу үшін параметрлерді енгізіңіз'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="calculator-card">
                      <h3 className="calculator-card-title">
              <div className="calculator-card-icon">
                <img src="/icons/vazninfa.png" alt={currentLanguage === 'RU' ? 'Важная информация' : 'Маңызды ақпарат'} />
              </div>
              {currentLanguage === 'RU' ? 'Важная информация' : 'Маңызды ақпарат'}
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: '14px', 
              marginBottom: '20px', 
              lineHeight: '1.5',
              textAlign: 'center'
            }}>
              {currentLanguage === 'RU' 
                ? 'Условия залогового кредита и требования к золоту' 
                : 'Залог несие шарттары және алтыға қойылатын талаптар'
              }
            </p>
          <div className="calculator-info-grid">
            <div className="calculator-info-item">
              <h4 className="calculator-info-title">
                <span className="calculator-info-icon">
                  <img
                    src="/icons/yslovia.png"
                    alt={currentLanguage === 'RU' ? 'Иконка условий' : 'Шарттар белгішесі'}
                  />
                </span>
                {currentLanguage === 'RU' ? 'Условия займа' : 'Несие шарттары'}
              </h4>
              <ul className="calculator-info-list">
                <li>{currentLanguage === 'RU' ? 'Минимальный срок' : 'Минималды мерзім'} <strong>30 {currentLanguage === 'RU' ? 'дней' : 'күн'}</strong></li>
                <li>{currentLanguage === 'RU' ? 'Максимальный срок' : 'Максималды мерзім'} <strong>12 {currentLanguage === 'RU' ? 'месяцев' : 'ай'}</strong></li>
                <li>{currentLanguage === 'RU' ? 'Процентная ставка' : 'Пайыздық мөлшерлеме'} <strong>2-3% {currentLanguage === 'RU' ? 'в месяц' : 'айына'}</strong></li>
                <li>{currentLanguage === 'RU' ? 'Досрочное погашение' : 'Ерте өтеу'}</li>
              </ul>
            </div>
            <div className="calculator-info-item">
              <h4 className="calculator-info-title">
                <span className="calculator-info-icon">
                  <img
                    src="/icons/lupa4.png"
                    alt={currentLanguage === 'RU' ? 'Иконка поиска' : 'Іздеу белгішесі'}
                  />
                </span>
                {currentLanguage === 'RU' ? 'Требования к золоту' : 'Алтынға қойылатын талаптар'}
              </h4>
              <ul className="calculator-info-list">
                <li>{currentLanguage === 'RU' ? 'Проба золота' : 'Алтын сынауы'} <strong>585, 750, 916, 999</strong> {currentLanguage === 'RU' ? 'пробы' : 'сынау'}</li>
                <li>{currentLanguage === 'RU' ? 'Проверка подлинности' : 'Шынайылығын тексеру'}</li>
                <li>{currentLanguage === 'RU' ? 'Оценка в день обращения' : 'Жүгірту күні бағалау'}</li>
                <li>{currentLanguage === 'RU' ? 'Ежедневное обновление цен' : 'Күнделікті баға жаңарту'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="calculator-footer">
          <div className="calculator-footer-content">
            <div className="calculator-footer-logo">
              <div className="calculator-footer-logo-inner">
                <div className="calculator-footer-logo-img">
                  <img
                    src="/icons/almaz.png"
                    alt="Алмаз АЛКА ЛОМБАРД"
                    width="35"
                    height="35"
                  />
                </div>
                <div className="calculator-footer-logo-text">
                  <div className="calculator-footer-logo-title">АЛҚА</div>
                  <div className="calculator-footer-logo-subtitle">ЛОМБАРД</div>
                </div>
              </div>
            </div>
            <div className="calculator-footer-info">
              <div className="calculator-footer-icon">
                <img
                  src="/icons/lampa.png"
                  alt="Лампа"
                />
              </div>
              <p className="calculator-footer-text">
                {currentLanguage === 'RU' 
                  ? 'Калькулятор показывает приблизительные расчеты. Для точной оценки посетите наш ломбард' 
                  : 'Калькулятор шамамен есептеулерді көрсетеді. Дәл бағалау үшін ломбардымызға келіңіз'
                }
              </p>
            </div>
            <div className="calculator-footer-info">
              <div className="calculator-footer-icon">
                <img
                  src="/icons/telephone1.png"
                  alt="Телефон"
                />
              </div>
              <p className="calculator-footer-text">
                {currentLanguage === 'RU' 
                  ? 'Свяжитесь с нами для получения дополнительной информации о залоговых кредитах' 
                  : 'Залог несиелері туралы қосымша ақпарат алу үшін бізбен хабарласыңыз'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator