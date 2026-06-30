import audioFormat from "/assets/images/audioFormat.jpg";
import midiSpring from "../assets/videos/MIDI_Spring-Vivaldi.mp4";

export default function FileFormats() {
    return (
        <article className="w-full max-w-5xl mx-auto p-12 font-medium text-plat">
            <header className="mb-12">
                <section className="w-full max-w-5xl mx-auto">

                    {/*JUDUL MATERI*/}

                    <header className="mb-24">
                        <p className="font-JBM text-center text-xl text-neon">
                            MATERI 4
                        </p>
                        <h1 className="font-extrabold text-center text-8xl">
                            Format File Audio
                        </h1>
                    </header>

                    {/*ISI MATERI*/}

                    <section>
                        <img
                            src={audioFormat}
                            alt="Jenis-Jenis File Audio"
                            className="rounded-lg object-contain select-none pointer-events-none border-2 border-navy"
                        />
                        <figcaption className="font-PJS font-light text-center text-2xl text-plat/60 mb-6">
                            <em>@ExplainingComputers — Youtube</em>
                        </figcaption>
                    </section>

                    <section className="font-PJS text-justify text-3xl mb-12">
                        <p className="mb-12 leading-relaxed">
                            Ada banyak jenis format penyimpanan file audio. Walaupun demikian, format-format penyimpanan ini dapat dibagi menjadi <strong className="text-neon">tiga karakteristik</strong> utama:
                        </p>
                    </section>

                    <section className="mb-12">
                        <div className="overflow-hidden rounded-2xl border border-navy">
                            <table className="w-full text-left">
                                <thead className="bg-navy text-neon">
                                <tr className="font-PJS font-semibold text-3xl text-center">
                                    <th className="px-6 py-4">Karakteristik</th>
                                    <th className="px-6 py-4">Penjelasan</th>
                                    <th className="px-6 py-4">Contoh Format</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-navy">
                                <tr className="font-JBM text-3xl">
                                    <td className="px-6 py-4">Uncompressed Lossless</td>
                                    <td className="px-6 py-4 text-xl">
                                        Format dengan audio murni (raw). Seluruh data sampel disimpan seutuhnya. Ukuran file besar karena tidak ada kompresi yang dilakukan.
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <ul>
                                            <li>.wav</li>
                                            <li>.aiff</li>
                                            <li>.dsd</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr className="font-JBM text-3xl">
                                    <td className="px-6 py-4">Compressed Lossless</td>
                                    <td className="px-6 py-4 text-xl">
                                        Format dengan audio yang telah melalui kompresi. Namun proses kompresi yang dilakukan masih menjaga kualitas sampel agar tetap utuh.
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <ul>
                                            <li>.flac</li>
                                            <li>.alac</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr className="font-JBM text-3xl">
                                    <td className="px-6 py-4">Compressed Lossy</td>
                                    <td className="px-6 py-4 text-xl">
                                        Format dengan audio yang telah dikompresi. Kompresi membuat ukuran file kecil, namun data sampelnya tidak tersimpan seluruhnya.
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <ul>
                                            <li>.mp3</li>
                                            <li>.ogg</li>
                                            <li>.aac</li>
                                            <li>.m4a</li>
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="font-PJS text-justify text-3xl mb-36">
                        <p className="mb-12 leading-relaxed">
                            Dalam lingkup pengembangan audio untuk multimedia, format-format yang sering dijumpai ada antara <em className="font-bold text-neon">uncompressed lossless</em> atau <em className="font-bold text-gold">compressed lossy</em>. Format <em>uncompressed lossless</em> dapat digunakan oleh <em>audio designer/engineer</em> yang memerlukan <span className="underline decoration-neon">audio dengan data yang utuh untuk diproses</span>. Format <em>compressed lossy</em>, karena formatnya yang telah di optimalisasi ukurannya melalui kompresi, merupakan <span className="underline decoration-gold">format file hasil akhir suatu proyek multimedia sebelum dipublikasi atau diunggah</span>.
                        </p>
                    </section>

                    <h2 className="font-extrabold italic text-center text-5xl mb-12">
                        Eits—Ada Satu Format Lagi!
                    </h2>

                    <video
                        src={midiSpring}
                        controls
                        controlsList="nodownload noplaybackrate noremoteplayback"
                        disablePictureInPicture
                        className="w-full aspect-video rounded-2xl border-2 border-navy mb-2"
                    />
                    <ul className="font-JBM text-center text-2xl mb-8">
                        <li className="mb-2 text-neon"><em>Spring — Antonio Vivaldi</em></li>
                        <li className="text-xl text-plat">(Aransemen MIDI oleh @PianoMan333 — YouTube)</li>
                    </ul>

                    <section className="font-PJS text-justify text-3xl">
                        <p className="mb-12 leading-relaxed">
                            <em className="text-neon">Musical Instrument Digital Interface</em> (.mid atau .midi) merupakan format yang menyimpan instruksi untuk memainkan suatu instrumen digital. Hal-hal seperti not apa yang perlu dibunyikan, berapa lama not itu ditahan, dan volume dari not yang dimainkan. Dengan kata lain, MIDI dapat diartikan sebagai <span className="text-neon">partitur atau teks musik untuk dimainkan oleh instrumen digital</span>. Format file MIDI cenderung memiliki ukuran yang kecil, karena format <span className="text-neon">MIDI tidak menyimpan sampel data audio</span>. MIDI hanya menyimpan instruksi untuk dimainkan oleh instrumen digital lain, seperti contoh video di atas.
                        </p>
                    </section>

                </section>
                <div className="h-32" />
            </header>
        </article>
    )
}