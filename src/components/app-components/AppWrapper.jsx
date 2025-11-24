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

  const pathname = usePathname()
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
        <AlertProvider>
          <GlobalParallax />

          <div className="relative">
            {shouldShowNavbar && <Navbar />}

            <main className="relative z-10">{children}</main>

            {shouldShowFooter && (
              <div className="sticky bottom-0">
                <Footer />
              </div>
            )}
          </div>
        </AlertProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}
