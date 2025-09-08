import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function ContactPage() {
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
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">Map Placeholder</div>
          </div>
        </div>
      </div>
    </main>
  )
}
