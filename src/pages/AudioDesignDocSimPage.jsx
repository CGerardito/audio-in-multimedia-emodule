import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSectionNav } from '../hooks/useSectionNav.js'
import { AUDIO_DESIGN_DOC as ADD } from '../data/simulations/audio_design_doc.js'
import AudioButton from '../components/AudioButton.jsx'
import BurgerButton from "../components/BurgerButton.jsx";
import { asset } from "../utils/assetPath.js";

/**
 * AudioDesignDocSimPage
 * ---------------------
 * The Audio Design Document simulation.
 *
 * Route: /courses/:courseId/activity/:activityId/play
 *
 * Layout:
 *   - Top-left: Exit button (back to launcher)
 *   - Top-right: Submit button (only enabled when all fields are filled)
 *   - Bottom-left: Burger menu
 *   - Bottom-right: Back to Sessions
 *   - Center: a "paper" document with:
 *       1. Reference image collage at the top
 *       2. Genre dropdown (multi-select)
 *       3. Music audio-choice grid (single select)
 *       4. SFX prompts (each with its own audio-choice grid)
 *   - On submit: shows a results screen with per-field correctness + score
 *
 * The "paper" look is achieved with a light background and dark text,
 * contrasting with the dark UI chrome around it. Adjust the paper styling
 * (bg-plat text-base) if you want a different aesthetic.
 */
export default function AudioDesignDocSimPage() {
  const { courseId, activityId } = useParams()
  const navigate = useNavigate()
  const { course } = useSectionNav(courseId, activityId)

  // === USER ANSWERS ===
  // State shape matches the field types:
  //   dropdown (multi) → array of values: ['action', 'adventure']
  //   dropdown (single) → string: 'action'
  //   audio-choice → string optionId: 'm1'
  //   audio-choice-multi → object keyed by prompt index: { 0: 's1a', 1: 's2a', 2: 's3a' }
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // === CHECK IF ALL FIELDS ARE FILLED ===
  // Used to enable/disable the Submit button.
  function isComplete() {
    return ADD.fields.every((field) => {
      const ans = answers[field.id]
      if (ans === undefined) return false
      if (field.type === 'dropdown' && field.multi) return Array.isArray(ans) && ans.length > 0
      if (field.type === 'audio-choice-multi') {
        return field.prompts.every((_, i) => ans?.[i] !== undefined)
      }
      return ans !== undefined && ans !== ''
    })
  }

  // === SCORING ===
  // Each field gets a point if the answer matches `correct`.
  // For multi-select dropdowns: all selected values must match the correct set
  // (no extra, no missing).
  function calculateScore() {
    let score = 0
    ADD.fields.forEach((field) => {
      const ans = answers[field.id]
      if (field.type === 'dropdown' && field.multi) {
        const correct = [...field.correct].sort()
        const user = [...(ans || [])].sort()
        if (JSON.stringify(correct) === JSON.stringify(user)) score++
      } else if (field.type === 'audio-choice') {
        if (ans === field.correct) score++
      } else if (field.type === 'audio-choice-multi') {
        // Each prompt is worth a fraction. For simplicity, score 1 point
        // if ALL prompts are correct, OR count each correct prompt as 1/N.
        // Let's count each correct prompt as 1 point (so SFX field can give up to 3 points).
        field.prompts.forEach((p, i) => {
          if (ans?.[i] === p.correct) score++
        })
      }
    })
    return score
  }

  function getMaxScore() {
    let max = 0
    ADD.fields.forEach((field) => {
      if (field.type === 'audio-choice-multi') max += field.prompts.length
      else max += 1
    })
    return max
  }

  // === HANDLERS ===
  function setDropdown(fieldId, value, multi) {
    setAnswers((prev) => {
      if (multi) {
        const current = new Set(prev[fieldId] || [])
        if (current.has(value)) current.delete(value)
        else current.add(value)
        return { ...prev, [fieldId]: Array.from(current) }
      }
      return { ...prev, [fieldId]: value }
    })
  }

  function setAudioChoice(fieldId, optionId) {
    setAnswers((prev) => ({ ...prev, [fieldId]: optionId }))
  }

  function setSfxChoice(fieldId, promptIndex, optionId) {
    setAnswers((prev) => ({
      ...prev,
      [fieldId]: { ...(prev[fieldId] || {}), [promptIndex]: optionId },
    }))
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  function handleRetry() {
    setAnswers({})
    setSubmitted(false)
  }

  const score = submitted ? calculateScore() : 0
  const maxScore = getMaxScore()

  return (
    <div className="w-full h-full relative bg-base text-plat flex flex-col">

      {/* =========================================================
          TOP BAR — Exit (left) + Submit (right)
          ========================================================= */}
      <button
        onClick={() => navigate(`/courses/${courseId}/activity/${activityId}`)}
        className="absolute bottom-8 right-9 z-20 w-28 h-28 flex flex-col items-center justify-center
                   rounded-full bg-navy hover:bg-neon hover:text-base text-plat font-JBM text-6xl
                   transition-colors"
      >
          ↩
      </button>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!isComplete()}
          className={`absolute top-8 right-9 z-20 w-28 h-28 flex flex-col items-center justify-center rounded-full text-JBM text-6xl transition-colors disabled:cursor-not-allowed 
          ${isComplete()
              ? 'bg-gold text-base shadow-2xl shadow-gold/50 animate-pulse'
              : 'bg-navy text-plat opacity-20'
          }`}
        >
          ✓
        </button>
      )}

      {/* =========================================================
          MAIN CONTENT — the "paper" document
          ========================================================= */}
      <main className="flex-1 overflow-y-auto custom-scroll pt-28 pb-32 px-8">
        <div className="max-w-6xl mx-auto">

          {/* === RESULTS BANNER (shown after submit) === */}
          {submitted && (
            <div className="mb-8 bg-gold/20 border-2 border-gold rounded-2xl p-8 text-center">
              <h2 className="font-PJS font-extrabold text-7xl text-gold mb-8">
                Skor: {score} / {maxScore}
              </h2>
              <p className="font-PJS text-3xl italic text-plat mb-8">
                {score === maxScore
                  ? 'Mantap! Semua keputusan sesuai dengan referensi.'
                  : score >= maxScore * 0.7
                  ? 'Oke bisa, tapi beberapa pilihan masih belum sesuai.'
                  : 'Perhatikan lagi referensinya.'}
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-gold hover:bg-neon text-base hover:text-navy
                             rounded-xl font-PJS font-semibold text-3xl transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          )}

          {/* === THE "PAPER" DOCUMENT === */}
          <div className="bg-plat text-base rounded-2xl shadow-2xl overflow-hidden">

            {/* === PAPER HEADER === */}
            <div className="bg-navy text-plat px-8 py-6">
              <p className="font-JBM text-xl uppercase tracking-widest text-neon mb-1">
                — Audio Design Document
              </p>
              <h1 className="font-PJS font-extrabold text-5xl">{ADD.title}</h1>
            </div>

            {/* === REFERENCE IMAGE COLLAGE === */}
            <div className="p-8 border-b-4 border-navy">
              <h2 className="font-PJS font-semibold text-4xl text-center mb-4 text-base">
                Referensi Visual
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {ADD.referenceImages.map((img, i) => (
                  <figure key={i} className="text-center">
                    <div className="aspect-video bg-navy/10 rounded-lg overflow-hidden border-2 border-navy/20">
                      <img
                        src={asset(img.src)}
                        alt={img.caption}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    </div>
                    <figcaption className="font-JBM text-xl text-base mt-2">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* === FIELDS === */}
            <div className="p-8 space-y-10">
              {ADD.fields.map((field) => (
                <FieldRenderer
                  key={field.id}
                  field={field}
                  answer={answers[field.id]}
                  submitted={submitted}
                  onDropdown={(value) => setDropdown(field.id, value, field.multi)}
                  onAudioChoice={(optionId) => setAudioChoice(field.id, optionId)}
                  onSfxChoice={(promptIndex, optionId) => setSfxChoice(field.id, promptIndex, optionId)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================
          BOTTOM-LEFT: BURGER MENU
          ========================================================= */}
      <BurgerButton />
    </div>
  )
}

/**
 * FieldRenderer — dispatches to the right sub-component based on field type.
 */
function FieldRenderer({ field, answer, submitted, onDropdown, onAudioChoice, onSfxChoice }) {
  if (field.type === 'dropdown') {
    return (
      <DropdownField
        field={field}
        answer={answer}
        submitted={submitted}
        onChange={onDropdown}
      />
    )
  }
  if (field.type === 'audio-choice') {
    return (
      <AudioChoiceField
        field={field}
        answer={answer}
        submitted={submitted}
        onSelect={onAudioChoice}
      />
    )
  }
  if (field.type === 'audio-choice-multi') {
    return (
      <AudioChoiceMultiField
        field={field}
        answer={answer}
        submitted={submitted}
        onSelect={onSfxChoice}
      />
    )
  }
  return null
}

/**
 * DropdownField — renders a dropdown (single or multi-select).
 *
 * For multi-select: checkboxes styled as a button grid.
 * For single-select: a native <select> element.
 *
 * After submit, shows ✓ (correct) or ✗ (wrong) indicator.
 */
function DropdownField({ field, answer, submitted, onChange }) {
  const isCorrect = submitted && (() => {
    if (field.multi) {
      const correct = [...field.correct].sort()
      const user = [...(answer || [])].sort()
      return JSON.stringify(correct) === JSON.stringify(user)
    }
    return answer === field.correct
  })()

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h3 className="font-PJS font-extrabold text-5xl text-base">{field.label}</h3>
        {submitted && (
          <span className={`text-5xl ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
            {isCorrect ? '✓' : '✗'}
          </span>
        )}
      </div>
      {field.description && (
        <p className="font-PJS italic text-2xl text-navy mb-4">{field.description}</p>
      )}

      {/* Multi-select: checkbox grid */}
      {field.multi ? (
        <div className="grid grid-cols-3 gap-2">
          {field.options.map((opt) => {
            const checked = (answer || []).includes(opt.value)
            const isCorrectChoice = field.correct.includes(opt.value)
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer
                            transition-colors ${
                              submitted
                                ? isCorrectChoice
                                  ? 'border-green-500 bg-green-100'
                                  : checked
                                  ? 'border-red-400 bg-red-100'
                                  : 'border-navy/20'
                                : checked
                                ? 'border-neon bg-neon/10'
                                : 'border-navy/20 hover:border-navy'
                            }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={submitted}
                  onChange={() => onChange(opt.value)}
                  className="w-10 h-10 accent-neon"
                />
                <span className="font-JBM font-bold text-5xl text-base tracking-tight">{opt.label}</span>
              </label>
            )
          })}
        </div>
      ) : (
        /* Single-select: native <select> */
        <select
          value={answer || ''}
          disabled={submitted}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-navy/20 bg-white
                     font-PJS font-medium text-base focus:border-neon focus:outline-none"
        >
          <option value="">— Pilih —</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
    </div>
  )
}

/**
 * AudioChoiceField — renders a grid of AudioButtons, user picks one.
 */
function AudioChoiceField({ field, answer, submitted, onSelect }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h3 className="font-PJS font-extrabold text-5xl text-base">{field.label}</h3>
        {submitted && (
          <span className={`text-5xl ${answer === field.correct ? 'text-green-600' : 'text-red-500'}`}>
            {answer === field.correct ? '✓' : '✗'}
          </span>
        )}
      </div>
      {field.description && (
        <p className="font-PJS text-navy text-2xl italic mb-4">{field.description}</p>
      )}

      <div className="grid grid-cols-4 gap-3">
        {field.options.map((opt) => {
          const isSelected = answer === opt.id
          const isCorrect = opt.id === field.correct
          return (
            <div
              key={opt.id}
              className={`flex flex-col gap-3 p-4 rounded-xl border-2 transition-colors ${
                submitted
                  ? isCorrect
                    ? 'border-green-500 bg-green-100'
                    : isSelected
                    ? 'border-red-400 bg-red-100'
                    : 'border-navy/20'
                  : isSelected
                  ? 'border-neon bg-neon/10'
                  : 'border-navy/20 hover:border-navy'
              }`}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  checked={isSelected}
                  disabled={submitted}
                  onChange={() => onSelect(opt.id)}
                  className="w-10 h-10 accent-neon"
                />
                <span className="font-JBM font-bold text-5xl text-base tracking-tight">{opt.label}</span>
              </label>
              <div className="flex justify-center">
                <AudioButton
                    compact
                  src={asset(opt.audioSrc)}
                  label="Dengar"
                  className="!text-base !bg-navy !text-plat hover:!bg-neon hover:!text-base"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * AudioChoiceMultiField — multiple prompts, each with its own audio-choice grid.
 * Used for SFX where each scene needs its own sound.
 */
function AudioChoiceMultiField({ field, answer, submitted, onSelect }) {
  return (
    <div>
      <h3 className="font-PJS font-extrabold text-5xl text-base mb-2">{field.label}</h3>
      {field.description && (
        <p className="font-PJS text-2xl italic text-navy mb-6">{field.description}</p>
      )}

      <div className="space-y-8">
        {field.prompts.map((prompt, promptIdx) => {
          const userAnswer = answer?.[promptIdx]
          const isCorrect = userAnswer === prompt.correct
          return (
            <div key={promptIdx} className="bg-navy/30 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-JBM font-bold text-3xl text-neon bg-base rounded-full p-4">
                  {String(promptIdx + 1).padStart(2, '0')}
                </span>
                <p className="font-PJS font-semibold italic text-4xl text-base flex-1">"{prompt.prompt}"</p>
                {submitted && (
                  <span className={`text-5xl ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {prompt.options.map((opt) => {
                  const isSelected = userAnswer === opt.id
                  const isCorrectOpt = opt.id === prompt.correct
                  return (
                    <div
                      key={opt.id}
                      className={`flex items-center gap-4 p-3 rounded-lg border-2 transition-colors ${
                        submitted
                          ? isCorrectOpt
                            ? 'border-green-500 bg-green-100'
                            : isSelected
                            ? 'border-red-400 bg-red-100'
                            : 'border-navy/40'
                          : isSelected
                          ? 'border-neon bg-neon/10'
                          : 'border-navy/40 hover:border-navy'
                      }`}
                    >
                      <label className="flex items-center gap-3 cursor-pointer flex-1">
                        <input
                          type="radio"
                          name={`${field.id}-${promptIdx}`}
                          checked={isSelected}
                          disabled={submitted}
                          onChange={() => onSelect(promptIdx, opt.id)}
                          className="w-10 h-10 accent-neon"
                        />
                        <span className="font-JBM font-bold text-3xl text-base">{opt.label}</span>
                      </label>
                      <AudioButton
                          compact
                        src={asset(opt.audioSrc)}
                        label="Dengar"
                        className="!text-base !bg-navy !text-plat hover:!bg-neon hover:!text-base !px-5 !py-3 !text-lg"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
