import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * BurgerMenu — reusable slide-out menu.
 * Uses `absolute` positioning so it stays INSIDE the 16:9 stage
 * (the AspectRatioStage's inner div is `relative` + `overflow-hidden`).
 */
export default function BurgerMenu({ items = [] }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const navigate = useNavigate()

  // Close when clicking outside the panel
  useEffect(() => {
    if (!open) return
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    // Use a small timeout so the click that opened the menu doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [open])

  function handleItemClick(item) {
    if (item.onClick) item.onClick()
    if (item.to) {
      // Use location.href for simplicity; for SPA navigation, pass a navigate fn
      window.location.href = item.to
    }
    setOpen(false)
  }

  return (
    <div ref={panelRef} className="absolute bottom-8 left-8 z-40">
      {/* Burger button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-28 h-28 flex flex-col items-center justify-center gap-1.5
                   bg-navy hover:bg-neon group rounded-full shadow-lg
                   transition-colors"
        aria-label="Menu"
        aria-expanded={open}
      >
        <span className={`block w-10 h-1.5 bg-plat group-hover:bg-base transition-all ${open ? 'rotate-45 translate-y-3' : ''}`} />
        <span className={`block w-10 h-1.5 bg-plat group-hover:bg-base transition-all ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-10 h-1.5 bg-plat group-hover:bg-base transition-all ${open ? '-rotate-45 -translate-y-3' : ''}`} />
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute bottom-4 left-32 flex flex-row gap-1 bg-base border-2 border-navy
                        rounded-2xl shadow-2xl p-2">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => handleItemClick(item)}
              className="px-6 py-4 text-plat hover:bg-navy rounded-xl
                         hover:text-neon transition-colors font-PJS font-medium text-2xl
                         border-navy whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
