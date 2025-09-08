import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import RegisterPage from './pages/RegisterPage'
import AboutPage from './pages/AboutPage'
import SchedulePage from './pages/SchedulePage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export default function App() {
  const location = useLocation()
  useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Page>
                  <HomePage />
                </Page>
              }
            />
            <Route
              path="/courses"
              element={
                <Page>
                  <CoursesPage />
                </Page>
              }
            />
            <Route
              path="/register"
              element={
                <Page>
                  <RegisterPage />
                </Page>
              }
            />
            <Route
              path="/about"
              element={
                <Page>
                  <AboutPage />
                </Page>
              }
            />
            <Route
              path="/schedule"
              element={
                <Page>
                  <SchedulePage />
                </Page>
              }
            />
            <Route
              path="/faq"
              element={
                <Page>
                  <FaqPage />
                </Page>
              }
            />
            <Route
              path="/contact"
              element={
                <Page>
                  <ContactPage />
                </Page>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
