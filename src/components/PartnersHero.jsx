'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import partnersData from '@/data/partnersData'
import PartnerHoverCard from '@/components/ui/PartnerHoverCard'
import FollowCursor from '@/components/ui/effects/FollowCursor'
import ShinyText from '@/components/ui/text/ShinyText'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function PartnersHero() {
  const { t } = useTranslation()
  const partnerData = partnersData(t)
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const titlesRef = useRef([])
  const numbersRef = useRef([])
  const headerRef = useRef(null)
  const footerRef = useRef(null)
  const heroTitleRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isContainerVisible, setIsContainerVisible] = useState(false)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: window.innerWidth > 768 ? true : false,
          anticipatePin: 1,
        },
      })

      const getOffsetX = () => {
        if (window.innerWidth >= 1536) return -450
        if (window.innerWidth >= 1024) return -450
        return 0
      }

      tl.from(
        heroTitleRef.current,
        {
          x: document.dir === 'rtl' ? -getOffsetX() : getOffsetX(),
          rotate: 0,
          opacity: 1,
          duration: window.innerWidth > 768 ? 2.4 : 10,
          ease: 'power3.out',
        },
        0
      )

      tl.to(
        containerRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.in',
          onComplete: () => setIsContainerVisible(true),
        },
        0
      )

      titlesRef.current.forEach((title, index) => {
        if (!title) return
        tl.fromTo(
          title,
          {
            x: partnerData[index].direction.x,
            y: partnerData[index].direction.y,
            scale: 0,
            opacity: 0,
            rotationY: 90,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.5,
            ease: index % 2 === 0 ? 'back.out(2)' : 'expo.out',
          },
          0.4 + index * 0.08
        )
      })

      numbersRef.current.forEach((number, index) => {
        if (!number) return
        tl.fromTo(
          number,
          {
            x: -partnerData[index].direction.x,
            scale: 0,
            opacity: 0,
            rotation: 360,
          },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            ease: index % 2 === 0 ? 'back.out(2)' : 'expo.out',
          },
          0.5 + index * 0.08
        )
      })

      tl.fromTo(headerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.8)

      tl.fromTo(footerRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.8)
    }, sectionRef)

    return () => ctx.revert()
  }, [sectionRef])

  return (
    <section ref={sectionRef} className="relative w-screen h-screen overflow-hidden text-text/75 py-14 px-4 max-md:p-2">
      <div className="size-full flex justify-center items-center">
        <BgNoise />
        <div ref={containerRef} className="relative size-full flex justify-center items-center z-10 opacity-0">
          <div className="size-full flex flex-col justify-center ltr:border-l-2 rtl:border-r-2 border-main/30 p-12 max-lg:p-6 max-md:p-2">
            <div ref={headerRef} className="mb-8 opacity-0">
              <h2 className="text-main text-sm font-light tracking-[0.9em] uppercase">{t(`jadar`)}</h2>
              <p className="text-main text-xs font-light tracking-[0.3em] uppercase">.................</p>
            </div>

            {partnerData.map((partner, index) => (
              <Link
                href={partner.website}
                key={index}
                onMouseEnter={() => isContainerVisible && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative w-full flex justify-between items-center border-main/30 text-5xl max-xl:text-4xl max-md:text-3xl font-light leading-relaxed uppercase hover:bg-main/5 transition-all duration-300
                            ${!isContainerVisible ? 'pointer-events-none' : ''}`}
              >
                <h2
                  ref={(el) => (titlesRef.current[index] = el)}
                  className={`relative tracking-wide text-nowrap opacity-0 transition-all duration-300 z-10 py-2 ${
                    index % 2 === 0 ? 'group-hover:-rotate-12!' : 'group-hover:rotate-12!'
                  }`}
                >
                  {partner.title}
                </h2>

                <span
                  ref={(el) => (numbersRef.current[index] = el)}
                  className="relative text-text/30 group-hover:text-main/75 font-bold opacity-0 transition-all duration-300 z-10 px-4"
                >
                  <span
                    className={`inline-block transition-transform duration-300 group-hover:scale-125
                    ${index % 2 === 0 ? 'group-hover:rotate-34' : 'group-hover:-rotate-34'}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
              </Link>
            ))}

            <div ref={footerRef} className="flex items-center gap-4 text-xs text-text/50 opacity-0 mt-8 pl-2">
              <div className="flex items-center gap-2">
                <div className="size-2 bg-main rounded-full animate-pulse" />
                <span>
                  {partnerData.length} {t(`partners`)}
                </span>
              </div>
              <span>|</span>
              <MainBtn to={'/projects'} text={t(`viewAllProjects`)} look="line" size="sm" className="text-text/50 tracking-wider" />
            </div>
          </div>
        </div>

        <h1
          ref={heroTitleRef}
          className="size-full flex justify-center items-center max-lg:absolute inset-0 max-lg:opacity-0 -rotate-20 text-text text-7xl max-md:text-3xl max-lg:text-5xl font-light tracking-wider uppercase"
        >
          <ShinyText text={t('ourPartners')} className="cursor-default" />
        </h1>
      </div>

      <FollowCursor
        offset={() => ({
          x: window.innerWidth > 1024 ? 150 : 10,
          y: window.innerWidth > 768 ? 20 : 10,
        })}
      >
        <PartnerHoverCard
          partner={hoveredIndex !== null ? partnerData[hoveredIndex] : null}
          isVisible={hoveredIndex !== null && isContainerVisible}
        />
      </FollowCursor>
    </section>
  )
}
