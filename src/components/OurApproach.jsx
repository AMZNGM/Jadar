'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'

export default function OurApproach() {
  const { t } = useTranslation()
  const sectionRef = useRef([])
  const containerRef = useRef([])
  const imageRefs = useRef([])
  const contentRefs = useRef([])
  const titleRefs = useRef([])
  const descRefs = useRef([])

  const sections = [
    {
      id: 1,
      title: t('OurApproach1title'),
      description: t('OurApproach1desc'),
      image: ArtboardImgs[11],
    },
    {
      id: 2,
      title: t('OurApproach2title'),
      description: t('OurApproach2desc'),
      image: ArtboardImgs[13],
    },
    {
      id: 3,
      title: t('OurApproach3title'),
      description: t('OurApproach3desc'),
      image: ArtboardImgs[5],
    },
  ]

  useGSAP(() => {
    const isMobile = window.innerWidth < 768

    containerRef.current.forEach((el, i) => {
      if (!el) return

      const image = imageRefs.current[i]
      const content = contentRefs.current[i]
      const title = titleRefs.current[i]
      const desc = descRefs.current[i]

      gsap.set(image, { opacity: 0, scale: 1.2 })
      gsap.set(content, { opacity: 0 })
      gsap.set(title, { opacity: 0, y: 100 })
      gsap.set(desc, { opacity: 0, y: 50 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 40%',
        },
      })

      tl.to(image, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
      })
        .to(
          content,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.8'
        )
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          desc,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.4'
        )

      if (!isMobile) {
        gsap.to([title, desc], {
          y: (index) => (index === 0 ? -100 : -50),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative w-screen h-screen overflow-hidden bg-bg">
      <div className="h-full">
        {sections.map((section, i) => (
          <div key={section.id} ref={(el) => (containerRef.current[i] = el)} className="overflow-hidden relative w-full h-1/3">
            <div className="relative size-full">
              <ParallaxElement direction="scale" className="relative size-full">
                <Image
                  ref={(el) => (imageRefs.current[i] = el)}
                  src={section.image}
                  alt={`Section ${section.id}`}
                  fill
                  className="object-cover will-change-transform"
                />
              </ParallaxElement>

              <div
                ref={(el) => (contentRefs.current[i] = el)}
                className="flex absolute inset-0 z-10 flex-col justify-center items-center p-4 font-light text-center uppercase will-change-transform"
              >
                <div
                  ref={(el) => (titleRefs.current[i] = el)}
                  className="mb-8 max-w-6xl text-5xl font-extralight tracking-wider duration-300 will-change-transform max-md:text-3xl text-text"
                >
                  {section.title}
                </div>

                <div
                  ref={(el) => (descRefs.current[i] = el)}
                  className="max-w-5xl text-lg tracking-wide leading-relaxed duration-300 will-change-transform max-md:text-sm text-text/80"
                >
                  {section.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
