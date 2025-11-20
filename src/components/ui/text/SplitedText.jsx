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
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  tag = 'p',
}) {
  const ref = useRef(null)
  const [isClient, setIsClient] = useState(false)

  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useGSAP(() => {
    if (!ref.current || !isClient) return

    // ⛔ MOBILE MODE — No SplitText
    if (isMobile) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
      return
    }

    // DESKTOP MODE — Full SplitText animation
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

    return () => {
      split.revert()
    }
  }, [text, isClient])

  const Tag = tag

  return (
    <Tag ref={ref} className={`inline-block overflow-hidden whitespace-normal split-parent ${className}`}>
      {text}
    </Tag>
  )
}
