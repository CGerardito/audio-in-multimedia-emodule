import { useEffect, useRef, useState } from 'react'

/**
 * AspectRatioStage
 * ----------------
 * Locks everything inside it to a 16:9 frame that fits the viewport.
 * Whatever device, whatever orientation — the user always sees a 16:9 stage
 * with black letterbox/pillarbox bars around it.
 *
 * === PROPORTIONAL SCALING (the magic part) ===
 * The component dynamically sets the root <html> font-size based on the
 * stage width. Since Tailwind v4 uses `rem` units for almost everything
 * (text-xl = 1.25rem, p-4 = 1rem, gap-2 = 0.5rem, etc.), ALL Tailwind
 * classes across ALL pages scale automatically when the stage resizes.
 *
 * Design baseline: 1920x1080 (root font-size = 16px at this size).
 * - Stage 1920px wide → root font = 16px → text-2xl = 24px
 * - Stage 1280px wide → root font = 10.67px → text-2xl = 16px
 * - Stage 960px wide  → root font = 8px    → text-2xl = 12px
 *
 * This means you design your pages ONCE at "full size" using normal
 * Tailwind classes, and every element (text, buttons, padding, images
 * sized in rem) stays perfectly proportionate on any screen.
 *
 * IMPORTANT: For images that need to scale, use Tailwind sizing classes
 * (w-64, h-48, etc.) or percentage-based widths — NOT px values.
 * px values do NOT scale with root font-size.
 */
const DESIGN_WIDTH = 1920   // baseline design resolution width
const BASE_FONT_PX = 16     // root font-size at design width

export default function AspectRatioStage({ children }) {
  const wrapperRef = useRef(null)
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    function update() {
      const vw = window.innerWidth
      const vh = window.innerHeight
      // Largest 16:9 rectangle that fits inside (vw, vh)
      let w = vw
      let h = (w * 9) / 16
      if (h > vh) {
        h = vh
        w = (h * 16) / 9
      }
      setStageSize({ w, h })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  // Scale the root font-size whenever the stage size changes.
  // This is what makes all rem-based Tailwind utilities scale proportionally.
  useEffect(() => {
    if (stageSize.w === 0) return
    const scale = stageSize.w / DESIGN_WIDTH
    const fontSize = BASE_FONT_PX * scale
    document.documentElement.style.fontSize = `${fontSize}px`
    // Also expose scale as a CSS var in case non-Tailwind CSS needs it.
    document.documentElement.style.setProperty('--stage-scale', String(scale))
  }, [stageSize])

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
    >
      <div
        className="relative bg-white shadow-2xl overflow-hidden"
        style={{
          width: `${stageSize.w}px`,
          height: `${stageSize.h}px`,
        }}
      >
        {/* Anything rendered here is guaranteed to be 16:9 with proportional sizing */}
        {children}
      </div>
    </div>
  )
}
