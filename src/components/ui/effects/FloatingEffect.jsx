'use client'

import { useRef, useEffect, memo } from 'react'

export default memo(function FloatingEffect({
  children,
  intensity = 1,
  perspective = 1500,
  rotationRange = 3,
  translateZ = 10,
  scaleOnHover = 1,
  proximityDetection = 100,
  className = '',
  innerClassName = '',
  ...props
}) {
  const containerRef = useRef(null)
  const floatingRef = useRef(null)
  const innerRef = useRef(null)
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!isMountedRef.current) return

    const handleMouseMove = (e) => {
      if (!containerRef.current || !floatingRef.current || !innerRef.current) return

      const container = containerRef.current
      const floating = floatingRef.current
      const inner = innerRef.current
      const rect = container.getBoundingClientRect()

      // Calculate mouse position relative to container center
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = (e.clientX - centerX) / (rect.width / 2)
      const mouseY = (e.clientY - centerY) / (rect.height / 2)

      // Check if mouse is near the container
      if (
        e.clientY >= rect.top - proximityDetection &&
        e.clientY <= rect.bottom + proximityDetection &&
        e.clientX >= rect.left - proximityDetection &&
        e.clientX <= rect.right + proximityDetection
      ) {
        // Apply 3D transformations
        const rotateX = mouseY * -rotationRange * intensity
        const rotateY = mouseX * rotationRange * intensity
        const currentTranslateZ = translateZ * intensity

        // Main container 3D transform
        floating.style.transform = `
          perspective(${perspective}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(${currentTranslateZ}px)
          scale(${scaleOnHover})
        `

        // Inner content counter-rotation for readability
        inner.style.transform = `
          rotateX(${rotateX * -0.2}deg)
          rotateY(${rotateY * -0.2}deg)
        `
      } else {
        // Reset to default state when mouse leaves proximity
        floating.style.transform = `
          perspective(${perspective}px)
          rotateX(0deg)
          rotateY(0deg)
          translateZ(0px)
          scale(1)
        `

        inner.style.transform = 'rotateX(0deg) rotateY(0deg)'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity, perspective, rotationRange, translateZ, scaleOnHover, proximityDetection])

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} {...props}>
      <div
        ref={floatingRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        }}
      >
        <div
          ref={innerRef}
          className={`${innerClassName}`}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
})
