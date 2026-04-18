import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { stackGroups } from '../data/site'

const EASE = [0.22, 1, 0.36, 1] as const

export function SkillsPanel({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const base = { duration: reducedMotion ? 0.01 : 0.6, ease: EASE }

  return (
    <section className="section" id="stack" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={base}
      >
        <span className="section-num mono">03</span>
        <h2>Stack</h2>
      </motion.div>

      <div className="stack-grid">
        {stackGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            className="stack-col"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              ...base,
              delay: reducedMotion ? 0 : gi * 0.1,
            }}
          >
            <h3 className="stack-label mono">{group.label}</h3>
            <ul className="stack-items">
              {group.items.map((item, ii) => (
                <motion.li
                  key={item}
                  className="stack-item"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: reducedMotion ? 0.01 : 0.45,
                    ease: EASE,
                    delay: reducedMotion ? 0 : gi * 0.08 + ii * 0.06,
                  }}
                >
                  <span className="stack-dot" aria-hidden="true" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
