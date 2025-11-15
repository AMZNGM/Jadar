export default function NavbarOverlay({ activeMenuIndex, setActiveMenuIndex, mobileMenuOpen, setMobileMenuOpen }) {
  const handleClick = () => {
    if (activeMenuIndex !== null) {
      setActiveMenuIndex(null)
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  const isVisible = activeMenuIndex !== null || mobileMenuOpen

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 top-full h-[200vh] bg-bg/75 backdrop-blur-sm duration-500 z-40 ${
        isVisible ? 'opacity-80' : 'opacity-0 pointer-events-none'
      }`}
    />
  )
}
