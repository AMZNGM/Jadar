'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'

export default function WhoWeAre() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: '15% top',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    })
    tl.fromTo(
      imgRef.current,
      { clipPath: 'polygon(75% 50%, 50% 75%, 25% 50%, 50% 35%)' },
      // { clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)" }
      // { clipPath: "polygon(50% 90%, 100% 40%, 50% 40%, 0% 40%)" }
      { clipPath: 'polygon(0% 50%, 100% 50%, 50% 100%, 80% 60%)' }
    )
      .to(sectionRef.current, { backgroundColor: '#000' }, 0)
      .to(textRef.current, { opacity: 0 }, 0)
  }, [sectionRef])

  return (
    <section ref={sectionRef} className="relative w-screen h-[130vh] bg-text text-bg">
      <div className="relative size-full flex justify-center items-center">
        <div ref={textRef} className="size-full flex flex-col justify-between items-center text-center font-extralight py-24 px-4">
          <div className="relative flex flex-col justify-center items-center gap-4">
            <ShuffleText text={t('whoWeAre')} tag="h1" className="text-7xl max-md:text-4xl md:tracking-[38px]" />
            <ShuffleText text={t('whoWeAreDisc')} tag="h2" className="text-sm max-md:text-xs" />
            <ShuffleText text={t('redefineHowSpacesServePeople')} tag="h3" className="text-xl md:text-5xl md:tracking-[14px]" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: t('whoWeAreFooter') }} className="text-sm max-md:text-xs font-light max-w-xl mb-12" />
        </div>

        <div ref={imgRef} className="absolute inset-0 size-full overflow-hidden will-change-transform z-10">
          <Image src={ArtboardImgs[3]} alt="Background Image" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
