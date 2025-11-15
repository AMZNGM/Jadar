import Link from 'next/link'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import TextFlipper from '@/components/ui/text/TextFlipper.jsx'

export default function DesktopDropdown({
  navigationLinks,
  activeMenuIndex,
  setActiveMenuIndex,
  showNavContent,
  setShowNavContent,
  navItemsRef,
}) {
  useGSAP(() => {
    if (activeMenuIndex === null) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: 'power2.out',
        }
      )
    }, navItemsRef)

    return () => ctx.revert()
  }, [activeMenuIndex])

  return (
    <>
      {(showNavContent || (activeMenuIndex !== null && navigationLinks[activeMenuIndex]?.items?.length > 0)) && (
        <>
          <div
            className={`absolute top-full left-0 w-full bg-bg/75 backdrop-blur-xl shadow-lg pointer-events-auto overflow-hidden duration-500 z-50 ${
              activeMenuIndex !== null ? 'opacity-100' : 'opacity-0'
            }`}
            onMouseLeave={() => {
              const timeout = setTimeout(() => {
                setActiveMenuIndex(null)
                setShowNavContent(false)
              }, 200)
              return () => clearTimeout(timeout)
            }}
          >
            <ul className="flex flex-col justify-center">
              {navigationLinks[activeMenuIndex]?.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  ref={(el) => (navItemsRef.current[itemIndex] = el)}
                  className="group flex items-center gap-4 py-4 px-55"
                >
                  <span className="text-text/25 group-hover:text-main duration-200">{String(itemIndex + 1).padStart(2, '0')}</span>
                  <Link
                    dir={document.dir === 'rtl' ? 'rtl' : 'ltr'}
                    href={item.to}
                    className="block text-3xl px-2 w-full text-text/85 hover:text-text duration-200 rtl:text-end ltr:text-start"
                    onClick={() => setActiveMenuIndex(null)}
                  >
                    <TextFlipper textClassName={`py-4 px-0.5`}>{item.label}</TextFlipper>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}
