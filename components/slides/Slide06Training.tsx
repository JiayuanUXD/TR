"use client"

export default function Slide06Training() {
  const levels = [
    {
      label: "基础能力",
      items: ["逻辑思维", "体验设计", "沟通表达"],
      desc: "个体专业底座",
    },
    {
      label: "运转机制",
      items: ["项目复盘", "专业分享", "AI 分享", "读书会"],
      desc: "团队能力沉淀",
    },
    {
      label: "长期主义",
      items: ["持续 5 年以上", "稳定成长飞轮"],
      desc: "组织能力复利",
    },
  ]

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.08_0_0)] p-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">06</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          把个体能力变成组织能力
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-xl leading-relaxed">
          优秀团队不能只依赖个体强者，而要依赖可复制的培养机制。
        </p>
      </div>

      {/* Flywheel / progressive model */}
      <div className="flex-1 flex items-center gap-6">
        {levels.map((lv, i) => (
          <div key={lv.label} className="flex items-center gap-6 flex-1">
            <div className="flex-1 border border-[oklch(0.22_0_0)] bg-[oklch(0.10_0_0)] p-6 h-full flex flex-col justify-between">
              {/* Accent top bar */}
              <div
                className="h-0.5 w-12 mb-5"
                style={{ backgroundColor: `oklch(0.78 0.15 195 / ${0.4 + i * 0.3})` }}
              />
              <div>
                <div className="text-[10px] tracking-[0.2em] text-[oklch(0.40_0_0)] uppercase mb-2">{lv.desc}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{lv.label}</h3>
                <div className="flex flex-col gap-2">
                  {lv.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "oklch(0.78 0.15 195)" }}
                      />
                      <span className="text-sm text-[oklch(0.65_0_0)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[oklch(0.16_0_0)]">
                <span className="text-[10px] tracking-[0.15em] text-[oklch(0.35_0_0)] uppercase">
                  Layer {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Arrow between */}
            {i < levels.length - 1 && (
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-px bg-[oklch(0.25_0_0)]" />
                <div className="w-0 h-0 mt-[-1px]"
                  style={{
                    borderLeft: "5px solid oklch(0.25 0 0)",
                    borderTop: "4px solid transparent",
                    borderBottom: "4px solid transparent",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom flywheel label */}
      <div className="mt-6 flex items-center gap-4 pt-5 border-t border-[oklch(0.18_0_0)]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs text-[oklch(0.45_0_0)]">个体能力</span>
        </div>
        <div className="text-[oklch(0.30_0_0)] text-xs">→</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.15_195_/_0.7)]" />
          <span className="text-xs text-[oklch(0.45_0_0)]">团队能力</span>
        </div>
        <div className="text-[oklch(0.30_0_0)] text-xs">→</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.15_195_/_0.5)]" />
          <span className="text-xs text-[oklch(0.45_0_0)]">组织复利</span>
        </div>

      </div>
    </div>
  )
}
