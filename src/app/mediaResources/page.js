'use client'

import { useTranslation } from '@/translations/useTranslation'
import FloatingReports from '@/components/FloatingReports'
import ReportsCards from '@/components/ReportsCards.jsx'
import Newsletter from '@/components/Newsletter.jsx'
import FeaturedNews from '@/components/FeaturedNews.jsx'

export default function MediaResources() {
  const { t } = useTranslation()

  return (
    <main className="relative z-10">
      <FloatingReports />
      <ReportsCards />
      <Newsletter />
      <FeaturedNews />
    </main>
  )
}
