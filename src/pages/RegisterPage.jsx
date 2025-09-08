import { useState } from 'react'
import { MODULES } from '../data/modules'

export default function RegisterPage() {
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
    if (!form.fullName || !form.email || !form.program || !form.agree) {
      setStatus({ type: 'error', msg: 'Please complete required fields and accept the terms.' })
      return
    }
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
