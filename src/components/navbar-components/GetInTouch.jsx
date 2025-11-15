import { DiagonalLines } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import HoverEffect from '@/components/ui/effects/HoverEffect'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

export default function GetInTouch({ scrolled100vh }) {
  const { t } = useTranslation()

  return (
    <HoverEffect to="/getInTouch" className="group">
      <MainBtn
        text={t('getInTouch')}
        size="sm"
        look="ghost"
        className={`size-full tracking-wider text-text! hover:bg-transparent! z-10 ${scrolled100vh ? 'py-6' : 'py-15'}`}
      />
      <DiagonalLines className="text-text group-hover:text-main duration-500" strokeWidth="2" />
    </HoverEffect>
  )
}
