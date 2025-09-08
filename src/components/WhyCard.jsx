export default function WhyCard({ Icon, title, text }) {
  return (
    <div className="card h-full p-6">
      <Icon className="h-8 w-8 text-buk-light" aria-hidden="true" />
      <h3 className="mt-3 font-semibold text-buk">{title}</h3>
      <p className="mt-1 text-sm text-gray-700">{text}</p>
    </div>
  )
}
