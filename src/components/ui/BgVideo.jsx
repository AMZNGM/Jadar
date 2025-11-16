'use client'

import Image from 'next/image'
import { forwardRef, useEffect, useState } from 'react'

const BgVideo = forwardRef(({ src, mobileImgsrc, className = '' }, ref) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = window.innerWidth < 768
    setIsMobile(check)
  }, [])

  if (isMobile) {
    return (
      <Image
        ref={ref}
        src={mobileImgsrc}
        className={`absolute inset-0 size-full object-cover pointer-events-none ${className}`}
        alt="Background"
        loading="lazy"
      />
    )
  }

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
      poster={mobileImgsrc}
    />
  )
})

BgVideo.displayName = 'BgVideo'

export default BgVideo
