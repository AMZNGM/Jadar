import { MovingBorders } from '@/data/mediaData/svgs'
import { PlayIcon } from 'lucide-react'
import ShinyText from '@/components/ui/text/ShinyText.jsx'
import ClickEffect from '@/components/ui/effects/ClickEffect.jsx'

export default function HeroContent({ slideUpRef, title, onOpenVideo }) {
  return (
    <div className="relative size-full flex justify-center items-center py-8 px-4">
      <div
        ref={slideUpRef}
        className="flex flex-col justify-center items-center w-[100vh] h-[50vh] p-8 bg-bg/50 backdrop-blur-lg shadow-2xl overflow-hidden"
      >
        <MovingBorders />
        <ShinyText
          text={title}
          speed={5}
          className="text-text text-7xl max-md:text-3xl font-light tracking-[0.7rem] text-center uppercase mb-16 duration-500"
        />
        <ClickEffect
          onClick={onOpenVideo}
          className="p-3 bg-transparent border-2 shadow-2xl duration-300 cursor-pointer max-md:p-2 text-text border-text/5 hover:bg-main/90 hover:border-transparent"
        >
          <span className="absolute top-2 left-0 w-full h-0.5 bg-main border-anim top-line" />
          <span className="absolute bottom-2 left-0 w-full h-0.5 bg-main border-anim bottom-line" />
          <span className="absolute -top-2 left-0 w-0.5 h-full bg-main border-anim left-line" />
          <span className="absolute top-0 right-0 w-0.5 h-full bg-main border-anim right-line" />
          <PlayIcon className="size-4" />
        </ClickEffect>
      </div>

      <div className="flex absolute bottom-8 left-1/2 z-20 flex-col items-center -translate-x-1/2">
        <div className="overflow-hidden relative w-px h-10 bg-text/50">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-text animate-scroll-indicator" />
        </div>
      </div>
    </div>
  )
}
