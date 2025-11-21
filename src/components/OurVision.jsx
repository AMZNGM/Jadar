'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs.js'
import { ArrowDown } from 'lucide-react'
import { visionData } from '@/data/visionData'
import SplitedText from '@/components/ui/text/SplitedText.jsx'

export default function OurVision() {
  const { t } = useTranslation()
  const visions = visionData(t)
  const sectionRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(-1)

  useGSAP(() => {
    if (!sectionRef.current) return

    const totalSteps = visions.length + 2

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${totalSteps * window.innerHeight}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const currentStep = Math.floor(progress * totalSteps)

        if (currentStep === 0) {
          setActiveIndex(-1)
        } else if (currentStep <= visions.length) {
          setActiveIndex(currentStep - 1)
        } else {
          setActiveIndex(visions.length)
        }
      },
    })
  }, [sectionRef])

  return (
    <section ref={sectionRef} className="overflow-hidden relative px-4 py-12 w-screen min-h-screen bg-bg">
      <Image className="object-cover absolute inset-0 size-full" src={ArtboardImgs[14]} alt="Background Image" loading="eager" />

      <div className="relative size-full">
        {/* intro text */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center duration-1000 ${
            activeIndex === -1 ? 'scale-100' : 'not-only:scale-90 -top-130 max-md:-top-120'
          }`}
        >
          <div className="max-w-4xl font-light text-center text-text">
            <SplitedText
              text={t('ourVision')}
              tag="h1"
              className="text-7xl text-text/75 max-sm:text-4xl tracking-[0.7rem] mb-8 uppercase duration-300"
            />

            <SplitedText
              text={t('ourVisionDesc')}
              tag="p"
              delay={10}
              from={{ opacity: 0, y: 0 }}
              className="text-lg leading-relaxed duration-300 max-sm:text-sm"
            />

            <ArrowDown className="mx-auto mt-12 animate-bounce size-6 text-main/50" />
          </div>
        </div>

        {/* cards */}
        {visions.map((vision, index) => (
          <div
            key={vision.id}
            className={`absolute inset-0 top-70 max-md:top-70 flex items-center justify-center duration-1000 ${
              index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex overflow-hidden relative flex-col justify-between p-8 mx-4 max-w-5xl border backdrop-blur-sm h-120 bg-bg/70 border-text/10">
              <div className="flex justify-between items-center">
                <div
                  className="rounded-full opacity-70 size-4 bg-main"
                  style={{
                    boxShadow: '0 0 20px #d73b13, 0 0 40px rgba(215, 59, 19, 0.6)',
                  }}
                />
                <h2 className="text-3xl font-light duration-300 text-main max-sm:text-xl">{vision.name}</h2>
                <div />
              </div>

              <p className="text-xl font-light leading-relaxed text-center duration-300 text-main max-sm:text-lg">{vision.description}</p>

              <div />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
