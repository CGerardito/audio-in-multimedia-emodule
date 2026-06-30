// src/hooks/useScrollReset.js
import { useRef, useEffect } from 'react'

/**
 * useScrollReset
 * --------------
 * Returns a ref to attach to a scrollable element. Whenever the
 * `dependency` value changes, the element's scroll is reset to top.
 *
 * Usage:
 *   const mainRef = useScrollReset(lessonId)
 *   <main ref={mainRef} className="overflow-y-auto">...</main>
 */
export function useScrollReset(dependency) {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTo(0, 0)
        }
    }, [dependency])

    return ref
}