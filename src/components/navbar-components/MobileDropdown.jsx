import { ChevronLeft } from 'lucide-react'
import TextFlipper from '@/components/ui/text/TextFlipper'
import ClickEffect from '@/components/ui/effects/ClickEffect'
import HoverEffect from '@/components/ui/effects/HoverEffect'
import MobileMenuIcon from '@/components/navbar-components/MobileMenuIcon.jsx'

export default function MobileDropdown({
  visibleLabel,
  setVisibleLabel,
  navigationLinks,
  resetSidebar,
  selectedLanguage,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  return (
    <div
      className={`absolute inset-0 size-full backdrop-blur-xl overflow-hidden duration-500 ease-in-out touch-none ${
        visibleLabel !== null ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'
      }`}
    >
      <div className="group flex justify-between items-center border-b border-text/15 ps-6">
        <ClickEffect
          onClick={() => setVisibleLabel(null)}
          className="size-full flex items-center text-lg font-medium cursor-pointer gap-3 py-12"
        >
          <ChevronLeft strokeWidth={1.5} />
          <TextFlipper className={'z-10'}>{navigationLinks[visibleLabel]?.label}</TextFlipper>
        </ClickEffect>

        <div
          className={`w-18 h-full flex justify-center items-center ${
            selectedLanguage === 'English' ? 'border-l border-text/15' : 'border-r border-text/15'
          }`}
        >
          <MobileMenuIcon mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} resetSidebar={resetSidebar} />
        </div>
      </div>

      <ul className="size-full flex flex-col">
        {navigationLinks[visibleLabel]?.items.map((item, index) => (
          <li key={index} className="border-b border-text/10 hover:bg-text/10">
            <HoverEffect
              to={item.to}
              onClick={() => {
                setMobileMenuOpen(false)
                setVisibleLabel(null)
                resetSidebar()
              }}
              className="w-full flex items-center cursor-pointer text-sm font-medium uppercase p-6"
            >
              <TextFlipper className={'z-10'}>{item.label}</TextFlipper>
            </HoverEffect>
          </li>
        ))}
      </ul>
    </div>
  )
}
