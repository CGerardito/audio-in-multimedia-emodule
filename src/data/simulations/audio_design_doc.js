/**
 * audio_design_doc.js
 * -------------------
 * Data for the Audio Design Document simulation.
 *
 * The simulation presents a "paper" with a reference image collage at the top,
 * and several fields the user must fill in by selecting from dropdowns or
 * audio-choice grids.
 *
 * === SCHEMA ===
 *
 *   title        — simulation title
 *   description  — shown on the launcher (already in ActivityPage, duplicated here for the sim)
 *   referenceImages — array of { src, caption } for the top collage
 *   fields       — array of field objects, each one of:
 *
 *     Dropdown field:
 *       { id, type: 'dropdown', label, multi: bool, options: [{value, label}], correct: value | value[] }
 *
 *     Audio-choice field (single selection from audio previews):
 *       { id, type: 'audio-choice', label, description,
 *         options: [{ id, label, audioSrc }],
 *         correct: 'optionId' }
 *
 *     Audio-choice-multi field (multiple prompts, each with its own audio options):
 *       Used for SFX — each prompt describes a scene, user picks the SFX that fits.
 *       { id, type: 'audio-choice-multi', label,
 *         prompts: [
 *           { prompt: 'description', options: [{ id, label, audioSrc }], correct: 'optionId' }
 *         ] }
 *
 * === ABOUT ASSET PATHS ===
 *
 * All asset paths here use ABSOLUTE paths (starting with /) that resolve to
 * files in the `public/` folder. This is because JSON/JS data files can't
 * `import` assets the way JSX files can.
 *
 * Drop your actual files at:
 *   public/assets/images/add-sim-ref-1.jpg
 *   public/assets/audio/add-sim-music-1.mp3
 *   etc.
 *
 * Until you add real files, the simulation will show broken image/audio
 * placeholders — that's expected. Replace the paths below with your real files.
 */

export const AUDIO_DESIGN_DOC = {
  title: 'Film_Kesatria Legenda',
  description:
    'Simulasi penyusunan Audio Design Document. Lihat referensi visual, pilih genre, ' +
    'pilih musik latar yang sesuai, dan pilih efek suara (SFX) untuk setiap adegan.',

  // === REFERENCE IMAGES (top collage) ===
  // 3-4 images that establish the visual tone. The user picks audio that fits.
  referenceImages: [
    {
      src: '/assets/add-sim/knight.jpg',
      caption: 'REF_1',
    },
    {
      src: '/assets/add-sim/kingdom.jpg',
      caption: 'TOWN_protoype',
    },
    {
      src: '/assets/add-sim/forest.jpg',
      caption: 'FOREST_protoype',
    },
    {
      src: '/assets/add-sim/dragon.jpg',
      caption: 'act3-concept',
    },
  ],

  // === FIELDS THE USER MUST FILL IN ===
  fields: [
    // --- FIELD 1: GENRE (multi-select dropdown) ---
    {
      id: 'genre',
      type: 'dropdown',
      label: 'Genre',
      description: 'Pilih genre naratif yang paling sesuai dengan referensi visual di atas. (Bisa lebih dari satu)',
      multi: true,
      options: [
        { value: 'adventure',   label: 'Adventure' },
        { value: 'comedy',      label: 'Comedy' },
        { value: 'medieval',    label: 'Medieval' },
        { value: 'romance',     label: 'Romance' },
        { value: 'fantasy',     label: 'Fantasy' },
        { value: 'sci-fi',      label: 'Sci-Fi' },
      ],
      correct: ['medieval', 'adventure', 'fantasy'],
    },

    // --- FIELD 2: MUSIC (single audio-choice) ---
    // User listens to 4 short music clips and picks the one that fits the reference.
    {
      id: 'music',
      type: 'audio-choice',
      label: 'Musik Latar',
      description: 'Pilih gaya musik latar yang paling sesuai dengan referensi visual di atas.',
      options: [
        { id: 'm1', label: 'BGM_01',  audioSrc: '/assets/add-sim/bgm1_ssbu-corneria.ogg' },
        { id: 'm2', label: 'BGM_02',  audioSrc: '/assets/add-sim/bgm2_dtr-cliffs.ogg' },
        { id: 'm3', label: 'BGM_03',  audioSrc: '/assets/add-sim/bgm3_gbf-watershed.ogg' },
        { id: 'm4', label: 'BGM_04',  audioSrc: '/assets/add-sim/bgm4_ak-void.ogg' },
      ],
      correct: 'm3',
    },

    // --- FIELD 3: SFX (multi-prompt audio-choice) ---
    // Each prompt describes a scene. User listens to 3-4 SFX options and picks the right one.
    {
      id: 'sfx',
      type: 'audio-choice-multi',
      label: 'Efek Suara (SFX)',
      description: 'Perhatikan deskripsi adegan. Pilih efek suara yang paling sesuai dengan deskripsi adegan.',
      prompts: [
        {
          prompt: 'Kesatria mengambil helm baja untuk dipakai',
          options: [
            { id: 's1a', label: 'sfx1',       audioSrc: '/assets/add-sim/sfx_1.ogg' },
            { id: 's1b', label: 'protA',      audioSrc: '/assets/add-sim/protA.ogg' },
            { id: 's1c', label: '01_aud',     audioSrc: '/assets/add-sim/01_aud.ogg' },
          ],
          correct: 's1c',
        },
        {
          prompt: 'Penyihir menghentakkan tongkat sihir',
          options: [
            { id: 's2a', label: 'sfx2',       audioSrc: '/assets/add-sim/sfx_2.ogg' },
            { id: 's2b', label: 'protB',      audioSrc: '/assets/add-sim/protB.ogg' },
            { id: 's2c', label: '02_aud',     audioSrc: '/assets/add-sim/02_aud.ogg' },
          ],
          correct: 's2b',
        },
        {
          prompt: 'Seseorang mengambil semangkuk air dari bak',
          options: [
            { id: 's3a', label: 'sfx3',       audioSrc: '/assets/add-sim/sfx_3.ogg' },
            { id: 's3b', label: 'protC',      audioSrc: '/assets/add-sim/protC.ogg' },
            { id: 's3c', label: '03_aud',     audioSrc: '/assets/add-sim/03_aud.ogg' },
          ],
          correct: 's3c',
        },
      ],
    },
  ],
}
