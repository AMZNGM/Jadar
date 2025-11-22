'use client'

import Image from 'next/image'
import Link from 'next/link'
import { logos } from '@/data/mediaData/logos'

export default function Logo({ className, width = 120, to = '/', logoName = 'MainLogo' }) {
  const selectedLogo = logos.find((logo) => logo.project.toLowerCase() === logoName.toLowerCase()) || logos[0]

  const getLogoImg = (logo) => {
    if (!logo || !logo.img) return ''

    if (Array.isArray(logo.img)) {
      return logo.img[0]
    } else if (typeof logo.img === 'object') {
      return Object.values(logo.img)[0]
    }
    return logo.img
  }

  const logoImg = getLogoImg(selectedLogo)
  const isExternal = !to.startsWith('/')
  const linkProps = isExternal
    ? {
        href: to,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : { href: to }

  return (
    <Link {...linkProps} className={`relative group ${className || ''}`}>
      <Image
        src={logoImg}
        alt={`${selectedLogo?.project} logo`}
        width={width}
        height={40}
        className={`size-auto cursor-pointer hover:scale-105 duration-300 ${className || ''}`}
        loading="eager"
      />
    </Link>
  )
}
