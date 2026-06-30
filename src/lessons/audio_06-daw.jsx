import { useState } from 'react'
import { asset } from "../utils/assetPath.js";

/* ============================================================================
 * DAW TAB DATA
 * ============================================================================
 * Each entry represents one DAW tab. Fields:
 *   id          — unique identifier (used for state + lookup)
 *   name        — display name (shown as heading + alt text)
 *   logo        — filename (no extension) for the tab header icon
 *   screenshot  — filename (no extension) for the main content image
 *   description — text shown below the screenshot (JSX, so you can use <em>, <strong>, etc.)
 * ============================================================================ */
const DAW_TABS = [
    {
        id: 'ableton',
        name: 'Ableton Live',
        logo: '/assets/images/daw_sc-ico/ableton_ico.png',
        screenshot: '/assets/images/daw_sc-ico/ableton_sc.png',
        description: (
            <>
                <p className="mb-4">
                    Ableton Live adalah DAW yang populer untuk produksi musik elektronik dan performa langsung (LIVE). Memiliki mode <em>Session View</em> yang memperbolehkan pengguna untuk memainkan audio LIVE secara non-linear. <em>Arrangement View</em> dalam Ableton Live merupakan tampilan standar DAW yang menjadi tempat untuk menyusun aransemen atau memanipulasi audio.
                </p>
                <ul className="border-l-6 border-neon border-double">
                    <li className="ml-2 mb-4">
                        • <strong className="text-neon">Model Pembayaran</strong> : <em>One-Time Purchase</em>
                    </li>
                    <li className="ml-2 mb-2">
                        • <strong className="text-neon">Masa Percobaan</strong> : 30 hari*
                    </li>
                </ul>
                <p className="text-2xl text-plat/50 tracking-tight">
                    *Setelah lewat, pengguna tidak dapat menyimpan atau meng-<em>export</em> proyek.
                </p>
            </>
        ),
    },
    {
        id: 'fl',
        name: 'FL Studio',
        logo: '/assets/images/daw_sc-ico/flstudio_ico.png',
        screenshot: '/assets/images/daw_sc-ico/flstudio_sc.png',
        description: (
            <>
                <p className="mb-4">
                    FL Studio (<em>sebelumnya FruityLoops</em>) adalah DAW yang populer digunakan untuk produksi musik <em>hip-hop</em> dan <em>EDM</em>. DAW ini memiliki <em>Channel Rack</em> yang berfungsi sebagai <em>sequencer</em> untuk menyusun <em>beat</em>.
                </p>
                <ul className="border-l-6 border-neon border-double">
                    <li className="ml-2 mb-4">
                        • <strong className="text-neon">Model Pembayaran</strong> : <em>One-Time Purchase</em>
                    </li>
                    <li className="ml-2 mb-2">
                        • <strong className="text-neon">Masa Percobaan</strong> : Selamanya*
                    </li>
                </ul>
                <p className="text-2xl text-plat/50 tracking-tight">
                    *Versi <em>trial</em> tidak dapat membuka file proyek yang sudah dibuat.
                </p>
            </>
        ),
    },
    {
        id: 'protools',
        name: 'Pro Tools',
        logo: '/assets/images/daw_sc-ico/protools_ico.png',
        screenshot: '/assets/images/daw_sc-ico/protools_sc.png',
        description: (
            <>
                <p className="mb-4">
                    Pro Tools adalah DAW yang telah lama menjadi standar industri untuk rekaman dan editing audio di studio profesional. Pro Tools memiliki bar entri masuk yang tinggi, namun proses pengerjaan dalam Pro Tools bisa cepat apabila penggunanya mampu mengoperasikan Pro Tools secara maksimal. DAW ini sering digunakan untuk produksi musik, film, dan TV.
                </p>
                <ul className="border-l-6 border-neon border-double">
                    <li className="ml-2 mb-4">
                        • <strong className="text-neon">Model Pembayaran</strong> : <em>Bayar per Tahun</em>
                    </li>
                    <li className="ml-2 mb-2">
                        • <strong className="text-neon">Masa Percobaan</strong> : Selamanya*
                    </li>
                </ul>
                <p className="text-2xl text-plat/50 tracking-tight">
                    *Versi percobaan membatasi jumlah kanal yang dapat digunakan dalam satu proyek.
                </p>
            </>
        ),
    },
    {
        id: 'reaper',
        name: 'REAPER',
        logo: '/assets/images/daw_sc-ico/reaper_ico.png',
        screenshot: '/assets/images/daw_sc-ico/reaper_sc.png',
        description: (
            <>
                <p className="mb-4">
                    REAPER adalah DAW ringan dengan lisensi yang terjangkau. DAW ini populer di kalangan orang-orang yang ingin belajar menggunakan DAW. REAPER memiliki fitur kustomisasi yang lengkap. Hal ini memperbolehkan pengguna REAPER untuk menyesuaikan DAW-nya sesuai dengan pekerjaan yang dilakukan.
                </p>
                <ul className="border-l-6 border-neon border-double">
                    <li className="ml-2 mb-4">
                        • <strong className="text-neon">Model Pembayaran</strong> : <em>One-Time Purchase</em>
                    </li>
                    <li className="ml-2 mb-2">
                        • <strong className="text-neon">Masa Percobaan</strong> : 60 hari*
                    </li>
                </ul>
                <p className="text-2xl italic text-plat/50 tracking-tight">
                    *Setelah lewat, pengguna masih dapat menggunakan fitur penuh DAW selama pengguna masih "mengevaluasi".
                </p>
            </>
        ),
    },
    {
        id: 'bandlab',
        name: 'BandLab',
        logo: '/assets/images/daw_sc-ico/bandlab_ico.png',
        screenshot: '/assets/images/daw_sc-ico/bandlab_sc.png',
        description: (
            <>
                <p className="mb-4">
                    BandLab adalah DAW berbasis <em>cloud</em> yang dapat diakses melalui aplikasi dan situs web secara gratis. DAW ini membuat proses pembuatan audio aksesibel untuk semua orang dengan membuatnya mudah diakses melalui web tanpa perlu mengeluarkan sepeser uang. Bandlab memiliki paket yang dapat dibayarkan untuk mendapatkan fitur lebih, namun mode <em>free</em>-nya cukup untuk pengguna yang mau mulai belajar.
                </p>
                <ul className="border-l-6 border-neon border-double">
                    <li className="ml-2 mb-4">
                        • <strong className="text-neon">Model Pembayaran</strong> : <em>Freemium</em>
                    </li>
                    <li className="ml-2 mb-2">
                        • <strong className="text-neon">Masa Percobaan</strong> : —
                    </li>
                </ul>
            </>
        ),
    },
]

export default function DigitalAudioWorkstation() {
    // === TAB STATE ===
    // Tracks which DAW tab is currently active. Default to the first one.
    const [activeTab, setActiveTab] = useState('ableton')

    // Find the active tab ONCE — reuse it everywhere in the JSX below.
    // This is more efficient than calling .find() multiple times.
    const activeDAW = DAW_TABS.find(t => t.id === activeTab)

    return (
        <article className="w-full max-w-5xl mx-auto p-12 font-pjs font-medium text-plat">
            <header className="mb-12">
                <section className="w-full max-w-5xl mx-auto">

                    {/*JUDUL MATERI*/}

                    <header className="mb-24">
                        <p className="font-JBM text-center text-xl text-neon">
                            MATERI 6
                        </p>
                        <h1 className="font-extrabold text-center text-8xl leading-tight">
                            Perangkat Lunak Pengolahan Audio (DAW)
                        </h1>
                    </header>

                    {/*ISI MATERI*/}

                    {/*Paragraf Awal*/}

                    <div className="flex flex-col justify-center font-PJS font-semibold italic text-7xl mb-12 leading-relaxed tracking-wide">
                        <p className="ml-30">
                            <span className="text-9xl font-extrabold text-neon">D</span>
                            igital
                        </p>
                        <p className="ml-54">
                            <span className="text-9xl font-extrabold text-neon">A</span>
                            udio
                        </p>
                        <p className="ml-78">
                            <span className="text-9xl font-extrabold text-neon tracking-tighter">W</span>
                            orkstation
                        </p>
                    </div>

                    {/*Bullet list DAW*/}

                    <section className="font-PJS text-3xl leading-relaxed mb-12">
                        <p className="text-justify mb-4">
                            <strong className="text-neon italic">Digital Audio Workstation</strong> adalah perangkat lunak (<em>software</em>) atau aplikasi yang dapat digunakan untuk mengolah file audio. Ada banyak opsi DAW yang dapat digunakan oleh seorang <em>audio engineer</em> atau audio desainer. Suatu DAW memiliki fungsi-fungsi sebagai berikut:
                        </p>
                        <ul className="ml-4">
                            <li className="mb-4">
                                • <strong className="text-neon">Audio Recording</strong>:
                                <span className="block ml-12">Merekam audio, baik suara melalui <em>microphone</em>, maupun rekaman digital dari bermain alat musik.</span>
                            </li>
                            <li className="mb-4">
                                • <strong className="text-neon">MIDI Sequencing</strong>:
                                <span className="block ml-12">Membuat pola MIDI untuk dimainkan oleh instrumen virtual.</span>
                            </li>
                            <li className="mb-4">
                                • <strong className="text-neon">Audio Editing</strong>:
                                <span className="block ml-12">Memanipulasi audio seperti memotong, menggeser, mengubah nada, memanjangkan suara, dan semacamnya.</span>
                            </li>
                            <li className="mb-4">
                                • <strong className="text-neon">Mixing & Mastering</strong>:
                                <span className="block ml-12">Mengatur volume, panning, serta menambahkan efek audio sebagai finalisasi akhir musik atau audio yang dibuat.</span>
                            </li>
                        </ul>
                    </section>

                    {/* =========================================================
                        TAB daw
                        ========================================================= */}

                    {/* --- Tab headers — 5 buttons in a row --- */}
                    <div className="grid grid-cols-5 gap-2">
                        {DAW_TABS.map(daw => (
                            <button
                                key={daw.id}
                                onClick={() => setActiveTab(daw.id)}
                                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-t-2xl transition-colors ${
                                    activeTab === daw.id
                                        ? 'bg-navy text-plat'
                                        : 'bg-base text-neon border-2 border-navy hover:bg-navy/30'
                                }`}
                                aria-label={daw.name}
                            >
                                <img
                                    src={asset(daw.logo)}
                                    alt={daw.name}
                                    className="w-24 h-24 object-contain pointer-events-none select-none"
                                />
                            </button>
                        ))}
                    </div>

                    {/* --- Active tab content --- */}
                    <div className="bg-navy rounded-b-2xl p-8 mb-12">

                        {/* DAW name */}
                        <h2 className="font-PJS font-extrabold text-7xl text-center text-neon mb-8">
                            {activeDAW.name}
                        </h2>

                        {/* Screenshot at the top */}
                        <div className="flex justify-center mb-6">
                            <img
                                src={asset(activeDAW.screenshot)}
                                alt={`${activeDAW.name} screenshot`}
                                className="w-full max-w-4xl rounded-2xl border-2 border-neon pointer-events-none select-none"
                            />
                        </div>

                        {/* Description */}
                        <div className="font-PJS text-3xl leading-relaxed text-plat">
                            {activeDAW.description}
                        </div>
                    </div>

                    {/*Rekomendasi DAW*/}
                    <div className="bg-gold/20 border-l-4 border-gold p-6 rounded-r-xl mb-12">
                        <p className="text-gold font-PJS font-semibold italic text-5xl mb-4">
                            Mulai dari DAW yang mana?
                        </p>

                        <div className="font-PJS text-3xl leading-relaxed">
                            <p className="text-justify mb-4">
                                Semua DAW dapat membantu proses pembuatan audio. Namun, ada beberapa DAW yang lebih aksesibel dari yang lain, terutama bagi yang masih ingin belajar. Berikut ini adalah rekomendasi DAW pemula bagi yang ingin mencoba dan belajar mengoperasikan DAW:
                            </p>
                            <table className="w-full text-left">
                                <tbody>
                                <tr className="font-JBM text-3xl divide-x-2 divide-plat">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={asset(DAW_TABS.find(item => item.id === "bandlab")?.logo)}
                                                alt='Logo BandLab'
                                                className="w-24 h-24 object-contain pointer-events-none select-none mb-4"
                                            />
                                            <div>
                                                BandLab
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-2xl align-middle">
                                        Hanya dengan membuat akun BandLab, kamu bisa langsung menggunakan DAW BandLab melalui web. Tidak hanya itu, BandLab juga dapat digunakan di berbagai perangkat dari komputer atau aplikasi di <em>smartphone</em>. Ini membuat BandLab sangat aksesibel untuk digunakan dimanapun dan kapanpun.
                                    </td>
                                </tr>
                                <tr className="font-JBM text-3xl divide-x-2 divide-plat">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={asset(DAW_TABS.find(item => item.id === "reaper")?.logo)}
                                                alt='Logo REAPER'
                                                className="w-24 h-24 object-contain pointer-events-none select-none mb-4"
                                            />
                                            <div>
                                                REAPER
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-2xl align-middle">
                                        REAPER memiliki model pembayaran <em>one-time purchase</em> dengan harga yang murah dibandingkan DAW-DAW lain. Versi percobaan REAPER yang masih fitur penuh walaupun telah melewati tenggat masa percobaan cocok bagi yang masih ingin mencoba. Pastikan kamu sudah membeli lisensi penggunaan apabila proyek yang dibuat bersifat komersial.
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </section>
                <div className="h-32"/>
            </header>
        </article>
    )
}