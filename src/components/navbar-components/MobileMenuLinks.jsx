import { ChevronRight } from 'lucide-react'
import TextFlipper from '@/components/ui/text/TextFlipper.jsx'
import HoverEffect from '@/components/ui/effects/HoverEffect'

export default function MobileMenuLinks({ navigationLinks, visibleLabel, setVisibleLabel }) {
  return (
    <div className={`relative w-full ${visibleLabel !== null ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <ul className="size-full flex flex-col">
        {navigationLinks.map((link, index) => (
          <li key={index} className="group border-b border-text/10 hover:bg-text/10">
            <HoverEffect
              onClick={() => setVisibleLabel(index)}
              className="w-full flex justify-between items-center cursor-pointer text-sm font-medium uppercase p-6"
            >
              <TextFlipper className={'z-20'}>{link.label}</TextFlipper>
              <ChevronRight strokeWidth={1.5} className="size-6 group-hover:rotate-360 duration-500" />
            </HoverEffect>
          </li>
        ))}
      </ul>
    </div>
  )
}
