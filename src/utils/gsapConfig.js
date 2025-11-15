import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  if (ScrollTrigger && typeof ScrollTrigger.config === 'function') {
    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
      preventOverlaps: true,
      fastScrollEnd: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    })
  }
}

export { gsap, ScrollTrigger }
