import { ArrowLeft } from 'lucide-react'
import { useTranslation } from '@/translations/useTranslation'

const FixedLeftMenu = ({ scrollProgress, isVisible }) => {
  const { t } = useTranslation()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <section
      id="left-menu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed left-0 top-0 w-14 h-full flex flex-col justify-between items-center transition-all duration-500 ease-out z-50 backdrop-blur-xl max-md:hidden
                  ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group flex justify-center items-center cursor-pointer w-full py-12 duration-300"
      >
        <ArrowLeft className="rotate-270 size-8 text-text/50 group-hover:text-main duration-300" />
      </button>

      <h2 className="text-2xl whitespace-nowrap font-light -rotate-90 uppercase tracking-[0.3em] duration-300">{t('ourPartners')}</h2>

      <button
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        className="group flex justify-center items-center cursor-pointer w-full py-12 duration-300"
      >
        <ArrowLeft className="rotate-90! size-8 text-text/50 group-hover:text-main duration-300" />
      </button>

      <div id="progress-bar" className="fixed top-0 left-[3.3rem] h-full w-1 z-50 overflow-hidden transition-all duration-300">
        <div className="w-full h-full bg-bg/30" />
        <div
          role="progressbar"
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={scrollProgress}
          style={{ transform: `scaleY(${scrollProgress / 100})` }}
          className="absolute top-0 left-0 w-full h-full bg-main transition-transform duration-100 ease-linear will-change-transform origin-top"
        />
      </div>
    </section>
  )
}

export default FixedLeftMenu
