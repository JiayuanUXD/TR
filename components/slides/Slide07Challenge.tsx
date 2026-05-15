"use client"

export default function Slide07Challenge() {
  const triangle = [
    { label: "人力", pos: "top", desc: "团队规模有限，无法无限扩张" },
    { label: "需求", pos: "bottom-left", desc: "业务并发高，优先级持续争夺" },
    { label: "质量", pos: "bottom-right", desc: "体验标准不能因速度妥协" },
  ]

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.06_0_0)] p-16">
      {/* Dark page variant */}
      <div className="absolute inset-0 bg-[oklch(0.06_0_0)]" />


      {/* Background grid subtle */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.97 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.97 0 0) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">07</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          高并发业务下的设计管理挑战
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-xl leading-relaxed">
          设计管理的核心，不是消灭矛盾，而是在资源有限的情况下重新分配优先级。
        </p>
      </div>

      {/* Triangle diagram — fully SVG, scales with container */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        <svg
          viewBox="0 -20 600 480"
          className="w-full max-w-3xl h-auto"
          style={{ maxHeight: "calc(100% - 24px)" }}
          aria-label="不可能三角示意图：人力、需求、质量"
        >
          {/* Outer triangle */}
          <polygon
            points="300,40 60,400 540,400"
            fill="none"
            stroke="oklch(0.22 0 0)"
            strokeWidth="1.5"
          />
          {/* Inner accent triangle */}
          <polygon
            points="300,110 130,365 470,365"
            fill="oklch(0.78 0.15 195 / 0.05)"
            stroke="oklch(0.78 0.15 195 / 0.3)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />

          {/* Center labels */}
          <text x="300" y="238" textAnchor="middle" fill="oklch(0.42 0 0)" fontSize="14" letterSpacing="2" fontFamily="Inter, sans-serif">
            管理决策
          </text>
          <text x="300" y="258" textAnchor="middle" fill="oklch(0.30 0 0)" fontSize="10" letterSpacing="2.5" fontFamily="Inter, sans-serif">
            DESIGN GOVERNANCE
          </text>

          {/* ── Top vertex: 人力 ── */}
          <circle cx="300" cy="40" r="5" fill="oklch(0.78 0.15 195)" />
          <text x="300" y="15" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="Inter, sans-serif">
            人力
          </text>
          <text x="300" y="32" textAnchor="middle" fill="oklch(0.45 0 0)" fontSize="12" fontFamily="Inter, sans-serif">
            团队规模有限
          </text>

          {/* ── Bottom-left vertex: 需求 ── */}
          <circle cx="60" cy="400" r="5" fill="oklch(0.78 0.15 195 / 0.75)" />
          <text x="60" y="434" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="Inter, sans-serif">
            需求
          </text>
          <text x="60" y="452" textAnchor="middle" fill="oklch(0.45 0 0)" fontSize="12" fontFamily="Inter, sans-serif">
            业务并发高
          </text>

          {/* ── Bottom-right vertex: 质量 ── */}
          <circle cx="540" cy="400" r="5" fill="oklch(0.78 0.15 195 / 0.55)" />
          <text x="540" y="434" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="Inter, sans-serif">
            质量
          </text>
          <text x="540" y="452" textAnchor="middle" fill="oklch(0.45 0 0)" fontSize="12" fontFamily="Inter, sans-serif">
            标准不妥协
          </text>
        </svg>
      </div>

      {/* Bottom */}
      <div className="relative z-10 pt-5 border-t border-[oklch(0.16_0_0)]">
        <span className="text-xs text-[oklch(0.35_0_0)] italic">不可能三角 — 设计治理的根本矛盾</span>
      </div>
    </div>
  )
}
