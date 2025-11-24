'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AlertProvider } from '@/components/app-components/alert/AlertContext.jsx'
import { LanguageProvider } from '@/translations/LanguageContext'
import Lenis from 'lenis'
import GlobalParallax from '@/components/app-components/GlobalParallax'
import Navbar from '@/components/navbar-components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'

export default function AppWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const pathname = usePathname()
  const validRoutes = [
    '/',
    '/about',
    '/leadership',
    '/socialResponsibility',
    '/partners',
    '/abdullaMubarak',
    '/eastSabah',
    '/alMutlaa',
    '/levelsTower',
    '/allNews',
    '/allNews/[id]',
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
  ]
  const isValidRoute = validRoutes.some((route) => {
    if (pathname === route) return true
    if (route.endsWith('/') && pathname.startsWith(route)) return true
    if (route === '/' && pathname === '') return true
    return false
  })
  const shouldShowNavbar = isValidRoute && !['/getInTouch', '/projects'].includes(pathname)
  const shouldShowFooter = isValidRoute && !['/getInTouch', '/projects', '/search'].includes(pathname)

  return (
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
  )
}
