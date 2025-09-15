import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import LombardNavigation from './components/LombardNavigation'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Home from './pages/Home'
import About from './pages/About'
import Organizations from './pages/Organizations'
import Contacts from './pages/Contacts'
import Damu from './pages/Damu'
import DamuLeasing from './pages/DamuLeasing'
import NurlyZher from './pages/NurlyZher'
import ServicePage from './pages/ServicePage'
import LombardAlka from './pages/LombardAlka'
import LombardServices from './pages/LombardServices'
import LombardRates from './pages/LombardRates'
import LombardContacts from './pages/LombardContacts'
import LombardCompany from './pages/LombardCompany'
import LombardNews from './pages/LombardNews'
import NewsDetail from './pages/NewsDetail'
import Calculator from './pages/calculator'
import AdminPanel from './pages/AdminPanel'
import HomeAdminPanel from './components/HomeAdminPanel'
import CalculatorAdminManager from './components/CalculatorAdminManager'
import CalculatorAdminAuth from './components/CalculatorAdminAuth'
import './styles/App.css'
import './styles/mobile-enhancements.css'

// Компонент для условного отображения навигации
const ConditionalNavigation = () => {
  const location = useLocation()
  const isLombardPage = location.pathname.startsWith('/lombard')
  const isCalculatorPage = location.pathname === '/calculator'
  const isCalculatorAdminPage = location.pathname.startsWith('/calculator/admin')
  
  if (isCalculatorPage || isCalculatorAdminPage) {
    return <LombardNavigation /> // Показываем ломбард навигацию для калькулятора и его админ-панели
  }
  
  return isLombardPage ? <LombardNavigation /> : <Header />
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Имитация загрузки приложения
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="app-loader">
        <Loader size="large" className="center" />
      </div>
    )
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <ConditionalNavigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/services/damu" element={<Damu />} />
              <Route path="/services/damu-leasing" element={<DamuLeasing />} />
              <Route path="/services/nurly-zher" element={<NurlyZher />} />
              <Route path="/services/:serviceName" element={<ServicePage />} />
              <Route path="/lombard" element={<LombardAlka />} />
              <Route path="/lombard/company" element={<LombardCompany />} />
              <Route path="/lombard/services" element={<LombardServices />} />
              <Route path="/lombard/news" element={<LombardNews />} />
              <Route path="/lombard/news/:id" element={<NewsDetail />} />
              <Route path="/lombard/contacts" element={<LombardContacts />} />
              <Route path="/lombard/rates" element={<LombardRates />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/lombard/admin" element={<AdminPanel />} />
              <Route path="/admin" element={<HomeAdminPanel />} />
              <Route path="/calculator/admin/auth" element={<CalculatorAdminAuth />} />
              <Route path="/calculator/admin" element={<CalculatorAdminManager />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
