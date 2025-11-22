'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { BgNoise } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import articlesData from '@/data/articlesData'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import ScrollText from '@/components/ui/text/ScrollText.jsx'
import NewsCard from '@/components/ui/NewsCard.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination'

const News = () => {
  const { t } = useTranslation()
  const articlesPerPage = 12
  const categories = ['All', 'Hospitality', 'Building', 'Community']
  const buttonsRef = useRef({})
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const filteredArticles = useMemo(() => {
    return category === 'All' ? articlesData : articlesData.filter((a) => a.category === category)
  }, [category])
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const currentArticles = filteredArticles.slice((page - 1) * articlesPerPage, page * articlesPerPage)

  useEffect(() => {
    const activeButton = buttonsRef.current[category]
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1,
      })
    }
  }, [category])

  return (
    <section className="relative w-screen overflow-hidden bg-bg text-text py-24 max-md:py-12 px-4">
      <BgNoise />
      <ScrollText text={t('allNews')} />

      <div className="flex max-md:flex-col justify-between items-center mb-16 max-md:mb-12">
        <ShuffleText text={t('allNews')} className="text-4xl font-light uppercase text-main" />

        <div className="relative flex flex-wrap gap-3 items-center max-md:mt-4 z-50">
          {/* filter */}
          {categories.map((cat) => (
            <div key={cat} className="relative" ref={(el) => (buttonsRef.current[cat] = el)}>
              <MainBtn
                text={cat}
                onClick={() => {
                  setCategory(cat)
                  setPage(1)
                }}
                size="sm"
                className={
                  category === cat
                    ? 'bg-main text-text! hover:bg-main/90 relative z-10'
                    : 'bg-text/60 text-bg! hover:bg-main/10 hover:text-text! relative z-10'
                }
              />
            </div>
          ))}

          {/* indicator */}
          <div
            className="absolute -bottom-4 duration-300 ease-out z-0"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
            }}
          >
            <svg width="100%" height="8" viewBox="0 0 100 8" fill="none">
              <line x1="0" y1="4" x2="100" y2="4" stroke="currentColor" strokeWidth="3" className="text-main" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {currentArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage(page - 1)}
                className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink onClick={() => setPage(pageNum)} isActive={pageNum === page}>
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => page < totalPages && setPage(page + 1)}
                className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  )
}

export default News
