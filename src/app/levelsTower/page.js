'use client'

import { BgNoise } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import Breadcrumb from '@/components/ui/Breadcrumb.jsx'

export default function LevelsTower() {
  const { t } = useTranslation()

  return (
    <main className="relative z-10">
      <div className="sticky top-0 z-20">
        <BgNoise />
      </div>

      <Breadcrumb
        pages={[
          { label: t('home'), path: '/', isActive: false },
          { label: t('projects'), path: '/projects', isActive: false },
          { label: t('levelsTower'), path: '/levelsTower', isActive: true },
        ]}
      />

      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light mb-6">{t('levelsTower')}</h1>
          <p className="text-text/70">This is the project page for Levels Tower. Replace with real content.</p>
        </div>
      </section>
    </main>
  )
}
