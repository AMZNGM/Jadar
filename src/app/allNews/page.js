'use client'

import dynamic from 'next/dynamic'
import { useTranslation } from '@/translations/useTranslation'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'
import News from '@/components/News.jsx'
import Newsletter from '@/components/Newsletter.jsx'

export default function AllNews() {
  const { t } = useTranslation()
  const Gallery3d = dynamic(() => import('@/components/Gallery3d.jsx'), { ssr: false })

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20">
        <Gallery3d />
      </div>

      <Breadcrumb
        pages={[
          { label: t(`home`), path: '/', isActive: false },
          {
            label: t(`allNews`),
            path: '/allNews',
            isActive: true,
          },
        ]}
      />

      <div className="relative z-20">
        <News />
        {/* <Newsletter /> */}
      </div>
    </main>
  )
}
