"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import type { Banner } from '@/lib/db';

interface HeroProps {
  banners?: Banner[];
}

const defaultSlides = [
  {
    id: 1,
    image: "/carousel-1.jpg",
    badge: "ENERGI UNTUK NEGERI",
    titleMain: "Generasi Baru Indonesia",
    titleSub: "UPN \"Veteran\" Jawa Timur",
    desc: "Komunitas resmi mahasiswa berprestasi penerima Beasiswa Bank Indonesia. Garda terdepan komunikasi kebijakan moneter, akselerator inovasi sosial, dan perwujudan karakter Bela Negara.",
    primaryCta: "Jelajahi Profil",
    primaryUrl: "#tentang-kami",
    secondaryCta: "Rekam Prestasi",
    secondaryUrl: "#prestasi",
  },
  {
    id: 2,
    image: "/corousel-2.jpg",
    badge: "CBP RUPIAH • DIGITALISASI QRIS",
    titleMain: "Dedikasi Nyata Bagi",
    titleSub: "Masyarakat & Inovasi Sosial",
    desc: "Menggaungkan literasi Cinta Bangga Paham Rupiah, mendampingi transformasi digital para pelaku UMKM Surabaya, serta menggerakkan aksi nyata kepedulian lingkungan hidup berkelanjutan.",
    primaryCta: "Program Kerja",
    primaryUrl: "#program-kerja",
    secondaryCta: "Departemen",
    secondaryUrl: "#struktur-organisasi",
  },
  {
    id: 3,
    image: "/corousel-3.jpg",
    badge: "FRONT LINERS • CHANGE AGENTS • FUTURE LEADERS",
    titleMain: "Frontliner Bank Indonesia",
    titleSub: "Karakter Bela Negara",
    desc: "Kawah candradimuka kepemimpinan muda berjiwa tangguh, berwawasan kebangsaan, dan siap bertransformasi menjadi calon pemimpin bangsa di era transformasi ekonomi digital.",
    primaryCta: "Pelajari Mandat",
    primaryUrl: "#visi-misi",
    secondaryCta: "Departemen",
    secondaryUrl: "#struktur-organisasi",
  },
];

const Hero: React.FC<HeroProps> = ({ banners }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeBanners = banners?.filter((b) => b.isActive);
  const slides = activeBanners && activeBanners.length > 0
    ? activeBanners.map((b, i) => {
        const fallback = defaultSlides[i % defaultSlides.length];
        const primaryCta = b.buttonText && b.buttonText !== "Baca Berita"
          ? b.buttonText
          : (i === 2 ? "Pelajari Mandat" : fallback.primaryCta);
        const primaryUrl = b.buttonUrl && b.buttonUrl !== "/berita"
          ? b.buttonUrl
          : fallback.primaryUrl;

        return {
          id: b.id,
          image: b.imageUrl || fallback.image,
          badge: b.subtitle ? b.subtitle.toUpperCase() : fallback.badge,
          titleMain: b.title || fallback.titleMain,
          titleSub: fallback.titleSub,
          desc: fallback.desc,
          primaryCta,
          primaryUrl,
          secondaryCta: fallback.secondaryCta,
          secondaryUrl: fallback.secondaryUrl,
        };
      })
    : defaultSlides;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="beranda" className="group/hero relative w-full h-screen min-h-[620px] bg-[#050C18] text-white overflow-hidden">
      
      {/* 1. EMBLA HERO CAROUSEL */}
      <div className="relative h-full w-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="relative h-full w-full flex-[0_0_100%] flex items-center justify-center overflow-hidden">
              
              {/* Background Photo with Subtle Ken Burns Cinematic Motion */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.titleMain}
                  fill
                  priority={idx === 0}
                  className={`object-cover object-center brightness-[0.88] contrast-[1.03] transition-transform duration-[8000ms] ease-out ${
                    selectedIndex === idx ? 'scale-105' : 'scale-100'
                  }`}
                  sizes="100vw"
                />
              </div>

              {/* Luminous GenBI Brand Gradient Overlay (Deep Navy to Royal Sapphire) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#061226]/90 via-[#07244D]/80 to-[#021B38]/90 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050C18] via-transparent to-[#050C18]/60" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/25 via-transparent to-transparent pointer-events-none" />

              {/* Hero Content Stage - Pure Institutional Elegance */}
              <div className="relative z-10 container mx-auto px-6 sm:px-12 max-w-6xl pt-20 pb-20 flex flex-col items-center text-center space-y-6">

                {/* Colossal & Unique High-Impact Title (Strictly 2 Neat Lines & No Clipping) */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[74px] font-black tracking-tight leading-[1.16] max-w-5xl mx-auto">
                  <span className="block text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] sm:whitespace-nowrap">
                    {slide.titleMain}
                  </span>
                  <span className="block mt-1 sm:mt-2 pb-2 bg-gradient-to-r from-[#FFF0BA] via-[#FBBF24] via-[#F59E0B] via-[#FBBF24] to-[#FFF0BA] bg-[length:200%_auto] animate-shimmer-gold bg-clip-text text-transparent drop-shadow-[0_4px_35px_rgba(245,158,11,0.45)] sm:whitespace-nowrap leading-[1.18]">
                    {slide.titleSub}
                  </span>
                </h1>

                {/* Balanced Description Narrative */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 leading-relaxed font-normal max-w-2xl mx-auto drop-shadow-sm">
                  {slide.desc}
                </p>

                {/* Antasena-Style Solid Rounded-xl Buttons (No Toy Icons, Clean Corporate) */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                  <Link
                    href={slide.primaryUrl}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-950/40 transition-all transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>{slide.primaryCta}</span>
                  </Link>

                  <Link
                    href={slide.secondaryUrl}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm tracking-wide backdrop-blur-md transition-all active:scale-95"
                  >
                    <span>{slide.secondaryCta}</span>
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Minimalist Progress Indicator Dots */}
        <div className="absolute bottom-16 sm:bottom-18 left-0 right-0 z-20 flex items-center justify-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              aria-label={`Pindah ke slide ${i + 1}`}
              className={`h-1.5 transition-all duration-400 rounded-full cursor-pointer ${
                selectedIndex === i 
                  ? 'w-8 bg-[#FCD34D]' 
                  : 'w-2 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Subtle Scroll Down Prompt */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
          <Link href="#prestasi" className="flex flex-col items-center gap-1 text-[10px] font-mono tracking-[0.2em] uppercase text-slate-300">
            <span>Scroll</span>
            <ChevronDown size={14} className="animate-bounce text-[#FCD34D]" />
          </Link>
        </div>

        {/* Subtle Side Navigation Chevrons (Appear on Hover) */}
        <button
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          aria-label="Slide sebelumnya"
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/25 hover:bg-black/60 text-white/70 hover:text-white border border-white/10 backdrop-blur-xs transition-all opacity-0 group-hover/hero:opacity-100 cursor-pointer hidden md:flex items-center justify-center"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => emblaApi && emblaApi.scrollNext()}
          aria-label="Slide selanjutnya"
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/25 hover:bg-black/60 text-white/70 hover:text-white border border-white/10 backdrop-blur-xs transition-all opacity-0 group-hover/hero:opacity-100 cursor-pointer hidden md:flex items-center justify-center"
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </section>
  );
};

export default Hero;
