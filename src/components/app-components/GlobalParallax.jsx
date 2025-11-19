'use client'

import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

export default function GlobalParallax() {
  useGSAP(() => {
    const breakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    }

    const getBreakpoint = () => {
      const w = window.innerWidth
      if (w < breakpoints.sm) return 'sm'
      if (w < breakpoints.md) return 'md'
      if (w < breakpoints.lg) return 'lg'
      if (w < breakpoints.xl) return 'xl'
      return '2xl'
    }

    const getValue = (el, baseValue, type) => {
      const current = getBreakpoint()
      const bpKey = `${current}${type}`

      return el.dataset[bpKey] !== undefined ? parseFloat(el.dataset[bpKey]) : parseFloat(baseValue || 0)
    }

    const getSpeed = (el, baseSpeed) => {
      const current = getBreakpoint()

      const multipliers = {
        sm: el.dataset.smSpeed || el.dataset.mobileSpeed || 0.5,
        md: el.dataset.mdSpeed || el.dataset.tabletSpeed || 0.7,
        lg: el.dataset.lgSpeed || 1,
        xl: el.dataset.xlSpeed || 1.1,
        '2xl': el.dataset.xxlSpeed || 1.2,
      }

      return baseSpeed * parseFloat(multipliers[current])
    }

    const getDirection = (el, baseDir) => {
      const current = getBreakpoint()

      const override =
        el.dataset[`${current}Direction`] ||
        (current === 'sm' && el.dataset.mobileDirection) ||
        (current === 'md' && el.dataset.tabletDirection)

      return override || baseDir
    }

    const isDisabled = (el) => {
      const current = getBreakpoint()
      const flags = {
        sm: el.dataset.disableSm === 'true' || el.dataset.disableMobile === 'true',
        md: el.dataset.disableMd === 'true' || el.dataset.disableTablet === 'true',
        lg: el.dataset.disableLg === 'true',
        xl: el.dataset.disableXl === 'true',
        '2xl': el.dataset.disable2xl === 'true',
      }

      return flags[current] || false
    }

    let triggers = []

    const setupElements = () => {
      triggers.forEach((t) => t.kill())
      triggers = []

      const elements = document.querySelectorAll('[data-scroll-speed]')

      elements.forEach((el) => {
        if (isDisabled(el)) {
          el.style.transform = 'none'
          return
        }

        const baseSpeed = parseFloat(el.dataset.scrollSpeed || 0.5)
        const direction = getDirection(el, el.dataset.scrollDirection || 'vertical')

        const speed = getSpeed(el, baseSpeed)

        const config = {
          ease: el.dataset.scrollEase || 'none',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: el,
            start: el.dataset.scrollStart || 'top bottom',
            end: el.dataset.scrollEnd || 'bottom top',
            scrub: el.dataset.scrollScrub !== 'false',
            markers: false,
            invalidateOnRefresh: true,
          },
        }

        let tween

        switch (direction) {
          case 'horizontal':
            tween = gsap.to(el, { xPercent: -100 * speed, ...config })
            break

          case 'scale':
            tween = gsap.to(el, {
              scale: 1 + speed,
              transformOrigin: el.dataset.scrollOrigin || 'center center',
              ...config,
            })
            break

          case 'rotate':
            tween = gsap.to(el, {
              rotation: 360 * speed,
              transformOrigin: el.dataset.scrollOrigin || 'center center',
              ...config,
            })
            break

          case 'opacity':
            tween = gsap.to(el, { opacity: speed, ...config })
            break

          case 'custom':
            tween = gsap.to(el, {
              xPercent: getValue(el, el.dataset.scrollX, 'X') * speed,
              yPercent: getValue(el, el.dataset.scrollY, 'Y') * speed,
              rotation: getValue(el, el.dataset.scrollRotate, 'Rotate') * speed,
              scale: 1 + getValue(el, el.dataset.scrollScale, 'Scale') * speed,
              opacity: getValue(el, el.dataset.scrollOpacity, 'Opacity') * speed,
              transformOrigin: el.dataset.scrollOrigin || 'center center',
              ...config,
            })
            break

          default:
            tween = gsap.to(el, { yPercent: -100 * speed, ...config })
            break
        }

        triggers.push(tween.scrollTrigger)
      })

      ScrollTrigger.refresh()
    }

    // Init
    setupElements()

    // Handle resize
    const resizeHandler = () => {
      clearTimeout(window.__parallax_resize)
      window.__parallax_resize = setTimeout(setupElements, 250)
    }

    window.addEventListener('resize', resizeHandler)

    // Observe only new parallax elements — micro-fast
    const observer = new MutationObserver((m) => {
      for (const mutation of m) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1 && node.hasAttribute?.('data-scroll-speed')) {
            setupElements()
            return
          }
          if (node.nodeType === 1 && node.querySelector?.('[data-scroll-speed]')) {
            setupElements()
            return
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Cleanup
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resizeHandler)
      triggers.forEach((t) => t.kill())
      ScrollTrigger.refresh()
    }
  }, [])

  return null
}
