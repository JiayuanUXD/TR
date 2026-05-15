"use client"

const layers = [
  {
    level: "Token 层",
    desc: "设计变量系统",
    items: ["颜色", "字体", "间距", "圆角", "阴影"],
    coverage: "移动端 / PDA / Web 统一视觉规则",
  },
  {
    level: "组件层",
    desc: "封装交互模块",
    items: ["称重模块", "扫码交互", "溯源展示", "导购卡片", "价格标签"],
    coverage: "零售业务标准交互封装",
  },
  {
    level: "场景层",
    desc: "业务模板组合",
    items: ["商品详情页", "结算流程", "库存管理", "运营后台"],
    coverage: "多业务场景快速拼装",
  },
]

export default function Slide09Components() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[oklch(0.08_0_0)] p-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[oklch(0.78_0.15_195)]" />
          <span className="text-xs tracking-[0.2em] text-[oklch(0.78_0.15_195)] uppercase">09</span>
        </div>
        <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-white leading-tight mb-3 text-balance">
          组件化支撑规模化交付
        </h2>
        <p className="text-[oklch(0.55_0_0)] text-base max-w-xl leading-relaxed">
          组件化不是为了规范本身，而是为了支撑复杂业务下的一致性与交付效率。
        </p>
      </div>

      {/* System layers */}
      <div className="flex-1 flex flex-col gap-4">
        {layers.map((layer, i) => (
          <div
            key={layer.level}
            className="flex gap-6 items-stretch border border-[oklch(0.22_0_0)] bg-[oklch(0.10_0_0)] overflow-hidden"
          >
            {/* Level label */}
            <div
              className="flex flex-col items-center justify-center px-5 py-4 min-w-[120px]"
              style={{ backgroundColor: `oklch(0.78 0.15 195 / ${0.05 + i * 0.03})` }}
            >
              <span
                className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-1"
                style={{ color: "oklch(0.78 0.15 195)" }}
              >
                L{i + 1}
              </span>
              <span className="text-sm font-semibold text-white text-center">{layer.level}</span>
              <span className="text-[10px] text-[oklch(0.45_0_0)] mt-1 text-center">{layer.desc}</span>
            </div>

            {/* Items */}
            <div className="flex-1 flex items-center gap-2 py-4 px-2 flex-wrap">
              {layer.items.map((item) => (
                <div
                  key={item}
                  className="px-3 py-1.5 border border-[oklch(0.22_0_0)] text-xs text-[oklch(0.65_0_0)] bg-[oklch(0.12_0_0)]"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Coverage */}
            <div className="flex flex-col justify-center px-5 py-4 min-w-[200px] border-l border-[oklch(0.16_0_0)]">
              <div className="text-[10px] tracking-[0.15em] text-[oklch(0.35_0_0)] uppercase mb-1">覆盖场景</div>
              <div className="text-xs text-[oklch(0.55_0_0)] leading-relaxed">{layer.coverage}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits row */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-5 border-t border-[oklch(0.18_0_0)]">
        {[
          { label: "降低重复设计成本", icon: "↓" },
          { label: "提升跨端一致性", icon: "=" },
          { label: "缩短交付周期", icon: "→" },
        ].map((b) => (
          <div key={b.label} className="flex items-center gap-2">
            <span className="text-[oklch(0.78_0.15_195)] text-base font-bold">{b.icon}</span>
            <span className="text-xs text-[oklch(0.50_0_0)]">{b.label}</span>
          </div>
        ))}

      </div>
    </div>
  )
}
