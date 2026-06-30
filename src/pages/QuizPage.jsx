import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSectionNav } from '../hooks/useSectionNav.js'
import { useScrollReset } from "../hooks/useScrollReset.js";
import quizData from '../data/quiz_sample.json'
import { saveScoreIfHigher } from '../utils/highScore.js'
import AudioButton from '../components/AudioButton.jsx'
import BurgerButton from "../components/BurgerButton.jsx";

/**
 * QuizPage (Player) — SINGLE PAGE VERSION
 * ---------------------------------------
 * All questions displayed on one scrollable page.
 * User answers all questions, then clicks "Periksa Jawaban" at the bottom.
 * Results shown inline (✓/✗ per question) + summary at top.
 *
 * Route: /courses/:courseId/quiz/:quizId/play
 *
 * Supports text-only questions AND media-rich questions:
 *   - Question prompt can have optional `media` (image / audio / video)
 *   - Each choice can be plain text OR an object with `text` + optional `media`
 *
 * JSON schema (same as before):
 *   {
 *     "questions": [
 *       {
 *         "prompt": "...",
 *         "media": { "type": "image|audio|video", "src": "..." },  // optional
 *         "choices": ["string", { "text": "...", "media": {...} }],
 *         "answerIndex": 0
 *       }
 *     ]
 *   }
 *
 * On submit, saves the score to localStorage (if it beats the high score).
 */
export default function QuizPage() {
  const { courseId, quizId } = useParams()
  const navigate = useNavigate()
  const mainRef = useScrollReset(quizId)
  const { course } = useSectionNav(courseId, quizId)
  const quiz = quizData // TODO: lookup by quizId when you have multiple quizzes

  // answers is an object: { 0: selectedIndex, 1: selectedIndex, ... }
  // null/undefined = not answered yet
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [savedScore, setSavedScore] = useState(false)

  const totalQuestions = quiz.questions.length
  const answeredCount = Object.values(answers).filter(a => a !== null && a !== undefined).length
  const allAnswered = answeredCount === totalQuestions

  // Calculate score once submitted
  const correctCount = submitted
    ? quiz.questions.filter((q, i) => answers[i] === q.answerIndex).length
    : 0

  // Save high score when submitted (runs once)
  if (submitted && !savedScore) {
    saveScoreIfHigher(quizId, correctCount)
    setSavedScore(true)
  }

  function handleSelect(questionIndex, choiceIndex) {
    if (submitted) return  // can't change answers after submitting
    setAnswers(prev => ({ ...prev, [questionIndex]: choiceIndex }))
  }

  function handleSubmit() {
    if (!allAnswered) return
    setSubmitted(true)
    // Scroll to top so user sees the results summary
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleRetry() {
    setAnswers({})
    setSubmitted(false)
    setSavedScore(false)
  }

  function handleBackToLauncher() {
    navigate(`/courses/${courseId}/quiz/${quizId}`)
  }

  // Helper to normalize a choice into { text, media } form
  function normalizeChoice(choice) {
    if (typeof choice === 'string') return { text: choice, media: null }
    return { text: choice.text || '', media: choice.media || null }
  }

  return (
    <div className="w-full h-full flex flex-col bg-base text-plat">

      {/* === HEADER === */}
      {/*<div className="absolute top-8 right-9 font-JBM text-5xl text-plat bg-navy rounded-2xl p-6">
        {answeredCount}/{totalQuestions}
      </div>*/}

      {/* === MAIN CONTENT === */}
      <main ref={mainRef}
          className="flex-1 overflow-y-auto custom-scroll p-10">

        <div className="max-w-5xl mx-auto">

          {/* === RESULTS BANNER (shown after submit) === */}
          {submitted && (
              <div className="sticky top-0 z-50 bg-base rounded-2xl">
                <div className="mb-8 bg-gold/10 border-2 border-gold rounded-2xl p-8 text-center">
                  <h2 className="font-PJS font-extrabold text-5xl text-gold mb-8">
                    Skor: {correctCount} / {totalQuestions}
                  </h2>
                  <p className="font-PJS text-3xl text-plat mb-6">
                    {correctCount === totalQuestions
                      ? '✨ "Sempurna! Semua jawaban benar."'
                      : correctCount >= totalQuestions * 0.7
                      ? '👍 "Mantap! Coba sampai dapat skor sempurna."'
                      : correctCount >= totalQuestions * 0.5
                      ? '😊 "Masih ada yang bisa diperbaiki. Baca lagi materinya."'
                      : '🙁 "Pelajari lagi materinya dan coba lagi."'}
                  </p>
                    <button
                      onClick={handleRetry}
                      className="px-6 py-3 bg-gold hover:bg-gold/70 text-base
                                 rounded-xl font-PJS font-semibold text-2xl transition-colors"
                    >
                      Coba Lagi
                    </button>
                </div>
              </div>
          )}

          {/* === QUESTIONS LIST === */}
          <div className="space-y-12 mt-24">
            {quiz.questions.map((question, qIndex) => {
              const userAnswer = answers[qIndex]
              const isAnswered = userAnswer !== undefined && userAnswer !== null
              const isCorrect = submitted && userAnswer === question.answerIndex

              return (
                <div
                  key={qIndex}
                  className={`bg-navy/20 rounded-2xl border-2 p-8 ${
                    submitted
                      ? isCorrect
                        ? 'border-green-500/50'
                        : 'border-red-500/50'
                      : 'border-navy'
                  }`}
                >
                  {/* Question header: number + result icon */}
                  <div className="flex items-start gap-2 mb-6">
                    <span className="font-JBM text-3xl text-neon shrink-0 leading-snug">
                      {String(qIndex + 1).padStart(2, '0')}.
                    </span>
                    <div className="flex-1">
                      <h2 className="font-PJS font-semibold text-3xl text-plat leading-snug">
                        {question.prompt}
                      </h2>
                    </div>
                    {submitted && (
                      <span className={`text-3xl shrink-0 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                    )}
                  </div>

                  {/* Optional question media */}
                  {question.media && (
                    <div className="mb-4">
                      <QuestionMedia media={question.media} />
                    </div>
                  )}

                  {/* Choices */}
                  <div className="grid grid-cols-2 gap-3">
                    {question.choices.map((rawChoice, cIndex) => {
                      const choice = normalizeChoice(rawChoice)
                      const isSelected = userAnswer === cIndex
                      const isCorrectChoice = cIndex === question.answerIndex

                      let cls = 'border-navy bg-base/50 hover:border-gold/50 text-plat/80'
                      if (submitted) {
                        if (isCorrectChoice) {
                          cls = 'border-green-500 bg-green-500/10 text-plat'
                        } else if (isSelected) {
                          cls = 'border-red-500 bg-red-500/10 text-plat'
                        }
                      } else if (isSelected) {
                        cls = 'border-gold bg-gold/10 text-plat'
                      }

                      return (
                        <button
                          key={cIndex}
                          onClick={() => handleSelect(qIndex, cIndex)}
                          disabled={submitted}
                          className={`text-left px-6 py-4 rounded-xl border-2 transition-colors
                                      flex items-center gap-4 ${cls} ${
                            submitted ? 'cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          <span className="font-JBM text-xl text-gold shrink-0 w-8">
                            {String.fromCharCode(65 + cIndex)}.
                          </span>
                          <div className="flex-1">
                            {choice.text && (
                              <span className="font-PJS text-3xl block mb-2">
                                {choice.text}
                              </span>
                            )}
                            {choice.media && (
                              <ChoiceMedia media={choice.media} />
                            )}
                          </div>
                          {submitted && isCorrectChoice && (
                            <span className="text-green-400 text-xl shrink-0">✓</span>
                          )}
                          {submitted && isSelected && !isCorrectChoice && (
                            <span className="text-red-400 text-xl shrink-0">✗</span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Explanation after submit (if user got it wrong) */}
                  {submitted && !isCorrect && (
                    <p className="mt-4 font-PJS text-xl text-plat/50 italic">
                      Jawaban benar:{' '}
                      <span className="text-green-400 font-semibold">
                        {String.fromCharCode(65 + question.answerIndex)}.{' '}
                        {normalizeChoice(question.choices[question.answerIndex]).text}
                      </span>
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {/* === SUBMIT BUTTON (bottom) === */}
          {!submitted && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="px-12 py-5 bg-gold text-base rounded-2xl font-PJS font-extrabold text-2xl
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:bg-gold/80 transition-colors shadow-lg"
              >
                {allAnswered
                  ? 'Periksa Jawaban →'
                  : `Jawab semua soal (${answeredCount}/${totalQuestions})`}
              </button>
            </div>
          )}

          <div className="h-32" />
        </div>

      </main>

      {/* =========================================================
          BOTTOM-LEFT: BURGER MENU
          ========================================================= */}
      <BurgerButton />

      <button
          onClick={handleBackToLauncher}
          className="absolute bottom-6 right-9 z-20 w-28 h-28 flex flex-col items-center justify-center
             rounded-full bg-navy hover:bg-neon hover:text-base text-plat font-JBM text-6xl
             transition-colors"
          aria-label="Kembali ke daftar sesi"
      >
        ↩
      </button>

    </div>
  )
}

/**
 * QuestionMedia — renders media attached to a question prompt.
 */
function QuestionMedia({ media }) {
  if (!media) return null

  if (media.type === 'image') {
    return (
      <img
        src={media.src}
        alt="Question reference"
        className="max-w-full max-h-96 rounded-xl border-2 border-navy mx-auto pointer-events-none select-none"
      />
    )
  }

  if (media.type === 'audio') {
    return (
      <div className="flex w-full justify-center p-4">
        <AudioButton src={media.src} label="Putar Audio" compact />
      </div>
    )
  }

  if (media.type === 'video') {
    if (media.cloudflareCustomerId && media.cloudflareVideoId) {
      return (
        <iframe
          src={`https://customer-${media.cloudflareCustomerId}.cloudflarestream.com/${media.cloudflareVideoId}/iframe`}
          title="Question video"
          className="w-full aspect-video rounded-xl border-2 border-navy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )
    }
    return (
      <video
        src={media.src}
        controls
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        className="w-full aspect-video rounded-xl border-2 border-navy"
      />
    )
  }

  return null
}

/**
 * ChoiceMedia — renders media inside a choice button.
 */
function ChoiceMedia({ media }) {
  if (!media) return null

  if (media.type === 'image') {
    return (
      <img
        src={media.src}
        alt="Choice"
        className="max-h-32 rounded-lg border border-navy"
      />
    )
  }

  if (media.type === 'audio') {
    return (
      <div className="mt-2">
        <AudioButton src={media.src} label="Dengar" compact />
      </div>
    )
  }

  return null
}
