import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

const BreadcrumbLink = ({ children, className = '', isActive = false, to }) => {
  if (isActive) {
    return <span className={`flex items-center space-x-1 cursor-default text-text ${className}`}>{children}</span>
  }

  return (
    <Link href={to} className={`flex items-center space-x-1 transition-colors duration-200 text-main hover:underline ${className}`}>
      {children}
    </Link>
  )
}

const Breadcrumb = ({ pages = [], showHomeIcon = true, position = 'sticky', className = '' }) => {
  const positionClasses = {
    sticky: 'sticky top-4 left-4',
    fixed: 'fixed top-4 left-4',
    relative: 'relative',
  }

  return (
    <div className={`z-30 mb-2 ${positionClasses[position]} ${className}`}>
      <nav aria-label="breadcrumb" data-slot="breadcrumb" className="flex">
        <ol
          data-slot="breadcrumb-list"
          className={
            'flex flex-wrap items-center gap-2.5 max-sm:gap-1.5 w-full wrap-break-word bg-bg/50 shadow-lg backdrop-blur-sm px-3 py-2'
          }
        >
          {pages.map((page, index) => (
            <React.Fragment key={page.id || page.label}>
              {index > 0 && (
                <li data-slot="breadcrumb-separator" className="inline-flex items-center opacity-60">
                  <ChevronRight size={15} />
                </li>
              )}
              <li
                data-slot="breadcrumb-item"
                className="inline-flex items-center gap-1.5"
                data-page-index={index}
                data-active={page.isActive}
              >
                <BreadcrumbLink to={page.path} isActive={page.isActive} className="text-sm font-light">
                  {showHomeIcon && index === 0 && <Home size={15} />}
                  {(!showHomeIcon || index > 0) && <span>{page.label}</span>}
                  {showHomeIcon && index === 0 && <span className="sr-only">{page.label}</span>}
                </BreadcrumbLink>
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb
