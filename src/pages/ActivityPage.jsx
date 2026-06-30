import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSectionNav } from '../hooks/useSectionNav.js'
import { useScrollReset } from "../hooks/useScrollReset.js";
import bgImage from "/assets/images/landing.jpg";
import BurgerButton from "../components/BurgerButton.jsx";

/**
 * ActivityPage (Launcher)
 * -----------------------
 * Launcher for the Audio Design Document simulation.
 *
 * Layout (matches QuizLauncherPage):
 *   - Top-left: Prev button (rounded-rectangle, "Sebelumnya")
 *   - Top-right: Next button (rounded-rectangle, "Berikutnya")
 *   - Bottom-left: Burger menu
 *   - Bottom-right: Back to Sessions (round button)
 *   - Center: Activity title, description, "Mulai Simulasi" button
 *
 * The simulation is the 8th section (out of 9). The quiz is the 9th.
 * So this launcher now has BOTH prev and next buttons.
 *
 * Route: /courses/:courseId/activity/:activityId
 *   (this launcher page)
 * Route: /courses/:courseId/activity/:activityId/play
 *   (the actual simulation, handled by AudioDesignDocSimPage.jsx)
 */
const ACTIVITY_META = {
  '08-aud-sim': {
    title: 'Menyusun Dokumentasi Desain Audio',
    description:
      'Pada simulasi ini, kamu akan mencoba menyusun dokumentasi desain audio untuk sebuah multimedia non-linear. Terdapat beberapa konsep visual dan referensi terkait multimedia yang akan dibuat. Tugasmu adalah mengisi kolom-kolom berikutnya berdasarkan gambar yang telah disediakan.',
  },
}

export default function ActivityPage() {
  const { courseId, activityId } = useParams()
  const navigate = useNavigate()
    const mainRef = useScrollReset(activityId)
  const { course, prevSection, nextSection, routeFor } = useSectionNav(courseId, activityId)
  const meta = ACTIVITY_META[activityId]

  function handleStart() {
    navigate(`/courses/${courseId}/activity/${activityId}/play`)
  }

  return (
    <div className="w-full h-full relative bg-base text-plat flex flex-col">

        <div className="absolute inset-0 z-0 pointer-events-none">
            <img
                src={bgImage}
                alt=""
                className="w-full h-full object-cover"
                style={{
                    opacity: 0.50,
                    // Vignette fade — image is visible in center, fades to edges.
                    // Tune the 30% and 80% to control fade tightness.
                    maskImage: 'radial-gradient(ellipse at center, black 70%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 70%, transparent 95%)',
                }}
            />
        </div>

      {/* =========================================================
          CENTERED CONTENT — activity description, start button
          ========================================================= */}
      <main ref={mainRef}
            className="flex-1 overflow-y-auto custom-scroll pt-28 pb-32 flex items-center justify-center z-20">

          {/* =========================================================
          FLOATING PREV/NEXT BUTTONS (top corners)
          ========================================================= */}
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

        <div className="max-w-5xl w-full mx-auto p-8 bg-navy rounded-2xl">
          {/* Badge */}
          <span className="inline-block text-md font-JBM font-bold px-4 py-1.5 rounded-full
                           bg-neon/20 text-neon uppercase tracking-wider mb-6">
            Simulasi · {activityId}
          </span>

          {/* Title + description */}
          {meta ? (
            <>
              <h1 className="font-PJS font-extrabold text-7xl text-neon mb-6 leading-tight">
                {meta.title}
              </h1>
              <p className="font-PJS font-medium text-3xl leading-relaxed text-plat mb-10">
                {meta.description}
              </p>

              {/* Start button */}
              <button
                onClick={handleStart}
                className="w-full px-8 py-6 bg-neon hover:bg-plat text-base
                           rounded-2xl font-PJS font-extrabold text-3xl
                           transition-colors shadow-lg"
              >
                Mulai Simulasi
              </button>

            </>
          ) : (
            <p className="font-PJS text-2xl text-plat/70">
              Unknown activity: <code className="font-JBM bg-navy px-2 py-1 rounded">{activityId}</code>
            </p>
          )}
        </div>
      </main>

      {/* =========================================================
          BOTTOM-LEFT: BURGER MENU
          ========================================================= */}
        <BurgerButton />

      {/* =========================================================
          BOTTOM-RIGHT: BACK TO SESSIONS (round button)
          ========================================================= */}
        <Link
            to={`/courses/${course?.id}`}
            className="absolute bottom-6 right-9 z-20 w-28 h-28 flex flex-col items-center justify-center
             rounded-full bg-navy hover:bg-neon hover:text-base text-plat font-JBM text-6xl
             transition-colors"
            aria-label="Kembali ke daftar sesi"
        >
            ↩
        </Link>

    </div>
  )
}
