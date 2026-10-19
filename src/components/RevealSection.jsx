import { motion, useReducedMotion } from 'motion/react'

export default function RevealSection({ children, ...props }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.section
      {...props}
      initial={reduceMotion ? false : { opacity: 0.75, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
