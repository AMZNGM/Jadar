'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise } from '@/data/mediaData/svgs'
import { projectImages } from '@/data/mediaData/projectMedia'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import { useTranslation } from '@/translations/useTranslation'
import partnersData from '@/data/partnersData'
import FixedLeftMenu from '@/components/ui/FixedLeftMenu.jsx'
import TextStack from '@/components/ui/text/TextStack'
import Logo from '@/components/ui/Logo'

export default function HorizontalCards() {
  const { t } = useTranslation()
  const partnerData = partnersData(t)
  const sectionRef = useRef(null)
  const horizontalSectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showMenu, setShowMenu] = useState(false)

  useGSAP(() => {
    const slides = gsap.utils.toArray('.horizontal-slide')

    const horizontalScroll = gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSectionRef.current,
        start: 'top top',
        end: `+=${slides.length * 1000}px`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress * 100
          setScrollProgress(progress)
          const totalSlides = document.querySelectorAll('.horizontal-slide').length - 1
          setShowMenu(self.isActive)
        },
      },
    })

    slides.forEach((slide) => {
      const img = slide.querySelectorAll('img')
      const containerWidth = gsap.getProperty(slide, 'width')
      const imgWidth = gsap.getProperty(img[0], 'width')
      const distance = imgWidth - containerWidth

      gsap.to('.slide1', {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: '.slide1',
          start: 'top top',
          scrub: true,
          containerAnimation: horizontalScroll,
        },
      })

      gsap.to('.slide2', {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: '.slide2',
          start: 'top top',
          scrub: true,
          containerAnimation: horizontalScroll,
        },
      })

      gsap.fromTo(
        '.img1',
        { filter: 'grayscale(100%)' },
        {
          scale: 1.5,
          filter: 'grayscale(0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.img1',
            start: 'top bottom',
            end: 'bottom center',
            scrub: true,
            containerAnimation: horizontalScroll,
          },
        }
      )

      gsap.fromTo(
        '.scrollBigText',
        { y: 2400 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.scrollBigText',
            start: 'top +=85%',
            end: 'bottom +=0%',
            scrub: true,
            containerAnimation: horizontalScroll,
          },
        }
      )

      gsap.fromTo(
        '.img4',
        { height: 0 },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.img4',
            start: 'top +=90%',
            end: 'bottom bottom',
            scrub: true,
            containerAnimation: horizontalScroll,
          },
        }
      )

      gsap.to('.img4', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.img4',
          start: 'bottom top',
          end: '101%',
          scrub: true,
          containerAnimation: horizontalScroll,
        },
      })

      gsap.to('.slide4', {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: '.slide4',
          start: 'top top',
          scrub: true,
          containerAnimation: horizontalScroll,
        },
      })

      gsap.to('.slide5, .slide6', {
        y: distance,
        rotate: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: '.slide5',
          start: 'top top',
          scrub: true,
          containerAnimation: horizontalScroll,
        },
      })

      gsap.fromTo(
        '.slide7',
        { y: 600 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.slide7',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            containerAnimation: horizontalScroll,
          },
        }
      )

      gsap.fromTo(
        '.midlaneTitle',
        { y: -100 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.midlaneTitle',
            start: 'top 80%',
            end: 'top 25%',
            scrub: true,
            containerAnimation: horizontalScroll,
          },
        }
      )

      gsap.fromTo(
        '.slide7',
        { x: 0, scale: 1, skewX: 0 },
        {
          x: -distance,
          scale: 0.5,
          skewX: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.slide7',
            start: 'top 0%',
            end: 'bottom top',
            scrub: true,
            containerAnimation: horizontalScroll,
          },
        }
      )

      gsap.to('.slide9', {
        y: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: '.slide9',
          start: 'top top',
          scrub: true,
          containerAnimation: horizontalScroll,
        },
      })

      gsap.fromTo(
        '.logo10',
        {
          rotate: 90,
        },
        {
          rotate: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.logo10',
            start: 'top bottom',
            end: 'top center',
            scrub: true,
            containerAnimation: horizontalScroll,
          },
        }
      )

      gsap.to('.slide10', {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: '.slide10',
          start: 'top top',
          scrub: true,
          containerAnimation: horizontalScroll,
        },
      })

      if (window.matchMedia('(min-width: 768px)').matches) {
        gsap.to('.slide12', {
          x: -distance + 100,
          y: -distance,
          rotate: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: '.slide12',
            start: 'top 0%',
            scrub: true,
            containerAnimation: horizontalScroll,
          },
        })
      }
    })
  }, sectionRef)

  return (
    <section dir="ltr" ref={sectionRef} className="relative w-screen min-h-screen overflow-hidden bg-transparent text-text">
      <FixedLeftMenu scrollProgress={scrollProgress} isVisible={showMenu} />

      <div ref={horizontalSectionRef} className="relative w-full min-h-screen flex bg-black">
        <div className="horizontal-slide slide1 shrink-0 flex justify-center items-center w-screen h-screen overflow-hidden">
          <div className="relative size-full flex flex-col justify-center max-md:justify-evenly items-center bg-black font-light py-12 px-4">
            <div className="flex justify-center items-start">
              <h1 className="text-7xl">{partnerData[0].title}</h1>
              <Logo logoName={partnerData[0].logoName} to={partnerData[0].website} />
            </div>

            <div className="flex justify-start items-center w-full">
              <p className="text-sm max-w-md">{partnerData[0].desc}</p>
            </div>
            <div className="flex justify-end items-center w-full">
              <p className="text-sm max-w-md">{partnerData[0].fullDesc}</p>
            </div>
          </div>

          <div className="relative size-full">
            <Image src={ArtboardImgs[0]} loading="lazy" alt={`${ArtboardImgs[0]} background image`} className="size-full object-cover" />
          </div>
        </div>

        <div className="horizontal-slide slide2 shrink-0 flex justify-center items-center w-screen h-screen overflow-hidden">
          <div className="relative size-full flex flex-col justify-center items-center bg-black max-md:p-4">
            <div className="relative size-full overflow-hidden">
              <div className="relative size-full overflow-hidden">
                <Image
                  src={partnerData[1].img}
                  loading="lazy"
                  alt={`${partnerData[1].title} background image`}
                  className="img1 size-full object-cover"
                />
              </div>
            </div>

            <div className="flex justify-center items-start mt-2">
              <h1 className="text-7xl">{partnerData[1].title}</h1>
              <Logo logoName={partnerData[1].logoName} to={partnerData[1].website} />
            </div>

            <div className="flex justify-between w-full">
              <p className="text-sm max-w-md">{partnerData[1].fullDesc}</p>
              <p className="text-sm max-w-md">{partnerData[1].desc}</p>
            </div>
          </div>
        </div>

        <div className="horizontal-slide slide3 shrink-0 flex justify-center items-center w-screen h-screen overflow-hidden max-md:hidden">
          <div className="relative size-full flex justify-between items-end bg-black font-light">
            <div className="relative w-full h-1/2 overflow-hidden">
              <Image
                src={projectImages.levelsTower[5]}
                loading="lazy"
                alt={`${partnerData[2].title} background image`}
                className="size-full object-cover"
              />
            </div>

            <div className="relative size-full overflow-hidden" />

            <div className="flex justify-center items-start size-full text-end mt-2 me-27">
              <h4 className="scrollBigText absolute bottom-205 text-[8rem] uppercase">{partnerData[1].subtitle}</h4>
            </div>
          </div>
        </div>

        <div className="horizontal-slide slide4 shrink-0 flex justify-center items-center w-screen h-screen overflow-hidden">
          <div className="relative size-full flex justify-center items-center bg-black">
            <div className="relative overflow-hidden flex justify-center items-center size-full">
              <Image
                src={partnerData[2].img}
                loading="lazy"
                alt={`${partnerData[2].title} background image`}
                className="img4 size-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="horizontal-slide slide5 shrink-0 flex max-md:flex-col justify-center items-center w-screen h-screen overflow-hidden">
          <div className="relative size-full flex max-md:justify-center items-end max-md:items-center bg-black max-md:p-4">
            <div className="flex justify-center items-start max-md:items-center">
              <h1 className="text-[22rem] -translate-x-7 max-md:hidden">{partnerData[2].title}</h1>
              <Logo logoName={partnerData[2].logoName} to={partnerData[2].website} className={'max-md:size-full'} />
            </div>
          </div>

          <div className="relative size-full flex justify-between items-center max-md:text-center bg-black">
            <div className="flex max-md:flex-col items-start max-md:gap-4">
              <p className="text-sm max-w-md">{partnerData[2].desc}</p>
              <p className="text-sm max-w-md max-md:border-t max-md:pt-4 md:border-s md:ps-2">{partnerData[2].fullDesc}</p>
            </div>
          </div>
        </div>

        <div className="horizontal-slide slide6 shrink-0 flex justify-center items-center w-screen h-screen overflow-hidden max-md:hidden">
          <div className="relative size-full flex items-end bg-black">
            <div className="flex justify-center items-start">
              <h1 className="text-[22rem] -translate-x-7">{partnerData[2].title}</h1>
              <Logo logoName={partnerData[2].logoName} to={partnerData[2].website} />
            </div>
          </div>

          <div className="relative size-full flex justify-between items-center bg-black">
            <div className="flex items-start">
              <p className="text-sm max-w-md">{partnerData[2].desc}</p>
              <p className="text-sm max-w-md border-s ps-2">{partnerData[2].fullDesc}</p>
            </div>
          </div>
        </div>

        <div className="horizontal-slide slide7 shrink-0 flex justify-center items-center w-screen h-screen max-lg:hidden">
          <div className="midlaneTitle flex flex-col items-center h-full">
            <Logo logoName={partnerData[3].logoName} to={partnerData[3].website} />
            <h1 className="text-7xl">{partnerData[3].title}</h1>
          </div>

          <div className="relative size-full flex flex-col justify-between items-end bg-text">
            <BgNoise />

            <div className="flex justify-center items-center size-full">
              <div className="flex flex-col justify-center items-center size-full">
                <div className="flex flex-col gap-4 size-full text-bg font-light uppercase ps-18 pt-24">
                  <p className="max-w-md">{partnerData[3].desc}</p>
                  <p className="max-w-md">{partnerData[3].fullDesc}</p>
                </div>

                <div className="flex flex-col justify-center gap-1 size-full max-w-md text-bgb ps-18 pb-24">
                  {partnerData[3].features.map((feature, idx) => (
                    <span key={idx}>{feature}</span>
                  ))}
                  <p className="max-w-md">{partnerData[3].location}</p>
                </div>
              </div>

              <div className="flex justify-center items-center size-full max-w-md -rotate-50 me-20">
                <p className="absolute text-bg text-8xl text-end font-extralight uppercase">{partnerData[3].subtitle}</p>
              </div>

              <div className="flex flex-col items-end size-full max-2xl:hidden">
                <div className="flex">
                  <TextStack text={partnerData[3].title} levels={4} textClassName="!text-7xl !text-bg font-light" />
                  <TextStack text={partnerData[3].title} levels={4} textClassName="!text-7xl !text-bg font-light rotate-y-180" />
                </div>
                <div className="flex rotate-x-180">
                  <TextStack text={partnerData[3].title} levels={4} textClassName="!text-7xl !text-bg font-light" />
                  <TextStack text={partnerData[3].title} levels={4} textClassName="!text-7xl !text-bg font-light rotate-y-180" />
                </div>

                <div className="relative size-full">
                  <Image
                    src={partnerData[3].img}
                    loading="lazy"
                    alt={`${partnerData[1].title} background image`}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="horizontal-slide slide8 shrink-0 flex justify-center items-center w-screen h-screen overflow-hidden">
          <div className="relative flex justify-center items-center size-full bg-black">
            <Logo logoName={partnerData[4].logoName} to={partnerData[4].website} width={500} className={'w-500'} />
          </div>
        </div>

        <div className="horizontal-slide slide9 shrink-0 flex justify-center items-center w-screen h-screen">
          <div className="relative flex justify-center items-center size-full bg-black py-24">
            <div className="flex flex-col justify-center gap-4 size-full uppercase -translate-x-4 translate-y-2.5">
              <p className="max-w-[90vw] font-medium">{partnerData[4].fullDesc}</p>
              <p className="text-9xl max-md:text-4xl">{partnerData[4].tagline}</p>
              <p className="text-7xl font-black">{partnerData[4].subtitle}</p>
              <p className="max-w-2xl font-medium">{partnerData[4].desc}</p>
            </div>
          </div>
        </div>

        <div className="horizontal-slide slide10 shrink-0 flex justify-center items-center w-screen h-screen z-10">
          <div className="relative flex justify-center md:items-center size-full py-24">
            <Logo logoName={partnerData[5].logoName} to={partnerData[5].website} className={'logo10 w-300'} width={500} />
          </div>
        </div>

        <div className="horizontal-slide slide11 shrink-0 flex justify-center items-center w-screen h-screen">
          <div className="relative flex justify-center items-center size-full bg-black">
            <Image
              src={partnerData[5].img}
              loading="lazy"
              alt={`${ArtboardImgs[0]} background image`}
              className="img10 absolute inset-0 size-full object-cover"
            />

            <div className="flex flex-col max-md:justify-end md:items-end text-end max-md:text-center gap-4 size-full uppercase z-10 pt-24 max-sm:pb-4 max-md:pb-44 max-md:px-4">
              <p className="max-w-[90vw] font-medium">{partnerData[5].fullDesc}</p>
              <p className="text-xl">{partnerData[5].tagline}</p>
              <p className="text-xl font-black">{partnerData[5].subtitle}</p>
              <p className="max-w-2xl font-medium">{partnerData[5].desc}</p>
            </div>
          </div>
        </div>

        <div className="horizontal-slide slide12 shrink-0 flex justify-center items-center w-screen h-screen">
          <div className="relative flex max-md:flex-col justify-center items-center size-full bg-black">
            <div className="relative flex justify-center items-center size-full z-10">
              <Logo logoName={partnerData[6].logoName} to={partnerData[6].website} className={'w-full'} width={500} />
            </div>

            <Image
              src={partnerData[6].img}
              loading="lazy"
              alt={`${partnerData[6].title} background image`}
              className="img10 absolute inset-0 size-full object-cover md:hidden"
            />

            <div className="flex flex-col items-center text-center gap-4 size-full uppercase z-10 py-24 md:hidden">
              <p className="text-xl font-black">{partnerData[6].subtitle}</p>
              <p className="text-xl">{partnerData[6].tagline}</p>
              <p className="font-medium">{partnerData[6].desc}</p>
              <p className="max-w-[90vw] font-medium">{partnerData[6].fullDesc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="slide13 shrink-0 flex justify-center items-center w-screen h-screen max-md:hidden">
        <div className="relative flex justify-center items-center size-full bg-black">
          <Image
            src={partnerData[6].img}
            loading="lazy"
            alt={`${partnerData[6].title} background image`}
            className="img10 absolute inset-0 size-full object-cover"
          />

          <div className="flex flex-col items-center text-center gap-4 size-full uppercase z-10 py-24">
            <p className="text-xl font-black">{partnerData[6].subtitle}</p>
            <p className="text-xl">{partnerData[6].tagline}</p>
            <p className="font-medium">{partnerData[6].desc}</p>
            <p className="max-w-[90vw] font-medium">{partnerData[6].fullDesc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
