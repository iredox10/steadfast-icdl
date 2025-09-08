import FaqItem from '../components/FaqItem'

export default function FaqPage() {
  const faqs = [
    { q: 'What is ICDL?', a: 'ICDL is an internationally recognized certification of digital skills and competencies.' },
    { q: 'Who can register?', a: 'Students, staff, and the general public are welcome to register.' },
    { q: 'How do I prepare?', a: 'We provide training resources and practice materials before your test date.' },
    { q: 'Where is the centre located?', a: 'At BUK’s ICT complex. Exact lab will be communicated after registration.' },
  ]
  return (
    <main className="container py-10">
      <h1 className="text-2xl font-semibold text-buk">Frequently Asked Questions</h1>
      <div className="mt-4 divide-y divide-gray-200">
        {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
      </div>
    </main>
  )
}
