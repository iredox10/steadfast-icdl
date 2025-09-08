import { FaStar, FaQuoteLeft } from 'react-icons/fa'

export default function TestimonialCard({ name, program, quote, rating = 5 }) {
  return (
    <div className="card h-full p-5">
      <FaQuoteLeft className="h-5 w-5 text-buk-light" aria-hidden="true" />
      <p className="mt-3 text-sm text-gray-700">{quote}</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-buk">{name}</p>
          <p className="text-xs text-gray-600">{program}</p>
        </div>
        <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {[1,2,3,4,5].map((i) => (
            <FaStar key={i} className={`h-4 w-4 ${i <= rating ? 'text-buk-light' : 'text-gray-300'}`} />)
          )}
        </div>
      </div>
    </div>
  )
}
