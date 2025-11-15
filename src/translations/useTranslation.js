import { TRANSLATIONS } from '@/translations/translations.js'
import { useLanguage } from '@/translations/LanguageContext.jsx'

const usedLanguages = {
  English: 'en',
  العربية: 'ar',
}

export function useTranslation() {
  const languageContext = useLanguage()

  if (!languageContext) {
    console.warn('useLanguage returned undefined. Make sure LanguageProvider is properly set up.')
    return { t: (key) => key }
  }

  const { selectedLanguage } = languageContext
  const langCode = usedLanguages[selectedLanguage] || 'en'

  function t(key) {
    return TRANSLATIONS[langCode][key] || key
  }

  return { t }
}
