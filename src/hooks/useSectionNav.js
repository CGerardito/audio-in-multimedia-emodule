import { getCourse } from '../data/courses.js'

/**
 * useSectionNav
 * -------------
 * Reusable hook for prev/next navigation between sections in a course.
 * Used by LessonPage, QuizLauncherPage, ActivityPage so they all share
 * the same nav logic and styling pattern.
 *
 * Returns:
 *   course       — the course object (for title, id)
 *   prevSection  — section object before the current one (null if at start)
 *   nextSection  — section object after the current one (null if at end)
 *   routeFor     — function that builds the URL for any section
 *
 * Usage:
 *   const { course, prevSection, nextSection, routeFor } = useSectionNav(courseId, currentSectionId)
 */
export function useSectionNav(courseId, currentSectionId) {
  const course = getCourse(courseId)
  const currentIndex = course?.sections.findIndex((s) => s.id === currentSectionId) ?? -1
  const prevSection = currentIndex > 0 ? course.sections[currentIndex - 1] : null
  const nextSection =
    currentIndex >= 0 && currentIndex < course.sections.length - 1
      ? course.sections[currentIndex + 1]
      : null

  function routeFor(section) {
    if (!section) return null
    if (section.type === 'lesson')   return `/courses/${courseId}/lessons/${section.id}`
    if (section.type === 'quiz')     return `/courses/${courseId}/quiz/${section.id}`
    if (section.type === 'activity') return `/courses/${courseId}/activity/${section.id}`
    return null
  }

  return { course, prevSection, nextSection, routeFor }
}
