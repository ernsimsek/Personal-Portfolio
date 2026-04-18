import { type ReactNode, useRef } from 'react'
import { motion, useMotionTemplate, useSpring } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  strength?: number
  disabled?: boolean
}

export function Magnetic({
  children,
  className,
  strength = 0.35,
  disabled,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.35 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.35 })
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`

  const move = (clientX: number, clientY: number) => {
    const el = ref.current
    if (!el || disabled) return
    const r = el.getBoundingClientRect()
    const dx = (clientX - (r.left + r.width / 2)) * strength
    const dy = (clientY - (r.top + r.height / 2)) * strength
    x.set(dx)
    y.set(dy)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transform }}
      onPointerMove={(e) => move(e.clientX, e.clientY)}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.div>
  )
}
