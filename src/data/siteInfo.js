/**
 * siteInfo.js
 * -----------
 * Centralized content for the Creator's Words (Pengantar) and Attribution modals.
 *
 * === CREATOR_WORDS SCHEMA ===
 *   title      — modal title
 *   portrait   — filename (without extension) from src/assets/images/
 *   author     — creator's name
 *   role       — optional subtitle
 *   paragraphs — array of strings (or JSX), each becomes a <p>
 *
 * === ATTRIBUTION SCHEMA ===
 *   Each entry: { name, author, url, license, type }
 *     name    — asset name (e.g. "Plus Jakarta Sans")
 *     author  — who made it (e.g. "TokoType")
 *     url     — link to the source
 *     license — license type (e.g. "OFL-1.1", "CC-BY-4.0", "Unsplash License")
 *     type    — 'font' | 'image' | 'audio' | 'video' | 'other'
 */

/* ============================================================================
 * CREATOR'S WORDS (Pengantar)
 * ============================================================================
 * A personal preface/foreword from the creator (you).
 * Contains a portrait and several paragraphs of text.
 * ============================================================================ */
export const CREATOR_WORDS = {
  title: 'Pengantar',
  portrait: 'portrait',  // filename in src/assets/images/, e.g. 'portrait.jpg' → 'portrait'
  author: 'Christopher Gerardito Marius Putra',
  role: 'Creator',
  paragraphs: [
    'Terima kasih telah menggunakan modul ini. Kita kadang tidak sadar betapa besar pengaruh audio saat menggunakan suatu multimedia. Selain sebagai keperluan tugas akhir, aku menyusun e-modul ini dengan harapan teman-teman yang menggunakan akan lebih tertarik mendalami komponen audio dalam multimedia.',

    'Media pembelajaran ini dirancang untuk dapat dipelajari secara mandiri diluar jam perkuliahan. Ada minigame, quiz, dan simulasi kecil yang bisa teman-teman coba dan mainkan. Materi dan konsep dalam e-modul ini didasari tinjauan pustaka, pengalaman pribadiku selama ±3 tahun terakhir membuat audio, serta arahan rekan dan sepuh industri yang memastikan materi relevan dengan pekerjaan di industri.',

    'Tanpa perlu lama, selamat belajar dan semoga e-modul ini bermanfaat <3',
  ],
}

/* ============================================================================
 * ATTRIBUTION
 * ============================================================================ */
export const ATTRIBUTION = {
  title: 'Attribution',
  intro:
    'E-modul ini menggunakan aset pihak ketiga yang bersumber dari berbagai ' +
    'penyedia. Berikut adalah daftar atribusi untuk aset-aset tersebut.',

  entries: [
    // --- FONTS ---
    {
      name: 'Plus Jakarta Sans',
      author: 'TokoType',
      url: 'https://fonts.google.com/specimen/Plus+Jakarta+Sans',
      license: 'OFL-1.1',
      type: 'font',
    },
    {
      name: 'JetBrains Mono',
      author: 'JetBrains',
      url: 'https://www.jetbrains.com/lp/mono/',
      license: 'OFL-1.1',
      type: 'font',
    },

    // --- IMAGES ---
    {
      name: 'Audio Icon',
      author: 'photo3idea_studio',
      url: 'https://www.flaticon.com/free-icons/audio',
      license: 'Flaticon License',
      type: 'image',
    },
    {
      name: 'Close-Up Audio Mixer',
      author: 'Dylan McLeod',
      url: 'https://unsplash.com/@son_of_media',
      license: 'Unsplash License',
      type: 'image',
    },
    {
      name: 'Flat Lay Headphones Midi Keyboard',
      author: 'James Stamler',
      url: 'https://unsplash.com/@jamesstamler',
      license: 'Unsplash License',
      type: 'image',
    },
    {
      name: 'Audio Sampling',
      author: 'Vaughan Tay',
      license: 'Multimedia: Making It Work (8th)',
      type: 'image',
    },
    {
      name: 'Stereo vs. Mono',
      author: 'Soundskrit',
      url: 'https://soundskrit.ca/2023/06/26/stereo-sound-vs-mono-explained/',
      license: 'BY-Soundskrit',
      type: 'image',
    },
    {
      name: 'Surround Sound Diagram',
      author: 'MTX',
      url: 'https://www.mtx.com/library-home-audio-choose-surround-system',
      license: 'BY-MTX',
      type: 'image',
    },
    {
      name: 'Spectogram & Oscillogram',
      author: 'Kovitvongsa & Lobel (2009)',
      url: '',
      license: '',
      type: 'image',
    },
    {
      name: 'Audio File Extensions',
      author: '@ExplainingComputers',
      url: 'https://www.youtube.com/@explainingcomputers',
      license: 'YouTube',
      type: 'image',
    },
    {
      name: 'Various Commons Icons',
      author: 'UXWing',
      url: 'https://uxwing.com/license/',
      license: 'UXWing License',
      type: 'image',
    },
    {
      name: 'CC-Licenses',
      author: 'Creative Commons',
      url: 'https://creativecommons.org/cc-licenses/',
      license: 'Creative Commons',
      type: 'image',
    },
    {
      name: 'Various Audio Documents',
      author: 'Soundclass on Weebly',
      url: 'https://soundclass.weebly.com/6-spotting-for-sound-design.html',
      license: 'BY-Soundclass',
      type: 'image',
    },
    {
      name: 'Spectrum of Rights',
      author: 'Stewart & Zriachev',
      url: 'https://ecampusontario.pressbooks.pub/oerguide/',
      license: 'A Quick Guide to OER for St. Clair College (2nd)',
      type: 'image',
    },
    {
      name: 'Man Riding Brown Horse',
      author: 'Maria Baranova',
      url: 'https://unsplash.com/@maria0701',
      license: 'Unsplash License',
      type: 'image',
    },
    {
      name: 'Kingdom Dawn',
      author: 'Tatiana Zhukoova',
      url: 'https://unsplash.com/@tatiana19',
      license: 'Unsplash License',
      type: 'image',
    },
    {
      name: 'Person in a Forest',
      author: 'Luis Del Río Camacho',
      url: 'https://unsplash.com/@luisdelrio',
      license: 'Unsplash License',
      type: 'image',
    },
    {
      name: 'Dragon Sillhouette Behind Tower',
      author: 'Super Mario Odyssey',
      type: 'image',
    },
    // --- AUDIOS ---
    {
      name: 'Car Stereo Mono Demo',
      author: 'Soundskrit',
      url: 'https://soundskrit.ca/2023/06/26/stereo-sound-vs-mono-explained/',
      license: 'BY-Soundskrit',
      type: 'audio',
    },
    {
      name: 'Treeshroud Forest',
      author: 'Arata Iiyoshi',
      license: 'Pokemon Mystery Dungeons: Explorers of Sky',
      type: 'audio',
    },
    {
      name: 'Creator',
      author: 'Lena Raine',
      license: 'Minecraft',
      type: 'audio',
    },
    {
      name: 'Various SFX',
      author: 'Kenney',
      url: 'https://kenney.nl/',
      license: 'Kenney Game Assets',
      type: 'audio',
    },
    {
      name: 'Corneria (Super Smash Bros. Ultimate Arrange)',
      author: 'HAL Laboratory, Inc.',
      license: 'Star Fox',
      type: 'audio',
    },
    {
      name: 'Cliffs',
      author: 'Toby Fox',
      license: 'DELTARUNE',
      type: 'audio',
    },
    {
      name: 'The Watershed Moment',
      author: 'Tsutomu Narita, Nobuo Uematsu',
      license: 'Granblue Fantasy',
      type: 'audio',
    },
    {
      name: 'Void',
      author: 'HyperGryph',
      license: 'Arknights',
      type: 'audio',
    },
    {
      name: 'Buddy',
      author: 'Bensound',
      url: 'https://www.bensound.com/royalty-free-music/track/buddy',
      license: 'Free License',
      type: 'audio',
    },
    // --- VIDEOS ---
    {
      name: 'Avengers: Endgame',
      author: 'Marvel Studios',
      type: 'video',
    },
    {
      name: 'Car Drive-By',
      author: 'Jaguar',
      url: 'https://giphy.com/JaguarCars',
      license: 'GIPHY',
      type: 'video',
    },
    {
      name: 'Spring, Mvt1 - The Four Seasons by Vivaldi (Piano Tutorial)',
      author: '@PianoMan333',
      url: 'https://www.youtube.com/@PianoMan333',
      license: 'YouTube',
      type: 'video',
    },
    // --- SOFTWARE / LIBRARIES ---
    {
      name: 'React',
      author: 'Meta / React Team',
      url: 'https://react.dev/',
      license: 'MIT',
      type: 'library',
    },
    {
      name: 'Tailwind CSS',
      author: 'Tailwind Labs',
      url: 'https://tailwindcss.com/',
      license: 'MIT',
      type: 'library',
    },
    {
      name: 'Tone.js',
      author: 'Yotam Mann',
      url: 'https://tonejs.github.io/',
      license: 'MIT',
      type: 'library',
    },
    // --- SOFTWARE (OTHER) ---
    {
      name: 'Audacity',
      author: 'Muse Group',
      url: 'https://www.audacityteam.org/',
      license: 'Audacity',
      type: 'other'
    },
    {
      name: 'Ableton Live',
      author: 'Ableton AG',
      url: 'https://www.ableton.com/',
      license: 'Ableton',
      type: 'other',
    },
    {
      name: 'FL Studio',
      author: 'Image-Line Software',
      url: 'https://www.image-line.com/',
      license: 'Fl Studio',
      type: 'other',
    },
    {
      name: 'Pro Tools',
      author: 'Avid Technology',
      url: 'https://www.avid.com/pro-tools',
      license: 'Pro Tools',
      type: 'other',
    },
    {
      name: 'REAPER',
      author: 'Cockos',
      url: 'https://www.reaper.fm/',
      license: 'REAPER',
      type: 'other',
    },
    {
      name: 'BandLab',
      author: 'BandLab Technologies',
      url: 'https://www.bandlab.com/',
      license: 'BandLab',
      type: 'other',
    },
  ],
}

/* ============================================================================
 * HELPER — group attribution entries by type for display
 * ============================================================================ */
export function groupAttributionByType(entries) {
  const groups = { library:[], font: [], image: [], audio: [], video: [], other: [] }
  entries.forEach(entry => {
    if (!groups[entry.type]) groups[entry.type] = []
    groups[entry.type].push(entry)
  })
  return groups
}
