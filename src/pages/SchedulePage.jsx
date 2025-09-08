import { useMemo, useState } from 'react'
import { SCHEDULE as schedule } from '../data/schedule'

export default function SchedulePage() {

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  const years = useMemo(() => {
    const set = new Set(schedule.map(s => new Date(s.date).getFullYear()))
    return Array.from(set).sort((a,b) => a - b)
  }, [schedule])

  const defaultYear = years.includes(new Date().getFullYear()) ? new Date().getFullYear() : years[0]
  const [year, setYear] = useState(defaultYear)
  const [selectedMonth, setSelectedMonth] = useState(null) // 0-11 or null

  const eventsByMonth = useMemo(() => {
    const map = new Map()
    schedule.forEach(e => {
      const d = new Date(e.date)
      const y = d.getFullYear()
      const m = d.getMonth()
      const key = `${y}-${m}`
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(e)
    })
    return map
  }, [schedule])

  const monthHasEvents = (y, m) => eventsByMonth.has(`${y}-${m}`)
  const selectedEvents = selectedMonth == null ? [] : (eventsByMonth.get(`${year}-${selectedMonth}`) || [])

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold text-buk">Programme Calendar</h1>
      <p className="mt-2 text-sm text-gray-700">Select a month to view scheduled test sessions. Only months with active sessions are shown.</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="text-sm text-gray-700">Year</label>
        <div className="inline-flex items-center gap-2">
          <button className="btn btn-outline focus-ring text-sm" onClick={() => setYear(y => years[Math.max(0, years.indexOf(y) - 1)])} disabled={years.indexOf(year) === 0}>
            Prev
          </button>
          <span className="min-w-[4rem] text-center font-medium text-buk">{year}</span>
          <button className="btn btn-outline focus-ring text-sm" onClick={() => setYear(y => years[Math.min(years.length - 1, years.indexOf(y) + 1)])} disabled={years.indexOf(year) === years.length - 1}>
            Next
          </button>
        </div>

  {/* Removed toggle; only active months are shown */}
      </div>

      {/* Month grid */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3 md:grid-cols-4">
        {months.map((label, idx) => {
          const active = monthHasEvents(year, idx)
          if (!active) return null
          const isSelected = selectedMonth === idx
          return (
            <button
              key={idx}
              onClick={() => setSelectedMonth(idx)}
              aria-pressed={isSelected}
              className={`card w-full p-4 text-left transition-colors ${isSelected ? 'bg-buk-10' : 'bg-white hover:bg-gray-50'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-buk">{label} {year}</span>
              </div>
              <p className="mt-1 text-xs text-gray-600">{(eventsByMonth.get(`${year}-${idx}`) || []).length} session(s)</p>
            </button>
          )
        })}
      </div>

      {/* Selected month sessions */}
      {selectedMonth != null && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-buk">Sessions in {months[selectedMonth]} {year}</h2>
          {selectedEvents.length === 0 ? (
            <p className="mt-2 text-sm text-gray-700">No sessions scheduled.</p>
          ) : (
            <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">
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
                  {selectedEvents.map((s, i) => (
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
          )}
        </div>
      )}
    </main>
  )
}
