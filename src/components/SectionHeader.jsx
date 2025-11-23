'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/translations/LanguageContext'
import { BgNoise, DiagonalLines } from '@/data/mediaData/svgs'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import CircularText from '@/components/ui/text/CircularText.jsx'

export default function SectionHeader({ className = '', title, para }) {
  const { selectedLanguage } = useLanguage()
  const sectionRef = useRef(null)
  const circularText = useRef(null)

  useGSAP(() => {
    if (!circularText.current || !sectionRef.current) return
    const wrapper = circularText.current.parentElement
    if (!wrapper) return
    let animation
    const isMobile = window.innerWidth <= 768

    if (isMobile) {
      const maxY = wrapper.offsetHeight - circularText.current.offsetHeight

      animation = gsap.to(circularText.current, {
        y: maxY,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    } else {
      const maxX = wrapper.offsetWidth - circularText.current.offsetWidth

      animation = gsap.to(circularText.current, {
        x: maxX,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    return () => {
      if (animation) animation.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section dir="ltr" ref={sectionRef} className="relative w-screen overflow-hidden bg-bg text-text py-24 px-4">
      <BgNoise />

      <div className={`flex justify-between size-full border-b border-main/30 ${className}`}>
        <div className="relative w-full max-md:w-50 md:flex items-center mb-8">
          <DiagonalLines />
          <DiagonalLines />

          <div ref={circularText} className="inline-block">
            <CircularText text="Invest-In-Jadar-" onHover="speedUp" spinDuration={15} />
          </div>
        </div>

        <div
          className={`relative w-3/5 font-light text-main/75 border-s border-main/30 ps-4 mb-6
          ${selectedLanguage === 'English' ? '' : 'text-right'}`}
        >
          <SplitedText
            text={title}
            tag="h1"
            delay={50}
            from={{ opacity: 0, x: 100 }}
            to={{ opacity: 1, x: 0 }}
            className="text-5xl max-md:text-4xl uppercase mb-8"
          />
          <SplitedText
            text={para}
            tag="p"
            delay={5}
            from={{ opacity: 0, x: 100 }}
            to={{ opacity: 1, x: 0 }}
            className="text-lg max-md:text-sm max-w-2xl"
          />
        </div>
      </div>
    </section>
  )
}
