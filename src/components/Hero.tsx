import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/site'
import { Magnetic } from './Magnetic'
import { ScrambleText } from './ScrambleText'

const TITLE_LINES = ['FRONT-END', 'DEVELOPER', '& DESIGNER.']
const EASE = [0.22, 1, 0.36, 1] as const

export function Hero({ reducedMotion }: { reducedMotion: boolean }) {
  const [ready, setReady] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 160)
    return () => window.clearTimeout(t)
  }, [])

  const base = reducedMotion
    ? { duration: 0.01, ease: EASE }
    : { duration: 0.9, ease: EASE }

  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div
        className="hero-inner"
        style={reducedMotion ? {} : { y, opacity }}
      >
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 8 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ ...base, delay: reducedMotion ? 0 : 0.05 }}
        >
          <span className="pulse-dot" aria-hidden="true" />
          {profile.available ? 'Available for work' : 'Not available'}
        </motion.div>

        <h1 className="hero-title">
          {TITLE_LINES.map((line, i) => (
            <span key={line} className="line-mask">
              <motion.span
                className="line-inner"
                initial={{ y: '106%' }}
                animate={ready ? { y: '0%' } : {}}
                transition={{
                  ...base,
                  delay: reducedMotion ? 0 : 0.12 + i * 0.1,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-tagline mono"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ ...base, delay: reducedMotion ? 0 : 0.48 }}
        >
          <ScrambleText
            text={profile.tagline.replace('\n', ' ')}
            animate={ready && !reducedMotion}
            speed={0.55}
          />
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ ...base, delay: reducedMotion ? 0 : 0.6 }}
        >
          <Magnetic disabled={reducedMotion}>
            <a className="btn primary" href="#work">
              View Work
            </a>
          </Magnetic>
          <a className="btn ghost" href="#contact">
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          className="hero-meta mono"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ ...base, delay: reducedMotion ? 0 : 0.72 }}
        >
          <span>{profile.location}</span>
          <span className="hero-sep">·</span>
          <span>{new Date().getFullYear()}</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll mono"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ ...base, delay: reducedMotion ? 0 : 1 }}
      >
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
        <span>scroll</span>
      </motion.div>

      <div className="hero-line" aria-hidden="true" />
    </section>
  )
}
