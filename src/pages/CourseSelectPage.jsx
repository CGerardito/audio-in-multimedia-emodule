import { Link } from 'react-router-dom'
import { COURSES } from '../data/courses.js'

/**
 * CourseSelectPage
 * ----------------
 * Hardcoded for EXACTLY 5 courses. Since you confirmed the module scope
 * is fixed at 5 courses, we use a single-row layout designed for 5 cards
 * rather than a responsive grid that adapts to any count.
 *
 * Layout: 5 equal-width cards in one horizontal row, each card is a 16:9
 * thumbnail with title + blurb. The row is vertically centered.
 *
 * All sizes use rem-based Tailwind classes → they scale proportionally
 * with the stage via AspectRatioStage's root font-size trick.
 */
export default function CourseSelectPage() {
  return (
    <div className="w-full h-full flex flex-col bg-slate-100">
      {/* Header bar */}
      <header className="flex items-center justify-between px-10 py-5 bg-white shadow-sm shrink-0">
        <Link to="/" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-base">
          <span className="text-2xl">←</span> Back
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Select a Course</h1>
        <div className="w-20" />
      </header>

      {/* 5-course row — hardcoded layout for exactly 5 cards */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="grid grid-cols-5 gap-5 w-full max-w-[1700px]">
          {COURSES.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl
                          transition-all hover:-translate-y-1
                          bg-gradient-to-br ${course.color}
                          aspect-video flex flex-col justify-end p-5 text-white`}
            >
              {/* Card number */}
              <span className="absolute top-3 left-3 text-white/40 text-sm font-mono">
                0{COURSES.indexOf(course) + 1}
              </span>

              {/* Arrow on hover */}
              <span className="absolute top-3 right-3 text-white/40 group-hover:text-white text-xl transition-colors">
                →
              </span>

              {/* Title + blurb at bottom of card */}
              <h2 className="text-2xl font-bold mb-1">{course.title}</h2>
              <p className="text-xs text-white/80 leading-snug">{course.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
