"use client"

const tiers = [
  {
    code: "P0",
    label: "核心业务",
    driver: "体验驱动",
    budget: 60,
    goal: "创新与情绪价值",
    accent: "oklch(0.78 0.15 195)",
    examples: ["叮咚买菜 App", "Keenmart", "首页导购"],
  },
  {
    code: "P1",
    label: "效率业务",
    driver: "逻辑驱动",
    budget: 30,
    goal: "极简与零出错率",
    accent: "oklch(0.70 0.12 160)",
    examples: ["后台管理", "供应链系统", "B端小满"],
  },
  {
    code: "P2",
    label: "工具业务",
    driver: "标准驱动",
    budget: 10,
    goal: "低参与高效交付",
    accent: "oklch(0.50 0 0)",
    examples: ["内部工具", "运营后台"],
  },
]

export default function Slide08Governance() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.08_0_0)] p-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">08</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          分类治理模型
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-xl leading-relaxed">
          不是所有业务都值得同样投入，管理的本质是分级配置资源。
        </p>
      </div>

      {/* Tier cards */}
      <div className="flex-1 grid grid-cols-3 gap-4">
        {tiers.map((t, i) => (
          <div
            key={t.code}
            className="relative flex flex-col border border-[oklch(0.22_0_0)] bg-[oklch(0.10_0_0)] overflow-hidden"
          >
            {/* Budget bar at top */}
            <div
              className="h-1 w-full"
              style={{ backgroundColor: t.accent, opacity: 0.8 }}
            />

            <div className="p-6 flex-1 flex flex-col">
              {/* Code + label */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold tracking-widest px-2 py-0.5"
                  style={{
                    color: t.accent,
                    border: `1px solid ${t.accent}50`,
                    backgroundColor: `${t.accent}10`,
                  }}
                >
                  {t.code}
                </span>
                <span className="text-base font-semibold text-white">{t.label}</span>
              </div>

              {/* Driver */}
              <div className="text-[10px] tracking-[0.15em] text-[oklch(0.40_0_0)] uppercase mb-1">驱动模式</div>
              <div className="text-sm text-[oklch(0.70_0_0)] mb-4">{t.driver}</div>

              {/* Goal */}
              <div className="text-[10px] tracking-[0.15em] text-[oklch(0.40_0_0)] uppercase mb-1">目标</div>
              <div className="text-sm text-[oklch(0.70_0_0)] mb-4">{t.goal}</div>

              {/* Examples */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {t.examples.map((ex) => (
                  <span key={ex} className="text-[10px] px-2 py-0.5 border border-[oklch(0.20_0_0)] text-[oklch(0.50_0_0)]">
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Budget indicator */}
            <div className="px-6 py-4 border-t border-[oklch(0.16_0_0)] flex items-center justify-between">
              <span className="text-[10px] tracking-[0.15em] text-[oklch(0.40_0_0)] uppercase">资源投入</span>
              <span
                className="text-2xl font-bold"
                style={{ color: t.accent }}
              >
                {t.budget}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Resource bar */}
      <div className="mt-5 flex flex-col gap-2">
        <div className="text-[10px] tracking-[0.15em] text-[oklch(0.35_0_0)] uppercase mb-1">资源分配示意</div>
        <div className="flex h-2 rounded-full overflow-hidden gap-px">
          {tiers.map((t) => (
            <div
              key={t.code}
              style={{ width: `${t.budget}%`, backgroundColor: t.accent, opacity: 0.7 }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-[oklch(0.35_0_0)]">
          <span>P0 · 60%</span>
          <span>P1 · 30%</span>
          <span>P2 · 10%</span>
        </div>
      </div>


    </div>
  )
}
