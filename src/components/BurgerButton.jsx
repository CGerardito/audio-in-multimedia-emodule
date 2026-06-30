import { useState } from 'react'
import BurgerMenu from './BurgerMenu.jsx'
import Modal from './Modal.jsx'
import { CREATOR_WORDS, ATTRIBUTION, groupAttributionByType } from '../data/siteInfo.js'
import portrait from '/assets/images/portrait.jpg'

/**
 * BurgerButton
 * ------------
 * A reusable burger menu that comes pre-wired with the Pengantar (Creator's
 * Words) and Atribusi (Attribution) modals.
 *
 * Drop this on any page and it handles everything:
 *   - The burger icon (bottom-left, absolute positioned)
 *   - The slide-out menu with Pengantar + Atribusi items
 *   - Both modals with full content from siteInfo.js
 *
 * Usage (simplest — just Pengantar + Atribusi):
 *   <BurgerButton />
 *
 * Usage (with extra items like "Back to Sessions"):
 *   <BurgerButton
 *     extraItems={[
 *       { label: 'Kembali ke Sesi', to: `/courses/${courseId}` },
 *       { label: 'Kembali ke Landing', to: '/' },
 *     ]}
 *   />
 *
 * Props:
 *   extraItems — optional array of extra menu items to append after
 *                Pengantar and Atribusi. Each item is either:
 *                  { label: string, onClick: () => void }  → triggers a callback
 *                  { label: string, to: string }           → navigates to a route
 *
 * What this component replaces:
 *   - The <BurgerMenu items={[...]} /> call
 *   - The <Modal isOpen={settingsOpen} ...> Pengantar content </Modal>
 *   - The <Modal isOpen={attributionOpen} ...> Attribution content </Modal>
 *   - All the useState declarations for those modals
 *   - The groupAttributionByType call
 *   - The imports for CREATOR_WORDS, ATTRIBUTION, etc.
 *
 * Basically, it replaces ~50 lines of boilerplate on every page with one line.
 */
export default function BurgerButton({ extraItems = [] }) {
  const [pengantarOpen, setPengantarOpen] = useState(false)
  const [attributionOpen, setAttributionOpen] = useState(false)

  const grouped = groupAttributionByType(ATTRIBUTION.entries)

  // Build the menu items: Pengantar + Atribusi first, then any extras
  const items = [
    { label: 'Pengantar', onClick: () => setPengantarOpen(true) },
    { label: 'Atribusi', onClick: () => setAttributionOpen(true) },
    ...extraItems,
  ]

  return (
    <>
      {/* === BURGER MENU === */}
      <BurgerMenu items={items} />

      {/* === PENGANTAR MODAL (Creator's Words) === */}
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

      {/* === ATRIBUSI MODAL === */}
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
    </>
  )
}
