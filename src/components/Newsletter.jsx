'use client'

import { memo, useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { MailIcon, MailOpenIcon } from 'lucide-react'
import { BgNoise, MovingBorders } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { useAlert } from '@/components/app-components/alert/AlertContext.jsx'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

export default memo(function Newsletter() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [email, setEmail] = useState('')
  const { showAlert } = useAlert()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      showAlert('Please enter your email address.', 'error')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlert('Please enter a valid email address.', 'error')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      showAlert('Thank you for subscribing to our newsletter!', 'success')
      setEmail('')
    } catch (error) {
      showAlert('Failed to subscribe. Please try again later.', 'error')
      console.error('Subscription error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useGSAP(() => {
    if (typeof window === 'undefined') return
    if (!formRef.current || !sectionRef.current) return

    const offset = document?.dir === 'ltr' ? 120 : -120

    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: typeof window !== 'undefined' && window.innerWidth > 768 ? offset : 0,
        y: typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 0,
        duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 1,
        delay: 0.3,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-screen overflow-hidden bg-bg text-main border-y border-main/25 px-4 py-24">
      <BgNoise />

      <div className="flex gap-4 justify-between items-center font-light max-lg:flex-col size-full">
        <div className="flex flex-col gap-4 text-start max-lg:text-center">
          <SplitedText text={t(`newsletterTitle`)} tag="h2" className="text-3xl uppercase" delay={30} />
          <SplitedText text={t(`newsletterdesc`)} tag="p" className="text-base text-gray-300 max-md:text-sm me-2" delay={12} />
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          aria-label="newsletter-form"
          className="flex overflow-hidden items-center border-2 size-full lg:max-w-lg border-main/20 text-main max-lg:mt-4"
        >
          <div className="px-4 duration-300 text-main">
            <div className="relative size-6">
              <div className={`absolute inset-0 size-6 transition-opacity duration-300 ${isFocused ? 'opacity-0' : 'opacity-100'}`}>
                <MailIcon />
              </div>

              <div className={`absolute inset-0 size-6 transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}>
                <MailOpenIcon />
              </div>
            </div>
          </div>

          <input
            id="email-input"
            type="email"
            value={email}
            aria-label="Email address"
            placeholder={t('enterYourEmail')}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 px-1 text-lg outline-none size-full text-main"
          />

          <div className={`duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}>
            <MovingBorders />
          </div>

          <MainBtn text={isLoading ? t('subscribing') : t('subscribe')} disabled={isLoading} />
        </form>
      </div>
    </section>
  )
})
