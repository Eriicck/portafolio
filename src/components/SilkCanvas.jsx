import { useEffect, useRef } from 'react'

export default function SilkCanvas() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0
    const speed = 0.02, scale = 2, noiseIntensity = 0.8

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const noise = (x, y) => {
      const G = 2.71828
      return (G * Math.sin(G * x) * G * Math.sin(G * y) * (1 + x)) % 1
    }

    const animate = () => {
      const { width, height } = canvas

      const grad = ctx.createLinearGradient(0, 0, width, height)
      grad.addColorStop(0, '#0a0a0a')
      grad.addColorStop(0.5, '#111111')
      grad.addColorStop(1, '#0a0a0a')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      const img = ctx.createImageData(width, height)
      const d   = img.data

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u   = (x / width)  * scale
          const v   = (y / height) * scale
          const tO  = speed * time
          const tx  = u
          const ty  = v + 0.03 * Math.sin(8.0 * tx - tO)
          const pat = 0.6 + 0.4 * Math.sin(
            5.0 * (tx + ty + Math.cos(3.0 * tx + 5.0 * ty) + 0.02 * tO) +
            Math.sin(20.0 * (tx + ty - 0.1 * tO))
          )
          const intensity = Math.max(0, pat - (noise(x, y) / 15.0) * noiseIntensity)
          const idx = (y * width + x) * 4
          if (idx < d.length) {
            d[idx]     = Math.floor(100 * intensity) // R
            d[idx + 1] = Math.floor(94  * intensity) // G
            d[idx + 2] = Math.floor(110 * intensity) // B
            d[idx + 3] = 255
          }
        }
      }

      ctx.putImageData(img, 0, 0)

      const ov = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      )
      ov.addColorStop(0, 'rgba(0,0,0,0.05)')
      ov.addColorStop(1, 'rgba(0,0,0,0.50)')
      ctx.fillStyle = ov
      ctx.fillRect(0, 0, width, height)

      time++
      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}
