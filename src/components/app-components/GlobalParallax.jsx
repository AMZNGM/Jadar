'use client'

import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

export default function GlobalParallax() {
  useGSAP(() => {
    ScrollTrigger.matchMedia({
      // MOBILE
      '(max-width: 767px)': () => {
        const elements = document.querySelectorAll('[data-scroll-speed]')
        elements.forEach((el) => (el.style.transform = 'none'))
        ScrollTrigger.getAll().forEach((st) => st.kill())
      },

      // DESKTOP
      '(min-width: 768px)': () => {
        let triggers = []

        const setupElements = () => {
          triggers.forEach((t) => t.kill())
          triggers = []

          const elements = document.querySelectorAll('[data-scroll-speed]')
          elements.forEach((el) => {
            const speed = parseFloat(el.dataset.scrollSpeed || 0.5)
            const direction = el.dataset.scrollDirection || 'vertical'

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
                  xPercent: parseFloat(el.dataset.scrollX || 0) * speed,
                  yPercent: parseFloat(el.dataset.scrollY || 0) * speed,
                  rotation: parseFloat(el.dataset.scrollRotate || 0) * speed,
                  scale: 1 + parseFloat(el.dataset.scrollScale || 0) * speed,
                  opacity: parseFloat(el.dataset.scrollOpacity || 0) * speed,
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

        setupElements()

        const resizeHandler = () => {
          clearTimeout(window.__parallax_resize)
          window.__parallax_resize = setTimeout(setupElements, 250)
        }
        window.addEventListener('resize', resizeHandler)

        const observer = new MutationObserver((m) => {
          for (const mutation of m) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === 1 && (node.hasAttribute?.('data-scroll-speed') || node.querySelector?.('[data-scroll-speed]'))) {
                setupElements()
                return
              }
            }
          }
        })

        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
          observer.disconnect()
          window.removeEventListener('resize', resizeHandler)
          triggers.forEach((t) => t.kill())
          ScrollTrigger.refresh()
        }
      },
    })
  }, [])

  return null
}
