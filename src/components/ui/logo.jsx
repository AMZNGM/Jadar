'use client'

import Image from 'next/image'
import Link from 'next/link'
import { logos } from '@/data/mediaData/logos'

export default function Logo({ className, to = '/', logoName = 'MainLogo' }) {
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
        width={120}
        height={40}
        className={`size-auto cursor-pointer hover:scale-105 duration-300 ${className || ''}`}
        src={logoImg}
        alt={`${selectedLogo?.project} logo`}
      />
    </Link>
  )
}
