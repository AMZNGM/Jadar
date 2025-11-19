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
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  onLetterAnimationComplete,
  respectArabic = true,
}) {
  const ref = useRef(null)
  const animationRef = useRef(null)
  const animationCompletedRef = useRef(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isArabic, setIsArabic] = useState(false)

  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Detect if text contains Arabic characters
  useEffect(() => {
    if (!text || !respectArabic) {
      setIsArabic(false)
      return
    }

    // Arabic Unicode ranges
    const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/
    setIsArabic(arabicPattern.test(text))
  }, [text, respectArabic])

  // Font loading detection
  useEffect(() => {
    if (!isClient) return

    let cancelled = false
    const waitNextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

    ;(async () => {
      try {
        if (typeof window !== 'undefined' && window.document?.fonts && typeof window.document.fonts.ready === 'object') {
          await window.document.fonts.ready
        }
      } catch (_) {
        // ignore
      }
      // ensure layout has settled after fonts load
      await waitNextFrame()
      if (!cancelled) setFontsLoaded(true)
    })()

    return () => {
      cancelled = true
    }
  }, [isClient])

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded || !isClient) return

      // For Arabic text, use a simple fade animation instead of character splitting
      if (isArabic) {
        const el = ref.current

        animationRef.current = gsap.fromTo(
          el,
          {
            opacity: from.opacity !== undefined ? from.opacity : 0,
            y: from.y !== undefined ? from.y : 0,
            willChange: 'transform, opacity',
          },
          {
            opacity: to.opacity !== undefined ? to.opacity : 1,
            y: to.y !== undefined ? to.y : 0,
            duration,
            ease,
            scrollTrigger: {
              trigger: el,
              start: `top ${(1 - threshold) * 100}%`,
              once: true,
            },
            onComplete: () => {
              animationCompletedRef.current = true
              onLetterAnimationComplete?.()
            },
          }
        )

        return
      }

      const el = ref.current

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert()
        } catch (e) {
          console.warn('Error reverting split text:', e)
        }
        el._rbsplitInstance = null
      }

      const startPct = (1 - threshold) * 100
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
      const marginUnit = marginMatch?.[2] || 'px'
      const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}` : `+=${marginValue}`
      const start = `top ${startPct}%${sign}${marginUnit}`

      let splitInstance
      try {
        splitInstance = new GSAPSplitText(el, {
          type: splitType,
          linesClass: 'split-line',
          wordsClass: 'split-word',
          charsClass: 'split-char',
          reduceWhiteSpace: false,
        })
      } catch (e) {
        console.warn('SplitText called before fonts loaded, retrying shortly', e)
        // Retry once more on the next frame
        requestAnimationFrame(() => {
          if (!ref.current) return
          try {
            el._rbsplitInstance = new GSAPSplitText(ref.current, {
              type: splitType,
              linesClass: 'split-line',
              wordsClass: 'split-word',
              charsClass: 'split-char',
              reduceWhiteSpace: false,
            })
          } catch (_) {
            // give up silently; avoid crashing the app
          }
        })
        return
      }

      let targets = []
      if (splitType.includes('chars') && splitInstance.chars?.length) {
        targets = splitInstance.chars
      } else if (splitType.includes('words') && splitInstance.words?.length) {
        targets = splitInstance.words
      } else if (splitType.includes('lines') && splitInstance.lines?.length) {
        targets = splitInstance.lines
      }

      if (!targets.length) {
        console.warn('No targets found for split text animation')
        return
      }

      animationRef.current = gsap.fromTo(
        targets,
        { ...from, willChange: 'transform, opacity' },
        {
          ...to,
          duration,
          ease,
          stagger: {
            each: delay / 1000,
            from: 'start',
          },
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            onEnter: () => {
              if (!animationCompletedRef.current && animationRef.current) {
                animationRef.current.play()
              }
            },
          },
          onComplete: () => {
            animationCompletedRef.current = true
            onLetterAnimationComplete?.()
          },
        }
      )

      el._rbsplitInstance = splitInstance

      return () => {
        if (animationRef.current?.scrollTrigger) {
          animationRef.current.scrollTrigger.kill()
        }
        animationRef.current?.kill()
        try {
          splitInstance?.revert()
        } catch (e) {
          console.warn('Error cleaning up split text:', e)
        }
        el._rbsplitInstance = null
      }
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        isArabic,
        isClient,
      ],
      scope: ref,
    }
  )

  const Tag = tag
  const style = {
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
    direction: isArabic ? 'rtl' : 'ltr',
  }

  // Render plain text on server, animated text on client
  if (!isClient) {
    return (
      <Tag style={style} className={`split-parent ${isArabic ? 'arabic-text' : ''} ${className}`}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      style={style}
      className={`inline-block overflow-hidden whitespace-normal split-parent ${isArabic ? 'arabic-text' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}
