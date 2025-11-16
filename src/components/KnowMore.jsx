import { BgNoise } from '@/data/mediaData/svgs'
import { ShareBtn } from '@/components/ui/buttons/ShareBtn.jsx'
import { useTranslation } from '@/translations/useTranslation'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import QrCode from '@/assets/images/QRCode.webp'

const KnowMore = () => {
  const { t } = useTranslation()

  return (
    <section dir="ltr" className="relative w-screen bg-black text-text pt-12 px-4 ltr:text-left rtl:text-right">
      <BgNoise />

      <ParallaxElement
        speed={2.6}
        direction="opacity"
        className="flex max-md:flex-col justify-between max-md:justify-center items-center size-full gap-4"
      >
        <ParallaxElement className="relative max-w-md text-lg font-light max-md:text-center">
          <ShuffleText text={t(`knowMoreAboutJadar`)} tag="h4" delay={40} />
          <ShuffleText text={t(`knowMoreAboutJadarDesc`)} tag="p" delay={5} className="text-text/50 leading-5!" />
        </ParallaxElement>

        <ParallaxElement speed={0.2} className="flex justify-center items-center max-md:hidden">
          <ShareBtn className="lg:translate-x-22 hover:scale-95 duration-300 z-10" />
          <div className="relative size-full max-[861px]:hidden">
            <img src={QrCode} alt="QRCode" loading="lazy" className="size-55 object-cover hover:scale-95 duration-300 cursor-grabbing" />
          </div>
        </ParallaxElement>
      </ParallaxElement>
    </section>
  )
}

export default KnowMore
