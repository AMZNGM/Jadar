'use client'
import { useEffect, useState } from 'react'

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
  ...props
}) {
  const [isMobile, setIsMobile] = useState(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile === null) {
    return (
      <div className={`${className}`} {...props}>
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className={`${className}`} {...props}>
        {children}
      </div>
    )
  }

  const data = {
    'data-scroll-speed': speed,
    'data-scroll-direction': direction,
    'data-scroll-ease': ease,
    'data-scroll-start': start,
    'data-scroll-end': end,
    'data-scroll-scrub': scrub.toString(),
    'data-scroll-origin': origin,
  }

  return (
    <div {...data} className={`${className}`} {...props}>
      {children}
    </div>
  )
}
