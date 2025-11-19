'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MousePointerClick } from 'lucide-react'
import { DiagonalLines, MovingBorders } from '@/data/mediaData/svgs'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'

export default function StickyImage({ member, isVisible, stickyImgRef, stickyImgContainerRef, onMemberClick }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const FallbackImg = ArtboardImgs[10]

  if (!isVisible || !member) return null

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = (e) => {
    console.error('Failed to load image:', member.image)
    setImageError(true)
    setImageLoaded(false)
    e.target.src = FallbackImg
  }

  return (
    <div className="relative max-lg:hidden">
      <div className="sticky top-1/3 self-start h-fit z-10 ms-4">
        <div
          ref={stickyImgContainerRef}
          className="group relative size-80 max-md:size-20 border border-main/30 hover:border-main/50 overflow-hidden cursor-pointer"
          onClick={onMemberClick}
        >
          <MovingBorders className="absolute inset-0 z-50" />

          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-main/50 animate-pulse flex items-center justify-center">Loading...</div>
          )}

          <Image
            ref={stickyImgRef}
            src={imageError ? FallbackImg : member.image || FallbackImg}
            alt={member.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="eager"
            priority={true}
            className={`object-cover z-0 size-full stickyImg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {imageError && <div className="absolute inset-0 bg-main/50 flex items-center justify-center">Image not available</div>}

          <div className="absolute inset-0 duration-500 bg-black/20 group-hover:bg-black/50">
            <span className="size-full flex justify-center items-center duration-500 gap-1 opacity-0 group-hover:opacity-100">
              <MousePointerClick />
              See more
            </span>
          </div>
        </div>
      </div>
      <DiagonalLines />
    </div>
  )
}
