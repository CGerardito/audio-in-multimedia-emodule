import ImageGallery from '../components/ImageGallery.jsx'

/* ============================================================================
 * CUE SHEET GALLERY IMAGES
 * ============================================================================
 * Each entry: { src, caption }
 * src comes from the bulk-imported index.js in the cuesheets folder.
 * Adjust the keys to match your actual filenames.
 * ============================================================================ */
const CUE_SHEET_GALLERY = [
  { src: '/assets/images/cuesheets/SpotNote_TheCitizen.png', caption: 'Contoh cue sheet untuk film pendek' },
  { src: '/assets/images/cuesheets/MusicSpot_CravenBlack.png', caption: 'Contoh cue sheet untuk animasi' },
  { src: '/assets/images/cuesheets/BreakdownSheet_SayYes.png', caption: 'Contoh Audio Design Document (ADD)' },
  { src: '/assets/images/cuesheets/MusicSpot_TheSimpsons.png', caption: 'Contoh daftar aset audio' },
    { src: '/assets/images/cuesheets/SFXspot_null.png', caption: 'Contoh cue sheet untuk film pendek' },
    { src: '/assets/images/cuesheets/FoleySpot_null.png', caption: 'Contoh cue sheet untuk animasi' },
    { src: '/assets/images/cuesheets/ADRscript_TLOTR.png', caption: 'Contoh Audio Design Document (ADD)' },
]

export default function WhatIsAudio() {
    return (
        <article className="w-full max-w-5xl mx-auto p-12 font-pjs font-medium text-plat">
            <header className="mb-12">
                <section className="w-full max-w-5xl mx-auto">

                    {/*JUDUL MATERI*/}

                    <header className="mb-24">
                        <p className="font-JBM text-center text-xl text-neon">
                            MATERI 7
                        </p>
                        <h1 className="font-extrabold text-center text-8xl leading-tight">
                            Dokumentasi Desain Audio
                        </h1>
                    </header>

                    {/*ISI MATERI*/}

                    <section className="font-PJS text-justify text-3xl mb-12">
                        <p className="mb-12 leading-relaxed">
                            Agar proses pembuatan audio untuk suatu multimedia dapat berjalan secara sistematis, akan lebih baik untuk memiliki sebuah <strong className="text-neon">dokumentasi yang dapat menjadi acuan untuk pembuatan audio</strong> yang diperlukan. Proses dokumentasi ini berbeda berdasarkan jenis multimedia yang dibuat.
                        </p>
                    </section>

                    {/*Tabel*/}
                    <section className="grid grid-cols-2 gap-4 mb-12 w-full">
                        <div className="bg-navy text-2xl rounded-2xl font-PJS p-6">
                            <h2 className="text-center font-JBM tracking-tight">
                                Multimedia Linear
                            </h2>
                            <h2 className="text-center text-5xl font-bold text-neon mb-6">
                                Sesi <em>Spotting</em>
                            </h2>
                            <hr className="border-plat border-dotted border-2 mb-4" />
                            <p className="mb-2 leading-snug">
                                •{' '}
                                <span className="text-neon">
                                    Multimedia Linear
                                </span>:{' '}
                                <span className="block ml-4 italic">
                                    ↪ Film, video, animasi
                                </span>
                            </p>
                            <p className="text-justify leading-normal">
                                Proses ini melibatkan direktur utama, produser, ahli skor musik, serta pihak utama pembuat audio lainnya untuk menonton potongan kasar dari multimedia yang dibuat agar dapat menentukan musik, efek suara, atau dialog yang diperlukan pada menit keberapa. Hasil dari kegiatan ini adalah <em>cue sheet</em>: sebuah catatan berisi informasi mengenai audio yang diperlukan pada menit keberapa yang tertera.
                            </p>
                        </div>
                        <div className="bg-navy text-2xl rounded-2xl font-PJS p-6">
                            <h2 className="text-center font-JBM tracking-tight">
                                Multimedia Non-Linear
                            </h2>
                            <h2 className="text-center text-5xl font-PJS font-bold text-neon mb-6">
                                Dokumen Desain
                            </h2>
                            <hr className="border-plat border-dotted border-2 mb-4" />
                            <p className="mb-2 leading-snug">
                                •{' '}
                                <span className="text-neon">
                                    Multimedia Non-Linear
                                </span>:{' '}
                                <span className="block ml-4 italic">
                                    ↪ Video gim, media interaktif
                                </span>
                            </p>
                            <p className="font-PJS text-justify leading-relaxed">
                                Proses ini adalah perancangan sebuah dokumen tertulis terkait multimedia yang akan dibuat. Dokumen desain berfungsi sebagai titik acuan dari aspek tertentu pada multimedia yang dibuat. Hal seperti arah visual, atmosfir, latar, dan tentu juga gaya audio yang dibutuhkan. Pembuat audio dapat menyusun daftar aset, yang merupakan daftar sistematis dari seluruh aset audio yang diperlukan dalam multimedia
                            </p>
                        </div>
                    </section>

                    {/* =========================================================
                        IMAGE GALLERY — cue sheet examples
                        =========================================================
                        User can:
                          - Click left/right arrows to navigate
                          - Swipe on mobile
                          - Click the image to zoom in (opens Modal)
                          - Click dots to jump to any image
                        Loops back to start when reaching the end. */}
                    <section className="mb-12">
                        <h2 className="font-extrabold text-5xl italic text-center mb-6 text-plat">
                            Contoh Dokumentasi Audio
                        </h2>
                        <p className="font-JBM text-center text-2xl text-plat/70 mb-4 tracking-tight leading-relaxed">
                            Berikut ada beberapa contoh <em>cue sheet</em> dan dokumen desain audio.
                            <span className="block italic underline">Klik Gambar untuk Zoom-In</span>
                        </p>

                        <ImageGallery images={CUE_SHEET_GALLERY} />
                    </section>

                    <p className="font-PJS text-justify text-3xl mb-12 leading-relaxed">
                        Dokumentasi audio bukan hanya sekedra formalitas atau laporan yang perlu ditulis hanya untuk melaporkan. Dokumentasi audio merupakan acuan untuk tim pembuat multimedia. Bagi <strong className="text-neon">multimedia linear</strong>, <span className="underline decoration-neon">dokumentasi memastikan apa yang dirancang oleh tim pra-produksi dapat direalisasikan tim pasca produksi</span>. Sedangkan <strong className="text-gold">multimedia non-linear</strong>, <span className="underline decoration-gold">dokumentasi menjadi narasumber utama dalam proses pembuatan audio dan memastikan semua aset yang diperlukan tertulis dan dapat dilihat progresnya</span>.
                    </p>

                </section>
                <div className="h-32" />
            </header>
        </article>
    )
}
