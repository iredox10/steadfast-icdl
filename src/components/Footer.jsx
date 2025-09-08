import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 text-buk">
            <img src="/buk-logo.png" alt="BUK" className="h-8 w-auto" />
            <span className="hidden h-6 w-px bg-gray-300 sm:inline-block" />
            <img src="/icdl.jpeg" alt="ICDL" className="hidden h-7 w-auto sm:inline-block" />
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
