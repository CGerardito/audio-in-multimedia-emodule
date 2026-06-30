import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CREATOR_WORDS, ATTRIBUTION, groupAttributionByType } from "../data/siteInfo.js";
import Modal from '../components/Modal.jsx'
import unj from '/assets/images/UNJ.png'

/**
 * LandingPage
 * -----------
 * Layout based on the provided mockup:
 *  - Split screen: image panel on the LEFT (~45%), content panel on the RIGHT (~55%)
 *  - Curved dark-blue border separating the two panels
 *  - Title "Audio in Multimedia" with "in" smaller and lighter
 *  - Three vertically stacked buttons: Start / Settings / Attribution
 *
 * IMAGE: Replace the placeholder below with your audio console image.
 *        Put your image at: src/assets/images/landing.jpg
 *        Then change the import line below.
 *
 * All sizes use rem-based Tailwind classes, so they scale proportionally
 * with the 16:9 stage via the root font-size set by AspectRatioStage.
 */

import landingImage from '/assets/images/landing.jpg'
import portrait from "/assets/images/portrait.jpg";

export default function LandingPage() {
    const grouped = groupAttributionByType(ATTRIBUTION.entries)

    const [pengantarOpen, setPengantarOpen] = useState(false)
    const [attributionOpen, setAttributionOpen] = useState(false)

  return (

    <div className="w-full h-full flex bg-base text-plat">
        <div className="absolute w-36 h-36 mt-8 ml-8 z-50">
            <img
                src={unj}
                alt="Logo UNJ"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
        </div>
        {/* LEFT PANEL — image with fade-out on right edge */}
        <div className="relative h-full" style={{ width: '50%' }}>
            <img
                src={landingImage}
                alt="Konsol mixer audio"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                style={{
                    // mask-image makes the IMAGE itself transparent at the right edge,
                    // revealing the black parent background underneath.
                    // 'black 60%' = fully visible up to 60% of the width
                    // 'transparent 95%' = fully transparent at 95%
                    // The fade happens between 60% and 95%.
                    maskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
                }}
            />
        </div>

      {/*
       * RIGHT PANEL
       * Title at top, buttons in lower half, vertically centered.
       */}
      <div className="flex-1 h-full flex flex-col items-center justify-center px-12">
        {/* Title: "Audio in Multimedia" with "in" smaller */}
        <h1 className="text-left mb-16 leading-none">
          <span className="font-PJS font-extrabold text-9xl select-none">AUDIO</span>
          <span className="font-JBM text-6xl text-neon ml-4 select-none">dalam</span>
          <span className="block font-PJS font-extrabold text-9xl select-none">MULTIMEDIA</span>
        </h1>

        {/* Three stacked buttons — aligned to mockup */}
        <div className="flex flex-col gap-5 w-2/3 max-w-full">
          <Link
            to="/courses/audio"
            className="px-10 py-10 border-base bg-navy hover:text-neon border-2 hover:border-neon
                       rounded-lg text-6xl font-PJS font-medium text-center uppercase tracking-widest
                       transition-colors"
          >
            Mulai
          </Link>

          <button
            onClick={() => setPengantarOpen(true)}
            className="px-10 py-10 border-base bg-navy hover:text-neon border-2 hover:border-neon
                       rounded-lg text-6xl font-PJS font-medium text-center uppercase tracking-widest
                       transition-colors"
          >
            Pengantar
          </button>

          <button
            onClick={() => setAttributionOpen(true)}
            className="px-10 py-10 border-base bg-navy hover:text-neon border-2 hover:border-neon
                       rounded-lg text-6xl font-PJS font-medium text-center uppercase tracking-widest
                       transition-colors"
          >
            Atribusi
          </button>
        </div>
      </div>

        {/* Acknowledgements */}
        <Modal
            isOpen={pengantarOpen}
            onClose={() => setPengantarOpen(false)}
            title={CREATOR_WORDS.title}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Portrait */}
                <img
                    src={portrait}
                    alt={CREATOR_WORDS.author}
                    className="w-48 h-48 rounded-2xl object-cover border-3 border-neon"
                />

                {/* Author name + role */}
                <div className="text-center">
                    <h3 className="font-PJS font-bold text-4xl text-plat mb-2">{CREATOR_WORDS.author}</h3>
                    <p className="font-JBM text-3xl text-neon">{CREATOR_WORDS.role}</p>
                </div>

                {/* Paragraphs */}
                <div className="space-y-4 w-full">
                    {CREATOR_WORDS.paragraphs.map((para, i) => (
                        <p key={i} className="font-PJS text-2xl text-plat leading-relaxed text-justify">
                            {para}
                        </p>
                    ))}
                </div>
            </div>
        </Modal>

        {/* Attribution */}
        <Modal
            isOpen={attributionOpen}
            onClose={() => setAttributionOpen(false)}
            title={ATTRIBUTION.title}
        >
            <p className="font-PJS text-3xl italic text-plat mb-6 leading-relaxed">
                {ATTRIBUTION.intro}
            </p>

            {Object.entries(grouped).map(([type, entries]) => (
                entries.length > 0 && (
                    <div key={type} className="mb-6">
                        <h3 className="font-PJS font-bold text-3xl text-neon uppercase mb-3">
                            —{type}
                        </h3>
                        <ul className="text-2xl space-y-2 leading-relaxed">
                            {entries.map((entry, i) => (
                                <li key={i} className="font-PJS text-plat leading-snug">
                                    •{' '}<strong>{entry.name}</strong> by {entry.author}
                                    {' — '}
                                    <a
                                        href={entry.url}
                                        className="text-neon"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {entry.license}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            ))}
        </Modal>

      {/* Version footer */}
      <p className="absolute bottom-4 right-6 text-slate-600 text-lg">
        v1.0
      </p>
    </div>
  )
}
