/**
 * highScore.js
 * ------------
 * Utility for tracking quiz high scores in the browser's localStorage.
 *
 * === localStorage vs Cookies — quick walkthrough ===
 *
 * COOKIES:
 *  - Sent with EVERY HTTP request to the server (overhead).
 *  - Mainly for server-side state (sessions, auth).
 *  - Size limit ~4KB per cookie.
 *  - Can have expiry dates.
 *  - Awkward API (document.cookie is a single string you have to parse).
 *
 * localStorage:
 *  - Stays in the browser, NEVER sent to the server automatically.
 *  - Perfect for client-only state like high scores, preferences, progress.
 *  - Size limit ~5-10MB per origin.
 *  - Persists indefinitely until the user clears browser data.
 *  - Simple API: localStorage.getItem(key) / localStorage.setItem(key, value).
 *  - Works on GitHub Pages (static hosting) with no backend needed.
 *
 * For a self-paced e-module on GitHub Pages, localStorage is the right tool.
 *
 * === How it works ===
 *  - Each quiz gets a unique key: "audiomodule:highscore:<quizId>"
 *  - We store a number: the highest score (out of total questions).
 *  - getHighScore() returns 0 if no score is stored yet.
 *  - saveScoreIfHigher() only updates if the new score beats the old one.
 *  - All values are stored as strings (localStorage limitation), so we
 *    parseInt on read and String() on write.
 */

const KEY_PREFIX = 'audiomodule:highscore:'

function key(quizId) {
  return `${KEY_PREFIX}${quizId}`
}

/**
 * Get the stored high score for a quiz.
 * Returns 0 if no score has been saved yet.
 */
export function getHighScore(quizId) {
  try {
    const raw = localStorage.getItem(key(quizId))
    return raw ? parseInt(raw, 10) : 0
  } catch (e) {
    // localStorage might be disabled (private browsing in some browsers)
    console.warn('Could not read high score:', e)
    return 0
  }
}

/**
 * Save a score only if it's higher than the current high score.
 * Returns true if a new record was set, false otherwise.
 */
export function saveScoreIfHigher(quizId, score) {
  try {
    const current = getHighScore(quizId)
    if (score > current) {
      localStorage.setItem(key(quizId), String(score))
      return true
    }
    return false
  } catch (e) {
    console.warn('Could not save high score:', e)
    return false
  }
}

/**
 * Reset the high score for a quiz (useful for a "reset progress" button).
 */
export function resetHighScore(quizId) {
  try {
    localStorage.removeItem(key(quizId))
  } catch (e) {
    console.warn('Could not reset high score:', e)
  }
}
