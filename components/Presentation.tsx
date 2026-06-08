"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Slide01Cover from "./slides/Slide01Cover"
import Slide02Understanding from "./slides/Slide02Understanding"
import Slide03BusinessMap from "./slides/Slide03BusinessMap"
import Slide04OrgStructureV2 from "./slides/Slide04OrgStructureV2"
import Slide05Recruitment from "./slides/Slide05Recruitment"
import Slide06Training from "./slides/Slide06Training"
import Slide07Challenge from "./slides/Slide07Challenge"
import Slide08Governance from "./slides/Slide08Governance"
import Slide09Components from "./slides/Slide09Components"
import Slide10AutoQA from "./slides/Slide10AutoQA"
import Slide11Metrics from "./slides/Slide11Metrics"
import Slide12UXLoop from "./slides/Slide12UXLoop"
import Slide13Assets from "./slides/Slide13Assets"
import Slide14Closing from "./slides/Slide14Closing"

const slides = [
  { id: 1, title: "封面", component: Slide01Cover },
  { id: 2, title: "如何理解设计管理", component: Slide02Understanding },
  { id: 3, title: "团队定位与业务版图", component: Slide03BusinessMap },
  { id: 4, title: "组织架构设计", component: Slide04OrgStructureV2 },
  { id: 5, title: "招聘策略", component: Slide05Recruitment },
  { id: 6, title: "培养机制", component: Slide06Training },
  { id: 7, title: "高并发管理挑战", component: Slide07Challenge },
  { id: 8, title: "分类治理模型", component: Slide08Governance },
  { id: 9, title: "组件化与原子化", component: Slide09Components },
  { id: 10, title: "自动化质量闭环", component: Slide10AutoQA },
  { id: 11, title: "设计效度衡量", component: Slide11Metrics },
  { id: 12, title: "用户体验闭环", component: Slide12UXLoop },
  { id: 13, title: "设计资产与团队产出", component: Slide13Assets },
  { id: 14, title: "结尾总结", component: Slide14Closing },
]

export default function Presentation() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showOverview, setShowOverview] = useState(false)
  const [overviewVisible, setOverviewVisible] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      const target = ((index % slides.length) + slides.length) % slides.length
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrent(target)
        setIsTransitioning(false)
      }, 200)
    },
    [isTransitioning]
  )

  // Animate overview in/out via a separate visibility flag
  const toggleOverview = useCallback(() => {
    if (showOverview) {
      setOverviewVisible(false)
      setTimeout(() => setShowOverview(false), 300)
    } else {
      setShowOverview(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setOverviewVisible(true)))
    }
  }, [showOverview])

  // Jump to slide from overview: set target immediately, fade out overview on top
  const goToFromOverview = useCallback(
    (index: number) => {
      setCurrent(index)
      setOverviewVisible(false)
      setTimeout(() => setShowOverview(false), 300)
    },
    []
  )

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  // Sync fullscreen state with browser
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onFsChange)
    return () => document.removeEventListener("fullscreenchange", onFsChange)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showOverview) {
        toggleOverview()
        return
      }
      if (e.key === "o" || e.key === "O") {
        e.preventDefault()
        toggleOverview()
        return
      }
      if (e.key === "f" || e.key === "F") {
        e.preventDefault()
        toggleFullscreen()
        return
      }
      // Don't navigate when overview is open
      if (showOverview) return
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault()
        next()
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [next, prev, toggleOverview, toggleFullscreen, showOverview])

  const CurrentSlide = slides[current].component

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[oklch(0.04_0_0)] flex flex-col select-none overflow-hidden">
      {/* Top bar — full-width progress bar (starts at 0% on slide 1) */}
      <div className="relative z-20 h-[3px] bg-[oklch(0.14_0_0)] outline-none border-none">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${(current / slides.length) * 100}%`,
            backgroundColor: "oklch(0.78 0.15 195)",
          }}
        />
      </div>

      {/* Main slide area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Slide content */}
        <div
          className="absolute inset-0 transition-opacity duration-200 slide-container"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          <CurrentSlide />
        </div>

        {/* Top-right: keyboard hints */}
        <div className="absolute top-4 right-5 z-20 flex items-center gap-1.5 text-[10px] tracking-[0.12em]">
          {/* Prev / Next */}
          <button
            onClick={prev}
            aria-label="上一页"
            className="w-6 h-6 flex items-center justify-center border rounded-md border-[oklch(0.32_0_0)] hover:border-[oklch(0.55_0_0)] hover:text-[oklch(0.80_0_0)] transition-all text-[oklch(0.60_0_0)]"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="下一页"
            className="w-6 h-6 flex items-center justify-center border rounded-md border-[oklch(0.32_0_0)] hover:border-[oklch(0.55_0_0)] hover:text-[oklch(0.80_0_0)] transition-all text-[oklch(0.60_0_0)]"
          >
            →
          </button>
          <span className="text-[oklch(0.48_0_0)]">翻页</span>

          <span className="text-[oklch(0.30_0_0)]">·</span>

          {/* Overview */}
          <button
            onClick={toggleOverview}
            aria-label="总览 (O)"
            className="w-6 h-6 flex items-center justify-center border rounded-md transition-all duration-150 font-mono"
            style={{
              borderColor: showOverview ? "oklch(0.78 0.15 195 / 0.6)" : "oklch(0.32 0 0)",
              color: showOverview ? "oklch(0.78 0.15 195)" : "oklch(0.60 0 0)",
              backgroundColor: showOverview ? "oklch(0.78 0.15 195 / 0.08)" : "transparent",
            }}
          >
            O
          </button>
          <span className="text-[oklch(0.48_0_0)]">总览</span>

          <span className="text-[oklch(0.30_0_0)]">·</span>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "退出全屏 (F)" : "全屏 (F)"}
            className="w-6 h-6 flex items-center justify-center border rounded-md transition-all duration-150 font-mono"
            style={{
              borderColor: isFullscreen ? "oklch(0.78 0.15 195 / 0.6)" : "oklch(0.32 0 0)",
              color: isFullscreen ? "oklch(0.78 0.15 195)" : "oklch(0.60 0 0)",
              backgroundColor: isFullscreen ? "oklch(0.78 0.15 195 / 0.08)" : "transparent",
            }}
          >
            F
          </button>
          <span className="text-[oklch(0.48_0_0)]">全屏</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 flex items-center justify-between px-5 py-3 border-t border-[oklch(0.12_0_0)] bg-[oklch(0.05_0_0)]">
        {/* Left: prev/next buttons + page counter + overview icon */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={prev}
            aria-label="上一页"
            className="w-8 h-8 flex items-center justify-center border rounded-md border-[oklch(0.22_0_0)] text-[oklch(0.50_0_0)] hover:border-[oklch(0.38_0_0)] hover:text-[oklch(0.70_0_0)] transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="下一页"
            className="w-8 h-8 flex items-center justify-center border rounded-md border-[oklch(0.22_0_0)] text-[oklch(0.50_0_0)] hover:border-[oklch(0.38_0_0)] hover:text-[oklch(0.70_0_0)] transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-[11px] tabular-nums text-[oklch(0.45_0_0)] tracking-[0.12em] px-1">
            {String(current + 1).padStart(2, "0")}
            <span className="text-[oklch(0.28_0_0)] mx-1">/</span>
            {String(slides.length).padStart(2, "0")}
          </span>

          <div className="w-px h-4 bg-[oklch(0.18_0_0)]" />

          {/* Overview icon button */}
          <button
            onClick={toggleOverview}
            aria-label="幻灯片总览 (O)"
            title="总览 O"
            className="w-8 h-8 flex items-center justify-center border rounded-md transition-all duration-150"
            style={{
              borderColor: showOverview ? "oklch(0.78 0.15 195 / 0.5)" : "oklch(0.22 0 0)",
              color: showOverview ? "oklch(0.78 0.15 195)" : "oklch(0.40 0 0)",
              backgroundColor: showOverview ? "oklch(0.78 0.15 195 / 0.08)" : "transparent",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="0.5" y="0.5" width="4.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="0.9"/>
              <rect x="7" y="0.5" width="4.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="0.9"/>
              <rect x="0.5" y="8" width="4.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="0.9"/>
              <rect x="7" y="8" width="4.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="0.9"/>
            </svg>
          </button>
        </div>

        {/* Right: slide subtitle */}
        <div className="text-[10px] tracking-[0.18em] text-[oklch(0.35_0_0)] uppercase truncate max-w-xs text-right">
          {slides[current].title}
        </div>
      </div>

      {/* Overview overlay */}
      {showOverview && (
        <div
          className="absolute inset-0 z-50 transition-opacity duration-300 ease-in-out"
          style={{ opacity: overviewVisible ? 1 : 0 }}
          onClick={toggleOverview}
        >
          {/* Backdrop — true full-screen click target, sits behind everything */}
          <div
            className="absolute inset-0 cursor-default backdrop-blur-2xl"
            style={{ backgroundColor: "oklch(0.02 0 0 / 0.65)" }}
            onClick={toggleOverview}
          />

          {/* Content — absolutely positioned, does NOT fill height, so gaps hit the backdrop */}
          <div className="absolute inset-0 flex flex-col">
            {/* Header row — fixed height, click events contained here */}
            <div
              className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-[oklch(0.15_0_0)] shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.15_195)]" />
                <span className="text-[11px] tracking-[0.2em] text-[oklch(0.45_0_0)] uppercase">幻灯片总览</span>
              </div>
              <button
                onClick={toggleOverview}
                aria-label="关闭总览"
                className="text-[11px] tracking-widest text-[oklch(0.40_0_0)] hover:text-[oklch(0.70_0_0)] transition-colors px-2 py-1 border border-[oklch(0.20_0_0)] hover:border-[oklch(0.35_0_0)]"
              >
                ESC 关闭
              </button>
            </div>

            {/* Scroll area — overflows vertically, propagation stopped only on the grid wrapper */}
            <div className="relative z-10 flex-1 overflow-y-auto p-8">
              <div
                className="grid gap-6 w-full"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(clamp(240px, 18vw, 360px), 1fr))",
                }}
              >
                {slides.map((slide, i) => {
                  const SlideComponent = slide.component
                  const isActive = i === current
                  return (
                    <button
                      key={slide.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        goToFromOverview(i)
                      }}
                      aria-label={`跳转到第 ${i + 1} 页：${slide.title}`}
                      className="group flex flex-col gap-2 text-left transition-all duration-150"
                    >
                      <div
                        className="relative w-full overflow-hidden transition-all duration-150"
                        style={{
                          aspectRatio: "16/9",
                          border: isActive
                            ? "1.5px solid oklch(0.78 0.15 195)"
                            : "1.5px solid oklch(0.20 0 0)",
                          boxShadow: isActive
                            ? "0 0 0 2px oklch(0.78 0.15 195 / 0.15)"
                            : "none",
                        }}
                      >
                        <div
                          className="absolute inset-0 origin-top-left pointer-events-none"
                          style={{ transform: "scale(0.25)", width: "400%", height: "400%" }}
                        >
                          <SlideComponent />
                        </div>
                        <div className="absolute inset-0 bg-[oklch(0.78_0.15_195_/_0)] group-hover:bg-[oklch(0.78_0.15_195_/_0.06)] transition-colors duration-150" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10px] tabular-nums shrink-0" style={{ color: isActive ? "oklch(0.78 0.15 195)" : "oklch(0.35 0 0)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] truncate leading-tight" style={{ color: isActive ? "oklch(0.85 0 0)" : "oklch(0.50 0 0)" }}>
                          {slide.title}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
