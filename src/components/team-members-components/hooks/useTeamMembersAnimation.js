import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

export const useTeamMembersAnimation = ({
  activeIndex,
  setActiveIndex,
  filteredMembers,
  selectedMember,
  bottombarOpen,
  closebottombar,
}) => {
  const stickyImgRef = useRef(null)
  const stickyImgContainerRef = useRef(null)
  const detailImgRef = useRef(null)
  const overlayRef = useRef(null)
  const bottombarRef = useRef(null)
  const nameRef = useRef(null)
  const roleRef = useRef(null)
  const bioRef = useRef(null)
  const contactRefs = useRef([])
  const namesRef = useRef([])
  const quadtreeRef = useRef(null)
  const svgRef = useRef(null)
  const polylineRef = useRef(null)
  const markerRef = useRef(null)

  // Highlight active name on scroll
  useGSAP(() => {
    const els = namesRef.current.filter(Boolean)
    if (!els.length) return

    const triggers = els.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      })
    )

    return () => triggers.forEach((t) => t.kill())
  }, [filteredMembers, setActiveIndex])

  // Animate sticky image
  useGSAP(() => {
    if (typeof window === 'undefined') return

    const img = stickyImgRef.current
    const imgContainer = stickyImgContainerRef.current
    const quadtree = quadtreeRef.current

    if (!img || !imgContainer || !quadtree) return

    gsap.killTweensOf([img, imgContainer])
    gsap.set(imgContainer, { clearProps: 'transform' })

    gsap.fromTo(img, { scale: 1.5 }, { scale: 1, duration: 1, ease: 'power2.out' })

    const animation = gsap.to(imgContainer, {
      x: () => -(window.innerWidth / 2 + imgContainer.offsetWidth / 2),
      y: () => window.innerHeight / 2 - imgContainer.offsetHeight / 2,
      scale: 0.6,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: quadtree,
        start: 'top bottom',
        end: 'top 20%',
        scrub: 0.5,
        toggleActions: 'play reverse play reverse',
        invalidateOnRefresh: true,
      },
    })

    return () => animation.scrollTrigger?.kill()
  }, [activeIndex, filteredMembers])

  // Bottom bar animations
  useGSAP(() => {
    if (bottombarOpen && bottombarRef.current && overlayRef.current) {
      gsap.set(bottombarRef.current, { y: '100%' })
      gsap.to(bottombarRef.current, { y: '0%', duration: 0.55, ease: 'power3.out', delay: 0.05 })
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: 'none' })
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.35, ease: 'power2.out' })
    }
  }, [bottombarOpen])

  // Bottom bar content animation
  useGSAP(() => {
    if (bottombarOpen && selectedMember) {
      const ctx = gsap.context(() => {
        if (detailImgRef.current) {
          gsap.fromTo(
            detailImgRef.current,
            { scale: 0.82, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, delay: 0.18, ease: 'back.out(1.7)' }
          )
        }

        gsap.fromTo(
          [nameRef.current, roleRef.current],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, delay: 0.25, stagger: 0.08 }
        )
        gsap.fromTo(bioRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.35 })
        gsap.fromTo(
          contactRefs.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.4, stagger: 0.06, ease: 'power2.out' }
        )
      })
      return () => ctx.revert()
    }
  }, [bottombarOpen, selectedMember])

  // Scroll-reveal animation
  useGSAP(() => {
    requestAnimationFrame(() => {
      const els = namesRef.current.filter(Boolean)
      const stickyImg = stickyImgRef.current
      if (!els.length && !stickyImg) return

      els.forEach((el) => {
        gsap.killTweensOf(el)
        ScrollTrigger.getById(el)?.kill?.()
      })

      const ctx = gsap.context(() => {
        els.forEach((el, i) => {
          gsap.set(el, {
            y: 90,
            x: i % 2 === 0 ? -220 : 220,
            opacity: 0,
            scale: 0.85,
            filter: 'blur(8px)',
          })

          gsap.to(el, {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'none',
            duration: 1.05,
            delay: i * 0.005,
            ease: 'elastic.out(1, 0.7)',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          })
        })
      })

      ScrollTrigger.refresh()
      return () => ctx.revert()
    })
  }, [filteredMembers])

  // Arrow animation
  useGSAP(() => {
    const svg = svgRef.current
    const polyline = polylineRef.current
    const marker = markerRef.current

    if (!svg || !polyline) return

    gsap.set(polyline, { strokeDasharray: '15 18', strokeDashoffset: 1000 })
    gsap.set(marker, { scale: 0, transformOrigin: 'center' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 80%',
        end: 'top -100%',
        scrub: 1.5,
        toggleActions: 'play reverse play reverse',
      },
    })

    tl.to(polyline, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
    }).to(marker, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.5')

    return () => tl.scrollTrigger?.kill()
  }, [])

  return {
    stickyImgRef,
    stickyImgContainerRef,
    detailImgRef,
    overlayRef,
    bottombarRef,
    nameRef,
    roleRef,
    bioRef,
    contactRefs,
    namesRef,
    quadtreeRef,
    svgRef,
    polylineRef,
    markerRef,
  }
}
