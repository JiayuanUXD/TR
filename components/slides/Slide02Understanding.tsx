"use client"

export default function Slide02Understanding() {
  const systems = [
    {
      id: "01",
      title: "组织系统",
      desc: "让团队持续产出优秀设计",
      detail: "人才标准 · 培养机制 · 协作边界",
    },
    {
      id: "02",
      title: "协作系统",
      desc: "让产品、研发、设计高效对齐",
      detail: "流程规范 · 需求管理 · 沟通协议",
    },
    {
      id: "03",
      title: "质量系统",
      desc: "让体验与效率在规模化业务中可持续",
      detail: "验收标准 · 自动化闭环 · 指标体系",
    },
  ]

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[oklch(0.08_0_0)] p-16">


      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">02</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white leading-tight mb-3 text-balance">
          我如何理解设计管理
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-lg leading-relaxed">
          设计管理不是分配任务，而是同时搭建组织系统、协作系统和质量系统。
        </p>
      </div>

      {/* Three systems */}
      <div className="grid grid-cols-3 gap-6 flex-1 mt-12 mb-8">
        {systems.map((s, i) => (
          <div
            key={s.id}
            className="relative flex flex-col justify-between p-8 border border-[oklch(0.22_0_0)] bg-[oklch(0.10_0_0)] overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Accent corner */}
            <div className="absolute top-0 left-0 w-8 h-px bg-[oklch(0.78_0.15_195)]" />
            <div className="absolute top-0 left-0 w-px h-8 bg-[oklch(0.78_0.15_195)]" />

            <div>
              <span className="text-[10px] tracking-[0.3em] text-[oklch(0.78_0.15_195)] uppercase font-medium">
                {s.id}
              </span>
              <h3 className="text-2xl font-semibold text-white mt-3 mb-3">{s.title}</h3>
              <p className="text-[oklch(0.65_0_0)] text-sm leading-relaxed">{s.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[oklch(0.18_0_0)]">
              <p className="text-[10px] tracking-[0.15em] text-[oklch(0.40_0_0)] uppercase">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Center label */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex-1 h-px bg-[oklch(0.18_0_0)]" />
        <span className="text-xs tracking-[0.2em] text-[oklch(0.30_0_0)] uppercase">设计管理 · 三大支柱</span>
        <div className="flex-1 h-px bg-[oklch(0.18_0_0)]" />
      </div>
    </div>
  )
}
