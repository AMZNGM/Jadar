'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise, DiagonalLines, Quadtree, SeeMoreCursor, MovingBorders } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { useLanguage } from '@/translations/LanguageContext'
import { teamMembers } from '@/data/teamMembersData'
import TextFlipper from '@/components/ui/text/TextFlipper.jsx'
import CloseBtn from '@/components/ui/buttons/CloseBtn.jsx'

const FallbackImg = 'src/assets/images/Artboard/Artboard 15.webp'

const TeamMembers = () => {
  const { t } = useTranslation()
  const { selectedLanguage } = useLanguage()
  const teamMember = teamMembers(t)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedMember, setSelectedMember] = useState(null)
  const [bottombarOpen, setBottombarOpen] = useState(false)
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
  namesRef.current = []
  const quadtreeRef = useRef(null)
  const svgRef = useRef(null)
  const polylineRef = useRef(null)
  const markerRef = useRef(null)

  // search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(t)
  }, [query])

  const filteredMembers = useMemo(
    () => teamMember.filter((m) => [m.name, m.role].some((f) => f.toLowerCase().includes(debouncedQuery.toLowerCase()))),
    [debouncedQuery]
  )

  useEffect(() => {
    if (activeIndex >= filteredMembers.length) setActiveIndex(0)
  }, [filteredMembers, activeIndex])

  // highlight active name on scroll
  useGSAP(() => {
    // filter populated elements
    const els = namesRef.current.filter(Boolean)
    if (!els.length) return

    const triggers = []

    els.forEach((el, i) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      })
      triggers.push(trigger)
    })

    return () => triggers.forEach((t) => t.kill())
  }, [filteredMembers])

  // animate sticky img
  useGSAP(() => {
    const img = stickyImgRef.current
    const imgContainer = stickyImgContainerRef.current
    const quadtree = quadtreeRef.current

    if (!img || !imgContainer || !quadtree) return

    gsap.killTweensOf(img)
    gsap.killTweensOf(imgContainer)

    gsap.set(imgContainer, {
      x: 0,
      y: 0,
      scale: 1,
      clearProps: 'transform',
    })

    gsap.fromTo(
      img,
      { scale: 1.5 },
      {
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      }
    )

    const animation = gsap.to(imgContainer, {
      x: () => {
        const containerWidth = imgContainer.offsetWidth
        const viewportWidth = window.innerWidth
        return -(viewportWidth / 2 + containerWidth / 2)
      },
      y: () => {
        const containerHeight = imgContainer.offsetHeight
        const viewportHeight = window.innerHeight
        return viewportHeight / 2 - containerHeight / 2
      },
      scale: 0.6,
      duration: 1,
      ease: 'power2.inOut',
      immediateRender: false,
      scrollTrigger: {
        trigger: quadtree,
        start: 'top bottom',
        end: 'top 20%',
        scrub: 0.5,
        toggleActions: 'play reverse play reverse',
        invalidateOnRefresh: true,
      },
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [activeIndex, filteredMembers])

  // bottom bar animation
  useGSAP(() => {
    if (bottombarOpen && bottombarRef.current && overlayRef.current) {
      gsap.set(bottombarRef.current, { y: '100%' })
      gsap.to(bottombarRef.current, { y: '0%', duration: 0.55, ease: 'power3.out', delay: 0.05 })
      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    }
  }, [bottombarOpen])

  const openbottombar = (member, idx) => {
    setSelectedMember(member)
    setActiveIndex(idx)
    setBottombarOpen(true)
  }

  const closebottombar = useCallback(() => {
    if (!bottombarRef.current || !overlayRef.current) {
      setBottombarOpen(false)
      setSelectedMember(null)
      return
    }
    gsap.to(bottombarRef.current, { y: '100%', duration: 0.45, ease: 'power2.in' })
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        setBottombarOpen(false)
        setSelectedMember(null)
      },
    })
  }, [])

  // bottom bar content animation
  useGSAP(() => {
    if (bottombarOpen && selectedMember) {
      const ctx = gsap.context(() => {
        gsap.fromTo(bottombarRef.current, { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })

        if (detailImgRef.current) {
          gsap.fromTo(
            detailImgRef.current,
            { scale: 0.82, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, delay: 0.18, ease: 'back.out(1.7)' }
          )
        }

        // Name + role + bio + contacts
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

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!filteredMembers.length) return
      if (e.key === 'ArrowDown') setActiveIndex((p) => (p + 1) % filteredMembers.length)
      else if (e.key === 'ArrowUp') setActiveIndex((p) => (p - 1 + filteredMembers.length) % filteredMembers.length)
      else if (e.key === 'Enter') openbottombar(filteredMembers[activeIndex], activeIndex)
      else if (e.key === 'Escape' && bottombarOpen) closebottombar()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [filteredMembers, activeIndex, bottombarOpen, closebottombar])

  const handleImageError = (e) => {
    e.target.src = FallbackImg
  }

  // scroll-reveal animation
  useGSAP(() => {
    // run after DOM paint so refs are populated
    requestAnimationFrame(() => {
      const els = namesRef.current.filter(Boolean)
      const stickyImg = stickyImgRef.current
      if (!els.length && !stickyImg) return

      // kill previous tweens/triggers for targets
      els.forEach((el) => {
        gsap.killTweensOf(el)
        ScrollTrigger.getById(el)?.kill?.()
      })
      if (stickyImg) {
        gsap.killTweensOf(stickyImg)
        ScrollTrigger.getById(stickyImg)?.kill?.()
      }

      const ctx = gsap.context(() => {
        // SAFE initial state so nothing remains invisible if triggers fail
        els.forEach((el, i) =>
          gsap.set(el, {
            opacity: 1,
            filter: 'none',
            clearProps: 'transform,filter,opacity', // remove inline props after animation
          })
        )
        if (stickyImg) {
          gsap.set(stickyImg, { opacity: 1, clearProps: 'transform,opacity' })
        }

        // Prepare each element (start values)
        els.forEach((el, i) => {
          const fromProps = {
            y: 90,
            x: i % 2 === 0 ? -220 : 220,
            // rotate: i % 2 === 0 ? -12 : 12,
            opacity: 0,
            scale: 0.85,
            filter: 'blur(8px)',
          }
          gsap.set(el, fromProps)

          // individual ScrollTrigger so each item reveals as it enters
          gsap.to(el, {
            y: 0,
            x: 0,
            rotate: 0,
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

  // arrow animation
  useGSAP(() => {
    const svg = svgRef.current
    const polyline = polylineRef.current
    const marker = markerRef.current

    if (!svg || !polyline) return

    gsap.set(polyline, {
      strokeDasharray: '15 18',
      strokeDashoffset: 1000,
    })

    gsap.set(marker, {
      scale: 0,
      transformOrigin: 'center',
    })

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
    }).to(
      marker,
      {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      },
      '-=0.5'
    )

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section dir="ltr" className="relative px-4 w-screen min-h-screen bg-bg text-text">
      <BgNoise />

      {/* search bar */}
      <div className="relative z-10 py-6 w-full">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or role..."
          className="relative py-14 w-full text-2xl font-light text-center duration-300 outline-none border-y border-main/30 text-main hover:bg-main/3"
        />
      </div>

      <div className="flex flex-row-reverse gap-8 pb-24 max-md:overflow-hidden">
        {/* sticky image */}
        {filteredMembers.length > 0 && filteredMembers[activeIndex] && (
          <div className="relative max-lg:hidden">
            <div className="sticky top-1/3 z-10 self-start h-fit ms-4">
              <div
                ref={stickyImgContainerRef}
                className="overflow-hidden relative border transition-colors cursor-pointer group size-80 max-md:size-20 border-main/30 hover:border-main/50"
                onClick={() => openbottombar(filteredMembers[activeIndex], activeIndex)}
              >
                <MovingBorders />

                <Image
                  ref={stickyImgRef}
                  src={filteredMembers[activeIndex].image || FallbackImg}
                  alt={filteredMembers[activeIndex].name}
                  onError={handleImageError}
                  className="object-cover z-0 size-full stickyImg"
                />

                <div className="absolute inset-0 duration-500 bg-black/20 group-hover:bg-black/50">
                  <span className="flex gap-1 justify-center items-center opacity-0 duration-500 size-full group-hover:opacity-100">
                    <SeeMoreCursor />
                    See more
                  </span>
                </div>
              </div>
            </div>

            <DiagonalLines />
          </div>
        )}

        {/* names + roles */}
        <div className="flex-1 scroll-smooth snap-y snap-mandatory">
          {filteredMembers.length ? (
            filteredMembers.map((m, i) => (
              <div
                key={m.id}
                ref={(el) => (namesRef.current[i] = el)}
                onClick={() => openbottombar(m, i)}
                tabIndex={0}
                className={`flex ax-md:flex-row-reverse justify-center max-md:justify-between items-center gap-4 py-12 max-md:py-6 px-4 border-b border-main/30 uppercase duration-300 cursor-pointer ${
                  activeIndex === i ? 'text-main font-semibold' : 'text-text/50 hover:text-main'
                }`}
              >
                <span className="text-sm max-md:text-[12px]">{m.role}</span>
                <span className="text-4xl max-md:text-2xl max-sm:text-lg">{m.name}</span>
              </div>
            ))
          ) : (
            <p className="text-2xl font-extralight uppercase text-main text-cenzter">No team members found.</p>
          )}
        </div>
      </div>

      <div ref={quadtreeRef} className="flex relative z-0 justify-center items-center size-full max-md:hidden">
        <Quadtree />
        {/* arrow */}
        <svg ref={svgRef} className="absolute top-0 left-10 w-full h-300 max-lg:hidden" viewBox="0 0 800 800">
          <g
            ref={polylineRef}
            strokeWidth="0.5"
            stroke="hsl(12, 84%, 46%)"
            fill="none"
            strokeLinecap="square"
            strokeDasharray="15 18"
            transform="matrix(0.9702957262759965,0.24192189559966773,-0.24192189559966773,0.9702957262759965,-14.349532270531483,-134.8870487502657)"
          >
            <polyline points="307.5,153 492.5,153 492.5,647" markerEnd="url(#SvgjsMarker1820)" />
          </g>
          <defs>
            <marker
              ref={markerRef}
              markerWidth="14"
              markerHeight="14"
              refX="7"
              refY="7"
              viewBox="0 0 14 14"
              orient="auto"
              id="SvgjsMarker1820"
            >
              <polygon points="0,14 7,7 0,0 14,7" fill="hsl(12, 84%, 46%)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* bottom bar */}
      {bottombarOpen && selectedMember && (
        <div className="fixed inset-0 z-50">
          <div ref={overlayRef} className="absolute inset-0 backdrop-blur-sm cursor-pointer bg-black/50" onClick={closebottombar} />

          <div
            ref={bottombarRef}
            className="overflow-y-auto absolute bottom-0 left-0 w-full border-t shadow-2xl backdrop-blur-xl bg-bg/90 border-text/10"
          >
            <BgNoise />

            <CloseBtn onClick={closebottombar} />

            <div className="flex flex-col gap-6 items-center px-6 pt-10 pb-6 border-b lg:flex-row border-text/10">
              <Image
                ref={detailImgRef}
                src={selectedMember.image || FallbackImg}
                alt={selectedMember.name}
                loading="lazy"
                onError={handleImageError}
                className="object-cover w-28 h-28 border shadow-lg lg:w-32 lg:h-32 border-main/20"
              />
              <div className="text-center lg:text-left">
                <h2 ref={nameRef} className="text-2xl font-semibold lg:text-3xl text-text">
                  {selectedMember.name}
                </h2>
                <p ref={roleRef} className="text-lg font-light text-main/80">
                  {selectedMember.role}
                </p>
              </div>
              <p
                ref={bioRef}
                className={`
                font-light leading-relaxed text-text/90 lg:ml-auto lg:max-w-2xl lg:text-left border-s border-text/10 ps-4
                ${selectedLanguage === 'English' ? 'text-left!' : 'text-right!'}`}
              >
                {selectedMember.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center items-center px-6 py-8 max-md:flex-col lg:justify-around text-text/90">
              {[
                {
                  href: `mailto:${selectedMember.email}`,
                  label: selectedMember.email,
                  icon: '📨',
                },
                {
                  href: `tel:${selectedMember.phone}`,
                  label: selectedMember.phone,
                  icon: '📞',
                },
                {
                  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMember.location)}`,
                  label: selectedMember.location,
                  icon: '📍',
                  external: true,
                },
              ].map((item, i) => (
                <a
                  key={i}
                  ref={(el) => (contactRefs.current[i] = el)}
                  href={item.href}
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="flex gap-2 items-center p-3 text-lg transition-colors hover:text-main"
                >
                  <span className="text-xl">{item.icon}</span>
                  <TextFlipper tracking={'w-1'}>{item.label}</TextFlipper>
                </a>
              ))}
              <p
                ref={(el) => (contactRefs.current[3] = el)}
                className="flex gap-1 items-center p-3 text-sm border text-text/70 bg-text/2 border-text/10"
              >
                🗓 Join date:{' '}
                {new Date(selectedMember.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default TeamMembers
