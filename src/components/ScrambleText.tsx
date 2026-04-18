import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#&*?'

type Props = {
  text: string
  animate: boolean
  speed?: number
  className?: string
}

export function ScrambleText({ text, animate, speed = 0.42, className }: Props) {
  const [display, setDisplay] = useState(text)
  const raf = useRef(0)
  const iter = useRef(0)

  useEffect(() => {
    if (!animate) {
      setDisplay(text)
      return
    }

    iter.current = 0
    cancelAnimationFrame(raf.current)

    const step = () => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iter.current) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )
      iter.current += speed
      if (iter.current < text.length) {
        raf.current = requestAnimationFrame(step)
      } else {
        setDisplay(text)
      }
    }

    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [animate, text, speed])

  return <span className={className}>{display}</span>
}
