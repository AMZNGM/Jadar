import { useState, useEffect, useMemo, useCallback } from 'react'

export const useTeamMembersLogic = (teamMember) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedMember, setSelectedMember] = useState(null)
  const [bottombarOpen, setBottombarOpen] = useState(false)

  // Search debouncing
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(t)
  }, [query])

  const filteredMembers = useMemo(
    () => (teamMember || []).filter((m) => [m.name, m.role].some((f) => f.toLowerCase().includes(debouncedQuery.toLowerCase()))),
    [debouncedQuery, teamMember]
  )

  useEffect(() => {
    if (activeIndex >= filteredMembers.length) setActiveIndex(0)
  }, [filteredMembers, activeIndex])

  // Preload images
  useEffect(() => {
    if (typeof window === 'undefined') return

    const img = new Image()
    const imageSrc = filteredMembers[activeIndex]?.image?.src || filteredMembers[activeIndex]?.image

    if (imageSrc) {
      img.src = typeof imageSrc === 'string' ? imageSrc : imageSrc.src
    }
  }, [activeIndex, filteredMembers])

  const openbottombar = useCallback((member, idx) => {
    setSelectedMember(member)
    setActiveIndex(idx)
    setBottombarOpen(true)
  }, [])

  const closebottombar = useCallback(() => {
    setBottombarOpen(false)
    setSelectedMember(null)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!filteredMembers.length) return
      if (e.key === 'ArrowDown') setActiveIndex((p) => (p + 1) % filteredMembers.length)
      else if (e.key === 'ArrowUp') setActiveIndex((p) => (p - 1 + filteredMembers.length) % filteredMembers.length)
      else if (e.key === 'Enter') openbottombar(filteredMembers[activeIndex], activeIndex)
      else if (e.key === 'Escape' && bottombarOpen) closebottombar()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [filteredMembers, activeIndex, bottombarOpen, closebottombar, openbottombar])

  return {
    query,
    setQuery,
    debouncedQuery,
    activeIndex,
    setActiveIndex,
    selectedMember,
    setSelectedMember,
    bottombarOpen,
    setBottombarOpen,
    filteredMembers,
    closebottombar,
    openbottombar,
  }
}
