import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export function ScrollRibbon() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 })
  const w = useTransform(smooth, [0, 1], ['0%', '100%'])

  return (
    <div className="ribbon" aria-hidden="true">
      <motion.div className="ribbon-fill" style={{ width: w }} />
    </div>
  )
}
