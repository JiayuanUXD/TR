"use client"

const domains = [
  {
    label: "C端",
    color: "oklch(0.78 0.15 195)",
    items: ["导购", "交易", "搜推", "用增", "营销"],
  },
  {
    label: "B端",
    color: "oklch(0.70 0.12 160)",
    items: ["小满", "叮咚奥莱"],
  },
  {
    label: "后台",
    color: "oklch(0.65 0.08 230)",
    items: ["商品", "营销", "效能", "供应链执行", "供应链计划", "官网"],
  },
  {
    label: "海外",
    color: "oklch(0.80 0.10 80)",
    items: ["Keenmart", "Foodmax", "官网"],
  },
]

export default function Slide03BusinessMap() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.08_0_0)] p-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">03</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          团队定位与业务版图
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-2xl leading-relaxed">
          设计团队的价值，不只是交付页面，而是支撑多业务、多终端、多区域的规模化体验建设。
        </p>
      </div>

      {/* Business map */}
      <div className="flex-1 grid grid-cols-4 gap-4">
        {domains.map((d) => (
          <div key={d.label} className="flex flex-col border border-[oklch(0.22_0_0)] bg-[oklch(0.10_0_0)] overflow-hidden">
            {/* Domain header */}
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{ borderBottom: `1px solid ${d.color}30`, backgroundColor: `${d.color}10` }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-sm font-semibold tracking-wider" style={{ color: d.color }}>
                {d.label}
              </span>
            </div>

            {/* Items */}
            <div className="flex-1 p-5 flex flex-col gap-2">
              {d.items.map((item) => (
                <div
                  key={item}
                  className="px-3 py-2 text-sm text-[oklch(0.75_0_0)] border border-[oklch(0.18_0_0)] bg-[oklch(0.12_0_0)]"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Count */}
            <div className="px-5 py-3 border-t border-[oklch(0.16_0_0)]">
              <span className="text-[10px] tracking-[0.2em] text-[oklch(0.35_0_0)] uppercase">
                {d.items.length} 个业务方向
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div className="mt-6 flex items-center gap-8 pt-5 border-t border-[oklch(0.18_0_0)]">
        <div className="flex gap-8">
          <div>
            <div className="text-2xl font-bold text-white">4</div>
            <div className="text-[10px] tracking-[0.15em] text-[oklch(0.40_0_0)] uppercase">业务域</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">16+</div>
            <div className="text-[10px] tracking-[0.15em] text-[oklch(0.40_0_0)] uppercase">产品线</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "oklch(0.78 0.15 195)" }}>多端</div>
            <div className="text-[10px] tracking-[0.15em] text-[oklch(0.40_0_0)] uppercase">终端覆盖</div>
          </div>
        </div>

      </div>
    </div>
  )
}
