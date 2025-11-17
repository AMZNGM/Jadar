'use client'

import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/translations/LanguageContext'

export default function HeroLines({ sectionRef }) {
  const { selectedLanguage } = useLanguage()
  const topLineRef = useRef(null)
  const bottomLineRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(topLineRef.current, { xPercent: -200 }, { xPercent: 0, duration: 3, ease: 'power2.out' }, '-=2')
      tl.fromTo(bottomLineRef.current, { xPercent: 200 }, { xPercent: 0, duration: 3, ease: 'power2.out' }, '-=3')

      gsap.utils.toArray([topLineRef.current, bottomLineRef.current]).forEach((line) => {
        const isTopLine = line === topLineRef.current
        const isRTL = selectedLanguage !== 'English'
        gsap.set(line, { x: 0 })
        gsap.to(line, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '25% top',
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress
              const xValue = isTopLine
                ? isRTL
                  ? `${progress * 400}%`
                  : `-${progress * 400}%`
                : isRTL
                ? `-${progress * 400}%`
                : `${progress * 400}%`
              gsap.set(line, { x: xValue })
            },
            onLeave: () => {
              const finalX = isTopLine ? (isRTL ? '150%' : '-150%') : isRTL ? '-150%' : '150%'
              gsap.set(line, { x: finalX })
            },
            onEnterBack: () => {
              gsap.to(line, { x: 0, duration: 0.8, ease: 'power2.out' })
            },
          },
        })
      })
    },
    { dependencies: [selectedLanguage] }
  )

  return (
    <div className="max-lg:hidden">
      <div ref={topLineRef} className={`w-100 h-1 bg-main absolute top-35.5 ${selectedLanguage === 'English' ? 'left-0' : 'right-0'}`} />
      <div
        ref={bottomLineRef}
        className={`w-100 h-1 bg-main absolute bottom-32 ${selectedLanguage === 'English' ? 'right-0' : 'left-0'}`}
      />
    </div>
  )
}
