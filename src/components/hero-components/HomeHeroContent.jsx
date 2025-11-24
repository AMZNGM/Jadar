'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/translations/LanguageContext'
import { useTranslation } from '@/translations/useTranslation'
import { Globe2Icon, PlayIcon } from 'lucide-react'
import { MovingBorders } from '@/data/mediaData/svgs'
import { getCountriesData } from '@/data/countriesData'
import { logos } from '@/data/mediaData/logos'
import ShinyText from '@/components/ui/text/ShinyText'
import ClickEffect from '@/components/ui/effects/ClickEffect'
import TextFlipper from '@/components/ui/text/TextFlipper'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function HomeHeroContent({ onOpenVideo, slideUpRef, sectionRef }) {
  const { t } = useTranslation()
  const { selectedLanguage } = useLanguage()
  const topLineRef = useRef(null)
  const bottomLineRef = useRef(null)
  const countries = getCountriesData(t)
  const autoplayRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)
  const [shuffledLogos, setShuffledLogos] = useState([...logos])
  const selectedCountry = countries[selectedIndex]

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
          scale: 0.8,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '25% top',
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress
              const xValue = isTopLine
                ? isRTL
                  ? `${progress * 100}%`
                  : `-${progress * 100}%`
                : isRTL
                ? `-${progress * 100}%`
                : `${progress * 100}%`
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

  useEffect(() => {
    const shuffleLogos = () => {
      const newShuffledLogos = [...logos]
      for (let i = newShuffledLogos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newShuffledLogos[i], newShuffledLogos[j]] = [newShuffledLogos[j], newShuffledLogos[i]]
      }
      setShuffledLogos(newShuffledLogos)
    }

    shuffleLogos()

    const logoIntervalRef = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % shuffledLogos.length)
      if ((currentLogoIndex + 1) % shuffledLogos.length === 0) {
        shuffleLogos()
      }
    }, 5000)
    autoplayRef.current = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % countries.length)
    }, 5000)

    return () => {
      if (logoIntervalRef) clearInterval(logoIntervalRef)
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [countries.length, shuffledLogos.length])

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!selectedCountry) return null

  return (
    <div ref={sectionRef} className="relative size-full">
      <div ref={topLineRef} className="relative size-full flex max-lg:justify-center items-end py-8 px-4">
        <div ref={slideUpRef} className="flex flex-col justify-end max-lg:items-center size-full max-md:mb-12">
          <div className="slideUp max-lg:text-center font-semibold tracking-[0.7rem] uppercase overflow-hidden">
            <div className="flex max-lg:flex-col items-center text-6xl">
              <ShinyText text={t('newVision')} />
            </div>
            <ShinyText text={t('lifecyclePropertySolutionsProviders')} className="text-text/85 tracking-[0.15rem]" />
          </div>

          <ClickEffect className="flex justify-center items-center gap-4 size-fit mt-6">
            <MainBtn onClick={onOpenVideo} look="outline" className="slideUp text-text border-text/75 border-y-0 hover:border-transparent">
              <Globe2Icon strokeWidth={1.5} className="size-5 animate-spin" />
              <TextFlipper className={'text-text font-medium text-lg'}>{t('watchFullVideo')}</TextFlipper>
              <PlayIcon strokeWidth={1.5} className="size-5" />
            </MainBtn>
          </ClickEffect>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 max-lg:hidden">
          <div className="overflow-hidden relative w-px h-10 bg-text/50">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-text animate-scroll-indicator" />
          </div>
        </div>
      </div>

      <div ref={bottomLineRef} className="absolute bottom-6 rtl:left-9 ltr:right-9 w-95 flex flex-col gap-2 transform-3d px-4">
        <div
          ref={slideUpRef}
          onClick={() => scrollToSection('#map-section')}
          className="w-full h-35 bg-text/5 backdrop-blur-lg overflow-hidden hover:bg-main/5 duration-500 cursor-pointer"
        >
          <MovingBorders />
          <div className="hover:scale-95 duration-500 space-y-4 font-light uppercase p-4">
            <h3 className="text-main text-4xl">{selectedCountry.countryName}</h3>
            <p className="text-text/80">
              Currently working on <span className="text-main">{selectedCountry.value}</span> projects in{' '}
              <span className="text-main">{selectedCountry.countryCode}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div
            onClick={() => scrollToSection('#map-section')}
            className="size-full bg-text/5 backdrop-blur-lg overflow-hidden hover:bg-main/5 duration-500 cursor-pointer p-2"
          >
            <MovingBorders />

            {selectedCountry.img ? (
              <Image
                src={selectedCountry.img}
                alt={selectedCountry.countryName}
                priority={false}
                className="size-full object-cover hover:scale-95 duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-main font-light">No image available</span>
              </div>
            )}
          </div>

          <div
            onClick={() => scrollToSection('#Our-Work-logos')}
            className="size-full bg-text/5 backdrop-blur-lg overflow-hidden hover:bg-main/5 duration-500 cursor-pointer p-2"
          >
            <MovingBorders />

            <Image
              src={shuffledLogos[currentLogoIndex].img}
              alt={shuffledLogos[currentLogoIndex].project}
              loading="lazy"
              priority={false}
              className="size-full object-contain rounded-lg hover:scale-95 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
