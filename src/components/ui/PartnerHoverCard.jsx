'use client'

import Image from 'next/image'
import React, { forwardRef } from 'react'
import { BgNoise, MovingBorders } from '@/data/mediaData/svgs'
import TextStack from '@/components/ui/text/TextStack.jsx'
import Logo from '@/components/ui/Logo.jsx'

const PartnerHoverCard = forwardRef(({ partner, isVisible }, ref) => {
  const show = isVisible && partner

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none overflow-hidden transition-opacity duration-300 z-50 max-md:hidden"
      style={{
        left: 0,
        top: 0,
        opacity: show ? 1 : 0,
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      {show && (
        <div className="relative w-75 bg-bg border border-text/10 shadow-2xl">
          <MovingBorders />
          <BgNoise />

          {/* Image Section */}
          <div className="relative w-full h-40 overflow-hidden mb-2 p-0.5">
            <Image src={partner.img} alt={partner.title || 'partner-image'} loading="lazy" fill sizes="300px" className="object-cover" />

            <div className="absolute top-3 left-3">
              <Logo logoName={partner.logoName} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-main text-xl font-light tracking-wider mb-1">{partner.title}</h3>

            <p className="text-sm text-text/50 mb-3">{partner.tagline}</p>

            {/* Stats */}
            {partner?.stats && (
              <div className="mb-8">
                <span className="text-sm font-light text-main tracking-wider">Stats:</span>

                <ul className="text-xs text-text/50 capitalize grid gap-1 mt-1">
                  {Object.entries(partner.stats).map(([key, value]) => (
                    <li key={key} className="flex items-center gap-2">
                      <span>{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium text-text">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <TextStack text="Click to explore" />
          </div>
        </div>
      )}
    </div>
  )
})

PartnerHoverCard.displayName = 'PartnerHoverCard'

export default React.memo(PartnerHoverCard)
