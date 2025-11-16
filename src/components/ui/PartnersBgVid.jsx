'use client'

import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import BgVideo from '@/components/ui/BgVideo.jsx'

const PartnersBgVid = () => {
  const bgVid = '/videos/bgVideo.mp4'
  const mobileImgsrc = ArtboardImgs[14]
  const sectionRef = useRef()
  const bgVidRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=350%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        pinSpacing: true,
        onLeaveBack: () => tl.pause(0),
      },
    })

    tl.to(bgVidRef.current, {
      opacity: 0.4,
      duration: 3,
      ease: 'power2.inOut',
    }).to(bgVidRef.current, {
      scale: 3,
      duration: 5,
      ease: 'power2.inOut',
    })

    tl.to({}, { duration: 0.5 })
  }, [sectionRef, bgVidRef])

  return (
    <section ref={sectionRef} className="relative w-screen h-screen bg-black">
      <div ref={bgVidRef} className="relative size-full will-change-transform will-change-opacity origin-center">
        <BgVideo src={bgVid} mobileImgsrc={mobileImgsrc} className="max-sm:opacity-50" />
      </div>
    </section>
  )
}

export default PartnersBgVid
