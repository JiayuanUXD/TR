"use client"

import { useEffect, useRef, useCallback } from "react"
import styles from "./Slide04OrgStructureV2.module.css"

/* ─── Data ─────────────────────────────────────────────────────────── */

type Section = { label: string; chips: string[] }
type CardData = {
  eyebrow: string
  title: string
  id: string
  chips?: string[]
  sections?: Section[]
  modules: number
  designers: number
}

const leftCards: CardData[] = [
  {
    eyebrow: "// C端 · 消费者增长",
    title: "叮咚买菜",
    id: "M·01",
    chips: ["导购", "交易", "搜索推荐", "用户增长", "营销"],
    modules: 5,
    designers: 10,
  },
  {
    eyebrow: "// Web · 后台管理",
    title: "数字化管理平台",
    id: "M·03",
    sections: [
      { label: "叮咚后台", chips: ["商品", "营销", "价格", "采配", "CMS", "Vega", "官网"] },
      { label: "小满后台", chips: ["商品", "营销", "价格", "商家管理"] },
    ],
    modules: 11,
    designers: 5,
  },
  {
    eyebrow: "// 算法 · 策略",
    title: "企业效能",
    id: "M·05",
    chips: ["招聘", "流程中心", "绩效", "Kepler"] ,
    modules: 6,
    designers: 3,
  },
]

const rightCards: CardData[] = [
  {
    eyebrow: "// B端 · 商家增长",
    title: "小满商家端",
    id: "M·02",
    chips: ["导购", "交易", "搜索推荐", "用户增长", "营销"],
    modules: 5,
    designers: 3,
  },
  {
    eyebrow: "// 重物流 · 运营",
    title: "供应链",
    id: "M·04",
    sections: [
      { label: "供应链执行", chips: ["割网", "驿站助手", "前置仓", "分拣", "Mini-Keeper", "QMS", "WMS", "叮咚奥莱"] },
      { label: "供应链计划", chips: ["供货系统", "库存管理"] },
    ],
    modules: 8,
    designers: 3,
  },
  {
    eyebrow: "// 全球标准",
    title: "海外业务",
    id: "M·06",
    chips: ["Keenmart", "Foodmax", "官网"],
    modules: 3,
    designers: 10,
  },
]

// Wire counts per card: left = [叮咚买菜, 数字化管理平台, 规划与效能]
//                       right = [小满商家端, 供应链, 海外业务]
const LEFT_WIRES = [10, 5, 3]
const RIGHT_WIRES = [3, 3, 8]

/* ─── SVG helpers ───────────────────────────────────────────────────── */

const NS = "http://www.w3.org/2000/svg"

function svgPath(d: string, stroke: string, opacity: number, width: number) {
  const el = document.createElementNS(NS, "path")
  el.setAttribute("d", d)
  el.setAttribute("stroke", stroke)
  el.setAttribute("stroke-opacity", String(opacity))
  el.setAttribute("stroke-width", String(width))
  el.setAttribute("fill", "none")
  el.setAttribute("stroke-linecap", "round")
  return el
}

function svgCircle(
  cx: number,
  cy: number,
  r: number,
  fill: string,
  opacity: number,
  filterId?: string,
  clipId?: string,
) {
  const el = document.createElementNS(NS, "circle")
  el.setAttribute("cx", String(cx))
  el.setAttribute("cy", String(cy))
  el.setAttribute("r", String(r))
  el.setAttribute("fill", fill)
  el.setAttribute("opacity", String(opacity))
  if (filterId) el.setAttribute("filter", `url(#${filterId})`)
  if (clipId) el.setAttribute("clip-path", `url(#${clipId})`)
  return el
}

/* ─── Sub-components ────────────────────────────────────────────────── */

function BusinessCard({
  card,
  side,
  cardRef,
}: {
  card: CardData
  side: "left" | "right"
  cardRef: (el: HTMLDivElement | null) => void
}) {
  return (
    <div ref={cardRef} className={`${styles.card} ${styles[side]}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <div className={styles.cardEyebrow}>{card.eyebrow}</div>
          <div className="text-[14px] font-bold text-white leading-snug">{card.title}</div>
        </div>
        <div className={styles.cardBadge}>{card.id}</div>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0">
        {card.sections ? (
          <div className="space-y-2.5">
            {card.sections.map((s) => (
              <div key={s.label}>
                <div className={styles.sectionLabel}>{s.label}</div>
                <div className="flex flex-wrap gap-1.5">
                  {s.chips.map((c) => (
                    <span key={c} className={styles.neutralChip}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {card.chips?.map((c) => (
              <span key={c} className={styles.accentChip}>{c}</span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span>{card.modules} modules</span>
        <span>
          designers · <strong className={styles.cardCount}>{card.designers}</strong>
        </span>
      </div>
    </div>
  )
}

/* ─── Main component ────────────────────────────────────────────────── */

export default function Slide04OrgStructureV2() {
  const bodyRef = useRef<HTMLDivElement>(null)
  const poolRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const leftCardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const rightCardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  const drawWires = useCallback(() => {
    const body = bodyRef.current
    const pool = poolRef.current
    const svg = svgRef.current
    if (!body || !pool || !svg) return

    const bRect = body.getBoundingClientRect()
    const pRect = pool.getBoundingClientRect()

    svg.setAttribute("viewBox", `0 0 ${bRect.width} ${bRect.height}`)
    svg.setAttribute("width", String(bRect.width))
    svg.setAttribute("height", String(bRect.height))
    while (svg.firstChild) svg.removeChild(svg.firstChild)

    // ── SVG defs: blur filters for frosted-glass endpoints ──
    const defs = document.createElementNS(NS, "defs")
    for (const id of ["glow-teal", "glow-blue"]) {
      const filter = document.createElementNS(NS, "filter")
      filter.setAttribute("id", id)
      filter.setAttribute("x", "-400%")
      filter.setAttribute("y", "-400%")
      filter.setAttribute("width", "900%")
      filter.setAttribute("height", "900%")
      const blur = document.createElementNS(NS, "feGaussianBlur")
      blur.setAttribute("stdDeviation", "5")
      filter.appendChild(blur)
      defs.appendChild(filter)
    }
    // Tight glow for individual endpoint dots
    const dotGlowFilter = document.createElementNS(NS, "filter")
    dotGlowFilter.setAttribute("id", "dot-glow")
    dotGlowFilter.setAttribute("x", "-300%")
    dotGlowFilter.setAttribute("y", "-300%")
    dotGlowFilter.setAttribute("width", "700%")
    dotGlowFilter.setAttribute("height", "700%")
    const dotBlur = document.createElementNS(NS, "feGaussianBlur")
    dotBlur.setAttribute("stdDeviation", "3")
    dotGlowFilter.appendChild(dotBlur)
    defs.appendChild(dotGlowFilter)
    svg.appendChild(defs)

    const poolLX = pRect.left - bRect.left
    const poolRX = pRect.right - bRect.left
    const poolTY = pRect.top - bRect.top
    const poolBY = pRect.bottom - bRect.top
    const poolH = poolBY - poolTY

    // Anchor Y for each of the 3 card rows on the pool edge
    const anchorYs = [
      poolTY + poolH * 0.22,
      poolTY + poolH * 0.52,
      poolTY + poolH * 0.78,
    ]

    const TEAL = "#5eead4"
    const BLUE = "#60a5fa"

    const drawBundle = (
      refs: (HTMLDivElement | null)[],
      wireCounts: number[],
      poolX: number,
      getCardX: (r: DOMRect) => number,
      color: string,
      filterId: string
    ) => {
      refs.forEach((card, i) => {
        if (!card) return
        const r = card.getBoundingClientRect()
        const cardX = getCardX(r)
        const cardCY = r.top + r.height / 2 - bRect.top
        const ancY = anchorYs[i]
        const n = wireCounts[i]

        // Pool side: all wires converge to a single point
        const poolSpread = 0
        // Card side: uniform dot radius 2.5px, gap = one diameter → center-to-center = 10px
        const cardSpread = (n - 1) * 10

        // Horizontal bezier control points (creates smooth S-curve)
        const span = cardX - poolX
        const cx1 = poolX + span * 0.42
        const cx2 = poolX + span * 0.58

        // Wide faint echo stroke behind the whole bundle
        const echoD = `M ${poolX} ${ancY} C ${cx1} ${ancY}, ${cx2} ${cardCY}, ${cardX} ${cardCY}`
        svg.appendChild(svgPath(echoD, color, 0.04, 10))

        // Individual thin wires — center wires more opaque, edges fade out
        for (let j = 0; j < n; j++) {
          const t = n === 1 ? 0 : j / (n - 1) - 0.5   // –0.5 … +0.5
          const poolY = ancY + t * poolSpread
          const cardY = cardCY + t * cardSpread
          const dist = Math.abs(t) * 2                 // 0 = center, 1 = edge
          const opacity = 0.40 - dist * 0.20            // 0.40 → 0.20

          const d = `M ${poolX} ${poolY} C ${cx1} ${poolY}, ${cx2} ${cardY}, ${cardX} ${cardY}`
          svg.appendChild(svgPath(d, color, opacity, 0.6))
        }

        // Pool-side endpoint: single glowing dot (all wires converge here)
        svg.appendChild(svgCircle(poolX, ancY, 6,   color, 0.40, "dot-glow"))
        svg.appendChild(svgCircle(poolX, ancY, 2.5, color, 1.0))

        // Card-side endpoints: N glowing dots, one per wire
        // Each dot: outer half solid, inner half frosted (half-embedded in card)
        const cardIsLeft = cardX < poolX
        const clipBase = `ep-${i}-${filterId}`

        // One clipPath pair shared by all dots on this card (boundary = cardX)
        const innerClip = document.createElementNS(NS, "clipPath")
        innerClip.setAttribute("id", `${clipBase}-in`)
        const ir = document.createElementNS(NS, "rect")
        ir.setAttribute("y", "0")
        ir.setAttribute("height", String(bRect.height))
        if (cardIsLeft) {
          ir.setAttribute("x", String(cardX - 40)); ir.setAttribute("width", "40")
        } else {
          ir.setAttribute("x", String(cardX));      ir.setAttribute("width", "40")
        }
        innerClip.appendChild(ir)
        defs.appendChild(innerClip)

        const outerClip = document.createElementNS(NS, "clipPath")
        outerClip.setAttribute("id", `${clipBase}-out`)
        const orRect = document.createElementNS(NS, "rect")
        orRect.setAttribute("y", "0")
        orRect.setAttribute("height", String(bRect.height))
        if (cardIsLeft) {
          orRect.setAttribute("x", String(cardX));      orRect.setAttribute("width", "40")
        } else {
          orRect.setAttribute("x", String(cardX - 40)); orRect.setAttribute("width", "40")
        }
        outerClip.appendChild(orRect)
        defs.appendChild(outerClip)

        for (let j = 0; j < n; j++) {
          const tj = n === 1 ? 0 : j / (n - 1) - 0.5
          const cardY = cardCY + tj * cardSpread
          // Halo glow behind full dot
          svg.appendChild(svgCircle(cardX, cardY, 6,   color, 0.38, "dot-glow"))
          // Inner half: frosted (blurred, lower opacity — embedded in card)
          svg.appendChild(svgCircle(cardX, cardY, 2.5, color, 0.45, "dot-glow", `${clipBase}-in`))
          // Outer half: solid (sharp, facing wire gap)
          svg.appendChild(svgCircle(cardX, cardY, 2.5, color, 1.0,  undefined,  `${clipBase}-out`))
        }
      })
    }

    drawBundle(leftCardRefs.current, LEFT_WIRES, poolLX, (r) => r.right - bRect.left, TEAL, "glow-teal")
    drawBundle(rightCardRefs.current, RIGHT_WIRES, poolRX, (r) => r.left - bRect.left, BLUE, "glow-blue")
  }, [])

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(drawWires))
    window.addEventListener("resize", drawWires)
    const t1 = setTimeout(drawWires, 300)
    const t2 = setTimeout(drawWires, 900)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", drawWires)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [drawWires])

  return (
    <div className={styles.root}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div>
          {/* Number indicator */}
          <div className={styles.indicator}>
            <div className={styles.indicatorLine} />
            <span className={styles.indicatorText}>04 · ORG STRUCTURE</span>
          </div>
          <h2 className={styles.heading}>
            UX团队：
            <span className={styles.headingAccent}>全栈设计师池</span>
            {" "}× 高并发支撑
          </h2>
          <p className={styles.subheading}>
            10名全栈设计师为核心 — 辐射六大业务矩阵，覆盖50+个产品模块
          </p>
        </div>

        {/* Metrics */}
        <div className={styles.metrics}>
          {[
            { id: "01", key: "HEADCOUNT",   val: "10",  unit: "Designers", note: "精英单池，无壁垒轮转",      hi: 0 },
            { id: "02", key: "CONCURRENCY", val: "1:4", unit: "",          note: "每位设计师并行支撑4条线",    hi: 1 },
            { id: "03", key: "CAPABILITY",  val: "100", unit: "% 全栈",    note: "UR · IxD · 视觉 · 数据分析", hi: 2 },
          ].map((m) => (
            <div key={m.id} className={styles.metricCard}>
              <div className={styles.metricKey}>// {m.id} · {m.key}</div>
              <div className={styles.metricValue} data-hi={m.hi}>
                {m.val}
                {m.unit && <span className={styles.metricUnit}>{m.unit}</span>}
              </div>
              <div className={styles.metricNote}>{m.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3-column body ── */}
      <div ref={bodyRef} className={styles.body}>
        {/* Left cards */}
        <div className={styles.cardCol}>
          {leftCards.map((card, i) => (
            <BusinessCard
              key={card.id}
              card={card}
              side="left"
              cardRef={(el) => { leftCardRefs.current[i] = el }}
            />
          ))}
        </div>

        {/* Center: Designer Pool */}
        <div ref={poolRef} className={styles.pool}>
          {/* Radial glow */}
          <div className={styles.poolGlow} />

          {/* ── Section 1: 标题 ── */}
          <div className={styles.poolSection1}>
            <div className={styles.poolLabel}>// THE ELITE POOL · 全栈设计师池</div>
            <div className={styles.poolTitle}>
              <span className={styles.poolTitleAccent}>10</span> 全栈设计师
            </div>
            <div className={styles.poolSubtitle}>
              统一资源池 · 研究、交互、视觉、数据全覆盖
            </div>
          </div>

          {/* ── Section 2: 设计师（居中，弹性填充）── */}
          <div className={styles.poolSection2}>
            <div className={styles.avatarGrid}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className={styles.avatar}>
                  D{i + 1}
                  <span className={styles.avatarDot} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 3: 能力 ── */}
          <div className={styles.poolSection3}>
            <div className={styles.skillGrid}>
              {[
                ["UR", "用户研究"],
                ["IxD", "交互设计"],
                ["UI", "视觉界面"],
                ["DA", "数据分析"],
              ].map(([k, v]) => (
                <div key={k} className={styles.skillCell}>
                  <div className={styles.skillKey}>// {k}</div>
                  <div className={styles.skillVal}>{v}</div>
                </div>
              ))}
            </div>
            <div className={styles.poolFooter}>
              <span>STATUS · <span className={styles.poolStatus}>全员在线</span></span>
              <span>LOAD · 1:4</span>
              <span>UPTIME · 99.9%</span>
            </div>
          </div>
        </div>

        {/* Right cards */}
        <div className={styles.cardCol}>
          {rightCards.map((card, i) => (
            <BusinessCard
              key={card.id}
              card={card}
              side="right"
              cardRef={(el) => { rightCardRefs.current[i] = el }}
            />
          ))}
        </div>

        {/* SVG wire overlay */}
        <svg
          ref={svgRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Footer band */}
      <div className={styles.footerBand}>
        <div className={styles.footerLegend}>
          {[
            { label: "10 全栈设计师", color: "oklch(0.78 0.15 195)" },
            { label: "6 业务矩阵",   color: "#60a5fa" },
            { label: "38 产品模块",  color: "oklch(0.38 0 0)" },
            { label: "百亿级 GMV",   color: "oklch(0.38 0 0)" },
          ].map(({ label, color }) => (
            <span key={label} className={styles.footerItem}>
              <span
                className={styles.footerDot}
                style={{
                  background: color,
                  boxShadow: color !== "oklch(0.38 0 0)" ? `0 0 6px ${color}` : "none",
                }}
              />
              {label}
            </span>
          ))}
        </div>
        <span>UX_DEPT · ORG_MAP · 04</span>
      </div>
    </div>
  )
}
