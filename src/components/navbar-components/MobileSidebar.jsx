import MobileSearch from '@/components/navbar-components/MobileSearch.jsx'
import MobileMenuLinks from '@/components/navbar-components/MobileMenuLinks.jsx'
import MobileDropdown from '@/components/navbar-components/MobileDropdown.jsx'
import MobileLanguageSelector from '@/components/navbar-components/MobileLanguageselector.jsx'

export default function MobileSidebar({
  t,
  mobileMenuOpen,
  setMobileMenuOpen,
  navigationLinks,
  resetSidebar,
  visibleLabel,
  setVisibleLabel,
  isLoading,
  setIsLoading,
  searchQuery,
  setSearchQuery,
  handleSearch,
  selectedLanguage,
  handleLanguageChange,
  languageSelectorOpen,
  setLanguageSelectorOpen,
  languages,
}) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`fixed top-0 right-0 w-full h-screen max-w-[calc(100%-3.5rem)] sm:max-w-md bg-bg/97 backdrop-blur-xl overflow-hidden duration-500 ease-in-out touch-none z-50 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <MobileSearch
        t={t}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        resetSidebar={resetSidebar}
        selectedLanguage={selectedLanguage}
      />
      <MobileMenuLinks
        navigationLinks={navigationLinks}
        visibleLabel={visibleLabel}
        setVisibleLabel={setVisibleLabel}
        resetSidebar={resetSidebar}
        setIsLoading={setIsLoading}
      />
      <MobileDropdown
        visibleLabel={visibleLabel}
        setVisibleLabel={setVisibleLabel}
        navigationLinks={navigationLinks}
        resetSidebar={resetSidebar}
        selectedLanguage={selectedLanguage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <MobileLanguageSelector
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
        languageSelectorOpen={languageSelectorOpen}
        setLanguageSelectorOpen={setLanguageSelectorOpen}
        languages={languages}
      />
    </div>
  )
}
