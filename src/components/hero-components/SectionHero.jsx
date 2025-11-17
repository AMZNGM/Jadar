'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import BgVideo from '@/components/ui/BgVideo.jsx'
import DynCursor from '@/components/ui/effects/DynCursor.jsx'
import HeroContent from '@/components/hero-components/HeroContent.jsx'
import VideoModal from '@/components/hero-components/HeroVideoModal.jsx'
import HeroLines from '@/components/hero-components/HeroLines.jsx'

export default function SectionHero({ title, bgVidSrc, mobileImgsrc, videoUrl, videoclassName }) {
  const sectionRef = useRef(null)
  const slideUpRef = useRef(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const openVideo = () => setIsVideoOpen(true)
  const closeVideo = () => setIsVideoOpen(false)

  useGSAP(() => {
    gsap.fromTo(slideUpRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: 'power2.out' })

    gsap.to(sectionRef.current, {
      scale: 0.85,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: true,
      },
    })
  })

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isVideoOpen)

    if (isVideoOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVideoOpen])

  return (
    <section ref={sectionRef} className="relative w-screen h-screen bg-bg text-text">
      <DynCursor />
      <BgVideo src={bgVidSrc} mobileImgsrc={mobileImgsrc} className={`${videoclassName}`} />
      <HeroContent slideUpRef={slideUpRef} title={title} onOpenVideo={openVideo} />
      {isVideoOpen && <VideoModal videoUrl={videoUrl} onClose={closeVideo} />}
      <HeroLines sectionRef={sectionRef} />
    </section>
  )
}
