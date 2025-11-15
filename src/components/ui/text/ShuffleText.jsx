'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'

gsap.registerPlugin(GSAPSplitText, useGSAP)

const ShuffleText = ({
  text,
  className = '',
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'back.out(1.1)',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  loop = false,
  isRTL = false,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true,
  // style = {},
}) => {
  const ref = useRef(null)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [ready, setReady] = useState(false)
  const [isArabic, setIsArabic] = useState(false)
  const [key, setKey] = useState(0) // Add key to force re-render

  const splitRef = useRef(null)
  const wrappersRef = useRef([])
  const tlRef = useRef(null)
  const playingRef = useRef(false)
  const hoverHandlerRef = useRef(null)

  // Check if text contains Arabic characters
  useEffect(() => {
    const arabicPattern = /[\u0600-\u06FF]/
    const newIsArabic = arabicPattern.test(text)

    // If language changed (Arabic state changed), trigger re-render
    if (newIsArabic !== isArabic) {
      setIsArabic(newIsArabic)
      setKey((prev) => prev + 1) // Force re-render by changing key
    } else {
      setIsArabic(newIsArabic)
    }
  }, [text, isArabic])

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') setFontsLoaded(true)
      else document.fonts.ready.then(() => setFontsLoaded(true))
    } else setFontsLoaded(true)
  }, [])

  useEffect(() => {
    if (ref.current) {
      ref.current.style.direction = isRTL ? 'rtl' : 'ltr'
    }
  }, [isRTL, text, isArabic]) // Add isArabic to dependencies

  useGSAP(
    () => {
      // If Arabic text, return normal text without animation
      if (isArabic) {
        // Clean up any existing animations
        if (tlRef.current) {
          tlRef.current.kill()
          tlRef.current = null
        }
        if (wrappersRef.current.length) {
          wrappersRef.current.forEach((wrap) => {
            const inner = wrap.firstElementChild
            const orig = inner?.querySelector('[data-orig="1"]')
            if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap)
          })
          wrappersRef.current = []
        }
        try {
          splitRef.current?.revert()
        } catch {
          /* noop */
        }
        splitRef.current = null
        playingRef.current = false

        onShuffleComplete?.()
        setReady(true)
        return
      }

      if (!ref.current || !text || !fontsLoaded) return
      if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        onShuffleComplete?.()
        return
      }

      const el = ref.current

      const startPct = (1 - threshold) * 100
      const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '')
      const mv = mm ? parseFloat(mm[1]) : 0
      const mu = mm ? mm[2] || 'px' : 'px'
      const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`
      const start = `top ${startPct}%${sign}`

      const removeHover = () => {
        if (hoverHandlerRef.current && ref.current) {
          ref.current.removeEventListener('mouseenter', hoverHandlerRef.current)
          hoverHandlerRef.current = null
        }
      }

      const teardown = () => {
        if (tlRef.current) {
          tlRef.current.kill()
          tlRef.current = null
        }
        if (wrappersRef.current.length) {
          wrappersRef.current.forEach((wrap) => {
            const inner = wrap.firstElementChild
            const orig = inner?.querySelector('[data-orig="1"]')
            if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap)
          })
          wrappersRef.current = []
        }
        try {
          splitRef.current?.revert()
        } catch {
          /* noop */
        }
        splitRef.current = null
        playingRef.current = false
      }

      const build = () => {
        teardown()

        splitRef.current = new GSAPSplitText(el, {
          type: 'chars',
          charsClass: 'shuffle-char',
          wordsClass: 'shuffle-word',
          linesClass: 'shuffle-line',
          smartWrap: true,
          reduceWhiteSpace: false,
        })

        const chars = splitRef.current.chars || []
        wrappersRef.current = []

        const rolls = Math.max(1, Math.floor(shuffleTimes))
        const rand = (set) => set.charAt(Math.floor(Math.random() * set.length)) || ''

        chars.forEach((ch) => {
          const parent = ch.parentElement
          if (!parent) return

          const w = ch.getBoundingClientRect().width
          if (!w) return

          const wrap = document.createElement('span')
          wrap.className = 'inline-block overflow-hidden text-left align-baseline'
          Object.assign(wrap.style, { width: w + 'px' })

          const inner = document.createElement('span')
          inner.className = 'inline-block whitespace-nowrap transform-gpu origin-left will-change-transform'

          parent.insertBefore(wrap, ch)
          wrap.appendChild(inner)

          const firstOrig = ch.cloneNode(true)
          firstOrig.className = 'inline-block text-left'
          Object.assign(firstOrig.style, { width: w + 'px' })

          ch.setAttribute('data-orig', '1')
          ch.className = 'inline-block text-left'
          Object.assign(ch.style, { width: w + 'px' })

          inner.appendChild(firstOrig)
          for (let k = 0; k < rolls; k++) {
            const c = ch.cloneNode(true)
            if (scrambleCharset) c.textContent = rand(scrambleCharset)
            c.className = 'inline-block text-left'
            Object.assign(c.style, { width: w + 'px' })
            inner.appendChild(c)
          }
          inner.appendChild(ch)

          const steps = rolls + 1
          let startX = 0
          let finalX = -steps * w
          if (shuffleDirection === 'right') {
            const firstCopy = inner.firstElementChild
            const real = inner.lastElementChild
            if (real) inner.insertBefore(real, inner.firstChild)
            if (firstCopy) inner.appendChild(firstCopy)
            startX = -steps * w
            finalX = 0
          }

          gsap.set(inner, { x: startX, force3D: true })
          if (colorFrom) inner.style.color = colorFrom

          inner.setAttribute('data-final-x', String(finalX))
          inner.setAttribute('data-start-x', String(startX))

          wrappersRef.current.push(wrap)
        })
      }

      const inners = () => wrappersRef.current.map((w) => w.firstElementChild)

      const randomizeScrambles = () => {
        if (!scrambleCharset) return
        wrappersRef.current.forEach((w) => {
          const strip = w.firstElementChild
          if (!strip) return
          const kids = Array.from(strip.children)
          for (let i = 1; i < kids.length - 1; i++) {
            kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length))
          }
        })
      }

      const cleanupToStill = () => {
        wrappersRef.current.forEach((w) => {
          const strip = w.firstElementChild
          if (!strip) return
          const real = strip.querySelector('[data-orig="1"]')
          if (!real) return
          strip.replaceChildren(real)
          strip.style.transform = 'none'
          strip.style.willChange = 'auto'
        })
      }

      const play = () => {
        const strips = inners()
        if (!strips.length) return

        playingRef.current = true

        const tl = gsap.timeline({
          smoothChildTiming: true,
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          onRepeat: () => {
            if (scrambleCharset) randomizeScrambles()
            gsap.set(strips, { x: (i, t) => parseFloat(t.getAttribute('data-start-x') || '0') })
            onShuffleComplete?.()
          },
          onComplete: () => {
            playingRef.current = false
            if (!loop) {
              cleanupToStill()
              if (colorTo) gsap.set(strips, { color: colorTo })
              onShuffleComplete?.()
              armHover()
            }
          },
        })

        const addTween = (targets, at) => {
          tl.to(
            targets,
            {
              x: (i, t) => parseFloat(t.getAttribute('data-final-x') || '0'),
              duration,
              ease,
              force3D: true,
              stagger: animationMode === 'evenodd' ? stagger : 0,
            },
            at
          )
          if (colorFrom && colorTo) tl.to(targets, { color: colorTo, duration, ease }, at)
        }

        if (animationMode === 'evenodd') {
          const odd = strips.filter((_, i) => i % 2 === 1)
          const even = strips.filter((_, i) => i % 2 === 0)
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger
          const evenStart = odd.length ? oddTotal * 0.7 : 0
          if (odd.length) addTween(odd, 0)
          if (even.length) addTween(even, evenStart)
        } else {
          strips.forEach((strip) => {
            const d = Math.random() * maxDelay
            tl.to(
              strip,
              {
                x: parseFloat(strip.getAttribute('data-final-x') || '0'),
                duration,
                ease,
                force3D: true,
              },
              d
            )
            if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d)
          })
        }

        tlRef.current = tl
      }

      const armHover = () => {
        if (!triggerOnHover || !ref.current) return
        removeHover()
        const handler = () => {
          if (playingRef.current) return
          build()
          if (scrambleCharset) randomizeScrambles()
          play()
        }
        hoverHandlerRef.current = handler
        ref.current.addEventListener('mouseenter', handler)
      }

      const create = () => {
        build()
        if (scrambleCharset) randomizeScrambles()
        play()
        armHover()
        setReady(true)
      }

      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once: triggerOnce,
        onEnter: create,
      })

      return () => {
        st.kill()
        removeHover()
        teardown()
        setReady(false)
      }
    },
    {
      dependencies: [
        text,
        duration,
        maxDelay,
        ease,
        threshold,
        rootMargin,
        fontsLoaded,
        shuffleDirection,
        shuffleTimes,
        animationMode,
        loop,
        loopDelay,
        stagger,
        scrambleCharset,
        colorFrom,
        colorTo,
        triggerOnce,
        respectReducedMotion,
        triggerOnHover,
        isArabic,
        key, // Add key to dependencies to trigger re-run when language changes
      ],
      scope: ref,
    }
  )

  const baseTw = 'inline-block whitespace-normal break-words will-change-transform leading-none'

  // For Arabic text, don't add the invisible class during loading
  const classes = `cursor-default ${baseTw} ${isArabic || ready ? 'visible' : 'invisible'} ${className}`.trim()
  const Tag = tag || 'p'

  // Add key prop to force re-render when language changes
  return React.createElement(Tag, { ref, key, className: classes }, text)
}

export default ShuffleText
