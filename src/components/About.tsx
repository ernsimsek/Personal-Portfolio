import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

type StatProps = {
  to: number
  suffix: string
  label: string
  inView: boolean
  reducedMotion: boolean
  delay: number
}

function Stat({ to, suffix, label, inView, reducedMotion, delay }: StatProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(count, to, {
      duration: reducedMotion ? 0.01 : 1.6,
      ease: 'easeOut',
      delay: reducedMotion ? 0 : delay,
    })
    return ctrl.stop
  }, [inView, to, count, reducedMotion, delay])

  return (
    <div className="stat">
      <div className="stat-num">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <div className="stat-label mono">{label}</div>
    </div>
  )
}

export function About({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const base = { duration: reducedMotion ? 0.01 : 0.65, ease: EASE }

  return (
    <section className="section" id="about" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={base}
      >
        <span className="section-num mono">02</span>
        <h2>About</h2>
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="about-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...base, delay: reducedMotion ? 0 : 0.08 }}
        >
          <p>
            I design and build <strong>fast, accessible, and purposeful</strong> digital
            interfaces. My work sits at the intersection of engineering rigor and design
            sensibility — systems thinking applied to pixels.
          </p>
          <p>
            I care about the full picture: information architecture, motion hierarchy,
            load performance, and the tiny interactions that make a product feel{' '}
            <em>alive</em>.
          </p>
          <p>
            Currently based in Mersin. Open to remote opportunities worldwide.
          </p>
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...base, delay: reducedMotion ? 0 : 0.16 }}
        >
          <Stat to={4} suffix="+" label="Years of craft" inView={inView} reducedMotion={reducedMotion} delay={0.2} />
          <Stat to={12} suffix="+" label="Projects shipped" inView={inView} reducedMotion={reducedMotion} delay={0.3} />
          <Stat to={47} suffix="%" label="Avg bundle saved" inView={inView} reducedMotion={reducedMotion} delay={0.4} />
        </motion.div>
      </div>
    </section>
  )
}
