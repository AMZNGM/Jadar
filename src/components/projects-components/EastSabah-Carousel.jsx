'use client'

import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import Draggable from 'gsap/Draggable'
import { RefreshCcw, Shuffle } from 'lucide-react'
import { BgNoise, MovingBorders } from '@/data/mediaData/svgs.jsx'
import { projectImages } from '@/data/mediaData/projectMedia.js'
import CloseBtn from '@/components/ui/buttons/CloseBtn.jsx'
import Noise from '@/components/ui/effects/Noise.jsx'

gsap.registerPlugin(Draggable)
gsap.config({ nullTargetWarn: false })

export default function EastSabahCarousel() {
  const projectImgs = projectImages.eastSabah
  const containerRef = useRef(null)
  const CarouselRef = useRef(null)
  const lightboxImgRef = useRef(null)
  const lightboxBackdropRef = useRef(null)
  const lastLightboxOpenRef = useRef(0)
  const positionsRef = useRef({})
  const itemsRef = useRef([])
  const lastTapRef = useRef(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    if (!CarouselRef.current) return
    const isDesktop = window.innerWidth > 768
    if (!isDesktop) return
    const preventScroll = (e) => e.preventDefault()
    CarouselRef.current.addEventListener('touchmove', preventScroll, { passive: false })
    return () => {
      CarouselRef.current && CarouselRef.current.removeEventListener('touchmove', preventScroll)
    }
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') {
          closeLightbox()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          goNext()
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goPrev()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = CarouselRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      itemsRef.current = itemsRef.current.slice(0, projectImgs.length)
      positionsRef.current = {}
      const animations = []

      itemsRef.current.forEach((el, i) => {
        if (!el) return

        const angle = (i / projectImgs.length) * Math.PI * 2
        const radius = Math.min(rect.width, rect.height) * 0.3
        const offsetX = centerX + Math.cos(angle) * radius - el.offsetWidth / 2
        const offsetY = centerY + Math.sin(angle) * radius - el.offsetHeight / 2

        positionsRef.current[i] = { x: offsetX, y: offsetY }

        gsap.set(el, {
          x: centerX - el.offsetWidth / 2,
          y: centerY - el.offsetHeight / 2,
          scale: 0.001,
          rotation: 180,
          transformPerspective: 800,
        })

        const animation = gsap.to(el, {
          x: offsetX,
          y: offsetY,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'back.out(1.7)',
          transformPerspective: 800,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            once: true,
          },
        })

        animations.push(animation)
      })

      const handleResize = () => {
        if (!container) return
        const rect = container.getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        itemsRef.current.forEach((el, i) => {
          if (!el) return

          const angle = (i / projectImgs.length) * Math.PI * 2
          const radius = Math.min(rect.width, rect.height) * 0.3
          const offsetX = centerX + Math.cos(angle) * radius - el.offsetWidth / 2
          const offsetY = centerY + Math.sin(angle) * radius - el.offsetHeight / 2

          positionsRef.current[i] = { x: offsetX, y: offsetY }

          gsap.to(el, {
            x: offsetX,
            y: offsetY,
            duration: 0.8,
            ease: 'power2.out',
          })
        })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, CarouselRef)

    return () => ctx.revert()
  }, [projectImgs])

  useGSAP(() => {
    if (!itemsRef.current._gsDraggable && window.innerWidth > 768) {
      Draggable.create(itemsRef.current, {
        type: 'x,y',
        bounds: CarouselRef.current,
        inertia: true, //
        dragResistance: 0.08,
        edgeResistance: 1.2,
        minimumMovement: 2,
        throwResistance: 0.1,
        snap: {
          x: (end) => Math.round(end / 10) * 10,
          y: (end) => Math.round(end / 10) * 10,
        },
        onDragStart() {
          this.target.style.pointerEvents = 'none'
          gsap.killTweensOf(this.target)
          gsap.to(this.target, {
            scale: 1.05,
            rotation: 0.01,
            duration: 0.15,
            ease: 'power2.out',
            transformPerspective: 800,
            overwrite: 'auto',
          })
        },
        onDrag() {
          const rotation = (this.x - this.startX) * 0.05
          gsap.set(this.target, { rotation, transformPerspective: 800 })
        },
        onThrowUpdate() {
          gsap.to(this.target, {
            rotation: 0.01,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        },
        onRelease() {
          gsap.to(this.target, {
            rotation: 0.01,
            duration: 0.3,
            ease: 'power2.out',
          })
        },
        onDragEnd() {
          this.target.style.pointerEvents = 'auto'
          gsap.to(this.target, {
            scale: 1,
            rotation: 0.01,
            transformPerspective: 800,
            duration: 0.3,
            ease: 'back.out(1.4)',
            overwrite: 'auto',
          })
        },
      })
      itemsRef.current._gsDraggable = true
    }
  })

  const openLightbox = (index) => {
    const now = Date.now()
    if (now - lastLightboxOpenRef.current < 400) return
    lastLightboxOpenRef.current = now

    setLightboxIndex(index)
    setLightboxOpen(true)

    if (lightboxBackdropRef.current) {
      lightboxBackdropRef.current.style.pointerEvents = 'none'
    }

    setTimeout(() => {
      if (lightboxBackdropRef.current) {
        lightboxBackdropRef.current.style.pointerEvents = 'auto'
      }
    }, 500)
  }

  const handleDoubleTap = (index) => {
    const now = Date.now()
    const timeSinceLast = now - lastTapRef.current
    if (timeSinceLast < 300 && timeSinceLast > 0) {
      openLightbox(index)
    }
    lastTapRef.current = now
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    if (lightboxBackdropRef.current) {
      lightboxBackdropRef.current.style.pointerEvents = 'none'
    }
  }

  const goNext = () => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % projectImgs.length))
  }

  const goPrev = () => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + projectImgs.length) % projectImgs.length))
  }

  const shuffleLayout = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const container = CarouselRef.current
    const rect = container.getBoundingClientRect()
    let completedAnimations = 0
    const totalItems = itemsRef.current.filter((el) => el).length

    itemsRef.current.forEach((el, i) => {
      if (!el) return

      const randomX = Math.random() * Math.max(0, rect.width - el.offsetWidth)
      const randomY = Math.random() * Math.max(0, rect.height - el.offsetHeight)

      gsap.to(el, {
        x: randomX,
        y: randomY,
        duration: 0.6,
        delay: i * 0.03,
        ease: 'power2.out',
        onComplete: () => {
          completedAnimations++
          if (completedAnimations === totalItems) {
            setTimeout(() => setIsAnimating(false), 100)
          }
        },
      })
    })
  }

  const resetLayout = () => {
    if (isAnimating || !CarouselRef.current) return
    setIsAnimating(true)

    const container = CarouselRef.current
    const rect = container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    let completedAnimations = 0
    const totalItems = itemsRef.current.filter((el) => el).length

    itemsRef.current.forEach((el, i) => {
      if (!el) return

      const angle = (i / projectImgs.length) * Math.PI * 2
      const radius = Math.min(rect.width, rect.height) * 0.3
      const targetX = centerX + Math.cos(angle) * radius - el.offsetWidth / 2
      const targetY = centerY + Math.sin(angle) * radius - el.offsetHeight / 2

      positionsRef.current[i] = { x: targetX, y: targetY }

      gsap.to(el, {
        x: targetX,
        y: targetY,
        duration: 1.2,
        delay: i * 0.05,
        ease: 'elastic.out(1, 0.5)',
        onComplete: () => {
          completedAnimations++
          if (completedAnimations === totalItems) {
            setTimeout(() => setIsAnimating(false), 100)
          }
        },
      })
    })
  }

  useGSAP(() => {
    if (!lightboxImgRef.current) return

    Draggable.create(lightboxImgRef.current, {
      type: 'x',
      inertia: true,
      edgeResistance: 0.8,
      bounds: { minX: -200, maxX: 200 },
      onDragEnd() {
        if (this.x > 100) {
          goPrev()
        } else if (this.x < -100) {
          goNext()
        }
        gsap.to(this.target, { x: 0, duration: 0.4, ease: 'power2.out' })
      },
    })[0]
  }, [lightboxIndex])

  useGSAP(() => {
    if (!containerRef.current) {
      return
    }

    gsap.fromTo(
      containerRef.current,
      { backgroundColor: '#000000' },
      {
        backgroundColor: '#181818',
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section ref={containerRef} className="relative w-screen h-screen max-md:h-120 overflow-hidden bg-black text-bg py-12 px-4">
      <Noise />

      <div ref={CarouselRef} className="relative size-full touch-none max-md:touch-auto select-none">
        {/* imgs */}
        {projectImgs.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="Carousel Image"
            draggable={false}
            ref={(el) => (itemsRef.current[index] = el)}
            onDoubleClick={() => openLightbox(index)}
            onTouchEnd={() => handleDoubleTap(index)}
            className="absolute w-1/7 max-lg:w-1/4 max-md:w-1/3 object-cover select-none backface-hidden will-change-transform transform-gpu cursor-grab active:cursor-grabbing hover:brightness-110 z-10"
          />
        ))}

        {/* btns */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          <button
            onClick={resetLayout}
            disabled={isAnimating}
            className="group bg-text/75 rounded-lg font-light cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed px-8 hover:px-12"
          >
            <RefreshCcw
              size={16}
              className={`transition-transform duration-500 ${isAnimating ? 'animate-spin' : 'group-hover:rotate-180'}`}
            />
          </button>

          <button
            onClick={shuffleLayout}
            disabled={isAnimating}
            className="group bg-text/75 rounded-lg font-light cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed px-8 hover:px-12 flex items-center gap-2"
          >
            <Shuffle size={16} className="group-hover:scale-110 transition-transform" />
            Shuffle
          </button>
        </div>
      </div>

      {/* lightbox */}
      {lightboxIndex !== null && (
        <div
          ref={lightboxBackdropRef}
          onClick={closeLightbox}
          className={`fixed inset-0 flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm transition-opacity z-9999 ${
            lightboxOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Noise />

          {/* image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex justify-center items-center max-w-6xl m-auto bg-bg shadow-2xl shadow-main/10 overflow-hidden"
          >
            <Noise />
            <Image
              ref={lightboxImgRef}
              src={projectImgs[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1}`}
              onDoubleClick={closeLightbox}
              className="size-full object-cover backface-hidden will-change-transform z-10000 p-2"
            />
            <MovingBorders />
          </div>

          <CloseBtn onClick={closeLightbox} />

          {/* prev arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            className="group absolute left-4 max-lg:left-2 max-xl:bottom-25 max-lg:bottom-40 max-md:bottom-60 text-4xl text-main bg-bg shadow-lg shadow-main/10 hover:scale-110 cursor-pointer duration-300 overflow-hidden z-10000 px-4"
            aria-label="Previous image"
          >
            <BgNoise className="opacity-25" />
            <MovingBorders />‹
          </button>

          {/* next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            className="absolute right-4 max-md:right-2 max-xl:bottom-25 max-lg:bottom-40 max-md:bottom-60 text-4xl text-main bg-bg shadow-lg shadow-main/10 hover:scale-110 cursor-pointer duration-300 overflow-hidden z-10000 px-4"
            aria-label="Next image"
          >
            <BgNoise className="opacity-25" />
            <MovingBorders />›
          </button>

          {/* indicator */}
          <div className="absolute bottom-10 max-xl:bottom-25 max-lg:bottom-40 max-md:bottom-20 w-fit max-sm:w-[96%] flex justify-center items-center gap-4 text-sm text-main bg-bg shadow-lg shadow-main/10 backdrop-blur-sm select-none overflow-hidden z-10001 py-2 px-4">
            <BgNoise className="blur-[2px]" />
            <MovingBorders />
            <span>
              {lightboxIndex + 1} / {projectImgs.length}
            </span>
            <span className="text-xs text-main/50">Press ESC to close</span>
          </div>
        </div>
      )}
    </section>
  )
}
