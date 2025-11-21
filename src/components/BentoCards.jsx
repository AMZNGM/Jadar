'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise, MovingBorders } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import SpotlightContainer from '@/components/ui/effects/SpotlightContainer.jsx'
import FloatingEffect from '@/components/ui/effects/FloatingEffect.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

const cardData = [
  {
    img: ArtboardImgs[1],
    title: 'power',
    description: `card1Desc`,
  },
  {
    img: ArtboardImgs[4],
    title: `ourVision`,
    description: `card2Desc`,
  },
  {
    img: ArtboardImgs[5],
    title: 'ourPhilosophy',
    description: `card3Desc`,
  },
]

const Card = ({ img, title, description, className }) => {
  const { t } = useTranslation()
  const cardRef = useRef(null)
  const [showFull, setShowFull] = useState(false)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cardRef.current, { opacity: 1, y: 0, rotateX: 0 })
      return
    }

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, rotateX: 100, y: 500 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: '-600% bottom',
          end: 'center 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [cardRef])

  const toggleDescription = (e) => {
    e.stopPropagation()
    setShowFull(!showFull)
  }

  return (
    <div
      dir="ltr"
      ref={cardRef}
      className={`relative w-full h-[65vh] max-md:h-96 border border-text/20 overflow-hidden will-change-transform mb-6 ${className || ''}`}
    >
      <SpotlightContainer>
        <MovingBorders />

        <div className="absolute inset-0 overflow-hidden card-clip">
          <Image src={img} alt={t(title)} className="object-cover size-full max-sm:h-1/2" />
        </div>

        <div className="flex relative z-10 flex-col justify-between p-3 size-full">
          <div>
            <h2 className="mb-4 text-6xl font-extralight uppercase cursor-default max-md:text-4xl text-main">{t(title)}</h2>

            {description && (
              <div className="relative">
                <div className={`text-base max-md:text-sm text-text font-light duration-300 ${!showFull ? 'line-clamp-4' : ''}`}>
                  <p dangerouslySetInnerHTML={{ __html: t(description) }} />
                </div>

                <button
                  onClick={toggleDescription}
                  className="mt-1 text-xs tracking-widest duration-300 cursor-pointer text-main hover:underline"
                >
                  {showFull ? t('showLess') : t('seeMore')}
                </button>
              </div>
            )}
          </div>

          <div className="relative w-fit">
            <MainBtn text={t('aboutJadar')} to={'/about'} look="main" className="w-fit py-1! text-xs! rounded-tl-2xl rounded-br-2xl" />
          </div>
        </div>
      </SpotlightContainer>

      <style>{`
        .card-clip {
          clip-path: polygon(38% 1%, 100% 0, 100% 100%, 9% 100%);
        }
      `}</style>
    </div>
  )
}

export default function BentoCards() {
  return (
    <div className="relative w-screen min-h-screen bg-black text-text px-4">
      <BgNoise />

      <FloatingEffect className="duration-300 hover:scale-95">
        <Card {...cardData[0]} index={0} />
      </FloatingEffect>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 md:gap-9">
        <FloatingEffect className="duration-300 hover:scale-95">
          <Card {...cardData[1]} index={1} />
        </FloatingEffect>
        <FloatingEffect className="duration-300 hover:scale-95">
          <Card {...cardData[2]} index={2} />
        </FloatingEffect>
      </div>
    </div>
  )
}
