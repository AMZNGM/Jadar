'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { PlusIcon, RailSymbol, Scale } from 'lucide-react'
import { BgNoise } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import Noise from '@/components/ui/effects/Noise.jsx'

export default function OurPotential() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  const points = [
    {
      title: t('potentialPoint1Title'),
      desc: t('potentialPoint1Desc'),
      icon: <PlusIcon />,
    },
    {
      title: t('potentialPoint2Title'),
      desc: t('potentialPoint2Desc'),
      icon: <RailSymbol />,
    },
    {
      title: t('potentialPoint3Title'),
      desc: t('potentialPoint3Desc'),
      icon: <Scale />,
    },
  ]

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.quote',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.quote',
            start: 'top 85%',
            end: 'bottom 50%',
          },
        }
      )

      gsap.fromTo(
        '.quote img',
        { y: 250 },
        {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: '.quote',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-screen overflow-hidden bg-bg text-bg px-16 max-md:px-2">
      <BgNoise />
      <div className="relative flex flex-col justify-center items-center bg-text/30 py-24 max-md:border-x max-md:border-text/10 overflow-hidden">
        <Noise />

        <ShuffleText text={t(`ourPotential`)} tag="h3" className="text-5xl font-light uppercase mb-12 cursor-default" />

        <div className="grid grid-cols-3 max-md:grid-cols-1 max-w-6xl w-full gap-16 font-light">
          {points.map((point, index) => (
            <div key={index} className="flex flex-col justify-center items-center p-8">
              {point.icon}
              <SplitedText text={point.title} tag="h4" delay={25} className="text-2xl font-normal mb-3" />
              <SplitedText text={point.desc} tag="p" delay={5} className="text-bg/75 text-center" />
            </div>
          ))}
        </div>

        <div className="quote bg-bg w-full max-w-6xl md:h-100 flex justify-center items-start mt-20">
          <div className="relative w-full max-w-4xl flex max-md:flex-col items-center gap-8 py-8">
            <div className="md:absolute -bottom-120 max-md:-bottom-100">
              <Image src={ArtboardImgs[0]} alt="Customer Image" sizes="full" className="object-cover z-0" />
            </div>

            <blockquote className="bg-bg text-text/90 text-lg font-light italic p-6 z-10">
              <SplitedText delay={5} text={t(`potentialblockquote`)} tag="p" />

              <SplitedText
                text={t(`globalInvestmentPartner`)}
                className="mt-4 text-sm text-main font-medium"
                textColors={'#d73b13'}
                startOnVisible
              />
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
