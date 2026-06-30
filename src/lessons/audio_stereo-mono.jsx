/**
 * audio_stereo-mono.jsx — "Stereo vs. Mono"
 * -----------------------------------------
 * REFERENCE TEMPLATE — copy this file as a starting point for new lessons.
 *
 * This file demonstrates every common pattern you'll use inside a lesson:
 *   1. The <article> wrapper (root element of every lesson)
 *   2. Headers with lesson number + title
 *   3. Body paragraphs with inline bold/italic
 *   4. Section subheadings
 *   5. Image grids (placeholder boxes for now)
 *   6. Callout boxes (info / warning / tip)
 *   7. Definition lists
 *   8. Comparison tables
 *   9. Numbered lists and bullet lists
 *  10. Audio player placeholders (for when you wire up Tone.js)
 *  11. Video player placeholder (for click-to-play video examples)
 *
 * === THE <article> WRAPPER — read this first ===
 *
 * Every lesson file default-exports a React component whose root element
 * is <article>. The LessonPage shell already provides:
 *   - The 16:9 stage
 *   - Top header (back button + prev/next)
 *   - Bottom-left burger menu
 *   - A scrollable <main> container
 *
 * Your <article> renders INSIDE that <main>. So you don't need to worry
 * about the page chrome — just the lesson content.
 *
 * The <main> has `overflow-y-auto`, so your <article> can be as tall as
 * it wants. Use `w-full` on <article> to fill the width.
 *
 * Recommended max-width: `max-w-5xl mx-auto` to keep line lengths readable
 * on wide stages. Adjust per lesson if you want a different feel.
 *
 * === WHAT YOU CAN DO ===
 *
 * Because each lesson is its own .jsx file, you have FULL control over:
 *   - Layout (grids, columns, flex, absolute positioning)
 *   - Typography (sizes, weights, fonts via font-pjs / font-jbm)
 *   - Colors (your palette: #121212 / #2C3E50 / #00D1FF / #FFB800 / #E0E0E0)
 *   - Interactive elements (buttons, toggles, expandable sections)
 *   - Embedded media (images, audio, video)
 *
 * The three example lessons in this folder (audio_intro, audio_physics,
 * audio_digital) each use a DIFFERENT layout to prove the point — open
 * them up to see different patterns.
 */

export default function StereoMono() {
  return (
    <article className="w-full max-w-5xl mx-auto p-12 font-pjs font-medium text-[#E0E0E0]">

      {/* =====================================================
          1. LESSON HEADER — number + title
          ===================================================== */}
      <header className="mb-12">
        <p className="font-jbm text-sm uppercase tracking-widest text-[#00D1FF] mb-3">
          Lesson 02
        </p>
        <h1 className="font-pjs font-extrabold text-6xl tracking-tight mb-4">
          Stereo vs. Mono
        </h1>
        <p className="text-xl text-[#E0E0E0]/60 leading-relaxed">
          How channel count shapes the spatial experience of audio in multimedia.
        </p>
      </header>

      {/* =====================================================
          2. BODY PARAGRAPHS with inline bold/italic
          ===================================================== */}
      <section className="mb-10 space-y-5 text-lg leading-relaxed">
        <p>
          <strong className="text-white">Mono</strong> (monaural) audio uses a
          single channel — every speaker plays the exact same signal.{' '}
          <em>Stereo</em> uses two channels (left and right), letting the listener
          perceive direction and width. The difference isn't just about volume;
          it's about <strong className="text-[#00D1FF]">spatial realism</strong>.
        </p>
        <p>
          In multimedia, stereo is the default for music, dialogue, and most
          field recordings. Mono is still common for voiceovers, podcasts, and
          UI sound effects — anything where spatial placement would be
          distracting or irrelevant.
        </p>
      </section>

      {/* =====================================================
          3. SECTION SUBHEADING + COMPARISON TABLE
          ===================================================== */}
      <section className="mb-12">
        <h2 className="font-pjs font-semibold text-3xl mb-6 text-white">
          When to use which
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[#2C3E50]">
          <table className="w-full text-left">
            <thead className="bg-[#2C3E50] text-[#00D1FF]">
              <tr>
                <th className="px-6 py-4 font-pjs font-semibold">Use case</th>
                <th className="px-6 py-4 font-pjs font-semibold">Recommended</th>
                <th className="px-6 py-4 font-pjs font-semibold">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C3E50]">
              <tr className="hover:bg-[#1a1a1a]">
                <td className="px-6 py-4">Music score</td>
                <td className="px-6 py-4 text-[#00D1FF]">Stereo</td>
                <td className="px-6 py-4 text-[#E0E0E0]/70">Width and panning add emotion.</td>
              </tr>
              <tr className="hover:bg-[#1a1a1a]">
                <td className="px-6 py-4">Voiceover narration</td>
                <td className="px-6 py-4 text-[#FFB800]">Mono</td>
                <td className="px-6 py-4 text-[#E0E0E0]/70">Center-anchored, clear, portable.</td>
              </tr>
              <tr className="hover:bg-[#1a1a1a]">
                <td className="px-6 py-4">UI click / notification</td>
                <td className="px-6 py-4 text-[#FFB800]">Mono</td>
                <td className="px-6 py-4 text-[#E0E0E0]/70">No spatial cue needed; smaller file.</td>
              </tr>
              <tr className="hover:bg-[#1a1a1a]">
                <td className="px-6 py-4">Foley / ambient bed</td>
                <td className="px-6 py-4 text-[#00D1FF]">Stereo</td>
                <td className="px-6 py-4 text-[#E0E0E0]/70">Creates sense of environment.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          4. CALLOUT BOX (tip / info / warning)
          ===================================================== */}
      <div className="bg-[#00D1FF]/10 border-l-4 border-[#00D1FF] p-6 rounded-r-xl mb-12">
        <p className="text-[#00D1FF] font-pjs font-semibold mb-2">💡 Tip</p>
        <p className="text-[#E0E0E0]/80 leading-relaxed">
          Always mix in mono first. If your mix sounds good in mono, it will
          sound great in stereo. The reverse is not true — a stereo mix can
          have phase issues that vanish when summed to mono.
        </p>
      </div>

      {/* =====================================================
          5. IMAGE GRID (replace placeholders with real images)
          ===================================================== */}
      <section className="mb-12">
        <h2 className="font-pjs font-semibold text-3xl mb-6 text-white">
          Visualizing the difference
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Replace with: import monoImg from '../assets/images/mono.png' */}
          <figure className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2C3E50]">
            <div className="aspect-video bg-[#2C3E50] rounded-lg flex items-center justify-center mb-4">
              <span className="font-jbm text-[#E0E0E0]/40">[ mono waveform ]</span>
            </div>
            <figcaption className="text-sm text-[#E0E0E0]/60">
              Mono — single waveform, no spatial info.
            </figcaption>
          </figure>
          <figure className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2C3E50]">
            <div className="aspect-video bg-[#2C3E50] rounded-lg flex items-center justify-center mb-4">
              <span className="font-jbm text-[#E0E0E0]/40">[ stereo waveforms ]</span>
            </div>
            <figcaption className="text-sm text-[#E0E0E0]/60">
              Stereo — two waveforms (L + R), creates width.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* =====================================================
          6. VIDEO PLACEHOLDER — click to play
          =====================================================
          This is a placeholder pattern. See the chat message for
          video hosting options. Once you decide on a host, replace
          this block with an <iframe> (YouTube/Vimeo) or <video>
          (self-hosted/Bunny/Cloudflare). */}
      <section className="mb-12">
        <h2 className="font-pjs font-semibold text-3xl mb-6 text-white">
          Listen: mono vs. stereo
        </h2>
        <button
          onClick={() => alert('Video player — TODO. See chat for hosting options.')}
          className="w-full aspect-video bg-[#1a1a1a] rounded-2xl border-2 border-dashed border-[#2C3E50]
                     hover:border-[#00D1FF] transition-colors flex flex-col items-center justify-center
                     group"
        >
          <div className="w-20 h-20 rounded-full bg-[#00D1FF]/20 group-hover:bg-[#00D1FF]/40
                          flex items-center justify-center mb-4 transition-colors">
            <span className="text-[#00D1FF] text-4xl">▶</span>
          </div>
          <p className="font-pjs font-medium text-[#E0E0E0]/70 group-hover:text-[#00D1FF] transition-colors">
            Click to play — Stereo vs. Mono demo (1:24)
          </p>
        </button>
      </section>

      {/* =====================================================
          7. DEFINITION LIST
          ===================================================== */}
      <section className="mb-12">
        <h2 className="font-pjs font-semibold text-3xl mb-6 text-white">
          Key terms
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2C3E50]">
            <dt className="font-pjs font-semibold text-[#00D1FF] mb-2">Channel</dt>
            <dd className="text-[#E0E0E0]/70">An independent audio signal path.</dd>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2C3E50]">
            <dt className="font-pjs font-semibold text-[#00D1FF] mb-2">Panning</dt>
            <dd className="text-[#E0E0E0]/70">Placing a sound between L and R speakers.</dd>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2C3E50]">
            <dt className="font-pjs font-semibold text-[#00D1FF] mb-2">Phase</dt>
            <dd className="text-[#E0E0E0]/70">The position of a wave in its cycle.</dd>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2C3E50]">
            <dt className="font-pjs font-semibold text-[#00D1FF] mb-2">Summing</dt>
            <dd className="text-[#E0E0E0]/70">Combining channels (e.g. stereo → mono).</dd>
          </div>
        </dl>
      </section>

      {/* =====================================================
          8. NUMBERED LIST (steps)
          ===================================================== */}
      <section className="mb-12">
        <h2 className="font-pjs font-semibold text-3xl mb-6 text-white">
          How to test your mix in mono
        </h2>
        <ol className="space-y-4">
          {[
            'Open your DAW or audio editor.',
            'Find the master output channel.',
            'Insert a mono summing plugin (or use a "mono" utility).',
            'Toggle it on and listen — anything that disappears had phase issues.',
            'Fix phase problems with track delay, polarity flip, or mic repositioning.',
          ].map((step, i) => (
            <li key={i} className="flex gap-5">
              <span className="font-jbm text-2xl text-[#00D1FF] shrink-0 w-10">
                {String(i + 1).padStart(2, '0')}.
              </span>
              <span className="text-[#E0E0E0]/80 leading-relaxed pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* =====================================================
          9. END SPACER (so content doesn't bump against the bottom)
          ===================================================== */}
      <div className="h-32" />
    </article>
  )
}
