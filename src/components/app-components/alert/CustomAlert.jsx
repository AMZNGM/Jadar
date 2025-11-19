'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { Ban, CheckCheck, InfoIcon, MailWarning } from 'lucide-react'
import { useGSAP } from '@gsap/react'

const icons = {
  success: <CheckCheck />,
  error: <Ban />,
  warning: <MailWarning />,
  info: <InfoIcon />,
}

const colors = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-bg text-main border-main',
  warning: 'bg-main text-text border-main',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
}

export default function CustomAlert({ type = 'info', message, onClose, duration = 3000 }) {
  const alertRef = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useGSAP(() => {
    if (!alertRef.current || !isClient) return

    gsap.fromTo(alertRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })

    const timer = setTimeout(() => {
      if (alertRef.current) {
        gsap.to(alertRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
          onComplete: onClose,
        })
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration, isClient])

  if (!isClient) {
    return null
  }

  return (
    <div
      ref={alertRef}
      role="alert"
      aria-live="polite"
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-center gap-10 px-4 py-3 border ${colors[type]} z-50`}
    >
      {icons[type]}
      <span className="text-sm font-light">{message}</span>
      <button
        onClick={onClose}
        aria-label="Close alert"
        className="ml-3 text-sm font-semibold opacity-60 hover:opacity-100 transition cursor-pointer"
      >
        ✕
      </button>
    </div>
  )
}
