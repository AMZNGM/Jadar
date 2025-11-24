import Link from 'next/link'
import { MovingBorders } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { useNavigationLinks, useFooterBottomLinks } from '@/data/navigationLinks'
import { getSocialLinks } from '@/data/contactData'
import FloatingEffect from '@/components/ui/effects/FloatingEffect.jsx'
import TextFlipper from '@/components/ui/text/TextFlipper.jsx'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import Logo from '@/components/ui/logo.jsx'
import BgVideo from '@/components/ui/BgVideo.jsx'

export default function Footer() {
  const { t } = useTranslation()
  const socialLinks = getSocialLinks(t)
  const footerLinks = useNavigationLinks()
  const footerBottomLinks = useFooterBottomLinks()
  const bgVid = '/videos/homeHero.mp4'

  return (
    <section className="overflow-hidden relative px-4 py-10 w-screen font-light text-text min-h-fit">
      <BgVideo src={bgVid} />

      <div className="flex justify-center items-center size-full">
        <div className="relative w-[95%] group">
          <FloatingEffect>
            <div className="overflow-hidden relative bg-linear-to-br border backdrop-blur-sm from-bg/50 via-bg/90 to-black/90 border-text/10">
              <MovingBorders />

              <div className="relative">
                <div className="grid grid-cols-2 max-lg:grid-cols-1 min-h-fit">
                  <div
                    className="flex flex-col justify-between items-start max-md:justify-center max-md:items-center md:gap-2 p-6 sm:p-8 lg:min-h-[400px] transform-gpu"
                    style={{
                      transform: 'translateZ(20px)',
                    }}
                  >
                    <Logo
                      className={
                        'relative z-10 w-40 filter drop-shadow-xl transition-all duration-500 sm:w-52 lg:w-60 group-hover:scale-105 group-hover:brightness-110'
                      }
                    />
                    <p className="pt-2 text-sm text-text/50">©Jadar 2025. All rights reserved.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 p-4 sm:gap-8 sm:p-8">
                    {footerLinks.map((link, index) => (
                      <div key={index}>
                        <ShuffleText text={link.label} className="mb-2 text-3xl cursor-default max-md:text-lg text-main" />

                        <ul>
                          {link.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link href={item.to} className="py-1.5 text-sm block">
                                <TextFlipper>{item.label}</TextFlipper>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between items-center p-6 sm:flex-row sm:p-8">
                  <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                    {footerBottomLinks.map((item, index) => (
                      <Link
                        href={item.to}
                        key={index}
                        className="text-sm max-md:text-[11px] max-md:mb-2 block duration-100 text-text/50 hover:text-text/75"
                      >
                        <TextFlipper>{item.label}</TextFlipper>
                      </Link>
                    ))}
                  </div>

                  <div className="flex gap-8">
                    {socialLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        aria-label={item.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm max-md:text-[11px] max-md:mb-2 block duration-100 text-text/50 hover:text-text/75"
                      >
                        <TextFlipper>{item.name}</TextFlipper>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FloatingEffect>
        </div>
      </div>

      <span className="absolute top-0 right-1/2 translate-x-1/2 text-[12px] text-text/60 uppercase backdrop-blur-sm px-1">
        <ShuffleText text={'made by NGM'} />
      </span>
    </section>
  )
}
