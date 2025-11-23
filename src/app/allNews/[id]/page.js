'use client'

import { useParams } from 'next/navigation'
import SingleArticle from '@/components/SingleArticle'

export default function ArticlePage() {
  const params = useParams()
  const articleId = parseInt(params.id, 10)

  return <SingleArticle articleId={articleId} preloadedImage={null} />
}
