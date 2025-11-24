'use client'

import { useTranslation } from '@/translations/useTranslation'
import { BgNoise } from '@/data/mediaData/svgs.jsx'
import { projectsData } from '@/data/projectsData'
import SectionHero from '@/components/hero-components/SectionHero.jsx'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import { AlMutlaaHero, AlMutlaaHeadline } from '@/components/projects-components/Proj-TextContent.jsx'
import ProjPanner from '@/components/projects-components/Proj-Panner.jsx'
import ProjLogo from '@/components/projects-components/Proj-Logo.jsx'
import ProjFooterCards from '@/components/projects-components/Proj-FooterCards.jsx'

export default function AlMutlaa() {
  const { t } = useTranslation()
  const project = projectsData(t)
  const thisProject = project[2]
  const nextProject = project[3]

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

      <div className="relative z-20">
        <AlMutlaaHeadline headLine={thisProject.headLine} />
        <AlMutlaaHero
          desc1={thisProject.desc1}
          desc2={thisProject.desc2}
          desc3={thisProject.desc3}
          desc4={thisProject.desc4}
          value={thisProject.value}
          startDate={thisProject.startDate}
          endDate={thisProject.endDate}
          mainLine={thisProject.mainLine}
          images={thisProject.images}
        />
        <ProjPanner imgSrc={thisProject.pannerImg} logoName={thisProject.logoName} logoLink={thisProject.projectUrl} />
        <ProjLogo logoName={thisProject.logoName} logoLink={thisProject.companyUrl} />
        {/* <ProjFooterCards
          look={'dark'}
          bgCards={[
            {
              type: 'image',
              title: t('workAtJadar'),
              imageSrc: thisProject.fotterImg,
              location: t('page'),
            },
            {
              type: 'text',
              title: nextProject.title,
              location: nextProject.location,
            },
          ]}
          floatingCards={[
            {
              circularText: t('knowMoreAboutWorkingAtJadar'),
              to: '/workAtJadar',
            },
            {
              overview: [
                { label: t(`projectValue`), value: nextProject.value, highlight: true },
                { label: t(`startDate`), value: nextProject.startDate },
                { label: t('endDate'), value: nextProject.endDate },
                { label: t('status'), value: nextProject.status },
              ],
              to: nextProject.to,
            },
          ]}
        /> */}
      </div>
    </main>
  )
}
