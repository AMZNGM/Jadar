'use client'

import { useEffect, useMemo, useRef, useCallback, useState, memo, forwardRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { BgNoise, MovingBorders } from '@/data/mediaData/svgs'
import articlesData from '@/data/articlesData'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import CloseBtn from '@/components/ui/buttons/CloseBtn.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import Noise from '@/components/ui/effects/Noise.jsx'

const INERTIA_MAX_V = 5.4

const getImagesFromArticles = () => {
  return articlesData.map((article) => ({
    src: article.image,
    alt: article.title,
    article,
  }))
}
const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const normalizeAngle = (d) => ((d % 360) + 360) % 360
const wrapAngleSigned = (deg) => {
  const a = (((deg + 180) % 360) + 360) % 360
  return a - 180
}
const getDataNumber = (el, name, fallback) => {
  const attr = el.dataset?.[name]
  const n = attr == null ? NaN : parseFloat(attr)
  return Number.isFinite(n) ? n : fallback
}
function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2)
  const evenYs = [-4, -2, 0, 2, 4]
  const oddYs = [-3, -1, 1, 3, 5]

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }))
  })

  const totalSlots = coords.length
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: '', alt: '', article: null }))
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`
    )
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === 'string') {
      return { src: image, alt: '', article: null }
    }
    // Handle both object with src property and object with src.src (Next.js Image import)
    const imageSrc = typeof image.src === 'string' ? image.src : image.src?.src || ''
    return {
      src: imageSrc,
      alt: image.alt || '',
      article: image.article || null,
    }
  })

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length])

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i]
          usedImages[i] = usedImages[j]
          usedImages[j] = tmp
          break
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
    article: usedImages[i].article,
  }))
}
function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2
  const rotateY = unit * (offsetX + (sizeX - 1) / 2)
  const rotateX = unit * (offsetY - (sizeY - 1) / 2)
  return { rotateX, rotateY }
}

const OverlayViewer = memo(
  forwardRef(function OverlayViewer(
    { styleObj, article, showArticleInfo, grayscale, openedImageBorderRadius, onClose, onTransitionEnd },
    ref
  ) {
    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={article?.title || 'Image viewer'}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={onTransitionEnd}
        tabIndex={-1}
        className="enlarge absolute flex flex-col md:flex-row bg-bg text-text shadow-2xl shadow-main/20 cursor-auto overflow-hidden z-50"
        style={{
          left: styleObj.left,
          top: styleObj.top,
          width: styleObj.width,
          height: styleObj.height,
          opacity: styleObj.opacity,
          transform: styleObj.transform,
          transition: styleObj.transition,
          borderRadius: openedImageBorderRadius,
          transformOrigin: 'top left',
          willChange: 'transform, opacity',
          pointerEvents: 'auto',
        }}
      >
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article?.image || article?.src}
            alt={article?.alt || article?.title || ''}
            className={`size-full object-cover overflow-hidden relative ${showArticleInfo ? 'flex-[0_0_60%]' : 'flex-1'}`}
            style={{ filter: grayscale ? 'grayscale(1)' : 'none' }}
          />
        </div>

        <MovingBorders />

        {showArticleInfo && article && (
          <div
            className={`relative flex flex-col justify-between gap-4 overflow-y-auto font-light p-4 ${
              showArticleInfo ? 'flex-[0_0_40%]' : ''
            }`}
          >
            <BgNoise />

            <div className="flex justify-between items-start">
              <SplitedText text={article.title} as="h2" className="text-4xl max-md:text-2xl text-main me-8" textColors={'#d73b13'} />

              <CloseBtn onClick={onClose} type="sec" className="hover:rotate-90" />
            </div>

            <div className="flex justify-between items-center border-t border-main/30 py-4 text-sm">
              <span className="bg-main/50 text-bg px-2 py-1">{article.category}</span>
              {article.date && (
                <span className="text-main border border-main/30 px-2 py-1">{new Date(article.date).toLocaleDateString()}</span>
              )}
            </div>

            {article.description && (
              <SplitedText text={article.description} tag="p" delay={25} className="text-base text-text/75 tracking-wide leading-relaxed" />
            )}

            {article.content && (
              <SplitedText
                text={article.content}
                tag="p"
                delay={10}
                className="text-sm text-text/50 tracking-wide leading-normal flex-1 overflow-y-auto max-md:hidden"
              />
            )}

            <MainBtn text="Read Full Article" to={`/allNews/${article.id}`} look="outline" />
          </div>
        )}
      </div>
    )
  })
)

export default function Gallery3d({
  images = getImagesFromArticles(),
  fit = 7,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#000',
  maxVerticalRotationDeg = 5,
  dragSensitivity = 20,
  enlargeTransitionMs = 300,
  segments = 35,
  dragDampening = 2,
  autoRotateSpeed = 0.007,
  openedImageWidth = '90vw',
  openedImageHeight = '70vh',
  imageBorderRadius = '15px',
  openedImageBorderRadius = '0px',
  grayscale = false,
  onImageClick,
  showArticleInfo = true,
}) {
  const rootRef = useRef(null)
  const mainRef = useRef(null)
  const sphereRef = useRef(null)
  const frameRef = useRef(null)
  const viewerRef = useRef(null)
  const scrimRef = useRef(null)
  const focusedElRef = useRef(null)
  const originalTilePositionRef = useRef(null)
  const overlayRef = useRef(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const startRotRef = useRef({ x: 0, y: 0 })
  const startPosRef = useRef(null)
  const draggingRef = useRef(false)
  const cancelTapRef = useRef(false)
  const movedRef = useRef(false)
  const inertiaRAF = useRef(null)
  const pointerTypeRef = useRef('mouse')
  const tapTargetRef = useRef(null)
  const openingRef = useRef(false)
  const openStartedAtRef = useRef(0)
  const lastDragEndAt = useRef(0)
  const scrollLockedRef = useRef(false)
  const currentArticleRef = useRef(null)

  const [overlayOpen, setOverlayOpen] = useState(false)
  const [overlayArticle, setOverlayArticle] = useState(null)
  const [overlayPhase, setOverlayPhase] = useState('idle') // 'entering' | 'resizing' | 'idle'
  const [overlayStyle, setOverlayStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    transform: '',
    opacity: 0,
    transition: '',
  })

  const lockScroll = useCallback(() => {
    if (typeof document === 'undefined') return
    if (scrollLockedRef.current) return
    scrollLockedRef.current = true
    document.body.classList.add('dg-scroll-lock')
  }, [])

  const unlockScroll = useCallback(() => {
    if (typeof document === 'undefined') return
    if (!scrollLockedRef.current) return
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return
    scrollLockedRef.current = false
    document.body.classList.remove('dg-scroll-lock')
  }, [])

  const items = useMemo(() => buildItems(images, segments), [images, segments])

  const applyTransform = useCallback((xDeg, yDeg) => {
    const el = sphereRef.current
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`
    }
  }, [])

  const lockedRadiusRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height)
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h
      let basis
      switch (fitBasis) {
        case 'min':
          basis = minDim
          break
        case 'max':
          basis = maxDim
          break
        case 'width':
          basis = w
          break
        case 'height':
          basis = h
          break
        default:
          basis = aspect >= 1.3 ? w : minDim
      }
      let radius = basis * fit
      const heightGuard = h * 1.35
      radius = Math.min(radius, heightGuard)
      radius = clamp(radius, minRadius, maxRadius)
      lockedRadiusRef.current = Math.round(radius)

      const viewerPad = Math.max(8, Math.round(minDim * padFactor))
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`)
      root.style.setProperty('--viewer-pad', `${viewerPad}px`)
      root.style.setProperty('--overlay-blur-color', overlayBlurColor)
      applyTransform(rotationRef.current.x, rotationRef.current.y)
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, applyTransform])

  useEffect(() => {
    if (typeof window === 'undefined') return
    applyTransform(rotationRef.current.x, rotationRef.current.y)
  }, [applyTransform])

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current)
      inertiaRAF.current = null
    }
  }, [])

  const startInertia = useCallback(
    (vx, vy) => {
      let vX = clamp(vx, -INERTIA_MAX_V, INERTIA_MAX_V) * 80
      let vY = clamp(vy, -INERTIA_MAX_V, INERTIA_MAX_V) * 80
      let frames = 0
      const d = clamp(dragDampening ?? 0.6, 0, 1)
      const frictionMul = 0.94 + 0.055 * d
      const stopThreshold = 0.015 - 0.01 * d
      const maxFrames = Math.round(90 + 270 * d)
      const step = () => {
        vX *= frictionMul
        vY *= frictionMul
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null
          return
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null
          return
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg)
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200)
        rotationRef.current = { x: nextX, y: nextY }
        applyTransform(nextX, nextY)
        inertiaRAF.current = requestAnimationFrame(step)
      }
      stopInertia()
      inertiaRAF.current = requestAnimationFrame(step)
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform]
  )

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return
        stopInertia()

        pointerTypeRef.current = event.pointerType || 'mouse'
        if (pointerTypeRef.current === 'touch') event.preventDefault()
        if (pointerTypeRef.current === 'touch') lockScroll()
        draggingRef.current = true
        // set dragging attribute for cursor styling
        rootRef.current?.setAttribute('data-dragging', 'true')
        cancelTapRef.current = false
        movedRef.current = false
        startRotRef.current = { ...rotationRef.current }
        startPosRef.current = { x: event.clientX, y: event.clientY }
        const potential = event.target.closest?.('.item__image')
        tapTargetRef.current = potential || null
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return

        if (pointerTypeRef.current === 'touch') event.preventDefault()

        const dxTotal = event.clientX - startPosRef.current.x
        const dyTotal = event.clientY - startPosRef.current.y

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal
          if (dist2 > 16) movedRef.current = true
        }

        const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg)
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity

        const cur = rotationRef.current
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY }
          applyTransform(nextX, nextY)
        }

        if (last) {
          draggingRef.current = false
          // remove dragging attribute when interaction ends
          rootRef.current?.removeAttribute('data-dragging')
          let isTap = false

          if (startPosRef.current) {
            const dx = event.clientX - startPosRef.current.x
            const dy = event.clientY - startPosRef.current.y
            const dist2 = dx * dx + dy * dy
            const TAP_THRESH_PX = pointerTypeRef.current === 'touch' ? 10 : 6
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true
            }
          }

          const [vMagX, vMagY] = velArr
          const [dirX, dirY] = dirArr
          let vx = vMagX * dirX
          let vy = vMagY * dirY

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement
            vx = (mx / dragSensitivity) * 0.02
            vy = (my / dragSensitivity) * 0.02
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy)
          }
          startPosRef.current = null
          cancelTapRef.current = !isTap

          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            openItemFromElement(tapTargetRef.current)
          }
          tapTargetRef.current = null

          if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120)
          if (movedRef.current) lastDragEndAt.current = performance.now()
          movedRef.current = false
          if (pointerTypeRef.current === 'touch') unlockScroll()
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } }
  )

  const cleanupAfterClose = useCallback((el) => {
    const parent = el.parentElement
    const refDiv = parent.querySelector('.item__image--reference')

    originalTilePositionRef.current = null
    if (refDiv) refDiv.remove()
    parent.style.transition = 'none'
    el.style.transition = 'none'
    parent.style.setProperty('--rot-y-delta', '0deg')
    parent.style.setProperty('--rot-x-delta', '0deg')

    requestAnimationFrame(() => {
      el.style.visibility = ''
      el.style.opacity = '0'
      el.style.zIndex = 0
      focusedElRef.current = null
      currentArticleRef.current = null
      rootRef.current?.removeAttribute('data-enlarging')

      requestAnimationFrame(() => {
        parent.style.transition = ''
        el.style.transition = 'opacity 300ms ease-out'
        requestAnimationFrame(() => {
          el.style.opacity = '1'
          setTimeout(() => {
            el.style.transition = ''
            el.style.opacity = ''
            openingRef.current = false
            setOverlayOpen(false)
            setOverlayArticle(null)
            setOverlayPhase('idle')
            if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true')
              document.body.classList.remove('dg-scroll-lock')
          }, 300)
        })
      })
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const scrim = scrimRef.current
    if (!scrim) return

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return
      const el = focusedElRef.current
      if (!el) return

      // Animate overlay back to the original tile
      const originalPos = originalTilePositionRef.current
      if (!originalPos) {
        // No original, just cleanup
        cleanupAfterClose(el)
        return
      }

      const frameR = frameRef.current.getBoundingClientRect()
      const mainR = mainRef.current.getBoundingClientRect()

      const tx0 = originalPos.left - frameR.left
      const ty0 = originalPos.top - frameR.top
      const sx0 = originalPos.width / frameR.width
      const sy0 = originalPos.height / frameR.height

      setOverlayStyle((prev) => ({
        ...prev,
        left: frameR.left - mainR.left,
        top: frameR.top - mainR.top,
        width: frameR.width,
        height: frameR.height,
        transition: `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`,
        transform: `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`,
        opacity: 0,
      }))

      setOverlayPhase('closing')
    }

    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }

    scrim.addEventListener('click', close)
    window.addEventListener('keydown', onKey)
    return () => {
      scrim.removeEventListener('click', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [enlargeTransitionMs, cleanupAfterClose])

  const TRANSFORM_EASE = useMemo(
    () => `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`,
    [enlargeTransitionMs]
  )

  const RESIZE_EASE = useMemo(
    () =>
      `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`,
    [enlargeTransitionMs]
  )

  const openItemFromElement = useCallback(
    (el) => {
      if (!el || cancelTapRef.current) return
      if (openingRef.current) return
      openingRef.current = true
      openStartedAtRef.current = performance.now()
      lockScroll()
      const parent = el.parentElement
      focusedElRef.current = el
      el.setAttribute('data-focused', 'true')

      const offsetX = getDataNumber(parent, 'offsetX', 0)
      const offsetY = getDataNumber(parent, 'offsetY', 0)
      const sizeX = getDataNumber(parent, 'sizeX', 2)
      const sizeY = getDataNumber(parent, 'sizeY', 2)

      const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments)
      const parentY = normalizeAngle(parentRot.rotateY)
      const globalY = normalizeAngle(rotationRef.current.y)
      let rotY = -(parentY + globalY) % 360
      if (rotY < -180) rotY += 360
      const rotX = -parentRot.rotateX - rotationRef.current.x

      parent.style.setProperty('--rot-y-delta', `${rotY}deg`)
      parent.style.setProperty('--rot-x-delta', `${rotX}deg`)

      const refDiv = document.createElement('div')
      refDiv.className = 'item__image item__image--reference absolute inset-[10px] opacity-0 pointer-events-none'
      refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`
      parent.appendChild(refDiv)

      const tileR = refDiv.getBoundingClientRect()
      const mainR = mainRef.current.getBoundingClientRect()
      const frameR = frameRef.current.getBoundingClientRect()

      originalTilePositionRef.current = {
        left: tileR.left,
        top: tileR.top,
        width: tileR.width,
        height: tileR.height,
      }

      el.style.visibility = 'hidden'
      el.style.zIndex = 0

      const rawSrc = parent.dataset.src || el.querySelector('img')?.src || ''
      const rawAlt = parent.dataset.alt || el.querySelector('img')?.alt || ''

      // Find the article data
      const articleData = items.find((item) => item.src === rawSrc || item.alt === rawAlt)?.article
      currentArticleRef.current = articleData
      setOverlayArticle(articleData ? { ...articleData, image: rawSrc, alt: rawAlt } : { image: rawSrc, alt: rawAlt })

      // Prepare initial overlay style and open
      const tx0 = tileR.left - frameR.left
      const ty0 = tileR.top - frameR.top
      const sx0 = tileR.width / frameR.width
      const sy0 = tileR.height / frameR.height

      setOverlayStyle({
        left: frameR.left - mainR.left,
        top: frameR.top - mainR.top,
        width: frameR.width,
        height: frameR.height,
        transform: `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`,
        opacity: 0,
        transition: TRANSFORM_EASE,
      })
      setOverlayOpen(true)
      rootRef.current?.setAttribute('data-enlarging', 'true')

      // Next frame: animate to full size
      requestAnimationFrame(() => {
        setOverlayStyle((prev) => ({
          ...prev,
          transform: 'translate(0px, 0px) scale(1, 1)',
          opacity: 1,
        }))
        setOverlayPhase('entering')
      })

      // Call the onImageClick callback if provided (for the main image click)
      if (onImageClick && !showArticleInfo) {
        onImageClick(articleData)
      }
    },
    [lockScroll, segments, TRANSFORM_EASE, onImageClick, showArticleInfo, items]
  )

  const handleOverlayTransitionEnd = useCallback(
    (ev) => {
      if (overlayPhase === 'entering' && ev.propertyName === 'transform') {
        const wantsResize = openedImageWidth || openedImageHeight
        if (!wantsResize) {
          setOverlayPhase('idle')
          return
        }
        const overlayEl = overlayRef.current
        if (!overlayEl) {
          setOverlayPhase('idle')
          return
        }

        const frameR = frameRef.current.getBoundingClientRect()
        const mainR = mainRef.current.getBoundingClientRect()

        const prevTransition = overlayEl.style.transition
        const prevWidth = overlayEl.style.width
        const prevHeight = overlayEl.style.height
        overlayEl.style.transition = 'none'
        const tempWidth = openedImageWidth || `${frameR.width}px`
        const tempHeight = openedImageHeight || `${frameR.height}px`
        overlayEl.style.width = typeof tempWidth === 'number' ? `${tempWidth}px` : tempWidth
        overlayEl.style.height = typeof tempHeight === 'number' ? `${tempHeight}px` : tempHeight
        const newRect = overlayEl.getBoundingClientRect()
        overlayEl.style.width = prevWidth
        overlayEl.style.height = prevHeight
        overlayEl.style.transition = prevTransition

        const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2
        const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2

        setOverlayStyle((prev) => ({
          ...prev,
          transition: RESIZE_EASE,
          left: centeredLeft,
          top: centeredTop,
          width: typeof tempWidth === 'number' ? `${tempWidth}px` : tempWidth,
          height: typeof tempHeight === 'number' ? `${tempHeight}px` : tempHeight,
        }))
        setOverlayPhase('resizing')
        return
      }

      if (overlayPhase === 'resizing' && ['left', 'top', 'width', 'height'].includes(ev.propertyName)) {
        setOverlayPhase('idle')
        return
      }

      if (overlayPhase === 'closing' && (ev.propertyName === 'transform' || ev.propertyName === 'opacity')) {
        const el = focusedElRef.current
        if (!el) return
        cleanupAfterClose(el)
      }
    },
    [RESIZE_EASE, openedImageWidth, openedImageHeight, overlayPhase, cleanupAfterClose]
  )

  const closeOverlay = useCallback(
    (e) => {
      if (e) e.stopPropagation()
      const el = focusedElRef.current
      if (!el) return
      const originalPos = originalTilePositionRef.current
      const frameR = frameRef.current.getBoundingClientRect()
      const mainR = mainRef.current.getBoundingClientRect()
      if (!originalPos) {
        cleanupAfterClose(el)
        return
      }
      const tx0 = originalPos.left - frameR.left
      const ty0 = originalPos.top - frameR.top
      const sx0 = originalPos.width / frameR.width
      const sy0 = originalPos.height / frameR.height
      setOverlayStyle((prev) => ({
        ...prev,
        left: frameR.left - mainR.left,
        top: frameR.top - mainR.top,
        width: frameR.width,
        height: frameR.height,
        transition: TRANSFORM_EASE,
        transform: `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`,
        opacity: 0,
      }))
      setOverlayPhase('closing')
    },
    [TRANSFORM_EASE, cleanupAfterClose]
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    let rafId = null
    const running = true

    const degPerFrame = autoRotateSpeed

    const tick = () => {
      const isDragging = draggingRef.current
      const isEnlarging = rootRef.current?.getAttribute('data-enlarging') === 'true'
      if (!isDragging && !isEnlarging) {
        const nextX = rotationRef.current.x
        const nextY = wrapAngleSigned(rotationRef.current.y + degPerFrame)
        rotationRef.current = { x: nextX, y: nextY }
        applyTransform(nextX, nextY)
      }
      if (running) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [autoRotateSpeed, applyTransform])

  useEffect(() => {
    return () => {
      document.body.classList.remove('dg-scroll-lock')
    }
  }, [])

  return (
    <section
      ref={rootRef}
      className="sphere-root group relative w-screen h-screen overflow-hidden bg-bg text-text"
      style={{
        ['--segments-x']: segments,
        ['--segments-y']: segments,
        ['--overlay-blur-color']: overlayBlurColor,
      }}
    >
      <Noise />

      <main
        ref={mainRef}
        className="absolute inset-0 grid place-items-center overflow-hidden select-none touch-none bg-transparent cursor-grab group-data-[dragging=true]:cursor-grabbing"
      >
        {/* stage */}
        <div
          className="stage size-full grid place-items-center absolute inset-0 m-auto cursor-grab group-data-[dragging=true]:cursor-grabbing"
          style={{ perspective: 'calc(var(--radius) * 2)', perspectiveOrigin: '50% 50%' }}
        >
          <div ref={sphereRef} className="sphere absolute will-change-transform cursor-grab group-data-[dragging=true]:cursor-grabbing">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="sphere-item absolute m-auto transform-style-3d backface-hidden transition-transform duration-300"
                data-src={it.src}
                data-alt={it.alt}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                data-article-id={it.article?.id || ''}
                style={{
                  ['--offset-x']: it.x,
                  ['--offset-y']: it.y,
                  ['--item-size-x']: it.sizeX,
                  ['--item-size-y']: it.sizeY,
                  top: '-999px',
                  bottom: '-999px',
                  left: '-999px',
                  right: '-999px',
                }}
              >
                <div
                  className="item__image absolute block overflow-hidden bg-text transition-transform duration-300 transform-style-3d backface-hidden cursor-pointer pointer-events-auto"
                  role="button"
                  tabIndex={0}
                  aria-label={it.alt || 'Open image'}
                  onClick={(e) => {
                    if (performance.now() - lastDragEndAt.current < 80) return
                    openItemFromElement(e.currentTarget)
                  }}
                  onTouchEnd={(e) => {
                    if (performance.now() - lastDragEndAt.current < 80) return
                    openItemFromElement(e.currentTarget)
                  }}
                  style={{
                    inset: '10px',
                    borderRadius: imageBorderRadius,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={typeof it.src === 'string' ? it.src : ''}
                    draggable={false}
                    alt={it.alt}
                    className="size-full object-cover pointer-events-none backface-hidden"
                    style={{
                      filter: grayscale ? 'grayscale(1)' : 'none',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays */}
        <div>
          <div className="absolute inset-0 m-auto z-3 pointer-events-none bg-[radial-gradient(rgba(235,235,235,0)_65%,var(--overlay-blur-color,#000)_100%)]" />
          <div className="absolute inset-0 m-auto z-3 pointer-events-none backdrop-blur-sm mask-[radial-gradient(rgba(235,235,235,0)_70%,var(--overlay-blur-color,#000)_90%)]" />
          <div className="absolute left-0 right-0 top-0 h-30 z-5 pointer-events-none rotate-180 bg-[linear-gradient(to_bottom,transparent,var(--overlay-blur-color,#000))]" />
          <div className="absolute left-0 right-0 bottom-0 h-30 z-5 pointer-events-none bg-[linear-gradient(to_bottom,transparent,var(--overlay-blur-color,#000))]" />
        </div>

        {/* Viewer section */}
        <div
          ref={viewerRef}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-20"
          style={{ padding: 'var(--viewer-pad)' }}
        >
          {overlayOpen && (
            <OverlayViewer
              ref={overlayRef}
              styleObj={overlayStyle}
              article={overlayArticle}
              showArticleInfo={showArticleInfo}
              grayscale={grayscale}
              openedImageBorderRadius={openedImageBorderRadius}
              onClose={closeOverlay}
              onTransitionEnd={handleOverlayTransitionEnd}
            />
          )}
          <div
            ref={scrimRef}
            className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500 bg-black/40 backdrop-blur-sm group-data-[enlarging=true]:opacity-100 group-data-[enlarging=true]:pointer-events-auto"
          />
          <div
            ref={frameRef}
            className="viewer-frame h-full aspect-square flex rounded-lg"
            style={{ borderRadius: openedImageBorderRadius }}
          />
        </div>
      </main>

      <style>{`
        .sphere-root {
          --radius: 520px;
          --viewer-pad: 72px;
          --circ: calc(var(--radius) * 3.14);
          --rot-y: calc((360deg / var(--segments-x)) / 2);
          --rot-x: calc((360deg / var(--segments-y)) / 2);
          --item-width: calc(var(--circ) / var(--segments-x));
          --item-height: calc(var(--circ) / var(--segments-y));
        }

        .sphere,
        .sphere-item,
        .item__image {
          transform-style: preserve-3d;
        }

        .stage {
          perspective: calc(var(--radius) * 2);
          perspective-origin: 50% 50%;
        }

        .sphere {
          transform: translateZ(calc(var(--radius) * -1));
          will-change: transform;
        }

        .sphere-item {
          width: calc(var(--item-width) * var(--item-size-x));
          height: calc(var(--item-height) * var(--item-size-y));
          transform-origin: 50% 50%;
          backface-visibility: hidden;
          transform: rotateY(
              calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))
            )
            rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg)))
            translateZ(var(--radius));
        }

        .sphere-root[data-enlarging="true"] .scrim {
          opacity: 1 !important;
          pointer-events: all !important;
        }

        .item__image {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        /* Cursor behavior */
        .sphere-root main,
        .sphere-root .stage,
        .sphere-root .sphere {
          cursor: grab;
        }
        .sphere-root[data-dragging="true"] main,
        .sphere-root[data-dragging="true"] .stage,
        .sphere-root[data-dragging="true"] .sphere {
          cursor: grabbing;
        }
        /* Items are clickable when not dragging */
        .sphere-root .item__image { cursor: pointer; }
        .sphere-root[data-dragging="true"] .item__image { cursor: grabbing !important; }

        @media (max-width: 768px) {
          .enlarge {
            flex-direction: column !important;
          }

          .enlarge > div:first-child {
            flex: 0 0 40% !important;
          }

          .enlarge > div:last-child {
            flex: 0 0 60% !important;
          }
        }
      `}</style>
    </section>
  )
}
