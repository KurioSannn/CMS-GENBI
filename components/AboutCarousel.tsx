"use client";
import Image from 'next/image';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react'; 
import { ArrowRight, Users, Target, Zap, Aperture, ClipboardList } from 'lucide-react'; 

// --- KOMPONEN: ANIMASI COUNTER ---
const AnimatedCounter = ({ finalValue, suffix = "", colorClass = "text-yellow-500" }: { finalValue: number, suffix?: string, colorClass?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });
    
    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, {
        damping: 100,
        stiffness: 100,
        mass: 5,
    });
    
    const display = useTransform(spring, (latest) => {
        return Math.round(latest).toLocaleString() + suffix;
    });

    useEffect(() => {
        if (isInView) {
            motionValue.set(finalValue);
        } else {
            motionValue.set(0); 
        }
    }, [isInView, finalValue, motionValue]);

    return (
        <motion.h3 ref={ref} className={`text-4xl font-black ${colorClass} italic tracking-tighter`}>
            {display}
        </motion.h3>
    );
};

const AboutSection = () => {
    const features = [
      { icon: Users, title: "Agent of Change", desc: "Agen perubahan untuk masyarakat yang lebih baik." },
      { icon: Target, title: "Future Leader", desc: "Pemimpin masa depan yang berintegritas." },
      { icon: Zap, title: "Frontliner", desc: "Garda terdepan komunikasi Bank Indonesia." },
    ];
    const VIRTUAL_TOUR_URL = "http://upnjatim.ac.id/vtour/";
    const PROFIL_PAGE_URL = "/profil";

    return (
        <section id="tentang-kami" className="py-24 relative overflow-hidden bg-white">
            
            {/* === BACKGROUND === */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/about-bg.jpg" 
                    alt="About GenBI Background" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    className="brightness-110 saturate-100"
                />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
                <div className="absolute inset-0 bg-white/70"></div>
            </div>

            {/* DEKORASI BATIK PARANG */}
            <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="about-parang" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <g fill="none" stroke="#0B1F40" strokeWidth="1">
                            <path d="M0,30 C15,10 15,50 30,30 C45,10 45,50 60,30" strokeLinecap="round" />
                        </g>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#about-parang)" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-20">
                {/* Gunakan flex-col-reverse pada mobile agar Teks (Kolom Kanan) naik ke atas 
                   dan Foto (Kolom Kiri) turun ke bawah. Pada desktop kembali ke grid normal.
                */}
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* === KOLOM VISUAL (FOTO) === */}
                    <motion.div 
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full"
                    >
                        <a href={VIRTUAL_TOUR_URL} target="_blank" rel="noopener noreferrer" className="relative group block cursor-pointer">
                            <div className="relative h-[300px] md:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                              <Image src="/upn.jpeg" alt="UPN Jatim" fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-700"/>
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40]/60 to-transparent"></div>
                              <div className="absolute bottom-6 left-6 z-10">
                                 <div className="flex items-center gap-3 p-3 pl-5 pr-6 rounded-full backdrop-blur-md bg-white/20 text-white border border-white/30 group-hover:bg-yellow-500 group-hover:text-[#0B1F40] transition-all duration-300">
                                    <Aperture size={20} />
                                    <span className="font-black text-[10px] uppercase tracking-widest italic">360° Virtual Tour</span>
                                 </div>
                              </div>
                            </div>
                        </a>
                        {/* Foto Tim Kecil (Hanya muncul di desktop/MD agar tidak menumpuk di HP) */}
                        <div className="absolute -bottom-6 -right-6 w-2/3 h-56 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white hidden md:block">
                           <Image src="/tentangkami.jpg" alt="Team GenBI" fill style={{ objectFit: 'cover' }}/>
                        </div>
                    </motion.div>

                    {/* === KOLOM KONTEN (TEKS) === */}
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        {/* BADGE TENTANG KAMI */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B1F40]/5 text-[#0B1F40] text-[10px] font-black tracking-[0.3em] uppercase mb-8 italic border border-[#0B1F40]/10">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                          Tentang Kami
                        </div>

                        {/* JUDUL GRADASI */}
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
                          <span className="bg-gradient-to-r from-[#0B1F40] via-[#1a3a6e] to-[#0B1F40] bg-clip-text text-transparent block mb-2">
                            Energi Baru untuk
                          </span>
                          <span className="bg-gradient-to-r from-[#EAB308] via-[#FDE68A] to-[#B45309] bg-clip-text text-transparent px-2">
                            Indonesia Maju
                          </span>
                        </h2>

                        <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium italic border-l-4 border-yellow-500 pl-6">
                          GenBI UPN "Veteran" Jawa Timur adalah komunitas penerima beasiswa Bank Indonesia yang berdedikasi menjadi garda terdepan komunikasi kebijakan bank sentral.
                        </p>

                        {/* STATISTIK */}
                        <div className="grid grid-cols-2 gap-8 mb-10 border-t border-b border-slate-100 py-8 text-center lg:text-left">
                            <div className="flex flex-col items-center lg:items-start border-r border-slate-200">
                                <ClipboardList size={32} className="text-yellow-500 mb-3" />
                                <AnimatedCounter finalValue={35} suffix="+" colorClass="bg-gradient-to-r from-[#EAB308] to-[#B45309] bg-clip-text text-transparent" />
                                <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-widest italic">Program Kerja</p>
                            </div>
                            <div className="flex flex-col items-center lg:items-start">
                                <Users size={32} className="text-[#0B1F40] mb-3" />
                                <AnimatedCounter finalValue={74} suffix="+" colorClass="text-[#0B1F40]" />
                                <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-widest italic">Anggota Aktif</p>
                            </div>
                        </div>

                        {/* LIST 3 PILAR */}
                        <div className="space-y-6 mb-12">
                          {features.map((item, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4"
                            >
                              <div className="p-3 rounded-xl bg-slate-50 text-[#0B1F40] border border-slate-100">
                                <item.icon size={22} />
                              </div>
                              <div>
                                <h4 className="text-lg font-black text-[#0B1F40] uppercase italic leading-none mb-1">{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-tight">{item.desc}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 lg:mb-0">
                            <a href="#visi-misi" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0B1F40] text-white font-black rounded-2xl hover:bg-yellow-500 hover:text-[#0B1F40] transition-all shadow-xl">
                              <span className="text-xs uppercase tracking-widest italic">Visi & Misi</span>
                              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
                            </a>
                            <a href={PROFIL_PAGE_URL} className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0B1F40] font-black rounded-2xl border-2 border-[#0B1F40] hover:bg-[#0B1F40] hover:text-white transition-all">
                              <span className="text-xs uppercase tracking-widest italic">Lihat Profil</span>
                              <Users size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;