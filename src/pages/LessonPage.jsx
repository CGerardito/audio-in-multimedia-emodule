import {Suspense, lazy, useState, useRef} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { LESSON_REGISTRY } from '../data/courses.js'
import { useSectionNav } from "../hooks/useSectionNav.js"
import { useScrollReset } from "../hooks/useScrollReset.js";
import BurgerButton from '../components/BurgerButton.jsx'

/**
 * LessonPage
 * ----------
 * The lesson renderer. Lazy-loads the right lesson file based on the URL:
 *   /courses/audio/lessons/intro  →  src/lessons/audio_intro.jsx
 *
 * Layout (per user's design):
 *   - No header bar — content fills the whole stage
 *   - Top-left: floating Prev button (hidden on first section)
 *   - Top-right: floating Next button (hidden on last section)
 *   - Bottom-left: Burger menu (Settings, Attribution, Back to Sessions, Back to Landing)
 *   - Main area: scrollable lesson content (the <article> wrapper)
 *
 * === NAVIGATION FIX ===
 * Previously, clicking Prev/Next updated the URL but didn't change the page
 * content — a manual refresh was required. Two root causes:
 *
 * 1. lazy() was called INSIDE the render function. Each render created a
 *    new lazy component wrapper, which confused React's reconciler.
 *    Fix: pre-create all lazy components at MODULE LEVEL (see LAZY_LESSONS
 *    below). This is the React-recommended pattern.
 *
 * 2. Even with stable lazy components, React needs a hint that the
 *    Suspense boundary should reset when the lesson changes.
 *    Fix: key={key} on the <Suspense> boundary. When the key changes,
 *    React unmounts the old Suspense + lesson and mounts fresh ones.
 *
 * Together, these two fixes make navigation instant and reliable.
 */

// Pre-create all lazy lesson components at module level.
// Each entry is a stable lazy component — created once, reused forever.
// This is the correct way to use React.lazy() (not inside a render function).
const LAZY_LESSONS = {}
for (const [key, loader] of Object.entries(LESSON_REGISTRY)) {
  LAZY_LESSONS[key] = lazy(loader)
}

export default function LessonPage() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()
    const mainRef = useScrollReset(lessonId)
  const { course, prevSection, nextSection, routeFor } = useSectionNav(courseId, lessonId)
  const key = `${courseId}_${lessonId}`

  const LessonComponent = LAZY_LESSONS[key]

  return (
    <div className="w-full h-full relative bg-base text-plat flex flex-col">

      {/* =========================================================
          FLOATING PREV/NEXT BUTTONS
          No header bar — just buttons pinned to the top corners.
          pt-28 on the main content below reserves space so the
          article doesn't overlap with these buttons.
          ========================================================= */}

      {/* Top-left: Previous section (hidden on first section) */}
        {prevSection && (
            <button
                onClick={() => navigate(routeFor(prevSection))}
                className="absolute top-8 left-8 z-20 px-6 py-6 rounded-4xl
                bg-navy hover:bg-neon hover:text-base text-plat transition-colors"
                aria-label={`Bagian Sebelum: ${prevSection.title}`}
            >
                <span className="font-JBM text-3xl uppercase">
                    ← Sebelum
                </span>
            </button>
        )}

      {/* Top-right: Next section (hidden on last section) */}
        {nextSection && (
            <button
                onClick={() => navigate(routeFor(nextSection))}
                className="absolute top-8 right-9 z-20 px-6 py-6 rounded-4xl
                bg-navy hover:bg-neon hover:text-base text-plat transition-colors"
                aria-label={`Bagian Berikut: ${nextSection.title}`}
            >
                <span className="font-JBM text-3xl uppercase tracking-wider">
                    Berikut →
                </span>
            </button>
        )}

      {/* =========================================================
          MAIN CONTENT — the lesson's <article> renders here
          ========================================================= 
          pt-28 (7rem) reserves space at the top for the floating
          prev/next buttons. Adjust if you change button size/position.
          
          The key={key} on <Suspense> is CRITICAL — it forces React
          to unmount the old lesson and mount the new one when the
          lesson ID changes. Without it, navigation updates the URL
          but the page content stays stale. */}
      <main
          ref={mainRef}
          className="flex-1 overflow-y-auto custom-scroll pt-28">
        {LessonComponent ? (
          <Suspense key={key} fallback={<div className="p-12 font-PJS text-center text-xl italic text-plat/70">Loading…</div>}>
            <LessonComponent />
          </Suspense>
        ) : (
          <div className="p-12 max-w-5xl mx-auto">
            <p className="font-PJS font-medium text-lg text-plat/70">
              No lesson registered for{' '}
              <code className="bg-navy px-2 py-1 rounded font-JBM">{key}</code>.
              Add it to{' '}
              <code className="bg-navy px-2 py-1 rounded font-JBM">
                src/data/courses.js → LESSON_REGISTRY
              </code>.
            </p>
          </div>
        )}
      </main>

        {/* Bottom-right: Back to Sessions (round button) */}
        <Link
            to={`/courses/${course?.id}`}
            className="absolute bottom-6 right-9 z-20 w-28 h-28 flex flex-col items-center justify-center
             rounded-full bg-navy hover:bg-neon hover:text-base text-plat font-JBM text-6xl
             transition-colors"
            aria-label="Kembali ke daftar sesi"
        >
            ↩
        </Link>

      {/* =========================================================
          BURGER MENU — bottom-left
          ========================================================= */}
        <BurgerButton />
    </div>
  )
}
