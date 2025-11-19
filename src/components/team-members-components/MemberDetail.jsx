import Image from 'next/image'
import { BgNoise } from '@/data/mediaData/svgs'
import { ArtboardImgs } from '@/data/mediaData/artBoardImgs'
import CloseBtn from '@/components/ui/buttons/CloseBtn.jsx'
import TextFlipper from '@/components/ui/text/TextFlipper.jsx'

export default function MemberDetail({
  isOpen,
  onClose,
  member,
  selectedLanguage,
  overlayRef,
  bottombarRef,
  detailImgRef,
  nameRef,
  roleRef,
  bioRef,
  contactRefs,
}) {
  if (!isOpen || !member) return null

  const FallbackImg = ArtboardImgs[10]
  const handleImageError = (e) => {
    e.target.src = FallbackImg
  }

  const contactItems = [
    {
      href: `mailto:${member.email}`,
      label: member.email,
      icon: '📨',
    },
    {
      href: `tel:${member.phone}`,
      label: member.phone,
      icon: '📞',
    },
    {
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(member.location)}`,
      label: member.location,
      icon: '📍',
      external: true,
    },
  ]

  return (
    <div className="fixed inset-0 z-50">
      <div ref={overlayRef} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer" />

      <div
        ref={bottombarRef}
        className="absolute bottom-0 left-0 w-full h-140 bg-bg/90 border-t border-text/10 shadow-2xl backdrop-blur-xl overflow-y-auto"
      >
        <BgNoise />
        <CloseBtn onClick={onClose} />

        <MemberHeader
          member={member}
          selectedLanguage={selectedLanguage}
          detailImgRef={detailImgRef}
          nameRef={nameRef}
          roleRef={roleRef}
          bioRef={bioRef}
          onImageError={handleImageError}
        />

        <MemberContacts member={member} contactItems={contactItems} contactRefs={contactRefs} />
      </div>
    </div>
  )
}

const MemberHeader = ({ member, selectedLanguage, detailImgRef, nameRef, roleRef, bioRef, onImageError }) => (
  <div className="flex flex-col gap-6 items-center px-6 pt-10 pb-6 border-b lg:flex-row border-text/10">
    <Image
      ref={detailImgRef}
      src={member.image || FallbackImg}
      alt={member.name}
      loading="lazy"
      onError={onImageError}
      className="object-cover w-28 h-28 border shadow-lg lg:w-32 lg:h-32 border-main/20"
    />
    <div className="text-center lg:text-left">
      <h2 ref={nameRef} className="text-2xl font-semibold lg:text-3xl text-text">
        {member.name}
      </h2>
      <p ref={roleRef} className="text-lg font-light text-main/80">
        {member.role}
      </p>
    </div>
    <p
      ref={bioRef}
      className={`
        font-light leading-relaxed text-text/90 lg:ml-auto lg:max-w-2xl lg:text-left border-s border-text/10 ps-4
        ${selectedLanguage === 'English' ? 'text-left!' : 'text-right!'}
      `}
    >
      {member.bio}
    </p>
  </div>
)

const MemberContacts = ({ member, contactItems, contactRefs }) => (
  <div className="flex flex-wrap gap-6 justify-center items-center px-6 py-8 max-md:flex-col lg:justify-around text-text/90">
    {contactItems.map((item, index) => (
      <ContactItem key={index} item={item} ref={(el) => (contactRefs.current[index] = el)} />
    ))}
    <JoinDate member={member} ref={(el) => (contactRefs.current[3] = el)} />
  </div>
)

const ContactItem = ({ item, ref }) => (
  <a
    ref={ref}
    href={item.href}
    target={item.external ? '_blank' : '_self'}
    rel={item.external ? 'noopener noreferrer' : undefined}
    className="flex gap-2 items-center p-3 text-lg transition-colors hover:text-main"
  >
    <span className="text-xl">{item.icon}</span>
    <TextFlipper tracking={'w-1'}>{item.label}</TextFlipper>
  </a>
)

const JoinDate = ({ member, ref }) => (
  <p ref={ref} className="flex gap-1 items-center p-3 text-sm border text-text/70 bg-text/2 border-text/10">
    🗓 Join date:{' '}
    {new Date(member.joinDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
  </p>
)
