'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { BgNoise, MovingBorders } from '@/data/mediaData/svgs.jsx'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from '@/translations/useTranslation'
import CircularText from '@/components/ui/text/CircularText.jsx'
import ClickEffect from '@/components/ui/effects/ClickEffect.jsx'

const BackgroundCards = ({ bgCards = [], look, bgColor, textColor, borderColor, cardBgColor }) => {
  if (look === 'light') {
    borderColor = 'bg'
    bgColor = 'text'
    textColor = 'bg'
    cardBgColor = 'neutral-600/25'
  } else if (look === 'dark') {
    borderColor = 'main'
    bgColor = 'bg'
    textColor = 'text'
    cardBgColor = 'neutral-600/25'
  }

  const renderCardContent = (card) => {
    if (card.type === 'image') {
      return (
        <>
          <Image src={card.imageSrc} alt={card.title} className="absolute inset-0 size-full object-cover overflow-hidden z-0" />

          <div className="flex flex-col justify-between items-center size-full text-text p-8">
            <div className="font-light text-center space-y-1 z-10">
              <p className="max-md:text-sm tracking-wider">{card.location}</p>
              <h3 className="text-6xl max-md:text-3xl">{card.title}</h3>
            </div>

            <div className="font-light text-center space-y-1 blur-xs z-10">
              <h3 className="text-6xl max-md:text-3xl">{card.title}</h3>
              <p className="max-md:text-sm tracking-wider">{card.location}</p>
            </div>
          </div>
        </>
      )
    }

    return (
      <>
        <div className="flex flex-col justify-between items-center size-full p-8">
          <div className="font-light text-center space-y-1">
            <p className="max-md:text-sm tracking-wider">{card.location}</p>
            <h3 className="text-6xl max-md:text-3xl">{card.title}</h3>
          </div>

          <div className="font-light text-center space-y-1 blur-xs">
            <h3 className="text-6xl max-md:text-3xl">{card.title}</h3>
            <p className="max-md:text-sm tracking-wider">{card.location}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <section className={`absolute top-1/2 left-1/2 -translate-1/2 w-screen h-screen overflow-hidden bg-${bgColor} text-${textColor} px-4`}>
      <BgNoise />
      <div className={`grid grid-cols-6 gap-4 border-y border-${borderColor}/50 py-3`}>
        {bgCards.map((card, index) => (
          <div
            key={index}
            className={`relative col-span-3 max-lg:col-span-6 w-full h-[96vh] max-lg:h-[48vh] bg-${cardBgColor} overflow-hidden`}
          >
            {renderCardContent(card)}
            <MovingBorders />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ProjFooterCards({ floatingCards, bgCards = [], ...otherProps }) {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef(null)
  const cardRef = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    let timeoutId = null

    const checkIfMobile = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 1024)
      }, 100)
    }

    checkIfMobile()

    window.addEventListener('resize', checkIfMobile)
    return () => {
      window.removeEventListener('resize', checkIfMobile)
      clearTimeout(timeoutId)
    }
  }, [])

  useGSAP(
    () => {
      if (isMobile) {
        // Kill all animations on mobile
        if (animationRef.current) {
          animationRef.current.forEach((trigger) => trigger.kill())
          animationRef.current = null
        }
        return
      }

      // Clear any existing animations first
      if (animationRef.current) {
        animationRef.current.forEach((trigger) => trigger.kill())
      }
      animationRef.current = []

      const cards = cardRef.current
      const positions = [14, 86]
      const rotations = [-90, 90]

      // Main pin trigger
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 5.1}`,
        pin: true,
        pinSpacing: true,
      })
      animationRef.current.push(pinTrigger)

      // Spread cards animation
      cards.forEach((card, index) => {
        if (card) {
          const spreadTween = gsap.to(card, {
            left: `${positions[index]}%`,
            rotation: rotations[index],
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: `+=${window.innerHeight * 2.7}`,
              scrub: 0.5,
              id: `spread-${index}`,
            },
          })
          if (spreadTween.scrollTrigger) {
            animationRef.current.push(spreadTween.scrollTrigger)
          }
        }
      })

      // Flip cards animation
      cards.forEach((card, index) => {
        if (!card) return

        const staggerOffset = index * 0.1
        const startOffset = 0.2 + staggerOffset
        const endOffset = 0.7 + staggerOffset

        const flipTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * 1.7}`,
          scrub: 1,
          id: `rotate-flip-${index}`,
          onUpdate: (self) => {
            const progress = self.progress
            const flipCard = card.querySelector('.flipCard')

            if (progress >= startOffset && progress <= endOffset) {
              const animationProgress = (progress - startOffset) / (endOffset - startOffset)
              const flipRotation = 180 * animationProgress

              gsap.to(flipCard, {
                rotationY: flipRotation,
                duration: 0.1,
                ease: 'power1.out',
                overwrite: 'auto',
              })
            } else if (progress < startOffset) {
              gsap.to(flipCard, {
                rotationY: 0,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              })
            } else if (progress > endOffset) {
              gsap.to(flipCard, {
                rotationY: 180,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              })
            }
          },
        })
        animationRef.current.push(flipTrigger)
      })
    },
    {
      scope: containerRef,
      dependencies: [isMobile],
    }
  )

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.forEach((trigger) => trigger.kill())
        animationRef.current = null
      }
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-screen h-screen overflow-hidden bg-bg">
      <BackgroundCards bgCards={bgCards} {...otherProps} />

      {!isMobile && (
        <div className="relative size-full px-4">
          {floatingCards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardRef.current[index] = el)}
              className="absolute top-1/2 left-1/2 -translate-1/2 perspective-distant w-60 h-140"
            >
              <div className="flipCard relative size-full transform-3d transition-transform duration-800">
                {/* frontCard */}
                <div
                  className={`absolute size-full overflow-hidden backface-hidden ${
                    otherProps.look === 'dark' ? 'bg-bg text-text' : 'bg-text text-bg'
                  }`}
                >
                  <BgNoise />
                  <div className="absolute inset-0 flex justify-center items-center">
                    {card.circularText && <CircularText text={`${card.circularText} `} className="font-medium" />}
                    {card.overview && (
                      <div className="flex flex-col justify-center gap-4 px-4">
                        <h3 className="text-main text-3xl text-center font-light -rotate-15 mb-8">{t(`projectDetails`)}</h3>
                        {card.overview.map((item, index) => (
                          <p key={index} className="flex justify-between text-sm">
                            {item.label}: <span className={item.highlight ? 'text-main' : ''}>{item.value}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* backCard */}
                <ClickEffect
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`absolute size-full backface-hidden rotate-y-180 ${
                    otherProps.look === 'dark' ? 'bg-neutral-400 text-text' : 'bg-text text-bg'
                  }`}
                >
                  <BgNoise />

                  <div className="size-full flex justify-center items-end overflow-hidden p-3">
                    {card.circularText && <CircularText text={`${card.circularText} `} className="font-medium" />}
                    {!card.circularText && <CircularText text={'Click to know more about this project '} className="font-medium" />}
                  </div>

                  <Link
                    href={card.to}
                    className={`group absolute inset-0 flex justify-center items-end hover:-translate-y-63 duration-800 ease-in-out z-10 ${
                      otherProps.look === 'dark' ? 'bg-bg hover:bg-main' : 'bg-text hover:bg-main'
                    }`}
                  >
                    <ClickEffect
                      className={`group rounded-full cursor-pointer px-8 py-10 group-hover:bg-main duration-800 ease-in-out
                      ${index === 1 ? '-rotate-90' : 'rotate-90'}
                      ${otherProps.look === 'dark' ? 'bg-bg hover:bg-main' : 'bg-text hover:bg-main'}
                    `}
                    >
                      <div className={`flex justify-center items-center ${index === 1 ? 'flex-row-reverse' : ''}`}>
                        <p className={`group-hover:-translate-x-80 duration-800 ${index === 1 ? 'translate-x-6' : '-translate-x-6'}`}>
                          {t(`knowMore`)}
                        </p>
                        <ChevronRight
                          className={`size-6 opacity-0 hidden -translate-x-20 group-hover:opacity-100 group-hover:flex group-hover:translate-x-0 duration-800
                          ${index === 1 ? '-rotate-180' : ''}
                        `}
                        />
                      </div>
                    </ClickEffect>
                  </Link>
                </ClickEffect>
              </div>

              <span
                className={`absolute left-1/2 -bottom-50 -translate-1/2 leading-5 uppercase pointer-events-none select-none text-[15vw] text-main/10 duration-500 ease-in-out
                ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                {t(`click`)}
              </span>
            </div>
          ))}
        </div>
      )}

      {isMobile && (
        <div className="absolute inset-0 flex items-center justify-center size-full">
          {floatingCards.map((card, index) => (
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              key={index}
              ref={(el) => (cardRef.current[index] = el)}
              className="flex justify-center items-center w-full"
            >
              <Link to={card.to}>
                <ClickEffect
                  className={`group px-8 py-3 rounded-full hover:bg-main hover:text-text duration-300 cursor-pointer max-sm:scale-75
                  ${otherProps.look === 'dark' ? 'bg-main/75' : 'bg-text'} 
                  ${otherProps.look === 'dark' ? 'text-text' : 'text-bg'}
                  `}
                >
                  <span className="flex justify-between items-center w-full">
                    {t(`knowMore`)}
                    <ChevronRight className={`size-6 ${index === 1 ? 'rotate-90' : '-rotate-90'}`} />
                  </span>
                </ClickEffect>
              </Link>

              <span
                className={`absolute left-1/2 top-60 -translate-1/2 leading-5 uppercase pointer-events-none select-none text-[15vw] text-main/10 duration-500 ease-in-out
                ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                {t(`click`)}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
