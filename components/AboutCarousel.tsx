"use client";
import Image from 'next/image';
import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react'; 
import { ArrowRight, Users, Target, Zap, Aperture, ClipboardList, Megaphone, X, Sparkles } from 'lucide-react'; 

// --- KOMPONEN: ANIMASI COUNTER ---
const AnimatedCounter = ({ finalValue, suffix = "", colorClass = "text-yellow-500" }: { finalValue: number, suffix?: string, colorClass?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });
    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, { damping: 100, stiffness: 100, mass: 5 });
    const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString() + suffix);

    useEffect(() => {
        if (isInView) motionValue.set(finalValue);
        else motionValue.set(0); 
    }, [isInView, finalValue, motionValue]);

    return (
        <motion.h3 ref={ref} className={`text-3xl md:text-4xl font-black ${colorClass} italic tracking-tighter`}>
            {display}
        </motion.h3>
    );
};

const AboutSection = () => {
    const [showPopup, setShowPopup] = useState(true);
    
    const features = [
      { icon: Users, title: "Agent of Change", desc: "Agen perubahan untuk masyarakat." },
      { icon: Target, title: "Future Leader", desc: "Pemimpin masa depan berintegritas." },
      { icon: Zap, title: "Frontliner", desc: "Garda terdepan komunikasi BI." },
    ];

    const VIRTUAL_TOUR_URL = "http://upnjatim.ac.id/vtour/";
    const PROFIL_PAGE_URL = "/profil";

    const scrollToCTA = () => {
        const ctaSection = document.getElementById('join-cta-section');
        if (ctaSection) ctaSection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="tentang-kami" className="py-20 md:py-32 relative overflow-hidden bg-white">
            
            {/* === PROFESSIONAL FLOATING NOTIFICATION === */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div 
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] w-[calc(100%-3rem)] sm:w-80 md:w-96"
                    >
                        <div className="relative group shadow-[0_20px_60px_-15px_rgba(11,31,64,0.3)] rounded-[2rem]">
                            {/* Close Button */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
                                className="absolute -top-2 -right-2 bg-[#0B1F40] text-white p-1.5 rounded-full z-20 border border-white/20 hover:bg-red-500 transition-colors duration-300"
                            >
                                <X size={14} />
                            </button>

                            {/* Main Card */}
                            <div 
                                onClick={scrollToCTA}
                                className="cursor-pointer overflow-hidden bg-[#0B1F40] border border-white/10 rounded-[2rem] p-1 backdrop-blur-xl active:scale-95 transition-all duration-300"
                            >
                                <div className="p-4 md:p-6 flex items-center gap-4 relative">
                                    {/* Animated Icon Box */}
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-yellow-500 blur-md opacity-20 animate-pulse"></div>
                                        <div className="relative bg-gradient-to-br from-yellow-400 to-amber-600 p-3 md:p-4 rounded-2xl text-[#0B1F40] shadow-lg">
                                            <Megaphone size={24} className="animate-[bounce_2s_infinite]" />
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Sparkles size={12} className="text-yellow-500" />
                                            <span className="text-yellow-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em]">GenBI 2026 Open</span>
                                        </div>
                                        <h4 className="text-white text-sm md:text-lg font-black uppercase italic leading-tight tracking-tight">
                                            Beasiswa Bank Indonesia <br /> 
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">Resmi Dibuka!</span>
                                        </h4>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="bg-white/5 px-6 py-3 flex items-center justify-between group-hover:bg-white/10 transition-colors">
                                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest italic group-hover:text-yellow-500 transition-colors">Daftar Sekarang Melalui Website</p>
                                    <ArrowRight size={16} className="text-yellow-500 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* === BACKGROUND LAYERS === */}
            <div className="absolute inset-0 z-0">
                <Image src="/about-bg.jpg" alt="Background" fill className="object-cover brightness-110 opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* === VISUAL COLUMN === */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="relative w-full"
                    >
                        <a href={VIRTUAL_TOUR_URL} target="_blank" rel="noopener noreferrer" className="relative group block rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
                            <div className="relative h-[280px] sm:h-[350px] md:h-[500px]">
                                <Image src="/upn.jpeg" alt="UPN" fill className="object-cover group-hover:scale-105 transition-transform duration-1000"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40]/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <div className="flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-white/10 text-white border border-white/20 group-hover:bg-yellow-500 group-hover:text-[#0B1F40] transition-all">
                                        <Aperture size={18} className="animate-spin-slow" />
                                        <span className="font-black text-[9px] uppercase tracking-widest">360° Virtual Tour</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div className="absolute -bottom-10 -right-10 w-3/5 h-64 rounded-[2.5rem] overflow-hidden border-[10px] border-white shadow-2xl hidden xl:block">
                            <Image src="/tentangkami.jpg" alt="Team" fill className="object-cover" />
                        </div>
                    </motion.div>

                    {/* === CONTENT COLUMN === */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#0B1F40] text-white text-[9px] font-black tracking-[0.3em] uppercase mb-8 italic">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                            GenBI UPNVJT Hub
                        </div>

                        <h2 className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tighter uppercase italic leading-[0.85] mb-8">
                            <span className="text-[#0B1F40] block mb-2">Energi Baru</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">Indonesia Maju</span>
                        </h2>

                        <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium italic border-l-4 border-yellow-500 pl-6 max-w-xl">
                            Komunitas mahasiwa penerima Beasiswa Bank Indonesia yang berdedikasi membangun negeri melalui inovasi dan aksi nyata.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-12 py-8 border-y border-slate-100">
                            <div className="flex flex-col items-center sm:items-start border-r border-slate-100 px-4">
                                <AnimatedCounter finalValue={35} suffix="+" colorClass="text-yellow-500" />
                                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic mt-2 text-center sm:text-left">Program Kerja</span>
                            </div>
                            <div className="flex flex-col items-center sm:items-start px-4">
                                <AnimatedCounter finalValue={74} suffix="+" colorClass="text-[#0B1F40]" />
                                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic mt-2 text-center sm:text-left">Anggota Aktif</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#visi-misi" className="group flex items-center justify-center gap-4 px-10 py-5 bg-[#0B1F40] text-white font-black rounded-2xl hover:bg-yellow-500 hover:text-[#0B1F40] transition-all shadow-xl active:scale-95">
                                <span className="text-xs uppercase tracking-widest">Visi & Misi</span>
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </a>
                            <a href={PROFIL_PAGE_URL} className="flex items-center justify-center gap-4 px-10 py-5 bg-white text-[#0B1F40] font-black rounded-2xl border-2 border-[#0B1F40] hover:bg-slate-50 transition-all active:scale-95">
                                <span className="text-xs uppercase tracking-widest">Profil Kami</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;