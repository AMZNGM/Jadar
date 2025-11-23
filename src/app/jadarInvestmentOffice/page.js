'use client'

import { useTranslation } from '@/translations/useTranslation'
import { BgNoise } from '@/data/mediaData/svgs'
import { getInvestmentFaqs } from '@/data/FAQ.js'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import SectionHero from '@/components/hero-components/SectionHero'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import SectionHeader from '@/components/SectionHeader'
import FAQ from '@/components/FAQ.jsx'
import OurPotential from '@/components/OurPotential.jsx'
import FeaturedNews from '@/components/FeaturedNews.jsx'

export default function JadarInvestmentOffice() {
  const { t } = useTranslation()
  const investmentFaqs = getInvestmentFaqs(t)
  const bgVid = '/videos/homeHero.mp4'
  const mobileImgsrc = ArtboardImgs[2]

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20 bg-bg">
        <BgNoise />
        <SectionHero
          title={t('jadarInvestmentOffice')}
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
            isActive: false,
          },
          {
            label: t(`jadarInvestmentOffice`),
            path: '/jadarInvestmentOffice',
            isActive: true,
          },
        ]}
      />

      <div className="relative z-20">
        <SectionHeader title={t(`ourInvestmentOffice`)} para={t(`ourInvestmentOfficePara`)} />
        <FAQ faqs={investmentFaqs} title={t(`faq`)} />
        <OurPotential />
        {/* <FeaturedNews /> */}
      </div>
    </main>
  )
}
