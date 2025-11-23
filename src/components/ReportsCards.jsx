'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/translations/useTranslation'
import { BgNoise, MovingBorders } from '@/data/mediaData/svgs'
import { reportsData } from '@/data/reportsData'
import FloatingEffect from '@/components/ui/effects/FloatingEffect.jsx'
import TextFlipper from '@/components/ui/text/TextFlipper.jsx'

export default function ReportsCards() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const reportsList = reportsData(t)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useGSAP(() => {
    if (isMobile) return

    const section = sectionRef.current
    if (!section) return

    const stickyCards = sectionRef.current.querySelectorAll('.sticky-card')

    stickyCards.forEach((card, index) => {
      if (index < stickyCards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: stickyCards[stickyCards.length - 1],
          end: 'top top',
          pin: true,
          invalidateOnRefresh: true,
        })

        ScrollTrigger.create({
          trigger: stickyCards[index + 1],
          start: 'top bottom',
          end: 'top top',
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress
            gsap.set(card, {
              scale: 1 - progress * 0.25,
              rotation: (index % 2 === 0 ? 5 : -5) * progress,
              y: progress * 16,
              '--after-Opacity': progress,
            })
          },
        })
      }
    })
  }, [sectionRef])

  return (
    <section ref={sectionRef} className="relative w-screen min-h-screen overflow-hidden text-main">
      <div className="flex relative flex-col gap-4 size-full bg-black">
        {reportsList.map((report) => (
          <div key={report.id} className="sticky-card">
            <FloatingEffect>
              <div
                style={{ '--after-Opacity': 0 }}
                className="relative w-full h-[60vh] sm:h-[55vh] md:h-[50vh] lg:h-[45vh] overflow-hidden duration-500 will-change-transform border border-main/50"
              >
                <MovingBorders />
                <div className="absolute inset-0 z-20 pointer-events-none bg-black/50" style={{ opacity: 'var(--after-Opacity)' }} />

                <Image src={report.image} alt="Image" fill loading="eager" className="object-cover" />

                <BgNoise />

                <div className="flex absolute top-0 right-0 justify-end font-light size-full max-md:flex-col z-10 opacity-95">
                  <div className="flex justify-center items-center text-center size-full md:max-w-50 max-md:h-8 bg-black/75 border-x max-md:border-x-0 border-y-0 max-md:border-y border-main/50">
                    <h3 className="flex gap-1 justify-center items-center px-2 h-full text-sm tracking-wide sm:text-lg md:text-xl lg:text-2xl sm:px-0 leading-15 md:flex-col">
                      <span>{t('jadar')}</span>
                      {report.date}
                      <span>{t('reports')}</span>
                    </h3>
                  </div>

                  <div className="flex justify-center items-center text-center border-b-0 size-full md:max-w-40 max-md:h-8 bg-black/75 border-x max-md:border-x-0 max-md:border-b border-main/50">
                    <p className="px-2 text-xs tracking-wide sm:text-sm md:text-base sm:px-0 leading-15">
                      {t('comprehensiveYearlyInsightsInPDFFormat')}
                    </p>
                  </div>

                  <div className="border-b-0 size-full md:max-w-40 max-md:h-8 bg-black/75 border-x max-md:border-x-0 max-md:border-b border-main/50">
                    <a
                      href={report.fileLink}
                      download
                      className="flex justify-center items-center text-xs text-center cursor-pointer size-full hover:text-text hover:bg-main/80 duration-300 sm:text-sm md:text-base"
                    >
                      <TextFlipper>Download PDF</TextFlipper>
                    </a>
                  </div>

                  <div className="flex justify-center items-center text-center border-b-0 size-full md:max-w-40 max-md:h-8 bg-black/75 border-s max-md:border-s-0 max-md:border-b border-main/50">
                    <span className="text-xs sm:text-sm md:text-base">{report.id}</span>
                  </div>
                </div>
              </div>
            </FloatingEffect>
          </div>
        ))}
      </div>
    </section>
  )
}
