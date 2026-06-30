// import { Link } from 'react-router-dom'

/**
 * Centralised metadata for the courses.
 *
 * NOTE: Scope cut — only the Audio course is being built for this version.
 * The other 4 courses (Music, Sound Effect, Voice, Mixing) are kept here
 * for reference but are NOT linked from the UI. The Landing page "Start"
 * button goes directly to /courses/audio.
 */

export const COURSES = [
  {
    id: 'audio',
    title: 'Audio',
    blurb: 'Salah satu komponen multimedia yang memiliki peran penting dalam penyampaian informasi.',
    sections: [
      { id: '01-intro',         type: 'lesson',   title: 'Apa itu Audio?' },
      { id: '02-stereomono',    type: 'lesson',   title: 'Stereo vs. Mono' },
      { id: '03-visualisasi',   type: 'lesson',   title: 'Visualisasi Audio' },
      { id: '04-formatfile',    type: 'lesson',   title: 'Format Penyimpanan File Audio' },
      { id: '05-lisensi',       type: 'lesson',   title: 'Lisensi Aset Audio' },
      { id: '06-daw',           type: 'lesson',   title: '*Software* Pengolahan Audio' },
      { id: '07-konsepdda',     type: 'lesson',   title: 'Dokumentasi Desain Audio (ADD)' },
      { id: '08-aud-sim',       type: 'activity', title: 'Aktivitas: Dokumentasi Desain Audio' },
      { id: '09-quiz',          type: 'quiz',     title: 'QUIZ' },
    ],
    // Course-level learning objectives — shown in the "Capaian Pembelajaran" modal
    capaian: [
      'Mahasiswa mampu menjelaskan pengertian dari komponen audio, perbedaan dari audio stereo dengan mono, bentuk visualisasi audio, serta perannya dalam sebuah multimedia.',
      'Mahasiswa mampu menjelaskan jenis-jenis format penyimpanan audio beserta fitur, kelebihan, dan kekurangannya.',
      'Mahasiswa mampu menjelaskan sistem lisensi aset audio digital seperti copyright dan creative commons untuk membantu proses pembuatan aset audio.',
      'Mahasiswa mampu menjelaskan perangkat lunak pengolahan audio (DAW), serta dapat memilih dan mencoba DAW yang sesuai dengan kebutuhan pembuatan audio.',
      'Mahasiswa mampu menjelaskan bentuk dokumentasi desain audio (audio) dan daftar aset audio serta menerapkannya dengan menyusun rancangan dokumen ADD dan daftar aset sesuai dengan multimedia yang dikembangkan.',
    ],
  },
  // The courses below are kept for future expansion but are not linked in the UI.
  {
    id: 'music',
    title: 'Music',
    blurb: 'Role of music in multimedia, scoring, and emotion.',
    color: 'from-purple-500 to-pink-600',
    sections: [],
    capaian: [],
  },
  {
    id: 'sfx',
    title: 'Sound Effect',
    blurb: 'Foley, hard effects, and UI sound design.',
    color: 'from-emerald-500 to-teal-600',
    sections: [],
    capaian: [],
  },
  {
    id: 'voice',
    title: 'Voice',
    blurb: 'Voiceover, dialogue, and narration techniques.',
    color: 'from-amber-500 to-orange-600',
    sections: [],
    capaian: [],
  },
  {
    id: 'mixing',
    title: 'Mixing',
    blurb: 'Balancing levels, panning, and final delivery.',
    color: 'from-rose-500 to-red-600',
    sections: [],
    capaian: [],
  },
]

export function getCourse(courseId) {
  return COURSES.find((c) => c.id === courseId)
}

export function getSection(courseId, sectionId) {
  const c = getCourse(courseId)
  if (!c) return null
  return c.sections.find((s) => s.id === sectionId)
}

/**
 * Lazy-loaded lesson registry.
 * Each lesson lives in src/lessons/<courseId>_<lessonId>.jsx
 * and default-exports a React component.
 *
 * For a small module this static map is fine. When you have dozens of
 * lessons you can switch to Vite's import.meta.glob('./lessons/*.jsx').
 */
export const LESSON_REGISTRY = {
  'audio_01-intro':           () => import('../lessons/audio_01-intro.jsx'),
  'audio_02-stereomono':      () => import('../lessons/audio_02-stereomono.jsx'),
  'audio_03-visualisasi':     () => import('../lessons/audio_03-visualisasi.jsx'),
  'audio_04-formatfile':      () => import('../lessons/audio_04-formatfile.jsx'),
  'audio_05-lisensi':         () => import('../lessons/audio_05-lisensi.jsx'),
  'audio_06-daw':             () => import('../lessons/audio_06-daw.jsx'),
  'audio_07-konsepdda':       () => import('../lessons/audio_07-konsepdda.jsx'),
  // Note: create these lesson files as you build them. Until they exist,
  // the LessonPage will show a "Lesson not found" message — that's expected.
}
