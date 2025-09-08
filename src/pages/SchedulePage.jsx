export default function SchedulePage() {
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
