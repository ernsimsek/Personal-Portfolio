import { useEffect, useState } from 'react'

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n))

    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        const top = visible[0]
        if (top?.target.id) setActive(top.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.12, 0.25, 0.5, 0.75, 1] },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}
