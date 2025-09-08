import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import RegisterPage from './pages/RegisterPage'
import AboutPage from './pages/AboutPage'
import SchedulePage from './pages/SchedulePage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '')
    if (fromHash) setActive(fromHash)
    const onHashChange = () => setActive(window.location.hash.replace('#', '') || 'home')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    window.location.hash = active
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [active])

  function renderPage() {
    switch (active) {
      case 'courses': return <CoursesPage onNavigate={setActive} />
      case 'register': return <RegisterPage />
      case 'about': return <AboutPage />
      case 'schedule': return <SchedulePage />
      case 'faq': return <FaqPage />
      case 'contact': return <ContactPage />
      case 'home':
      default: return <HomePage onNavigate={setActive} />
    }
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header active={active} onNavigate={setActive} />
      <div className="flex-1">{renderPage()}</div>
      <Footer onNavigate={setActive} />
    </div>
  )
}
