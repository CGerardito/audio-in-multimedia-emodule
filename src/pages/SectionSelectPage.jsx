import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourse } from '../data/courses.js'
import { formatText } from "../utils/formatText"
import Modal from "../components/Modal.jsx";
import BurgerButton from "../components/BurgerButton.jsx";
import bgImage from '/assets/images/audio-bg.jpg'

/**
 * SectionSelectPage
 * -----------------
 * Redesigned per wireframe:
 *  - Split screen: LEFT (~40%) = course title + description + Capaian button
 *                   RIGHT (~60%) = scrollable session list with fade edges
 *  - Top-left: back button (no heading navbar)
 *  - Bottom-left: burger menu (reusable component)
 *  - "Capaian Pembelajaran" button opens a Modal with course objectives
 *
 * The session list uses a CSS mask to fade items in/out at the top and
 * bottom edges — items don't have hard cutoffs, they smoothly disappear.
 *
 */

const TYPE_STYLES = {
    lesson: {
        badgeLabel: 'Materi',
        badgeCls: 'border-neon/40 text-neon',
        // Subtle dark button with neon-blue accent on hover
        buttonCls: 'bg-base hover:bg-navy border-navy hover:border-neon',
    },
    quiz: {
        badgeLabel: 'Quiz',
        badgeCls: 'border-gold/60 text-gold',
        // Gold-tinted button — stands out as an assessment
        buttonCls: 'bg-gold/25 hover:bg-gold/40 border-gold/40 hover:border-gold',
    },
    activity: {
        badgeLabel: 'Simulasi',
        badgeCls: 'border-gold/60 text-gold',
        // Neon-blue-tinted button — stands out as interactive
        buttonCls: 'bg-neon/30 hover:bg-neon/50 border-neon/40 hover:border-neon',
    },
}

export default function SectionSelectPage() {
  const { courseId } = useParams()
  const course = getCourse(courseId)

  // Modal state — "Capaian Pembelajaran"
  const [capaianOpen, setCapaianOpen] = useState(false)

  if (!course) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-base text-plat">
        <p>Course not found. <Link to="/" className="text-neon underline">Go home</Link></p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex bg-base text-plat relative">
      {/* =========================================================
          LEFT PANEL (~40%) — title, description, capaian button
          ========================================================= */}
        {/* Background image — low opacity, vignette fade */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <img
                src={bgImage}
                alt=""
                className="w-full h-full object-cover"
                style={{
                    opacity: 0.20,
                    // Vignette fade — image is visible in center, fades to edges.
                    // Tune the 30% and 80% to control fade tightness.
                    maskImage: 'radial-gradient(ellipse at center, black 70%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 70%, transparent 95%)',
                }}
            />
        </div>
      <div className="relative z-10 h-full flex flex-col p-10" style={{ width: '40%' }}>
        {/* Top-left: back button (no heading) */}
        <Link
          to="/"
          className="self-start w-28 h-28 flex items-center justify-center rounded-full
                     bg-navy hover:bg-neon hover:text-base text-plat
                     transition-colors text-7xl font-JBM"
          aria-label="Back to Menu"
        >
            ↩
        </Link>

        {/* Center: course title + description + capaian button */}
        <div className="flex-1 flex flex-col justify-center ml-16">
          <h1 className="font-PJS font-extrabold text-9xl tracking-tight mb-6 text-plat">
            {course.title.toUpperCase()}
          </h1>
          <p className="font-PJS font-light italic text-4xl leading-relaxed text-plat/70 mb-6 max-w-md">
            {course.blurb}
          </p>

          <button
            onClick={() => setCapaianOpen(true)}
            className="self-start px-8 py-4 bg-navy hover:bg-neon hover:text-base
                       text-plat rounded-lg font-PJS font-medium text-3xl transition-colors"
          >
            Capaian Pembelajaran
          </button>
        </div>

        {/* Bottom-left: burger menu (rendered by the component, fixed-position) */}
        {/* The BurgerMenu component handles its own positioning, so we just
            drop it here. It will pin to bottom-left of the viewport. */}
      </div>

      {/* =========================================================
          RIGHT PANEL (~60%) — scrollable session list with fade
          ========================================================= */}
      <div className="relative z-10 h-full" style={{ width: '55%' }}>
        {/* The fade mask is applied here. Items inside fade in from the
            bottom and fade out at the top as you scroll.
            maskImage makes the EDGES of the scroll container transparent,
            so items near the edges appear faded. */}
        <div
          className="h-full overflow-y-auto py-24 px-12"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            scrollbarWidth: 'none',  // Firefox — hide scrollbar
            msOverflowStyle: 'none', // IE/Edge — hide scrollbar
          }}
        >
          {/* Hide scrollbar in WebKit browsers */}
          <style>{`
            .session-list::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="session-list flex flex-col gap-4">
            {course.sections.map((section, idx) => {
              const styles = TYPE_STYLES[section.type] || TYPE_STYLES.lesson
              const target =
                section.type === 'lesson'   ? `/courses/${courseId}/lessons/${section.id}` :
                section.type === 'quiz'     ? `/courses/${courseId}/quiz/${section.id}` :
                                              `/courses/${courseId}/activity/${section.id}`

              return (
                <Link
                  key={section.id}
                  to={target}
                  className={`group flex items-center gap-6 px-8 py-12 rounded-2xl
                              transition-all shrink-0 ${styles.buttonCls}`}
                >
                  {/* Session number */}
                  <span className="font-JBM text-3xl text-plat/30 group-hover:text-plat
                                   transition-colors w-12">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Title + type badge */}
                  <div className="flex-1">
                    <h3 className="font-PJS font-medium text-4xl text-plat group-hover:text-white">
                      {formatText(section.title)}
                    </h3>
                  </div>

                  <span className={`inline-block mt-1 text-lg font-JBM uppercase tracking-wider
                                   border ${styles.badgeCls} px-2 py-0.5 rounded`}>
                    {styles.badgeLabel}
                  </span>

                </Link>
              )
            })}

            {/* Bottom spacer so the last item can scroll past the fade */}
            <div className="h-4 shrink-0" />
          </div>
        </div>
      </div>

      <Modal
        isOpen={capaianOpen}
        onClose={() => setCapaianOpen(false)}
        title={`Capaian Pembelajaran — ${course.title}`}
      >
        <ul className="space-y-4">
          {course.capaian?.map((goal, i) => (
            <li key={i} className="flex gap-4 font-JBM font-medium text-3xl text-plat">
              <span className="text-neon font-JBM shrink-0">{String(i + 1).padStart(2, '0')}.</span>
              <span className="leading-relaxed">{goal}</span>
            </li>
          ))}
        </ul>
      </Modal>

    <BurgerButton />

    </div>
  )
}
