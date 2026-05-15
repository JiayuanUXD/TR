"use client"

const assetGroups = [
  {
    type: "C端组件库",
    items: ["叮咚买菜", "Keenmart", "哥王"],
    accent: "oklch(0.78 0.15 195)",
  },
  {
    type: "Web / 后台组件库",
    items: ["DDMC 后台类组件库"],
    accent: "oklch(0.70 0.12 160)",
  },
  {
    type: "UI Kits",
    items: [
      "叮咚买菜 App",
      "Keenmart",
      "Foodmax",
      "哥王",
      "DPOS",
      "商品管理后台",
      "运营后台",
      "商家管理后台",
      "库存管理后台",
    ],
    accent: "oklch(0.65 0.08 230)",
  },
]

export default function Slide13Assets() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.08_0_0)] p-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">13</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          设计资产形成组织复利
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-xl leading-relaxed">
          设计资产的价值，不在于做了多少库，而在于能否被持续复用并服务多业务。
        </p>
      </div>

      {/* Asset platform diagram */}
      <div className="flex-1 flex flex-col gap-4">
        {assetGroups.map((group) => (
          <div key={group.type} className="flex items-stretch border border-[oklch(0.22_0_0)] bg-[oklch(0.10_0_0)] overflow-hidden">
            {/* Type label */}
            <div
              className="flex items-center justify-center px-5 min-w-[180px] border-r border-[oklch(0.16_0_0)]"
              style={{ backgroundColor: `${group.accent.slice(0, -1)} / 0.06)` }}
            >
              <div className="text-center">
                <div className="w-1.5 h-1.5 rounded-full mx-auto mb-2" style={{ backgroundColor: group.accent }} />
                <div className="text-xs font-semibold text-white text-center">{group.type}</div>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 flex items-center flex-wrap gap-2 p-4">
              {group.items.map((item) => (
                <div
                  key={item}
                  className="px-3 py-1.5 text-xs border"
                  style={{
                    borderColor: `${group.accent.slice(0, -1)} / 0.3)`,
                    color: "oklch(0.70 0 0)",
                    backgroundColor: `${group.accent.slice(0, -1)} / 0.04)`,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Count */}
            <div className="flex flex-col items-center justify-center px-5 border-l border-[oklch(0.16_0_0)] min-w-[80px]">
              <div className="text-2xl font-bold" style={{ color: group.accent }}>
                {group.items.length}
              </div>
              <div className="text-[9px] tracking-[0.1em] text-[oklch(0.35_0_0)] uppercase">个资产</div>
            </div>
          </div>
        ))}
      </div>

      {/* Total summary */}
      <div className="mt-5 grid grid-cols-4 gap-4 pt-5 border-t border-[oklch(0.18_0_0)]">
        <div>
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-[10px] tracking-[0.1em] text-[oklch(0.40_0_0)] uppercase">组件库</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">9+</div>
          <div className="text-[10px] tracking-[0.1em] text-[oklch(0.40_0_0)] uppercase">UI Kits</div>
        </div>
        <div>
          <div className="text-2xl font-bold" style={{ color: "oklch(0.78 0.15 195)" }}>多品牌</div>
          <div className="text-[10px] tracking-[0.1em] text-[oklch(0.40_0_0)] uppercase">覆盖</div>
        </div>

      </div>
    </div>
  )
}
