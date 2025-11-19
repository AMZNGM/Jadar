'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

export default function ScrollText({ text = 'Scroll Text', className = '' }) {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useGSAP(() => {
    // Only run GSAP animations on the client side
    if (!isClient) return

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.to(textRef.current, {
          xPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom -10%',
            scrub: true,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isClient])

  // Ensure consistent text generation between server and client
  const repeatedText = Array.from({ length: 3 }, () => text).join(' ')

  return (
    <div ref={containerRef} className="relative">
      <h2
        ref={textRef}
        className={`absolute left-0 top-10 h-full font-bold leading-5 uppercase whitespace-nowrap pointer-events-none select-none max-md:top-0 text-[15vw] text-main/10 ${className}`}
      >
        {repeatedText}
        <br />
        {repeatedText}
        <br />
        {repeatedText}
      </h2>
    </div>
  )
}
