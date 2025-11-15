import Link from 'next/link'
import ClickEffect from '@/components/ui/effects/ClickEffect'

export default function HoverEffect({
  children,
  ariaExpanded,
  to,
  onClick,
  isActive = false,
  className = '',
  activeClass = 'after:opacity-100 after:scale-x-100',
  baseClass = 'relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-text/20 after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100 after:duration-500',
}) {
  const content = (
    <ClickEffect aria-expanded={ariaExpanded} onClick={onClick} className={`${baseClass} ${isActive ? activeClass : ''} ${className}`}>
      {children}
    </ClickEffect>
  )

  if (to) {
    return <Link href={to}>{content}</Link>
  }

  return content
}
