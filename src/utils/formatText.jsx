import { Fragment } from 'react'

/**
 * formatText.jsx
 * -------------
 * Parse a string with simple inline markup:
 *   **text**  → bold      (<strong>)
 *   *text*    → italic    (<em>)
 *   _text_    → underline (<u>)
 *
 * Usage:
 *   import { formatText } from '../utils/formatText.jsx'
 *   <h3>{formatText(section.title)}</h3>
 *
 * Example:
 *   formatText('*Software* Pengolahan Audio')
 *   → [<em>Software</em>, ' Pengolahan Audio']
 *
 * Caveats:
 *   - No nesting (e.g. **bold *and italic*** won't work)
 *   - **bold** and *italic* can't be directly adjacent (need a space between)
 *   - Plain text without markup just renders as plain text
 */
export function formatText(text) {
  if (typeof text !== 'string') return text

  const parts = []
  // Match **bold** OR *italic* OR _underline_
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|_(.+?)_)/g
  let lastIndex = 0
  let match
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    // Push any plain text before this match
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>)
    }
    // Push the styled element (whichever group matched)
    if (match[2] !== undefined) {
      parts.push(<strong key={key++}>{match[2]}</strong>)
    } else if (match[3] !== undefined) {
      parts.push(<em key={key++}>{match[3]}</em>)
    } else if (match[4] !== undefined) {
      parts.push(<u key={key++}>{match[4]}</u>)
    }
    lastIndex = regex.lastIndex
  }
  // Push any remaining plain text after the last match
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>)
  }

  return parts
}
