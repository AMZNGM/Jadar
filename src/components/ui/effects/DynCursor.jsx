'use client'

import { useRef, memo } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

export default memo(function DynCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useGSAP(() => {
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
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 })
      }
    }

    const handleLeave = () => {
      if (cursorRef.current && dotRef.current) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(dotRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
      }
    }

    const interactiveEls = document.querySelectorAll(
      'a, button, div, .cursor-hover, span, p, input, textarea, label, select, h1,h2,h3,h4,h5,h6,li'
    )
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <div className="max-sm:hidden">
      <div ref={cursorRef} className="fixed inset-0 size-10 bg-text rounded-full mix-blend-difference z-9999 pointer-events-none" />
      <div ref={dotRef} className="fixed inset-0 size-2 bg-bg rounded-full mix-blend-normal z-9999 pointer-events-none" />
    </div>
  )
})
