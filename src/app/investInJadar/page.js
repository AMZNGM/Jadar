'use client'

import { useTranslation } from '@/translations/useTranslation'
import { BgNoise } from '@/data/mediaData/svgs'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import SectionHero from '@/components/hero-components/SectionHero'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import SectionHeader from '@/components/SectionHeader.jsx'
import OurProposition from '@/components/OurProposition.jsx'
import WorkWithUs from '@/components/WorkWithUs.jsx'
import MapSection from '@/components/MapSection'
import FeaturedNews from '@/components/FeaturedNews.jsx'

export default function InvestInJadar() {
  const { t } = useTranslation()
  const bgVid = '/videos/homeHero.mp4'
  const mobileImgsrc = ArtboardImgs[10]

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20 bg-bg">
        <BgNoise />
        <SectionHero
          title={t('investInJadar')}
          bgVidSrc={bgVid}
          mobileImgsrc={mobileImgsrc}
          videoUrl="https://www.youtube.com/embed/jw58xh03aB8?si=bR-9cJ48s8iebkgE"
        />
      </div>

      <Breadcrumb
        pages={[
          { label: t(`home`), path: '/', isActive: false },
          {
            label: t(`investInJadar`),
            path: '/investInJadar',
            isActive: true,
          },
        ]}
      />

      <div className="relative z-20">
        <SectionHeader title={t(`openForBusiness`)} para={t(`openForBusinessPara`)} />
        <OurProposition />
        <WorkWithUs />
        <MapSection />
        <FeaturedNews />
      </div>
    </main>
  )
}
