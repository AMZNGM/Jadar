'use client'

import { useState, useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import ShinyText from '@/components/ui/text/ShinyText.jsx'

export default function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const gridRef = useRef(null)
  const boxRefs = useRef([])
  const gridSize = 7
  const totalBoxes = gridSize * gridSize
  const centerIndex = Math.floor(totalBoxes / 2)

  useGSAP(() => {
    if (!boxRefs.current.length || !contentRef.current) return
    const validBoxes = boxRefs.current.filter((b) => b)
    if (!validBoxes.length) return

    const tl = gsap.timeline()
    tl.from(validBoxes, { scale: 0.8, duration: 0.5, ease: 'power2.out', stagger: 0.02 })
    tl.to(contentRef.current, { opacity: 1, duration: 2, ease: 'power2.out' }, '-=0.5')
  }, [])

  useGSAP(() => {
    let loadedCount = 0
    let isLoadComplete = false
    document.body.style.overflow = 'hidden'
    const imgs = Array.from(document.querySelectorAll('img'))
    const videos = Array.from(document.querySelectorAll('video'))
    const totalResources = Math.max(imgs.length + videos.length, 1)

    const updateLoadedCount = () => {
      loadedCount++
      if (loadedCount >= totalResources && !isLoadComplete) {
        isLoadComplete = true
        finishLoading()
      }
    }

    const finishLoading = () => {
      // Play the selected grid animation first, then run the rest after it completes.
      if (gridRef.current) {
        const centerBox = boxRefs.current[centerIndex]
        if (centerBox) {
          const rect = centerBox.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2 - window.innerWidth / 2
          const centerY = rect.top + rect.height / 2 - window.innerHeight / 2

          const gridTl = gsap.timeline({
            onComplete: () => {
              const restTl = gsap.timeline({
                onComplete: () => {
                  setIsComplete(true)
                  document.body.style.overflow = 'auto'
                },
              })

              if (contentRef.current) restTl.to(contentRef.current, { opacity: 0, duration: 0.6 })
              if (sectionRef.current) restTl.to(sectionRef.current, { y: '-100vh', duration: 0.8, ease: 'power2.inOut' }, '-=0.4')
            },
          })

          gridTl.to(gridRef.current, {
            scale: 10,
            x: -centerX,
            y: -centerY,
            transformOrigin: 'center center',
            duration: 1.8,
            ease: 'power4.inOut',
          })
        } else {
          // fallback: no center box found
          setIsComplete(true)
          document.body.style.overflow = 'auto'
        }
      } else {
        // fallback: no grid found
        setIsComplete(true)
        document.body.style.overflow = 'auto'
      }
    }

    const handleLoad = () => updateLoadedCount()

    imgs.forEach((img) => {
      if (img.complete) handleLoad()
      else {
        img.addEventListener('load', handleLoad, { once: true })
        img.addEventListener('error', handleLoad, { once: true })
      }
    })
    videos.forEach((video) => {
      if (video.readyState >= 1) handleLoad()
      else {
        video.addEventListener('loadedmetadata', handleLoad, { once: true })
        video.addEventListener('error', handleLoad, { once: true })
      }
    })

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
  })

  if (isComplete) return null

  return (
    <section ref={sectionRef} className="fixed inset-0 w-screen h-screen overflow-hidden bg-bg z-9999 px-4">
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

      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
        <h6 className="text-main text-4xl max-md:text-3xl font-bold max-md:font-semibold mb-4">
          <ShinyText text={`JADAR`} textColor="#d73b13" />
        </h6>
      </div>
    </section>
  )
}
