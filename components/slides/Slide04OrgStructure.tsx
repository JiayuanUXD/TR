"use client"

const layers = [
  {
    label: "顶层策略",
    role: "设计负责人",
    desc: "组织搭建 · 质量治理 · 资产体系",
    accent: true,
  },
  {
    label: "业务域负责人",
    columns: [
      { name: "C端体验", sub: "导购/交易/营销" },
      { name: "B端效率", sub: "小满/奥莱" },
      { name: "后台系统", sub: "商品/供应链" },
      { name: "海外业务", sub: "Keenmart/Foodmax" },
    ],
  },
  {
    label: "角色协作",
    roles: ["视觉设计师", "交互设计师", "用户研究员", "设计系统工程师"],
  },
]

export default function Slide04OrgStructure() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.08_0_0)] p-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">04</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          组织架构设计
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-xl leading-relaxed">
          组织架构不是平均分工，而是业务复杂度的映射。
        </p>
      </div>

      {/* Architecture diagram */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Top layer */}
        <div className="flex justify-center">
          <div className="relative border border-[oklch(0.78_0.15_195_/_0.5)] bg-[oklch(0.78_0.15_195_/_0.08)] px-12 py-5 min-w-[280px] text-center">
            <div className="text-[10px] tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase mb-1">顶层策略</div>
            <div className="text-lg font-semibold text-white">设计负责人</div>
            <div className="text-xs text-[oklch(0.50_0_0)] mt-1">组织搭建 · 质量治理 · 资产体系</div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center">
          <div className="w-px h-6 bg-[oklch(0.25_0_0)]" />
        </div>

        {/* Mid layer */}
        <div>
          <div className="text-center text-[10px] tracking-[0.2em] text-[oklch(0.40_0_0)] uppercase mb-3">业务域负责人</div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "C端体验", sub: "导购/交易/营销/用增", color: "oklch(0.78 0.15 195)" },
              { name: "B端效率", sub: "小满/叮咚奥莱", color: "oklch(0.70 0.12 160)" },
              { name: "后台系统", sub: "商品/供链/效能/官网", color: "oklch(0.65 0.08 230)" },
              { name: "海外业务", sub: "Keenmart/Foodmax/官网", color: "oklch(0.80 0.10 80)" },
            ].map((col) => (
              <div key={col.name} className="border border-[oklch(0.22_0_0)] bg-[oklch(0.11_0_0)] p-4 text-center">
                <div className="w-1.5 h-1.5 rounded-full mx-auto mb-2" style={{ backgroundColor: col.color }} />
                <div className="text-sm font-medium text-white mb-1">{col.name}</div>
                <div className="text-[10px] text-[oklch(0.45_0_0)] leading-relaxed">{col.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center">
          <div className="w-px h-6 bg-[oklch(0.25_0_0)]" />
        </div>

        {/* Bottom layer */}
        <div>
          <div className="text-center text-[10px] tracking-[0.2em] text-[oklch(0.40_0_0)] uppercase mb-3">角色协作层</div>
          <div className="grid grid-cols-4 gap-3">
            {["视觉设计师", "交互设计师", "用户研究员", "设计系统工程师"].map((r) => (
              <div key={r} className="border border-[oklch(0.18_0_0)] bg-[oklch(0.09_0_0)] px-4 py-3 text-center">
                <div className="text-xs text-[oklch(0.60_0_0)]">{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}
