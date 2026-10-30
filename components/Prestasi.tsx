"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Achievement } from '@/lib/db';

interface PrestasiProps {
  achievements?: Achievement[];
}

const defaultPrestasiItems = [
  {
    id: 1,
    rank: "1st Winner",
    title: "Duta Millenial Penggerak CBPR",
    category: "Kompetisi Nasional Bank Indonesia",
    organizer: "KPw Bank Indonesia Provinsi Jawa Timur",
    image: "/prestasi-1.jpg",
    year: "2024",
    isSpotlight: true,
  },
  {
    id: 2,
    rank: "Juara 2",
    title: "QRIS Jelajah Budaya Indonesia",
    category: "Tingkat Korwil Jawa",
    organizer: "KORWIL Bank Indonesia Jawa & Jateng",
    image: "/prestasi-2.jpg",
    year: "2025",
    isSpotlight: false,
  },
  {
    id: 3,
    rank: "Runner Up",
    title: "Duta CBPR Nasional",
    category: "Tingkat Nasional",
    organizer: "Duta Muda Bank Indonesia • Istora Senayan",
    image: "/prestasi-4.jpg",
    year: "2025",
    isSpotlight: false,
  },
  {
    id: 4,
    rank: "Juara 2 Nasional",
    title: "Konten Edukasi CBP Rupiah",
    category: "Festival ARFEST",
    organizer: "ARFEST & Bank Indonesia Nasional",
    image: "/prestasi-3.jpg",
    year: "2025",
    isSpotlight: false,
  },
  {
    id: 5,
    rank: "Delegasi Terbaik",
    title: "Penganugerahan Insan Berprestasi",
    category: "Annual Awards",
    organizer: "KPw Bank Indonesia Jawa Timur",
    image: "/carousel-1.jpg",
    year: "2024",
    isSpotlight: false,
  },
];

const Prestasi: React.FC<PrestasiProps> = ({ achievements }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = achievements && achievements.length >= 3
    ? achievements.map((a, i) => ({
        id: a.id,
        rank: a.badge || (i === 0 ? "1st Winner" : i === 1 ? "Juara 2" : "Runner Up"),
        title: a.title,
        category: a.competition,
        organizer: a.recipient,
        image: a.imageUrl || (i === 0 ? "/prestasi-1.jpg" : i === 1 ? "/prestasi-2.jpg" : "/prestasi-4.jpg"),
        year: a.year || "2024",
        isSpotlight: i === 0,
      }))
    : defaultPrestasiItems;

  // Auto-slide effect for Model 3 (rotates every 3.5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const getSlideItem = (offset: number) => {
    const total = items.length;
    const index = (sliderIndex + offset + total) % total;
    return items[index];
  };

  return (
    <section id="prestasi" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#030A18] via-[#05142B] via-[#071B3B] to-[#030A18] text-white overflow-hidden border-b border-white/5">
      
      {/* Background Graphic Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Image
          src="/prestasi-bg.jpg"
          alt="GenBI Prestasi Background"
          fill
          className="object-cover object-center mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030A18] via-[#05142B]/85 to-[#030A18]" />
      </div>

      {/* Atmospheric Ambient Lighting */}
      <div className="absolute top-1/6 left-1/4 -translate-x-1/2 w-[700px] h-[500px] bg-[#0284C7]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/3 w-[700px] h-[500px] bg-[#1E3A8A]/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/6 left-1/3 w-[600px] h-[400px] bg-[#0284C7]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10 space-y-24">
        
        {/* Section Header: Strictly 2 Lines for Headline & Description */}
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            <span className="block">Rekam prestasi</span>
            <span className="block mt-1 text-[#FCD34D]">
              Mengharumkan almamater.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-2">
            <span className="block">
              Dedikasi dan daya juang mahasiswa penerima Beasiswa Bank Indonesia UPN &quot;Veteran&quot; Jawa Timur
            </span>
            <span className="block">
              dalam menorehkan capaian gemilang di panggung regional, nasional, hingga internasional.
            </span>
          </p>
        </div>

        {/* ============================================================== */}
        {/* 1. MODEL 1: ANTASENA 3-CARD SHOWCASE (TRUE 3D PERSPECTIVE) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center [perspective:1400px]">
          
          {/* Card 1: Left (3D Tilted to Center) */}
          <div className="h-[460px] sm:h-[500px] rounded-[28px] overflow-hidden relative group border border-white/10 hover:border-white/35 bg-[#0A1120] transform md:[transform:rotateY(16deg)_scale(0.94)_translateZ(-30px)] md:hover:[transform:rotateY(6deg)_scale(0.98)_translateZ(0px)] transition-all duration-700 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <Image
              src={items[1]?.image || "/prestasi-2.jpg"}
              alt={items[1]?.title}
              fill
              className="object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/70" />

            <div className="relative z-10 p-7 text-center">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                {items[1]?.rank}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 p-7 text-center space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {items[1]?.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {items[1]?.organizer}
              </p>
            </div>
          </div>

          {/* Card 2: Center Spotlight (Hero 3D Elevated, Gold Glow) */}
          <div className="h-[500px] sm:h-[540px] rounded-[28px] overflow-hidden relative group border-2 border-amber-400 bg-[#0A1120] transform md:[transform:rotateY(0deg)_scale(1.05)_translateZ(40px)] md:hover:[transform:rotateY(0deg)_scale(1.08)_translateZ(60px)] transition-all duration-700 ease-out shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.25)] z-20">
            <Image
              src={items[0]?.image || "/prestasi-1.jpg"}
              alt={items[0]?.title}
              fill
              className="object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/70" />

            <div className="relative z-10 p-8 text-center">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                {items[0]?.rank}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 p-8 text-center space-y-1.5">
              <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                {items[0]?.title}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {items[0]?.organizer}
              </p>
            </div>
          </div>

          {/* Card 3: Right (3D Tilted to Center) */}
          <div className="h-[460px] sm:h-[500px] rounded-[28px] overflow-hidden relative group border border-white/10 hover:border-white/35 bg-[#0A1120] transform md:[transform:rotateY(-16deg)_scale(0.94)_translateZ(-30px)] md:hover:[transform:rotateY(-6deg)_scale(0.98)_translateZ(0px)] transition-all duration-700 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <Image
              src={items[2]?.image || "/prestasi-4.jpg"}
              alt={items[2]?.title}
              fill
              className="object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/70" />

            <div className="relative z-10 p-7 text-center">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                {items[2]?.rank}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 p-7 text-center space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {items[2]?.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {items[2]?.organizer}
              </p>
            </div>
          </div>

        </div>

        {/* Subtle Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ============================================================== */}
        {/* 2. MODEL 2: BENTO GRID (CLEAN DIRECT OVERLAY - NO BOXES) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Big Card (7 Cols) - Direct Vignette Overlay (Pure Clean) */}
          <div className="h-[480px] sm:h-[530px] lg:col-span-7 rounded-[32px] overflow-hidden relative group border border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl bg-[#071328]">
            <Image
              src={items[0]?.image || "/prestasi-1.jpg"}
              alt={items[0]?.title}
              fill
              className="object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

            {/* Direct Clean Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-7 sm:p-9 space-y-1.5">
              <span className="text-2xl sm:text-3xl font-black text-white block drop-shadow-md">
                Juara 1 Nasional
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug">
                Duta Millenial Penggerak CBPR
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                KPw Bank Indonesia Provinsi Jawa Timur
              </p>
            </div>
          </div>

          {/* Right Stack (5 Cols) - Direct Clean Overlay */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Top Card */}
            <div className="h-[225px] sm:h-[252px] rounded-[28px] overflow-hidden relative group border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl bg-[#071328]">
              <Image
                src={items[1]?.image || "/prestasi-2.jpg"}
                alt={items[1]?.title}
                fill
                className="object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 space-y-1">
                <span className="text-lg sm:text-xl font-black text-white block drop-shadow-md">
                  Juara 2
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-100 line-clamp-1">
                  QRIS Jelajah Budaya Indonesia
                </h4>
                <p className="text-xs text-slate-300">
                  KORWIL Bank Indonesia Jawa &amp; Jateng
                </p>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="h-[225px] sm:h-[252px] rounded-[28px] overflow-hidden relative group border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl bg-[#071328]">
              <Image
                src={items[2]?.image || "/prestasi-4.jpg"}
                alt={items[2]?.title}
                fill
                className="object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 space-y-1">
                <span className="text-lg sm:text-xl font-black text-white block drop-shadow-md">
                  Runner Up
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-100 line-clamp-1">
                  Duta CBPR Nasional
                </h4>
                <p className="text-xs text-slate-300">
                  Duta Muda Bank Indonesia Nasional
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Subtle Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ============================================================== */}
        {/* 3. MODEL 3: SPOTLIGHT SLIDER (TRUE 3D COVERFLOW PERSPECTIVE) */}
        {/* ============================================================== */}
        <div 
          className="space-y-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center [perspective:1400px]">
            
            {/* Left Card (3D Dimmed Wing) */}
            <div 
              onClick={() => setSliderIndex((prev) => (prev - 1 + items.length) % items.length)}
              className="hidden md:block md:col-span-3 h-[400px] rounded-3xl overflow-hidden relative group cursor-pointer border border-white/10 opacity-40 hover:opacity-80 transform md:[transform:rotateY(25deg)_scale(0.88)_translateZ(-60px)] transition-all duration-700 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <Image
                src={getSlideItem(-1).image}
                alt={getSlideItem(-1).title}
                fill
                className="object-cover object-center brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10 text-center space-y-1">
                <span className="text-sm font-bold text-white block">
                  {getSlideItem(-1).rank}
                </span>
                <h4 className="text-xs text-slate-300 line-clamp-1">
                  {getSlideItem(-1).title}
                </h4>
              </div>
            </div>

            {/* Center Spotlight Card (Hero 3D Elevated, Gold Glow) */}
            <div className="md:col-span-6 h-[460px] sm:h-[520px] rounded-[32px] overflow-hidden relative group border-2 border-amber-400 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.25)] bg-[#0A1120] transform md:[transform:rotateY(0deg)_scale(1.06)_translateZ(50px)] transition-all duration-700 ease-out z-20">
              <Image
                src={getSlideItem(0).image}
                alt={getSlideItem(0).title}
                fill
                className="object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

              <div className="relative z-10 p-8 text-center">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {getSlideItem(0).rank}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 p-8 text-center space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {getSlideItem(0).title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {getSlideItem(0).organizer}
                </p>
              </div>
            </div>

            {/* Right Card (3D Dimmed Wing) */}
            <div 
              onClick={() => setSliderIndex((prev) => (prev + 1) % items.length)}
              className="hidden md:block md:col-span-3 h-[400px] rounded-3xl overflow-hidden relative group cursor-pointer border border-white/10 opacity-40 hover:opacity-80 transform md:[transform:rotateY(-25deg)_scale(0.88)_translateZ(-60px)] transition-all duration-700 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <Image
                src={getSlideItem(1).image}
                alt={getSlideItem(1).title}
                fill
                className="object-cover object-center brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />

              <div className="absolute bottom-6 left-6 right-6 z-10 text-center space-y-1">
                <span className="text-sm font-bold text-white block">
                  {getSlideItem(1).rank}
                </span>
                <h4 className="text-xs text-slate-300 line-clamp-1">
                  {getSlideItem(1).title}
                </h4>
              </div>
            </div>

          </div>

          {/* Dots Indicator Progress */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSliderIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === sliderIndex
                    ? 'w-8 bg-amber-400'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Prestasi;
