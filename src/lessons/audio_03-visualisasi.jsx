import leFishe from "/assets/images/waveform x spectogram.png"
import waveTreeshroudForest from "../assets/videos/Waveform_ThreeshroudForest.mp4";
import spectogramCreator from "../assets/videos/Spectogram_Creator.mp4"

export default function Visualisasi() {
    return (
        <article className="w-full max-w-5xl mx-auto p-12 font-pjs font-medium text-plat">
            <header className="mb-12">
                <section className="w-full max-w-5xl mx-auto">

                    {/*JUDUL MATERI*/}

                    <header className="mb-24">
                        <p className="font-JBM text-center text-xl text-neon">
                            MATERI 3
                        </p>
                        <h1 className="font-extrabold text-center text-8xl">
                            Visualisasi Audio
                        </h1>
                    </header>

                    {/*ISI MATERI*/}

                    <section className="font-PJS text-justify text-3xl mb-12">

                        <figure className="bg-base rounded-xl p-6 border-2 border-navy mb-12">
                            <div className="bg-navy rounded-lg flex items-center justify-center mb-6">
                                <img
                                    src={leFishe}
                                    alt="Diagram Sampling Gelombang"
                                    className="rounded-lg object-cover select-none pointer-events-none"
                                />
                            </div>
                            <figcaption className="font-JBM text-center text-2xl text-neon">
                                Visualisasi Gelombang (Atas) & Spektogram (Bawah) (Kovitvongsa & Lobel, 2009)
                            </figcaption>
                        </figure>

                        <p className="leading-relaxed mb-12">
                            Terdapat dua metode visualisasi audio yang umum digunakan: <strong className="text-neon">gelombang</strong> dan <strong className="text-gold">spektogram</strong>. Gelombang memvisualisasikan amplitudo audio. Amplitudo adalah besar jarak dari puncak dan lembah getaran atau gelombang dengan titik keseimbangannya. Dengan kata lain, gelombang menunjukkan tingkat volume dari audio yang divisualisasikan. <strong className="text-neon">Semakin besar gelombangnya, semakin tinggi amplitudo atau volume dari audionya</strong>. Berikut adalah contoh audio yang divisualisasikan dengan gelombang.
                        </p>

                        <video
                            src={waveTreeshroudForest}
                            controls
                            controlsList="nodownload noplaybackrate noremoteplayback"
                            disablePictureInPicture
                            className="w-full aspect-video rounded-2xl border-2 border-navy mb-2"
                        />
                        <p className="font-JBM text-center text-2xl text-neon mb-8">
                            Musik: <em>Treeshroud Forest — Arata Iiyoshi</em>
                        </p>

                        <div className="bg-navy border-l-4 border-neon p-6 rounded-r-xl mb-12">
                            <p className="text-neon font-PJS font-semibold mb-4"><em>Reminder!</em> 💡</p>
                            <p className="text-plat font-PJS text-2xl italic">
                                Dua gelombang menandakan bahwa audio tersebut bersifat <strong className="underline">Stereo</strong>! Gelombang yang diatas adalah audio kanal kiri, sedangkan gelombang dibawahnya adalah audio kanal kanan. Apakah kamu bisa mendengarnya?
                            </p>
                        </div>

                        <p className="leading-relaxed mb-12">
                            <strong className="text-gold">Spektogram</strong> memvisualisasikan frekuensi audio. Frekuensi dapat diartikan sebagai tingkat tinggi dari "nada" suatu suara. Spektogram memetakan jarak frekuensi yang dapat didengar oleh manusia (<span className="font-JBM">20—20.000 Hertz</span>). <strong className="text-gold">Semakin terang warnanya, semakin besar volume audio pada frekuensi tersebut</strong>. Berikut adalah contoh audio yang divisualisasikan dengan spektogram.
                        </p>

                        <video
                            src={spectogramCreator}
                            controls
                            controlsList="nodownload noplaybackrate noremoteplayback"
                            disablePictureInPicture
                            className="w-full aspect-video rounded-2xl border-2 border-navy mb-2"
                        />
                        <p className="font-JBM text-center text-2xl text-neon mb-8">
                            Musik: <em>Creator — Lena Raine</em>
                        </p>

                    </section>
                </section>
                <div className="h-32" />
            </header>
        </article>
    )
}