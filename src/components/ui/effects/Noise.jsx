'use client'

import { useRef, useEffect } from 'react'

export default function Noise({
  className = '',
  opacity = 0.15,
  refreshRate = 80, // ms between refresh frames
  scale = 2, // how zoomed-in the noise looks
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    const size = 500 // small for high performance

    canvas.width = size
    canvas.height = size

    let intervalId

    const renderNoise = () => {
      const imageData = ctx.createImageData(size, size)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = opacity * 255
      }

      ctx.putImageData(imageData, 0, 0)
    }

    renderNoise()

    intervalId = setInterval(renderNoise, refreshRate) // update 10–15 fps, not 60 fps → huge performance gain

    return () => clearInterval(intervalId)
  }, [opacity, refreshRate])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 size-full mix-blend-overlay pointer-events-none ${className}`}
      style={{
        opacity,
        imageRendering: 'pixelated',
        filter: 'contrast(120%) brightness(150%)',
        backgroundSize: `${scale * 100}%`,
      }}
    />
  )
}
