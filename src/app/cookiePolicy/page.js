'use client'

import { useTranslation } from '@/translations/useTranslation'
import { BgNoise } from '@/data/mediaData/svgs'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import SectionHero from '@/components/hero-components/SectionHero'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import CookiesContent from '@/components/CookiesContent.jsx'

export default function CookiePolicy() {
  const { t } = useTranslation()
  const bgVid = '/videos/homeHero.mp4'
  const mobileImgsrc = ArtboardImgs[4]

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20 bg-bg">
        <BgNoise />
        <SectionHero
          title={t('cookiePolicy')}
          bgVidSrc={bgVid}
          mobileImgsrc={mobileImgsrc}
          videoUrl="https://www.youtube.com/embed/jw58xh03aB8?si=bR-9cJ48s8iebkgE"
        />
      </div>

      <Breadcrumb
        pages={[
          { label: t(`home`), path: '/', isActive: false },
          { label: t(`privacyPolicy`), path: '/privacyPolicy', isActive: false },
          { label: t(`termsOfUse`), path: '/termsOfUse', isActive: false },
          { label: t(`cookiePolicy`), path: '/cookiePolicy', isActive: true },
        ]}
      />

      <div className="relative z-20 bg-black">
        <CookiesContent />
      </div>
    </main>
  )
}
