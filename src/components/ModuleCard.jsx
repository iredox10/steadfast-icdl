export default function ModuleCard({ code, title, description, fee, onAction }) {
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
