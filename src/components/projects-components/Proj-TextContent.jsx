'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { projectImages } from '@/data/mediaData/projectMedia.js'
import { HoverGallery } from '@/components/ui/HoverGallery.jsx'
import { useTranslation } from '@/translations/useTranslation.js'
import { BgNoise } from '@/data/mediaData/svgs.jsx'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'

export const AbdullaMubarakHero = ({ desc1, desc2, desc3, desc4, value, startDate, endDate, status, category, location, mainLine }) => {
  const { t } = useTranslation()
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (window.innerWidth <= 768) return

      ScrollTrigger.batch('.reveal-text', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.15,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      ScrollTrigger.batch('.reveal-section', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out',
              stagger: 0.2,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      return () => ScrollTrigger.getAll().forEach((st) => st.kill())
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative w-screen overflow-hidden bg-text text-bg px-4">
      <BgNoise />

      <div className="reveal-section grid grid-cols-6 overflow-hidden border-b border-bgb py-3">
        <div className="col-span-4 col-start-3 max-sm:col-start-2 border-s border-bgb px-8 max-md:px-2 py-42 max-md:py-12">
          <h2
            dangerouslySetInnerHTML={{ __html: mainLine }}
            className="reveal-text text-6xl max-lg:text-5xl max-md:text-3xl max-sm:text-2xl font-extralight max-md:font-light tracking-wide"
          />
        </div>
      </div>

      <div className="reveal-section grid grid-cols-3 overflow-hidden gap-y-4 pt-3">
        <div className="col-span-1 col-start-2 max-md:col-span-3 max-md:col-start-1 border-x border-bgb p-3 pb-24 space-y-2">
          <span className="text-bg/30 text-sm block">01</span>
          <ShuffleText text={t('development')} tag="h3" className="reveal-text text-2xl" />
          <p dangerouslySetInnerHTML={{ __html: desc1 }} className="reveal-text text-bg/50" />
        </div>
      </div>

      <div className="reveal-section grid grid-cols-3 overflow-hidden gap-y-4 pt-3">
        <div className="col-span-1 col-start-1 max-md:col-span-3 max-md:col-start-1 border-y border-bgb max-md:hidden" />
        <div className="col-span-1 col-start-3 max-md:col-span-3 max-md:col-start-1 border-y border-bgb max-md:hidden" />

        <div className="col-span-1 col-start-1 max-md:col-span-3 max-md:col-start-1 max-md:border-y border-bgb space-y-2 pe-4 max-md:py-4">
          <span className="text-bg/30 text-sm block">02</span>
          <ShuffleText text={t('innovation')} tag="h3" className="reveal-text text-2xl" />
          <p dangerouslySetInnerHTML={{ __html: desc2 }} className="reveal-text text-bg/50" />
        </div>

        <div className="col-span-1 col-start-2 max-md:col-span-3 max-md:col-start-1 border-s max-md:border-x border-bgb ps-4 pb-24 space-y-2 flex flex-col justify-start">
          <span className="text-bg/30 text-sm block">03</span>
          <ShuffleText text={t(`projectDetails`)} tag="h3" className="reveal-text text-2xl rtl:text-right" />
          <p className="reveal-text text-bg/50">
            {t(`projectValue`)}: <span className="text-main/50">{value}</span>
          </p>
          <p className="reveal-text text-bg/50">
            {t(`startDate`)}: {startDate}
          </p>
          <p className="reveal-text text-bg/50">
            {t(`endDate`)}: {endDate}
          </p>
          <p className="reveal-text text-bg/50">
            {t(`status`)}: {status}
          </p>
          <p className="reveal-text text-bg/50">
            {t(`category`)}: {category}
          </p>
          <p className="reveal-text text-bg/50">
            {t(`location`)}: {location}
          </p>
        </div>

        <div className="col-span-1 col-start-3 max-md:col-span-3 max-md:col-start-1 border-s max-md:border-s-0 max-md:border-y border-bgb space-y-2 md:ps-4 max-md:py-4">
          <span className="text-bg/30 text-sm block">04</span>
          <ShuffleText text={t('communityCentric')} tag="h3" className="reveal-text text-2xl" />
          <p dangerouslySetInnerHTML={{ __html: desc3 }} className="reveal-text text-bg/50" />
        </div>

        <div className="col-span-1 col-start-1 max-md:col-span-3 max-md:col-start-1 border-y border-bgb max-md:hidden" />
        <div className="col-span-1 col-start-3 max-md:col-span-3 max-md:col-start-1 border-y border-bgb max-md:hidden" />
      </div>

      <div className="reveal-section grid grid-cols-3 overflow-hidden gap-y-4 py-3">
        <div className="col-span-1 col-start-2 max-md:col-span-3 max-md:col-start-1 border-x max-md:border-b border-bgb p-3 pb-24 max-md:pb-12 space-y-2">
          <span className="text-bg/30 text-sm block">05</span>
          <ShuffleText text={t('futureReady')} tag="h3" className="reveal-text text-2xl" />
          <p dangerouslySetInnerHTML={{ __html: desc4 }} className="reveal-text text-bg/50" />
        </div>
      </div>
    </section>
  )
}

export const AbdullaMubarakHeadline = ({ headLine }) => {
  return (
    <section className="relative w-screen overflow-hidden bg-bg text-text px-4 lg:-mt-32">
      <BgNoise />

      <div className="grid grid-cols-6 border-t border-main/50 py-3 max-md:-translate-x-9">
        <ParallaxElement
          speed={0.8}
          direction="scale"
          ease="power2.out"
          className={`col-span-4 max-md:col-span-6 col-start-3 flex justify-start items-center border-s border-main/50
          px-8 py-32 max-lg:px-2 max-md:px-4 max-md:py-12
          ms-60 2xl:ms-80 max-xl:ms-20 max-lg:-ms-10 max-md:ms-52 max-sm:ms-7`}
        >
          <p dangerouslySetInnerHTML={{ __html: headLine }} className="text-5xl font-extralight tracking-wide max-w-md uppercase" />
        </ParallaxElement>

        <ParallaxElement
          speed={0.45}
          direction="horizontal"
          ease="power2.out"
          className={`leading-5 uppercase pointer-events-none select-none text-[15vw] text-main/10
          absolute left-400 2xl:left-500 max-sm:left-90 max-md:left-150 max-lg:left-220 max-xl:left-300`}
        >
          Shaping Life Shaping Life Shaping Life Shaping Life
          <br />
          Shaping Life Shaping Life Shaping Life Shaping Life
          <br />
          Shaping Life Shaping Life Shaping Life Shaping Life
        </ParallaxElement>
      </div>
    </section>
  )
}

export const EastSabahHero = ({ desc1, desc2, desc3, value, startDate, endDate, status, category, location, mainLine }) => {
  const { t } = useTranslation()
  const containerRef = useRef(null)

  useGSAP(
    () => {
      ScrollTrigger.batch('.reveal-text', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.15,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      ScrollTrigger.batch('.reveal-img', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.15,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      ScrollTrigger.batch('.reveal-section', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out',
              stagger: 0.2,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      return () => ScrollTrigger.getAll().forEach((st) => st.kill())
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative w-screen bg-text text-bg px-4">
      <BgNoise />

      <div className="reveal-section grid grid-cols-6 gap-4 border-b border-bgb overflow-hidden py-3">
        <div className="col-span-2 col-start-1 flex items-end overflow-hidden">
          <p dangerouslySetInnerHTML={{ __html: desc2 }} className="reveal-text text-sm font-light text-end" />
        </div>

        <div className="col-span-4 col-start-3 border-s border-bgb overflow-hidden px-8 max-md:px-2 py-32 max-md:py-12">
          <p
            dangerouslySetInnerHTML={{ __html: mainLine }}
            className="reveal-text text-6xl max-lg:text-5xl max-md:text-3xl max-sm:text-2xl font-extralight max-md:font-light tracking-wide"
          />
        </div>
      </div>

      <div className="reveal-section grid grid-cols-6 gap-4 border-b border-bgb py-3">
        <div className="col-span-4 max-md:col-span-6 col-start-1 flex flex-col justify-between border-e max-md:border-e-0 max-md:border-b border-bgb overflow-hidden py-8 pe-2">
          <ShuffleText
            text={t('theEssentials')}
            className="reveal-text text-7xl max-lg:text-6xl max-sm:text-5xl font-extralight tracking-wide mb-32 max-md:mb-18 rtl:text-right"
          />

          <p
            dangerouslySetInnerHTML={{ __html: desc1 }}
            className="reveal-text text-3xl max-sm:text-2xl font-extralight tracking-wide mb-48 max-md:mb-12"
          />

          <ParallaxElement speed={1} className="flex justify-end pe-4">
            <p dangerouslySetInnerHTML={{ __html: desc3 }} className="reveal-text text-sm font-light tracking-wider leading-6 max-w-sm" />
          </ParallaxElement>
        </div>

        <div className="col-span-2 max-md:col-span-6 col-start-5 flex flex-col md:justify-between gap-4 relative">
          <ParallaxElement className="space-y-2 max-md:mt-4 mt-18">
            <h3 className="reveal-text text-2xl">{t(`projectDetails`)}</h3>
            <p className="reveal-text text-bg/50">
              {t(`projectValue`)}: <span className="text-main/50">{value}</span>
            </p>
            <p className="reveal-text text-bg/50">
              {t(`startDate`)}: {startDate}
            </p>
            <p className="reveal-text text-bg/50">
              {t(`endDate`)}: {endDate}
            </p>
            <p className="reveal-text text-bg/50">
              {t(`status`)}: {status}
            </p>
            <p className="reveal-text text-bg/50">
              {t(`category`)}: {category}
            </p>
            <p className="reveal-text text-bg/50">
              {t(`location`)}: {location}
            </p>
          </ParallaxElement>

          <ParallaxElement
            speed={1}
            direction="custom"
            x={-30}
            y={-50}
            rotate={20}
            scale={0.2}
            opacity={1}
            disableSm
            disableMd
            className="md:absolute top-100 size-full"
          >
            <HoverGallery images={projectImages.eastSabah.slice(0, 12)} className={'md:h-1/3'} />
          </ParallaxElement>
        </div>
      </div>
    </section>
  )
}

export const EastSabahHeadline = ({ headLine }) => {
  return (
    <section className="relative w-screen overflow-hidden bg-text text-bg px-4">
      <BgNoise />

      <div className="grid grid-cols-6 border-b border-bgb py-3">
        <div className="col-span-4 max-md:col-span-6 col-start-3 border-s border-bgb px-8 py-32 max-md:py-12">
          <p dangerouslySetInnerHTML={{ __html: headLine }} className="text-5xl font-extralight tracking-wide max-w-md uppercase" />

          <ParallaxElement
            speed={-0.9}
            smSpeed={1}
            ease="power2.out"
            className="text-[15vw] text-main/10 leading-5 uppercase pointer-events-none select-none text-nowrap
            absolute left-0 bottom-0"
          >
            {Array.from({ length: 12 }).map((_, idx) => (
              <span key={idx}>
                East Sabah East Sabah East Sabah East Sabah
                <br />
                East Sabah East Sabah East Sabah East Sabah
                <br />
                East Sabah East Sabah East Sabah East Sabah
                <br />
              </span>
            ))}
          </ParallaxElement>
        </div>
      </div>
    </section>
  )
}

export const AlMutlaaHero = ({ desc1, desc2, desc3, desc4, value, startDate, endDate, mainLine, images }) => {
  const { t } = useTranslation()
  const containerRef = useRef(null)

  useGSAP(
    () => {
      ScrollTrigger.batch('.reveal-text', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.15,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      ScrollTrigger.batch('.reveal-img', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.15,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      ScrollTrigger.batch('.reveal-section', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out',
              stagger: 0.2,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      return () => ScrollTrigger.getAll().forEach((st) => st.kill())
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative w-screen bg-text text-bg px-4">
      <BgNoise />

      <div className="grid grid-cols-6 border-t border-bgb overflow-hidden py-3">
        <div className="col-span-4 col-start-1 max-md:col-span-6 border-e max-md:border-0 border-bgb">
          <span className="text-sm text-bg/50 font-light">N6 & N9</span>
          <ParallaxElement className={`reveal-text text-4xl font-light tracking-wide max-w-md my-36 max-md:my-14`}>
            {mainLine}
          </ParallaxElement>
          <ParallaxElement
            speed={0.1}
            className={`w-full flex max-lg:flex-col justify-between items-start overflow-hidden mb-4 md:mt-24 md:pe-4`}
          >
            <ParallaxElement speed={0.3} direction="scale" origin="right bottom">
              <Image src={images[2]} alt="Image" loading="lazy" className="size-full object-cover overflow-hidden" />
            </ParallaxElement>
            <p className="reveal-text text-sm font-extralight tracking-wide max-w-sm lg:px-4 max-lg:mt-4 max-md:mt-8">{desc1}</p>
          </ParallaxElement>
        </div>

        <ParallaxElement
          speed={-0.25}
          className={`col-span-2 col-start-5 max-md:col-span-6 max-sm:col-start-1 px-4 my-36 max-md:p-0 max-md:my-8 space-y-8`}
        >
          <div className="space-y-1">
            <span className="text-sm text-bg/50 font-light block">01.</span>
            <ShuffleText text={t('nationBuilding')} tag="h3" className="reveal-text text-2xl font-light tracking-wide max-w-md" />
            <p className="reveal-text text-sm font-extralight tracking-wide pt-2">{desc2}</p>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-bg/50 font-light block">02.</span>
            <ShuffleText text={t('communityCore')} tag="h3" className="reveal-text text-2xl font-light tracking-wide max-w-md" />
            <p className="reveal-text text-sm font-extralight tracking-wide pt-2">{desc3}</p>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-bg/50 font-light block">03.</span>
            <ShuffleText text={t('futureSpaces')} tag="h3" className="reveal-text text-2xl font-light tracking-wide max-w-md" />
            <p className="reveal-text text-sm font-extralight tracking-wide pt-2">{desc4}</p>
          </div>
        </ParallaxElement>
      </div>

      <div className="reveal-section grid grid-cols-5 gap-4 border-t border-bgb max-md:border-none overflow-hidden py-3 max-md:pt-0">
        <div className="col-span-4 max-md:col-span-6 col-start-3 border-s border-bgb max-md:border max-md:bg-main/5 max-md:text-center space-y-4 px-8 py-32 max-md:px-0">
          <span className="reveal-text text-bg/30 text-sm block">N6 & N9</span>
          <ShuffleText text={t('projectDetails')} tag="h3" className="reveal-text text-4xl" />
          <p className="reveal-text text-xl text-bg/50">
            {t(`projectValue`)}: <span className="text-main/50">{value}</span>
          </p>
          <p className="reveal-text text-sm text-bg/50">
            {t(`startDate`)}: {startDate}
          </p>
          <p className="reveal-text text-sm text-bg/50">
            {t(`endDate`)}: {endDate}
          </p>
        </div>
      </div>
    </section>
  )
}

export const AlMutlaaHeadline = ({ headLine }) => {
  return (
    <section className="relative w-screen overflow-hidden bg-text text-bg px-4">
      <BgNoise />

      <div className="border-t border-bgb py-32 mt-3">
        <p
          dangerouslySetInnerHTML={{ __html: headLine }}
          className="text-5xl max-lg:text-4xl font-extralight tracking-wide text-center uppercase"
        />

        <ParallaxElement
          speed={-0.9}
          ease="power2.out"
          className={`absolute left-0 bottom-0 text-[15vw] text-main/10 leading-5 uppercase pointer-events-none select-none text-nowrap`}
        >
          {Array.from({ length: 12 }).map((_, idx) => (
            <span key={idx}>
              East Sabah East Sabah East Sabah East Sabah
              <br />
              East Sabah East Sabah East Sabah East Sabah
              <br />
              East Sabah East Sabah East Sabah East Sabah
              <br />
            </span>
          ))}
        </ParallaxElement>
      </div>
    </section>
  )
}

export const LevelsTowerHero = ({ desc1, desc2, mainLine, images }) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      ScrollTrigger.batch('.reveal-text', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.15,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      ScrollTrigger.batch('.reveal-img', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.15,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      ScrollTrigger.batch('.reveal-section', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out',
              stagger: 0.2,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      return () => ScrollTrigger.getAll().forEach((st) => st.kill())
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative w-screen overflow-hidden bg-text text-bg px-4">
      <BgNoise />

      <div className="reveal-section grid grid-cols-6 border-t border-bgb py-3 mt-3">
        <div className="col-span-2 col-start-1 max-md:col-span-6 border-e max-md:border-0 border-bgb">
          <span className="text-sm text-bg/50 font-light block">0.0</span>

          <ParallaxElement speed={-0.5}>
            <ShuffleText
              text={mainLine}
              tag="h3"
              className="reveal-text text-4xl font-light tracking-wide max-w-md max-md:mt-8 max-md:text-end"
            />
          </ParallaxElement>

          <div className="w-full h-150 overflow-hidden md:pe-4 mt-24 max-md:mt-12">
            <ParallaxElement direction="scale" origin="right center" className="size-full overflow-hidden">
              <img src={images[5]} alt="Image" loading="lazy" className="reveal-img size-full object-cover overflow-hidden" />
            </ParallaxElement>
          </div>
        </div>

        <div className="col-span-4 col-start-3 max-md:col-span-6 max-sm:col-start-1 flex flex-col justify-between">
          <ParallaxElement className="reveal-text text-4xl max-md:text-2xl max-w-xl font-extralight tracking-wide px-4 max-md:p-0 mt-60 max-md:mt-12">
            {desc1}
          </ParallaxElement>

          <div className="flex justify-end mb-4 max-md:mt-12">
            <ParallaxElement className="reveal-text text-sm font-extralight tracking-wide max-w-sm px-4 border-s border-bgb">
              {desc2}
            </ParallaxElement>
          </div>
        </div>
      </div>
    </section>
  )
}

export const LevelsTowerHeadline = ({ headLine }) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      ScrollTrigger.batch('.reveal-text', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.15,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      ScrollTrigger.batch('.reveal-section', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out',
              stagger: 0.2,
            }
          ),
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      })

      return () => ScrollTrigger.getAll().forEach((st) => st.kill())
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative w-screen overflow-hidden bg-text text-bg px-4">
      <BgNoise />

      <div className="reveal-section grid grid-cols-6 gap-4 border-t border-bgb py-3">
        <ParallaxElement
          direction="scale"
          className="col-span-4 max-md:col-span-6 col-start-3 px-8 py-24 max-md:px-4 max-md:py-12 border-s border-bg/50"
        >
          <p
            dangerouslySetInnerHTML={{ __html: headLine }}
            className="reveal-text text-5xl max-md:text-4xl font-extralight tracking-wide max-w-2xl uppercase"
          />
        </ParallaxElement>

        <ParallaxElement
          speed={0.1}
          smSpeed={1}
          direction="horizontal"
          ease="power2.out"
          className="text-[15vw] text-main/10 leading-5 uppercase pointer-events-none select-none text-nowrap
            absolute left-450"
        >
          {Array.from({ length: 12 }).map((_, idx) => (
            <span key={idx}>
              East Sabah East Sabah East Sabah East Sabah
              <br />
              East Sabah East Sabah East Sabah East Sabah
              <br />
              East Sabah East Sabah East Sabah East Sabah
              <br />
            </span>
          ))}
        </ParallaxElement>
      </div>
    </section>
  )
}
