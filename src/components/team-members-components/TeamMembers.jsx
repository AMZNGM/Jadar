'use client'

import { useMemo } from 'react'
import { BgNoise } from '@/data/mediaData/svgs'
import { useTranslation } from '@/translations/useTranslation'
import { useLanguage } from '@/translations/LanguageContext'
import { teamMembers } from '@/data/teamMembersData'
import { useTeamMembersLogic } from '@/components/team-members-components/hooks/useTeamMembersLogic'
import { useTeamMembersAnimation } from '@/components/team-members-components/hooks/useTeamMembersAnimation'
import SearchBar from '@/components/team-members-components/SearchBar.jsx'
import StickyImage from '@/components/team-members-components/StickyImage'
import TeamList from '@/components/team-members-components/TeamList'
import QuadtreeSection from '@/components/team-members-components/QuadtreeSection'
import MemberDetail from '@/components/team-members-components/MemberDetail'

export default function TeamMembers() {
  const { t } = useTranslation()
  const { selectedLanguage } = useLanguage()
  const teamMember = useMemo(() => teamMembers(t), [t])
  const { query, setQuery, activeIndex, setActiveIndex, selectedMember, bottombarOpen, filteredMembers, closebottombar, openbottombar } =
    useTeamMembersLogic(teamMember)
  const {
    stickyImgRef,
    stickyImgContainerRef,
    detailImgRef,
    overlayRef,
    bottombarRef,
    nameRef,
    roleRef,
    bioRef,
    contactRefs,
    namesRef,
    quadtreeRef,
    svgRef,
    polylineRef,
    markerRef,
  } = useTeamMembersAnimation({
    activeIndex,
    setActiveIndex,
    filteredMembers,
    bottombarOpen,
    selectedMember,
    closebottombar,
  })

  return (
    <section dir="ltr" className="relative w-screen min-h-screen bg-bg text-text px-4">
      <BgNoise />
      <SearchBar query={query} setQuery={setQuery} />

      <div className="flex flex-row-reverse max-md:overflow-hidden gap-8 pb-24">
        <StickyImage
          member={filteredMembers[activeIndex]}
          isVisible={filteredMembers.length > 0 && !!filteredMembers[activeIndex]}
          stickyImgRef={stickyImgRef}
          stickyImgContainerRef={stickyImgContainerRef}
          onMemberClick={() => openbottombar(filteredMembers[activeIndex], activeIndex)}
        />

        <TeamList members={filteredMembers} activeIndex={activeIndex} namesRef={namesRef} onMemberClick={openbottombar} />
      </div>

      <QuadtreeSection quadtreeRef={quadtreeRef} svgRef={svgRef} polylineRef={polylineRef} markerRef={markerRef} />

      <MemberDetail
        isOpen={bottombarOpen}
        onClose={closebottombar}
        member={selectedMember}
        selectedLanguage={selectedLanguage}
        overlayRef={overlayRef}
        bottombarRef={bottombarRef}
        detailImgRef={detailImgRef}
        nameRef={nameRef}
        roleRef={roleRef}
        bioRef={bioRef}
        contactRefs={contactRefs}
      />
    </section>
  )
}
