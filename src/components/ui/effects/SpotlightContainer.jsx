'use client'

import { useRef, useState, useEffect } from 'react'

export default function SpotlightContainer({ children, className = '', spotlightColor = '#d73b13' }) {
  const divRef = useRef(null)
  const spotlightRef = useRef(null)

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = divRef.current
    const spot = spotlightRef.current
    if (!el || !spot) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX || e.touches?.[0].clientX) - rect.left
      const y = (e.clientY || e.touches?.[0].clientY) - rect.top

      spot.style.setProperty('--x', `${x}px`)
      spot.style.setProperty('--y', `${y}px`)
    }

    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerdown', () => setVisible(true))
    el.addEventListener('pointerenter', () => setVisible(true))
    el.addEventListener('pointerleave', () => setVisible(false))
    el.addEventListener('pointerup', () => setVisible(false))

    return () => {
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerdown', () => setVisible(true))
      el.removeEventListener('pointerenter', () => setVisible(true))
      el.removeEventListener('pointerleave', () => setVisible(false))
      el.removeEventListener('pointerup', () => setVisible(false))
    }
  }, [])

  return (
    <div ref={divRef} className={`relative overflow-hidden size-full ${className}`}>
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: visible ? 0.6 : 0,
          background: `radial-gradient(circle at var(--x) var(--y), ${spotlightColor}, transparent 10%)`,
        }}
      />
      {children}
    </div>
  )
}
