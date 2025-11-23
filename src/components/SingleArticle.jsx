'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BgNoise } from '@/data/mediaData/svgs'
import { ChevronLeft, Share } from 'lucide-react'
import { useTranslation } from '@/translations/useTranslation'
import articlesData from '@/data/articlesData'
import ShuffleText from '@/components/ui/text/ShuffleText'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

export default function SingleArticle({ articleId }) {
  const { t } = useTranslation()
  const currentIndex = articlesData.findIndex((a) => a.id === articleId)
  const prevArticle = currentIndex > 0 ? articlesData[currentIndex - 1] : null
  const nextArticle = currentIndex < articlesData.length - 1 ? articlesData[currentIndex + 1] : null
  const article = useMemo(() => {
    return articlesData.find((a) => a.id === articleId)
  }, [articleId])
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 100),
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied!')
    }
  }

  if (!article) {
    return (
      <main className="relative z-10 min-h-screen bg-bg text-text py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/allNews" className="flex items-center gap-2 text-main hover:text-main/80 mb-8">
            <ChevronLeft size={20} />
            Back to all news
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Article Not Found</h1>
            <p className="text-text/50 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/allNews" className="px-6 py-3 bg-main text-text hover:bg-main/90 transition">
              Return to News
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <article dir="ltr" className="relative w-screen min-h-screen bg-bg text-text pt-48 max-md:pt-34 pb-16 px-4">
      <BgNoise />

      <div className="flex mb-8">
        <MainBtn text="< Back" look="sec" onClick={() => navigate(-1)} className="border-x-0" />
      </div>

      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium uppercase text-main/70">{article.category}</span>
          <span className="text-sm text-text/50">
            {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <ShuffleText text={article.title} tag="h1" className="text-4xl text-main/75" textColors={'#d73b13'} />
        <p className="text-lg text-text/70">{article.description}</p>
      </header>

      {article.image && (
        <div className="relative w-full h-96 max-sm:h-64 mb-12 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 60vw"
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none mb-16">
        <div className="text-base leading-relaxed text-text/80 space-y-6">
          {article.fullArticle ? (
            <div
              dangerouslySetInnerHTML={{ __html: article.fullArticle }}
              className="prose-headings:text-white prose-headings:font-light prose-headings:my-6 prose-p:my-4 prose-ul:my-4 prose-li:my-2 prose-strong:text-main"
            />
          ) : (
            <p>{article.content}</p>
          )}
        </div>
      </div>

      {(prevArticle || nextArticle) && (
        <div className="grid grid-cols-2 gap-8 mt-16 pt-8 border-t border-text/20">
          {prevArticle ? (
            <Link href={`/allNews/${prevArticle.id}`} className="group">
              <p className="text-xs text-text/50 mb-2">← Previous Article</p>
              <h3 className="text-lg font-light group-hover:text-main transition line-clamp-2">{prevArticle.title}</h3>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle ? (
            <Link href={`/allNews/${nextArticle.id}`} className="group text-right">
              <p className="text-xs text-text/50 mb-2">Next Article →</p>
              <h3 className="text-lg font-light group-hover:text-main transition line-clamp-2">{nextArticle.title}</h3>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}

      <div className="flex mt-12">
        <MainBtn text="Share" icon={Share} size="sm" onClick={handleShare} />
      </div>
    </article>
  )
}
