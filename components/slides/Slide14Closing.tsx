"use client"

import { useEffect, useRef } from "react"

const PARTICLE_COUNT = 80
const CONNECTION_DIST = 130
const MOUSE_ATTRACT  = 90
const DRIFT_SPEED    = 0.18

interface Particle {
  x: number; y: number
  vx: number; vy: number
  ox: number; oy: number
  r: number
}

export default function Slide14Closing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width  = W
    canvas.height = H

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const x = Math.random() * W
      const y = Math.random() * H
      return {
        x, y, ox: x, oy: y,
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
        r: 0.8 + Math.random() * 0.8,
      }
    })

    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      particles.forEach(p => {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_ATTRACT && dist > 0) {
          const force = (1 - dist / MOUSE_ATTRACT) * 0.012
          p.vx += dx / dist * force
          p.vy += dy / dist * force
        }
        p.vx += (p.ox - p.x) * 0.0012
        p.vy += (p.oy - p.y) * 0.0012
        p.vx *= 0.94
        p.vy *= 0.94
        p.x += p.vx
        p.y += p.vy
      })

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > CONNECTION_DIST) continue

          const baseAlpha = (1 - d / CONNECTION_DIST) * 0.14
          const nearMouse = Math.min(
            Math.sqrt((a.x - mx) ** 2 + (a.y - my) ** 2),
            Math.sqrt((b.x - mx) ** 2 + (b.y - my) ** 2)
          )
          const boost = nearMouse < 120 ? (1 - nearMouse / 120) * 0.35 : 0

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(56,189,248,${baseAlpha + boost})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      // Particles
      particles.forEach(p => {
        const dx = p.x - mx, dy = p.y - my
        const d  = Math.sqrt(dx * dx + dy * dy)
        const nearAlpha = d < 120 ? 0.55 + (1 - d / 120) * 0.4 : 0.55
        const nearR     = d < 120 ? p.r + (1 - d / 120) * 1.2   : p.r

        ctx.beginPath()
        ctx.arc(p.x, p.y, nearR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56,189,248,${nearAlpha * 0.28})`
        ctx.fill()
      })

      // Mouse glow
      if (mx > 0 && my > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 200)
        grad.addColorStop(0,   "rgba(56,189,248,0.06)")
        grad.addColorStop(0.4, "rgba(56,189,248,0.02)")
        grad.addColorStop(1,   "rgba(56,189,248,0)")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mx, my, 200, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    const onResize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W
      canvas.height = H
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }
  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 }
  }

  const pillars = [
    { title: "搭建贴合业务复杂度的设计组织", sub: "Organization" },
    { title: "在高并发场景下建立质量与效率机制", sub: "Quality" },
    { title: "沉淀体验体系与设计资产，形成长期复利", sub: "Assets" },
  ]

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[oklch(0.06_0_0)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static grid */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage: `linear-gradient(oklch(0.97 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.97 0 0) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-20 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.25em] text-[oklch(0.78_0.15_195)] uppercase">Core Value</span>
        </div>

        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight mb-3 pb-[0.08em] text-balance max-w-3xl">
          我的核心价值，是把设计能力<br />
          从<span className="text-[oklch(0.45_0_0)]">个体产出</span>升级为
          <span className="text-[oklch(0.78_0.15_195)]">组织系统</span>
        </h2>

        <div className="flex items-center gap-4 my-10">
          <div className="w-16 h-px bg-[oklch(0.78_0.15_195)]" />
          <div className="flex-1 h-px bg-[oklch(0.18_0_0)]" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div key={p.sub} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 flex items-center justify-center text-[10px] font-bold leading-none pb-[1px]"
                  style={{ color: "oklch(0.78 0.15 195)", border: "1px solid oklch(0.78 0.15 195 / 0.4)" }}
                >
                  {i + 1}
                </div>
                <span className="text-[10px] tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">{p.sub}</span>
              </div>
              <p className="text-sm text-[oklch(0.65_0_0)] leading-relaxed">{p.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-20 py-6 border-t border-[oklch(0.16_0_0)] flex items-center justify-between">
        <div className="text-xs text-[oklch(0.30_0_0)] tracking-wider">设计管理 · 在复杂业务中构建高质量设计组织</div>
      </div>
    </div>
  )
}
