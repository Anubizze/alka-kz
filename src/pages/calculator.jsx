import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { t } from '../utils/translations'
import Image from '../components/Image'
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
    <div className="calculator-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px 0',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div className="calculator-container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div className="calculator-wrapper" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Header */}
          <div className="calculator-header" style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '10px'
            }}>
              {currentLanguage === 'RU' ? 'Калькулятор залогового кредита' : 'Залог несие калькуляторы'}
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              {currentLanguage === 'RU' 
                ? 'Рассчитайте стоимость золота и сумму залогового кредита' 
                : 'Алтынның құнын және залог несие сомасын есептеңіз'
              }
            </p>
          </div>

          <div className="calculator-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Input Section */}
            <div className="calculator-card" style={{
              background: '#ffffff',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease'
            }}>
              <h2 className="calculator-card-title" style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div className="calculator-card-icon" style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image src="/icons/nastr.png" alt="Параметры" />
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
                    inputMode="decimal"
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
                      type="button"
                      aria-label={`${purityKey} проба золота`}
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
                  aria-describedby="loanPercentageDesc"
                />
                <label htmlFor="loanPercentageToggle">
                  {t('calculateLoanToggle', currentLanguage)}
                </label>
                <div id="loanPercentageDesc" style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginTop: '5px',
                  fontStyle: 'italic'
                }}>
                  {currentLanguage === 'RU' 
                    ? 'Включите для расчета суммы займа' 
                    : 'Несие сомасын есептеу үшін қосыңыз'
                  }
                </div>
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
                      aria-label={`Процент займа: ${loanPercentage}%`}
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
                  aria-describedby="creditDesc"
                />
                <label htmlFor="creditToggle">
                  {t('calculateCreditToggle', currentLanguage)}
                </label>
                <div id="creditDesc" style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginTop: '5px',
                  fontStyle: 'italic'
                }}>
                  {currentLanguage === 'RU' 
                    ? 'Включите для расчета кредитных платежей' 
                    : 'Несие төлемдерін есептеу үшін қосыңыз'
                  }
                </div>
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
                    aria-label={`Срок кредита: ${creditMonths} месяцев`}
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
                    aria-label={`Месячная ставка: ${monthlyRate}%`}
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
            <div className="calculator-card" style={{
              background: '#ffffff',
              borderRadius: '15px',
              padding: 'clamp(20px, 4vw, 30px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease'
            }}>
              <h2 className="calculator-card-title" style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div className="calculator-card-icon" style={{
                  width: 'clamp(20px, 4vw, 24px)',
                  height: 'clamp(20px, 4vw, 24px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image src="/icons/money.png" alt={t('resultTitle', currentLanguage)} />
                </div>
                {t('resultTitle', currentLanguage)}
              </h2>
              <p style={{ 
                color: '#666', 
                fontSize: 'clamp(0.75rem, 2vw, 14px)', 
                marginBottom: '20px', 
                lineHeight: '1.5',
                textAlign: 'center'
              }}>
                {t('calculatorNote', currentLanguage)}
              </p>
              {/* Залоговый результат */}
              {!showCredit && result ? (
                <div>
                  <div className="calculator-result-item" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'clamp(10px, 2.5vw, 12px) 0',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <div className="calculator-result-label" style={{
                      fontSize: 'clamp(0.75rem, 2.5vw, 14px)',
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>{currentLanguage === 'RU' ? 'Цена за грамм' : 'Граммға баға'}</div>
                    <div className="calculator-result-value" style={{
                      fontSize: 'clamp(0.875rem, 2.5vw, 16px)',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {result.pricePerGram.toLocaleString()} ₸
                    </div>
                  </div>
                  <div className="calculator-result-item highlight" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'clamp(10px, 2.5vw, 12px) 0',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    padding: 'clamp(10px, 2.5vw, 12px)',
                    margin: '8px 0'
                  }}>
                    <div className="calculator-result-label" style={{
                      fontSize: 'clamp(0.75rem, 2.5vw, 14px)',
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>{currentLanguage === 'RU' ? 'Общая стоимость' : 'Жалпы құн'}</div>
                    <div className="calculator-result-value" style={{
                      fontSize: 'clamp(0.875rem, 2.5vw, 16px)',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {parseInt(result.totalValue).toLocaleString()} ₸
                    </div>
                  </div>
                  {showSlider && (
                    <div className="calculator-result-item primary" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'clamp(10px, 2.5vw, 12px) 0',
                      borderBottom: '1px solid #e5e7eb',
                      backgroundColor: '#dbeafe',
                      borderRadius: '8px',
                      padding: 'clamp(10px, 2.5vw, 12px)',
                      margin: '8px 0'
                    }}>
                      <div className="calculator-result-label" style={{
                        fontSize: 'clamp(0.75rem, 2.5vw, 14px)',
                        color: '#1e40af',
                        fontWeight: '600'
                      }}>{currentLanguage === 'RU' ? 'Сумма займа' : 'Несие сомасы'}</div>
                      <div className="calculator-result-value large" style={{
                        fontSize: 'clamp(1rem, 3vw, 18px)',
                        fontWeight: '700',
                        color: '#1e40af'
                      }}>
                        {parseInt(result.loanAmount).toLocaleString()} ₸
                      </div>
                    </div>
                  )}
                  {showSlider && (
                    <div className="calculator-result-item" style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 'clamp(6px, 2vw, 8px) 0',
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      color: '#6b7280',
                      fontStyle: 'italic'
                    }}>
                      <Image src="/icons/vazninfa.png" alt={currentLanguage === 'RU' ? 'Эмблема' : 'Эмблема'} style={{ 
                        width: 'clamp(14px, 3vw, 16px)', 
                        height: 'clamp(14px, 3vw, 16px)', 
                        marginRight: '8px' 
                      }} />
                      {currentLanguage === 'RU' ? 'Сумма займа составляет' : 'Несие сомасы'} <span style={{ fontWeight: 'bold' }}>{loanPercentage}%</span> {currentLanguage === 'RU' ? 'от рыночной стоимости' : 'нарықтық құннан'}
                    </div>
                  )}
                </div>
              ) : null}
              {/* Кредитный результат */}
              {showCredit && creditResult ? (
                <div>
                  <div className="calculator-result-item" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'clamp(10px, 2.5vw, 12px) 0',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <div className="calculator-result-label" style={{
                      fontSize: 'clamp(0.75rem, 2.5vw, 14px)',
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>{currentLanguage === 'RU' ? 'Сумма кредита' : 'Несие сомасы'}</div>
                    <div className="calculator-result-value" style={{
                      fontSize: 'clamp(0.875rem, 2.5vw, 16px)',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {parseInt(creditResult.principal).toLocaleString()} ₸
                    </div>
                  </div>
                  <div className="calculator-result-item highlight" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'clamp(10px, 2.5vw, 12px) 0',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    padding: 'clamp(10px, 2.5vw, 12px)',
                    margin: '8px 0'
                  }}>
                    <div className="calculator-result-label" style={{
                      fontSize: 'clamp(0.75rem, 2.5vw, 14px)',
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>{currentLanguage === 'RU' ? 'Ежемесячный платеж' : 'Айлық төлем'}</div>
                    <div className="calculator-result-value" style={{
                      fontSize: 'clamp(0.875rem, 2.5vw, 16px)',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {parseInt(creditResult.monthlyPayment).toLocaleString()} ₸
                    </div>
                  </div>
                  <div className="calculator-result-item primary" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'clamp(10px, 2.5vw, 12px) 0',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#dbeafe',
                    borderRadius: '8px',
                    padding: 'clamp(10px, 2.5vw, 12px)',
                    margin: '8px 0'
                  }}>
                    <div className="calculator-result-label" style={{
                      fontSize: 'clamp(0.75rem, 2.5vw, 14px)',
                      color: '#1e40af',
                      fontWeight: '600'
                    }}>{currentLanguage === 'RU' ? 'Срок кредита' : 'Несие мерзімі'}</div>
                    <div className="calculator-result-value large" style={{
                      fontSize: 'clamp(1rem, 3vw, 18px)',
                      fontWeight: '700',
                      color: '#1e40af'
                    }}>
                      {creditResult.months} {currentLanguage === 'RU' ? 'месяцев' : 'ай'}
                    </div>
                  </div>
                  <div className="calculator-result-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'clamp(6px, 2vw, 8px) 0',
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    color: '#6b7280',
                    fontStyle: 'italic'
                  }}>
                    <Image src="/icons/vazninfa.png" alt={currentLanguage === 'RU' ? 'Эмблема' : 'Эмблема'} style={{ 
                      width: 'clamp(14px, 3vw, 16px)', 
                      height: 'clamp(14px, 3vw, 16px)', 
                      marginRight: '8px' 
                    }} />
                    {currentLanguage === 'RU' ? 'Месячная ставка' : 'Айлық мөлшерлеме'} <span style={{ fontWeight: 'bold' }}>{creditResult.rate}%</span>
                  </div>
                </div>
              ) : null}
              {/* Пустой результат */}
              {!result && !creditResult && (
                <div className="calculator-empty" style={{
                  textAlign: 'center',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem) 0'
                }}>
                  <Image
                    src="/icons/rashet.png"
                    alt={currentLanguage === 'RU' ? 'Эмблема расчёта' : 'Есептеу эмблемасы'}
                    className="calculator-empty-icon"
                    style={{
                      width: 'clamp(32px, 8vw, 64px)',
                      height: 'clamp(32px, 8vw, 64px)',
                      margin: '0 auto clamp(8px, 2vw, 12px)',
                      display: 'block'
                    }}
                  />
                  <p className="calculator-empty-text" style={{
                    color: '#9ca3af',
                    fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                    padding: '0 clamp(8px, 2vw, 10px)',
                    lineHeight: '1.4'
                  }}>
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
          <div className="calculator-card" style={{
            background: '#ffffff',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.3s ease'
          }}>
            <h3 className="calculator-card-title" style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div className="calculator-card-icon" style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image src="/icons/vazninfa.png" alt={currentLanguage === 'RU' ? 'Важная информация' : 'Маңызды ақпарат'} />
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
                : 'Залог несие шарттары және алтынға қойылатын талаптар'
              }
            </p>
            <div className="calculator-info-grid">
              <div className="calculator-info-item">
                <h4 className="calculator-info-title">
                  <span className="calculator-info-icon">
                    <Image
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
                    <Image
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
          <div className="calculator-footer-content" style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid #e5e7eb'
          }}>
            <div className="calculator-footer-logo">
              <div className="calculator-footer-logo-inner" style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                borderRadius: '8px',
                padding: '8px',
                border: '1px solid #d1d5db'
              }}>
                <div className="calculator-footer-logo-img" style={{ marginRight: '8px' }}>
                  <Image
                    src="/icons/almaz.png"
                    alt="Алмаз АЛКА ЛОМБАРД"
                    width="35"
                    height="35"
                  />
                </div>
                <div className="calculator-footer-logo-text" style={{ textAlign: 'left' }}>
                  <div className="calculator-footer-logo-title" style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#374151',
                    lineHeight: '1.2'
                  }}>АЛҚА</div>
                  <div className="calculator-footer-logo-subtitle" style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    lineHeight: '1.2'
                  }}>ЛОМБАРД</div>
                </div>
              </div>
            </div>
            <div className="calculator-footer-info" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <div className="calculator-footer-icon" style={{
                width: '20px',
                height: '20px',
                background: '#e5e7eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}>
                <Image
                  src="/icons/lampa.png"
                  alt="Лампа"
                />
              </div>
              <p className="calculator-footer-text" style={{
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                {currentLanguage === 'RU' 
                  ? 'Калькулятор показывает приблизительные расчеты. Для точной оценки посетите наш ломбард' 
                  : 'Калькулятор шамамен есептеулерді көрсетеді. Дәл бағалау үшін ломбардымызға келіңіз'
                }
              </p>
            </div>
            <div className="calculator-footer-info" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <div className="calculator-footer-icon" style={{
                width: '20px',
                height: '20px',
                background: '#e5e7eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}>
                <Image
                  src="/icons/telephone1.png"
                  alt="Телефон"
                />
              </div>
              <p className="calculator-footer-text" style={{
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
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