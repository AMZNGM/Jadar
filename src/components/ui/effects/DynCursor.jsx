'use client'

import { useRef, memo, useState, useEffect } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

export default memo(function DynCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    setIsClient(true)
    checkMobile()

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useGSAP(() => {
    if (!isClient || isMobile) return

    const moveCursor = (e) => {
      if (cursorRef.current && dotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 20,
          y: e.clientY - 20,
          duration: 0.4,
          ease: 'power3.out',
        })

        gsap.to(dotRef.current, {
          x: e.clientX - 4,
          y: e.clientY - 4,
          duration: 0.15,
          ease: 'power3.out',
        })
      }
    }

    const handleHover = () => {
      if (cursorRef.current && dotRef.current) {
        gsap.to(cursorRef.current, { scale: 2.2, duration: 0.3, ease: 'back.out(1.7)' })
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', () => {
        if (cursorRef.current) {
          gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
        }
      })
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', () => {})
      })
    }
  }, [isClient, isMobile])

  if (!isClient || isMobile) return null

  return (
    <div className="max-sm:hidden">
      <div ref={cursorRef} className="fixed inset-0 size-10 bg-text rounded-full mix-blend-difference z-9999 pointer-events-none" />
      <div ref={dotRef} className="fixed inset-0 size-2 bg-bg rounded-full mix-blend-normal z-9999 pointer-events-none" />
    </div>
  )
})
