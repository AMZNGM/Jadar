import HoverEffect from '@/components/ui/effects/HoverEffect'

export default function MobileMenuIcon({ mobileMenuOpen, setMobileMenuOpen, resetSidebar, scrolled100vh, className }) {
  return (
    <div onClick={() => (mobileMenuOpen ? resetSidebar() : setMobileMenuOpen(true))} className="relative h-full">
      <HoverEffect
        ariaExpanded={mobileMenuOpen}
        className={`group relative w-18 xl:w-36 flex justify-center items-center cursor-pointer
        ${scrolled100vh ? 'h-18' : 'h-36'}
        ${className}`}
      >
        <svg
          fill="none"
          viewBox="0 0 32 32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          className="size-7 group-aria-expanded:rotate-360 duration-500"
        >
          <path d="M6 16L26 16" className="origin-center -translate-y-2.5 group-aria-expanded:opacity-0 duration-300" />
          <path d="M6 16H26" className="origin-center group-aria-expanded:rotate-45 duration-300" />
          <path
            d="M6 16H26"
            className="origin-center translate-y-2.5 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135 duration-300"
          />
        </svg>
      </HoverEffect>
    </div>
  )
}
