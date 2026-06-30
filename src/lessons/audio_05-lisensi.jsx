import { useState } from 'react'
import { asset } from "../utils/assetPath.js";
import spectrumOfRights from "/assets/images/Spectrumofrights.jpg";

/* ============================================================================
 * TAB DATA — 4 Terminology Entries
 * ============================================================================
 * Each tab has an id, label, icon, and content (JSX).
 * The content is the same text that was previously in the 4 separate cards.
 * ============================================================================ */
const TERMINOLOGY_TABS = [
  {
    id: 'copyright',
    label: 'Copyright',
    image: '/assets/images/icons/copyright-icon.png',
    content: (
      <p>
        Ketika seseorang membuat suatu karya digital, baik itu karya utuh
        atau karya aset digital yang dapat digunakan oleh orang lain, mereka
        memiliki <span className="text-neon">hak untuk mengatur percetakan ulang, duplikasi, distribusi,
        penampilan, hingga adaptasi dari karya</span> mereka. Hak ini disebut{' '}
        <em>copyright</em>. <em>Copyright</em> memastikan karya yang dibuat
        oleh seorang artis atau kreator merupakan kepunyaan mereka dan tidak
        dapat di salah gunakan oleh pihak lain.
      </p>
    ),
  },
  {
    id: 'publicdomain',
    label: 'Public Domain',
    image: '/assets/images/icons/creative-commons-public-domain-icon.png',
    content: (
      <p>
        <em>Public domain</em> merupakan klasifikasi karya digital yang tidak
        dilindungi oleh hak milik dalam bentuk apapun. Biasanya karena hak
        milik tersebut telah kedaluwarsa atau tidak ada pihak yang memegang
        dan menggerakkan hak milik tersebut. Karya atau aset digital di{' '}
        <em>public domain</em>{' '}<span className="text-neon">bebas digunakan oleh siapapun untuk apapun
        tanpa perlu perizinan atau membayar kompensasi moneter</span> kepada siapapun.
      </p>
    ),
  },
  {
    id: 'royalty',
    label: 'Royalty',
    image: '/assets/images/icons/hand-money-income-dollar-icon.png',
    content: (
      <>
        <p className="mb-4">
          <em>Royalty</em> merupakan istilah untuk kompensasi moneter yang
          dibayarkan kepada pemilik karya untuk penggunaan karya atau aset
          mereka yang komersial. Apabila seseorang membuat suatu karya yang
          menghasilkan uang menggunakan karya orang lain, maka <span className="text-neon">pemilik karya
          asal memiliki hak untuk mendapatkan royalti dari persentase
          penghasilan yang didapatkan</span><span className="font-PJS">*</span>.
        </p>
        <p className="text-plat/70">
          *Apabila suatu karya memiliki tanda "<em>Royalty-Free</em>", tidak
          berarti karya tersebut bebas pembayaran 100%. Karya{' '}
          <em>Royalty-Free</em> masih dapat meminta pembayaran lisensi di muka
          untuk penggunaan yang <em>Royalty-Free</em> kedepannya.
        </p>
      </>
    ),
  },
  {
    id: 'atribusi',
    label: 'Atribusi',
    image: '/assets/images/icons/creative-commons-by-attribution-icon.png',
    content: (
      <p>
        Atribusi merupakan aksi{' '}<span className="text-neon">memberikan kredit dengan menyertakan nama pemilik
        asal karya atau aset yang digunakan dalam karya yang kita buat</span>. Hal
        ini bisa dilakukan dengan membuat halaman atribusi khusus seperti di
        halaman awal modul ini, atau dengan membuat daftar{' '}
        <em>Credit</em> seperti di akhir sebuah film. Di dunia internet yang
        memudahkan akses penggunaan karya orang lain, memberikan atribusi
        adalah hal sederhana yang dapat dilakukan sebagai bentuk "terima
        kasih".
      </p>
    ),
  },
]

/* ============================================================================
 * CC ELEMENTS — The 4 building blocks of Creative Commons licenses
 * ============================================================================ */
const CC_ELEMENTS = [
  {
    code: 'BY',
    desc: (
        <div>
          <strong className="text-neon italic">–Atribusi</strong>
          <p>
            Karya perlu memberikan atribusi/kredit pada pembuat karya asal.
          </p>
        </div>
    ),
    image: '/assets/images/icons/creative-commons-by-attribution-icon.png',
  },
  {
    code: 'SA',
    desc: (
        <div>
          <strong className="italic text-neon">–Bagi Serupa</strong>
          <p>
            Karya perlu memiliki lisensi distribusi yang sama dengan karya asal.
          </p>
        </div>
    ),
    image: '/assets/images/icons/creative-commons-sa-share-alike-icon.png'
  },
  {
    code: 'ND',
    desc: (
        <div>
          <strong className="italic text-neon">–Non-Derivatif</strong>
          <p>
            Karya tidak dapat membuat perubahan apapun pada karya asal.
          </p>
        </div>
    ),
    image: '/assets/images/icons/creative-commons-nd-no-derivative-works-icon.png'
  },
  {
    code: 'NC',
    desc: (
        <div>
          <strong className="italic text-neon">–Non-Komersial</strong>
          <p>
            Karya tidak dapat menerima keuntungan komersial jika menggunakan karya asal.
          </p>
        </div>
    ),
    image: '/assets/images/icons/creative-commons-nc-non-commercial-icon.png'
  },
]

/* ============================================================================
 * CC LICENSES — The 6 valid combinations
 * ============================================================================ */
const CC_LICENSES = [
  { id: 'CC-BY',       label: 'CC-BY'      , icon: '/assets/images/icons/by.png' },
  { id: 'CC-BY-SA',    label: 'CC-BY-SA'   , icon: '/assets/images/icons/by_sa.png' },
  { id: 'CC-BY-ND',    label: 'CC-BY-ND'   , icon: '/assets/images/icons/by_nd.png' },
  { id: 'CC-BY-NC',    label: 'CC-BY-NC'   , icon: '/assets/images/icons/by_nc.png' },
  { id: 'CC-BY-NC-SA', label: 'CC-BY-NC-SA', icon: '/assets/images/icons/by_nc_sa.png' },
  { id: 'CC-BY-NC-ND', label: 'CC-BY-NC-ND', icon: '/assets/images/icons/by_nc_nd.png' },
]

/* ============================================================================
 * MINIGAME QUESTIONS
 * ============================================================================
 * Each question has:
 *   description — the license description text the user reads
 *   correct     — the CC license ID that matches the description
 *   hints       — phrases in the description that should be highlighted
 *                 when the user clicks the "Petunjuk" button
 * ============================================================================ */
const CC_QUESTIONS = [
  {
    description:
      'Karya ini dapat digunakan untuk kebutuhan komersial dan non-komersial. Karya dapat dimodifikasi serta lisensinya dapat disesuaikan. Dengan catatan pembuat karya wajib diberi kredit apabila digunakan.',
    correct: 'CC-BY',
    hints: ['komersial dan non-komersial', 'dapat dimodifikasi', 'lisensinya dapat disesuaikan', 'diberi kredit'],
  },
  {
    description:
      'Karya ini hanya dapat dimodifikasi dan digunakan untuk keperluan non-komersial. ' +
      'Atribusi wajib diberikan kepada pembuat karya asal. Karya yang menggunakan harus memiliki lisensi yang sama dengan karya asal.',
    correct: 'CC-BY-NC-SA',
    hints: ['dapat dimodifikasi', 'non-komersial', 'atribusi wajib', 'memiliki lisensi yang sama'],
  },
  {
    description:
      'Karya dapat digunakan untuk keperluan komersial maupun non-komersial. Karya tidak dapat dimodifikasi atau diubah dalam bentuk apapun, dan pembuat karya asal wajib menerima atribusi.',
    correct: 'CC-BY-ND',
    hints: ['komersial maupun non-komersial', 'tidak dapat dimodifikasi', 'atribusi'],
  },
  {
    description:
      'Karya ini bebas digunakan untuk keperluan apapun selama itu non-komersial. Karya tidak dapat dimodifikasi dan karya asal wajib menerima atribusi.',
    correct: 'CC-BY-NC-ND',
    hints: ['non-komersial', 'tidak dapat dimodifikasi', 'atribusi'],
  },
  {
    description:
      'Karya ini dapat digunakan secara komersial dan juga dapat dimodifikasi sesuai dengan kebutuhan. Selama karya asal mendapatkan atribusi dan karya yang dibuat memiliki lisensi yang kompatibel dengan karya asal.',
    correct: 'CC-BY-SA',
    hints: ['komersial', 'dapat dimodifikasi', 'mendapatkan atribusi', 'lisensi yang kompatibel'],
  },
  {
    description:
      'Karya ini dapat digunakan tanpa biaya untuk keperluan non-komersial. Atribusi wajib ' +
      'diberikan kepada pembuatnya. Pengguna dapat memodifikasi karya asal sesuai kebutuhan karya turunan.',
    correct: 'CC-BY-NC',
    hints: ['tanpa biaya untuk keperluan non-komersial', 'atribusi wajib', 'dapat memodifikasi karya'],
  },
]

/* ============================================================================
 * MAIN COMPONENT
 * ============================================================================ */
export default function Licensing() {
  // === TAB STATE ===
  // Tracks which terminology card is currently visible.
  const [activeTab, setActiveTab] = useState('copyright')
  // Find the active tab ONCE, reuse it everywhere
  const activeTerminology = TERMINOLOGY_TABS.find(t => t.id === activeTab)

  // === MINIGAME STATE ===
  // questionIndex — which question is currently shown
  // selected      — which license the user has picked (null = nothing picked)
  // hasAnswered   — whether the user has confirmed their answer
  // showHint      — whether hint highlighting is active
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const question = CC_QUESTIONS[questionIndex]
  const isCorrect = hasAnswered && selected === question.correct

  /**
   * The action button does two things depending on state:
   *   - Before answering: toggles hint highlighting on/off
   *   - After answering:  loads a new random question and resets state
   */
  function handleAction() {
    if (!hasAnswered) {
      // Hint state — toggle hint visibility
      setShowHint(!showHint)
    } else {
      // Try again state — pick a different random question
      let next
      do {
        next = Math.floor(Math.random() * CC_QUESTIONS.length)
      } while (next === questionIndex && CC_QUESTIONS.length > 1)
      setQuestionIndex(next)
      setSelected(null)
      setHasAnswered(false)
      setShowHint(false)
    }
  }

  /**
   * Render the description with hint phrases highlighted.
   * When showHint is false: returns the plain string.
   * When showHint is true: splits the description by hint phrases and wraps
   * matching parts in a <mark> element with gold highlighting.
   */
  function renderDescriptionWithHints(description, hints, showHint) {
    if (!showHint) return description

    // Escape regex special chars in hint phrases
    const escapedHints = hints.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    // Build a regex that matches any hint phrase (case-insensitive, global)
    const regex = new RegExp(`(${escapedHints.join('|')})`, 'gi')
    // Split keeps the matched parts (because of the capture group)
    const parts = description.split(regex)

    return parts.map((part, i) => {
      const isHint = hints.some(h => h.toLowerCase() === part.toLowerCase())
      if (isHint) {
        return (
          <mark key={i} className="bg-gold/10 text-gold rounded px-1 font-semibold">
            {part}
          </mark>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <article className="w-full max-w-5xl mx-auto p-12 font-medium text-plat">

      {/* =========================================================
          HEADER
          ========================================================= */}
      <header className="mb-24">
        <p className="font-JBM text-center text-xl text-neon">MATERI 5</p>
        <h1 className="font-extrabold text-center text-8xl">Lisensi Aset Audio</h1>
      </header>

      {/* =========================================================
          INTRO PARAGRAPH
          ========================================================= */}
      <section className="font-PJS text-justify text-3xl mb-12">
        <p className="mb-12 leading-relaxed">
          Ketika menggunakan suatu aset audio dalam proyek multimedia kita,
          kita tidak dapat asal menggunakan semua aset audio yang kita jumpai
          di internet.{' '}
          <strong className="text-neon">
            Setiap artis atau pembuat karya digital memiliki hak milik atas
            karya atau aset yang dibuatnya
          </strong>
          . Mereka memiliki hak untuk menurunkan konten yang menggunakan aset
          mereka tanpa izin atau meminta biaya berdasarkan hasil moneter yang
          diperoleh publikasi multimedia dengan aset mereka. Untuk
          menghindari hal-hal yang tidak diinginkan, kita perlu memahami
          berbagai konsep lisensi seputar hak penggunaan aset audio.
        </p>
      </section>

      {/* =========================================================
          TABBED TERMINOLOGY WIDGET
          =========================================================
          4 tabs (Copyright, Public Domain, Royalty, Atribusi).
          Only the active tab's content is shown.
          Click a tab header to swap. */}
      <section className="mb-12">

        <h2 className="font-extrabold italic text-center text-5xl mb-12">
          Konsep Dasar Lisensi
        </h2>

        {/* Tab headers — 4 buttons in a row */}
        <div className="grid grid-cols-4 gap-2">
          {TERMINOLOGY_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex justify-center items-center gap-2 py-4 rounded-t-2xl transition-colors select-none ${
                activeTab === tab.id
                  ? 'bg-navy text-plat'
                  : 'bg-base text-neon border-2 border-navy hover:text-neon'
              }`}
            >
              <span className="font-PJS font-extrabold uppercase text-3xl">
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Active tab content — only the selected tab's content shows */}
        <div className="bg-navy rounded-b-2xl p-8">

          <div className="flex justify-center mb-4">
            <img
                src={asset(activeTerminology.image)}
                alt={activeTerminology.label}
                className="w-48 h-48 object-contain p-4 rounded-2xl bg-plat select-none pointer-events-none"
            />
          </div>

          <div className="text-justify text-3xl leading-snug">
            {activeTerminology.content}
          </div>
        </div>
      </section>

      {/* =========================================================
          CREATIVE COMMONS INTRO
          ========================================================= */}
      <section className="mb-8">

        <p className="font-PJS text-justify text-3xl leading-relaxed mb-8">
          Di samping konsep-konsep dasar tersebut, ada sebuah organisasi
          internasional non-profit yang telah mendedikasikan waktu untuk
          membangun dan menjaga sistem legalitas karya digital yang lebih
          fleksibel. Organisasi ini bernama{' '}
          <strong className="text-neon">Creative Commons</strong>.
        </p>

        <figure className="bg-base rounded-xl p-6 border-2 border-navy mb-12">
          <div className="bg-navy rounded-lg flex items-center justify-center mb-6">
            <img
                src={spectrumOfRights}
                alt="Spektrum Copyright"
                className="rounded-lg object-contain select-none pointer-events-none border-2 border-navy"
            />
          </div>
          <figcaption className="font-JBM text-center text-2xl text-neon">
            Spektrum <em>Copyright</em> (Stewart & Zriachev, 2023)
          </figcaption>
        </figure>
      </section>

      {/* =========================================================
          CC ELEMENTS GRID (BY, SA, ND, NC)
          ========================================================= */}
      <section className="mb-12">
        <h2 className="font-extrabold text-5xl italic text-center mb-6 text-plat">
          Elemen Lisensi Creative Commons
        </h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {CC_ELEMENTS.map(elem => (
            <div
              key={elem.code}
              className="bg-navy rounded-2xl p-4"
            >
              <img
                  src={asset(elem.image)}
                  alt={elem.code}
                  className="w-48 h-48 object-contain p-4 rounded-t-2xl bg-plat select-none pointer-events-none"
              />
              <p className="font-extrabold text-3xl text-plat text-center bg-base rounded-b-2xl p-1 mb-1">
                {elem.code}
              </p>
              <p className="font-PJS text-2xl text-plat leading-relaxed tracking-tight">
                {elem.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="font-PJS text-justify text-3xl text-plat leading-relaxed">
          Terdapat 6 tipe lisensi Creative Commons yang merupakan berbagai kombinasi dari ke-4 elemen tersebut.
          Pada bagian berikut, perhatikan deskripsi lisensinya, lalu pilih lisensi Creative
          Commons yang sesuai!
        </p>
      </section>

      {/* =========================================================
          CC LICENSE MINIGAME
          ========================================================= */}
      <section className="mb-12">

        <div className="bg-base rounded-2xl border-2 border-navy p-6">

          {/* --- Description card --- */}
          <div className="bg-navy rounded-3xl p-6 mb-6">
            <p className="font-JBM text-2xl text-neon uppercase tracking-wider mb-2">
              Deskripsi Lisensi:
            </p>
            <p className="font-PJS text-3xl leading-relaxed text-plat">
              {renderDescriptionWithHints(question.description, question.hints, showHint)}
            </p>
          </div>

          {/* --- License options (6 buttons in a 3-col grid) --- */}
          <p className="font-JBM font-bold text-2xl text-plat uppercase tracking-wider underline text-center mb-3">
            Pilih Lisensi
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {CC_LICENSES.map(license => {
              const isSelected = selected === license.id
              const isCorrectAnswer = license.id === question.correct

              // Determine button styling based on state
              let cls = 'border-navy bg-base hover:border-neon hover:bg-navy'
              if (hasAnswered) {
                // After answering: green for correct, red for wrong selection
                if (isCorrectAnswer) {
                  cls = 'border-green-500 bg-green-500/10'
                } else if (isSelected) {
                  cls = 'border-red-500 bg-red-500/10'
                }
              }

              return (
                <button
                  key={license.id}
                  onClick={() => {
                    if (hasAnswered) return       // can't change answer after evaluating
                    setSelected(license.id)
                    setHasAnswered(true)          // evaluate immediately
                    setShowHint(true)             // auto-show hints so they learn from the result
                  }}
                  disabled={hasAnswered}
                  className={`px-4 py-4 rounded-xl border-2 font-PJS font-bold text-xl
                               transition-colors flex justify-center ${cls} ${
                      hasAnswered ? 'cursor-default' : 'cursor-pointer'
                    }`}
                >
                  <img src={asset(license.icon)} alt={license.label} className="border border-plat pointer-events-none select-none"/>
                </button>
              )
            })}
          </div>

          {/* --- Result + Action buttons --- */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Result indicator (left side) */}
            <div className="flex-1">
              {hasAnswered && (
                <p
                  className={`font-PJS font-bold text-2xl ${
                    isCorrect ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {isCorrect ? '✓ Benar!' : '✗ Salah!'}
                  {!isCorrect && (
                    <span className="text-plat font-medium italic text-xl block">
                      Jawaban yang benar: <span className="text-neon">{question.correct}</span>
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Action buttons (right side) */}
            <div className="flex gap-3">

              <button
                onClick={handleAction}
                className={`px-3 py-3 rounded-2xl font-PJS font-bold text-2xl transition-colors ${
                  hasAnswered
                    ? 'bg-neon text-base hover:bg-neon/80'
                    : showHint
                    ? 'bg-navy border-2 border-gold hover:border-gold/50'
                    : 'bg-navy border-2 border-neon hover:border-gold/50'
                }`}
              >
                {hasAnswered
                  ? 'Coba Lagi'
                  : showHint
                  ? '💡'
                  : '💡'}
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="h-32" />
    </article>
  )
}
