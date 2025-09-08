import { FaUserCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function StaffCard({ name, role, email }) {
  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="card p-5 flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-buk-10 text-buk">
        <FaUserCircle className="h-8 w-8" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold text-buk">{name}</p>
        <p className="truncate text-sm text-gray-600">{role}</p>
        <a href={`mailto:${email}`} className="text-sm text-buk-light hover:underline">{email}</a>
      </div>
    </motion.div>
  )
}
