'use client'

import { forwardRef } from 'react'

const BgVideo = forwardRef(({ src, className = '' }, ref) => {
  return (
    <video
      ref={ref}
      className={`absolute inset-0 size-full object-cover pointer-events-none ${className}`}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      poster="/images/Artboard/Artboard 1.webp"
    />
  )
})

BgVideo.displayName = 'BgVideo'

export default BgVideo
