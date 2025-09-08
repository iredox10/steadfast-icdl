import { useMemo, useState } from 'react'
import { MODULES } from '../data/modules'
import { SCHEDULE, getActiveMonths, getModulesForMonth } from '../data/schedule'

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

  // Build active month options from schedule
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const years = useMemo(() => {
    const set = new Set(SCHEDULE.map(s => new Date(s.date).getFullYear()))
    return Array.from(set).sort((a,b) => a - b)
  }, [])
  const defaultYear = years.includes(new Date().getFullYear()) ? new Date().getFullYear() : years[0]
  const [year, setYear] = useState(defaultYear)
  const activeMonthEntries = useMemo(() => getActiveMonths(SCHEDULE, year), [year])
  const activeMonths = activeMonthEntries.map(e => e.month)
  const [preferredMonth, setPreferredMonth] = useState('')

  function update(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function submit(e) {
    e.preventDefault()
    setStatus({ type: '', msg: '' })
    if (!form.fullName || !form.email || !form.program || !preferredMonth || !form.agree) {
      setStatus({ type: 'error', msg: 'Please complete required fields and accept the terms.' })
      return
    }
    const payload = {
      ...form,
      preferredMonth: preferredMonth !== '' ? `${months[Number(preferredMonth)]} ${year}` : '',
    }
    console.log('ICDL Registration:', payload)
    setStatus({ type: 'success', msg: 'Registration submitted! We will contact you shortly.' })
    setForm({ fullName: '', email: '', phone: '', program: '', preferredDate: '', notes: '', agree: false })
    setPreferredMonth('')
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
          <label className="block text-sm font-medium text-gray-700">Preferred Month *</label>
          <div className="mt-1 flex items-center gap-2">
            <button type="button" className="btn btn-outline focus-ring text-sm" onClick={() => setYear(y => years[Math.max(0, years.indexOf(y) - 1)])} disabled={years.indexOf(year) === 0}>Prev</button>
            <span className="min-w-[4rem] text-center font-medium text-buk">{year}</span>
            <button type="button" className="btn btn-outline focus-ring text-sm" onClick={() => setYear(y => years[Math.min(years.length - 1, years.indexOf(y) + 1)])} disabled={years.indexOf(year) === years.length - 1}>Next</button>
          </div>
          <select
            name="preferredMonth"
            value={preferredMonth}
            onChange={(e) => { setPreferredMonth(e.target.value); setForm(f => ({ ...f, program: '' })) }}
            className="focus-ring mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Select a month</option>
            {activeMonths.map((m) => (
              <option key={m} value={m}>{months[m]} {year}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Program *</label>
          <select name="program" value={form.program} onChange={update} className="focus-ring mt-1 w-full rounded-md border border-gray-300 px-3 py-2" disabled={preferredMonth === ''}>
            <option value="">{preferredMonth === '' ? 'Select a month first' : 'Select a module'}</option>
            {preferredMonth !== '' && (
              getModulesForMonth(SCHEDULE, year, Number(preferredMonth))
                .map(code => MODULES.find(m => m.code === code))
                .filter(Boolean)
                .map(m => (
                  <option key={m.code} value={m.code}>{m.title} ({m.code})</option>
                ))
            )}
          </select>
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
