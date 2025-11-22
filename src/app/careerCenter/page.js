'use client'

import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import { BgNoise } from '@/data/mediaData/svgs'
import SectionHero from '@/components/hero-components/SectionHero.jsx'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
// import CareerCenterHeader from '@/components/CareerCenterHeader.jsx'
// import JobsAtJadar from '@/components/JobsAtJadar.jsx'

const CareerCenter = () => {
  const { t } = useTranslation()
  const bgVid = '/videos/homeHero.mp4'
  const mobileImgsrc = ArtboardImgs[12]

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20 bg-bg">
        <BgNoise />
        <SectionHero
          title={t('leadership')}
          bgVidSrc={bgVid}
          mobileImgsrc={mobileImgsrc}
          videoUrl="https://www.youtube.com/embed/jw58xh03aB8?si=bR-9cJ48s8iebkgE"
        />
      </div>

      <Breadcrumb
        pages={[
          { label: t(`home`), path: '/', isActive: false },
          {
            label: t(`workAtJadar`),
            path: '/workAtJadar',
            isActive: false,
          },
          {
            label: t(`careerCenter`),
            path: '/careerCenter',
            isActive: true,
          },
        ]}
      />

      {/* <div className="relative z-20">
        <CareerCenterHeader />
      </div> */}

      {/* <div className="relative z-500">
        <JobsAtJadar />
      </div> */}
    </main>
  )
}

export default CareerCenter
