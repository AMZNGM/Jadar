'use client'

import Link from 'next/link'
import Image from 'next/image'
import { memo } from 'react'
import { MousePointerClick } from 'lucide-react'
import { DiagonalLines, MovingBorders } from '@/data/mediaData/svgs'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'
import ClickEffect from '@/components/ui/effects/ClickEffect.jsx'

export default memo(function NewsCard({ article }) {
  return (
    <ParallaxElement speed={3} mobileSpeed={2} direction="opacity" className="relative h-full">
      <ClickEffect className="h-full duration-300 group hover:shadow-lg shadow-main/30 hover:-translate-y-2">
        <div className="opacity-0 duration-300 group-hover:opacity-100">
          <MovingBorders />
          <DiagonalLines />
        </div>

        <Link
          dir="ltr"
          href={`/allNews/${article.id}`}
          aria-label={`Read more about ${article.title}`}
          className="overflow-hidden relative p-2 h-full border duration-300 cursor-pointer group border-main/25 hover:bg-main/5 flex flex-col"
        >
          <div className="overflow-hidden relative h-48">
            <ParallaxElement direction="scale">
              <Image
                src={article.image}
                alt={article.title}
                loading="lazy"
                className="object-cover transition-transform duration-500 size-full group-hover:scale-105"
              />
            </ParallaxElement>

            <div className="absolute inset-0 transition-colors bg-black/20 group-hover:bg-black/50">
              <span className="flex gap-1 justify-center items-center opacity-0 duration-500 size-full group-hover:opacity-100">
                <MousePointerClick /> See more
              </span>
            </div>
          </div>

          <div className="py-2 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium uppercase text-main/70">{article.category}</span>
              <span className="text-xs text-text/50">{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <h4 className="mb-2 text-xl duration-300 group-hover:text-main">{article.title}</h4>
            <p className="text-sm text-text/50 line-clamp-3">{article.description}</p>
          </div>
        </Link>
      </ClickEffect>
    </ParallaxElement>
  )
})
