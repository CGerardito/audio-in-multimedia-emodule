import { useState, useRef } from 'react'
import Modal from './Modal.jsx'

/**
 * ImageGallery
 * ------------
 * A scrollable image gallery with prev/next buttons, mobile swipe support,
 * and click-to-zoom via the Modal component.
 *
 * Features:
 *   - Prev/Next buttons on left/right (always visible, loop at ends)
 *   - Mobile swipe: swipe left = next, swipe right = previous
 *   - Click image to open zoomed view in a Modal
 *   - Dot indicators showing current position (optional, can be removed)
 *   - Caption below each image
 *
 * Usage:
 *   import galleryImages from '../assets/images/cuesheets/index.js'
 *
 *   const IMAGES = [
 *     { src: galleryImages['cue-sheet-1'], caption: 'Contoh cue sheet untuk film pendek' },
 *     { src: galleryImages['cue-sheet-2'], caption: 'Cue sheet untuk animasi' },
 *     // ...
 *   ]
 *
 *   <ImageGallery images={IMAGES} />
 *
 * Props:
 *   images    — array of { src, caption } objects
 *   className — optional extra Tailwind classes for the wrapper
 */
export default function ImageGallery({ images, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)

  // Touch tracking for mobile swipe
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  if (!images || images.length === 0) return null

  const current = images[currentIndex]

  function goNext() {
    setCurrentIndex((prev) => (prev + 1) % images.length)  // loop back to 0
  }

  function goPrev() {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)  // loop to last
  }

  // === TOUCH HANDLERS FOR MOBILE SWIPE ===
  // Record where the touch started and ended.
  // If the horizontal distance is > 50px, treat it as a swipe.
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  function onTouchMove(e) {
    touchEndX.current = e.touches[0].clientX
  }

  function onTouchEnd() {
    const diff = touchStartX.current - touchEndX.current
    const SWIPE_THRESHOLD = 50  // pixels — adjust if swipes feel too sensitive/sluggish

    if (Math.abs(diff) < SWIPE_THRESHOLD) return  // not a swipe, ignore

    if (diff > 0) {
      // Swiped left (finger moved right-to-left) → next image
      goNext()
    } else {
      // Swiped right (finger moved left-to-right) → previous image
      goPrev()
    }

    // Reset
    touchStartX.current = 0
    touchEndX.current = 0
  }

  return (
    <div className={`w-full ${className}`}>
      {/* === GALLERY CONTAINER === */}
      <div className="relative bg-navy rounded-2xl border-2 border-navy overflow-hidden">

        {/* === PREV BUTTON (left side) === */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                     w-21 h-21 flex items-center justify-center rounded-full
                     bg-neon hover:bg-gold text-base
                     backdrop-blur-sm transition-colors text-7xl font-JBM font-bold"
          aria-label="Gambar sebelumnya"
        >
          ←
        </button>

        {/* === IMAGE AREA === */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={() => setZoomOpen(true)}
          className="relative aspect-4/3 flex items-center justify-center
                     cursor-zoom-in touch-pan-y"
        >
          <img
            src={current.src}
            alt={current.caption || `Image ${currentIndex + 1}`}
            className="w-full h-full object-contain pointer-events-none select-none p-6"
            draggable={false}
          />

          {/* Image counter (top-right corner) */}
          <div className="absolute top-4 right-4 bg-base backdrop-blur-sm
                          px-4 py-2 rounded-full font-JBM text-3xl text-plat">
            {currentIndex + 1}/{images.length}
          </div>
        </div>

        {/* === NEXT BUTTON (right side) === */}
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                     w-21 h-21 flex items-center justify-center rounded-full
                     bg-neon hover:bg-gold text-base
                     backdrop-blur-sm transition-colors text-7xl font-JBM font-bold"
          aria-label="Gambar berikutnya"
        >
          →
        </button>
      </div>

      {/* === CAPTION + DOT INDICATORS === */}
      <div className="mt-4 text-center">
        {current.caption && (
          <p className="font-JBM text-2xl text-plat mb-4 tracking-tight">
            {current.caption}
          </p>
        )}

        {/* Dot indicators — clickable to jump to any image */}
        <div className="flex justify-center gap-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-6 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-16 bg-neon'
                  : 'w-6 bg-navy hover:bg-neon'
              }`}
              aria-label={`Ke gambar ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* === ZOOM MODAL === */}
      {/* Reuses the Modal component. The image fills the modal content area
          and can be as large as the modal allows (max-w-6xl by default in
          your Modal.jsx). */}
      <Modal
        isOpen={zoomOpen}
        onClose={() => setZoomOpen(false)}
        title={current.caption || `Image ${currentIndex + 1}`}
        maxWidth="max-w-6xl"
      >
        <div className="flex flex-col items-center">
          <img
            src={current.src}
            alt={current.caption || `Image ${currentIndex + 1}`}
            className="w-full h-auto max-h-[70vh] object-contain pointer-events-none select-none"
          />

          {/* Navigation buttons inside the zoom modal too */}
          {/*<div className="flex gap-4 mt-6">
            <button
              onClick={goPrev}
              className="px-6 py-3 bg-navy hover:bg-neon hover:text-base text-plat
                         rounded-xl font-PJS font-semibold text-lg transition-colors"
            >
              ← Sebelumnya
            </button>
            <button
              onClick={goNext}
              className="px-6 py-3 bg-neon hover:bg-neon/80 text-base
                         rounded-xl font-PJS font-semibold text-lg transition-colors"
            >
              Berikutnya →
            </button>
          </div>*/}
        </div>
      </Modal>
    </div>
  )
}
