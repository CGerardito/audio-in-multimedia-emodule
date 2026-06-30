import audioWaveRep from "/assets/images/vaughan tay_audio sampling.png"
import endgamePortal from "../assets/videos/Endgame_PortalFinal.mp4"

export default function WhatIsAudio() {
    return (
        <article className="w-full max-w-5xl mx-auto p-12 font-pjs font-medium text-plat">
            <header className="mb-12">
                <section className="w-full max-w-5xl mx-auto">

                    {/*JUDUL MATERI*/}

                    <header className="mb-24">
                        <p className="font-JBM text-center text-xl text-neon">
                            MATERI 1
                        </p>
                        <h1 className="font-extrabold text-center text-8xl">
                            Apa itu Audio?
                        </h1>
                    </header>

                    {/*ISI MATERI*/}

                    <section className="font-PJS text-justify text-3xl mb-12">
                        <p className="mb-12 leading-relaxed">
                            Audio adalah <strong className="text-neon">representasi digital dari suara</strong>. Suara dihasilkan oleh getaran dari suatu sumber suara. Getaran tersebut membentuk gelombang suara yang bergerak merambat melalui udara. Audio merepresentasikan suara dengan mengambil ribuan data sampel dalam gelombang suara setiap n-detik, lalu disusun ulang gelombang baru secara digital berdasarkan data dari sampel suara.
                        </p>

                        <figure className="bg-base rounded-xl p-6 border-2 border-navy mb-12">
                            <div className="bg-navy rounded-lg flex items-center justify-center mb-6">
                                <img
                                    src={audioWaveRep}
                                    alt="Diagram Sampling Gelombang"
                                    className="rounded-lg object-cover select-none pointer-events-none"
                                />
                            </div>
                            <figcaption className="font-JBM text-center text-2xl text-neon">
                                Proses Sampel Suara dan Rekonstruksi Audio (Vaughan, 2008)
                            </figcaption>
                        </figure>

                        <p className="mb-12 leading-relaxed">
                            Dalam suatu multimedia, komponen audio memiliki peran untuk menstimulasi indra pendengaran pengguna. Perhatikan cuplikan film <span className="underline">Avengers: Endgame</span> berikut. Bandingkan cuplikan ini <strong className="text-neon">ketika bermain dengan audio</strong> dan <strong className="text-gold">ketika bermain tanpa audio</strong>!
                        </p>
                    </section>

                    <video
                        src={endgamePortal}
                        controls
                        controlsList="nodownload noplaybackrate noremoteplayback"
                        disablePictureInPicture
                        className="w-full aspect-video rounded-2xl border-2 border-navy mb-12"
                    />

                    <section className="mb-12">
                        <h2 className="font-semibold text-center text-4xl">
                            <span className="font-extrabold text-neon">4</span> Komponen dalam Audio yang Mempengaruhi Film:
                        </h2>
                    </section>

                    <section className="grid grid-cols-2 gap-6 mb-12">
                        {/* MUSIK */}
                        <div className="bg-navy rounded-2xl p-8">
                            <h3 className="font-JBM font-extrabold text-5xl text-neon mb-4">Musik</h3>
                            <p className="font-PJS text-2xl leading-relaxed text-plat">
                                Skor iringan orkestra yang mengikuti <em>beat-beat</em> aksi yang terjadi pada film secara visual.
                            </p>
                        </div>

                        {/* EFEK SUARA */}
                        <div className="bg-navy rounded-2xl p-8">
                            <h3 className="font-JBM font-extrabold text-5xl text-neon mb-4">Efek Suara</h3>
                            <ul className="font-PJS text-2xl leading-relaxed text-plat">
                                <li>• Suara percikan dari portal</li>
                                <li>• Dengungan mesin dari pesawat</li>
                                <li>• Suara palu <em>Mjölnir</em> terpanggil</li>
                            </ul>
                        </div>

                        {/* VOICE */}
                        <div className="bg-navy rounded-2xl p-8">
                            <h3 className="font-JBM font-extrabold text-5xl text-neon mb-4">Suara (Voice)</h3>
                            <ul className="font-PJS text-2xl leading-relaxed text-plat">
                                <em>
                                    <li>"On your left."</li>
                                    <li className="text-right">"Is that everyone?"</li>
                                    <li>"You wanted more???"</li>
                                    <li className="text-center">"Avengers!... Assemble."</li>
                                </em>
                            </ul>
                        </div>

                        {/* MIXING */}
                        <div className="bg-navy rounded-2xl p-8">
                            <h3 className="font-JBM font-extrabold text-5xl text-neon mb-4">Mixing</h3>
                            <p className="font-PJS text-2xl leading-relaxed text-plat">
                                Penggabungan musik, efek suara, serta dialog karakter yang dapat bermain bersama dalam satu audio yang padu dan harmonis.
                            </p>
                        </div>
                    </section>

                    <section className="font-PJS text-justify text-3xl mb-12">
                        <p className="mb-12 leading-relaxed">
                            Tanpa audio, aksi visual pada cuplikan film terkesan <strong className="text-gold">lebih semu dan tidak memiliki "berat" yang sama</strong> dibandingkan ketika ada audionya. Audio menguatkan impresi yang ditampilkan dari visual dengan menstimulasi pendengaran pengguna. Baik itu dengan skor musik yang mendampingi, efek suara objek atau lingkungan, hingga suara narasi atau dialog karakter.
                        </p>
                    </section>

                    <div className="h-32" />
                </section>
            </header>
        </article>
    )
}