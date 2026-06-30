/**
 * audio_digital.jsx — "Digital Audio Basics"
 * ------------------------------------------
 * Third example lesson. Yet another layout: a 2x2 key-concept grid
 * followed by a callout. Demonstrates that each .jsx is fully independent.
 */
export default function AudioDigital() {
  const concepts = [
    { title: 'Sampling',      body: 'Measuring the amplitude of an analog signal at regular intervals.' },
    { title: 'Sample Rate',   body: 'Number of samples per second. CD audio = 44.1 kHz.' },
    { title: 'Bit Depth',     body: 'How many bits per sample. CD audio = 16-bit; pro = 24-bit.' },
    { title: 'Channels',      body: 'Mono (1), stereo (2), surround (5.1, 7.1), spatial (Atmos).' },
  ]

  return (
    <article className="w-full p-10 max-w-6xl mx-auto">
      <header className="mb-8">
        <p className="text-sm uppercase tracking-widest text-indigo-500 mb-2">Lesson 03</p>
        <h1 className="text-5xl font-black text-slate-800">Digital Audio Basics</h1>
      </header>

      <p className="text-slate-700 text-lg leading-relaxed mb-8 max-w-3xl">
        Computers can't store continuous analog signals directly. Instead,
        they capture snapshots — <em>samples</em> — of the signal's amplitude
        at fixed intervals. The quality of digital audio depends on how
        often you sample (sample rate) and how precisely you measure each
        sample (bit depth).
      </p>

      <section className="grid grid-cols-2 gap-6 mb-10">
        {concepts.map((c) => (
          <div key={c.title} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">{c.title}</h3>
            <p className="text-slate-600">{c.body}</p>
          </div>
        ))}
      </section>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
        <p className="text-amber-900">
          <strong>Nyquist Theorem:</strong> To capture a frequency accurately,
          your sample rate must be at least <em>twice</em> that frequency.
          That's why 44.1 kHz captures up to ~22 kHz — just above human hearing.
        </p>
      </div>
    </article>
  )
}
