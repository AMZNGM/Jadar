'use client'

import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { projectImages } from '@/data/mediaData/projectMedia.js'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'
import FloatingEffect from '@/components/ui/effects/FloatingEffect.jsx'
import BgVideo from '@/components/ui/BgVideo.jsx'
import Logo from '@/components/ui/logo.jsx'

export default function ProjMaskedVideo({ maskedVid, maskedVidUrl, logoName, projectName }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const logoRef = useRef(null)
  const imagesContainerRef = useRef(null)
  const projectImgs = projectImages[projectName]?.slice(0, 6) || []

  useGSAP(() => {
    if (!containerRef.current || !videoRef.current) return

    const ctx = gsap.context(() => {
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      masterTL
        .fromTo(
          videoRef.current,
          {
            opacity: 1,
            scale: 0.6,
            rotate: 0,
          },
          {
            opacity: 0,
            scale: 5,
            rotate: 90,
            ease: 'power2.inOut',
            duration: 1.5,
          },
          'start'
        )

        .to(
          containerRef.current,
          {
            backgroundColor: '#181818',
            ease: 'power2.inOut',
            duration: 0.8,
          },
          'start+=0.2'
        )

        .fromTo(
          logoRef.current,
          { scale: 0.5, opacity: 0 },
          {
            scale: 10,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.8,
          },
          'start+=0.5'
        )

        .to(
          logoRef.current,
          {
            y: '-35vh',
            scale: 3,
            transformOrigin: 'center center',
            ease: 'power2.inOut',
            duration: 1.6,
          },
          'start+=1'
        )

        .fromTo(
          imagesContainerRef.current,
          { opacity: 0, xPercent: 140 },
          {
            opacity: 1,
            xPercent: 0,
            duration: 15.8,
            ease: 'power2.out',
          },
          'start+=0.5'
        )

        .fromTo(
          '.project-img',
          { scale: 0.8, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          'start+=1.4'
        )
    }, containerRef)

    return () => {
      // Kill only triggers created within this context
      ctx.revert()
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-screen h-[1500vh] bg-text text-bg px-4 max-lg:hidden">
      <div className="sticky top-0 h-screen">
        <div className="relative size-full flex justify-center items-center border-t border-bg/30 py-3">
          <ParallaxElement speed={-0.5} direction="scale">
            <FloatingEffect intensity={1.5}>
              <div ref={videoRef} className="relative bg-bg will-change-transform">
                <BgVideo src={maskedVid} className="relative size-full object-cover mix-blend-screen border-5 border-bg z-0" />
              </div>
            </FloatingEffect>
          </ParallaxElement>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div ref={logoRef} className="relative z-20 will-change-transform">
              <Logo logoName={logoName} to={maskedVidUrl} />
            </div>

            <div
              ref={imagesContainerRef}
              className="absolute right-0 min-w-1500 flex items-center justify-center gap-16 will-change-transform"
            >
              {projectImgs.map((img, index) => (
                <div key={index} className="project-img size-[60%] overflow-hidden mt-50">
                  <img
                    src={img.src || img}
                    alt={`${projectName} project ${index + 1}`}
                    loading="lazy"
                    className="size-full object-cover aspect-video will-change-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
