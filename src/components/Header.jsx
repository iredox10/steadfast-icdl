import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Header({ active, onNavigate }) {
  const [open, setOpen] = useState(false)
  const links = [
    { key: 'home', label: 'Home' },
    { key: 'courses', label: 'Courses' },
    { key: 'register', label: 'Register' },
    { key: 'about', label: 'About' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'faq', label: 'FAQ' },
    { key: 'contact', label: 'Contact' },
  ]

  function goto(key) {
    onNavigate(key)
    setOpen(false)
  }

  // no header rotator — hero handles rotating images

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <button
          className="flex items-center gap-3 text-buk focus-ring"
          onClick={() => goto('home')}
          aria-label="BUK ICDL Home"
        >
          <img src="/buk-logo.png" alt="Bayero University Kano logo" className="h-8 w-auto" loading="eager" />
          <span className="hidden h-6 w-px bg-gray-300 sm:inline-block" />
          <img src="/icdl.jpeg" alt="ICDL logo" className="hidden h-7 w-auto sm:inline-block" loading="eager" />
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => goto(l.key)}
              className={`text-sm transition-colors hover:text-buk ${active === l.key ? 'text-buk font-semibold' : 'text-gray-700'}`}
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => goto('register')} className="btn btn-primary focus-ring hidden lg:inline-flex">Register</button>
        </nav>

        <button className="md:hidden text-buk focus-ring" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container py-2">
            <div className="grid gap-1 py-2">
              {links.map((l) => (
                <button
                  key={l.key}
                  onClick={() => goto(l.key)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm ${active === l.key ? 'bg-buk-10 text-buk' : 'hover:bg-gray-50'}`}
                >
                  {l.label}
                </button>
              ))}
              <button onClick={() => goto('register')} className="btn btn-primary focus-ring mt-2">Register</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
