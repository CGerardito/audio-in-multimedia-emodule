/**
 * audio_intro.jsx — "What is Audio?"
 * ----------------------------------
 * Example lesson. Notice:
 *  - Default export is a React component (required for lazy loading).
 *  - All layout is done with Tailwind classes — NO external CSS file.
 *  - Layout is unique to this lesson (full-bleed hero, 3-column body).
 *  - Other lessons can have completely different layouts; that's the point
 *    of giving each lesson its own file.
 */
export default function AudioIntro() {
  return (
    <article className="w-full">
      {/* Full-bleed hero — different from other lessons on purpose */}
      <section className="relative h-72 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-indigo-200 mb-2">Lesson 01</p>
          <h1 className="text-6xl font-black">What is Audio?</h1>
        </div>
      </section>

      {/* Two-column body with a sidebar — only this lesson uses this layout */}
      <section className="grid grid-cols-3 gap-10 p-10 max-w-6xl mx-auto">
        <div className="col-span-2 space-y-6 text-slate-700 text-lg leading-relaxed">
          <p>
            <strong>Audio</strong> refers to sound that has been captured,
            created, or transmitted in a form that can be reproduced
            electronically. In multimedia, audio is one of the core sensory
            channels alongside visuals, and it plays a disproportionate role
            in shaping the audience's emotional response.
          </p>
          <p>
            Even a single silent video can feel completely different depending
            on whether you add a tense drone, an upbeat pop track, or no music
            at all. This is why audio is often called the "invisible half" of
            multimedia — when it's done right, the audience doesn't notice it.
            When it's missing or wrong, the experience collapses.
          </p>
          <p>
            Throughout this course you'll learn the building blocks of audio
            in multimedia: how sound is captured and stored digitally, how
            music and sound effects shape a scene, how voice carries narrative
            weight, and how all of these elements are mixed together for
            final delivery.
          </p>
        </div>

        <aside className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-3">Key Terms</h3>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-indigo-700">Frequency</dt>
              <dd className="text-slate-600">Pitch, measured in Hertz (Hz).</dd>
            </div>
            <div>
              <dt className="font-semibold text-indigo-700">Amplitude</dt>
              <dd className="text-slate-600">Loudness, measured in decibels (dB).</dd>
            </div>
            <div>
              <dt className="font-semibold text-indigo-700">Sample Rate</dt>
              <dd className="text-slate-600">How often a signal is sampled per second.</dd>
            </div>
          </dl>
        </aside>
      </section>
    </article>
  )
}
