"use client";

import React from 'react';
import { motion, Transition } from 'framer-motion'; // IMPORT Transition type
import Link from 'next/link';
import Image from 'next/image';
import { genbiDivisions } from '@/data/members';
import { Sparkles, ChevronRight, MoveRight } from 'lucide-react';

// --- SWIPER IMPORTS ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const Struktur = () => {
  // FIXED: Menggunakan tipe Transition dengan type assertion
  const smoothSpring: Transition = {
    type: "spring",
    stiffness: 40,
    damping: 12,
    mass: 0.8
  } as const;

  const perspectiveStyle = { perspective: "2000px" };
  const backfaceStyle = { 
    backfaceVisibility: "hidden" as const,
    WebkitBackfaceVisibility: "hidden" as const,
  };

  return (
    <section id="struktur-organisasi" className="relative py-28 md:py-36 bg-[#030712] overflow-hidden">
      
      {/* 1. FLUID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[150px]" 
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-[1500px]">
        
        {/* 2. HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10 px-6">
          <div className="max-w-3xl text-left">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={smoothSpring}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-16 bg-gradient-to-r from-yellow-500 to-transparent" />
              <span className="text-yellow-500/80 font-bold text-[10px] uppercase tracking-[0.5em] italic">Departemen GenBI 2025/2026</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...smoothSpring, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] italic"
            >
              Structure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-amber-600">Of Excellence.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...smoothSpring, delay: 0.2 }}
            className="flex flex-col items-start lg:items-end gap-6"
          >
            <p className="text-slate-400 text-lg lg:text-right max-w-sm font-light leading-relaxed italic">Harmonisasi gerak dalam tujuh wadah departemen strategis.</p>
            <div className="flex items-center gap-4 text-white/20">
              <span className="text-[10px] font-black tracking-widest uppercase italic">Scroll to explore</span>
              <MoveRight size={20} className="animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* 3. FLUID SWIPER CAROUSEL */}
        <div className="relative overflow-visible px-4">
          <Swiper
            modules={[FreeMode, Mousewheel, Pagination, A11y]}
            freeMode={{ enabled: true, momentum: true }}
            grabCursor={true}
            mousewheel={{ forceToAxis: true }}
            spaceBetween={30}
            slidesPerView={1.15}
            breakpoints={{ 
              640: { slidesPerView: 2.3 }, 
              1024: { slidesPerView: 3.3 }, 
              1280: { slidesPerView: 4.3 } 
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="!pb-32 !pt-10 overflow-visible"
          >
            {genbiDivisions.map((division, idx) => (
              <SwiperSlide key={division.slug} className="!h-auto !overflow-visible" style={{ ...perspectiveStyle, transformStyle: 'preserve-3d' }}>
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...smoothSpring, delay: idx * 0.05 }}
                  className="relative h-[500px] w-full group select-none"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{ rotateY: 180 }}
                >
                  
                  {/* FRONT SIDE (LOGO BI) */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-[#0F172A] border border-white/10 rounded-[3rem] p-10 flex flex-col shadow-2xl transition-all duration-700 group-hover:border-yellow-500/30" 
                    style={{ 
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transformStyle: "preserve-3d" 
                    }}
                  >
                    <div className="flex justify-between items-start mb-16">
                      <div className="w-14 h-14 bg-gradient-to-tr from-yellow-500 to-amber-700 rounded-2xl flex items-center justify-center p-2">
                        <Image 
                          src="/BI.png" 
                          alt="Logo BI" 
                          width={40} 
                          height={40} 
                          className="object-contain" 
                          priority
                        />
                      </div>
                      <Sparkles size={20} className="text-yellow-500/20" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight italic text-left">{division.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-4 mb-8 italic text-left">{division.description}</p>
                    <div className="mt-auto flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">{division.members.length} Talenta</span>
                    </div>
                  </div>

                  {/* BACK SIDE (LOGO DIVISI OVAL PUTIH SEMPURNA) */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1F40] to-[#030712] border border-yellow-500/40 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center shadow-2xl" 
                    style={{ 
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transformStyle: "preserve-3d" 
                    }}
                  >
                    
                    {/* Lingkaran Oval Putih Lebih Besar */}
                    <div className="w-32 h-32 bg-white rounded-[3rem] flex items-center justify-center p-6 mb-10 shadow-[0_20px_50px_rgba(255,255,255,0.1)] overflow-hidden relative border-4 border-white/20">
                      <Image 
                        src={division.logo} 
                        alt={`${division.name} logo`} 
                        fill 
                        className="p-6 object-contain" 
                        sizes="128px"
                        priority
                      />
                    </div>
                    
                    <div className="space-y-2 mb-10">
                      <h4 className="text-xl font-black text-white tracking-[0.1em] uppercase italic">GenBI UPNVJT</h4>
                      <p className="text-yellow-500/60 text-[10px] font-bold uppercase tracking-[0.3em] italic text-center">Pimpin, Inspirasi, Berikan Dampak!</p>
                    </div>
                    
                    <Link 
                      href={`/divisi/${division.slug}`} 
                      prefetch={true} 
                      className="group/btn relative px-8 py-4 w-full overflow-hidden rounded-2xl bg-[#EAB308] transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10 text-[#0B1F40] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 italic">
                        Eksplorasi <ChevronRight size={14} />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet { 
          background-color: rgba(255, 255, 255, 0.05) !important; 
          width: 6px; 
          height: 6px; 
          transition: all 0.6s; 
        }
        .swiper-pagination-bullet-active { 
          background-color: #EAB308 !important; 
          width: 40px; 
          border-radius: 20px; 
          box-shadow: 0 0 20px rgba(234, 179, 8, 0.3); 
        }
      `}</style>
    </section>
  );
};

export default Struktur;