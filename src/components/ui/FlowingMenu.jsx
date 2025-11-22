import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from '@/utils/gsapConfig'
import { MovingBorders } from '@/data/mediaData/svgs'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'

export default function FlowingMenu({ items = [], onModalOpen }) {
  return (
    <div className="w-full overflow-hidden">
      <nav className="flex flex-col justify-center items-center">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} onModalOpen={() => onModalOpen?.(idx)} />
        ))}
      </nav>
    </div>
  )
}

function MenuItem({ text, desc, icon, image, type, to, onModalOpen }) {
  const itemRef = React.useRef(null)
  const marqueeRef = React.useRef(null)
  const marqueeInnerRef = React.useRef(null)

  const animationDefaults = { duration: 0.6, ease: 'expo' }

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom'
  }

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' })
  }

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
  }

  const handleClick = () => {
    if (type === 'modal') {
      onModalOpen?.()
    }
  }

  const repeatedMarqueeContent = Array.from({ length: 14 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span className="text-bg text-[clamp(1rem,4vh,2.5rem)] font-light uppercase text-nowrap p-4">{text}</span>
      <Image src={image} alt="Image" loading="lazy" className="size-full object-cover rounded-full p-2" />
      <span className="text-bg text-[clamp(1rem,4vh,2.5rem)] font-light uppercase text-nowrap p-4">{desc}</span>
      <Image src={image} alt="Image" loading="lazy" className="size-full object-cover rounded-full p-2" />
    </React.Fragment>
  ))

  const MenuContent = () => (
    <div ref={itemRef} className="relative size-full flex-1 overflow-hidden text-center shadow-sm shadow-main/30">
      <MovingBorders className="opacity-75 scale-101" />

      <div
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative max-md:h-22 md:py-4 flex justify-center items-center cursor-pointer text-main font-light uppercase text-[clamp(1rem,4vh,2.5rem)] hover:text-bg focus:text-text focus-visible:text-bg"
      >
        <ShuffleText text={text} className="max-md:hidden" />
        <span className="md:hidden">{text}</span>
      </div>

      <div ref={marqueeRef} className="absolute inset-0 size-full overflow-hidden pointer-events-none bg-text translate-y-[101%]">
        <div ref={marqueeInnerRef} className="flex justify-center items-center size-full">
          <div className="relative size-full flex justify-center items-center will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )

  if (type === 'link' && to) {
    return (
      <Link href={to} className="block size-full">
        <MenuContent />
      </Link>
    )
  }

  return <MenuContent />
}
