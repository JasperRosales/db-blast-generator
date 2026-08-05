"use client"

import * as React from "react"

type Particle = {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  phase: number
  twinkle: number
  color: string
}

export function FloatingParticles({
  colors,
  glow,
}: {
  colors: readonly string[]
  glow: string
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const colorsRef = React.useRef(colors)
  const glowRef = React.useRef(glow)
  const particlesRef = React.useRef<Particle[]>([])

  React.useEffect(() => {
    colorsRef.current = colors
    glowRef.current = glow
  }, [colors, glow])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    resize()
    window.addEventListener("resize", resize)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      return () => window.removeEventListener("resize", resize)
    }

    const spawn = (initial = false): Particle => {
      const color =
        colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)]
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 24,
        size: 2 + Math.random() * 4,
        speed: 0.5 + Math.random() * 1.1,
        drift: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.015 + Math.random() * 0.035,
        color,
      }
    }

    const count = Math.min(32, Math.max(14, Math.round(width / 60)))
    particlesRef.current = Array.from({ length: count }, () => spawn(true))

    let raf = 0
    let last = performance.now()

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.667, 3)
      last = now
      const glowColor = glowRef.current

      ctx.clearRect(0, 0, width * dpr, height * dpr)
      ctx.save()
      ctx.scale(dpr, dpr)

      for (const p of particlesRef.current) {
        p.y -= p.speed * dt
        p.x += p.drift * dt + Math.sin(now / 2800 + p.phase) * 0.12
        p.phase += p.twinkle * dt
        if (p.y < -24) {
          Object.assign(p, spawn())
        }

        ctx.globalAlpha = 0.2 + 0.8 * Math.abs(Math.sin(p.phase))
        ctx.shadowColor = glowColor
        ctx.shadowBlur = p.size * 4
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      particlesRef.current = []
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
