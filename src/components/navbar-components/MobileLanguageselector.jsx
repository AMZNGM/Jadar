import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { ChevronDown, GlobeIcon } from 'lucide-react'
import HoverEffect from '@/components/ui/effects/HoverEffect'

export default function MobileLanguageSelector({
  selectedLanguage,
  handleLanguageChange,
  languageSelectorOpen,
  setLanguageSelectorOpen,
  languages,
}) {
  const menuRef = useRef()

  useGSAP(() => {
    if (!menuRef.current) return
    const menuTimeline = gsap.timeline({ paused: true })
    menuTimeline.fromTo(
      menuRef.current,
      { yPercent: 100, skewX: -10, opacity: 0 },
      {
        yPercent: 0,
        skewX: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      },
      0
    )
    if (languageSelectorOpen) {
      menuTimeline.play()
    } else {
      menuTimeline.reverse()
    }
  }, [languageSelectorOpen])

  return (
    <div className="w-full absolute bottom-0 left-0 bg-bg/20 border-t border-text/15 backdrop-blur-sm">
      <HoverEffect
        onClick={() => setLanguageSelectorOpen(!languageSelectorOpen)}
        className="w-full flex justify-between items-center hover:bg-text/5 cursor-pointer select-none duration-300 py-8 px-6"
      >
        <div className="w-full flex items-center gap-6 font-medium">
          <GlobeIcon strokeWidth={1.8} className="size-5 text-text/60" />
          {selectedLanguage}
        </div>
        <ChevronDown strokeWidth={1.5} className={`size-7 duration-300 ${languageSelectorOpen ? 'rotate-180' : ''}`} />
      </HoverEffect>

      {languageSelectorOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-full left-0 right-0 bg-bg/20 backdrop-blur-xl border border-text/10 rounded-sm shadow-2xl overflow-hidden mb-2 mx-4"
        >
          {languages.map((language, index) => (
            <button
              key={index}
              onClick={() => {
                handleLanguageChange(language)
                setLanguageSelectorOpen(false)
              }}
              className={`relative w-full text-left hover:bg-text/10 cursor-pointer duration-200 px-4 py-3 ${
                selectedLanguage === language.name ? 'text-main bg-main/10' : 'text-text/70 hover:text-text'
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
