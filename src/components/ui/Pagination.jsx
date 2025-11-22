import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={`relative size-full flex justify-center items-center text-main z-20 ${className}`}
      {...props}
    />
  )
}

export function PaginationContent({ className, ...props }) {
  return <ul data-slot="pagination-content" className={`flex justify-center items-center gap-1 ${className}`} {...props} />
}

export function PaginationItem({ ...props }) {
  return <li data-slot="pagination-item" {...props} />
}

export function PaginationLink({ className, isActive, size = 'icon', ...props }) {
  return (
    <a
      data-slot="pagination-link"
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive}
      className={`flex justify-center items-center hover:bg-main/50 duration-100 cursor-pointer px-4 py-2 ${
        isActive ? 'outline' : 'ghost'
      } ${size} ${className}`}
      {...props}
    />
  )
}

export function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink size="default" aria-label="Go to previous page" className={`${className}`} {...props}>
      <ChevronLeft className="size-7 rotate-180" />
    </PaginationLink>
  )
}

export function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink size="default" aria-label="Go to next page" className={`${className}`} {...props}>
      <ChevronRight className="size-7" />
    </PaginationLink>
  )
}
