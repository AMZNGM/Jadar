'use client'

import { useTranslation } from '@/translations/useTranslation'
import { BgNoise } from '@/data/mediaData/svgs'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import SectionHero from '@/components/hero-components/SectionHero'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import OurLegacy from '@/components/OurLegacy.jsx'
import OurApproach from '@/components/OurApproach.jsx'
import BentoCards from '@/components/BentoCards.jsx'
import OurVision from '@/components/OurVision.jsx'

export default function About() {
  const { t } = useTranslation()
  const bgVid = '/videos/homeHero.mp4'
  const mobileImgsrc = ArtboardImgs[8]

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20 bg-bg">
        <BgNoise />
        <SectionHero
          title={t('aboutJadar')}
          bgVidSrc={bgVid}
          mobileImgsrc={mobileImgsrc}
          videoUrl="https://www.youtube.com/embed/jw58xh03aB8?si=bR-9cJ48s8iebkgE"
        />
      </div>

      <Breadcrumb
        pages={[
          { label: t(`home`), path: '/', isActive: false },
          { label: t(`aboutJadar`), path: '/about', isActive: true },
        ]}
      />

      <div className="relative z-20">
        <OurLegacy />
        <OurApproach />
        {/* <BentoCards /> */}
        {/* <OurVision /> */}
      </div>
    </main>
  )
}
