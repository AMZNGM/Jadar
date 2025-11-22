'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/translations/LanguageContext'
import { useTranslation } from '@/translations/useTranslation'
import { useNavigationLinks } from '@/data/navigationLinks'
import Logo from '@/components/ui/logo'
import DesktopMenu from '@/components/navbar-components/DesktopMenu.jsx'
import SearchTrigger from '@/components/navbar-components/SearchTrigger.jsx'
import LanguageSelector from '@/components/navbar-components/LanguageSelector.jsx'
import GetInTouch from '@/components/navbar-components/GetInTouch.jsx'
import MobileMenuIcon from '@/components/navbar-components/MobileMenuIcon'
import DesktopSearch from '@/components/navbar-components/DesktopSearch.jsx'
import DesktopDropdown from '@/components/navbar-components/DesktopDropdown.jsx'
import MobileSidebar from '@/components/navbar-components/MobileSidebar.jsx'
import NavbarOverlay from '@/components/navbar-components/NavbarOverlay.jsx'

export default function Navbar() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const navigationLinks = useNavigationLinks()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // Wait for client hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // --- Refs ---
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const navItemsRef = useRef([])
  const sidebarRef = useRef(null)
  const searchInputRef = useRef(null)
  const searchContainerRef = useRef(null)
  // --- States ---
  const [scrolled100vh, setScrolled100vh] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenuIndex, setActiveMenuIndex] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [languageSelectorOpen, setLanguageSelectorOpen] = useState(false)
  const [visibleLabel, setVisibleLabel] = useState(null)
  const [showNavContent, setShowNavContent] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState({})

  const handleSearch = useCallback(
    (e) => {
      e?.preventDefault()
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        setSearchQuery('')
        setShowSearch(false)
      }
    },
    [router, searchQuery]
  )

  const toggleSearchBar = useCallback((e) => {
    e?.preventDefault()
    setShowSearch((prev) => !prev)
  }, [])

  useEffect(() => {
    // Close search when clicking outside
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearch(false)
      }
    }

    // Focus the input when search is shown
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside)
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSearch])

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      // CMD/CTRL + K to toggle search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleSearchBar(e)
      }
      // ESC to close search
      if (e.key === 'Escape') {
        setShowSearch(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleSearchBar])

  const resetSidebar = () => {
    setMobileMenuOpen(false)
    setVisibleLabel(null)
    setLanguageSelectorOpen(false)
    setOpenDropdowns({})
  }

  const { languages, selectedLanguage, handleLanguageChange } = languageContext

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled100vh(currentScrollY > 100)
      setIsScrolled(currentScrollY > 0)

      // Don't update isVisible if mobile menu is open
      if (!mobileMenuOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true)
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, mobileMenuOpen])

  useEffect(() => {
    const handleTouchMove = (e) => {
      // prevent scroll while sidebar open
      if (mobileMenuOpen) e.preventDefault()
    }

    if (mobileMenuOpen) {
      // 🔒 Lock scroll
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
    } else {
      // 🔓 Unlock scroll
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', handleTouchMove)
    }

    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [mobileMenuOpen])

  // Skip rendering until client is ready
  if (!isClient) {
    return null
  }

  return (
    <header
      dir="ltr"
      ref={navRef}
      className={`fixed inset-0 w-screen border-b border-text/30 text-text font-light uppercase duration-300 z-50
        ${scrolled100vh ? 'h-18' : 'h-36'}
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        ${
          isScrolled || mobileMenuOpen || activeMenuIndex !== null || showSearch ? 'bg-bg/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="relative size-full flex justify-between items-center gap-4 ps-4">
        <div className="relative h-full flex justify-center items-center gap-8">
          <Logo logoRef={logoRef} />
          <DesktopMenu navigationLinks={navigationLinks} activeMenuIndex={activeMenuIndex} setActiveMenuIndex={setActiveMenuIndex} />
        </div>
        <div className="relative h-full flex justify-center items-center">
          <SearchTrigger toggleSearchBar={toggleSearchBar} />
          <LanguageSelector
            languages={languages}
            selectedLanguage={selectedLanguage}
            handleLanguageChange={handleLanguageChange}
            languageSelectorOpen={languageSelectorOpen}
            setLanguageSelectorOpen={setLanguageSelectorOpen}
          />
          <div className="border-l border-text/30">
            <GetInTouch scrolled100vh={scrolled100vh} />
          </div>
          <div className="border-l border-text/30 lg:hidden">
            <MobileMenuIcon
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              resetSidebar={resetSidebar}
              scrolled100vh={scrolled100vh}
            />
          </div>
        </div>
      </div>
      <DesktopSearch
        ref={searchInputRef}
        searchContainerRef={searchContainerRef}
        showSearch={showSearch}
        isLoading={isLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsLoading={setIsLoading}
        setShowSearch={setShowSearch}
        handleSearch={handleSearch}
        t={t}
      />
      <DesktopDropdown
        navigationLinks={navigationLinks}
        activeMenuIndex={activeMenuIndex}
        setActiveMenuIndex={setActiveMenuIndex}
        showNavContent={showNavContent}
        setShowNavContent={setShowNavContent}
        navItemsRef={navItemsRef}
      />
      <MobileSidebar
        t={t}
        sidebarRef={sidebarRef}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigationLinks={navigationLinks}
        resetSidebar={resetSidebar}
        visibleLabel={visibleLabel}
        setVisibleLabel={setVisibleLabel}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
        languageSelectorOpen={languageSelectorOpen}
        setLanguageSelectorOpen={setLanguageSelectorOpen}
        languages={languages}
      />
      <NavbarOverlay
        activeMenuIndex={activeMenuIndex}
        setActiveMenuIndex={setActiveMenuIndex}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  )
}
