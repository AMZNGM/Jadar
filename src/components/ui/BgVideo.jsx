'use client'

import Image from 'next/image'
import { forwardRef } from 'react'

const BgVideo = forwardRef(({ src, mobileImgsrc, className = '', forceVideo = false }, ref) => {
  return (
    <>
      {!forceVideo && (
        <Image
          src={mobileImgsrc}
          alt="Background"
          fill
          sizes="100%"
          className={`absolute inset-0 size-full object-cover pointer-events-none block md:hidden ${className}`}
          loading="eager"
        />
      )}

      <video
        ref={ref}
        className={`absolute inset-0 size-full object-cover pointer-events-none ${forceVideo ? 'block' : 'hidden md:block'} ${className}`}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={mobileImgsrc}
      />
    </>
  )
})

BgVideo.displayName = 'BgVideo'

export default BgVideo
