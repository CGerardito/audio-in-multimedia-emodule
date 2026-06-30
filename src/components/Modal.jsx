import { useEffect } from 'react'

/**
 * Modal
 * -----
 * A reusable popup window with:
 *  - Semi-transparent backdrop (click to close)
 *  - Centered panel with title bar
 *  - X button in the top-right corner
 *  - ESC key closes the modal
 *  - Body scroll lock while open
 *
 * Usage:
 *   const [open, setOpen] = useState(false)
 *
 *   <button onClick={() => setOpen(true)}>Open</button>
 *
 *   <Modal isOpen={open} onClose={() => setOpen(false)} title="Capaian Pembelajaran">
 *     <ul>
 *       <li>Goal 1</li>
 *       <li>Goal 2</li>
 *     </ul>
 *   </Modal>
 *
 * Props:
 *   isOpen    — boolean, whether the modal is shown
 *   onClose   — callback when user wants to close (X button, backdrop click, ESC)
 *   title     — string shown in the title bar
 *   children  — the modal content (any JSX)
 *   maxWidth  — optional, Tailwind max-width class (default: max-w-2xl)
 *
 * This component is used by:
 *   - SectionSelectPage (Capaian Pembelajaran button)
 *   - LandingPage (Settings + Attribution buttons — TODO, wire them up later)
 *   - BurgerMenu (Settings + Attribution items open this modal)
 */
export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-6xl' }) {
  // ESC key to close + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    // Backdrop — semi-transparent, click anywhere to close
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xs"
      onClick={onClose}
    >
      {/* Modal panel — stopPropagation so clicks inside DON'T close the modal */}
      <div
        className={`relative bg-base border-2 border-navy rounded-2xl shadow-2xl
                    w-full ${maxWidth} mx-8 max-h-[85vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar with X button */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-navy">
          <h2 className="font-PJS font-semibold text-3xl text-plat">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full
                       text-plat hover:bg-gold hover:text-base
                       transition-colors text-5xl font-JBM"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        {/* Content area — scrollable if content is long */}
        <div className="px-8 py-6 overflow-y-auto custom-scroll">
          {children}
        </div>
      </div>
    </div>
  )
}
