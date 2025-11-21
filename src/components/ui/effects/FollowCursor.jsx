'use client'

import { useRef, useEffect, useCallback } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

export default function FollowCursor({
  isActive = true,
  offset = { x: 20, y: 20 },
  duration = 0.15,
  ease = 'power2.out',
  scaleOnHover = 1,
  children,
  className = '',
  style = {},
  ...props
}) {
  const cursorRef = useRef(null)
  const quickToXRef = useRef(null)
  const quickToYRef = useRef(null)

  const getOffset = useCallback(() => {
    return typeof offset === 'function' ? offset() : offset
  }, [offset])

  const initQuickTo = useCallback(() => {
    if (!cursorRef.current || quickToXRef.current) return

    gsap.set(cursorRef.current, {
      x: 0,
      y: 0,
      opacity: isActive ? 1 : 0,
    })

    quickToXRef.current = gsap.quickTo(cursorRef.current, 'x', {
      duration,
      ease,
    })

    quickToYRef.current = gsap.quickTo(cursorRef.current, 'y', {
      duration,
      ease,
    })
  }, [duration, ease, isActive])

  const handleMouseMove = useCallback(
    (e) => {
      if (!isActive || !quickToXRef.current || !quickToYRef.current) return

      const { x, y } = getOffset()

      quickToXRef.current(e.clientX + x)
      quickToYRef.current(e.clientY + y)
    },
    [isActive, getOffset]
  )

  const handleHover = useCallback(
    (isHovering) => {
      if (!cursorRef.current) return

      gsap.to(cursorRef.current, {
        scale: isHovering ? scaleOnHover : 1,
        duration: 0.5,
        ease: 'power2.out',
      })
    },
    [scaleOnHover]
  )

  useGSAP(() => {
    if (!cursorRef.current) return

    initQuickTo()

    if (isActive) {
      window.addEventListener('mousemove', handleMouseMove)

      gsap.set(cursorRef.current, { opacity: 1 })

      const hoverElements = document.querySelectorAll('[data-cursor-hover]')

      const enter = () => handleHover(true)
      const leave = () => handleHover(false)

      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        hoverElements.forEach((el) => {
          el.removeEventListener('mouseenter', enter)
          el.removeEventListener('mouseleave', leave)
        })
      }
    } else {
      gsap.set(cursorRef.current, { opacity: 0 })
    }
  }, [isActive, handleMouseMove, handleHover, initQuickTo])

  useEffect(() => {
    return () => {
      quickToXRef.current = null
      quickToYRef.current = null
    }
  }, [])

  if (!isActive) return null

  return (
    <div
      ref={cursorRef}
      className={`follow-cursor ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
