'use client'

import Image from 'next/image'
import Modal from 'react-modal'
import { useRef, useState, useEffect } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { MovingBorders } from '@/data/mediaData/svgs'
import { Globe2Icon, PlayIcon, XIcon } from 'lucide-react'
import { useTranslation } from '@/translations/useTranslation'
import { useLanguage } from '@/translations/LanguageContext'
import { getCountriesData } from '@/data/countriesData'
import { logos } from '@/data/mediaData/logos'
import FloatingEffect from '@/components/ui/effects/FloatingEffect.jsx'
import BgVideo from '@/components/ui/BgVideo.jsx'
import DynCursor from '@/components/ui/effects/DynCursor.jsx'
import ClickEffect from '@/components/ui/effects/ClickEffect.jsx'
import TextFlipper from '@/components/ui/text/TextFlipper.jsx'
import ShinyText from '@/components/ui/text/ShinyText.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

const Hero = ({ videoUrl }) => {
  const vid = '/videos/main hero.webm'
  const { t } = useTranslation()
  const { selectedLanguage } = useLanguage()
  const countries = getCountriesData(t)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const cardsRef = useRef(null)
  const autoplayRef = useRef(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)
  const [shuffledLogos, setShuffledLogos] = useState([...logos])
  const [scrollY, setScrollY] = useState(0)
  const selectedCountry = countries[selectedIndex]
  const openVideo = () => setIsVideoOpen(true)
  const closeVideo = () => setIsVideoOpen(false)
  const shuffleLogos = () => {
    const newShuffledLogos = [...logos]
    for (let i = newShuffledLogos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newShuffledLogos[i], newShuffledLogos[j]] = [newShuffledLogos[j], newShuffledLogos[i]]
    }
    setShuffledLogos(newShuffledLogos)
  }

  useGSAP(() => {
    gsap.fromTo('.slideUp', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: 'power2.out' })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.topLine', { x: -5000 }, { x: 0, duration: 3, ease: 'power2.out' }, '-=2')
    tl.fromTo('.bottomLine', { x: 5000 }, { x: 0, duration: 3, ease: 'power2.out' }, '-=3')

    gsap.utils.toArray(['.topLine', '.bottomLine']).forEach((line) => {
      const isTopLine = line.classList.contains('topLine')
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

    gsap.to(sectionRef.current, {
      scale: 0.85,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: true,
      },
    })

    gsap.to(contentRef.current, {
      yPercent: window.innerWidth < 768 ? '50' : '',
      x: window.innerWidth > 768 ? (document.dir === `ltr` ? '400' : '-400') : '',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        scrub: true,
      },
    })

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
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (typeof window !== 'undefined') setScrollY(window.scrollY || window.pageYOffset || 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!selectedCountry) return null

  return (
    // <FloatingEffect intensity={scrollY > 10 ? 2 : 0}>
    <section ref={sectionRef} className="relative w-screen h-screen bg-bg text-text px-4 py-12">
      <BgVideo src={vid} />

      <DynCursor />

      <div className="relative flex max-lg:justify-center items-end size-full">
        <div ref={contentRef} className="flex flex-col justify-end max-lg:items-center size-full">
          <div className="slideUp max-lg:text-center font-semibold tracking-[0.7rem] uppercase overflow-hidden">
            <div className="flex max-lg:flex-col items-center text-6xl">
              <ShinyText text={t('new')} />
              <ShinyText text={t('vision')} />
            </div>
            <ShinyText text={t('lifecyclePropertySolutionsProviders')} className="text-text/85 tracking-[0.15rem]" />
          </div>

          <ClickEffect className="flex justify-center items-center gap-4 size-fit mt-5">
            <MainBtn onClick={openVideo} look="outline" className="slideUp text-text border-text/75 border-y-0 hover:border-transparent">
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

      <Modal
        isOpen={isVideoOpen}
        onRequestClose={closeVideo}
        contentLabel="Jadar Project Video"
        className="fixed top-1/2 left-1/2 -translate-1/2 w-[90%] max-w-[1000px] outline-none p-0 m-0"
        overlayClassName="fixed inset-0 flex justify-center items-center bg-bg/75 backdrop-blur-md duration-200 z-50"
      >
        <div className="relative size-full pb-[56.25%] max-w-4xl mx-auto">
          <button
            onClick={closeVideo}
            aria-label="Close"
            className="group absolute right-0 -top-12 cursor-pointer text-text hover:bg-main z-10"
          >
            <ClickEffect className="size-full p-2">
              <XIcon className={'duration-300 group-hover:rotate-90 group-active:scale-90'} />
            </ClickEffect>
          </button>
          <iframe
            src={videoUrl}
            allowFullScreen
            frameBorder="0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0 size-full"
          />
        </div>
      </Modal>

      <div
        ref={cardsRef}
        className="absolute bottomLine bottom-3.5 rtl:left-5 ltr:right-5 w-95 flex flex-col gap-2 z-50 max-lg:hidden transform-3d"
      >
        <div
          onClick={() => scrollToSection('#map-section')}
          className="w-full h-35 bg-text/5 backdrop-blur-lg overflow-hidden hover:bg-main/5 duration-500 cursor-pointer p-6"
        >
          <MovingBorders />
          <div className="hover:scale-95 duration-500 space-y-4 font-light uppercase">
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
              className="size-full object-contain rounded-lg hover:scale-95 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      <div className="max-lg:hidden">
        <div className={`topLine w-100 h-1 bg-main absolute top-35.5 ${selectedLanguage === 'English' ? 'left-0' : 'right-0'}`} />
        <div className={`bottomLine w-100 h-1 bg-main absolute bottom-32 ${selectedLanguage === 'English' ? 'right-0' : 'left-0'}`} />
      </div>

      <style>
        {`
            @keyframes scroll-indicator {
              0% { transform: translateY(-100%); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateY(200%); opacity: 0; }
            }
            .animate-scroll-indicator {
              animation: scroll-indicator 1.5s infinite ease-in-out;
            }
        `}
      </style>
    </section>
    // </FloatingEffect>
  )
}

export default Hero
