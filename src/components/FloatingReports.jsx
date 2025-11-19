'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import ParallaxElement from '@/components/ui/effects/ParallaxElement'
import SplitedText from '@/components/ui/text/SplitedText'
import ShinyText from '@/components/ui/text/ShinyText'

export default function FloatingReports() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const bgImgRef = useRef(null)

  const imgsPositions = [
    { x: '70%', y: '5%', scale: 1.3, inScale: 1.4, clip: 'inset(0% 20% 0% 0%)' },
    { x: '2%', y: '10%', scale: 1.0, inScale: 1.9, clip: 'inset(10% 30% 0% 0%)' },
    { x: '40%', y: '20%', scale: 1.2, inScale: 1.2, clip: 'inset(0% 0 50% 10%)' },
    { x: '30%', y: '37%', scale: 1.0, inScale: 1.6, clip: 'inset(10% 20% 50% 0%)' },
    { x: '60%', y: '45%', scale: 1.2, inScale: 1.4, clip: 'inset(10% 20% 20% 20%)' },
    { x: '30%', y: '60%', scale: 1.3, inScale: 1.3, clip: 'inset(50% 20% 0 0)' },
    { x: '75%', y: '65%', scale: 1.6, inScale: 1.6, clip: 'inset(0 0 40% 60%)' },
    { x: '10%', y: '30%', scale: 1.0, inScale: 1.2, clip: 'inset(40% 30% 20% 0%)' },
    { x: '30%', y: '38%', scale: 1.1, inScale: 1.2, clip: 'inset(20% 0% 0% 0%)' },
  ]

  useGSAP(() => {
    const items = bgImgRef.current.querySelectorAll('.floating-img')
    items.forEach((el, i) => {
      gsap.to(el, {
        y: 300 + i * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }, [])

  return (
    <section dir="ltr" ref={sectionRef} className="relative w-screen min-h-screen h-[150vh] bg-black text-text overflow-hidden">
      <div className="absolute inset-0 translate-y-50 flex items-center justify-center pointer-events-none z-10">
        <div className="w-full max-w-4xl text-center px-4 -translate-y-1/2 top-1/2 absolute">
          <ParallaxElement>
            <ShinyText
              text={t('jadarReports')}
              delay={45}
              tag="h2"
              className="mb-8 text-8xl font-extralight tracking-wide uppercase max-md:text-5xl"
            />
          </ParallaxElement>

          <ParallaxElement speed={0.7}>
            <SplitedText
              text={t('jadarReportsDesc')}
              delay={2}
              tag="p"
              className="mt-12 max-w-5xl mx-auto text-lg font-light tracking-wide leading-8 uppercase max-md:text-sm text-text/75"
            />
          </ParallaxElement>
        </div>
      </div>

      <div ref={bgImgRef} className="absolute inset-0 w-full h-full overflow-hidden">
        {imgsPositions.map((pos, i) => (
          <div
            key={i}
            className="floating-img absolute overflow-hidden w-48 h-48 md:w-64 md:h-64 opacity-40 will-change-transform"
            style={{
              left: pos.x,
              top: pos.y,
              clipPath: pos.clip,
              transform: `scale(${pos.scale})`,
            }}
          >
            <Image
              src={ArtboardImgs[0]}
              alt="report-image"
              fill
              className="object-cover"
              style={{ transform: `scale(${pos.inScale})` }}
              sizes="25vw"
              priority={i < 3}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
