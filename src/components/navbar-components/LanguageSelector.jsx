import { ChevronDown } from 'lucide-react'
import HoverEffect from '@/components/ui/effects/HoverEffect'
import TextFlipper from '@/components/ui/text/TextFlipper'

export default function LanguageSelector({
  languages,
  selectedLanguage,
  handleLanguageChange,
  languageSelectorOpen,
  setLanguageSelectorOpen,
}) {
  return (
    <div className="relative h-full max-lg:hidden">
      <div onClick={() => setLanguageSelectorOpen(!languageSelectorOpen)} className="relative h-full">
        <HoverEffect className="relative h-full flex justify-center items-center cursor-pointer gap-1 p-4">
          <TextFlipper className={'z-10'}>{selectedLanguage}</TextFlipper>
          <ChevronDown strokeWidth={1.5} className={`size-4 ${languageSelectorOpen ? 'rotate-180' : ''} duration-300`} />
        </HoverEffect>
      </div>

      <div
        className={`absolute top-full left-0 right-0 bg-bg/75 border border-text/5 backdrop-blur-xl shadow-2xl rounded-sm overflow-hidden duration-300 z-50
            ${languageSelectorOpen ? 'opacity-100 translate-y-1 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        {languages.map((language, index) => (
          <button
            key={index}
            onClick={() => {
              handleLanguageChange(language)
              setLanguageSelectorOpen(false)
            }}
            className={`relative w-full text-left overflow-hidden cursor-pointer duration-200 py-3 px-4 ${
              selectedLanguage === language.name ? 'text-main bg-main/10 hover:bg-main/15' : 'hover:bg-text/10'
            }`}
          >
            <TextFlipper>{language.name}</TextFlipper>
          </button>
        ))}
      </div>
    </div>
  )
}
