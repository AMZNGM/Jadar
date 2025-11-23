'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(GSAPSplitText, useGSAP)
}

export default function SplitedText({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars,words',
  tag = 'p',
}) {
  const ref = useRef(null)
  const [isClient, setIsClient] = useState(false)

  // MOBILE DETECTION
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches)

  // ARABIC DETECTION
  const isArabic = /[\u0600-\u06FF]/.test(text)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useGSAP(() => {
    if (!ref.current || !isClient) return

    // === MOBILE OR ARABIC MODE ===
    if (isMobile || isArabic) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20, willChange: 'transform' },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 92%', // slightly later → smoother
            once: true,
          },
        }
      )
      return
    }

    // === DESKTOP ENGLISH MODE (SplitText) ===
    let split = new GSAPSplitText(ref.current, {
      type: splitType,
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
    })

    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      }
    )

    return () => split.revert()
  }, [text, isClient, isArabic])

  const Tag = tag

  return (
    <Tag ref={ref} className={`inline-block overflow-hidden whitespace-normal split-parent ${className}`}>
      {text}
    </Tag>
  )
}
