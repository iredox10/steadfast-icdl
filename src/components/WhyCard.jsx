import { motion } from 'framer-motion'

export default function WhyCard({ Icon, title, text }) {
  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="card h-full p-6">
      <Icon className="h-8 w-8 text-buk-light" aria-hidden="true" />
      <h3 className="mt-3 font-semibold text-buk">{title}</h3>
      <p className="mt-1 text-sm text-gray-700">{text}</p>
    </motion.div>
  )
}
