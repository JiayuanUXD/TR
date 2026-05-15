"use client"

const steps = [
  { id: "01", label: "问题", desc: "人工走查成本高、反馈滞后、主观性强", type: "problem" },
  { id: "02", label: "工具", desc: "基于 Google AI Studio 开发设计验收工具", type: "tool" },
  { id: "03", label: "机制", desc: "视觉稿 vs 前端实现自动像素级比对", type: "process" },
  { id: "04", label: "闭环", desc: "前端 + 设计双重验收节点形成质量门禁", type: "loop" },
]

export default function Slide10AutoQA() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.07_0_0)] p-16">
      {/* Tech dark bg */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.78 0.15 195) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.15 195) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />


      {/* Header */}
      <div className="relative z-10 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">10</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          从人工走查到自动化质量闭环
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-xl leading-relaxed">
          质量不能只依赖经验与责任心，必须进入系统并被自动化验证。
        </p>
      </div>

      {/* Flow */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full flex items-stretch gap-3">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-3 flex-1">
              <div
                className="flex-1 border p-5 flex flex-col"
                style={{
                  borderColor: step.type === "problem" ? "oklch(0.35 0 0)" : "oklch(0.78 0.15 195 / 0.4)",
                  backgroundColor: step.type === "problem" ? "oklch(0.10 0 0)" : "oklch(0.78 0.15 195 / 0.05)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[10px] tracking-[0.2em] font-bold uppercase"
                    style={{ color: step.type === "problem" ? "oklch(0.45 0 0)" : "oklch(0.78 0.15 195)" }}
                  >
                    {step.id}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: step.type === "problem" ? "oklch(0.20 0 0)" : "oklch(0.78 0.15 195 / 0.2)" }} />
                </div>
                <div className="text-base font-semibold text-white mb-2">{step.label}</div>
                <p className="text-xs text-[oklch(0.55_0_0)] leading-relaxed flex-1">{step.desc}</p>
              </div>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <div className="flex-shrink-0 text-[oklch(0.30_0_0)] text-lg">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Result highlight */}
      <div className="relative z-10 mt-6 flex items-center gap-6 p-5 border border-[oklch(0.78_0.15_195_/_0.3)] bg-[oklch(0.78_0.15_195_/_0.06)]">
        <div className="flex-shrink-0">
          <div className="text-[10px] tracking-[0.15em] text-[oklch(0.78_0.15_195)] uppercase mb-1">核心成果</div>
          <div className="text-3xl font-bold text-white">30%+</div>
          <div className="text-xs text-[oklch(0.50_0_0)] mt-0.5">人效提升</div>
        </div>
        <div className="w-px h-12 bg-[oklch(0.22_0_0)]" />
        <div className="flex gap-6 text-sm">
          <div>
            <div className="text-[oklch(0.78_0.15_195)] font-medium">像素级比对</div>
            <div className="text-[oklch(0.45_0_0)] text-xs mt-0.5">视觉稿 vs 前端实现</div>
          </div>
          <div>
            <div className="text-[oklch(0.78_0.15_195)] font-medium">双重验收</div>
            <div className="text-[oklch(0.45_0_0)] text-xs mt-0.5">前端 + 设计协同</div>
          </div>
          <div>
            <div className="text-[oklch(0.78_0.15_195)] font-medium">AI Studio</div>
            <div className="text-[oklch(0.45_0_0)] text-xs mt-0.5">Google AI 驱动</div>
          </div>
        </div>

      </div>
    </div>
  )
}
