'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { useTranslation } from '@/translations/useTranslation'
import { BgNoise } from '@/data/mediaData/svgs'
import SectionHero from '@/components/hero-components/SectionHero.jsx'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import TeamMembers from '@/components/team-members-components/TeamMembers.jsx'
import Newsletter from '@/components/Newsletter.jsx'
const FeaturedNews = dynamic(() => import('@/components/FeaturedNews'), { ssr: false })

export default function Leadership() {
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
          { label: t(`aboutJadar`), path: '/about', isActive: false },
          { label: t(`leadership`), path: '/leadership', isActive: true },
        ]}
      />

      <div className="relative z-20">
        <TeamMembers />
        {/* <Suspense fallback={<div>Loading...</div>}>
          <Newsletter />
        </Suspense>
        <FeaturedNews /> */}
      </div>
    </main>
  )
}
