'use client'

import { useRef, useState } from 'react'

const SpotlightContainer = ({ children, className = '', spotlightColor = '#d73b13' }) => {
  const divRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current) return

    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleTouchMove = (e) => {
    if (!divRef.current) return
    const touch = e.touches && e.touches[0]
    if (!touch) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: touch.clientX - rect.left, y: touch.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(0.6)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(0.6)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      tabIndex={0}
      role="region"
      aria-label="spotlight-container"
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden size-full ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 10%)`,
        }}
      />
      {children}
    </div>
  )
}

export default SpotlightContainer
