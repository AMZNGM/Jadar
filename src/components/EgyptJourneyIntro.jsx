'use client'

import Image from 'next/image'
import { gsap } from '@/utils/gsapConfig'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs.js'
import { useTranslation } from '@/translations/useTranslation'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

export default function EgyptJourneyIntro() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const bgImgRef = useRef(null)
  const textRef = useRef(null)
  const btnRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        pin: true,
        scrub: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    gsap.set(bgImgRef.current, {
      clipPath: 'inset(0 50% 0 51%)',
    })

    tl.to(bgImgRef.current, {
      clipPath: 'inset(0 0% 0 0%)',
      duration: 1,
      ease: 'power2.inOut',
    })

    tl.to(
      textRef.current,
      {
        color: '#181818',
        ease: 'power2.inOut',
      },
      0
    )

    tl.to(
      btnRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      },
      0
    )

    tl.to({}, { duration: 0.5 })
  }, [sectionRef])

  return (
    <section ref={sectionRef} className="relative w-screen min-h-screen overflow-hidden bg-transparent text-text">
      <Image
        ref={bgImgRef}
        src={ArtboardImgs[4]}
        loading="lazy"
        alt="background image"
        className="w-screen h-screen object-cover absolute inset-0 pointer-events-none"
      />

      <div className="relative w-full h-screen">
        <div ref={btnRef} className="absolute top-8 ltf:left-0 rtl:right-0 max-md:size-full opacity-0 -translate-y-100 z-50">
          <MainBtn to="/projects" text={t('knowMore')} look="outline" className="border-x-0" />
        </div>
        <div className="flex justify-center items-center size-full z-10">
          <div ref={textRef} className="text-center uppercase -translate-y-20">
            <ShuffleText text={t('egypt')} tag="h2" className="text-5xl max-md:text-3xl font-bold mb-8 max-md:mb-2" />
            <p className="flex justify-center gap-4">
              <ShuffleText text={t('journeyOf')} tag="span" className="text-7xl max-md:text-4xl" />
              <ShuffleText text={t('jadar')} tag="span" className="text-7xl max-md:text-4xl text-main" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
