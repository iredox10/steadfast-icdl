// Central schedule data used by Schedule and Registration
export const SCHEDULE = [
  { date: '2025-01-20', time: '10:00', module: 'Computer Essentials', code: 'COM', venue: 'ICT Lab A' },
  { date: '2025-03-05', time: '10:00', module: 'Online Essentials', code: 'OFL', venue: 'ICT Lab B' },
  { date: '2025-06-12', time: '10:00', module: 'Word Processing', code: 'WPP', venue: 'ICT Lab A' },
  { date: '2025-09-15', time: '10:00', module: 'Computer Essentials', code: 'COM', venue: 'ICT Lab A' },
  { date: '2025-09-22', time: '10:00', module: 'Spreadsheets', code: 'SSP', venue: 'ICT Lab B' },
  { date: '2025-10-06', time: '10:00', module: 'Presentation', code: 'PPT', venue: 'ICT Lab A' },
  { date: '2026-02-10', time: '10:00', module: 'IT Security', code: 'ITC', venue: 'ICT Lab A' },
]

export function getActiveMonths(schedule = SCHEDULE, year) {
  const map = new Map()
  schedule.forEach(e => {
    const d = new Date(e.date)
    if (year != null && d.getFullYear() !== year) return
    const key = `${d.getFullYear()}-${d.getMonth()}`
    map.set(key, true)
  })
  return Array.from(map.keys()).map(k => ({
    year: Number(k.split('-')[0]),
    month: Number(k.split('-')[1]),
  }))
}

export function getModulesForMonth(schedule = SCHEDULE, year, month) {
  const set = new Set()
  schedule.forEach(e => {
    const d = new Date(e.date)
    if (d.getFullYear() === year && d.getMonth() === month) set.add(e.code)
  })
  return Array.from(set)
}