'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/translations/useTranslation'
import { projectsData } from '@/data/projectsData'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import FloatingEffect from '@/components/ui/effects/FloatingEffect.jsx'
import SpotlightContainer from '@/components/ui/effects/SpotlightContainer.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

export default function ExpandingPanels() {
  const { t } = useTranslation()
  const projects = projectsData(t)
  const panelRefs = useRef([])
  const titleRefs = useRef([])
  const textRefs = useRef([])
  const imgWrapperRefs = useRef([])
  const [activeImage, setActiveImage] = useState(null)

  useGSAP(() => {
    panelRefs.current.forEach((el, i) => {
      if (el) {
        if (i === activeImage) {
          // expand
          gsap.to(el, {
            width: '80vh',
            height: '100vh',
            duration: 0.6,
            ease: 'power3.out',
          })
          gsap.to(titleRefs.current[i], {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
          gsap.to(textRefs.current[i], {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
          gsap.to(imgWrapperRefs.current[i], {
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
          })
        } else {
          // collapse
          gsap.to(el, {
            width: '5rem',
            height: '100vh',
            duration: 0.6,
            ease: 'power3.inOut',
          })
          gsap.to(titleRefs.current[i], {
            opacity: 0.5,
            duration: 0.3,
            ease: 'power2.in',
          })
          gsap.to(textRefs.current[i], {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          })
          gsap.to(imgWrapperRefs.current[i], {
            opacity: 0,
            duration: 0.4,
            ease: 'power3.in',
          })
        }
      }
    })
  }, [activeImage])

  return (
    <div dir="ltr" className="relative w-screen h-screen overflow-hidden bg-bg text-text">
      <Image
        src={ArtboardImgs[0]}
        alt="background Image"
        fill
        loading="eager"
        className="absolute inset-0 object-cover pointer-events-none"
      />

      <div className="absolute top-12 left-0 z-10 max-md:w-full">
        <MainBtn
          onClick={() => window.history.back()}
          text={t(`back`)}
          look="outline"
          className="text-text! border-text! border-x-0 max-md:w-full"
        />
      </div>

      <div className="relative size-full flex justify-end items-end max-sm:items-center">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (panelRefs.current[index] = el)}
            onClick={() => setActiveImage(index)}
            onMouseEnter={() => setActiveImage(index)}
            onMouseLeave={() => setActiveImage(null)}
            className="relative size-full bg-bg/95 border-x border-text/30 cursor-pointer"
          >
            <SpotlightContainer spotlightColor="#ededed" className="relative size-full flex flex-col justify-between items-center">
              <Link href={project.to} ref={(el) => (imgWrapperRefs.current[index] = el)} className="relative size-full p-4">
                <FloatingEffect className="relative size-full">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    loading="lazy"
                    className="relative w-full h-45 object-cover rounded-xl"
                  />
                </FloatingEffect>
              </Link>

              <div ref={(el) => (textRefs.current[index] = el)} className="flex justify-center items-center py-2 px-4">
                <span className="text-xl font-light tracking-wide">
                  {project.startDate} : {project.endDate}
                </span>
              </div>

              <div ref={(el) => (titleRefs.current[index] = el)} className="flex justify-center items-end py-8 px-4">
                <span className="font-semibold">{project.id}</span>
                <Link href={project.to}>
                  <h2 className="text-3xl font-light rotate-180 [writing-mode:vertical-rl]">{project.title}</h2>
                </Link>
              </div>
            </SpotlightContainer>
          </div>
        ))}
      </div>
    </div>
  )
}
