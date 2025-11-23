'use client'

import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import { BgNoise } from '@/data/mediaData/svgs'
import { getWorkWithJadarFaqs } from '@/data/FAQ.js'
import SectionHero from '@/components/hero-components/SectionHero.jsx'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import JadarWorkSpace from '@/components/jadarWorkSpace.jsx'
import FAQ from '@/components/FAQ.jsx'
import Newsletter from '@/components/Newsletter.jsx'

export default function WorkAtJadar() {
  const { t } = useTranslation()
  const workWithJadarFaqs = getWorkWithJadarFaqs(t)
  const bgVid = '/videos/homeHero.mp4'
  const mobileImgsrc = ArtboardImgs[18]

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20 bg-bg">
        <BgNoise />
        <SectionHero
          title={t('workAtJadar')}
          bgVidSrc={bgVid}
          mobileImgsrc={mobileImgsrc}
          videoUrl="https://www.youtube.com/embed/jw58xh03aB8?si=bR-9cJ48s8iebkgE"
        />
      </div>

      <Breadcrumb
        pages={[
          { label: t('home'), path: '/', isActive: false },
          {
            label: t('investInJadar'),
            path: '/investInJadar',
            isActive: false,
          },
          {
            label: t('workAtJadar'),
            path: '/workAtJadar',
            isActive: true,
          },
        ]}
      />

      <div className="relative z-20">
        <JadarWorkSpace />
        <FAQ faqs={workWithJadarFaqs} title={t('faq')} />
        <Newsletter />
      </div>
    </main>
  )
}
