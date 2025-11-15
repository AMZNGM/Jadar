'use client'

import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import { LANGUAGES } from '@/translations/languages.js'

const LanguageContext = createContext()

const initialState = {
  selectedLanguage: LANGUAGES[0].name,
  isMounted: false,
}

function languageReducer(state, action) {
  switch (action.type) {
    case 'INIT_LANGUAGE':
      return {
        selectedLanguage: action.payload.language,
        isMounted: true,
      }
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        selectedLanguage: action.payload.language,
      }
    default:
      return state
  }
}

export function LanguageProvider({ children }) {
  const [state, dispatch] = useReducer(languageReducer, initialState)
  const initRef = useRef(false)

  const getLanguageObj = useCallback((name) => LANGUAGES.find((lang) => lang.name === name) || LANGUAGES[0], [])

  const handleLanguageChange = useCallback((language) => {
    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: { language: language.name },
    })
    document.documentElement.lang = language.code
    document.documentElement.dir = language.code === 'ar' ? 'rtl' : 'ltr'
    if (language.code === 'ar') {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
    localStorage.setItem('selectedLanguage', language.name)
  }, [])

  // Initialize on client side only
  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    const savedLanguage = localStorage.getItem('selectedLanguage') || LANGUAGES[0].name
    const langObj = getLanguageObj(savedLanguage)

    document.documentElement.lang = langObj.code
    document.documentElement.dir = langObj.code === 'ar' ? 'rtl' : 'ltr'
    if (langObj.code === 'ar') {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }

    dispatch({
      type: 'INIT_LANGUAGE',
      payload: { language: savedLanguage },
    })
  }, [getLanguageObj])

  const value = {
    selectedLanguage: state.selectedLanguage,
    setSelectedLanguage: (lang) =>
      dispatch({
        type: 'CHANGE_LANGUAGE',
        payload: { language: lang },
      }),
    handleLanguageChange,
    languages: LANGUAGES,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
