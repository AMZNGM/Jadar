'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import Navbar from '@/components/navbar-components/Navbar.jsx'

const AppWrapper = ({ children }) => {
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

  return (
    <div className="relative">
      {shouldShowNavbar && <Navbar />}

      <main className="relative z-10">{children}</main>
    </div>
  )
}

export default AppWrapper
