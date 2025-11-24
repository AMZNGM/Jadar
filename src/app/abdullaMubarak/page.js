'use client'

import { useTranslation } from '@/translations/useTranslation'
import { BgNoise } from '@/data/mediaData/svgs.jsx'
import { projectsData } from '@/data/projectsData'
import SectionHero from '@/components/hero-components/SectionHero.jsx'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import { AbdullaMubarakHero, AbdullaMubarakHeadline } from '@/components/projects-components/Proj-TextContent.jsx'
import { AbdullaMubarakGridImg } from '@/components/projects-components/Proj-Imgs.jsx'
import ProjMaskedVideo from '@/components/projects-components/Proj-MaskedVideo.jsx'
import ProjPanner from '@/components/projects-components/Proj-Panner.jsx'
import ProjLogo from '@/components/projects-components/Proj-Logo.jsx'
import ProjFooterCards from '@/components/projects-components/Proj-FooterCards.jsx'

export default function AbdullaMubarak() {
  const { t } = useTranslation()
  const project = projectsData(t)
  const thisProject = project[0]
  const nextProject = project[1]

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20 bg-bg">
        <BgNoise />
        <SectionHero
          title={thisProject.title}
          bgVidSrc={thisProject.bgVid}
          mobileImgsrc={thisProject.pannerImg}
          videoUrl={thisProject.bgVidUrl}
          videoclassName={'opacity-50 blur-[3px]'}
        />
      </div>

      <Breadcrumb pages={thisProject.breadcrumb} />

      <div className="relative z-30">
        <AbdullaMubarakHero
          desc1={thisProject.desc1}
          desc2={thisProject.desc2}
          desc3={thisProject.desc3}
          desc4={thisProject.desc4}
          value={thisProject.value}
          startDate={thisProject.startDate}
          endDate={thisProject.endDate}
          status={thisProject.status}
          category={thisProject.category}
          location={thisProject.location}
          mainLine={thisProject.mainLine}
        />
      </div>

      <div className="relative z-50">
        <ProjMaskedVideo
          maskedVid={thisProject.projVid}
          maskedVidUrl={thisProject.maskedVidUrl}
          logoName={thisProject.logoName}
          projectName={thisProject.name}
        />
        <BgNoise />

        <AbdullaMubarakHeadline headLine={thisProject.headLine} />
        <ProjPanner imgSrc={thisProject.pannerImg} logoName={thisProject.logoName} logoLink={thisProject.projectUrl} />
        <ProjLogo logoName={thisProject.logoName} logoLink={thisProject.companyUrl} />
        <AbdullaMubarakGridImg images={thisProject.images} />
        <ProjFooterCards
          look={'dark'}
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
        />
      </div>
    </main>
  )
}
