import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Reveal({
  children,
  y = 20,
  duration = 0.5,
  delay = 0,
  once = true,
  className,
  ...rest
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
