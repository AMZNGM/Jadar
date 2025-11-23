import Image from 'next/image'
import { useTranslation } from '@/translations/useTranslation'
import { ArrowRight } from 'lucide-react'
import { BgNoise } from '@/data/mediaData/svgs'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import ScrollText from '@/components/ui/text/ScrollText.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

export default function WorkWithUs() {
  const { t } = useTranslation()
  const cardImg = ArtboardImgs[18]

  return (
    <section className="relative w-screen overflow-hidden bg-bg text-text pb-24 px-4">
      <BgNoise />
      <ScrollText text={t('workWithUs')} />

      <div className="flex flex-col justify-center items-center pt-24">
        <ShuffleText
          text={t('workWithUs')}
          tag="h3"
          className="absolute top-23 max-md:top-27 text-main/75 text-7xl max-md:text-4xl font-light uppercase z-20 cursor-default"
        />

        <div className="size-2/3 max-lg:size-full my-8 space-y-6 space-x-6 z-10">
          <Image src={cardImg} alt="cardImg" className="size-full object-cover" />

          <SplitedText
            text={t('jadarInvestmentOffice')}
            delay={10}
            from={{ opacity: 0, x: 40 }}
            to={{ opacity: 1, x: 0 }}
            className="text-2xl"
          />

          <SplitedText
            text={t('workWithUsDisc')}
            tag="p"
            delay={5}
            from={{ opacity: 0, x: 40 }}
            to={{ opacity: 1, x: 0 }}
            className="text-text/75"
          />

          <div className="flex">
            <MainBtn
              text={t('knowMore')}
              to={'/jadarInvestmentOffice'}
              icon={ArrowRight}
              look="ghost"
              className="px-0! bg-transparent! text-text"
            />
          </div>

          <MainBtn text={t('contactWithUs')} to={'/press'} look="sec" />
        </div>
      </div>
    </section>
  )
}
