'use client'

import { useState } from 'react'
import { BgNoise, MovingBorders } from '@/data/mediaData/svgs'
import { getSocialLinks, contactInfo } from '@/data/contactData'
import { useTranslation } from '@/translations/useTranslation'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import FlowingMenu from '@/components/ui/FlowingMenu.jsx'
import CloseBtn from '@/components/ui/buttons/CloseBtn.jsx'
import Logo from '@/components/ui/logo.jsx'

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null
  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-bg/75 z-50 px-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl flex flex-col justify-center items-center bg-bg border border-text/5 shadow-2xl overflow-hidden py-16 px-4"
      >
        <MovingBorders />
        <BgNoise className="opacity-75" />
        <CloseBtn onClick={onClose} type="sec" />
        <h2 className="text-main text-4xl font-light mb-4">{title}</h2>
        <div className="max-md:text-sm text-center">{children}</div>
      </div>
    </div>
  )
}

export default function GetInTouchHero() {
  const { t } = useTranslation()
  const socialLinks = getSocialLinks(t)
  const [openModal, setOpenModal] = useState(null)

  const panels = [
    {
      text: t('emailUs'),
      desc: 'Reach out to us anytime.',
      image: ArtboardImgs[10],
      type: 'modal',
      content: (
        <p>
          {t(`youCanEmailUsAt`)}{' '}
          <a href={contactInfo.email.mailto} className="text-main underline">
            {contactInfo.email.display}
          </a>
        </p>
      ),
    },
    {
      text: t('callUs'),
      desc: "We're here to help.",
      image: ArtboardImgs[11],
      type: 'modal',
      content: (
        <p>
          {t(`callUsAt`)}{' '}
          <a href={contactInfo.phone.tel} className="text-main underline">
            {contactInfo.phone.display}
          </a>
        </p>
      ),
    },
    {
      text: t('visitUs'),
      desc: 'JADAR HQ, Innovation District.',
      image: ArtboardImgs[12],
      type: 'modal',
      content: (
        <p className="flex flex-col justify-center items-center text-center gap-2">
          📍 {contactInfo.address.line1}, {contactInfo.address.line2}
          <br />
          <a href={contactInfo.address.googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-main underline ml-1">
            {t(`viewOnMaps`)}
          </a>
        </p>
      ),
    },
    {
      text: t('followUs'),
      desc: 'Stay connected with us.',
      image: ArtboardImgs[13],
      type: 'modal',
      content: (
        <div className="flex max-md:flex-col justify-center gap-6 text-nowrap">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              title={item.name}
              rel="noreferrer"
              target="_blank"
              className="size-full"
              style={{ color: item.color }}
            >
              <div className="flex justify-center items-center gap-4 size-full hover:border-x hover:scale-95 p-2 duration-300">
                <span>{item.icon && <item.icon />}</span>
                <span>{item.name}</span>
              </div>
            </a>
          ))}
        </div>
      ),
    },
    {
      text: t('ourBusiness'),
      desc: 'Explore Our Projects.',
      image: ArtboardImgs[14],
      type: 'link',
      to: '/projects',
    },
    {
      text: t('careers'),
      desc: 'Join our growing team.',
      image: ArtboardImgs[15],
      type: 'link',
      to: '/workAtJadar',
    },
    {
      text: t('support'),
      desc: "We're here 24/7.",
      image: ArtboardImgs[16],
      type: 'link',
      to: '/press',
    },
    {
      text: t('media'),
      desc: 'Press & media center.',
      image: ArtboardImgs[17],
      type: 'link',
      to: '/allNews',
    },
  ]

  return (
    <section className="relative w-screen min-h-screen bg-bg text-text max-md:py-8">
      <BgNoise />

      <div className="relative w-full h-screen flex max-md:flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 text-center font-light uppercase tracking-widest mb-12">
          <ShuffleText text={t('getInTouch')} tag="h1" className="text-main/75 text-7xl max-md:text-4xl" />
          <ShuffleText
            text={t('whatOpportunitiesDoesJadarOfferForCollaboration')}
            tag="p"
            className="text-2xl max-md:text-sm cursor-default"
          />
          <div className="w-120 h-0.5 bg-main/30 mt-2 mb-4" />
          <Logo />
        </div>

        <FlowingMenu items={panels} onModalOpen={setOpenModal} />

        {panels.map(
          (card, index) =>
            card.type === 'modal' && (
              <Modal key={index} open={openModal === index} onClose={() => setOpenModal(null)} title={card.text}>
                {card.content}
              </Modal>
            )
        )}
      </div>
    </section>
  )
}
