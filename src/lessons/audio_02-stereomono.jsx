import carDriveStereo from "../assets/audio/CarStereo.ogg";
import AudioButton from "../components/AudioButton.jsx";
import carVroom from "../assets/videos/cargovroom.mp4";
import stereoVsMono from "/assets/images/StereoVsMono.png";
import surroundSound from "/assets/images/surroundSound.jpg";

export default function StereoMono() {

    return (
        <article className="w-full max-w-5xl mx-auto p-12 font-pjs font-medium text-plat">
            <header className="mb-12">
                <section className="w-full max-w-5xl mx-auto">

                    {/*JUDUL MATERI*/}

                    <header className="mb-24">
                        <p className="font-JBM text-center text-xl text-neon">
                            MATERI 2
                        </p>
                        <h1 className="font-extrabold text-center text-8xl">
                            Stereo vs. Mono
                        </h1>
                    </header>

                    {/*ISI MATERI*/}

                    <div className="bg-gold/20 border-l-4 border-gold p-6 rounded-r-xl mb-12">
                        <p className="text-gold font-PJS font-semibold text-5xl mb-4">— Gunakan <em>Earphone/Headset</em>! 🎧</p>
                        <p className="text-plat font-PJS text-2xl leading-relaxed">
                            Perbedaan Stereo dan Mono lebih mudah didengarkan dengan <em>earphone/headset</em>.
                        </p>
                    </div>

                    <section>
                        <video
                            src={carVroom} autoPlay loop muted playsInline
                            className="w-full max-w-md rounded-xl border-2 border-navy mx-auto mb-2 pointer-events-none"
                        />
                        <figcaption className="font-PJS font-light text-center text-2xl text-plat/60 mb-6">
                            <em>@JaguarCars — GIPHY</em>
                        </figcaption>

                        <h2 className="font-extrabold text-center text-5xl mb-12">
                            Dengarkan Kedua Audio Berikut!
                        </h2>

                        <div className="grid grid-cols-2 max-w mb-6 pl-24 pr-24 font-extrabold text-5xl text-center">
                            <div>
                                <AudioButton src={carDriveStereo} compact mono label="A"
                                         className="justify-self-center mb-6" />
                                <h3 className="text-gold">A</h3>
                            </div>
                            <div>
                                <AudioButton src={carDriveStereo} compact label="B"
                                         className="justify-self-center mb-6" />
                                <h3 className="text-neon">B</h3>
                            </div>
                        </div>
                    </section>

                    <section className="font-PJS text-justify text-3xl mb-12">

                        <p className="leading-relaxed mb-12">
                            Pada kedua cuplikan audio tersebut, suara mobilnya sama-sama terdengar mendekat lalu menjauh. Namun <span className="font-extrabold text-neon">audio B</span> dapat mensimulasikan pergerakan mobil yang mendekat dari arah kiri lalu menjauh ke arah kanan. Ini terjadi karena <span className="font-extrabold text-gold">audio A</span> berbentuk <span className="font-extrabold text-gold">mono</span> yang dimainkan dengan <span className="font-extrabold text-gold">satu kanal</span>, sedangkan <span className="font-extrabold text-neon">audio B</span> berbentuk <span className="font-extrabold text-neon">stereo</span> yang dimainkan dengan <span className="font-extrabold text-neon">dua kanal</span>.
                        </p>

                        <figure className="bg-base rounded-xl p-6 border-2 border-navy mb-12">
                            <div className="bg-navy rounded-lg flex items-center justify-center mb-6">
                                <img
                                    src={stereoVsMono}
                                    alt="Perbedaan Stereo dan Mono"
                                    className="rounded-lg object-cover select-none pointer-events-none"
                                />
                            </div>
                            <figcaption className="font-JBM text-center text-2xl text-neon">
                                Perbedaan Stereo dan Mono (Soundskrit, 2023)
                            </figcaption>
                        </figure>

                        <p className="leading-relaxed mb-4">
                            Perbedaan ini dapat didengarkan secara jelas dengan bantuan <em>headset</em> atau <em>earphone</em> karena mereka memiliki dua <em>speaker</em> untuk masing-masing telinga kiri dan kanan. Mono dan stereo memiliki aplikasi penggunaan masing-masing.
                        </p>

                    </section>

                    <section className="grid grid-cols-2 gap-4 mb-24">
                        {/* MONO */}
                        <div className="bg-navy rounded-2xl p-8">
                            <h3 className="font-JBM font-extrabold text-5xl text-center text-neon mb-4 tracking-wider">Mono</h3>
                            <ul className="font-PJS text-2xl leading-relaxed text-plat tracking-tight">
                                <p>
                                    Cocok untuk sistem audio yang perlu kejelasan dan kualitas suara.
                                </p>
                                <li>• Sistem suara publik (speaker, TOA)</li>
                                <li>• <em>Podcast</em></li>
                                <li>• Telepon</li>
                                <li>• Alat bantu dengar</li>
                            </ul>
                        </div>

                        {/* STEREO */}
                        <div className="bg-navy rounded-2xl p-8">
                            <h3 className="font-JBM font-extrabold text-5xl text-center text-neon mb-4 tracking-wider">Stereo</h3>
                            <ul className="font-PJS text-2xl leading-relaxed text-plat tracking-tight">
                                <p>
                                    Cocok untuk sistem audio yang perlu suara imersif dan realistis.
                                </p>
                                <li>• Film</li>
                                <li>• Video gim</li>
                                <li>• Animasi</li>
                                <li>• Musik</li>
                            </ul>
                        </div>

                    </section>

                    <div className="bg-neon/50 border-l-4 border-gold p-6 rounded-r-xl mb-12">
                        <p className="font-JBM font-bold text-gold text-2xl mb-2 uppercase tracking-tighter">Fun Fact !</p>
                        <p className="text-neon font-PJS font-extrabold text-5xl mb-4"><em>All. Around. You. <span className="text-2xl">(-you...)</span></em></p>
                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <p className="font-PJS text-2xl leading-relaxed text-plat text-justify">
                                    Kalau kamu pernah menonton film di bioskop, sebelum film mulai biasanya ada bagian animasi singkat yang diakhiri dengan “All… Around… You…”. Suaranya yang terdengar datang dari berbagai ujung teater ini berkat dari teknologi <em>surround sound</em>. <em>Surround sound</em> tidak terbatas pada dua kanal suara seperti stereo. Mereka bisa menggunakan 6 hingga 8 kanal untuk mensimulasikan audio lanskap 3D dengan mengelilingi pendengarnya. Suara yang datang dari kanal stereo bisa dipecah lagi menjadi depan, belakang, hingga atas dan bawah.
                                </p>
                            </div>

                            <div>
                                <img
                                    src={surroundSound}
                                    alt="Perbedaan Stereo dan Mono"
                                    className="rounded-lg object-cover select-none pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>

                </section>

                <div className="h-32" />
            </header>
        </article>
    )
}