"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VisiMisi from '@/components/VisiMisi';
import { genbiPhotos } from '@/data/members';
import { Sparkles, Zap } from 'lucide-react';

const ProfilPage = () => {
  return (
    <div className="bg-[#050B18] min-h-screen text-white">
      <Navbar isScrolled={true} />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-[1400px]">
          
          {/* 1. Header & Foto Utama */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
              <Sparkles size={18} className="text-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] italic text-yellow-500">Keluarga Besar GenBI UPNVJT 2025/2026</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-8 leading-[0.85]">
              Energi Untuk <br />
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Negeri.</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto italic leading-relaxed mb-12">
              "Generasi Baru Indonesia (GenBI) UPN Veteran Jawa Timur bukan sekadar komunitas penerima beasiswa, 
              melainkan wadah bagi para pemimpin masa depan untuk berinovasi, mengabdi, dan menjadi agen perubahan bagi bangsa."
            </p>
            
            <div className="relative w-full h-[400px] md:h-[700px] rounded-[3.5rem] overflow-hidden border-8 border-white/5 shadow-2xl">
              <Image 
                src={genbiPhotos.profileMain} 
                alt="GenBI UPNVJT Profile" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-transparent opacity-70" />
            </div>
          </motion.div>

          {/* 2. Jargon Section (Kecil, Elegant, Gradasi Putih-Kuning-Orange) */}
          <section className="py-12 mb-20 border-y border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {["LEAD", "INSPIRE", "IMPACT"].map((word, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col items-center group"
                >
                  {/* Gradasi Putih -> Kuning -> Orange */}
                  <div className="text-4xl md:text-5xl font-black italic tracking-[0.15em] bg-gradient-to-r from-white via-yellow-400 to-orange-500 bg-clip-text text-transparent transition-all duration-500 group-hover:tracking-[0.25em]">
                    {word}
                  </div>
                  <div className="h-[1px] w-6 bg-yellow-500/30 my-3 rounded-full group-hover:w-12 group-hover:bg-yellow-500 transition-all duration-500" />
                  <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-slate-500 italic">
                    {i === 0 ? "Integritas" : i === 1 ? "Inovasi" : "Dampak Nyata"}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3. Galeri Struktur Keluarga */}
          <section className="mt-32 mb-32">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 bg-gradient-to-r from-yellow-200 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Struktur Keluarga
              </h2>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 px-4 py-1 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <Zap size={14} className="text-yellow-500 animate-pulse" />
                  <p className="text-yellow-500 font-black uppercase tracking-widest text-[10px]">Solidarity & Impact</p>
                </div>
                <p className="text-slate-300 text-lg md:text-xl italic font-medium max-w-2xl leading-relaxed px-4 text-center">
                  "Bersama membangun sinergi tak terbatas untuk satu tujuan, <span className="text-white font-bold">Dedikasi untuk Negeri!</span>"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {genbiPhotos.teams.map((team, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-xl transition-all duration-500 group-hover:border-yellow-500/50">
                    <Image 
                      src={team.src} 
                      alt={`${team.name} Team`} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-8 left-8 right-8 text-left">
                      <h3 className="text-2xl font-black italic uppercase tracking-wider text-white mb-2">
                        {team.name} <span className="text-yellow-500 text-sm">ALL TEAM</span>
                      </h3>
                      <div className="h-1 w-12 bg-yellow-500 rounded-full mb-2" />
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic leading-tight">
                        Pilar kekuatan utama dalam harmoni GenBI UPNVJT.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. Section Visi & Misi */}
          <div className="border-t border-white/5 pt-20">
            <VisiMisi />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilPage;