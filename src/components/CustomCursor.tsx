import { motion, useSpring, useTransform } from 'framer-motion'
import { useCursor } from '../hooks/useCursor'

const DOT = 5
const RING = 38

const spring = { stiffness: 170, damping: 18, mass: 0.5 }

export function CustomCursor() {
  const { x, y, hovering, visible } = useCursor()

  const rx = useSpring(x, spring)
  const ry = useSpring(y, spring)

  const dotX = useTransform(x, (v) => v - DOT / 2)
  const dotY = useTransform(y, (v) => v - DOT / 2)
  const ringX = useTransform(rx, (v) => v - RING / 2)
  const ringY = useTransform(ry, (v) => v - RING / 2)

  return (
    <>
      <motion.div
        className="cur-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="cur-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.7 : 1,
          borderColor: hovering
            ? 'var(--cursor-ring-hover)'
            : 'var(--cursor-ring)',
          backgroundColor: hovering
            ? 'var(--cursor-ring-fill)'
            : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
