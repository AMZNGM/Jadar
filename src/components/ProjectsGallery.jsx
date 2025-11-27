'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '@/translations/useTranslation'
import { BgNoise, Quadtree } from '@/data/mediaData/svgs'
import { projectsData } from '@/data/projectsData'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import BgVideo from '@/components/ui/BgVideo.jsx'
import ClickEffect from './ui/effects/ClickEffect'

export default function ProjectsGallery() {
  const BgVid = '/videos/bgVideo.mp4'
  const mobileImgsrc = '/images/bgVidCover.webp'
  const { t } = useTranslation()
  const projects = projectsData(t)
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const leftSideRef = useRef(null)
  const rightSideRef = useRef(null)
  const projectRef = useRef(null)
  const [activeProject, setActiveProject] = useState(0)

  useGSAP(() => {
    if (!sectionRef.current || !leftSideRef.current || !rightSideRef.current) return

    // Pin the left side while right side scrolls
    gsap.to(leftSideRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${rightSideRef.current.scrollHeight - window.innerHeight}`,
        pin: leftSideRef.current,
        pinSpacing: true,
        scrub: true,
      },
    })

    // Change active project based on scroll position
    gsap.to(projectRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${rightSideRef.current.scrollHeight - window.innerHeight}`,
        onUpdate: (self) => {
          const progress = self.progress
          const newActiveProject = Math.min(Math.floor(progress * projects.length), projects.length - 1)
          setActiveProject(newActiveProject)
        },
      },
    })
  }, [sectionRef, leftSideRef, rightSideRef, projectRef, projects.length])

  return (
    <section ref={sectionRef} className="relative w-screen bg-bg text-text">
      <div ref={containerRef} className="relative w-screen flex justify-center overflow-hidden">
        <BgVideo src={BgVid} mobileImgsrc={mobileImgsrc} />
        <BgNoise />

        {/* left side */}
        <div
          ref={leftSideRef}
          className="relative w-[45%] h-screen flex flex-col justify-center items-center border-l-8 border-bgb bg-text text-bg text-center font-light leading-relaxed uppercase max-md:hidden"
        >
          <Quadtree className={'size-full absolute inset-0'} />

          {projects.map((project, index) => (
            <ClickEffect
              key={index}
              onClick={() => setActiveProject(index)}
              className={`group relative size-full overflow-hidden border-b border-main hover:bg-main/10 cursor-pointer duration-100 ${
                index === activeProject ? 'bg-main/25 border-s-4 border-main' : ''
              }`}
            >
              <Link href={project.to} className="relative size-full flex items-center justify-center">
                <ShuffleText
                  text={project.title}
                  tag={'h4'}
                  className={`text-3xl max-md:text-2xl p-4 group-hover:scale-101 duration-300 cursor-pointer ${
                    index === activeProject ? 'scale-102' : ''
                  }`}
                />
              </Link>
            </ClickEffect>
          ))}
        </div>

        {/* right side */}
        <div ref={rightSideRef} className="relative w-[55%] max-md:w-full flex flex-col justify-between items-center py-24 px-4">
          <div className="flex flex-col text-center font-light uppercase gap-4 mb-4">
            <ShuffleText text={t('kuwaitProjects')} tag={'h2'} className="text-6xl max-md:text-3xl font-medium" />
            <ShuffleText text={t('kuwaitProjectsDesc')} tag={'p'} className="text-sm text-text/80" />
            <div className="w-48 max-md:w-24 h-0.5 bg-main mx-auto" />
          </div>

          {projects.map((project, index) => (
            <div
              key={index}
              ref={projectRef}
              onClick={() => setActiveProject(index)}
              className={`relative size-full flex flex-col justify-center items-center text-center font-light backdrop-blur-sm border cursor-pointer scale-98 hover:scale-97 duration-300 gap-4 m-4 py-6 max-md:py-4
                          ${
                            index === activeProject ? 'bg-main/20 border-main/50 scale-100' : 'bg-text/10 border-text/20 hover:bg-text/20'
                          }`}
            >
              <div className="relative size-full flex max-md:flex-col-reverse justify-between items-start max-md:items-center gap-4">
                <div />

                <h4 className={`text-4xl max-md:text-xl font-medium duration-300 ${index === activeProject ? 'text-main' : 'text-text'}`}>
                  {project.title}
                </h4>

                <span
                  className={`text-xs text-text/80 duration-300 py-0.5 px-2
                            ${index === activeProject ? 'bg-main/80' : 'bg-text/10'}`}
                >
                  {project.startDate} – {project.endDate}
                </span>
              </div>

              <p
                className={`text-lg max-md:text-sm duration-300
                          ${index === activeProject ? 'text-text' : 'text-text/90'}`}
                dangerouslySetInnerHTML={{ __html: project.mainLine }}
              />

              <p className="size-full text-text/80 text-base max-md:text-xs leading-relaxed bg-main/10 border-l-4 border-main mb-6 p-4">
                {project.desc1}
              </p>

              <div className="relative size-full flex max-md:flex-col justify-between items-center gap-4">
                <MainBtn
                  to={project.to}
                  text="Learn More"
                  size="sm"
                  className={`text-xs text-text/80 border-none duration-300 py-0.5 px-2
                            ${index === activeProject ? 'bg-main/80' : 'bg-text/10'}`}
                />

                {index === activeProject && (
                  <div className="flex justify-center items-center gap-2 text-main text-sm animate-pulse p-3 pb-0">
                    <div className="size-2 bg-main rounded-full" />
                    <span>Active</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="relative w-full flex flex-col justify-center items-center gap-4 text-center font-light bg-main/20 backdrop-blur-sm border border-main/30 hover:border-main/75 duration-300 py-12">
            <h3 className="text-4xl max-md:text-2xl font-semibold">{t(`readyToExploreMore`)}</h3>
            <p className="text-lg max-md:text-sm max-w-4xl">{t(`readyToExploreMoreDesc`)}</p>
            <MainBtn to={'/projects'} text={t(`viewAllProjects`)} className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
