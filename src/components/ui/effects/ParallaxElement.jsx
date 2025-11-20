'use client'

import { useMemo } from 'react'

export default function ParallaxElement({
  children,
  speed = 0.5,
  direction = 'vertical',
  ease = 'none',
  start = 'top bottom',
  end = 'bottom top',
  scrub = true,
  origin = 'center center',
  className = '',
  container = null,
  x = null,
  y = null,
  rotate = null,
  scale = null,
  opacity = null,
  ...props
}) {
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, [])

  if (isMobile) {
    return (
      <div className={`ParallaxElement mobile ${className}`} {...props}>
        {children}
      </div>
    )
  }

  const dataAttributes = {
    'data-scroll-speed': speed,
    'data-scroll-direction': direction,
    'data-scroll-ease': ease,
    'data-scroll-start': start,
    'data-scroll-end': end,
    'data-scroll-scrub': scrub.toString(),
    'data-scroll-origin': origin,
  }

  if (container) dataAttributes['data-scroll-container'] = container
  if (direction === 'custom') {
    if (x !== null) dataAttributes['data-scroll-x'] = x
    if (y !== null) dataAttributes['data-scroll-y'] = y
    if (rotate !== null) dataAttributes['data-scroll-rotate'] = rotate
    if (scale !== null) dataAttributes['data-scroll-scale'] = scale
    if (opacity !== null) dataAttributes['data-scroll-opacity'] = opacity
  }

  return (
    <div {...dataAttributes} className={`ParallaxElement ${className}`} {...props}>
      {children}
    </div>
  )
}
