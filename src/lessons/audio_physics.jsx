/**
 * audio_physics.jsx — "Physics of Sound"
 * --------------------------------------
 * Second example lesson. Notice this one uses a COMPLETELY DIFFERENT layout:
 *  - No hero banner.
 *  - A grid of image placeholders in the middle.
 *  - All body text stacked after the grid.
 *
 * This is the whole reason each lesson lives in its own file — you can give
 * each lesson a bespoke layout without fighting a shared template.
 */
export default function AudioPhysics() {
  return (
    <article className="w-full p-10 max-w-6xl mx-auto">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-widest text-indigo-500 mb-2">Lesson 02</p>
        <h1 className="text-5xl font-black text-slate-800">Physics of Sound</h1>
      </header>

      {/* Body text BEFORE the visual grid */}
      <section className="mb-10 text-slate-700 text-lg leading-relaxed space-y-4">
        <p>
          Sound is a mechanical wave — a pressure disturbance that travels
          through a medium such as air, water, or solid material. When an
          object vibrates, it pushes and pulls on the molecules around it,
          creating alternating regions of compression and rarefaction that
          propagate outward from the source.
        </p>
      </section>

      {/* Visual grid in the middle — different from lesson 1's layout */}
      <section className="grid grid-cols-3 gap-4 mb-10">
        {['Compression', 'Rarefaction', 'Waveform'].map((label, i) => (
          <div key={i} className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
            <span className="text-slate-400 text-sm">[ {label} diagram ]</span>
          </div>
        ))}
      </section>

      {/* Body text AFTER the visual grid */}
      <section className="text-slate-700 text-lg leading-relaxed space-y-4">
        <p>
          Two physical properties define any sound wave: <strong>frequency</strong>,
          which we perceive as pitch, and <strong>amplitude</strong>, which we
          perceive as loudness. Frequency is measured in cycles per second
          (Hertz, Hz); amplitude is measured in decibels (dB), a logarithmic
          scale that matches how human hearing works.
        </p>
        <p>
          The human ear can roughly detect frequencies between 20 Hz and
          20,000 Hz, though this range narrows with age and exposure to loud
          sounds. Understanding this range is the foundation for everything
          from EQ decisions in a mix to designing audible UI feedback.
        </p>
      </section>
    </article>
  )
}
