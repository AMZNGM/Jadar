'use client'

import { forwardRef } from 'react'

const BgVideo = forwardRef(({ src, className = '', style, overlay = false, overlayColor = 'bg-black/30', children, ...rest }, ref) => {
  return (
    <div className="flex overflow-hidden justify-center items-center bg-center bg-cover">
      <video
        ref={ref}
        className={`object-cover object-center absolute inset-0 z-0 size-full pointer-events-none ${className}`}
        style={style}
        src={src}
        playsInline
        muted
        autoPlay
        loop
        {...rest}
      />
      {overlay && <div className={`absolute inset-0 z-10 ${overlayColor}`} />}
      {children && <div className="relative z-20">{children}</div>}
    </div>
  )
})

BgVideo.displayName = 'BgVideo'

export default BgVideo
