'use client'

import { memo, useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'

const DURATION = 0.25
const STAGGER = 0.025

export default memo(function TextFlipper({ className, textClassName, children, tracking = 'w-1', tag = 'h4' }) {
  const containerRef = useRef(null)
  const topSpansRef = useRef([])
  const bottomSpansRef = useRef([])

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Filter out any null/undefined refs
      const topSpans = topSpansRef.current.filter(Boolean)
      const bottomSpans = bottomSpansRef.current.filter(Boolean)

      if (topSpans.length === 0 || bottomSpans.length === 0) return

      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          // Ensure elements are in their original state when animation is reversed
          gsap.set(topSpans, { y: '0%' })
          gsap.set(bottomSpans, { y: '100%' })
        },
      })

      topSpans.forEach((span, i) => {
        if (span) {
          tl.to(
            span,
            {
              y: '-100%',
              duration: DURATION,
              ease: 'power2.inOut',
              delay: i * STAGGER,
            },
            0
          )
        }
      })

      bottomSpans.forEach((span, i) => {
        if (span) {
          tl.fromTo(
            span,
            { y: '100%' },
            {
              y: '0%',
              duration: DURATION,
              ease: 'power2.inOut',
              delay: i * STAGGER,
            },
            0
          )
        }
      })

      containerRef.current._animation = tl

      return () => {
        if (containerRef.current?._animation) {
          containerRef.current._animation.kill()
          delete containerRef.current._animation
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [children])

  const handleMouseEnter = () => {
    if (containerRef.current?._animation) {
      // Ensure all elements are in their starting positions before playing
      const topSpans = topSpansRef.current.filter(Boolean)
      const bottomSpans = bottomSpansRef.current.filter(Boolean)

      gsap.set(topSpans, { y: '0%' })
      gsap.set(bottomSpans, { y: '100%' })

      containerRef.current._animation.play(0)
    }
  }

  const handleMouseLeave = () => {
    if (containerRef.current?._animation) {
      containerRef.current._animation.reverse()
    }
  }

  const isText = typeof children === 'string'
  const content = isText ? children.split(/(\s+)/) : [children]

  const Tag = tag

  return (
    <Tag
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative block overflow-hidden ${isText ? 'whitespace-nowrap' : ''} ${className}`}
    >
      <div>
        {content.map((item, i) => (
          <span
            ref={(el) => {
              if (el) topSpansRef.current[i] = el
            }}
            className={`inline-flex justify-center items-center gap-1 will-change-transform ${
              isText && item.trim() === '' ? `${tracking}` : ''
            }`}
            key={`top-${i}`}
          >
            <div className={`flex justify-center items-center gap-4 ${textClassName}`}>{item}</div>
          </span>
        ))}
      </div>
      <div className="absolute inset-0">
        {content.map((item, i) => (
          <span
            ref={(el) => {
              if (el) bottomSpansRef.current[i] = el
            }}
            className={`inline-flex justify-center items-center gap-1 will-change-transform ${
              isText && item.trim() === '' ? `${tracking}` : ''
            }`}
            key={`bottom-${i}`}
          >
            <div className={`flex justify-center items-center gap-4 ${textClassName}`}>{item}</div>
          </span>
        ))}
      </div>
    </Tag>
  )
})
