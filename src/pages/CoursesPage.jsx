import ModuleCard from '../components/ModuleCard'
import { MODULES } from '../data/modules'

export default function CoursesPage() {
  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold text-buk">ICDL Modules</h1>
      <p className="mt-2 text-sm text-gray-700">Choose from the full suite of ICDL modules. Fees are per module.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m) => (
          <ModuleCard key={m.code} {...m} onActionHref="/register" />
        ))}
      </div>
    </main>
  )
}
