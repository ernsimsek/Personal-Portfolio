import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, sections } from '../data/site'

function IconSun() {
  return (
    <svg className="nav-theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M12 2v2M12 20v2M2 12h2M20 12h2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M19.8 4.2l-1.4 1.4M5.8 18.4l-1.4 1.4"
      />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg className="nav-theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      />
    </svg>
  )
}

type Props = {
  active: string
  onOpenPalette: () => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function Nav({ active, onOpenPalette, theme, onToggleTheme }: Props) {
  const { scrollY } = useScroll()
  const bg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(9,9,9,0)', 'rgba(9,9,9,0.88)'],
  )
  const blur = useTransform(scrollY, [0, 80], ['blur(0px)', 'blur(16px)'])
  const border = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.07)'],
  )

  return (
    <motion.nav
      className="nav"
      style={
        {
          '--nav-bg': bg,
          '--nav-blur': blur,
          '--nav-border': border,
        } as React.CSSProperties
      }
    >
      <a href="#home" className="nav-logo mono">
        {profile.initials}
      </a>

      <ul className="nav-links">
        {sections.slice(1).map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`nav-link${active === s.id ? ' is-active' : ''}`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button
          type="button"
          className="nav-theme"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>
        <button
          type="button"
          className="nav-kbd"
          onClick={onOpenPalette}
          aria-label="Open command palette"
        >
          <kbd className="mono">⌘</kbd>
          <kbd className="mono">K</kbd>
        </button>
      </div>
    </motion.nav>
  )
}
