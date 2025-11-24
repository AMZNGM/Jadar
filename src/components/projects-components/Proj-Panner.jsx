import Image from 'next/image'
import { BgNoise } from '@/data/mediaData/svgs.jsx'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'
import Noise from '@/components/ui/effects/Noise.jsx'
import Logo from '@/components/ui/logo.jsx'

export default function ProjPanner({ imgSrc, logoName, logoLink, className }) {
  return (
    <section className={`relative w-screen overflow-hidden bg-bg text-text max-sm:px-4 pb-3 ${className}`}>
      <BgNoise />

      <ParallaxElement speed={3} direction="opacity" className="group relative border-t border-main/50 overflow-hidden">
        <ParallaxElement speed={0.3} direction="scale" className="relative overflow-hidden mt-12">
          <Image src={imgSrc} alt="img" className="relative w-full h-[50vh] max-md:h-[70vh] object-cover z-0 reveal-img" />
          <div className="bg-bg size-full absolute inset-0 opacity-0 group-hover:opacity-50 duration-1000" />
          <Noise className={'opacity-0 group-hover:opacity-100 duration-300'} />
        </ParallaxElement>

        <div className="absolute top-1/2 left-1/2 -translate-1/2 z-10 opacity-0 group-hover:opacity-100 duration-1000">
          <Logo logoName={logoName} to={logoLink} width={500} />
        </div>
      </ParallaxElement>
    </section>
  )
}
