'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import partnersData from '@/data/partnersData'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import Logo from '@/components/ui/Logo'
import BgVideo from '@/components/ui/BgVideo.jsx'

const OurJourney = () => {
  const bgVid = '/videos/bgVideo.mp4'
  const mobileImgsrc = '/images/bgVidCover.webp'
  const { t } = useTranslation()
  const partnerData = partnersData(t)
  const sectionRef = useRef(null)
  const horizontalSectionRef = useRef(null)
  const leftSideRef = useRef(null)
  const rightSideRef = useRef(null)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % partnerData.length)
    }, 5000)
    return () => clearInterval(timer)
  })

  const handleLogoClick = (index) => {
    setCurrentLogoIndex(index)
  }

  useGSAP(
    () => {
      const slides = gsap.utils.toArray('.horizontal-slide')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          start: 'top top',
          end: `+=${slides.length * 1000}px`,
          pin: true,
          scrub: 1,
        },
      })

      tl.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: 'none',
      }).to({}, { duration: 0.3 })

      gsap.fromTo(
        '.parallaxSlide',
        { x: -1000 },
        {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: slides,
            start: 'top top',
            end: 'bottom center',
            scrub: true,
            containerAnimation: tl,
          },
        }
      )

      const images = rightSideRef.current.querySelectorAll('div')
      gsap
        .timeline({
          scrollTrigger: {
            trigger: rightSideRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
        .fromTo(
          images,
          { opacity: 0, xPercent: -400 },
          {
            opacity: 1,
            xPercent: 0,
            stagger: 0.08,
            duration: 1,
            ease: 'power2.out',
          }
        )
        .fromTo(
          leftSideRef.current,
          { opacity: 0, xPercent: 200 },
          {
            opacity: 1,
            xPercent: 0,
            duration: 1,
            ease: 'power2.out',
          },
          0
        )
    },
    [sectionRef, horizontalSectionRef, leftSideRef, rightSideRef, partnerData.length],
    { scope: sectionRef }
  )

  return (
    <section dir="ltr" id="Our-Work-logos" ref={sectionRef} className="relative w-screen overflow-hidden bg-bg text-text">
      <div ref={horizontalSectionRef} className="relative w-full min-h-screen flex">
        <div className="horizontal-slide relative w-full h-screen flex shrink-0 justify-center items-center z-50">
          <BgVideo src={bgVid} mobileImgsrc={mobileImgsrc} />

          <div className="relative size-full flex max-lg:flex-col justify-center items-center">
            {/* left side */}
            <div ref={leftSideRef} className="relative size-full flex justify-center items-center">
              {partnerData.map((partner, index) => (
                <div
                  key={index}
                  className={`group size-full absolute inset-0 flex justify-center items-center transition-opacity duration-500
                  ${index === currentLogoIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <Logo logoName={partner.logoName} to={partner.website} className={'w-full px-16'} />
                  <span className="absolute left-1/2 bottom-24 -translate-x-1/2 leading-5 uppercase pointer-events-none select-none text-[12rem] max-md:text-[8rem] text-main/10 duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                    {t(`click`)}
                  </span>
                </div>
              ))}
            </div>

            {/* right side */}
            <div ref={rightSideRef} className="relative size-full grid grid-cols-2 justify-center items-center bg-text">
              <BgNoise />
              {partnerData.map((partner, index) => (
                <div
                  key={index}
                  onClick={() => handleLogoClick(index)}
                  className={`relative size-full flex justify-center items-center bor der border-main/30 cursor-pointer duration-100
                    ${index === currentLogoIndex ? 'opacity-100 bg-bg/15' : 'opacity-50 hover:opacity-100 hover:bg-bg/10'}
                    ${index === partnerData.length - 1 && partnerData.length % 2 !== 0 ? 'col-span-2' : 'col-span-1'}`}
                >
                  <Logo logoName={partner.logoName} to={partner.website} className={'w-80 max-md:w-30 brightness-0 pointer-events-none'} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="horizontal-slide relative w-full h-screen flex shrink-0 justify-center items-center parallaxSlide">
          <Image
            src={ArtboardImgs[19]}
            alt="Kuwait Journey background Image"
            fill
            className="size-full absolute inset-0 object-cover pointer-events-none"
            loading="eager"
          />
          <div className="size-full flex flex-col justify-end items-center gap-2 -translate-y-60 font-light uppercase z-10">
            <ShuffleText text={t('kuwait')} tag="h5" className="text-5xl max-md:text-3xl" />
            <p
              // dir={document.dir === 'rtl' ? 'rtl' : 'ltr'}
              className="mb-12 flex justify-center gap-4"
            >
              <ShuffleText text={t('journeyOf')} tag="span" className="text-7xl max-md:text-4xl" />
              <ShuffleText text={t('jadar')} tag="span" className="text-7xl max-md:text-4xl mb-12 text-main" />
            </p>
            <MainBtn text={t('knowMore')} to={'/projects#kuwait'} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurJourney
