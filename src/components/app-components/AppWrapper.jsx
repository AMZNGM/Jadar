'use client'

import { useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { AlertProvider } from '@/components/app-components/alert/AlertContext.jsx'
import { LanguageProvider } from '@/translations/LanguageContext'
import Lenis from 'lenis'
import ErrorBoundary from '@/components/app-components/ErrorBoundary.jsx'
import GlobalParallax from '@/components/app-components/GlobalParallax'
import Navbar from '@/components/navbar-components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import ScrollToTop from '@/components/app-components/ScrollToTop'
import PrivacyConsentSidebar, { ConsentProvider } from '@/components/app-components/PrivacyConsentSidebar.jsx'
import useCookieConsent from '@/utils/useCookieConsent'

const CookieManager = () => {
  const { prefs, hasConsent, trackEvent, trackPageView, setUserProperty, getUserProperty } = useCookieConsent()

  useEffect(() => {
    if (hasConsent) {
      trackPageView(window.location.pathname)

      const handleLocationChange = () => {
        trackPageView(window.location.pathname)
      }

      window.addEventListener('popstate', handleLocationChange)

      return () => {
        window.removeEventListener('popstate', handleLocationChange)
      }
    }
  }, [hasConsent, trackPageView])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.jadarTracking = {
        trackEvent,
        trackPageView,
        setUserProperty,
        getUserProperty,
        hasConsent,
        prefs,
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.jadarTracking
      }
    }
  }, [trackEvent, trackPageView, setUserProperty, getUserProperty, hasConsent, prefs])

  return null
}

export default function AppWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const handleConsentUpdate = (event) => {
      const prefs = event.detail
      console.log('App received consent update:', prefs)

      if (prefs.functional) {
        const savedTheme = localStorage.getItem('user_theme')
        if (savedTheme) {
          document.documentElement.setAttribute('data-theme', savedTheme)
        }
      }

      if (prefs.performance) {
        if (window.performance) {
          const navigationTiming = window.performance.getEntriesByType('navigation')[0]

          if (navigationTiming && window.jadarTracking) {
            window.jadarTracking.trackEvent('page_timing', {
              load_time: Math.round(navigationTiming.loadEventEnd - navigationTiming.fetchStart),
              dom_ready: Math.round(navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart),
            })
          }
        }
      }

      if (prefs.targeting) {
        console.log('Initializing targeting features')
      }
    }

    const handleConsentReset = () => {
      console.log('App received consent reset')
    }

    window.addEventListener('consent:updated', handleConsentUpdate)
    window.addEventListener('consent:reset', handleConsentReset)

    return () => {
      window.removeEventListener('consent:updated', handleConsentUpdate)
      window.removeEventListener('consent:reset', handleConsentReset)
    }
  }, [])

  const pathname = usePathname()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  const staticRoutes = useMemo(
    () => [
      '/',
      '/about',
      '/leadership',
      '/socialResponsibility',
      '/partners',
      '/abdullaMubarak',
      '/eastSabah',
      '/alMutlaa',
      '/levelsTower',
      '/mediaResources',
      '/press',
      '/investInJadar',
      '/jadarInvestmentOffice',
      '/workAtJadar',
      '/careerCenter',
      '/getInTouch',
      '/privacyPolicy',
      '/termsOfUse',
      '/cookiePolicy',
      '/search',
    ],
    []
  )
  const dynamicRoutes = useMemo(() => ['/allNews/'], [])
  const isStaticPage = staticRoutes.includes(pathname)
  const isDynamicPage = dynamicRoutes.some((route) => pathname.startsWith(route))
  const isValidRoute = isStaticPage || isDynamicPage
  const shouldShowNavbar = isValidRoute && !['/getInTouch', '/projects'].includes(pathname)
  const shouldShowFooter = isValidRoute && !['/getInTouch', '/projects', '/search'].includes(pathname)

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ConsentProvider>
          <AlertProvider>
            <GlobalParallax />
            <div className="relative">
              {shouldShowNavbar && <Navbar />}

              <main className="relative z-10">
                <div className="absolute top-0 w-full h-screen bg-text" />
                {children}
              </main>

              {shouldShowFooter && (
                <div className="sticky bottom-0">
                  <Footer />
                </div>
              )}
            </div>
          </AlertProvider>
          <ScrollToTop />
          <CookieManager />
          <PrivacyConsentSidebar position="bl" />
        </ConsentProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}
