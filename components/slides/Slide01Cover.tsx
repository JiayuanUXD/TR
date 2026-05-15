"use client"

import { useEffect, useRef } from "react"

const PARTICLE_COUNT = 80
const CONNECTION_DIST = 130   // px (canvas coords)
const MOUSE_ATTRACT  = 90    // attraction radius
const DRIFT_SPEED    = 0.18  // base drift speed

interface Particle {
  x: number; y: number
  vx: number; vy: number
  ox: number; oy: number   // original position
  r: number
}

export default function Slide01Cover() {
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

    // Seed particles across the whole canvas
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

      // Update positions
      particles.forEach(p => {
        // Gentle attraction toward mouse within radius
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_ATTRACT && dist > 0) {
          const force = (1 - dist / MOUSE_ATTRACT) * 0.012
          p.vx += dx / dist * force
          p.vy += dy / dist * force
        }

        // Gentle pull back to origin (spring)
        p.vx += (p.ox - p.x) * 0.0012
        p.vy += (p.oy - p.y) * 0.0012

        // Damping
        p.vx *= 0.94
        p.vy *= 0.94

        p.x += p.vx
        p.y += p.vy
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > CONNECTION_DIST) continue

          const baseAlpha = (1 - d / CONNECTION_DIST) * 0.14
          // Boost lines near mouse
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

      // Draw particles
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

      // Mouse glow ring
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

    // Resize
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

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.06_0_0)]"
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

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-20 pb-4" style={{ paddingTop: "5%" }}>
        <div className="mb-10 flex items-center gap-3">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.25em] text-[oklch(0.78_0.15_195)] uppercase font-medium">
            Design Management · Interview Presentation
          </span>
        </div>

        <h1 className="text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[1.25] tracking-tight text-white text-balance max-w-3xl mb-6">
          复杂业务中的<br />
          <span className="text-[oklch(0.78_0.15_195)]">高质量设计组织构建</span>
        </h1>

        <p className="text-[oklch(0.50_0_0)] text-lg tracking-wide max-w-xl">
          组织搭建、质量机制与设计资产化实践
        </p>
      </div>

      {/* Bottom meta */}
      <div className="relative z-10 px-20 pb-10">
        <div className="flex gap-12 border-t border-[oklch(0.18_0_0)] pt-7">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-[oklch(0.35_0_0)] uppercase mb-1.5">领域</div>
            <div className="text-sm text-[oklch(0.65_0_0)]">设计管理 · 组织建设</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] text-[oklch(0.35_0_0)] uppercase mb-1.5">方向</div>
            <div className="text-sm text-[oklch(0.65_0_0)]">质量系统 · 设计资产</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] text-[oklch(0.35_0_0)] uppercase mb-1.5">周期</div>
            <div className="text-sm text-[oklch(0.65_0_0)]">5年+ 实践沉淀</div>
          </div>
        </div>
      </div>
    </div>
  )
}
