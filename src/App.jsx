import { Routes, Route } from 'react-router-dom'
import AspectRatioStage from './components/AspectRatioStage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import CourseSelectPage from './pages/CourseSelectPage.jsx'
import SectionSelectPage from './pages/SectionSelectPage.jsx'
import LessonPage from './pages/LessonPage.jsx'
import QuizLauncherPage from './pages/QuizLauncherPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ActivityPage from './pages/ActivityPage.jsx'
import AudioDesignDocSimPage from './pages/AudioDesignDocSimPage.jsx'

/**
 * App root.
 *
 * The entire e-module lives INSIDE <AspectRatioStage /> so the 16:9 frame
 * AND proportional element scaling are enforced globally.
 *
 * Routes (non-linear tree):
 *   /                                            → Landing
 *   /courses                                     → Course Select (5 fixed courses)
 *   /courses/:courseId                           → Section Select
 *   /courses/:courseId/lessons/:lessonId         → Lesson renderer
 *   /courses/:courseId/quiz/:quizId              → Quiz LAUNCHER (description + high score)
 *   /courses/:courseId/quiz/:quizId/play         → Quiz PLAYER (actual questions)
 *   /courses/:courseId/activity/:activityId      → Activity LAUNCHER
 *   /courses/:courseId/activity/:activityId/play → Activity SIMULATION (e.g. Audio Design Doc)
 */
export default function App() {
  return (
    <AspectRatioStage>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/*<Route path="/courses" element={<CourseSelectPage />} />*/}
        <Route path="/courses/:courseId" element={<SectionSelectPage />} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
        <Route path="/courses/:courseId/quiz/:quizId" element={<QuizLauncherPage />} />
        <Route path="/courses/:courseId/quiz/:quizId/play" element={<QuizPage />} />
        <Route path="/courses/:courseId/activity/:activityId" element={<ActivityPage />} />
        <Route path="/courses/:courseId/activity/:activityId/play" element={<AudioDesignDocSimPage />} />
        {/*catch error paths*/}
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </AspectRatioStage>
  )
}
