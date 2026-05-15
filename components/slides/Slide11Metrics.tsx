"use client"

const metrics = [
  {
    label: "一致性指标",
    metric: "覆盖率 & 复用率",
    desc: "核心组件跨端覆盖率与业务复用率",
    value: "92%",
    unit: "组件覆盖率",
    trend: "+18%",
  },
  {
    label: "研发还原率",
    metric: "走查缺陷数",
    desc: "走查问题数量与上线后 UI 缺陷率变化",
    value: "-64%",
    unit: "缺陷率降低",
    trend: "稳定下降",
  },
  {
    label: "人效杠杆",
    metric: "单人业务线数",
    desc: "平均单人支持业务线数量变化",
    value: "3.2x",
    unit: "人效提升倍数",
    trend: "持续优化",
  },
]

export default function Slide11Metrics() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.08_0_0)] p-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">11</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          让设计管理可以被衡量
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-xl leading-relaxed">
          没有指标的设计管理，最终都会退回到感性判断。
        </p>
      </div>

      {/* Metric cards */}
      <div className="flex-1 grid grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={m.label} className="flex flex-col border border-[oklch(0.22_0_0)] bg-[oklch(0.10_0_0)] overflow-hidden">
            {/* Top accent */}
            <div className="h-0.5 w-full bg-[oklch(0.78_0.15_195_/_0.6)]" />

            <div className="p-6 flex-1 flex flex-col">
              <div className="text-[10px] tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase mb-1">{`0${i + 1}`}</div>
              <div className="text-sm font-semibold text-white mb-1">{m.label}</div>
              <div className="text-[10px] text-[oklch(0.40_0_0)] uppercase tracking-wider mb-4">{m.metric}</div>
              <p className="text-xs text-[oklch(0.50_0_0)] leading-relaxed flex-1">{m.desc}</p>

              {/* Big number */}
              <div className="mt-6 pt-5 border-t border-[oklch(0.16_0_0)]">
                <div className="text-4xl font-bold text-white mb-0.5">{m.value}</div>
                <div className="text-xs text-[oklch(0.45_0_0)]">{m.unit}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 border border-[oklch(0.78_0.15_195_/_0.3)] bg-[oklch(0.78_0.15_195_/_0.08)]">
                  <span className="text-[10px] text-[oklch(0.78_0.15_195)]">{m.trend}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart bar */}
      <div className="mt-6 flex items-center gap-4 pt-5 border-t border-[oklch(0.18_0_0)]">
        <span className="text-xs text-[oklch(0.35_0_0)]">量化指标框架 — 组织管理成熟度</span>
        <div className="flex-1 h-1 bg-[oklch(0.15_0_0)] rounded-full overflow-hidden">
          <div className="h-full w-4/5 rounded-full bg-[oklch(0.78_0.15_195_/_0.6)]" />
        </div>

      </div>
    </div>
  )
}
