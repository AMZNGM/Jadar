'use client'

import { useTranslation } from '@/translations/useTranslation'
import { BgNoise } from '@/data/mediaData/svgs.jsx'
import { projectsData } from '@/data/projectsData'
import SectionHero from '@/components/hero-components/SectionHero.jsx'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import { LevelsTowerHero, LevelsTowerHeadline } from '@/components/projects-components/Proj-TextContent.jsx'
import { LevelsTowerGridImg } from '@/components/projects-components/Proj-Imgs.jsx'
import ProjVideo from '@/components/projects-components/Proj-Video.jsx'
import ProjLogo from '@/components/projects-components/Proj-Logo.jsx'
import ProjPanner from '@/components/projects-components/Proj-Panner.jsx'
import ProjFooterCards from '@/components/projects-components/Proj-FooterCards.jsx'

export default function LevelsTower() {
  const { t } = useTranslation()
  const project = projectsData(t)
  const thisProject = project[3]
  const nextProject = project[0]

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
        <LevelsTowerHero desc1={thisProject.desc1} desc2={thisProject.desc2} mainLine={thisProject.mainLine} images={thisProject.images} />
        {/* <LevelsTowerGridImg images={thisProject.images} /> */}
        {/* <LevelsTowerHeadline headLine={thisProject.headLine} /> */}
        {/* <ProjVideo
          videoSrc={thisProject.projVid}
          videoUrl={thisProject.logoVidUrl}
          logoName={thisProject.logoName}
          className={'bg-text p-4'}
        /> */}
        {/* <ProjLogo logoName={thisProject.logoName} logoLink={thisProject.projectUrl} look={'dark'} /> */}
        {/* <ProjPanner
          imgSrc={thisProject.pannerImg}
          logoName={thisProject.logoName}
          logoLink={thisProject.companyUrl}
          className={'bg-text'}
        /> */}
        {/* <ProjFooterCards
          look={'light'}
          bgCards={[
            {
              type: 'text',
              title: nextProject.title,
              location: nextProject.location,
            },
            {
              type: 'image',
              title: t('workAtJadar'),
              imageSrc: thisProject.fotterImg,
              location: t('page'),
            },
          ]}
          floatingCards={[
            {
              overview: [
                { label: t('projectValue'), value: nextProject.value, highlight: true },
                { label: t('startDate'), value: nextProject.startDate },
                { label: t('endDate'), value: nextProject.endDate },
                { label: t('status'), value: nextProject.status },
              ],
              to: nextProject.to,
            },
            {
              circularText: t('knowMoreAboutWorkingAtJadar'),
              to: '/workAtJadar',
            },
          ]}
        /> */}
      </div>
    </main>
  )
}
