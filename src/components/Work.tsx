import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { projects } from '../data/site'

const EASE = [0.22, 1, 0.36, 1] as const

export function Work({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="section" id="work" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reducedMotion ? 0.01 : 0.55, ease: EASE }}
      >
        <span className="section-num mono">01</span>
        <h2>Selected Work</h2>
      </motion.div>

      <ul className="work-list">
        {projects.map((p, i) => {
          const isOpen = open === p.id
          return (
            <motion.li
              key={p.id}
              layout
              className={`work-item${isOpen ? ' is-open' : ''}`}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reducedMotion ? 0.01 : 0.6,
                ease: EASE,
                delay: reducedMotion ? 0 : i * 0.08,
              }}
            >
              <button
                type="button"
                className="work-row"
                onClick={() => setOpen(isOpen ? null : p.id)}
                aria-expanded={isOpen}
              >
                <span className="work-idx mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="work-title">{p.title}</span>
                <span className="work-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="work-tag mono">
                      {t}
                    </span>
                  ))}
                </span>
                <span className="work-year mono">{p.year}</span>
                <motion.span
                  className="work-arrow"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  →
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    className="work-detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: reducedMotion ? 0.01 : 0.38, ease: EASE },
                      opacity: { duration: reducedMotion ? 0.01 : 0.28 },
                    }}
                  >
                    <div className="work-detail-inner">
                      <p className="work-summary">{p.summary}</p>
                      <div className="work-detail-footer">
                        <span className="mono work-role">{p.role}</span>
                        {p.href ? (
                          <a
                            href={p.href}
                            className="work-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            View project ↗
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
