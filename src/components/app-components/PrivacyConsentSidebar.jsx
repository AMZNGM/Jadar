'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { BgNoise } from '@/data/mediaData/svgs'
import { setCookie, getCookie, eraseCookie } from '@/utils/cookies'
import ClickEffect from '@/components/ui/effects/ClickEffect.jsx'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import CloseBtn from '@/components/ui/buttons/CloseBtn.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

const CONSENT_KEY = 'jadar.consent.preferences'
const CONSENT_COOKIE = 'jadar_consent'
const CONSENT_VERSION = '1.0'
const DEFAULT_PREFS = {
  strictlyNecessary: true,
  performance: false,
  functional: false,
  targeting: false,
  consentVersion: CONSENT_VERSION,
  consentDate: null,
}
const ConsentContext = createContext({
  prefs: DEFAULT_PREFS,
  setPrefs: () => {},
  save: () => {},
  isOpen: false,
  setIsOpen: () => {},
  hasConsent: false,
  resetConsent: () => {},
})

export const useConsent = () => useContext(ConsentContext)

export function ConsentProvider({ backendUrl, children }) {
  const [prefs, setPrefsState] = useState(DEFAULT_PREFS)
  const [isOpen, setIsOpen] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const initializeConsent = () => {
      try {
        const saved = localStorage.getItem(CONSENT_KEY)
        const consentCookie = getCookie(CONSENT_COOKIE)

        if (saved && consentCookie) {
          const parsed = JSON.parse(saved)

          if (parsed.consentVersion === CONSENT_VERSION) {
            setPrefsState({
              ...DEFAULT_PREFS,
              ...parsed,
              strictlyNecessary: true,
            })
            setHasConsent(true)
          } else {
            resetConsent()
          }
        } else {
          setHasConsent(false)
        }
      } catch (error) {
        console.warn('Failed to initialize consent:', error)
        resetConsent()
      }
    }

    initializeConsent()
  }, [])

  const setPrefs = (patch) =>
    setPrefsState((prev) => ({
      ...prev,
      ...patch,
      strictlyNecessary: true,
      consentVersion: CONSENT_VERSION,
      consentDate: new Date().toISOString(),
    }))

  const save = async ({ silent } = {}) => {
    try {
      const updatedPrefs = {
        ...prefs,
        consentVersion: CONSENT_VERSION,
        consentDate: new Date().toISOString(),
      }

      localStorage.setItem(CONSENT_KEY, JSON.stringify(updatedPrefs))
      setCookie(CONSENT_COOKIE, 'true', 365)
      setPrefsState(updatedPrefs)
      setHasConsent(true)

      if (backendUrl) {
        try {
          await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prefs: updatedPrefs,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              url: window.location.href,
            }),
            keepalive: true,
          })
        } catch (e) {
          console.warn('Consent backend sync failed:', e)
        }
      }

      window.dispatchEvent(new CustomEvent('consent:updated', { detail: updatedPrefs }))
      if (!silent) console.info('Consent saved', updatedPrefs)

      return updatedPrefs
    } catch (e) {
      console.error('Failed to save consent', e)
      throw e
    }
  }

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY)
    eraseCookie(CONSENT_COOKIE)
    setPrefsState(DEFAULT_PREFS)
    setHasConsent(false)
    setIsOpen(false)
    window.dispatchEvent(new CustomEvent('consent:reset'))
  }

  const value = useMemo(
    () => ({
      prefs,
      setPrefs,
      save,
      isOpen,
      setIsOpen,
      hasConsent,
      resetConsent,
    }),
    [prefs, isOpen, hasConsent]
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
  <label className={`relative inline-flex items-center cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} disabled={disabled} />
    <span className={`w-10 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-main' : 'bg-text/20'}`} />
    <span
      className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
        checked ? 'translate-x-4' : 'translate-x-0'
      }`}
    />
  </label>
)

const CookieCategory = ({ title, description, checked, onChange, disabled = false, details = null }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <li onClick={() => setShowDetails(!showDetails)} className="p-4 border border-text/10 duration-300 cursor-pointer hover:bg-text/5">
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-4">
          <div className="flex items-center gap-2">
            <p className={`${showDetails ? 'text-main' : ''}`}>{title}</p>
            {details && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-text/60 hover:text-main transition-colors"
                aria-label="Show details"
              >
                <svg
                  className={`w-4 h-4 cursor-pointer transition-transform ${showDetails ? 'rotate-180 text-main' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-xs opacity-70 mt-1 me-5">{description}</p>

          {showDetails && details && (
            <div className="mt-3 p-3 bg-text/5 text-xs">
              <p className="font-medium mb-2">Cookies used:</p>
              <ul className="space-y-1">
                {details.cookies?.map((cookie, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="font-mono">{cookie.name}</span>
                    <span className="opacity-70">{cookie.purpose}</span>
                  </li>
                ))}
              </ul>
              {details.retention && (
                <p className="mt-2 opacity-70">
                  <strong>Retention:</strong> {details.retention}
                </p>
              )}
            </div>
          )}
        </div>

        {disabled ? (
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70">On</span>
            <input type="checkbox" checked disabled className="accent-current cursor-not-allowed" />
          </div>
        ) : (
          <ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
        )}
      </div>
    </li>
  )
}

export default function PrivacyConsentSidebar({ position = 'br' }) {
  const { prefs, setPrefs, save, isOpen, setIsOpen, hasConsent } = useConsent()
  const [showBanner, setShowBanner] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const positions = {
    br: 'right-2 bottom-2',
    bl: 'left-4 bottom-4',
    tr: 'right-2 top-2',
    tl: 'left-2 top-2',
  }

  const isLeft = position.includes('l')

  useEffect(() => {
    setShowBanner(!hasConsent)
  }, [hasConsent])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, setIsOpen])

  const handleAction = async (action) => {
    setIsLoading(true)

    try {
      const updatedPrefs = {
        ...prefs,
        consentVersion: CONSENT_VERSION,
        consentDate: new Date().toISOString(),
      }

      if (action === 'accept') {
        // Enable all cookie categories
        updatedPrefs.performance = true
        updatedPrefs.functional = true
        updatedPrefs.targeting = true
        setShowBanner(false)
      } else if (action === 'reject') {
        // Disable all optional cookie categories
        updatedPrefs.performance = false
        updatedPrefs.functional = false
        updatedPrefs.targeting = false
        setShowBanner(false)
      }

      // Update the state with new preferences using setPrefs
      setPrefs(updatedPrefs)
    } catch (error) {
      console.error('Failed to save preferences:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveCustom = async () => {
    setIsLoading(true)

    try {
      await save({ silent: false })
      setIsOpen(false)
      setShowBanner(false)
    } catch (error) {
      console.error('Failed to save preferences:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const cookieCategories = [
    {
      title: 'Strictly Necessary Cookies',
      description: 'Required for core site features (security, network management, accessibility). These are always on.',
      checked: true,
      disabled: true,
      details: {
        cookies: [
          { name: 'jadar_session', purpose: 'Session management' },
          { name: 'csrf_token', purpose: 'Security' },
          { name: 'jadar_consent', purpose: 'Consent preferences' },
        ],
        retention: 'Session / 1 year',
      },
    },
    {
      title: 'Performance Cookies',
      description: 'Help us understand site usage and improve speed and reliability (e.g., aggregate analytics).',
      checked: prefs.performance,
      onChange: (e) => setPrefs({ performance: e.target.checked }),
      details: {
        cookies: [
          { name: '_ga', purpose: 'Google Analytics' },
          { name: '_gid', purpose: 'Google Analytics' },
          { name: '_gat', purpose: 'Google Analytics' },
        ],
        retention: '2 years',
      },
    },
    {
      title: 'Functional Cookies',
      description: 'Enable enhanced features and personalization, such as remembering choices and preferences.',
      checked: prefs.functional,
      onChange: (e) => setPrefs({ functional: e.target.checked }),
      details: {
        cookies: [
          { name: 'user_preferences', purpose: 'User settings' },
          { name: 'language', purpose: 'Language preference' },
        ],
        retention: '1 year',
      },
    },
    {
      title: 'Targeting Cookies',
      description: 'Used to deliver content and ads more relevant to you and your interests.',
      checked: prefs.targeting,
      onChange: (e) => setPrefs({ targeting: e.target.checked }),
      details: {
        cookies: [
          { name: '_fbp', purpose: 'Facebook Pixel' },
          { name: 'fr', purpose: 'Facebook advertising' },
          { name: 'ads_preferences', purpose: 'Ad personalization' },
        ],
        retention: '3 months',
      },
    },
  ]

  return (
    <>
      {/* banner */}
      {showBanner && !hasConsent && (
        <div className="fixed bottom-0 left-0 right-0 px-4 py-8 bg-bg text-text font-light shadow-lg border-t border-text/10 z-50">
          <BgNoise />

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm max-md:text-center flex-1">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking Accept
              All, you consent to our use of cookies.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 text-center">
              <ClickEffect
                onClick={() => handleAction('reject')}
                disabled={isLoading}
                className="px-4 py-2 bg-text/10 hover:bg-text/20 text-sm hover:scale-98 duration-300 cursor-pointer disabled:opacity-50"
              >
                Reject All
              </ClickEffect>
              <ClickEffect
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-text/10 hover:bg-text/20 text-sm hover:scale-98 duration-300 cursor-pointer"
              >
                Customize Preferences
              </ClickEffect>
              <ClickEffect
                onClick={() => handleAction('accept')}
                disabled={isLoading}
                className="px-4 py-2 bg-main text-text hover:bg-main/80 hover:scale-98 text-sm duration-300 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Accept All'}
              </ClickEffect>
            </div>
          </div>
        </div>
      )}

      {/* floating btn */}
      {hasConsent && (
        <button
          aria-label="Open privacy preferences"
          onClick={() => setIsOpen(true)}
          className={`fixed p-2 shadow-lg bg-/50 text-text hover:bg-main opacity-25 hover:opacity-100 duration-300 cursor-pointer z-50 ${
            positions[position] || positions.br
          }`}
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-bg/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <aside
          className={`absolute ${
            isLeft ? 'left-0' : 'right-0'
          } top-0 h-full max-w-md bg-bg text-text font-light shadow-2xl flex flex-col transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : isLeft ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <BgNoise />

          {/* Header */}
          <header className="flex justify-between items-center px-5 py-4 border-b border-text/10">
            <div className="flex items-center gap-2">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>
              <ShuffleText text={`Privacy Preferences Center`} tag="h6" className="text-xl" />
            </div>
            <CloseBtn onClick={() => setIsOpen(false)} className="top-2! right-4! max-md:right-2!" />
          </header>

          {/* Content */}
          <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">
            <section className="p-4 text-xs leading-relaxed bg-text/5 opacity-90">
              <p>
                When you use the Jadar website, certain information may be stored or retrieved in your browser, mainly through cookies. This
                data can relate to your device, settings, or general usage and helps the site work as intended. It usually doesnt directly
                identify you, but it enables a more tailored experience.
              </p>
              <div className="group mt-3 flex items-center gap-1 text-xs hover:text-main">
                <svg className="size-4 group-hover:animate-spin" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                <Link href="/cookiePolicy" onClick={handleSaveCustom} className="bg-[#232323] z-10 underline underline-offset-2">
                  More information
                </Link>
                <svg
                  className="size-4 -translate-x-10 group-hover:translate-x-0 duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </section>

            <section>
              <h3 className="text-base mb-3">Manage Consent Preferences</h3>
              <ul className="space-y-3">
                {cookieCategories.map((category, index) => (
                  <CookieCategory key={index} {...category} />
                ))}
              </ul>
            </section>

            {hasConsent && prefs.consentDate && (
              <section className="text-xs text-text/70 p-3 bg-text/5">
                <p>Consent given on: {new Date(prefs.consentDate).toLocaleDateString()}</p>
                <p>Version: {prefs.consentVersion}</p>
              </section>
            )}
          </div>

          {/* Footer */}
          <footer className="p-4 border-t border-text/10 flex justify-between items-center gap-2">
            <div className="flex justify-center items-center gap-2">
              <MainBtn
                onClick={() => handleAction('reject')}
                text="Reject All"
                disabled={isLoading}
                size="sm"
                className="border-0 normal-case! bg-text/10 hover:bg-text/20 text-sm max-md:text-xs"
              />

              <MainBtn
                onClick={() => handleAction('accept')}
                text="Accept All"
                disabled={isLoading}
                size="sm"
                className="border-0 normal-case! bg-text/10 hover:bg-text/20 text-sm max-md:text-xs"
              />
            </div>

            <MainBtn
              onClick={handleSaveCustom}
              text={`Confirm My Choices`}
              disabled={isLoading}
              size="sm"
              className="border-0 normal-case! text-sm max-md:text-xs"
            />
          </footer>
        </aside>
      </div>
    </>
  )
}
