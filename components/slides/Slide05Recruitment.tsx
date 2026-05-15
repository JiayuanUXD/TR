"use client"

export default function Slide05Recruitment() {
  const matrix = [
    { label: "能力", desc: "扎实的设计基础与方法论", score: 85 },
    { label: "潜力", desc: "成长速度与边界突破意愿", score: 90 },
    { label: "匹配度", desc: "价值观与组织文化契合", score: 75 },
  ]

  const stages = ["简历筛选", "作品集评审", "专业面试 ×2", "管理层面试", "团队文化面"]

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.08_0_0)] p-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">05</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          招聘决定团队上限
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-xl leading-relaxed">
          招聘不是补位，而是在定义团队未来 2–3 年的上限。
        </p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8">
        {/* Left: talent matrix */}
        <div className="flex flex-col gap-5">
          <div className="text-[10px] tracking-[0.2em] text-[oklch(0.40_0_0)] uppercase mb-2">人才评估三维框架</div>
          {matrix.map((m) => (
            <div key={m.label} className="border border-[oklch(0.22_0_0)] bg-[oklch(0.10_0_0)] p-5">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-base font-semibold text-white">{m.label}</span>
                <span className="text-xs text-[oklch(0.78_0.15_195)]">{m.score}%</span>
              </div>
              <p className="text-xs text-[oklch(0.50_0_0)] mb-3 leading-relaxed">{m.desc}</p>
              <div className="w-full h-1 bg-[oklch(0.18_0_0)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${m.score}%`, backgroundColor: "oklch(0.78 0.15 195)" }}
                />
              </div>
            </div>
          ))}

          {/* Source tag */}
          <div className="mt-2 px-4 py-3 border border-[oklch(0.18_0_0)] bg-[oklch(0.09_0_0)]">
            <div className="text-[10px] tracking-[0.15em] text-[oklch(0.35_0_0)] uppercase mb-1">核心成员来源</div>
            <div className="text-sm text-[oklch(0.65_0_0)]">华为 · 阿里巴巴 · 美团</div>
          </div>
        </div>

        {/* Right: interview process */}
        <div className="flex flex-col">
          <div className="text-[10px] tracking-[0.2em] text-[oklch(0.40_0_0)] uppercase mb-6">结构化面试机制 4+1</div>
          <div className="flex-1 flex flex-col gap-3">
            {stages.map((stage, i) => (
              <div key={stage} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-7 h-7 flex items-center justify-center text-xs font-bold"
                    style={{
                      color: i === 4 ? "oklch(0.78 0.15 195)" : "oklch(0.60 0 0)",
                      border: `1px solid ${i === 4 ? "oklch(0.78 0.15 195 / 0.5)" : "oklch(0.22 0 0)"}`,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < stages.length - 1 && (
                    <div className="w-px flex-1 min-h-[20px] bg-[oklch(0.20_0_0)] mt-1" />
                  )}
                </div>
                <div
                  className="flex-1 py-3 px-4 border text-sm"
                  style={{
                    borderColor: i === 4 ? "oklch(0.78 0.15 195 / 0.4)" : "oklch(0.22 0 0)",
                    backgroundColor: i === 4 ? "oklch(0.78 0.15 195 / 0.06)" : "oklch(0.10 0 0)",
                    color: i === 4 ? "oklch(0.78 0.15 195)" : "oklch(0.70 0 0)",
                  }}
                >
                  {stage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}
