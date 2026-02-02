"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Users, Zap, Star, TrendingUp, Award, History, Landmark, ShieldCheck } from "lucide-react";
import Image from 'next/image';

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: duration, ease: "easeOut" });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [isInView, count, value, duration]);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return <span ref={ref}>{displayValue}</span>;
};

const CapaianDanTentang = () => {
  const stats = [
    { label: "ANGGOTA AKTIF", value: 100, suffix: "+", sub: "MAHASISWA TERPILIH", icon: <Users size={100} /> },
    { label: "PROKER TERLAKSANA", value: 50, suffix: "+", sub: "TAHUNAN", icon: <TrendingUp size={100} /> },
    { label: "IPK RATA-RATA", value: 3.75, suffix: "", sub: "PRESTASI AKADEMIK", icon: <Award size={100} />, isFloat: true },
  ];

  return (
    <div className="overflow-hidden bg-[#F8FAFC]">
      {/* --- SECTION 1: CAPAIAN DENGAN TEKS GRADASI --- */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="mb-16 border-l-8 border-yellow-500 pl-6"
          >
            {/* GRADASI WARNA PADA TEXT FONT CAPAIAN */}
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none italic">
              <span className="text-[#0B1F40]">Capaian</span> <br />
              <span className="bg-gradient-to-r from-[#EAB308] via-[#FDE68A] to-[#B45309] bg-clip-text text-transparent drop-shadow-sm px-1">
                Generasi Baru
              </span> <br />
              <span className="text-[#EAB308] text-2xl md:text-4xl mt-2 block">
                UPN "Veteran" Jawa Timur
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 text-slate-100 group-hover:text-yellow-500/10 transition-colors duration-500">
                  {stat.icon}
                </div>
                <div className="relative z-10 text-left">
                  <h3 className="text-7xl font-black text-[#0B1F40] mb-4 group-hover:text-yellow-600 transition-colors italic">
                    {stat.isFloat ? "3.75" : <Counter value={stat.value} />}
                    {stat.suffix}
                  </h3>
                  <span className="block text-lg font-extrabold text-slate-800 tracking-tight uppercase italic">{stat.label}</span>
                  <span className="text-sm font-medium text-slate-400 tracking-widest uppercase">{stat.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: SEJARAH & 3 FUNGSI UTAMA --- */}
      <section className="py-28 bg-[#0B1F40] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Kiri: Sejarah & Polaroid Photos */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-yellow-400 uppercase tracking-[0.4em] font-bold text-sm">
                <History size={20} />
                <span>Our Journey</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight text-left italic">
                Sejarah <br /><span className="bg-gradient-to-r from-[#EAB308] via-[#FDE68A] to-[#B45309] bg-clip-text text-transparent">GenBI.</span>
              </h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed text-left">
                <p>
                  Generasi Baru Indonesia (GenBI) resmi didirikan pada tanggal <span className="text-white font-bold">11 November 2011</span>. 
                  Komunitas ini lahir atas inisiasi Bank Indonesia sebagai wadah bagi para mahasiswa terpilih penerima beasiswa Bank Indonesia yang tersebar di seluruh pelosok negeri.
                </p>
                <p className="bg-white/5 p-8 rounded-[2rem] border-l-4 border-yellow-500 italic shadow-2xl">
                  "GenBI tidak hanya sekadar kelompok penerima bantuan finansial, melainkan sebuah laboratorium kepemimpinan yang dibentuk untuk mengasah jiwa sosial dan kompetensi mahasiswa guna mempersiapkan pemimpin bangsa di masa depan."
                </p>
                <p>
                  Di lingkungan UPN "Veteran" Jawa Timur, GenBI terus bertransformasi menjadi energi progresif yang aktif dalam mendukung program kerja Bank Indonesia dan pengabdian masyarakat.
                </p>
              </div>

{/* Area 3 Polaroid Photos */}
<div className="relative flex justify-center lg:justify-start mt-12 space-x-6">
  {/* Foto 1: GenBI Tour */}
  <motion.div
    initial={{ rotate: -5, y: 50, opacity: 0 }}
    whileInView={{ rotate: -5, y: 0, opacity: 1 }}
    viewport={{ once: false }}
    transition={{ delay: 0.2, duration: 0.6 }}
    className="bg-white p-3 shadow-2xl rounded-sm transform rotate-[-5deg] hover:rotate-0 hover:scale-110 transition-all duration-300 z-20 w-[160px] md:w-[200px]"
  >
    <div className="relative aspect-square overflow-hidden bg-slate-200">
      <Image 
        src="/GenBI Tour.jpeg" 
        alt="GenBI Tour" 
        fill 
        className="object-cover" 
      />
    </div>
    <p className="text-center text-[10px] md:text-xs font-bold text-gray-700 mt-3 font-mono uppercase tracking-tighter">GenBI Tour</p>
  </motion.div>

  {/* Foto 2: Kegiatan */}
  <motion.div
    initial={{ rotate: 8, y: 50, opacity: 0 }}
    whileInView={{ rotate: 8, y: 0, opacity: 1 }}
    viewport={{ once: false }}
    transition={{ delay: 0.4, duration: 0.6 }}
    className="bg-white p-3 shadow-2xl rounded-sm transform rotate-[8deg] hover:rotate-0 hover:scale-110 transition-all duration-300 z-10 -ml-12 w-[160px] md:w-[200px]"
  >
    <div className="relative aspect-square overflow-hidden bg-slate-200">
      <Image 
        src="/kegiatan.jpeg" 
        alt="Kegiatan" 
        fill 
        className="object-cover" 
      />
    </div>
    <p className="text-center text-[10px] md:text-xs font-bold text-gray-700 mt-3 font-mono uppercase tracking-tighter">Kegiatan Komunitas</p>
  </motion.div>

  {/* Foto 3: Pengabdian */}
  <motion.div
    initial={{ rotate: -12, y: 50, opacity: 0 }}
    whileInView={{ rotate: -12, y: 0, opacity: 1 }}
    viewport={{ once: false }}
    transition={{ delay: 0.6, duration: 0.6 }}
    className="hidden md:block bg-white p-3 shadow-2xl rounded-sm transform rotate-[-12deg] hover:rotate-0 hover:scale-110 transition-all duration-300 z-0 -ml-12 w-[200px]"
  >
    <div className="relative aspect-square overflow-hidden bg-slate-200">
      <Image 
        src="/pengabdian.JPG" 
        alt="Pengabdian" 
        fill 
        className="object-cover" 
      />
    </div>
    <p className="text-center text-xs font-bold text-gray-700 mt-3 font-mono uppercase tracking-tighter">Pengabdian Masyarakat</p>
  </motion.div>
</div>
            </motion.div>

            {/* Kanan: 3 Fungsi Utama GenBI */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="flex items-center gap-4 text-yellow-400 uppercase tracking-[0.4em] font-bold text-sm">
                <ShieldCheck size={20} />
                <span>3 Fungsi Utama GenBI</span>
              </div>
              <div className="grid gap-6">
                {[
                  { title: "Front Liners", icon: <Landmark />, desc: "Menjadi garda terdepan dalam mengomunikasikan kebijakan Bank Indonesia kepada masyarakat luas." },
                  { title: "Change Agents", icon: <Zap />, desc: "Menjadi agen perubahan yang memberikan dampak positif dan inspirasi melalui berbagai aksi nyata serta inovasi kreatif." },
                  { title: "Future Leaders", icon: <Star />, desc: "Mempersiapkan diri sebagai calon pemimpin masa depan bangsa yang memiliki integritas tinggi dan kompetensi profesional." }
                ].map((fungsi, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex gap-6 items-start group hover:bg-white/10 transition-all shadow-2xl"
                  >
                    <div className="p-4 rounded-2xl bg-yellow-500 text-[#0B1F40] shadow-lg group-hover:rotate-12 transition-transform shrink-0">
                      {fungsi.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-yellow-400 transition-colors italic">{fungsi.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-sm">{fungsi.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CapaianDanTentang;