'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/translations/useTranslation'
import { ChevronLeft, RefreshCcw } from 'lucide-react'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import ShinyText from '@/components/ui/text/ShinyText'

export default function NotFound() {
  const { t } = useTranslation()
  const imagesArr = Object.values(ArtboardImgs)
  const [bgImg, setBgImg] = useState(null)

  useEffect(() => {
    const randomImg = imagesArr[Math.floor(Math.random() * imagesArr.length)]
    setBgImg(randomImg)
  }, [])

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-bg text-text flex justify-center items-center py-24 px-4 z-50">
      {bgImg && (
        <Image
          src={bgImg}
          alt="background"
          fill
          priority={false}
          placeholder="empty"
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-30"
        />
      )}

      <div className="relative text-center space-y-8 max-w-xl w-full">
        <div className="p-6">
          <ShinyText
            text={'404'}
            aria-label="Error 404"
            textColor="#d73b13"
            className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-main"
          />
          <h2 className="text-main text-2xl sm:text-3xl md:text-4xl font-bold mb-4 animate-bounce">{t('oops')}</h2>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-text/50 leading-relaxed">{t('pageNotFound')}</p>
        </div>

        <div className="flex justify-between items-center size-full">
          <MainBtn onClick={handleGoBack} text={t('goback')} icon={ChevronLeft} iconPosition="left" look="outline" fullWidth />
          <MainBtn onClick={handleRefresh} text={t('refresh')} icon={RefreshCcw} look="outline" fullWidth />
        </div>

        <MainBtn onClick={() => (window.location.href = '/')} text={t('backToHome')} look="outline" fullWidth />

        <div className="mt-12 py-8 border-y border-main">
          <p className="text-text/50 text-base max-md:text-sm">
            {t('stillHavingTrouble')}{' '}
            <a href="mailto:contact@jadar.com" className="text-main hover:underline cursor-pointer">
              {t('contactOurSupportTeam')}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
