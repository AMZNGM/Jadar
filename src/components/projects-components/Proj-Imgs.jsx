'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise } from '@/data/mediaData/svgs.jsx'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'

export const AbdullaMubarakGridImg = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentIndex2, setCurrentIndex2] = useState(1)
  const [currentIndex3, setCurrentIndex3] = useState(2)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(Math.floor(Math.random() * images.length))
      setCurrentIndex2(Math.floor(Math.random() * images.length))
      setCurrentIndex3(Math.floor(Math.random() * images.length))
    }, 2000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative w-screen overflow-hidden bg-bg px-4">
      <BgNoise />

      <ParallaxElement speed={5} direction="opacity" className={`grid grid-cols-3 border-t border-main/50 py-3`}>
        <div className="col-span-2 col-start-1 relative h-[60vh] max-md:h-[40vh] overflow-hidden z-10">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="img"
              className="absolute inset-0 size-full object-cover border-e border-main/50 pe-2 opacity-0 duration-1000 ease-in-out"
              style={{
                opacity: currentIndex === index ? 1 : 0,
              }}
            />
          ))}
        </div>

        <div className="col-span-1 col-start-3 relative h-[30vh] max-md:h-[20vh] overflow-hidden z-10">
          {images.map((img, index) => (
            <Image
              key={`top-${index}`}
              src={img}
              alt="img"
              className="absolute inset-0 size-full object-cover ps-2 opacity-0 duration-1000 ease-in-out"
              style={{
                opacity: currentIndex2 === index ? 1 : 0,
              }}
            />
          ))}
        </div>

        <ParallaxElement speed={1.15} className={`col-span-1 col-start-3 relative h-[30vh] max-md:h-[20vh] overflow-hidden mt-2 ms-2 z-10`}>
          {images.map((img, index) => (
            <Image
              key={`bottom-${index}`}
              src={img}
              alt="img"
              className={`absolute inset-0 size-full object-cover opacity-0 duration-1000 ease-in-out`}
              style={{
                opacity: currentIndex3 === index ? 1 : 0,
              }}
            />
          ))}
        </ParallaxElement>

        <div className="col-start-3 relative max-lg:hidden">
          <ParallaxElement
            speed={2.35}
            direction="custom"
            ease="power2.out"
            className={`font-bold leading-5 uppercase whitespace-nowrap pointer-events-none select-none text-[15vw] text-main/10`}
          >
            {Array(14)
              .fill('Jadar')
              .map((_, i) => (
                <div key={i}>
                  Jadar
                  <br />
                  Jadar Jadar
                </div>
              ))}
          </ParallaxElement>
        </div>
      </ParallaxElement>
    </section>
  )
}

export const LevelsTowerGridImg = ({ images }) => {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentIndex2, setCurrentIndex2] = useState(1)
  const [currentIndex3, setCurrentIndex3] = useState(2)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(Math.floor(Math.random() * images.length))
      setCurrentIndex2(Math.floor(Math.random() * images.length))
      setCurrentIndex3(Math.floor(Math.random() * images.length))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-img').forEach((img) => {
        gsap.from(img, {
          opacity: 0,
          duration: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
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
    <section ref={containerRef} className="relative w-screen overflow-hidden bg-text text-bg px-4">
      <BgNoise />

      <div className="grid grid-cols-3 py-3 relative overflow-hidden border-t border-bgb section-block">
        {/* Big left image */}
        <div className="reveal-section col-span-2 col-start-1 relative h-[60vh] max-md:h-[40vh] overflow-hidden">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="img"
              className="reveal-img absolute inset-0 size-full object-cover pe-2 border-e border-bgb opacity-0 duration-1000 ease-in-out"
              style={{
                opacity: currentIndex === index ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Top right image */}
        <div className="reveal-section col-span-1 col-start-3 relative overflow-hidden">
          {images.map((img, index) => (
            <img
              key={`top-${index}`}
              src={img}
              alt="img"
              className="reveal-img absolute top-0 w-full h-1/2 object-cover ps-2 pb-2 opacity-0 duration-1000 ease-in-out"
              style={{
                opacity: currentIndex2 === index ? 1 : 0,
              }}
            />
          ))}

          {images.map((img, index) => (
            <img
              key={`bottom-${index}`}
              src={img}
              alt="img"
              className="reveal-img absolute bottom-0 w-full h-1/2 object-cover ps-2 pt-2 opacity-0 duration-1000 ease-in-out"
              style={{
                opacity: currentIndex3 === index ? 1 : 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
