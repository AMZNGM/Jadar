'use client'

import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import { BgNoise } from '@/data/mediaData/svgs'
import SectionHero from '@/components/hero-components/SectionHero.jsx'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import OurMessage from '@/components/OurMessage.jsx'
import FloatingReports from '@/components/FloatingReports'
import ReportsCards from '@/components/ReportsCards.jsx'

export default function SocialResponsibility() {
  const { t } = useTranslation()
  const bgVid = '/videos/homeHero.mp4'
  const mobileImgsrc = ArtboardImgs[15]

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20 bg-bg">
        <BgNoise />
        <SectionHero
          title={t('socialResponsibility')}
          bgVidSrc={bgVid}
          mobileImgsrc={mobileImgsrc}
          videoUrl="https://www.youtube.com/embed/jw58xh03aB8?si=bR-9cJ48s8iebkgE"
        />
      </div>

      <Breadcrumb
        pages={[
          { label: t('home'), path: '/', isActive: false },
          { label: t('about'), path: '/about', isActive: false },
          {
            label: t('socialResponsibility'),
            path: '/socialResponsibility',
            isActive: true,
          },
        ]}
      />

      <div className="relative z-30">
        <OurMessage />
        <FloatingReports />
        <ReportsCards />
      </div>
    </main>
  )
}
