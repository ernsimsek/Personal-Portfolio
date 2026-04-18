import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

type Item = { id: string; label: string }

type Props = {
  open: boolean
  onClose: () => void
  items: readonly Item[]
  onPick: (id: string) => void
}

export function CommandPalette({ open, onClose, items, onPick }: Props) {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return [...items]
    return items.filter(
      (i) => i.label.toLowerCase().includes(s) || i.id.includes(s),
    )
  }, [items, q])

  useEffect(() => {
    if (!open) { setQ(''); return }
    const t = window.setTimeout(() => inputRef.current?.focus(), 12)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="pal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-label="Quick navigation"
            className="pal"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 440, damping: 34 }}
          >
            <div className="pal-head mono">
              <span>Quick navigate</span>
              <span className="pal-esc">ESC to close</span>
            </div>
            <input
              ref={inputRef}
              className="pal-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sections…"
              autoComplete="off"
              spellCheck={false}
            />
            <ul className="pal-list">
              {filtered.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="pal-item"
                    onClick={() => {
                      onPick(item.id)
                      onClose()
                    }}
                  >
                    <span>{item.label}</span>
                    <span className="pal-id mono">#{item.id}</span>
                  </button>
                </li>
              ))}
              {!filtered.length ? (
                <li className="pal-empty mono">No results</li>
              ) : null}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
