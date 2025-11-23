'use client'

import { useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { BgNoise } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

const FAQ = ({ className, faqs = [], title = 'FAQ' }) => {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section ref={sectionRef} className={`relative w-screen overflow-hidden bg-bg text-text pb-48 pt-24 px-4 ${className}`}>
      <BgNoise />

      <div className="flex flex-col justify-center items-start max-w-5xl mx-auto">
        <ShuffleText text={title} tag="h3" className="text-main text-5xl font-light uppercase cursor-default mb-12" />

        <div className="w-full space-y-6 font-light">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item border-b border-main/30 pb-4 cursor-pointer" onClick={() => toggleFAQ(index)}>
              <div className="flex justify-between items-center">
                <h2 className="text-main text-xl">{faq.question}</h2>
                <span className="text-main text-2xl">{openIndex === index ? '−' : '+'}</span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 mt-2' : 'max-h-0'}`}
              >
                <p className="text-text/75">{faq.answer}</p>
              </div>
            </div>
          ))}

          <MainBtn text={t('contactWithUs')} to={'/press'} look="sec" fullWidth className="w-full mt-18" />
        </div>
      </div>
    </section>
  )
}

export default FAQ
