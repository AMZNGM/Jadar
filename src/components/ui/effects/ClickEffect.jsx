'use client'

import { memo, useEffect, useRef, useState } from 'react'

export default memo(function ClickEffect({ children, className = '', ...props }) {
  const elementRef = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const element = elementRef.current
    if (!element) return

    const createRipple = (event) => {
      const rect = element.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const ripple = document.createElement('span')
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
      `

      // Add keyframes for ripple animation only once
      if (!document.querySelector('#ripple-keyframes')) {
        const style = document.createElement('style')
        style.id = 'ripple-keyframes'
        style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `
        document.head.appendChild(style)
      }

      element.appendChild(ripple)

      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove()
        }
      }, 600)
    }

    element.addEventListener('click', createRipple)

    return () => {
      element.removeEventListener('click', createRipple)
    }
  }, [isClient])

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  )
})
