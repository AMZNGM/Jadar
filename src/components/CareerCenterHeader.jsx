'use client'

import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import SplitedText from '@/components/ui/text/SplitedText.jsx'

const CareerCenterHeader = () => {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const listRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        listRef.current.children,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-screen overflow-hidden bg-text text-bg py-24 px-4">
      <BgNoise />

      <div ref={contentRef} className="flex max-md:flex-col gap-6 font-light mb-8 rtl:text-right">
        <ShuffleText
          text={t('jadarsCareers')}
          tag="h1"
          className="text-6xl max-md:text-4xl max-md:text-center uppercase tracking-wider cursor-default text-main"
        />

        <SplitedText text={t('jadarsCareersDesc')} tag="p" delay={5} className="text-xl max-md:text-sm leading-7.5 tracking-wide" />
      </div>

      <ul ref={listRef} className="list-disc list-outside px-4 space-y-4">
        <li>{t('jadarsCareersL1')}</li>
        <li>{t('jadarsCareersL2')}</li>
        <li>{t('jadarsCareersL3')}</li>
        <li>{t('jadarsCareersL4')}</li>
      </ul>
    </section>
  )
}

export default CareerCenterHeader
