import HoverEffect from '@/components/ui/effects/HoverEffect'
import { SearchIcon } from 'lucide-react'

export default function SearchTrigger({ toggleSearchBar }) {
  const isMac = navigator.platform.toLowerCase().includes('mac')

  return (
    <div onClick={(e) => toggleSearchBar(e)} className="relative h-full">
      <HoverEffect className="relative h-full overflow-hidden cursor-pointer max-[1100px]:hidden p-2">
        <span className="group relative h-full flex justify-center items-center gap-1">
          <SearchIcon strokeWidth={1.5} className="size-5" />

          <span className="text-xs scale-80 duration-300 translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
            {isMac ? '⌘' : 'Ctrl'}+K
          </span>
        </span>
      </HoverEffect>
    </div>
  )
}
