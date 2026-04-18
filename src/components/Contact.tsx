import { motion, useInView } from 'framer-motion'
import { type FormEvent, useRef, useState } from 'react'
import { profile } from '../data/site'
import { Magnetic } from './Magnetic'
import { ScrambleText } from './ScrambleText'

type Form = { name: string; email: string; message: string }

const EASE = [0.22, 1, 0.36, 1] as const

export function Contact({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [form, setForm] = useState<Form>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [copied, setCopied] = useState(false)

  const valid =
    form.name.trim().length > 1 &&
    /.+@.+\..+/.test(form.email.trim()) &&
    form.message.trim().length > 9

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) { setStatus('err'); return }
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${profile.email}?subject=Portfolio%20inquiry&body=${body}`
    setStatus('ok')
  }

  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const base = { duration: reducedMotion ? 0.01 : 0.6, ease: EASE }

  return (
    <section className="section" id="contact" ref={ref}>
      <motion.div
        className="section-label"
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={base}
      >
        <span className="section-num mono">04</span>
        <h2>Contact</h2>
      </motion.div>

      <motion.div
        className="contact-cta"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...base, delay: reducedMotion ? 0 : 0.06 }}
      >
        <ScrambleText
          text="Let's build something worth noticing."
          animate={inView && !reducedMotion}
          speed={0.5}
        />
      </motion.div>

      <div className="contact-grid">
        <motion.div
          className="contact-aside"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...base, delay: reducedMotion ? 0 : 0.12 }}
        >
          <p>
            A quick note with context, timeline, and any reference links gets you a
            response much faster.
          </p>
          <div className="contact-mail">
            <span className="mono">{profile.email}</span>
            <button type="button" className="btn tiny" onClick={copyMail}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <ul className="contact-socials">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="mono">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...base, delay: reducedMotion ? 0 : 0.2 }}
        >
          <label className="field">
            <span className="field-label mono">Name</span>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              autoComplete="name"
              placeholder="How should I address you?"
            />
          </label>
          <label className="field">
            <span className="field-label mono">Email</span>
            <input
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              autoComplete="email"
              inputMode="email"
              placeholder="your@email.com"
            />
          </label>
          <label className="field">
            <span className="field-label mono">Message</span>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={5}
              placeholder="Project brief, timeline, budget range…"
            />
          </label>
          {status === 'err' && (
            <p className="field-note err">Please check all fields.</p>
          )}
          {status === 'ok' && (
            <p className="field-note ok">Your mail client should open now.</p>
          )}
          <Magnetic disabled={reducedMotion}>
            <button type="submit" className="btn primary" disabled={!valid}>
              Send Message
            </button>
          </Magnetic>
        </motion.form>
      </div>
    </section>
  )
}
