'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

export function HoverGallery({ images, className }) {
  const containerRef = useRef(null)
  const imageRefs = useRef([])
  const [activeImage, setActiveImage] = useState(1)

  useGSAP(() => {
    imageRefs.current.forEach((img, index) => {
      if (img) {
        gsap.to(img, {
          width: index === activeImage ? '24rem' : '5rem',
          height: index === activeImage ? '24rem' : '24rem',
          duration: 0.35,
          ease: 'power1 .inOut',
        })
      }
    })
  }, [activeImage])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [images.length])

  const handleImageHover = (index) => setActiveImage(index)

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
      <div className="flex items-center justify-center size-full">
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            onMouseEnter={() => handleImageHover(index)}
            className="relative overflow-hidden"
          >
            <Image src={image} className="size-full object-cover" alt="Hover Gallery Image" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}
