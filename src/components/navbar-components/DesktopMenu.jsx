import HoverEffect from '@/components/ui/effects/HoverEffect'
import TextFlipper from '@/components/ui/text/TextFlipper.jsx'
import { ChevronDown } from 'lucide-react'

export default function DesktopMenu({ navigationLinks, activeMenuIndex, setActiveMenuIndex }) {
  return (
    <nav className="relative h-full max-lg:hidden">
      <ul className="relative h-full flex">
        {navigationLinks.map((link, index) => (
          <li key={index} onMouseEnter={() => setActiveMenuIndex(index)}>
            <HoverEffect
              isActive={activeMenuIndex === index}
              className="group xl:min-w-28 h-full flex justify-center items-center cursor-pointer gap-2 p-4"
            >
              <TextFlipper className={'z-10'}>{link.label}</TextFlipper>
              <ChevronDown strokeWidth={1.8} className="size-4 group-hover:rotate-180 duration-300" />
            </HoverEffect>
          </li>
        ))}
      </ul>
    </nav>
  )
}
