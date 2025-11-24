'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise } from '@/data/mediaData/svgs'
import Image from 'next/image'
import MainLogo from '../../../public/images/logo/Main Logo.webp'

export default function LoadingScreen() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(mobile)
  }, [])
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const gridRef = useRef(null)
  const boxRefs = useRef([])
  const gridSize = 7
  const totalBoxes = gridSize * gridSize
  const centerIndex = Math.floor(totalBoxes / 2)

  useGSAP(() => {
    if (isMobile) return
    if (!boxRefs.current.length || !contentRef.current) return

    const validBoxes = boxRefs.current.filter((b) => b)
    if (!validBoxes.length) return

    const tl = gsap.timeline()
    tl.from(validBoxes, {
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.02,
    })
    tl.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.3' // start logo fade-in slightly before grid finishes
    )
  }, [])

  useEffect(() => {
    let loadedCount = 0
    let isLoadComplete = false
    document.body.style.overflow = 'hidden'
    const imgs = Array.from(document.querySelectorAll('img'))
    const videos = Array.from(document.querySelectorAll('video'))

    const totalResources = Math.max(imgs.length + videos.length, 1)

    const updateProgress = () => {
      loadedCount++
      const prog = Math.min((loadedCount / totalResources) * 100, 100)
      setProgress(prog)
      if (loadedCount >= totalResources && !isLoadComplete) {
        isLoadComplete = true
        finishLoading()
      }
    }

    const finishLoading = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true)
          document.body.style.overflow = 'auto'
        },
      })

      if (!isMobile && gridRef.current) {
        const centerBox = boxRefs.current[centerIndex]
        if (centerBox) {
          const rect = centerBox.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2 - window.innerWidth / 2
          const centerY = rect.top + rect.height / 2 - window.innerHeight / 2

          tl.to(gridRef.current, {
            scale: 10,
            x: -centerX,
            y: -centerY,
            transformOrigin: 'center center',
            duration: 1.8,
            ease: 'power4.inOut',
          })
          tl.to([gridRef.current, contentRef.current], { opacity: 0, duration: 0.8 }, '-=0.6')
          tl.to(sectionRef.current, { yPercent: -1000, duration: 1, ease: 'power2.inOut' }, '-=0.6')
        }
      } else {
        // Mobile: just fade out logo & bar
        tl.to(contentRef.current, { opacity: 0, duration: 0.6 })
        tl.to(sectionRef.current, { yPercent: -1000, duration: 0.8, ease: 'power2.inOut' }, '-=0.4')
      }
    }

    const handleLoad = (e) => updateProgress()

    // Images
    imgs.forEach((img) => {
      if (img.complete) handleLoad()
      else {
        img.addEventListener('load', handleLoad, { once: true })
        img.addEventListener('error', handleLoad, { once: true })
      }
    })
    // Videos
    videos.forEach((video) => {
      if (video.readyState >= 1) handleLoad()
      else {
        video.addEventListener('loadedmetadata', handleLoad, { once: true })
        video.addEventListener('error', handleLoad, { once: true })
      }
    })

    // max timeout 8s
    const timeoutId = setTimeout(() => {
      if (!isLoadComplete) finishLoading()
    }, 8000)

    return () => {
      clearTimeout(timeoutId)
      document.body.style.overflow = 'auto'
      imgs.forEach((img) => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleLoad)
      })
      videos.forEach((v) => {
        v.removeEventListener('loadedmetadata', handleLoad)
        v.removeEventListener('error', handleLoad)
      })
    }
  }, [isMobile])

  if (isComplete) return null

  if (isMobile) {
    return (
      <section ref={sectionRef} className="fixed inset-0 flex flex-col items-center justify-center bg-bg z-9999 px-4">
        <div ref={contentRef}>
          <Image src={MainLogo} alt="Logo" className="w-32 mb-6 drop-shadow-[0_0_20px] drop-shadow-main" />
          <div className="w-full max-w-xs h-2 bg-main/30 rounded overflow-hidden">
            <div className="h-full bg-main rounded" style={{ width: `${progress}%`, transition: 'width 0.2s ease' }} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="fixed inset-0 w-screen h-screen overflow-hidden bg-bg z-[9999] py-8 px-4 sm:py-10 md:px-8">
      <BgNoise />

      <div
        ref={gridRef}
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: totalBoxes }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (boxRefs.current[i] = el)}
            className="relative w-full h-full border border-main/30 transition-all duration-700 bg-transparent"
          />
        ))}
      </div>

      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-3xl font-semibold px-4 opacity-0"
      >
        <Image src={MainLogo} alt="Logo" className="w-32 sm:w-40 md:w-50 mb-6 sm:mb-8 md:mb-10 drop-shadow-[0_0_20px] drop-shadow-main" />
        <div className="relative w-full max-w-75 max-md:w-50 h-1">
          <div
            className="relative h-full bg-main rounded-full duration-300"
            style={{
              width: `${progress}%`,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(188, 65, 26, 0.3) -5%, var(--color-main) 15%, var(--color-main) 85%, rgba(188, 65, 26, 0.9) 95%, transparent 100%)',
              boxShadow: '0 0 10px var(--color-main)',
              transition: 'width 0.2s ease',
            }}
          />
        </div>
      </div>
    </section>
  )
}
