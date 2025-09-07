import { useEffect, useMemo, useState } from 'react'
import { FaUniversity, FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { HiAcademicCap } from 'react-icons/hi2'
import { AiOutlineSafety } from 'react-icons/ai'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'

// Data: ICDL Modules
const MODULES = [
  { code: 'COM', title: 'Computer Essentials', fee: 5000, description: 'Fundamentals of computer hardware, software, and file management.' },
  { code: 'OFL', title: 'Online Essentials', fee: 5000, description: 'Web browsing, online safety, and effective search strategies.' },
  { code: 'WPP', title: 'Word Processing', fee: 6000, description: 'Create professional documents with styles, layouts, and references.' },
  { code: 'SSP', title: 'Spreadsheets', fee: 6000, description: 'Data entry, formulas, charts, and essential analysis techniques.' },
  { code: 'PPT', title: 'Presentation', fee: 6000, description: 'Build engaging slides with visuals, animations, and delivery tips.' },
  { code: 'DBS', title: 'Databases', fee: 7000, description: 'Design, query, and manage databases using practical workflows.' },
  { code: 'ITC', title: 'IT Security', fee: 6000, description: 'Stay safe online—best practices for devices, data, and networks.' },
  { code: 'PCM', title: 'Project Planning', fee: 7000, description: 'Plan, schedule, and monitor projects with modern tools.' },
]

// Reusable: Module Card
function ModuleCard({ code, title, description, fee, onAction }) {
  return (
    <div className="card h-full p-5 flex flex-col">
      <div className="mb-3 text-xs font-semibold text-buk-light">ICDL • {code}</div>
      <h3 className="text-lg font-semibold text-buk">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 flex-1">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Fee: ₦{fee.toLocaleString()}</span>
        {onAction && (
          <button className="btn btn-outline focus-ring text-sm" onClick={onAction}>Enroll</button>
        )}
      </div>
    </div>
  )
}

// Reusable: FAQ Item
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-buk">{q}</span>
        <span className="ml-4 text-buk-light">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="mt-2 text-sm text-gray-700">{a}</p>}
    </div>
  )
}

// Header with sticky nav and mobile menu
function Header({ active, onNavigate }) {
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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <button
          className="flex items-center gap-2 text-buk focus-ring"
          onClick={() => goto('home')}
          aria-label="BUK ICDL Home"
        >
          <FaUniversity className="h-6 w-6" />
          <span className="text-base font-semibold tracking-tight">BUK ICDL</span>
        </button>

        {/* Desktop nav */}
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

        {/* Mobile toggle */}
        <button className="md:hidden text-buk focus-ring" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
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

// Footer
function Footer({ onNavigate }) {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-buk">
            <FaUniversity className="h-6 w-6" />
            <span className="text-base font-semibold">BUK ICDL</span>
          </div>
          <p className="mt-3 text-sm text-gray-700">Bayero University, Kano — ICDL Accredited Test Centre.</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-buk">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {['home','courses','register','schedule','faq','contact'].map((k) => (
              <li key={k}>
                <button onClick={() => onNavigate(k)} className="text-gray-700 hover:text-buk">{k[0].toUpperCase()+k.slice(1)}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-buk">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><FaMapMarkerAlt className="mt-0.5" /> New Campus, Kano, Nigeria</li>
            <li className="flex items-center gap-2"><FaPhoneAlt /> +234 (0) 800-000-0000</li>
            <li className="flex items-center gap-2"><FaEnvelope /> icdl@buk.edu.ng</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-buk">Office Hours</h4>
          <p className="mt-3 text-sm text-gray-700">Mon–Fri: 9:00am – 4:00pm<br/>Sat: 10:00am – 2:00pm</p>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} BUK ICDL. All rights reserved.
      </div>
    </footer>
  )
}

// Pages
function HomePage({ onNavigate }) {
  const preview = useMemo(() => MODULES.slice(0, 4), [])
  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--buk) 0%, var(--buk-90) 100%)' }}>
        <div className="container py-16 sm:py-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Get Certified with ICDL at Bayero University, Kano</h1>
            <p className="mt-3 text-white/90 text-sm sm:text-base">Build globally recognized digital skills. Learn, practice, and certify at our ICDL Accredited Test Centre.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('register')} className="btn btn-light focus-ring bg-white text-buk hover:bg-white/90">Register Now</button>
              <button onClick={() => onNavigate('courses')} className="btn btn-outline focus-ring border-white text-white hover:bg-white/10">View Courses</button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose BUK */}
      <section className="container py-12">
        <h2 className="text-xl font-semibold text-buk">Why Choose BUK?</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6">
            <HiAcademicCap className="h-8 w-8 text-buk-light" />
            <h3 className="mt-3 font-semibold text-buk">Accredited Centre</h3>
            <p className="mt-1 text-sm text-gray-700">Official ICDL testing and training with certified instructors.</p>
          </div>
          <div className="card p-6">
            <AiOutlineSafety className="h-8 w-8 text-buk-light" />
            <h3 className="mt-3 font-semibold text-buk">Global Standard</h3>
            <p className="mt-1 text-sm text-gray-700">ICDL is recognized worldwide across academia and industry.</p>
          </div>
          <div className="card p-6">
            <RiMoneyDollarCircleLine className="h-8 w-8 text-buk-light" />
            <h3 className="mt-3 font-semibold text-buk">Flexible & Affordable</h3>
            <p className="mt-1 text-sm text-gray-700">Study and test on your schedule with student-friendly fees.</p>
          </div>
        </div>
      </section>

      {/* Module preview */}
      <section className="container py-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-buk">Core Modules</h2>
          <button onClick={() => onNavigate('courses')} className="text-sm text-buk-light hover:underline">See all</button>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map(m => (
            <ModuleCard key={m.code} {...m} onAction={() => onNavigate('register')} />
          ))}
        </div>
      </section>
    </main>
  )
}

function CoursesPage({ onNavigate }) {
  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold text-buk">ICDL Modules</h1>
      <p className="mt-2 text-sm text-gray-700">Choose from the full suite of ICDL modules. Fees are per module.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m) => (
          <ModuleCard key={m.code} {...m} onAction={() => onNavigate('register')} />
        ))}
      </div>
    </main>
  )
}

function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    preferredDate: '',
    notes: '',
    agree: false,
  })
  const [status, setStatus] = useState({ type: '', msg: '' })

  function update(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function submit(e) {
    e.preventDefault()
    setStatus({ type: '', msg: '' })
    // Basic validation
    if (!form.fullName || !form.email || !form.program || !form.agree) {
      setStatus({ type: 'error', msg: 'Please complete required fields and accept the terms.' })
      return
    }
    // Simulate submission
    console.log('ICDL Registration:', form)
    setStatus({ type: 'success', msg: 'Registration submitted! We will contact you shortly.' })
    setForm({ fullName: '', email: '', phone: '', program: '', preferredDate: '', notes: '', agree: false })
  }

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold text-buk">Register for ICDL</h1>
      <p className="mt-2 text-sm text-gray-700">Complete the form to begin your ICDL journey. A coordinator will reach out with next steps.</p>

      {status.msg && (
        <div className={`mt-4 rounded-md border p-3 text-sm ${status.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
          {status.msg}
        </div>
      )}

      <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input name="fullName" value={form.fullName} onChange={update} className="focus-ring mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="e.g., Aisha Musa" />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input type="email" name="email" value={form.email} onChange={update} className="focus-ring mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="you@example.com" />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input name="phone" value={form.phone} onChange={update} className="focus-ring mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="+234..." />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Program *</label>
          <select name="program" value={form.program} onChange={update} className="focus-ring mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="">Select a module</option>
            {MODULES.map((m) => (
              <option key={m.code} value={m.code}>{m.title} ({m.code})</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
          <input type="date" name="preferredDate" value={form.preferredDate} onChange={update} className="focus-ring mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea name="notes" value={form.notes} onChange={update} rows={4} className="focus-ring mt-1 w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Any questions or special requests" />
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input id="agree" type="checkbox" name="agree" checked={form.agree} onChange={update} className="h-4 w-4 accent-buk" />
          <label htmlFor="agree" className="text-sm text-gray-700">I agree to the processing of my data for registration purposes. *</label>
        </div>
        <div className="md:col-span-2">
          <button className="btn btn-primary focus-ring">Submit Registration</button>
        </div>
      </form>
    </main>
  )
}

function AboutPage() {
  return (
    <main className="container prose prose-sm max-w-none py-10 prose-headings:text-buk prose-a:text-buk-light">
      <h1 className="text-2xl font-semibold text-buk not-prose">About BUK ICDL</h1>
      <p>
        Bayero University, Kano (BUK) is proud to host an ICDL Accredited Test Centre, enabling students, staff,
        and the wider community to develop and certify essential digital skills aligned with international standards.
      </p>
      <p>
        ICDL (International Computer Driving Licence) certifies practical competencies in common computer applications
        and digital literacy. Through BUK’s centre, candidates access quality training, practice tests, and official
        certification under supportive guidance.
      </p>
      <p>
        Whether you’re strengthening your CV or enhancing workplace productivity, ICDL provides a structured path
        to recognition and success in today’s digital world.
      </p>
    </main>
  )
}

function SchedulePage() {
  const schedule = [
    { date: '2025-09-15', time: '10:00', module: 'Computer Essentials', venue: 'ICT Lab A' },
    { date: '2025-09-22', time: '10:00', module: 'Spreadsheets', venue: 'ICT Lab B' },
    { date: '2025-10-06', time: '10:00', module: 'Presentation', venue: 'ICT Lab A' },
  ]
  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold text-buk">Upcoming Test Schedule</h1>
      <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
        <table className="table min-w-[600px]">
          <thead>
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Module</th>
              <th className="p-3">Venue</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 text-sm text-gray-700">{s.date}</td>
                <td className="p-3 text-sm text-gray-700">{s.time}</td>
                <td className="p-3 text-sm text-gray-700">{s.module}</td>
                <td className="p-3 text-sm text-gray-700">{s.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

function FaqPage() {
  const faqs = [
    { q: 'What is ICDL?', a: 'ICDL is an internationally recognized certification of digital skills and competencies.' },
    { q: 'Who can register?', a: 'Students, staff, and the general public are welcome to register.' },
    { q: 'How do I prepare?', a: 'We provide training resources and practice materials before your test date.' },
    { q: 'Where is the centre located?', a: 'At BUK’s ICT complex. Exact lab will be communicated after registration.' },
  ]
  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold text-buk">Frequently Asked Questions</h1>
      <div className="mt-4 divide-y divide-gray-200">
        {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
      </div>
    </main>
  )
}

function ContactPage() {
  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold text-buk">Contact Us</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 text-sm text-gray-700">
          <p className="flex items-start gap-2"><FaMapMarkerAlt className="mt-0.5 text-buk-light" /> New Campus, Kano, Nigeria</p>
          <p className="flex items-center gap-2"><FaPhoneAlt className="text-buk-light" /> +234 (0) 800-000-0000</p>
          <p className="flex items-center gap-2"><FaEnvelope className="text-buk-light" /> icdl@buk.edu.ng</p>
          <p>For inquiries about schedules or registration, send us an email with your details.</p>
        </div>
        <div>
          <div className="card h-64 w-full overflow-hidden">
            {/* Map placeholder */}
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">Map Placeholder</div>
          </div>
        </div>
      </div>
    </main>
  )
}

// Root App
export default function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    // Optional: sync with hash for direct linking
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
