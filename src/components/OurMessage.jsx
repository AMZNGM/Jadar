'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import Noise from '@/components/ui/effects/Noise.jsx'

export default function OurMessage() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const imgsRef = useRef([])
  const imgs = [ArtboardImgs[0], ArtboardImgs[1], ArtboardImgs[2], ArtboardImgs[3], ArtboardImgs[4], ArtboardImgs[5], ArtboardImgs[6]]

  useGSAP(() => {
    imgsRef.current.forEach((img, i) => {
      if (!img) return
      const scaleValues = [4, 5, 6, 5, 6, 8, 9]
      gsap.fromTo(
        img,
        { scale: 1 },
        {
          scale: scaleValues[i],
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      )
    })
  }, [sectionRef])

  return (
    <div dir="ltr" ref={sectionRef} className="relative w-screen md:h-[300vh] bg-bg text-bg">
      <Noise className={'opacity-50'} />

      <div className="flex flex-col justify-center items-center text-center font-light pt-32 px-4 md:hidden">
        <SplitedText text={t('OurMessage')} tag="h1" delay={45} className="uppercase text-4xl mb-2 text-main" />
        <SplitedText text={t('whoWeAreDisc')} tag="p" delay={5} className="text-sm max-w-md text-text/75" />
      </div>

      <div className="sticky top-0 h-screen overflow-hidden max-md:hidden">
        {imgs.map((src, index) => (
          <div
            key={index}
            ref={(el) => (imgsRef.current[index] = el)}
            className="absolute inset-0 size-full flex items-center justify-center"
          >
            <div
              className={`
                relative 
                ${index === 0 && 'w-[25vw] h-[25vh] max-md:w-[40vw] max-md:h-[20vh] max-sm:w-[60vw] max-sm:h-[25vh] overflow-hidden'}
                ${
                  index === 1 &&
                  'w-[35vw] h-[30vh] max-md:w-[50vw] max-md:h-[25vh] max-sm:w-[70vw] max-sm:h-[30vh] -top-[30vh] left-[5vw] max-md:-top-[15vh] max-sm:-top-[20vh] max-sm:left-[2vw]'
                }
                ${
                  index === 2 &&
                  'w-[20vw] h-[45vh] max-md:w-[30vw] max-md:h-[35vh] max-sm:w-[50vw] max-sm:h-[40vh] -top-[10vh] -left-[25vw] max-md:-top-[5vh] max-md:-left-[10vw] max-sm:-top-[8vh] max-sm:-left-[5vw]'
                }
                ${
                  index === 3 &&
                  'w-[25vw] h-[25vh] max-md:w-[30vw] max-md:h-[20vh] max-sm:w-[50vw] max-sm:h-[25vh] left-[27.5vw] max-md:left-[15vw] max-sm:left-[10vw]'
                }
                ${
                  index === 4 &&
                  'w-[20vw] h-[25vh] max-md:w-[25vw] max-md:h-[20vh] max-sm:w-[45vw] max-sm:h-[25vh] top-[27.5vh] left-[5vw] max-md:top-[15vh] max-sm:top-[20vh] max-sm:left-[2vw]'
                }
                ${
                  index === 5 &&
                  'w-[30vw] h-[25vh] max-md:w-[35vw] max-md:h-[20vh] max-sm:w-[55vw] max-sm:h-[25vh] top-[27.5vh] -left-[22.5vw] max-md::top-[20vh] max-md:-left-[10vw] max-sm:top-[25vh] max-sm:-left-[5vw]'
                }
                ${
                  index === 6 &&
                  'w-[15vw] h-[15vh] max-md:w-[20vw] max-md:h-[12vh] max-sm:w-[35vw] max-sm:h-[15vh] top-[22.5vh] left-[25vw] max-md:top-[15vh] max-md:left-[15vw] max-sm:top-[18vh] max-sm:left-[12vw]'
                }
              `}
            >
              <Image src={src} alt="image" fill className="object-cover" sizes="(max-width: 640px) 70vw, (max-width: 768px) 50vw, 25vw" />

              {index === 0 && (
                <div className="absolute inset-0 translate-1/2">
                  <h1 className="uppercase font-light max-lg:text-sm">{t('OurMessage')}</h1>
                  <p className="text-[5px] max-lg:max-w-22 max-[88rem]:max-w-30 max-w-45">{t('whoWeAreDisc')}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
