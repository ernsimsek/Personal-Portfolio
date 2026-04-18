import { useCallback, useEffect, useMemo, useState } from 'react'
import { About } from './components/About'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { NoiseOverlay } from './components/NoiseOverlay'
import { ScrollRibbon } from './components/ScrollRibbon'
import { SkillsPanel } from './components/SkillsPanel'
import { Work } from './components/Work'
import { marqueeItems, profile, sections } from './data/site'
import { useActiveSection } from './hooks/useActiveSection'
import { useLenis } from './hooks/useLenis'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('pf-theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  useLenis(!reducedMotion)

  const [theme, setTheme] = useState<Theme>('dark')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [touchDevice, setTouchDevice] = useState(false)

  useEffect(() => {
    setTheme(getInitialTheme())
    setTouchDevice(!window.matchMedia('(hover: hover)').matches)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('pf-theme', theme)
  }, [theme])

  const sectionIds = useMemo(() => sections.map((s) => s.id), [])
  const active = useActiveSection(sectionIds)

  const scrollTo = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    },
    [reducedMotion],
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {!touchDevice && !reducedMotion ? <CustomCursor /> : null}
      <NoiseOverlay />
      <ScrollRibbon />

      <Nav
        active={active}
        onOpenPalette={() => setPaletteOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      <main>
        <Hero reducedMotion={reducedMotion} />
        <Marquee items={marqueeItems} />
        <div className="sections">
          <Work reducedMotion={reducedMotion} />
          <About reducedMotion={reducedMotion} />
          <SkillsPanel reducedMotion={reducedMotion} />
          <Contact reducedMotion={reducedMotion} />
        </div>
        <footer className="footer">
          <span className="mono">© {new Date().getFullYear()} {profile.name}</span>
          <span>Handcrafted — not templated.</span>
          <span className="mono">{profile.location}</span>
        </footer>
      </main>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        items={sections}
        onPick={scrollTo}
      />
    </>
  )
}
