import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSectionNav } from '../hooks/useSectionNav.js'
import quizData from '../data/quiz_sample.json'
import { getHighScore, resetHighScore } from '../utils/highScore.js'
import BurgerButton from '../components/BurgerButton.jsx'
import bgImage from "/assets/images/landing.jpg";

/**
 * QuizLauncherPage
 * ----------------
 * Shows quiz description, high score, and a "Start Quiz" button.
 *
 * Layout (matches LessonPage):
 *   - Top-left: Prev button (rounded-rectangle, "Sebelumnya" label)
 *   - Top-right: Next button (rounded-rectangle, "Berikutnya" label)
 *   - Bottom-left: Burger menu (Pengaturan, Atribusi, Kembali ke Sesi, Kembali ke Landing)
 *   - Bottom-right: Back to Sessions (round button)
 *   - Center: Quiz title, description, question count, high score, Start button
 *
 * Route: /courses/:courseId/quiz/:quizId
 *   (this page)
 * Route: /courses/:courseId/quiz/:quizId/play
 *   (the actual quiz, handled by QuizPage.jsx)
 */
export default function QuizLauncherPage() {
  const { courseId, quizId } = useParams()
  const navigate = useNavigate()
  const { course, prevSection, nextSection, routeFor } = useSectionNav(courseId, quizId)
  const quiz = quizData // TODO: lookup by quizId when you have multiple quizzes

  const [highScore, setHighScore] = useState(getHighScore(quizId))

  function handleStart() {
    navigate(`/courses/${courseId}/quiz/${quizId}/play`)
  }

  function handleReset() {
    resetHighScore(quizId)
    setHighScore(0)
  }

  const totalQuestions = quiz.questions.length
  const hasScore = highScore > 0

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

      {/* =========================================================
          CENTERED CONTENT — quiz description, high score, start button
          ========================================================= */}
      <main className="flex-1 overflow-y-auto custom-scroll pt-28 pb-32 flex items-center justify-center z-10">
        <div className="max-w-5xl w-full mx-auto px-8 bg-navy rounded-2xl p-8">
          {/* Badge */}
          <span className="inline-block text-md font-JBM font-bold px-4 py-1.5 rounded-full
                           bg-gold/20 text-gold uppercase tracking-wider mb-6">
            Quiz · {quizId}
          </span>

          {/* Title + description */}
          <h1 className="font-PJS font-extrabold text-7xl text-plat mb-6 leading-tight">
            {quiz.title}
          </h1>
          <div className="flex gap-4">
            <h2 className="font-JBM font-bold text-3xl leading-relaxed text-neon">
              Topik:
            </h2>
            <p className="font-PJS font-medium text-3xl leading-relaxed text-plat mb-10">
              {quiz.description}
            </p>
          </div>

          {/* Info row: question count + high score */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-gold/30 border-2 border-gold rounded-2xl p-6 text-center">
              <p className="font-JBM text-2xl text-plat uppercase tracking-wide mb-2">
                Jumlah Soal
              </p>
              <p className="font-PJS font-extrabold text-5xl text-plat">{totalQuestions}</p>
            </div>

            <div className="bg-gold/10 border-2 border-gold rounded-2xl p-6 text-center">
              <p className="font-JBM text-2xl text-gold uppercase tracking-wide mb-2 italic">
                Highscore
              </p>
              <p className="font-PJS font-extrabold text-5xl text-gold">
                {hasScore ? `${highScore}/${totalQuestions}` : '—'}
              </p>
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={handleStart}
            className="w-full px-8 py-6 bg-gold hover:bg-gold/80 text-base
                       rounded-2xl font-PJS font-extrabold text-3xl
                       transition-colors shadow-lg"
          >
            Mulai Quiz →
          </button>

          {/* Reset high score (only shown if a score exists) */}
          {hasScore && (
            <button
              onClick={handleReset}
              className="block mx-auto mt-6 font-JBM text-xl text-neon/80 hover:text-neon underline"
            >
              Reset <em>Highscore</em>
            </button>
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
