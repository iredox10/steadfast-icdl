import { useState } from 'react'

export default function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-buk">{q}</span>
        <span className="ml-4 text-buk-light">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="mt-2 text-sm text-gray-700">{a}</p>}
    </div>
  )
}
