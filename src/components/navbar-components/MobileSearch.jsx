import { SearchIcon } from 'lucide-react'
import MobileMenuIcon from '@/components/navbar-components/MobileMenuIcon.jsx'
import ProgressBar from '@/components/navbar-components/ProgressBar.jsx'

export default function MobileSearch({
  t,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading,
  setIsLoading,
  mobileMenuOpen,
  setMobileMenuOpen,
  resetSidebar,
  selectedLanguage,
}) {
  return (
    <>
      <div className="relative w-full h-36 flex justify-between items-center bg-bg border-b border-text/15 ps-6">
        <div className="group flex justify-center items-center gap-6">
          <SearchIcon strokeWidth={1.5} className="size-6" />

          <input
            type="text"
            value={searchQuery}
            placeholder={t('search')}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                setIsLoading(true)
                handleSearch()
                setTimeout(() => setIsLoading(false), 2000)
              }
            }}
            className="w-full outline-none text-xl placeholder-text/75 py-12"
          />
        </div>

        <div
          className={`w-18 h-full flex justify-center items-center ${
            selectedLanguage === 'English' ? 'border-l border-text/15' : 'border-r border-text/15'
          }`}
        >
          <MobileMenuIcon mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} resetSidebar={resetSidebar} />
        </div>
      </div>
      <ProgressBar isLoading={isLoading} />
    </>
  )
}
