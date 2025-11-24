'use client'

import { useTranslation } from '@/translations/useTranslation'
import { BgNoise } from '@/data/mediaData/svgs.jsx'
import { projectsData } from '@/data/projectsData'
import SectionHero from '@/components/hero-components/SectionHero.jsx'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import { EastSabahHeadline, EastSabahHero } from '@/components/projects-components/Proj-TextContent.jsx'
import ProjVideo from '@/components/projects-components/Proj-Video.jsx'
import EastSabahCarousel from '@/components/projects-components/EastSabah-Carousel.jsx'
import ProjFooterCards from '@/components/projects-components/Proj-FooterCards.jsx'

export default function EastSabah() {
  const { t } = useTranslation()
  const project = projectsData(t)
  const thisProject = project[1]
  const nextProject = project[2]

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20 bg-bg">
        <BgNoise />
        <SectionHero
          title={thisProject.title}
          bgVidSrc={thisProject.bgVid}
          mobileImgsrc={thisProject.images[2]}
          videoUrl={thisProject.bgVidUrl}
          videoclassName={'opacity-50 blur-[3px]'}
        />
      </div>

      <Breadcrumb pages={thisProject.breadcrumb} />

      <div className="relative z-20">
        <EastSabahHero
          desc1={thisProject.desc1}
          desc2={thisProject.desc2}
          desc3={thisProject.desc3}
          value={thisProject.value}
          startDate={thisProject.startDate}
          endDate={thisProject.endDate}
          status={thisProject.status}
          category={thisProject.category}
          location={thisProject.location}
          mainLine={thisProject.mainLine}
        />
        <EastSabahHeadline headLine={thisProject.headLine} />
      </div>

      <div className="relative z-50">
        {/* <ProjVideo videoSrc={thisProject.projVid} videoUrl={thisProject.projectUrl} logoName={thisProject.logoName} /> */}
        {/* <EastSabahCarousel /> */}
        {/* <ProjFooterCards
          look={'dark'}
          bgCards={[
            {
              type: 'text',
              title: nextProject.title,
              location: nextProject.location,
            },
            {
              type: 'image',
              title: t('offerForCollaboration'),
              imageSrc: thisProject.fotterImg,
              location: t('page'),
            },
          ]}
          floatingCards={[
            {
              overview: [
                { label: t(`projectValue`), value: nextProject.value, highlight: true },
                { label: t(`startDate`), value: nextProject.startDate },
                { label: t('endDate'), value: nextProject.endDate },
                { label: t('status'), value: nextProject.status },
              ],
              to: nextProject.to,
            },
            {
              circularText: t('offerForCollaboration'),
              to: '/alMutlaa',
            },
          ]}
        /> */}
      </div>
    </main>
  )
}
