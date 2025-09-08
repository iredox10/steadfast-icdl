import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ]

  function closeMenu() { setOpen(false) }

  // no header rotator — hero handles rotating images

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-buk focus-ring" aria-label="BUK ICDL Home" onClick={closeMenu}>
          <img src="/buk-logo.png" alt="Bayero University Kano logo" className="h-8 w-auto" loading="eager" />
          <span className="h-6 w-px bg-gray-300" />
          <img src="/icdl.jpeg" alt="ICDL logo" className="h-7 w-auto" loading="eager" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={closeMenu}
              className={({ isActive }) => `text-sm transition-colors hover:text-buk ${isActive ? 'text-buk font-semibold' : 'text-gray-700'}`}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/register" className="btn btn-primary focus-ring hidden lg:inline-flex">Register</Link>
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
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={closeMenu}
                  className={({ isActive }) => `w-full rounded-md px-3 py-2 text-left text-sm ${isActive ? 'bg-buk-10 text-buk' : 'hover:bg-gray-50'}`}
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/register" className="btn btn-primary focus-ring mt-2" onClick={closeMenu}>Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
