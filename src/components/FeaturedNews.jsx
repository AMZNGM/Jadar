'use client'

import { useMemo } from 'react'
import { useTranslation } from '@/translations/useTranslation'
import { ArrowRightIcon } from 'lucide-react'
import { BgNoise } from '@/data/mediaData/svgs'
import articlesData from '@/data/articlesData'
import ScrollText from '@/components/ui/text/ScrollText.jsx'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import NewsCard from '@/components/ui/NewsCard.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

export default function FeaturedNews({}) {
  const { t } = useTranslation()
  const randomArticles = useMemo(() => {
    return [...articlesData].sort(() => Math.random() - 0.5).slice(0, 4)
  }, [])

  return (
    <section className="relative w-screen overflow-hidden bg-bg text-text">
      <BgNoise />

      <div className="relative size-full z-0">
        <ScrollText text={t(`featuredNews`)} />

        <div className="relative size-full flex flex-col gap-12 max-md:gap-4 px-4 py-16 max-md:pt-4 z-10">
          <SplitedText
            text={t(`featuredNewsDesc`)}
            delay={15}
            className="text-4xl max-md:text-lg font-light text-center uppercase text-text/75"
          />

          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
            {randomArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          <MainBtn to="/allNews" text={t(`exploreMore`)} icon={ArrowRightIcon} size="md" look="sec" />
        </div>
      </div>
    </section>
  )
}
