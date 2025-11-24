'use client'

import { useEffect, useCallback } from 'react'
import { useConsent } from '@/components/app-components/PrivacyConsentSidebar.jsx'
import { setCookie, eraseCookie } from '@/utils/cookies.js'

// GA4 Measurement ID - Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

const COOKIE_CATEGORIES = {
  performance: ['_ga', '_gid', '_gat', '_ga_*', '_gali', '_utm_*', 'collect', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'],
  functional: ['user_preferences', 'language', 'theme', 'region', 'currency', 'timezone', 'accessibility_settings'],
  targeting: ['_fbp', 'fr', 'ads_preferences', '_gcl_au', 'IDE', 'test_cookie', 'NID', 'CONSENT', '__Secure-*'],
}

const SCRIPTS = {
  googleAnalytics: {
    id: 'gtag',
    src: 'https://www.googletagmanager.com/gtag/js',
    category: 'performance',
  },
  facebookPixel: {
    id: 'fb-pixel',
    category: 'targeting',
  },
}

export default function useCookieConsent() {
  const { prefs, hasConsent } = useConsent()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.gtag = function () {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
    }
  }, [])

  const manageCookies = useCallback((preferences) => {
    Object.entries(COOKIE_CATEGORIES).forEach(([category, cookies]) => {
      if (preferences[category]) {
        console.log(`${category} cookies enabled`)
      } else {
        cookies.forEach((cookieName) => {
          if (cookieName.includes('*')) {
            const prefix = cookieName.replace('*', '')
            const allCookies = document.cookie.split(';')

            allCookies.forEach((cookie) => {
              const cookieKey = cookie.split('=')[0].trim()
              if (cookieKey.startsWith(prefix)) {
                eraseCookie(cookieKey)
              }
            })
          } else {
            eraseCookie(cookieName)
          }
        })
        console.log(`${category} cookies disabled and removed`)
      }
    })
  }, [])

  const manageScripts = useCallback((preferences) => {
    Object.entries(SCRIPTS).forEach(([name, config]) => {
      const shouldLoad = preferences[config.category]
      const existingScript = document.getElementById(config.id)

      if (shouldLoad && !existingScript) {
        loadScript(name, config)
      } else if (!shouldLoad && existingScript) {
        removeScript(config.id)
      }
    })
  }, [])

  const loadScript = (name, config) => {
    switch (name) {
      case 'googleAnalytics':
        loadGoogleAnalytics()
        break
      case 'facebookPixel':
        loadFacebookPixel()
        break
      default:
        console.warn(`Unknown script: ${name}`)
    }
  }

  const removeScript = (id) => {
    const script = document.getElementById(id)
    if (script) {
      script.remove()
      console.log(`Removed script: ${id}`)
    }
  }

  const loadGoogleAnalytics = () => {
    const script = document.createElement('script')
    script.id = 'gtag'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    script.onload = () => {
      window.gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure',
      })

      console.log('Google Analytics loaded')

      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const disableGoogleAnalytics = () => {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      })
    }

    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true
    removeScript('gtag')
    console.log('Google Analytics disabled')
  }

  const loadFacebookPixel = () => {
    const FACEBOOK_PIXEL_ID = 'XXXXXXXXXXXXXXX' // Replace with your Pixel ID

    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.id = 'fb-pixel'
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

    window.fbq('init', FACEBOOK_PIXEL_ID)
    window.fbq('track', 'PageView')

    console.log('Facebook Pixel loaded')
  }

  const disableFacebookPixel = () => {
    if (window.fbq) {
      delete window.fbq
      delete window._fbq
    }

    removeScript('fb-pixel')
    console.log('Facebook Pixel disabled')
  }

  useEffect(() => {
    if (!hasConsent) return

    manageCookies(prefs)
    manageScripts(prefs)

    if (prefs.performance) {
      setCookie('performance_tracking', 'enabled', 365)
    }

    if (prefs.functional) {
      setCookie('user_preferences_enabled', 'true', 365)
    }

    if (prefs.targeting) {
      setCookie('targeting_ads', 'enabled', 90)
    }
  }, [prefs, hasConsent, manageCookies, manageScripts])

  useEffect(() => {
    const handleConsentUpdate = (event) => {
      const updatedPrefs = event.detail
      console.log('Consent updated:', updatedPrefs)

      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: updatedPrefs.performance ? 'granted' : 'denied',
          ad_storage: updatedPrefs.targeting ? 'granted' : 'denied',
          functionality_storage: updatedPrefs.functional ? 'granted' : 'denied',
          personalization_storage: updatedPrefs.targeting ? 'granted' : 'denied',
        })
      }

      if (window.fbq && !updatedPrefs.targeting) {
        window.fbq('consent', 'revoke')
      }
    }

    const handleConsentReset = () => {
      console.log('Consent reset - clearing all non-essential cookies')

      Object.values(COOKIE_CATEGORIES)
        .flat()
        .forEach((cookieName) => {
          if (cookieName.includes('*')) {
            const prefix = cookieName.replace('*', '')
            const allCookies = document.cookie.split(';')

            allCookies.forEach((cookie) => {
              const cookieKey = cookie.split('=')[0].trim()
              if (cookieKey.startsWith(prefix)) {
                eraseCookie(cookieKey)
              }
            })
          } else {
            eraseCookie(cookieName)
          }
        })

      Object.values(SCRIPTS).forEach((config) => {
        removeScript(config.id)
      })

      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          functionality_storage: 'denied',
          personalization_storage: 'denied',
        })
      }
    }

    window.addEventListener('consent:updated', handleConsentUpdate)
    window.addEventListener('consent:reset', handleConsentReset)

    return () => {
      window.removeEventListener('consent:updated', handleConsentUpdate)
      window.removeEventListener('consent:reset', handleConsentReset)
    }
  }, [])

  const trackPageView = useCallback(
    (path) => {
      if (prefs.performance && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: path,
        })
      }
    },
    [prefs.performance]
  )

  return {
    prefs,
    hasConsent,
    trackEvent: (eventName, parameters = {}) => {
      if (prefs.performance && window.gtag) {
        window.gtag('event', eventName, parameters)
      }
    },
    trackPageView,
    setUserProperty: (property, value) => {
      if (prefs.functional) {
        setCookie(`user_${property}`, value, 365)
      }
    },
    getUserProperty: (property) => {
      if (prefs.functional) {
        return getCookie(`user_${property}`)
      }
      return null
    },
  }
}
