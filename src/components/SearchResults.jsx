'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { BgNoise, DiagonalLines, MovingBorders } from '@/data/mediaData/svgs.jsx'
import { useTranslation } from '@/translations/useTranslation'
import useSearchIndex from '@/data/searchIndex'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import ShinyText from '@/components/ui/text/ShinyText.jsx'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import { ChevronRight } from 'lucide-react'

export default function SearchResults() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase().trim() || ''

  const searchIndex = useSearchIndex()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [query])

  const results = useMemo(() => {
    if (!query) return []

    return searchIndex.filter((item) => {
      const title = item.title?.toLowerCase() || ''
      const desc = item.desc?.toLowerCase() || ''
      const type = item.type?.toLowerCase() || ''
      const category = item.category?.toLowerCase() || ''

      return title.includes(query) || desc.includes(query) || type.includes(query) || category.includes(query)
    })
  }, [query, searchIndex])

  if (isLoading) {
    return (
      <section className="relative w-screen min-h-screen overflow-hidden bg-bg text-text pt-44 max-lg:pt-34 pb-24 px-4 flex justify-center items-center">
        <BgNoise />
        <ShinyText text={t('Searching')} className="text-4xl" />
      </section>
    )
  }

  return (
    <section className="relative w-screen min-h-screen overflow-hidden bg-bg text-text pt-44 max-lg:pt-34 pb-24 px-4">
      <BgNoise />

      <div className="max-w-6xl mx-auto">
        {query && (
          <div className="flex max-lg:flex-col justify-between gap-4 mb-8">
            <div className="flex max-md:flex-col items-center max-md:items-start gap-2 text-3xl font-light mb-2">
              <ShinyText text={t('searchResultsFor')} />
              <span className="text-main">"{query}"</span>
            </div>

            <span className="text-text/50 text-sm">
              ({results.length} {results.length === 1 ? t('result') : t('results')})
            </span>
          </div>
        )}

        {!query ? (
          <div className="text-center py-16 bg-main/5 border border-main/30">
            <SplitedText text={t('enterAsearch')} tag="p" className="text-text/50 text-xl" />
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results.map((item, index) => (
              <SearchResultItem key={`${item.type}-${index}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <SplitedText
              text={`No results found for "${query}", Try different keywords or browse our categories.`}
              tag="p"
              className="text-text/50 text-lg"
            />

            <div className="flex justify-center items-center mt-8">
              <MainBtn text="Browse All News" icon={ChevronRight} to="/allNews" look="ghost" className="inline-flex items-center" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

const SearchResultItem = React.memo(
  ({ item }) => (
    <div className="group relative overflow-hidden bg-bg border border-main/30 hover:border-main/50 hover:shadow-lg shadow-main/30 duration-300 cursor-pointer p-1">
      <Link href={item.to || '#'} className="z-10 block hover:bg-main/3">
        <DiagonalLines className="opacity-0 group-hover:opacity-100 duration-300 -z-10" />
        <MovingBorders className="opacity-0 group-hover:opacity-100 duration-300" />

        <div className="flex max-md:flex-col">
          {item.image && (
            <div className="md:w-64 md:min-w-64 h-48 overflow-hidden relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="256px"
                className="object-cover group-hover:scale-105 duration-500"
                loading="eager"
              />
            </div>
          )}

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-light pr-4">{item.title}</h2>

                {item.date && (
                  <div className="text-xs text-text/50">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-main bg-main/10 px-2 py-1 rounded-full whitespace-nowrap">{item.type}</span>
                {item.category && <span className="text-xs text-text/50 bg-text/10 px-2 py-1 rounded-full">{item.category}</span>}
              </div>
            </div>

            <p className="text-sm text-text/70 mb-4 line-clamp-2">{item.desc}</p>

            <div className="flex justify-between items-center">
              <span className="text-main group-hover:underline flex items-center text-sm">
                View {item.type === 'Article' ? 'Article' : 'Page'}
                <ChevronRight className="ml-1" />
              </span>

              {item.readTime && <span className="text-xs text-text/40">{item.readTime} read</span>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  ),
  (prevProps, nextProps) => JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item)
)
