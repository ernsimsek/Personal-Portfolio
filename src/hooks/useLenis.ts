import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.35,
    })

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    let raf = 0
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      lenis.destroy()
    }
  }, [enabled])
}
