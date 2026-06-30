import { useState, useRef, useEffect } from 'react'

/**
 * AudioButton
 * -----------
 * A play/stop button for audio files.
 *
 * Behavior:
 *   - Click when stopped → play from beginning
 *   - Click when playing → stop and reset to beginning
 *   - When audio ends naturally → resets to beginning, button returns to "play"
 *
 * Props:
 *   src       — imported audio file or absolute path string
 *   label     — text shown on the button (default: 'Play'). Ignored if compact=true.
 *   mono      — if true, downmixes stereo to mono via Web Audio API (default: false)
 *   compact   — if true, renders a CIRCLE with just the icon, no label (default: false)
 *   className — optional extra Tailwind classes for the button
 *
 * Usage:
 *   // Rectangle with label (default)
 *   <AudioButton src={audio} label="Play Demo" />
 *
 *   // Circle, icon only
 *   <AudioButton src={audio} compact />
 *
 *   // Circle with accessible label (for screen readers)
 *   <AudioButton src={audio} compact label="Play Demo" />
 */
export default function AudioButton({ src, label = 'Play', mono = false, compact = false, className = '' }) {
  const audioRef = useRef(null)
  const audioCtxRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const webAudioReadyRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay  = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      audio.currentTime = 0
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  function setupWebAudio() {
    if (webAudioReadyRef.current) return
    const audio = audioRef.current
    if (!audio) return

    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const source = ctx.createMediaElementSource(audio)
    const gain = ctx.createGain()

    gain.channelCountMode = 'explicit'
    gain.channelCount = 1
    gain.channelInterpretation = 'speakers'

    source.connect(gain)
    gain.connect(ctx.destination)

    audioCtxRef.current = ctx
    webAudioReadyRef.current = true
  }

  async function handleClick() {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    } else {
      if (mono) {
        setupWebAudio()
        if (audioCtxRef.current?.state === 'suspended') {
          await audioCtxRef.current.resume()
        }
      }
      audio.currentTime = 0
      try {
        await audio.play()
      } catch (e) {
        console.warn('AudioButton play failed:', e)
      }
    }
  }

  // The button's class set depends on whether we're in compact mode.
  // compact = circle with icon only; default = rounded rectangle with label.
  const shapeClass = compact
      ? 'flex items-center justify-center w-32 h-32 rounded-full'
      : 'flex items-center gap-5 px-8 py-5 rounded-2xl'

  // The icon size also differs — slightly smaller in compact mode.
  const iconSize = compact ? 'w-26 h-26' : 'w-28 h-28'    // ← icon container
  const svgSize = compact ? 'w-25 h-25' : 'w-27 h-27'     // ← triangle (play icon)
  const barHeight = compact ? 'h-5' : 'h-7'           // ← (not currently used, but kept for reference)
  const stopSize = compact ? 'w-12 h-12' : 'w-14 h-14'    // ← square (stop icon)

  return (
      <>
        <audio ref={audioRef} src={src} preload="metadata" />
        <button
            onClick={handleClick}
            className={`group ${shapeClass} bg-navy hover:bg-neon hover:text-base text-plat transition-colors ${className}`}
            aria-label={isPlaying ? `Stop ${label}` : label}
            aria-pressed={isPlaying}
        >
          <div className={`relative ${iconSize} flex items-center justify-center`}>
            {/* Stop icon (square) */}
            <span
                className={`absolute ${stopSize} bg-current rounded-sm transition-all duration-200 ${
                    isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
            />
            {/* Play icon (triangle) */}
            <svg
                viewBox="0 0 24 24"
                className={`${svgSize} fill-current transition-opacity duration-200 ${
                    isPlaying ? 'opacity-0' : 'opacity-100'
                }`}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {/* Label — only shown in non-compact mode */}
          {!compact && (
              <span className="block font-PJS font-semibold text-2xl">
            {isPlaying ? 'Stop' : label}
          </span>
          )}
        </button>
      </>
  )
}