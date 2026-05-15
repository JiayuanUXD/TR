"use client"

// ── Left column: INPUT sources ──
const inputs = [
  { label: "问卷调查", tag: "SURVEY" },
  { label: "数据分析", tag: "ANALYTICS" },
  { label: "深度访谈", tag: "INTERVIEW" },
  { label: "焦点小组", tag: "FOCUS" },
  { label: "田野调查", tag: "FIELD" },
]

// ── Right column: CHANNEL feeds ──
const channels = [
  { label: "用户后台", tag: "CRM" },
  { label: "微博", tag: "WEIBO" },
  { label: "小红书", tag: "RED" },
  { label: "应用市场", tag: "STORE" },
  { label: "客服工单", tag: "TICKET" },
]

// ── Loop steps for the SVG ring ──
const STEPS = ["收集", "归类", "提炼", "跟进", "验证", "复盘"]
const VB = 500           // viewBox size
const CX = 250
const CY = 250
const ORBIT_R = 170      // node orbit radius
const NODE_R = 36        // node circle radius
const TRACK_R = 148      // dashed guide ring (inside orbit, between hub and nodes)
const HUB_R  = 52        // center hub radius
const ARROW_GAP = NODE_R + 4  // how far from node center the arc endpoint sits

function stepPos(i: number) {
  const angle = (Math.PI * 2 * i) / STEPS.length - Math.PI / 2
  return {
    x: CX + ORBIT_R * Math.cos(angle),
    y: CY + ORBIT_R * Math.sin(angle),
    angle,
  }
}

// Arc between the edges of two adjacent nodes (not their centers)
function arcD(i: number) {
  const n = STEPS.length
  const aFrom = (Math.PI * 2 * i) / n - Math.PI / 2
  const aTo   = (Math.PI * 2 * ((i + 1) % n)) / n - Math.PI / 2
  const aMid  = (Math.PI * 2 * (i + 0.5)) / n - Math.PI / 2

  // Start: edge of the "from" node in the direction of travel
  const fromX = CX + ORBIT_R * Math.cos(aFrom) + ARROW_GAP * Math.cos(aFrom + Math.PI / 2)
  const fromY = CY + ORBIT_R * Math.sin(aFrom) + ARROW_GAP * Math.sin(aFrom + Math.PI / 2)

  // End: edge of the "to" node in the direction of arrival
  const toX = CX + ORBIT_R * Math.cos(aTo) - ARROW_GAP * Math.cos(aTo + Math.PI / 2)
  const toY = CY + ORBIT_R * Math.sin(aTo) - ARROW_GAP * Math.sin(aTo + Math.PI / 2)

  // Control point pushed outward for a gentle convex curve
  const ctrlX = CX + (ORBIT_R + 38) * Math.cos(aMid)
  const ctrlY = CY + (ORBIT_R + 38) * Math.sin(aMid)

  return `M ${fromX} ${fromY} Q ${ctrlX} ${ctrlY} ${toX} ${toY}`
}

export default function Slide12UXLoop() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.08_0_0)] p-16">
      {/* ── Header ── */}
      <div className="mb-8 shrink-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">12 · Closed Loop</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight text-balance mb-3">
          体验治理引擎
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base leading-relaxed">
          收集 → 归类 → 提炼 → 跟进 → 验证 → 复盘
        </p>
      </div>

      {/* ── Three-column body ── */}
      <div className="flex-1 min-h-0 grid grid-cols-[22%_1fr_22%] gap-4">

        {/* LEFT: Input list — mirrored: tag left, label right */}
        <div className="flex flex-col justify-center gap-0">
          <div className="text-[9px] tracking-[0.25em] text-[oklch(0.35_0_0)] uppercase mb-3 px-1 text-right">
            洞察来源 · INPUT
          </div>
          {inputs.map(({ label, tag }) => (
            <div
              key={tag}
              className="flex items-center justify-between border-b border-[oklch(0.15_0_0)] py-3 px-1 group"
            >
              <span className="text-[9px] tracking-[0.18em] text-[oklch(0.30_0_0)]">
                {tag}
              </span>
              <span className="text-sm text-[oklch(0.80_0_0)] group-hover:text-white transition-colors">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CENTER: SVG ring diagram */}
        <div className="flex items-center justify-center h-full py-2 min-w-0 overflow-hidden">
          <svg
            viewBox={`0 0 ${VB} ${VB}`}
            className="h-full w-auto"
            style={{ maxWidth: "100%", maxHeight: "80%" }}
            aria-label="体验闭环六步流程图"
          >
            <defs>
              {/* Arrow marker — sized relative to stroke */}
              <marker id="arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0.5 L7,3.5 L0,6.5 Z" fill="oklch(0.78 0.15 195 / 0.85)" />
              </marker>
              {/* Glow filter for the hub ring */}
              <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Outer decorative dashed ring at orbit */}
            <circle
              cx={CX} cy={CY} r={ORBIT_R + 14}
              fill="none"
              stroke="oklch(0.18 0 0)"
              strokeWidth="1"
              strokeDasharray="2,8"
            />

            {/* Track ring */}
            <circle
              cx={CX} cy={CY} r={TRACK_R}
              fill="none"
              stroke="oklch(0.20 0 0)"
              strokeWidth="1.5"
              strokeDasharray="4,10"
            />

            {/* Arc arrows between nodes */}
            {STEPS.map((_, i) => (
              <path
                key={i}
                d={arcD(i)}
                fill="none"
                stroke="oklch(0.78 0.15 195 / 0.65)"
                strokeWidth="1.8"
                strokeLinecap="round"
                markerEnd="url(#arr)"
              />
            ))}

            {/* Hub outer glow ring */}
            <circle
              cx={CX} cy={CY} r={HUB_R + 8}
              fill="none"
              stroke="oklch(0.78 0.15 195 / 0.12)"
              strokeWidth="6"
              filter="url(#glow)"
            />
            {/* Hub */}
            <circle cx={CX} cy={CY} r={HUB_R} fill="oklch(0.11 0 0)" stroke="oklch(0.78 0.15 195 / 0.30)" strokeWidth="1.5" />
            <circle cx={CX} cy={CY} r={HUB_R - 12} fill="none" stroke="oklch(0.78 0.15 195 / 0.08)" strokeWidth="1" />
            <text x={CX} y={CY - 8} textAnchor="middle" fill="oklch(0.78 0.15 195)" fontSize="15" fontWeight="700" fontFamily="Inter,sans-serif" letterSpacing="1">持续</text>
            <text x={CX} y={CY + 12} textAnchor="middle" fill="oklch(0.78 0.15 195)" fontSize="15" fontWeight="700" fontFamily="Inter,sans-serif" letterSpacing="1">闭环</text>

            {/* Step nodes */}
            {STEPS.map((step, i) => {
              const { x, y } = stepPos(i)
              const isVerify = step === "收集"
              return (
                <g key={step}>
                  {/* Subtle outer halo on active node */}
                  {isVerify && (
                    <circle cx={x} cy={y} r={NODE_R + 8}
                      fill="none"
                      stroke="oklch(0.78 0.15 195 / 0.18)"
                      strokeWidth="1"
                      filter="url(#glow)"
                    />
                  )}
                  <circle
                    cx={x} cy={y} r={NODE_R}
                    fill={isVerify ? "oklch(0.78 0.15 195 / 0.14)" : "oklch(0.13 0 0)"}
                    stroke={isVerify ? "oklch(0.78 0.15 195)" : "oklch(0.26 0 0)"}
                    strokeWidth={isVerify ? "1.8" : "1"}
                  />
                  <text
                    x={x} y={y + 6}
                    textAnchor="middle"
                    fill={isVerify ? "oklch(0.78 0.15 195)" : "oklch(0.80 0 0)"}
                    fontSize="15"
                    fontWeight={isVerify ? "700" : "500"}
                    fontFamily="Inter,sans-serif"
                  >
                    {step}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* RIGHT: Channel list */}
        <div className="flex flex-col justify-center gap-0">
          <div className="text-[9px] tracking-[0.25em] text-[oklch(0.35_0_0)] uppercase mb-3 px-1">
            CHANNEL · 反馈渠道
          </div>
          {channels.map(({ label, tag }) => (
            <div
              key={tag}
              className="flex items-center justify-between border-b border-[oklch(0.15_0_0)] py-3 px-1 group"
            >
              <span className="text-sm text-[oklch(0.80_0_0)] group-hover:text-white transition-colors">
                {label}
              </span>
              <span className="text-[9px] tracking-[0.18em] text-[oklch(0.30_0_0)]">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}
