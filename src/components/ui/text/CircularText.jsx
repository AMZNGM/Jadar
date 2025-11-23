'use client'

import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

export default function CircularText({ text, spinDuration = 20, onHover = '', className = '' }) {
  const containerRef = useRef(null)
  const animationRef = useRef(null)
  const rotationRef = useRef(0)
  const letters = Array.from(text || '')

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    if (animationRef.current) {
      animationRef.current.kill()
    }

    animationRef.current = gsap.to(container, {
      rotation: 360,
      duration: spinDuration,
      ease: 'none',
      repeat: -1,
      onUpdate() {
        rotationRef.current = this.targets()[0]._gsap.rotation
      },
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [spinDuration, text])

  const handleHoverStart = () => {
    if (!onHover || !animationRef.current) return

    const currentRotation = rotationRef.current

    switch (onHover) {
      case 'slowDown':
        animationRef.current.timeScale(0.5)
        gsap.to(containerRef.current, { scale: 1, duration: 0.3 })
        break
      case 'speedUp':
        animationRef.current.timeScale(4)
        gsap.to(containerRef.current, { scale: 1, duration: 0.3 })
        break
      case 'pause':
        animationRef.current.timeScale(0)
        gsap.to(containerRef.current, { scale: 1, duration: 0.3 })
        break
      case 'goBonkers':
        animationRef.current.timeScale(20)
        gsap.to(containerRef.current, { scale: 0.8, duration: 0.3 })
        break
      default:
        animationRef.current.timeScale(1)
        gsap.to(containerRef.current, { scale: 1, duration: 0.3 })
    }
  }

  const handleHoverEnd = () => {
    if (!animationRef.current) return

    animationRef.current.timeScale(1)
    gsap.to(containerRef.current, {
      scale: 1,
      duration: 0.3,
    })
  }

  return (
    <div
      ref={containerRef}
      className={`relative size-50 max-md:size-40 text-main font-black text-center uppercase rounded-full origin-center cursor-pointer m-0 mx-auto max-md:hidden ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i
        const factor = Math.PI / letters.length
        const x = factor * i
        const y = factor * i
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{
              transform,
              WebkitTransform: transform,
            }}
          >
            {letter}
          </span>
        )
      })}
    </div>
  )
}
