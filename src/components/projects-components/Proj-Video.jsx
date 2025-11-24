'use client'

import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import BgVideo from '@/components/ui/BgVideo.jsx'
import Logo from '@/components/ui/logo.jsx'

export default function ProjVideo({ videoSrc, videoUrl, logoName, className }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-video', {
        opacity: 0,
        scale: 1.1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reveal-video',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className={`relative w-screen overflow-hidden bg-black text-bg ${className}`}>
      <div className="reveal-section group relative">
        <div className="relative">
          <BgVideo src={videoSrc} className="reveal-video relative w-full h-[80vh] max-md:h-[50vh] z-0" />
          <div className="bg-black size-full absolute inset-0 opacity-0 group-hover:opacity-50 duration-1000" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10 opacity-0 group-hover:opacity-100 duration-1000">
          <Logo logoName={logoName} to={videoUrl} />
        </div>
      </div>
    </section>
  )
}
