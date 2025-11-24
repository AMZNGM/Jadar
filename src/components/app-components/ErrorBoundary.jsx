'use client'

import React from 'react'
import { gsap } from '@/utils/gsapConfig'
import { TriangleAlert } from 'lucide-react'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import ShinyText from '@/components/ui/text/ShinyText'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }

    this.containerRef = React.createRef()
    this.iconRef = React.createRef()
    this.h1Ref = React.createRef()
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error)
    this.setState({ error, errorInfo })
  }

  componentDidUpdate() {
    if (!this.state.hasError) return
    if (typeof window === 'undefined') return

    gsap.fromTo(this.containerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })

    gsap.fromTo(
      this.iconRef.current,
      { opacity: 0.7, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut',
        delay: 0.2,
      }
    )

    gsap.fromTo(this.h1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="overflow-hidden">
          <div ref={this.containerRef} className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-bg">
            <div ref={this.iconRef} className="mb-6">
              <TriangleAlert className="size-34 text-main" />
            </div>

            <h1 ref={this.h1Ref} className="text-4xl md:text-5xl font-bold mb-4 text-main">
              <ShinyText text="Oops! Something went wrong" textColor="#d73b13" />
            </h1>

            <p className="text-base sm:text-lg md:text-xl max-w-2xl text-text/50 leading-relaxed mb-8">
              We are sorry, but something unexpected happened. Please try refreshing the page.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <MainBtn onClick={() => window.location.reload()} text="Refresh Page" look="outline" fullWidth />

              <MainBtn
                onClick={() => {
                  window.location.href = '/'
                }}
                text="Go Home"
                look="outline"
                fullWidth
              />
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left max-w-2xl">
                <summary className="cursor-pointer font-semibold mb-2 text-sec">Error Details (Development)</summary>

                <div className="bg-bgLight p-4 rounded-lg text-sm overflow-auto">
                  <pre className="whitespace-pre-wrap">{String(this.state.error)}</pre>
                  <pre className="whitespace-pre-wrap mt-2">{this.state.errorInfo?.componentStack}</pre>
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
