'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'

export default function OurApproach() {
  const { t } = useTranslation()
  const sectionRef = useRef([])
  const containerRef = useRef([])

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
    containerRef.current.forEach((el) => {
      if (!el) return

      const image = el.querySelector('.js-image')
      const content = el.querySelector('.js-content')
      const title = el.querySelector('.js-title')
      const desc = el.querySelector('.js-desc')

      gsap.set(content, { opacity: 0 })
      gsap.set(image, { opacity: 0, scale: 1.2 })
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

      // parallax
      gsap.to(title, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(desc, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-screen h-screen overflow-hidden bg-bg">
      <div className="h-full">
        {sections.map((section, i) => (
          <div key={section.id} ref={(el) => (containerRef.current[i] = el)} className="overflow-hidden relative w-full h-1/3">
            <div className="relative size-full">
              <ParallaxElement direction="scale" className="size-full">
                <Image src={section.image} alt={`Section ${section.id}`} fill className="object-cover js-image will-change-transform" />
              </ParallaxElement>

              <div className="flex absolute inset-0 z-10 flex-col justify-center items-center p-4 font-light text-center uppercase js-content will-change-transform">
                <div className="mb-8 max-w-6xl text-5xl font-extralight tracking-wider duration-300 js-title will-change-transform max-md:text-3xl text-text">
                  {section.title}
                </div>

                <div className="max-w-5xl text-lg tracking-wide leading-relaxed duration-300 js-desc will-change-transform max-md:text-sm text-text/80">
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
